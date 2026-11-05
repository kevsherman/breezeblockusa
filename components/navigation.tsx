'use client';
import { useEffect, useRef, useState } from 'react';

export function Wordmark({ footer = false }: { footer?: boolean }) {
 return <a href="/" className={`wordmark${footer ? ' wordmark-footer' : ''}`} aria-label="BreezeBlock USA home"><svg viewBox="0 0 36 36" aria-hidden="true"><rect x="1" y="1" width="34" height="34" rx="1"/><path d="M18 18C5 18 5 5 5 5s13 0 13 13Zm0 0C18 5 31 5 31 5s0 13-13 13Zm0 0c13 0 13 13 13 13s-13 0-13-13Zm0 0C18 31 5 31 5 31s0-13 13-13Z"/></svg><span>BreezeBlock<small>USA</small></span></a>;
}

export default function Navigation({patterns}:{patterns:{slug:string;name:string}[]}) {
 const [open, setOpen] = useState(false);
 const header = useRef<HTMLElement>(null);
 const toggle = useRef<HTMLButtonElement>(null);
 useEffect(() => {
  const escape = (event: KeyboardEvent) => {
   if (event.key !== 'Escape') return;
   const expanded = header.current?.querySelector<HTMLDetailsElement>('details[open]');
   const mobileOpen = toggle.current?.getAttribute('aria-expanded') === 'true';
   if (!expanded && !mobileOpen) return;
   setOpen(false);
   expanded?.removeAttribute('open');
   if (expanded) expanded.querySelector('summary')?.focus();
   else toggle.current?.focus();
  };
  const outside = (event: PointerEvent) => {
   if (!header.current?.contains(event.target as Node)) {
    setOpen(false);
    header.current?.querySelectorAll('details[open]').forEach(node => node.removeAttribute('open'));
   }
  };
  window.addEventListener('keydown', escape);
  window.addEventListener('pointerdown', outside);
  return () => { window.removeEventListener('keydown', escape); window.removeEventListener('pointerdown', outside); };
 }, []);
 return <header className="masthead" ref={header}><div className="masthead-inner"><Wordmark/>
   <nav className="desktop-nav" aria-label="Main navigation"><details className="collection-menu"><summary>The collection <span aria-hidden="true">⌄</span></summary><div className="mega-menu"><div><p className="eyebrow">Architectural breeze blocks</p><a className="mega-all" href="/breeze-blocks/">Explore the collection <span aria-hidden="true">↗</span></a><div className="mega-patterns">{patterns.map(p => <a key={p.slug} href={`/breeze-blocks/${p.slug}/`}>{p.name}<span aria-hidden="true">↗</span></a>)}</div></div><a className="mega-feature" href="/request-a-quote/?interest=samples"><img src="/images/catalog/four-leaf-large-white-1.webp" alt="" width="320" height="320"/><span>Start with a sample enquiry ↗</span></a></div></details><a href="/inspiration/">Inspiration</a><a href="/trade/">For the trade</a><a href="/resources/">Resources</a><a href="/delivery/">Delivery</a></nav>
   <div className="masthead-actions"><a className="search-link" href="/breeze-blocks/#catalogue-search" aria-label="Search breeze blocks"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><circle cx="10" cy="10" r="6.5"/><path d="m15 15 6 6"/></svg></a><a className="masthead-quote" href="/request-a-quote/">Request a quote <span aria-hidden="true">↗</span></a><button className="menu-toggle" ref={toggle} type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'}><span/><span/></button></div></div>
  <nav className="mobile-navigation" id="mobile-navigation" aria-label="Mobile navigation" hidden={!open} onClick={event => { if ((event.target as HTMLElement).closest('a')) setOpen(false); }}><a href="/breeze-blocks/">The collection <span>↗</span></a><a href="/inspiration/">Inspiration <span>↗</span></a><a href="/trade/">For the trade <span>↗</span></a><a href="/resources/">Resources <span>↗</span></a><a href="/delivery/">Delivery <span>↗</span></a><a href="/request-a-quote/?interest=samples">Sample enquiries <span>↗</span></a><a className="mobile-quote" href="/request-a-quote/">Tell us about your project <span>↗</span></a></nav>
 </header>;
}
