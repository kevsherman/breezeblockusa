# Design direction — ModaConcrete reference

The owner selected ModaConcrete's overall visual style and page structure as the redesign reference on November 4, 2026.

Reviewed the public homepage, collection presentation, underlying design tokens, and desktop browser rendering:

- https://modaconcrete.com/
- https://modaconcrete.com/collections/breeze-blocks-and-wall-tiles

## Design applied

The November 16 homepage follows the owner's simplified ModaConcrete reference: hero image, text introduction, one image-left/copy-right collection section, trade strip, handcrafted production, and a short contact section. The repeated collection features, product grids, inspiration banner, detailed project-support panel, and homepage FAQ are omitted. Eight patterns remain available through the main collection navigation and the collection link.

The production section uses BreezeBlock Canada's actual material photograph and paraphrased manufacturing description, reviewed at https://breezeblock.ca/ on November 16, 2026. Trade copy describes existing enquiry support without importing ModaConcrete's discount, display-program, or response-time promises.

A warm mineral palette, serif display typography, restrained navigation, and large photography preserve the established visual direction. The catalogue includes search, combined pattern/format/finish filters, sort controls, and a mobile filter panel. Product pages provide format and finish links, galleries with an accessible image viewer, specification tables, sample enquiries, technical references, and related formats.

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
