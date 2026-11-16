'use client';
import { useEffect, useRef, useState } from 'react';

export default function QuoteForm() {
 const [busy, setBusy] = useState(false);
 const [error, setError] = useState('');
 const [saved, setSaved] = useState('');
 const [context, setContext] = useState('');
 const form = useRef<HTMLFormElement>(null);
 const success = useRef<HTMLDivElement>(null);
 const requestId = useRef('');

 useEffect(() => {
  requestId.current = crypto.randomUUID();
  const params = new URLSearchParams(location.search);
  const f = form.current;
  if (!f) return;
  const interest = params.get('interest');
  if (interest && ['quote', 'trade', 'samples', 'technical'].includes(interest)) (f.elements.namedItem('interest') as HTMLInputElement).value = interest;
  for (const key of ['pattern', 'finish', 'region', 'quantity']) {
   const value = params.get(key);
   const input = f.elements.namedItem(key) as HTMLInputElement | null;
   if (input && value) input.value = value.slice(0, 160);
  }
  setContext(params.get('pattern')?.slice(0, 160) || '');
 }, []);
 useEffect(() => { if (saved) success.current?.focus(); }, [saved]);

 async function submit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  if (busy) return;
  setBusy(true);
  setError('');
  const data = Object.fromEntries(new FormData(event.currentTarget));
  let attribution = {};
  try { attribution = JSON.parse(sessionStorage.getItem('bb_first_source') || '{}'); } catch {}
  try {
   const response = await fetch('/api/quotes', {
    method: 'POST', signal: AbortSignal.timeout(20000), headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, id: requestId.current, consent: data.consent === 'on', attribution }),
   });
   const result = await response.json() as { id?: string; error?: string };
   if (!response.ok) throw new Error(result.error || 'Please try again.');
   if (!result.id) throw new Error('We could not confirm your message. Please retry.');
   setSaved(result.id);
   window.dispatchEvent(new CustomEvent('breezeblock:quote-saved', { detail: { interest: data.interest } }));
  } catch (reason) {
   setError(reason instanceof Error && reason.name === 'TimeoutError' ? 'The connection took too long. Please retry; your message reference will prevent duplicates.' : reason instanceof Error ? reason.message : 'Please try again. Your message has not been confirmed.');
  } finally { setBusy(false); }
 }

 if (saved) return <div className="success" ref={success} tabIndex={-1} role="status"><p className="eyebrow">Message received</p><h2>Thank you for reaching out.</h2><p>Your message has been saved. We’ll reply by email to discuss the next steps.</p><p className="fine-print">Reference: {saved}</p></div>;
 return <form className="quote-form simple-contact-form" ref={form} onSubmit={submit}>
  <input type="hidden" name="interest" defaultValue="quote"/><input type="hidden" name="pattern"/><input type="hidden" name="finish" defaultValue="Not sure yet"/><input type="hidden" name="region" defaultValue="Other"/><input type="hidden" name="quantity"/>
  {context && <p className="contact-context">Regarding: {context}</p>}
  <div className="fields">
   <label className="field">Name<input name="name" autoComplete="name" required minLength={2} maxLength={100}/></label>
   <label className="field">Email<input name="email" type="email" autoComplete="email" required maxLength={254}/></label>
   <label className="field full">How can we help?<textarea name="notes" required maxLength={2000} rows={5} placeholder="Tell us a little about your project or question…"/></label>
   <label className="field full">Phone <span className="optional-label">(optional)</span><input name="phone" type="tel" autoComplete="tel" maxLength={160}/></label>
  </div>
  <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
  <label className="check-label"><input name="consent" type="checkbox" required/><span>I agree to the use of my details to respond to this message, as described in the <a href="/privacy/">privacy notice</a>.</span></label>
  {error && <div role="alert" className="form-error"><p>{error}</p><p>Your message is still here. You can also <a href="mailto:info@breezeblock.ca?subject=US%20project%20enquiry">email us directly</a>.</p></div>}
  <button className="button" type="submit" disabled={busy}>{busy ? 'Sending…' : 'Send message'}<span aria-hidden="true">↗</span></button>
 </form>;
}
