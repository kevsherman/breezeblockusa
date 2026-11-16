import { pageMetadata } from '@/lib/site';
export const metadata = pageMetadata('', 'Architectural Breeze Blocks for the Northwest', 'Explore eight handcrafted architectural concrete breeze block patterns. White and grey finishes, trade support and project quoting for the Pacific Northwest.');

export default function Home() {
 return <>
  <section className="landing-hero" aria-labelledby="hero-title"><img className="landing-hero-image" src="/images/hero.webp" alt="Brand inspiration: a breeze block screen framing an outdoor space at dusk" width="1400" height="1400" fetchPriority="high"/><div className="landing-hero-shade"/><div className="wrap landing-hero-copy"><p className="eyebrow">Architectural concrete / Pacific Northwest</p><h1 id="hero-title">Breeze blocks.<br/><em>Open possibilities.</em></h1><p>Light, air, and a little more character.<br/>Concrete patterns for spaces that feel different.</p><a className="button" href="/breeze-blocks/">Explore the collection <span aria-hidden="true">↗</span></a></div><span className="hero-image-note">Brand design inspiration</span><a className="hero-scroll" href="#the-collection" aria-label="Discover the collection below"><span>Discover</span><span aria-hidden="true">↓</span></a></section>

  <section className="wrap home-introduction" id="the-collection" aria-labelledby="introduction-title">
   <div className="editorial-heading">
    <div><p className="eyebrow">Architectural breeze blocks</p><h2 id="introduction-title">Solid material.<br/><em>Room for possibility.</em></h2></div>
    <div className="editorial-intro"><p>A wall can do more than divide a space. Breeze blocks bring texture, filtered light, and a sense of connection.</p><p>Rooted in mid-century design, made for spaces today. Explore eight patterns for screens, partitions, and architectural details with character.</p></div>
   </div>
  </section>

  <section className="wrap home-collection" aria-labelledby="collection-title">
   <div className="collection-feature collection-introduction">
    <a className="collection-feature-image" href="/breeze-blocks/"><img src="/images/catalog/four-leaf-large-grey-3.webp" alt="Four Leaf concrete blocks arranged in a repeating wall pattern" width="800" height="1000" loading="lazy"/><span className="image-wordmark">BreezeBlock / The collection</span></a>
    <div className="collection-feature-copy">
     <p className="eyebrow">The pattern collection</p><h2 id="collection-title">A little separation.<br/><em>A stronger connection.</em></h2>
     <p>From the soft curves of Four Leaf to the clean geometry of Square on Square. Find a pattern that shapes the light and gives your space a rhythm of its own.</p>
     <div className="feature-facts"><div><span>Patterns</span><strong>Eight designs</strong></div><div><span>Formats</span><strong>Small + large</strong></div><div><span>Finishes</span><strong><i className="colour-dot white"/><i className="colour-dot grey"/> White + grey</strong></div></div>
     <a className="text-link" href="/breeze-blocks/">Explore all eight patterns <span aria-hidden="true">↗</span></a>
    </div>
   </div>
  </section>

  <section className="trade-strip home-trade" aria-labelledby="trade-title"><div className="wrap trade-strip-inner">
   <h2 id="trade-title">For architects,<br/><em>designers, and builders.</em></h2>
   <div><strong>Project pricing</strong><p>Quotes for your scope and quantities.</p></div>
   <div><strong>Sample enquiries</strong><p>Get a feel for the material.</p></div>
   <div><strong>Technical support</strong><p>Dimensions and product references.</p></div>
   <a className="button" href="/trade/">For the trade <span aria-hidden="true">↗</span></a>
  </div></section>

  <section className="home-craft" aria-labelledby="craft-title"><div className="wrap">
   <div className="editorial-heading">
    <div><p className="eyebrow">The production method</p><h2 id="craft-title">Individually<br/><em>handcrafted.</em></h2></div>
    <div className="editorial-intro"><p>Each block starts with a fine blend of cement and sand, shaped by hand with the help of hydraulic presses.</p><p>The process produces crisp edges and a refined finish on both faces, giving the material the same care from either side.</p></div>
   </div>
   <figure className="home-craft-image"><img src="/images/handcrafted.webp" alt="A gloved hand filling a breeze block mould with fine cement and sand aggregate" width="1500" height="1081" loading="lazy"/><figcaption>Fine aggregate. Hydraulic pressing. Care in every block.</figcaption></figure>
  </div></section>

  <section className="wrap home-contact" aria-labelledby="contact-title">
   <div><p className="eyebrow">Get in touch</p><h2 id="contact-title">Let’s make room<br/><em>for your idea.</em></h2></div>
   <div className="home-contact-copy"><p>Have a pattern in mind, a drawing to share, or a question about where to start? Tell us about your project. We’ll help with selection, samples, and delivery.</p><div className="actions"><a className="button" href="/request-a-quote/">Contact us <span aria-hidden="true">↗</span></a><a className="text-link" href="mailto:info@breezeblock.ca">info@breezeblock.ca</a></div></div>
  </section>
 </>;
}
