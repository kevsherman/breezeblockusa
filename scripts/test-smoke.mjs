import assert from 'node:assert/strict';
const base=process.env.TEST_ORIGIN||'http://127.0.0.1:5173';
assert(['127.0.0.1','localhost'].includes(new URL(base).hostname),'Test fixtures must only run locally');
const paths=['/','/breeze-blocks/','/breeze-blocks/four-leaf/','/breeze-blocks/empress/','/breeze-blocks/square-on-square/','/service-areas/','/service-areas/washington/','/service-areas/idaho/','/service-areas/oregon/','/trade/','/delivery/','/resources/','/guides/planning-a-breeze-block-wall/','/privacy/','/returns/','/request-a-quote/'];
const titles=new Set();
for(const path of paths){const r=await fetch(base+path);assert.equal(r.status,200,path);const html=await r.text();assert.match(html,/<h1[ >]/);assert.match(html,/name="description"/);assert.match(html,/rel="canonical"/);assert.match(html,/noindex/);const title=html.match(/<title>(.*?)<\/title>/)?.[1];assert(title);assert(!titles.has(title),'Unique title '+path);titles.add(title);assert(!/Add to cart|Buy now/i.test(html));
 const links=[...html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)].map(m=>m[1]).filter(v=>!v.startsWith('/@')&&!v.startsWith('/node_modules')&&!v.startsWith('/app/')&&!v.startsWith('/components/')&&!v.startsWith('/__'));
 for(const link of new Set(links)){const linked=await fetch(base+link);assert(linked.status<400,`${path} -> ${link}: ${linked.status}`)}
}
assert.equal((await fetch(base+'/not-a-real-page/')).status,404);
const robots=await(await fetch(base+'/robots.txt')).text();assert.match(robots,/Disallow: \//);
const sitemap=await(await fetch(base+'/sitemap.xml')).text();assert.match(sitemap,/https:\/\/breezeblockusa.com\/service-areas\/washington\//);
const email=`qa-${Date.now()}@example.invalid`;
const payload={id:crypto.randomUUID(),name:'Local QA fixture',email,zip:'98101',region:'Washington',interest:'quote',role:'Homeowner',finish:'Not sure yet',quantity:'100 sq ft',application:'Interior',siteType:'Residential',unloading:'Not sure yet',consent:true};
const post=(body,origin=base)=>fetch(base+'/api/quotes',{method:'POST',headers:{'Content-Type':'application/json',Origin:origin},body:JSON.stringify(body)});
assert.equal((await post(payload,'https://untrusted.invalid')).status,403);
assert.equal((await post({...payload,email:'invalid'})).status,400);
assert.equal((await post({...payload,consent:false})).status,400);
assert.equal((await post({...payload,website:'spam'})).status,400);
assert.equal((await post({...payload,drawingUrl:'javascript:alert(1)'})).status,400);
assert.equal((await post({...payload,notes:'a'.repeat(17000)})).status,413);
const created=await post(payload);assert.equal(created.status,201,await created.clone().text());assert.equal((await created.json()).id,payload.id);
assert.equal((await post(payload)).status,200,'Idempotent retry');
for(let i=0;i<2;i++)assert.equal((await post({...payload,id:crypto.randomUUID()})).status,201);
assert.equal((await post({...payload,id:crypto.randomUUID()})).status,429,'Rate limit');
console.log(`PASS: ${paths.length} pages, internal links/assets, unique metadata, no checkout, 404, robots, sitemap, quote persistence response, validation, origin checks, retry deduplication and rate limit.`);
console.log(`Local fixture email: ${email}; expected three stored rows. No email or CRM messages sent.`);
