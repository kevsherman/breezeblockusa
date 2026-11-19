import { products } from '@/lib/catalog';
import { pageMetadata } from '@/lib/site';
import styles from './trade.module.css';

export const metadata = pageMetadata('trade', 'Breeze Blocks for Architects, Designers & Trade', 'Explore breeze block patterns, request samples and trade pricing, and download drawings for Pacific Northwest projects.');

const enquiry = '/request-a-quote/?interest=trade';
const fourLeaf = products.find(product => product.patternSlug === 'four-leaf' && product.size === 'Large')!;
const resources = [
  { title: 'Dimensioned drawings', image: 'drawing', alt: 'Four Leaf block shown in front, top and isometric views', files: fourLeaf.documents.filter(file => ['Dimensioned Drawing', 'CAD Drawing'].includes(file.label)) },
  { title: '3D models', image: 'model', alt: 'Four Leaf model showing the depth of its openings', files: fourLeaf.documents.filter(file => ['STEP', 'SKP'].includes(file.format)) },
];

export default function TradePage() {
  return <div className={styles.page}>
    <section className={styles.hero}>
      <img src="/images/trade/courtyard.webp" alt="White circular breeze blocks screening a landscaped courtyard" fetchPriority="high" />
      <div className="wrap"><p className="eyebrow">For architects, designers, and builders</p>
        <h1>BreezeBlock Trade</h1><p>Choose a pattern, work out quantities, and get project pricing for your Pacific Northwest build.</p>
        <div className="actions"><a className="button" href={enquiry}>Ask about trade pricing</a><a href="#trade-resources">Explore technical files</a></div>
      </div>
    </section>
    <section className={'wrap ' + styles.split}>
      <img src="/images/trade/collection.webp" alt="Five white concrete blocks with circular, angular and sunburst patterns" loading="lazy" />
      <div><p className="eyebrow">The trade collection</p><h2>Find the right block for your project.</h2>
        <p>Explore our eight catalog patterns or ask about a special-order design. We can help you check sample availability, estimate freight, and price the quantities on your plans.</p>
        <a className="text-link" href="/breeze-blocks/">Browse the catalog</a>
      </div>
    </section>
    <section className={styles.resources} id="trade-resources"><div className="wrap">
      <p className="eyebrow">Technical resources</p><h2>Specify the details.</h2>
      <p>Download drawings and models for Large Four Leaf below, or find files for another pattern in the <a href="/resources/#library-heading">technical library</a>.</p>
      <div className={styles.cards}>{resources.map(resource => <article key={resource.image}>
        <img src={'/images/trade/' + resource.image + '.webp'} alt={resource.alt} loading="lazy" />
        <h3>{resource.title}</h3><div className="actions">{resource.files.map(file => <a className="text-link" key={file.url} href={file.url} aria-label={'Large Four Leaf ' + file.label + ' (' + file.format + ')'}>{file.format}</a>)}</div>
      </article>)}</div>
    </div></section>
    <section className={'wrap ' + styles.split}>
      <div><p className="eyebrow">Trade enquiries</p><h2>Tell us what you’re planning.</h2>
        <p>Send a sketch, a pattern you like, or a question about a site. We’ll help you work through the next steps.</p>
        <a href={enquiry} className="button">Start a trade enquiry</a>
      </div><img src="/images/trade/patio.webp" alt="Breeze block screen framing an outdoor seating area" loading="lazy" />
    </section>
  </div>;
}
