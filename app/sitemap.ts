import { pages } from '@/lib/content';
import { products,patterns,productPath } from '@/lib/catalog';
import { origin } from '@/lib/site';
export default function sitemap(){const paths=new Set(['/','/breeze-blocks/','/inspiration/',...Object.keys(pages).filter(k=>k!=='privacy').map(k=>'/'+k+'/'),...patterns.map(p=>`/breeze-blocks/${p.slug}/`),...products.map(productPath)]);return [...paths].map(path=>({url:origin+path,changeFrequency:'monthly' as const,priority:path==='/'?1:path.startsWith('/service-areas/')?0.8:0.6}));}
