# Enquiry notifications

The quote form stays on breezeblockusa.com. D1 persistence is the submission success boundary. After a successful save, the Worker uses `waitUntil` to attempt the notification without delaying the visitor. The destination is fixed server-side to `info@breezeblock.ca`; Reply-To is the validated enquirer's email.

## Resend configuration

- Sending domain: `mail.breezeblockusa.com` (US East, sending only).
- Domain ID: `1fdd6244-efa5-4122-b843-f53f1277992e`.
- Sender: `BreezeBlock USA <enquiries@mail.breezeblockusa.com>`.
- Published template: `c49746d0-3536-4825-abcf-17b17920e2b3`, alias `breezeblock-usa-enquiry`.
- API key: `BreezeBlock USA website sender`, sending-only and restricted to that domain. Its value lives only in the Sites `RESEND_API_KEY` secret. The application also accepts the legacy lowercase `resend_api_key` name.
- `NOTIFICATION_FROM` and `NOTIFICATION_TEMPLATE_ID` are Sites runtime values.
- `NOTIFICATION_ENABLED` must be `true` to send. It is initially `false` pending DNS verification and activation testing.

Edit the email layout in Resend, retaining the declared variables. Enquirer values are HTML-escaped and bounded to excerpts; complete details remain in D1. No subscriber list, marketing consent, customer acknowledgement, or HubSpot sync is created by this integration.

## Delivery and retries

The migration appends delivery state to existing enquiry records. No existing enquiry is deleted. States are `pending`, `sending`, `retry`, `accepted` (Resend accepted the message; not proof of inbox delivery), and `needs_review`. Provider email IDs are retained for reconciliation in Resend's email log.

Each send uses `enquiry/<request UUID>` as its idempotency key. The exact request is persisted before sending and reused on retries. Atomic claims and expiring leases prevent simultaneous sends and recover interrupted workers. Network failures, HTTP 429 and 5xx retry with backoff and Retry-After handling. Permanent errors stop for operator review. Attempts stop before Resend's 24-hour idempotency window expires; never blindly requeue an uncertain send after that window.

`POST /api/internal/notifications` processes one due record. It requires `Authorization: Bearer <NOTIFICATION_JOB_SECRET>`; that secret must have at least 32 characters and must be stored in Sites secrets. Missing configuration returns 503 and wrong credentials return 403. The endpoint returns counts only, with no enquiry details.

An enabled Sites automation, `Retry BreezeBlock enquiry notifications` (`Automation_781672e8df5c8191a3a70f9a83b30a3c`), checks the queue at the top of each hour in America/Vancouver. It skips delivery while `NOTIFICATION_ENABLED` is false, then processes up to ten due records sequentially per run once sending is enabled. Schedule creation is confirmed; no scheduled occurrence has been verified yet.

The job retrieves the existing Site service-access token from owner-only `get_site` and sends it only to the exact Site origin, in both `OAI-Sites-Authorization` and `Authorization`. `NOTIFICATION_JOB_SECRET` is synchronized to that service credential in Sites secrets. Never put its value in this file, task prompts, shell arguments or logs. If the service-access token rotates, synchronize the runtime secret and deploy before retry processing resumes. Authenticated POST access and persisted queue processing were verified against the deployed Site.

## Activation status — November 4, 2026

All four generated Resend DNS records are publicly visible with the expected values. DKIM and the `rsend.mail` CNAME are verified; the `send.mail` TXT/MX records remain pending in Resend. `_dmarc.mail` was not visible at the authoritative nameserver. Despite `partially_verified` status, Resend rejected the launch test with HTTP 403 (`domain is not verified`). Sending was disabled again and that runtime state was deployed. Do not enable based only on partial verification for this domain.

One clearly identified internal launch-test enquiry was saved through the private Site at `breezeblockusa.com`: `868f1a32-0650-48f2-9f2a-723222fbb4dc`. The authenticated queue endpoint processed it and persisted `needs_review`, with no provider email ID. No test email was sent. Repeating the same request will not automatically requeue a terminal record; use a fresh, clearly labelled launch test after full verification, or reconcile and deliberately requeue the existing record through an approved operator workflow. Successful delivery and duplicate-mail protection still need end-to-end verification.

## Activation checklist

1. Verify Resend's generated DNS records at Namecheap; preserve unrelated root MX/forwarding records. Add `_dmarc.mail` TXT `v=DMARC1; p=none;` if absent.
2. Confirm sender domain is `verified`; set `NOTIFICATION_ENABLED=true` in Sites and deploy a saved version to apply runtime values.
3. Exercise a clearly identified test through the real form. Check its D1 record, one provider email ID, resolved template values and Resend's `delivered` event. Retry the same request and confirm no additional notification.
4. Verify the saved hourly automation can retrieve Site access and process due notifications after activation. Review `pending`, `retry` and `needs_review` records through owner-only Sites database tools; resolve terminal failures in the provider log before requeueing.

## Local checks

`node scripts/test-notifications.mjs` uses real SQLite migrations and mock mail delivery. It covers success, duplicates, concurrent claims, retry timing, permanent failure, disabled configuration, lease recovery and the idempotency-window boundary. It sends no email.

The existing local HTTP smoke suite checks the quote submission path with notifications disabled. Never run fixture suites against a public host or enable sending in the local fixture environment.
