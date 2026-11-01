import { z } from 'zod';
const short=z.string().trim().max(160).default('');
export const quoteSchema=z.object({
 id:z.string().uuid(),name:z.string().trim().min(2).max(100),email:z.string().trim().email().max(254).transform(v=>v.toLowerCase()),phone:short,company:short,
 zip:z.string().regex(/^\d{5}(-\d{4})?$/),region:z.enum(['Washington','Idaho','Oregon','Montana','Other']),
 interest:z.enum(['quote','trade','samples','technical']),role:z.enum(['Homeowner','Architect / designer','Builder / installer','Other']),
 pattern:short,finish:z.enum(['Not sure yet','White','Grey','Other']),quantity:z.string().trim().min(1).max(160),
 application:z.enum(['Interior','Sheltered exterior','Exposed exterior','Not sure yet']),timing:short,
 siteType:z.enum(['Residential','Commercial','Construction site','Not sure yet']),unloading:z.enum(['Not sure yet','Loading dock','Forklift','Liftgate requested']),
 notes:z.string().trim().max(2000).default(''),drawingUrl:z.union([z.literal(''),z.string().url().max(1000).refine(v=>v.startsWith('https://'))]).default(''),
 consent:z.literal(true),website:z.string().max(200).default(''),
 attribution:z.object({source:z.string().max(200).default(''),medium:z.string().max(200).default(''),campaign:z.string().max(200).default(''),landing:z.string().max(300).default('')}).optional()
});
