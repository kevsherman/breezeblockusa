import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { processNotifications, notificationMessage } from '../lib/notifications.ts';

// Exercise the production SQL against a real SQLite database. All sends are mocked.
const sqlite = new DatabaseSync(':memory:');
for (const path of ['drizzle/0000_flawless_charles_xavier.sql','drizzle/0001_lazy_crusher_hogan.sql']) {
 sqlite.exec(readFileSync(path,'utf8'));
}
const db = { prepare(sql) {
 let args = [];
 return {
  bind(...values) { args = values; return this; },
  async first() { return sqlite.prepare(sql).get(...args) ?? null; },
  async run() { const result = sqlite.prepare(sql).run(...args); return {meta:{changes:Number(result.changes)}}; },
 };
} };
const now = 1_800_000_000_000;
const env = {DB:db,resend_api_key:'test-key',NOTIFICATION_ENABLED:'true',NOTIFICATION_FROM:'BreezeBlock USA <enquiries@mail.breezeblockusa.com>',NOTIFICATION_TEMPLATE_ID:'test-template'};
const row = id => sqlite.prepare('SELECT * FROM enquiries WHERE id=?').get(id);
const add = id => sqlite.prepare('INSERT INTO enquiries(id,created_at,email,name,payload,status,notification_status) VALUES(?,?,?,?,?,?,?)')
 .run(id,now,'customer@example.invalid','Test <name>',JSON.stringify({name:'Test <name>',notes:'&'.repeat(2000),region:'Washington',zip:'98101'}),'new','pending');
const run = (id,time,send) => processNotifications(env,{id,now:time,send});

add('success');
let sends = 0;
await run('success',now,async (message,key) => {
 sends++;
 assert.deepEqual(message.to,['info@breezeblock.ca']);
 assert.equal(message.replyTo,'customer@example.invalid');
 assert.equal(message.template.variables.NAME,'Test &lt;name&gt;');
 assert.ok(message.template.variables.NOTES.length < 2000);
 assert.equal(key,'enquiry/success');
 return {id:'email-1'};
});
assert.equal(row('success').notification_status,'accepted');
assert.equal(row('success').notification_email_id,'email-1');
await run('success',now,async () => { sends++; return {id:'unexpected'}; });
assert.equal(sends,1,'accepted enquiries must not resend');

add('failure');
await run('failure',now,async () => ({error:'rate_limit_exceeded',retryable:true,retryAfterMs:120_000}));
assert.equal(row('failure').notification_status,'retry');
assert.equal(row('failure').notification_next_attempt,now+120_000);
const frozen = row('failure').notification_request;
env.NOTIFICATION_FROM = 'Different <changed@mail.breezeblockusa.com>';
await run('failure',now+120_000,async message => {
 assert.equal(JSON.stringify(message),frozen,'retry content must remain identical');
 throw new Error('network failed');
});
assert.equal(row('failure').notification_status,'retry');
assert.ok(row('failure').payload,'email failure must preserve the enquiry');

add('permanent');
await run('permanent',now,async () => ({error:'validation_error',retryable:false}));
assert.equal(row('permanent').notification_status,'needs_review');

add('concurrent');
let concurrentSends=0;
await Promise.all([1,2].map(() => run('concurrent',now,async () => { concurrentSends++; return {id:'one'}; })));
assert.equal(concurrentSends,1,'only one worker may claim an enquiry');

add('expired');
sqlite.prepare("UPDATE enquiries SET notification_first_attempt=?,notification_attempts=1 WHERE id='expired'").run(now-24*60*60_000);
await run('expired',now,async () => { throw new Error('must never send outside idempotency window'); });
assert.equal(row('expired').notification_status,'needs_review');

add('disabled');
assert.equal((await processNotifications({...env,NOTIFICATION_ENABLED:'false'},{id:'disabled'})).configured,false);
assert.equal(row('disabled').notification_attempts,0);

add('lease-recovery');
sqlite.prepare("UPDATE enquiries SET notification_status='sending',notification_next_attempt=?,notification_first_attempt=?,notification_attempts=1 WHERE id='lease-recovery'").run(now-1,now-120_000);
await run('lease-recovery',now,async () => ({id:'recovered'}));
assert.equal(row('lease-recovery').notification_status,'accepted');

assert.throws(() => notificationMessage({payload:'broken'},'from','template'));
sqlite.close();
console.log('Notification queue checks passed: acceptance, duplicate protection, retries, permanent failure, concurrency, expiry, disabled configuration, and lease recovery. No email sent.');
