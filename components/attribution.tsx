'use client';
import { useEffect } from 'react';
export default function Attribution(){useEffect(()=>{try{if(!sessionStorage.getItem('bb_first_source')){const q=new URLSearchParams(location.search);sessionStorage.setItem('bb_first_source',JSON.stringify({source:(q.get('utm_source')||'').slice(0,200),medium:(q.get('utm_medium')||'').slice(0,200),campaign:(q.get('utm_campaign')||'').slice(0,200),landing:location.pathname.slice(0,300)}))}}catch{}},[]);return null;}
