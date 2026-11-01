import { publicLaunch,origin } from '@/lib/site';
export default function robots(){return {rules:{userAgent:'*',allow:publicLaunch?'/':undefined,disallow:publicLaunch?['/api/','/request-a-quote/']:['/']},sitemap:publicLaunch?origin+'/sitemap.xml':undefined};}
