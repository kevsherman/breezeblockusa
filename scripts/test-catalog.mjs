import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base='http://127.0.0.1:5173';
const data=JSON.parse(await fs.readFile('data/catalog.json','utf8'));
const provenance=JSON.parse(await fs.readFile('data/catalog-provenance.json','utf8'));
assert.equal(data.length,provenance.sourceCount);
assert.equal(new Set(data.map(p=>p.id)).size,24);
const patterns=[...new Set(data.map(p=>p.patternSlug))];assert.equal(patterns.length,8);
const sitemap=await(await fetch(base+'/sitemap.xml')).text();
const index=await(await fetch(base+'/breeze-blocks/')).text();
const titles=new Set();
for(const p of data){
 const path=`/breeze-blocks/${p.patternSlug}/${p.variantSlug}/`;
 assert(index.includes(path),'Product in server-rendered catalogue: '+path);assert(sitemap.includes(path));
 const r=await fetch(base+path,{redirect:'manual'});assert.equal(r.status,200,path);const html=await r.text();
 const title=html.match(/<title>(.*?)<\/title>/)?.[1];assert(title);assert(!titles.has(title));titles.add(title);
 assert(html.includes(p.title));assert(html.includes(p.specs.Weight));assert.match(html,/application\/ld\+json/);
 assert(!/Add to cart|Buy now|>\s*\$\d|From Kamloops|made in the USA/i.test(html),'Quote-only product copy');
 const quote=[...html.matchAll(/href="([^"]*request-a-quote[^\"]*)"/g)].map(m=>m[1].replaceAll('&amp;','&')).find(url=>url.includes('pattern='));assert(quote);
 const q=new URL(quote,base).searchParams;assert.equal(q.get('pattern'),p.title);assert.equal(q.get('finish'),p.finish);
 for(const img of p.images){assert((await fs.stat('public'+img)).size>0)}
 for(const doc of p.documents)assert.equal(new URL(doc.url).protocol,'https:');
}
for(const pattern of patterns){const r=await fetch(base+`/breeze-blocks/${pattern}/`);assert.equal(r.status,200)}
assert.equal((await fetch(base+'/breeze-blocks/empress/not-a-product/')).status,404);
console.log('PASS: all 24 source products, 8 patterns, 90 local images, product metadata/schema, sitemap inclusion, server-rendered catalogue links, specification values, quote selection URLs, and unknown-product 404.');
