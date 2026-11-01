# Asset provenance

The user identified https://breezeblock.ca as the brand and product reference on November 1, 2026. Downloaded existing public brand assets for this US preview; no competitor imagery used.

- `hero.webp`: https://breezeblock.ca/cdn/shop/files/Claid_2e8e2d442a3d4416991dcc09a8ffff78.webp?v=1784665484&width=1400 — Canadian homepage brand inspiration; not verified as an installed customer project. Labelled accordingly.
- `four-leaf.jpg`: https://breezeblock.ca/cdn/shop/files/shamrock_1_1_nologo.jpg?v=1726180775&width=640
- `empress.jpg`: https://breezeblock.ca/cdn/shop/files/Empress_gray_1.jpg?v=1726789672&width=640
- `square-on-square.jpg`: https://breezeblock.ca/cdn/shop/files/square_white_2.jpg?v=1726787965&width=640
- `logo.png`: https://breezeblock.ca/cdn/shop/files/2025-Feb3-Logo.png?v=1738611432&width=600 — reference asset only; reads Canada, so not used as a US logo.

The US wordmark and palette are a proposed design direction, not a claim that a new corporate identity has been approved. Small CSS pattern studies are decorative, not product specifications. Final US asset rights and installation claims remain a public-release check.

## Full catalogue import — November 1, 2026

Imported all 24 published products from the public products feed, with page 2 verified empty. The source catalogue has eight patterns and 24 size/finish combinations. `data/catalog-provenance.json` maps all original product IDs, URLs and image sources to US routes. `data/catalog.json` stores the normalized public catalogue.

90 product images are hosted locally as WebP. Dimensions and per-block weights come from the rendered Dimensions & Weight table, not the variant shipping-weight field (which contains inconsistencies for some products). Inch values are calculated from the metric dimensions. 92 product-level document links point to existing technical references; repeated documents across finishes are intentional. No prices, source inventory counts, case-size assumptions or source checkout controls are imported. Product descriptions are concise pattern descriptions written for this site.
