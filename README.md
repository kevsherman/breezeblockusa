# BreezeBlock USA

Standalone, quote-only US marketing site. No Shopify runtime or checkout.

## Development

Use Node >=22.13.0. Install locked dependencies with `npm run install:ci`, then `npm run dev`. The local URL is printed by Vinext (normally http://127.0.0.1:5173).

The D1 schema must be initialized for local enquiry tests. Run `npm run db:generate` only after schema changes. After building, apply each new migration once using:

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_flawless_charles_xavier.sql
```

## Verification

```sh
node node_modules/typescript/bin/tsc --noEmit
node scripts/test-smoke.mjs
npm run build
```

Smoke checks need the local server and initialized database. They refuse non-loopback hosts and create local test fixtures at example.invalid; no email is sent. Optional `TEST_ORIGIN` selects another local port.

## Content and launch

See [TECHNICAL_ROADMAP.md](TECHNICAL_ROADMAP.md) for priorities, exact public-launch gates, SEO and sales operations. See [ASSET_SOURCES.md](ASSET_SOURCES.md) for image provenance.

- `lib/content.ts`: regional, pattern and information pages.
- `app/page.tsx`: homepage.
- `app/globals.css`: responsive design.
- `lib/site.ts`: intended domain and preview indexing gate.
- `components/quote-form.tsx`: quote interface.
- `lib/quote-schema.ts`: server input validation.
- `app/api/quotes/route.ts`: durable enquiry endpoint.
- `db/schema.ts` and `drizzle/`: schema and versioned migrations.

All enquiries are saved in D1. `notification_status = pending` does not trigger an email: mail/CRM delivery is a public-launch dependency. Owner-only Sites database tools can inspect the queue during review. There is no public listing endpoint. The privacy notice is a preview draft pending the actual legal seller and operational policy.

Do not expose this preview as a public acquisition site merely by flipping `publicLaunch`. Finish the launch checklist and verify domain access, email/CRM delivery and policy content first. Never commit secrets or test database state.

## Catalogue

`data/catalog.json` contains all 24 published source products, normalized into eight pattern groups and distinct size/finish routes. `data/catalog-provenance.json` records source IDs and asset mappings for later reconciliation. `lib/catalog.ts` supplies route and quote helpers. Dedicated pages under `app/breeze-blocks/` render the catalogue, pattern families and products. No checkout, pricing or live inventory synchronization is used.

Run `node scripts/test-catalog.mjs` against the local preview to check source coverage, routes, metadata, images, specification values and quote-selection URLs. Refresh source data deliberately, retaining US copy/availability rules and checking SKU specification changes before republishing.
