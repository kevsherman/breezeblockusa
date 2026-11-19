import type { Metadata } from 'next';
import './globals.css';
import './redesign.css';
import Attribution from '@/components/attribution';
import Navigation, { Wordmark } from '@/components/navigation';
import { publicLaunch, origin } from '@/lib/site';
export const metadata: Metadata = {title:'BreezeBlock USA',description:'Architectural breeze blocks for Northwest projects.',metadataBase:new URL(origin),robots:{index:publicLaunch,follow:publicLaunch},icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="en"><body><Attribution/><a className="skip-link" href="#main">Skip to content</a><Navigation/><main id="main">{children}</main><footer className="site-footer"><div className="wrap footer-simple"><div className="footer-simple-top"><div><Wordmark footer/><p>Architectural breeze blocks for the Pacific Northwest.</p></div><nav aria-label="Footer navigation"><a href="/breeze-blocks/">Catalog</a><a href="/trade/">Trade</a><a href="/request-a-quote/">Contact</a></nav></div><div className="footer-simple-bottom"><span>© {new Date().getFullYear()} BreezeBlock USA</span><div className="footer-simple-policies"><a href="/privacy/">Privacy</a><a href="/returns/">Returns</a></div><span>Washington · Oregon · Idaho · Montana</span></div></div></footer></body></html>;
}
