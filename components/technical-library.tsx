'use client';
import { useState } from 'react';
import { type CatalogProduct, productPath } from '@/lib/catalog';
export default function TechnicalLibrary({products}:{products:CatalogProduct[]}){
 const [query,setQuery]=useState('');
 const matches=products.filter(p=>`${p.title} ${p.documents.map(d=>d.format).join(' ')}`.toLowerCase().includes(query.toLowerCase().trim()));
 return <section className="technical-library" aria-labelledby="library-heading"><h2 id="library-heading">Find your product files</h2><p>Published catalogue references, hosted by BreezeBlock Canada. Match the product and revision with your quote before specification.</p><label className="field">Search by pattern, finish or file format<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="e.g. Four Leaf or DWG"/></label><p role="status">{matches.length} products</p>{matches.map(p=><details key={p.id}><summary>{p.title}</summary><ul className="download-list">{p.documents.map(d=><li key={d.url}><a href={d.url} target="_blank" rel="noopener noreferrer"><span>{d.label}</span><span>{d.format} ↗<span className="sr-only"> (opens a new tab)</span></span></a></li>)}</ul><a className="text-link" href={productPath(p)}>View product specifications ↗</a></details>)}{!matches.length&&<p>No matching files. Try a pattern name or <button className="text-button" onClick={()=>setQuery('')}>clear the search</button>.</p>}</section>;
}
