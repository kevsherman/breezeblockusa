'use client';
import { useState } from 'react';
import { type CatalogProduct, quotePath } from '@/lib/catalog';
export default function ProductPlanner({product:p}:{product:CatalogProduct}){
 const [area,setArea]=useState(''),[joint,setJoint]=useState('0.375'),[extra,setExtra]=useState('10');
 const width=parseFloat(p.specs.Width)/25.4,height=parseFloat(p.specs.Height)/25.4;
 const valid=area!==''&&joint!==''&&extra!==''&&Number(area)>0&&Number(area)<=100000&&Number(joint)>=0&&Number(joint)<=2&&Number(extra)>=0&&Number(extra)<=50;
 const count=valid?Math.ceil(Number(area)*144/((width+Number(joint))*(height+Number(joint)))*(1+Number(extra)/100)):0;
 const quantity=`${count} blocks estimated for ${area} sq ft; ${joint} in joint; ${extra}% allowance`;
 return <section className="product-planner" aria-labelledby="planner-title"><h2 id="planner-title">Plan your quantity</h2><p>A preliminary area estimate for your project brief.</p><div className="planner-fields"><label>Net wall area (sq ft)<input type="number" min="0.1" max="100000" step="any" value={area} onChange={e=>setArea(e.target.value)} placeholder="e.g. 100"/></label><label>Assumed joint (in)<input type="number" min="0" max="2" step="any" value={joint} onChange={e=>setJoint(e.target.value)}/></label><label>Extra allowance (%)<input type="number" min="0" max="50" step="any" value={extra} onChange={e=>setExtra(e.target.value)}/></label></div><div role="status" aria-live="polite">{valid?<><strong className="estimate-count">About {count.toLocaleString('en-US')} blocks</strong><a className="text-link" href={`${quotePath(p)}&quantity=${encodeURIComponent(quantity)}`}>Use this estimate in my enquiry ↗</a></>:<p>Enter an area to estimate the block count.</p>}</div><p className="fine-print">Assumptions are editable, not installation recommendations. Area ÷ installed module area, plus allowance, rounded up. Openings, edge joints, cuts, supports and pattern layout affect the final takeoff. Have your installer confirm quantities before ordering.</p><button className="text-button print-spec" onClick={()=>window.print()} type="button">Print product specifications ↗</button></section>
}
