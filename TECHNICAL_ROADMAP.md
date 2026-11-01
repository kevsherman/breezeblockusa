# BreezeBlock USA — technical roadmap

Prepared November 1, 2026. Source: `BreezeBlock_US_Soft_Launch_Proposal.md` dated October 31, plus the user's instruction to build a separate, non-Shopify, quote-only website at **breezeblockusa.com**. Canadian reference: [breezeblock.ca](https://breezeblock.ca/).

## Decision

Build a small US lead-generation website with search-readable pages, real product imagery, regional delivery information and a durable enquiry pipeline. Every commercial action leads to a quote, trade conversation, sample enquiry or technical-file request. No cart, checkout, buy button, public payment flow or Shopify runtime. Quotes and any later invoices remain a separate sales process.

Prioritize **Washington → Boise/North Idaho → Portland**, with western Montana reviewed individually. Treat delivery coverage as conditional, not as evidence of local offices or warehouses. Keep Kamloops fulfilment and actual origin transparent. The proposal's operational gate applies before paid orders; it need not prevent a truthful informational/lead-generation launch once contact, privacy and lead handling are ready.

The first build is a private review version. It is not the public domain launch. `website/lib/site.ts` deliberately sets `publicLaunch = false`; pages have noindex and robots disallows crawling. Enabling indexing requires both a source change and public hosting access. Do not point the public domain at a sign-in-protected preview.

## Proposal review: what changes and what stays

| Proposal item | Technical decision |
| --- | --- |
| Evaluate Shopify | Superseded by the user's instruction. Independent Vinext/React site on a Cloudflare Worker through Sites. |
| Three to five launch patterns | Start with three recognizable pattern pages using Canadian imagery; reconcile actual US SKUs before stock claims or specification publication. |
| Quote-first pallets; possible sample checkout | Quote-only for everything, including samples. |
| USD goods prices | Omit unvalidated pilot prices. The written quote defines USD amounts and all delivery/import/tax treatment. |
| Regional SEO | Three substantive regional pages plus an overview; no cloned city landing pages or invented addresses. |
| Technical resources | Publish a useful planning guide now; release versioned SKU-matched downloads after reconciliation. |
| Gallery | Reuse authorized Canadian brand imagery, with inspiration clearly distinguished from verified installations. Add permissioned case studies with real context. |
| HubSpot measurement | Capture enquiry and campaign data now; connect the operational CRM/inbox pipeline before public acquisition. |
| One workday a week | Keep source-controlled content, a narrow catalogue and one enquiry queue. No custom ecommerce platform or warehouse software. |

A concrete discrepancy: the live [Four Leaf page](https://breezeblock.ca/products/large-grey-four-leaf-breeze-block) and [Empress page](https://breezeblock.ca/products/large-empress-in-grey) show six-block cases, while the proposal's incoming invoice has different packing assumptions. Stock, carton quantities and lot specifications cannot safely be copied from the Canadian storefront into the US offer. The site shows pattern references and requests confirmation instead.

## Implementation delivered

- Responsive editorial homepage with existing brand inspiration imagery and real Canadian product photography.
- Pattern overview and Four Leaf, Empress and Square on Square pages; no asserted US inventory, unapproved pricing or fabricated reviews.
- Washington, Idaho and Oregon pages with region-specific project and delivery questions, plus service-area overview.
- Delivery, trade, technical-resource and project-planning pages.
- Enquiry page supporting quote, trade, sample and technical-file intent.
- Server validation, same-origin submission check, honeypot, bounded fields/body, per-email throttling and retry deduplication.
- D1 storage with timestamp, reference ID, contact, project payload, status and notification status. A success message follows a successful database write, not merely a button click.
- First-session UTM source/medium/campaign and landing path; no ad pixels, marketing subscription or third-party analytics.
- Unique page titles/descriptions, canonical URLs for the intended domain, sitemap, robots controls, semantic headings, internal links and breadcrumb structured data.
- Existing `info@breezeblock.ca` email link as a direct contact option, verified from the [Canadian contact page](https://breezeblock.ca/pages/contact).

Not yet connected: sales email notifications, CRM delivery, DNS, Search Console, production analytics, approved US policy text and verified lot-specific technical downloads. Stored enquiries have `notification_status = pending`; this is explicitly a backlog marker, not an automatic delivery queue. During private review, inspect records through the owner-only Sites database tools. Do not open acquisition traffic until the receiving workflow is operational.

## Architecture and operating model

```text
Visitor / search crawler
        ↓
Server-rendered Vinext pages + local optimized assets
        ↓ project enquiry (same-origin JSON)
POST /api/quotes → validated + deduplicated record → Cloudflare D1
        ↓ next launch task
Authenticated outbox processor → sales inbox + HubSpot
        ↓
Manual qualification → written delivered quote → separate invoice
```

React client code is limited to form state and session attribution. No Shopify API, Shopify checkout or embedded storefront is used. Downloaded images originally served by the Canadian Shopify CDN are local assets here; that does not make the US site Shopify-dependent.

Source of truth for page content: `website/lib/content.ts`. Homepage: `website/app/page.tsx`. Quote validation: `website/lib/quote-schema.ts`. Database schema/migrations: `website/db/schema.ts` and `website/drizzle/`. Hosting identity: `website/.openai/hosting.json`. Code is portable source; hosting currently uses Sites-managed Cloudflare infrastructure. Retain the lockfile and Node 22.13+ runtime.

## Sequence and acceptance criteria

| Target window | Priority / owner | Work | Exit condition |
| --- | --- | --- | --- |
| Nov 1–6 | P0 / technical + Kevin | Review this build; confirm seller identity, US contact destination, domain control, three launch patterns and photo rights. Reconcile lot specs and stock. | Approved content record; no public statement depends on unverified stock, origin or exterior performance. |
| Nov 2–6 | P0 / technical + Kevin | Wire lead notifications and HubSpot; establish one owner and response routine; finalize enquiry privacy notice. | Test enquiry persists, appears once in CRM and reaches the right inbox; failed notification is visible and retried. No lost leads when downstream delivery fails. |
| Nov 6–13, once ready | P0 / technical | Public lead-generation release: domain/TLS, redirects, indexability, sitemap, Search Console, browser accessibility and performance QA. | Public domain anonymously accessible; noindex removed only on production; real mobile form submission reaches sales; crawl and URL inspection pass. |
| Nov 9–20 | P1 / Kevin + technical + product professionals | Verified SKU data, technical PDFs, delivery lane details, seller identification and approved customer terms. | Three to five useful product pages with matched files, factual availability language and supported application limits. Paid orders still depend on proposal's broker/insurance/suitability gates. |
| Nov 23–Dec 4 | P1 / Kevin | Private trade release and permissioned case-study work; improve priority regional pages with actual lane evidence. | First 20 relevant firms can obtain a useful spec pack; lead sources and qualification outcomes recorded. Outreach requires separate explicit instruction before this agent sends messages. |
| Dec 7–Jan 8 | P1 / Kevin + technical | Weekly Search Console review, enquiries, content improvements and small paid search test only after lead/quote economics work. | Identify pages and terms producing qualified demand; record delivered quote value and wins/losses. |
| Jan 11–29 | P2 / Kevin | 90-day pilot assessment. | Continue, narrow or pause against actual qualification, contribution and support effort; not traffic alone. |
| Feb–Apr 2027 | P2 / team | Spring follow-up; add locations, products or sample workflows only with evidence. | Expansion supported by delivery economics and product suitability. |

Dates are working targets, not customer delivery commitments or guarantees of search results.

## SEO: fastest credible path

Google says changes can take hours to several months to be reflected; ranking gains are not guaranteed. Optimize for early discovery and useful long-tail intent while the domain develops evidence and links, rather than promising an immediate position for “breezeblock.” See the [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

### Search intent and page ownership

| Page | Primary intent / illustrative terms | Differentiating information to add |
| --- | --- | --- |
| `/` | breeze blocks USA; architectural concrete screen blocks | Clear Northwest offer, material, real patterns, company credibility and quote path. |
| `/breeze-blocks/` | concrete breeze blocks; decorative concrete blocks | Pattern comparison, sizes, openness, real finish photos and documentation. |
| `/breeze-blocks/{pattern}/` | Four Leaf / Empress / Square on Square breeze blocks | SKU facts, photographs, revisioned files, actual availability and relevant use limits. |
| `/service-areas/washington/` | breeze blocks Washington, Seattle, Tacoma, Spokane | Actual tested freight options, access requirements and permissioned Washington projects. |
| `/service-areas/idaho/` | breeze blocks Boise, Meridian, Eagle, Coeur d'Alene | Boise vs North Idaho delivery details, applicable exposure checks and project proof. |
| `/service-areas/oregon/` | breeze blocks Portland, Oregon | Portland receiving options, documented material use and Oregon project evidence. |
| `/trade/` | architectural breeze block supplier; trade/specifier enquiries | File availability, sample process and real service standards. |
| `/guides/planning-a-breeze-block-wall/` | how many breeze blocks per square foot; breeze block wall planning | Correct module arithmetic, explicit joint assumptions and design limitations. |

These are keyword hypotheses, not measured search volumes or a completed competitive keyword study. Establish the baseline in Search Console after launch; use actual query and conversion evidence to prioritize revisions.

1. **Make the core pages complete and crawlable.** All main information is in server-rendered HTML, not dependent on client rendering. Include only canonical, useful pages in the sitemap. Use one preferred HTTPS hostname; redirect www and alternate hosts in one hop. Ensure legitimate unknown pages return 404.
2. **Borrow existing brand discoverability honestly.** Add a contextual US-service link from breezeblock.ca after its owner approves the placement. Link back to the Canadian business from an appropriate About/contact area. Keep US and Canadian pages self-canonical when independently useful. Add reciprocal `en-US`/`en-CA` hreflang only for genuinely equivalent page pairs; do not blindly point US pages at Canadian canonicals.
3. **Build depth, not city substitutions.** Regional pages need original freight facts and project evidence. Add Seattle or Boise standalone pages only when they have enough distinct useful content. Google's [spam policies](https://developers.google.com/search/docs/essentials/spam-policies) identify doorway pages and scaled low-value content as abuse.
4. **Publish proof.** Start with two documented installations: actual location, pattern, designer/installer credit, permitted photos, design constraints and a concise outcome. Clearly identify Canadian projects. Do not label brand concept imagery as a completed customer installation.
5. **Earn relevant references.** Seek supplier/partner links, credited architect or installer case studies and legitimate professional coverage. No bulk directory campaign, purchased links or manufactured reviews.
6. **Avoid fake local presence.** Do not create US addresses or LocalBusiness schema for places where there is no business. Google Business Profile eligibility generally requires actual in-person customer contact; an online-only operation is not eligible merely because it delivers goods. Review the [eligibility rules](https://support.google.com/business/answer/13763036) against actual operations.
7. **Use paid search only as a measured bridge.** After enquiries and quotes work, consider a small capped test for high-intent regional terms within the proposal's demand-test budget. No advertising spend is authorized or incurred by this build.

### Technical launch checklist

- [ ] Confirm registrar, DNS control, renewal and existing records for breezeblockusa.com. Preserve MX, SPF, DKIM and other unrelated records.
- [ ] Attach apex domain using the hosting provider's returned DNS records; validate www redirect, TLS and canonical redirect behavior. Do not guess DNS targets.
- [ ] Remove preview noindex by changing `publicLaunch`, make the hosting audience public and redirect or exclude the preview hostname appropriately. Confirm HTTP headers as well as HTML robots tags.
- [ ] Verify canonical URLs match actual slash/hostname behavior; sitemap URLs resolve without unnecessary redirects.
- [ ] Create a Search Console domain property via DNS; submit sitemap; inspect homepage, catalogue and three regional pages. Submit important URLs once; don't repeatedly resubmit as a ranking tactic.
- [ ] Finish seller name, contact details, privacy controller, retention and access/deletion process. Separate enquiry consent from marketing consent.
- [ ] Add honest Organization structured data after the legal/business identity is confirmed. Keep breadcrumbs. Add Product data only with verified facts; don't invent offers, reviews, availability or merchant-listing eligibility. No fake LocalBusiness markup.
- [ ] Create a local JPG/WebP social card and test social metadata; alt text should describe content without location stuffing.
- [ ] Test at 360/390 px mobile, tablet and desktop widths, keyboard-only flow, labels, errors, focus and successful submission. Test Firefox/Safari and iOS as available.
- [ ] Measure Lighthouse/PageSpeed on the public domain. Working targets: LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 at the 75th percentile once real-user data is available; initial lab scores do not establish field performance. Keep hero dimensions and eager loading; lazy-load below-fold images. See [Core Web Vitals guidance](https://web.dev/articles/vitals).
- [ ] Test failed storage, failed notification, duplicate submission, spam rejection and success; verify no PII appears in analytics or public responses beyond the request reference.
- [ ] Add production edge rate limits / bot controls before paid traffic. Current per-email throttling can be bypassed by rotating email addresses and is only baseline protection. If using a challenge, verify it server-side and preserve accessible fallback contact.
- [ ] Confirm no public enquiry-list API exists. Keep record access owner-only; configure retention, backups and a recovery drill. Never put API credentials in browser code.

## Lead operations: next implementation

1. Confirm info@breezeblock.ca as interim destination, or provision a verified US alias. Use a verified mail provider and sender domain. A mailto link is available now; it is not an automatic notification integration.
2. Preserve the D1 write as the success boundary. Add a bounded outbox/retry processor with unique enquiry ID, attempts, last error and next-attempt timestamp. Store first; then notify and sync. Do not discard enquiries if a provider times out.
3. Upsert HubSpot contact by email; add a distinct enquiry record/task with unique request ID. Do not overwrite first-source attribution on repeat visits. Store project region, intent, scope, date, source and landing page. Keep transactional response distinct from marketing subscription.
4. Assign a named owner. Proposed internal target: initial response within one business day; finished quote within two business days when product/freight inputs are available. Do not publish as a guarantee until it can be met.
5. Record funnel stages: new → contacted → qualified → quoted → won/lost/deferred. Record loss reason, quote currency/value, actual delivery cost, contribution and owner hours.
6. Alert when a new enquiry remains unassigned or notification delivery repeatedly fails. Establish an owner-visible queue before public release; no notification or scheduled task has been provisioned in this build.

## Measurement and review

Use successful saved enquiries as the conversion, not CTA clicks. The UI emits `breezeblock:quote-saved` with intent only; wire consent-appropriate analytics later without sending names, emails, notes or drawing links. Session attribution currently captures campaign parameters and landing path; it is not cross-device or long-term attribution.

Weekly: indexed canonical pages, non-brand query impressions/clicks by page, organic enquiry rate, qualified enquiries by region, quote response time and notification backlog. Monthly: quoted value, wins/losses, actual contribution and hours per order. Use the proposal's **8–12 qualified quotes and 3–5 paid orders** as pilot hypotheses, not a website forecast.

Content cadence within the limited time budget: one substantive improvement per week. First verified product/spec pages, then one credible case study, then actual regional freight FAQs, then a second project guide. Do not publish a large generic blog programme.

## Inputs still needed from Kevin

- Exact Canadian legal seller (public brand name alone does not establish legal form), business/privacy contact and approved customer terms.
- Final three to five US launch SKUs, quantities after Canadian reservations, dimensions, weights, packing and supported exposure conditions.
- Confirmation that existing site imagery may be reused for the US market and identification of actual project photos versus generated inspiration imagery.
- Domain/hosting access and intended inbox/CRM owner. No passwords should be put in this document.
- Approved technical files and broker/carrier/insurer conclusions needed for any promised delivery or exterior-use claims.

## Cost and scope controls

No domain was purchased, ads launched, customer outreach sent or paid service selected. Hosting and form service costs need confirmation against the proposal's preparation allowance; no invented monthly price is assumed. Use current infrastructure and a narrow catalogue first. Defer a CMS, uploads, customer accounts, live inventory sync, online samples checkout and automated freight pricing until actual usage justifies them.

The compliance and tariff figures in the proposal were not revalidated in this technical build and are not published as customer promises. Operational professional review remains Kevin's launch workstream.
