import { products, productPath, type CatalogProduct } from '@/lib/catalog';
export default function ProductOptions({product}:{product:CatalogProduct}) {
 const family=products.filter(p=>p.patternSlug===product.patternSlug);
 const formats=[...new Set(family.map(p=>p.size))].sort((a,b)=>a==='Small'?-1:b==='Small'?1:0);
 const finishes=[...new Set(family.filter(p=>p.size===product.size).map(p=>p.finish))];
 return <div className="product-options"><div><h2>Format / {product.size}</h2><div className="option-links">{formats.map(size=>{const p=family.find(p=>p.size===size&&p.finish===product.finish)||family.find(p=>p.size===size)!;return <a className="product-option" key={size} href={productPath(p)} aria-current={size===product.size?'page':undefined}>{size}</a>})}</div></div><div><h2>Finish / {product.finish}</h2><div className="option-links">{finishes.map(finish=>{const p=family.find(p=>p.size===product.size&&p.finish===finish)!;return <a className="product-option" key={finish} href={productPath(p)} aria-current={finish===product.finish?'page':undefined}><span className={`finish-swatch ${finish.toLowerCase()}`} aria-hidden="true"/>{finish}</a>})}</div></div></div>;
}
