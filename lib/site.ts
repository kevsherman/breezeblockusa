import type { Metadata } from 'next';
export const origin = 'https://breezeblockusa.com';
// Enable only after the public-launch checklist passes.
export const publicLaunch = false;
export function pageMetadata(path: string, title: string, description: string): Metadata {
 const url = `${origin}/${path ? path.replace(/^\/+|\/+$/g, '')+'/' : ''}`;
 return { title: `${title} | BreezeBlock USA`, description, alternates: { canonical: url }, openGraph: { title, description, type:'website', siteName:'BreezeBlock USA', url } };
}
