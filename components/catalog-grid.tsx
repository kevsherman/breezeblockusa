'use client';
import { useEffect, useState } from 'react';
import { type CatalogProduct, productPath, patterns } from '@/lib/catalog';

export default function CatalogGrid({products,filterable=true}:{products:CatalogProduct[];filterable?:boolean}) {
 const [search,setSearch]=useState(''),[pattern,setPattern]=useState('All patterns'),[size,setSize]=useState('All sizes'),[finish,setFinish]=useState('All finishes'),[sort,setSort]=useState('collection'),[expanded,setExpanded]=useState(false);
 useEffect(()=>{
  const reveal=()=>{if(location.hash==='#catalogue-search'){setExpanded(true);setTimeout(()=>document.getElementById('catalogue-search')?.focus(),0)}};
  reveal();window.addEventListener('hashchange',reveal);return()=>window.removeEventListener('hashchange',reveal);
 },[]);
 const results=products.filter(p=>(pattern==='All patterns'||p.pattern===pattern)&&(size==='All sizes'||p.size===size)&&(finish==='All finishes'||p.finish===finish)&&`${p.title} ${Object.values(p.specs).join(' ')}`.toLowerCase().includes(search.trim().toLowerCase()));
 if(sort==='name')results.sort((a,b)=>a.title.localeCompare(b.title));
 if(sort==='size')results.sort((a,b)=>parseFloat(a.specs.Width)-parseFloat(b.specs.Width)||a.title.localeCompare(b.title));
 const active=!!search||pattern!=='All patterns'||size!=='All sizes'||finish!=='All finishes';
 function reset(){setSearch('');setPattern('All patterns');setSize('All sizes');setFinish('All finishes');setSort('collection')}
 return <>
  {filterable&&<><button className="catalog-mobile-toggle" type="button" onClick={()=>setExpanded(!expanded)} aria-expanded={expanded} aria-controls="catalogue-filters">Filter & sort{active?' · Active filters':''}<span aria-hidden="true">{expanded?'−':'+'}</span></button><div id="catalogue-filters" className={`catalog-filter-panel${expanded?' is-open':''}`}><div className="catalog-filters"><label>Search the collection<input id="catalogue-search" type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Pattern, size, or finish"/></label><label>Pattern<select aria-label="Pattern" value={pattern} onChange={e=>setPattern(e.target.value)}><option>All patterns</option>{patterns.map(p=><option key={p.slug}>{p.name}</option>)}</select></label><label>Format<select aria-label="Format" value={size} onChange={e=>setSize(e.target.value)}><option>All sizes</option><option>Small</option><option>Large</option></select></label><label>Finish<select aria-label="Finish" value={finish} onChange={e=>setFinish(e.target.value)}><option>All finishes</option><option>White</option><option>Grey</option></select></label><label>Sort by<select aria-label="Sort by" value={sort} onChange={e=>setSort(e.target.value)}><option value="collection">Collection order</option><option value="name">Name: A–Z</option><option value="size">Size: small to large</option></select></label></div></div></>}
  <div className="catalog-results"><p role="status" aria-live="polite">{results.length} {results.length===1?'product':'products'}{filterable?` / ${products.length} in the collection`:''}</p>{filterable&&active&&<button type="button" onClick={reset} className="text-button">Clear filters ×</button>}</div>
  <div className="catalog-grid">{results.map(p=><article key={p.id}><a className="catalog-image" href={productPath(p)} aria-label={`View ${p.title}`}><img src={p.images[0]} alt={p.title} width="1000" height="1000" loading="lazy"/>{p.images[1]&&<img className="catalog-hover-image" src={p.images[1]} alt="" aria-hidden="true" width="1000" height="1000" loading="lazy"/>}<span>Explore this block ↗</span></a><p className="eyebrow">{p.size} format / {p.finish}</p><h2><a href={productPath(p)}>{p.pattern}</a></h2><p className="catalog-spec">{p.specs.Width.split(' / ')[0]} × {p.specs.Height.split(' / ')[0]} × {p.specs.Depth.split(' / ')[0]}</p><a className="text-link" href={productPath(p)}>Details & specifications ↗</a></article>)}</div>
  {results.length===0&&<div className="catalog-empty"><h2>A different combination?</h2><p>No blocks match those filters. Try another pattern, format, or finish.</p><button type="button" className="button" onClick={reset}>Show the full collection</button></div>}
 </>;
}
