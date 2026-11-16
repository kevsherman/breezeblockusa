'use client';
import { useEffect, useRef, useState } from 'react';

export function Wordmark({ footer = false }: { footer?: boolean }) {
 return <a href="/" className={`wordmark${footer ? ' wordmark-footer' : ''}`} aria-label="BreezeBlock USA home"><svg viewBox="0 0 36 36" aria-hidden="true"><rect x="1" y="1" width="34" height="34" rx="1"/><path d="M18 18C5 18 5 5 5 5s13 0 13 13Zm0 0C18 5 31 5 31 5s0 13-13 13Zm0 0c13 0 13 13 13 13s-13 0-13-13Zm0 0C18 31 5 31 5 31s0-13 13-13Z"/></svg><span>BreezeBlock<small>USA</small></span></a>;
}

const navigationLinks = [
 { label: 'Home', href: '/' },
 { label: 'Catalog', href: '/breeze-blocks/' },
 { label: 'Trade', href: '/trade/' },
 { label: 'Contact', href: '/request-a-quote/' },
];

export default function Navigation() {
 const [open, setOpen] = useState(false);
 const header = useRef<HTMLElement>(null);
 const toggle = useRef<HTMLButtonElement>(null);
 useEffect(() => {
  const escape = (event: KeyboardEvent) => {
   if (event.key !== 'Escape') return;
   if (toggle.current?.getAttribute('aria-expanded') !== 'true') return;
   setOpen(false);
   toggle.current?.focus();
  };
  const outside = (event: PointerEvent) => {
   if (!header.current?.contains(event.target as Node)) {
    setOpen(false);
   }
  };
  window.addEventListener('keydown', escape);
  window.addEventListener('pointerdown', outside);
  return () => { window.removeEventListener('keydown', escape); window.removeEventListener('pointerdown', outside); };
 }, []);
 return <header className="masthead" ref={header}><div className="masthead-inner"><Wordmark/>
   <nav className="desktop-nav" aria-label="Main navigation">{navigationLinks.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
   <button className="menu-toggle" ref={toggle} type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'}><span/><span/></button>
  </div>
  <nav className="mobile-navigation" id="mobile-navigation" aria-label="Mobile navigation" hidden={!open} onClick={event => { if ((event.target as HTMLElement).closest('a')) setOpen(false); }}>{navigationLinks.map(link => <a key={link.href} href={link.href}>{link.label}<span aria-hidden="true">↗</span></a>)}</nav>
 </header>;
}
