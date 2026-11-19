import QuoteForm from '@/components/quote-form';
import { Tag, Box, ClipboardList, MessagesSquare, Check } from 'lucide-react';
import { pageMetadata } from '@/lib/site';
import styles from './trade.module.css';

export const metadata = pageMetadata('trade', 'Breeze Blocks for Architects, Designers & Trade', 'Explore breeze block patterns, request samples and trade pricing, and download drawings for Pacific Northwest projects.');

const enquiry = '#trade-application';
const resources = [
  { title: 'CAD drawings', image: 'drawing', alt: 'Four Leaf block shown in front, top and isometric views', files: ['PDF', 'DWG'] },
  { title: 'BIM + 3D models', image: 'model', alt: 'Four Leaf model showing the depth of its openings', files: ['STEP', 'SKP'] },
];

export default function TradePage() {
  return <div className={styles.page}>
    <section className={styles.hero}>
      <img src="/images/trade/courtyard.webp" alt="White circular breeze blocks screening a landscaped courtyard" fetchPriority="high" />
      <div className="wrap"><p className="eyebrow">For Professionals</p>
        <h1>Trade Program</h1><p>Trade pricing, samples, exclusive designs, and technical resources for interior designers, architects, and other trade professionals.</p>
        <div className="actions"><a className="button" href={enquiry}>Apply for trade access</a><a className="button" href="#trade-resources">Explore resources</a></div>
      </div>
    </section>
    <ul className={'wrap ' + styles.benefits}>
      {[
        { Icon: Tag, title: '25%', copy: 'Trade pricing for approved professionals.' },
        { Icon: Box, title: 'Exclusive designs', copy: 'Access to trade-exclusive and special-order patterns.' },
        { Icon: ClipboardList, title: 'Technical resources', copy: 'CAD, STEP, PDFs and specifications.' },
        { Icon: MessagesSquare, title: 'Project support', copy: 'Samples, quantities, freight and project guidance.' },
      ].map(({ Icon, title, copy }) => <li key={title}><Icon aria-hidden="true"/><div><h2>{title}</h2><p>{copy}</p></div></li>)}
    </ul>
    <section className={'wrap ' + styles.split}>
      <img src="/images/trade/collection.webp" alt="Five white concrete blocks with circular, angular and sunburst patterns" loading="lazy" />
      <div><p className="eyebrow">The trade collection</p><h2>Beyond the core collection.</h2>
        <p>Explore an expanded collection of architectural concrete designs available by special order, including patterns and formats beyond our standard collection.</p>

      </div>
    </section>
    <section className={styles.resources} id="trade-resources"><div className="wrap">
      <div className={styles.resourceIntro}><p className="eyebrow">Specify with confidence</p><h2>Everything you need to specify Breeze Block.</h2>
      <p>Download product specifications, CAD, 3D models and installation resources.</p>
      <ul className={styles.resourceBenefits}>{[
        { Icon: ClipboardList, title: 'Product specifications', copy: 'Dimensions, performance and material data' },
        { Icon: Box, title: 'CAD & 3D files', copy: 'PDF, DWG, STEP and SketchUp files' },
        { Icon: Check, title: 'Installation guidance', copy: 'Guidance for interior and exterior applications' },
      ].map(({ Icon, title, copy }) => <li key={title}><Icon aria-hidden="true"/><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ul></div>
      <div className={styles.cards}>{resources.map(resource => <article key={resource.image}>
        <img src={'/images/trade/' + resource.image + '.webp'} alt={resource.alt} loading="lazy" />
        <h3>{resource.title}</h3><p>{resource.image === 'drawing' ? 'Dimensioned drawings and technical details.' : '3D files for design and coordination.'}</p><div className="actions">{resource.files.map(format => <span className={styles.fileFormat} key={format}>{format}</span>)}</div>
      </article>)}</div>
    </div></section>
    <section className={styles.application} id="trade-application">
      <img src="/images/trade/patio.webp" alt="Breeze block screen framing an outdoor seating area" loading="lazy" />
      <div className={styles.applicationCopy}><p className="eyebrow">Join the trade program</p><h2>Apply for trade access.</h2>
        <p>Get 25% trade discount, access to exclusive designs and support for your projects.</p>
        <QuoteForm trade/>
      </div>
    </section>
  </div>;
}
