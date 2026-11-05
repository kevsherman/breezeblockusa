# Design direction — ModaConcrete reference

The owner selected ModaConcrete's overall visual style and page structure as the redesign reference on November 4, 2026.

Reviewed the public homepage, collection presentation, underlying design tokens, and desktop browser rendering:

- https://modaconcrete.com/
- https://modaconcrete.com/collections/breeze-blocks-and-wall-tiles

## Design applied

A warm mineral palette, serif display typography, restrained navigation, large photography, alternating collection stories, a trade section, selected products, material information, and a dedicated project-support area. BreezeBlock's catalogue and quote workflow provide the content and actions.

The homepage now progresses from design inspiration to pattern exploration, trade support, product details, material planning, and a project enquiry. Eight patterns remain accessible from the collection menu and pattern index. The catalogue includes search, combined pattern/format/finish filters, sort controls, and a mobile filter panel. Product pages provide format and finish links, galleries with an accessible image viewer, specification tables, sample enquiries, technical references, and related formats.

`/inspiration/` gathers existing brand image references; its captions distinguish these from independently documented US case studies. Asset provenance remains in ASSET_SOURCES.md. No new competitor assets, prices, facility claims, lead-time promises, or engineering claims are introduced.

The shared design also applies to the existing planning, delivery, regional, trade, resource, privacy and enquiry pages. Business content approval remains part of the launch checklist. The homepage/project support copy is a first design pass for owner review.

## Implementation

- `app/redesign.css`: design tokens, components and responsive styles layered over the existing article/form foundation.
- `components/navigation.tsx`: desktop collection menu, mobile navigation, and wordmark.
- `components/catalog-grid.tsx`: catalogue filtering and sorting.
- `components/product-options.tsx`: catalogue-backed format/finish links.
- `components/product-gallery.tsx`: image selection and native dialog viewer.
- `app/page.tsx`: the new homepage.
- `app/inspiration/page.tsx`: the inspiration gallery, included in the sitemap.

The site stays owner-private with preview indexing disabled. Email/CRM activation, seller/privacy details, approved asset rights, and product/delivery confirmation remain separate launch work.

## Verification scope

Browser review uses an isolated Brave/Chromium session at desktop and emulated mobile widths. It covers collection navigation, mobile menu and search, combined filters, reset and sorting, image thumbnails, dialog keyboard behavior/focus restoration, format/finish routes, sample-prefilled enquiry fields, and mocked form failure/success states. The existing local HTTP suite separately verifies actual D1 submission behavior with sending disabled; the catalogue suite checks all 24 products and eight patterns.

This does not establish Safari/iOS compatibility or field performance. No Lighthouse or Core Web Vitals score is claimed. Resend delivery activation remains in NOTIFICATIONS.md.
