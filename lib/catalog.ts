import products from '@/data/catalog.json';
export { products };
export type CatalogProduct = typeof products[number];
export const patterns = [...new Map(products.map(p=>[p.patternSlug,{slug:p.patternSlug,name:p.pattern,description:p.description}])).values()];
export const productPath=(p:CatalogProduct)=>`/breeze-blocks/${p.patternSlug}/${p.variantSlug}/`;
export const quotePath=(p:CatalogProduct,interest='quote')=>`/request-a-quote/?${new URLSearchParams({interest,pattern:p.title,finish:p.finish})}`;
