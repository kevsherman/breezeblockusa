import { notFound } from 'next/navigation';
import { products,productPath,quotePath } from '@/lib/catalog';
import { pageMetadata,origin } from '@/lib/site';
import ProductPlanner from '@/components/product-planner';
import ProductGallery from '@/components/product-gallery';
import ProductOptions from '@/components/product-options';
import CatalogGrid from '@/components/catalog-grid';
type Props={params:Promise<{pattern:string;variant:string}>};
async function find(params:Props['params']) {
 const {pattern,variant}=await params;
 const product=products.find(p=>p.patternSlug===pattern&&p.variantSlug===variant);
 if(!product)return undefined;
 return {...product,images:product.images.map(image=>image.replace('-matched.webp','.webp'))};
}
export async function generateMetadata({params}:Props){const p=await find(params);return p?{...pageMetadata(productPath(p),p.title,`${p.description} ${p.size} format in ${p.finish.toLowerCase()}. View dimensions, photos and technical references, and request a project quote.`),openGraph:{title:p.title,description:p.description,type:'website',url:origin+productPath(p),images:[{url:origin+p.images[0],alt:p.title}]}}:{title:'Product not found'};}
export default async function Product({params}:Props){
 const p=await find(params);if(!p)notFound();
 const related=products.filter(x=>x.patternSlug===p.patternSlug&&x.id!==p.id);
 const schema={'@context':'https://schema.org','@type':'Product',name:p.title,description:p.description,image:p.images.map(i=>origin+i),color:p.finish,size:p.size,url:origin+productPath(p)};
 const crumbs={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{name:'Home',item:origin+'/'},{name:'Breeze blocks',item:origin+'/breeze-blocks/'},{name:p.pattern,item:origin+`/breeze-blocks/${p.patternSlug}/`},{name:p.title,item:origin+productPath(p)}].map((v,i)=>({'@type':'ListItem',position:i+1,...v}))};
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify([schema,crumbs]).replace(/</g,'\u003c')}}/><section className="wrap product-section"><nav className="breadcrumb" aria-label="Breadcrumb"><a href="/breeze-blocks/">Collection</a> / <a href={`/breeze-blocks/${p.patternSlug}/`}>{p.pattern}</a> / {p.size} {p.finish}</nav><div className="product-layout"><ProductGallery images={p.images} title={p.title}/><div className="product-summary"><p className="eyebrow">Architectural concrete / Breeze blocks</p><h1>{p.pattern}</h1><p className="intro">{p.description}</p><p className="product-variant-name">{p.title}</p><p className="product-retail-price"><strong>${p.retailPrice.toFixed(2)}</strong><span>USD per block · Retail price</span></p><ProductOptions product={p}/><dl className="product-specs">{Object.entries(p.specs).map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><div className="actions"><a className="button" href={quotePath(p)}>Request a quote <span aria-hidden="true">↗</span></a><a className="text-link" href={quotePath(p,'samples')}>Sample enquiry ↗</a></div><ProductPlanner product={p}/></div></div></section><section className="wrap product-resources"><div><p className="eyebrow">The material details</p><h2>Technical references.</h2>{p.documents.length?<ul className="download-list">{p.documents.map(d=><li key={d.url}><a href={d.url} target="_blank" rel="noopener noreferrer"><span>{d.label}</span><span>{d.format} ↗</span></a></li>)}</ul>:<a className="text-link" href={quotePath(p,'technical')}>Request technical files ↗</a>}</div><div><p className="eyebrow">The bigger picture</p><h2>Plan the whole wall.</h2><p>Share the wall area or block count, delivery ZIP, timing, and intended application. We’ll work through the material selection and delivery details with you.</p><p>Wall supports, reinforcement, and installation need project-specific review. A good brief brings the visual idea and the practical details together.</p></div></section><section className="wrap catalog-section"><div className="section-heading"><div><p className="eyebrow">Keep exploring</p><h2>More {p.pattern}<br/>possibilities.</h2></div><a className="text-link" href={`/breeze-blocks/${p.patternSlug}/`}>Explore this pattern ↗</a></div><CatalogGrid products={related} filterable={false}/></section></>;
}
