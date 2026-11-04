import { env, waitUntil } from 'cloudflare:workers';
import { quoteSchema } from '@/lib/quote-schema';
import { processNotifications } from '@/lib/notifications';
export const dynamic='force-dynamic';
const response=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
const savedResponse=(id:string,status=200)=>{
 if(env.NOTIFICATION_ENABLED==='true')waitUntil(processNotifications(env,{id}).catch(()=>{
  console.error('notification_delivery_failed');
 }));
 return response({id},status);
};
export async function POST(request:Request){
 // Consume bounded input before replying, including rejected submissions. An
 // unread request stream can disrupt subsequent requests in local edge proxies.
 let text='';
 let tooLarge=Number(request.headers.get('content-length')||0)>16000;
 try{
  const reader=request.body?.getReader();
  const decoder=new TextDecoder();
  let bytes=0;
  if(reader){
   while(true){
    const chunk=await reader.read();
    if(chunk.done)break;
    bytes+=chunk.value.byteLength;
    if(bytes>16000){tooLarge=true;await reader.cancel();break;}
    text+=decoder.decode(chunk.value,{stream:true});
   }
   text+=decoder.decode();
  }
 }catch{return response({error:'Please check your form and try again.'},400);}
 const requestOrigin=request.headers.get('origin');
 if(requestOrigin!==new URL(request.url).origin)return response({error:'Please submit from this website.'},403);
 if(!request.headers.get('content-type')?.includes('application/json'))return response({error:'Unsupported request format.'},415);
 if(tooLarge)return response({error:'Please shorten your project notes.'},413);
 let input:unknown;
 try{input=JSON.parse(text);}catch{return response({error:'Please check your form and try again.'},400);}
 const parsed=quoteSchema.safeParse(input);
 if(!parsed.success)return response({error:'Please check the required fields, ZIP, email and any drawing link.'},400);
 const data=parsed.data;
 if(data.website)return response({error:'Your submission could not be accepted.'},400);
 if(!env.DB)return response({error:'We could not save your enquiry. Please try again later. Your details have not been submitted.'},503);
 try{
  const existing=await env.DB.prepare('SELECT id FROM enquiries WHERE id = ? AND email = ?').bind(data.id,data.email).first();
  if(existing)return savedResponse(data.id);
  const now=Date.now();
  const result=await env.DB.prepare('INSERT INTO enquiries (id,created_at,email,name,payload,status,notification_status) SELECT ?,?,?,?, ?, ?, ? WHERE (SELECT COUNT(*) FROM enquiries WHERE email = ? AND created_at > ?) < 3').bind(data.id,now,data.email,data.name,JSON.stringify({...data,website:undefined}),'new','pending',data.email,now-600000).run();
  if(!result.meta.changes)return response({error:'Several enquiries have already been received for this email. Please wait ten minutes before trying again.'},429);
  return savedResponse(data.id,201);
 }catch{return response({error:'We could not confirm your enquiry was saved. Please retry; the same request will not be saved twice.'},503);}
}
