import { Resend } from 'resend';
import type { CreateEmailOptions } from 'resend';

export const notificationRecipient = 'info@breezeblock.ca';
const retryDelays = [60_000, 300_000, 900_000, 3_600_000, 10_800_000];
const leaseMs = 120_000;
// Resend retains idempotency keys for 24 hours. Stop before that boundary;
// uncertain sends require an operator to reconcile the provider email log.
const retryWindowMs = 23 * 60 * 60_000;

type QueueRow = {
 id: string; email: string; payload: string; notification_attempts: number;
 notification_first_attempt: number | null; notification_request: string | null;
};
export type SendResult = { id?: string; error?: string; retryable?: boolean; retryAfterMs?: number };
type Sender = (message: CreateEmailOptions, idempotencyKey: string) => Promise<SendResult>;

// Template values are escaped, with bounded excerpts; the complete enquiry stays in D1.
function excerpt(value: unknown, max = 250): string {
 const source = String(value ?? '');
 const trimmed = source.length > max ? source.slice(0, max) + '… [full details saved]' : source;
 return trimmed.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]!));
}
export function notificationMessage(row: QueueRow, from: string, templateId: string): CreateEmailOptions {
 const p = JSON.parse(row.payload);
 const values = {
  REFERENCE: row.id, NAME: p.name, CONTACT_EMAIL: row.email, PHONE: p.phone,
  COMPANY: p.company, REGION: p.region, ZIP: p.zip, INTEREST: p.interest,
  PATTERN: p.pattern, FINISH: p.finish, QUANTITY: p.quantity,
  APPLICATION: p.application, TIMING: p.timing, UNLOADING: p.unloading,
  NOTES: p.notes, DRAWING: p.drawingUrl,
 };
 return {
  from, to: [notificationRecipient], replyTo: row.email,
  subject: `BreezeBlock USA enquiry ${row.id}`,
  template: { id: templateId, variables: Object.fromEntries(Object.entries(values).map(([k,v]) => [k, excerpt(v)])) },
 };
}

function resendSender(key: string): Sender {
 const resend = new Resend(key);
 return async (message, idempotencyKey) => {
  const { data, error, headers } = await resend.emails.send(message, {
   idempotencyKey, signal: AbortSignal.timeout(10_000),
  });
  if (data?.id) return { id: data.id };
  const status = error?.statusCode;
  const retryHeader = headers?.['retry-after'];
  const seconds = Number(retryHeader);
  return {
   error: error?.name ?? 'provider_response_missing_id',
   retryable: !status || status === 429 || status >= 500 || error?.name === 'concurrent_idempotent_requests',
   retryAfterMs: retryHeader ? (Number.isFinite(seconds) ? seconds * 1000 : Math.max(0, Date.parse(retryHeader) - Date.now())) : 0,
  };
 };
}

export async function processNotifications(env: Cloudflare.Env, options: {
 id?: string; now?: number; send?: Sender;
} = {}) {
 const key = env.RESEND_API_KEY || env.resend_api_key;
 if (!env.DB || env.NOTIFICATION_ENABLED !== 'true' || !key || !env.NOTIFICATION_FROM || !env.NOTIFICATION_TEMPLATE_ID) {
  return { configured: false, processed: 0 };
 }
 const db = env.DB;
 const now = options.now ?? Date.now();
 const send = options.send ?? resendSender(key);
 const row = await db.prepare(`SELECT id,email,payload,notification_attempts,notification_first_attempt,notification_request
  FROM enquiries WHERE notification_status IN ('pending','retry','sending') AND notification_next_attempt <= ?
  ${options.id ? 'AND id = ?' : ''} ORDER BY created_at LIMIT 1`).bind(...(options.id ? [now, options.id] : [now])).first<QueueRow>();
 if (!row) return { configured: true, processed: 0 };
 const lease = crypto.randomUUID();
 // Atomic compare-and-set prevents simultaneous workers from claiming a row.
 const claim = await db.prepare(`UPDATE enquiries SET notification_status='sending',notification_lease=?,
  notification_next_attempt=?,notification_first_attempt=COALESCE(notification_first_attempt,?),
  notification_attempts=notification_attempts+1 WHERE id=? AND notification_next_attempt<=?
  AND notification_status IN ('pending','retry','sending') AND notification_attempts=?`)
  .bind(lease,now+leaseMs,now,row.id,now,row.notification_attempts).run();
 if (!claim.meta.changes) return { configured: true, processed: 0 };
 const finish = async (status: string, error: string | null, next: number, emailId: string | null = null) => {
  await db.prepare(`UPDATE enquiries SET notification_status=?,notification_error=?,notification_next_attempt=?,
   notification_email_id=?,notification_lease=NULL WHERE id=? AND notification_lease=?`)
   .bind(status,error,next,emailId,row.id,lease).run();
 };
 const first = row.notification_first_attempt ?? now;
 if (now-first >= retryWindowMs || row.notification_attempts >= 6) {
  await finish('needs_review','retry_window_or_attempt_limit',0);
  return { configured: true, processed: 1 };
 }
 let message: CreateEmailOptions;
 try {
  message = row.notification_request ? JSON.parse(row.notification_request) : notificationMessage(row,env.NOTIFICATION_FROM,env.NOTIFICATION_TEMPLATE_ID);
 } catch {
  await finish('needs_review','invalid_saved_payload',0);
  return { configured: true, processed: 1 };
 }
 // Freeze the exact request before the first send so retries keep identical content.
 await db.prepare('UPDATE enquiries SET notification_request=? WHERE id=? AND notification_lease=?')
  .bind(JSON.stringify(message),row.id,lease).run();
 let result: SendResult;
 try { result = await send(message,`enquiry/${row.id}`); }
 catch { result = { error:'network_error', retryable:true }; }
 if (result.id) {
  await finish('accepted',null,0,result.id);
 } else {
  const delay = Math.max(retryDelays[row.notification_attempts] ?? 0,result.retryAfterMs || 0);
  const retry = result.retryable && row.notification_attempts < 5 && now+delay-first < retryWindowMs;
  await finish(retry ? 'retry' : 'needs_review',result.error ?? 'unknown_provider_error',retry ? now+delay : 0);
 }
 return { configured: true, processed: 1 };
}
