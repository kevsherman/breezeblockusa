import { env } from 'cloudflare:workers';
import { quoteSchema } from '@/lib/quote-schema';
export const dynamic='force-dynamic';
const response=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
export async function POST(request:Request){
 const requestOrigin=request.headers.get('origin');
 if(requestOrigin!==new URL(request.url).origin)return response({error:'Please submit from this website.'},403);
 if(!request.headers.get('content-type')?.includes('application/json'))return response({error:'Unsupported request format.'},415);
 if(Number(request.headers.get('content-length')||0)>16000)return response({error:'Please shorten your project notes.'},413);
 let input:unknown;
 try{const text=await request.text();if(text.length>16000)return response({error:'Please shorten your project notes.'},413);input=JSON.parse(text);}catch{return response({error:'Please check your form and try again.'},400);}
 const parsed=quoteSchema.safeParse(input);
 if(!parsed.success)return response({error:'Please check the required fields, ZIP, email and any drawing link.'},400);
 const data=parsed.data;
 if(data.website)return response({error:'Your submission could not be accepted.'},400);
 if(!env.DB)return response({error:'We could not save your enquiry. Please try again later. Your details have not been submitted.'},503);
 try{
  const existing=await env.DB.prepare('SELECT id FROM enquiries WHERE id = ? AND email = ?').bind(data.id,data.email).first();
  if(existing)return response({id:data.id});
  const now=Date.now();
  const result=await env.DB.prepare('INSERT INTO enquiries (id,created_at,email,name,payload,status,notification_status) SELECT ?,?,?,?, ?, ?, ? WHERE (SELECT COUNT(*) FROM enquiries WHERE email = ? AND created_at > ?) < 3').bind(data.id,now,data.email,data.name,JSON.stringify({...data,website:undefined}),'new','pending',data.email,now-600000).run();
  if(!result.meta.changes)return response({error:'Several enquiries have already been received for this email. Please wait ten minutes before trying again.'},429);
  return response({id:data.id},201);
 }catch{return response({error:'We could not confirm your enquiry was saved. Please retry; the same request will not be saved twice.'},503);}
}
