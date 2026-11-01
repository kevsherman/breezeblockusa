import { pages } from '@/lib/content';
import { origin } from '@/lib/site';
export default function sitemap(){return ['',...Object.keys(pages).filter(k=>k!=='privacy')].map(p=>({url:origin+'/'+(p?p+'/':''),changeFrequency:'monthly' as const,priority:p===''?1:p.startsWith('service-areas/')?0.8:0.6}));}
