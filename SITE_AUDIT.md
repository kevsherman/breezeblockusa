# Architectural commerce audit — 9 November 2026

Scope: homepage, collection and pattern discovery, all 24 product routes, technical resources, delivery, privacy, enquiry flow, mobile rendering, accessibility, and notification configuration. This is a bounded product and implementation review, not a claim that every possible defect has been eliminated.

## Fixed in this pass

| Finding | Change |
| --- | --- |
| Editorial homepage gives little immediate buying guidance | Added a compact collection / samples / delivery strip below the hero. |
| Filter and sorting selections disappear between visits | URL-backed filters and sorting restore on reload and browser navigation; filtered URLs can be shared. |
| Comparing dimensions requires jumping between product pages | Compare up to three catalogue products in an accessible, horizontally scrollable table; selection is retained in the URL. |
| US shoppers must interpret metric-first dimensions | Cards, product specifications and comparisons lead with inches; detailed tables retain original metric values. |
| No preliminary quantity support | Product-specific net-area estimator with editable joint and allowance assumptions, rounding and input bounds. Carries product and estimate into the enquiry. It is not a final takeoff. |
| Printing a product produces navigation and long related-product sections | Focused print stylesheet for product image, selected variant and specifications. |
| Buying conditions are buried | Pricing, freight, stock and lead-time confirmation explained beside the product CTA, with delivery and returns links. |
| Technical resources page offers little direct access | Searchable product file library using existing catalogue PDF/CAD/STEP/SKP links. External hosting and specification matching are disclosed. |
| Enquiry form presents too many fields at once | Optional phone, company, unloading and drawing information grouped into an expandable section. Core project fields remain visible. |
| Network failure can leave the form waiting indefinitely | 20-second timeout, retained form values, safe idempotent retry and email fallback. |
| Confirmation offers no route to follow up | Reference-based email link and clearer next-step copy. |
| Controls and footnotes are too small | Increased action and fine-print text, enlarged search/menu targets, full-width mobile form/product buttons. |
| Internal launch strategy appears in regional and resource copy | Replaced launch-stage labels with customer-facing service descriptions without inventing coverage commitments. |
| Seller identity missing | Added owner-supplied legal name `breezeblockusa`; address and phone omitted as instructed. |
| Return/cancellation policy missing | Added `/returns/`, linked from footer and product pages, adapted from the owner's requested Canadian policy. Currency and destination must be confirmed in the quote; no Canadian warehouse address implied. |
| Privacy page lacks a contact route | Added business identity and existing business email for privacy/access/deletion questions. |
| Provider rejection can lose diagnostic context | Notification errors retain the HTTP status when the provider omits its error name. |

## Unresolved launch and business dependencies

| Priority | Finding | Required resolution |
| --- | --- | --- |
| Critical | Website notification flag remains false. Resend domain now reports fully verified. | Enable through a controlled activation, verify a real internal enquiry is accepted and received, and check the scheduled retry. No email sent or queued records replayed in this audit. |
| High | Quote-only catalogue, no approved US prices, inventory feed or lead-time commitments | Provide price/currency, sellable inventory, replenishment and freight rules before implementing checkout or availability promises. Quote-first architecture remains intentional. |
| High | Returns monetary floor is $100 in the Canadian policy, with no explicit US currency | Owner must confirm currency for the US quote and policy. The page currently calls for currency confirmation in the written quote. |
| High | Privacy operations incomplete | Confirm retention/deletion procedure, processors and cross-border disclosures; test requests operationally before public launch. No invented retention period. |
| High | Product performance and provenance are catalogue references | Reconcile supplied lots, manufacturer/origin, test reports, exposure suitability, installation details and document revisions. Do not substitute generic engineering advice. |
| High | Inspiration lacks documented project proof | Supply rights-cleared project photography, locations, designers and customer permission; retain honest inspiration captions until then. No fabricated reviews, client logos or testimonials. |
| Medium | No validated enquiry service level or sample offer | Confirm response timing, sample price/credit and dispatch process before advertising them. |
| Medium | No purchase/payment/order tracking flow | Add only after seller, tax, payment, shipping, inventory and order-management decisions are ready. Current form explicitly submits an enquiry. |
| Medium | No field performance or funnel data | Measure after a privacy-conscious analytics decision and public launch. No Lighthouse/Core Web Vitals score claimed. |
| Medium | Responsive imagery could reduce catalogue transfer further | Existing local WebP assets and lazy loading remain. Audit found largest image 369 KB; responsive image derivatives are a future performance optimization, not tested here. |
| Launch | Site remains owner-private and noindex | Preserve pre-launch access. Validate public DNS/TLS/redirects and change access/indexing only as part of authorized launch. |

## Verification

- TypeScript check.
- Existing local catalogue suite: all 24 products, eight patterns, assets, metadata, schema and quote-prefill links.
- Existing local smoke suite: route/assets, 404, noindex, sitemap, actual D1 enquiry validation, deduplication and rate limiting.
- Notification queue tests: acceptance, duplicate protection, transient/permanent failure, concurrency, expiry and lease recovery, without sending mail.
- Isolated Brave/Chromium: seven representative pages at 390 and 1440 pixels; no horizontal document overflow or WCAG 2 A/AA / 2.1 AA axe violations in those runs.
- Browser interactions: URL filters and comparison reload, quantity handoff, product prefill, mocked submission failure retention and confirmation.
- Visual review of mobile product screenshot; main design retained.
- Final resource, returns and privacy checks at 390 pixels, technical-library search and expanded files, and product PDF print rendering passed.
- Safari/iOS, real inbox delivery, public visitor access, external technical-file contents, physical print output and field performance are not verified by these tests.

Policy source: https://breezeblock.ca/policies/refund-policy (reviewed 9 November 2026).
