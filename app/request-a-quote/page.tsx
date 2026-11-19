import QuoteForm from '@/components/quote-form';
import { pageMetadata } from '@/lib/site';

export const metadata = { ...pageMetadata('request-a-quote', 'Contact BreezeBlock USA', 'Questions about breeze blocks, samples, or a project? Send BreezeBlock USA a message.'), robots: { index: false, follow: true } };

export default function QuotePage() {
 return <section className="wrap quote-layout simple-contact-page">
  <div className="contact-page-intro"><p className="eyebrow">Contact us</p><h1>Let’s talk about<br/>your project.</h1><p>Tell us what you have in mind, or just ask a question. We’ll help you find the next step.</p><p>Prefer email? <a href="mailto:hello@breezeblockusa.com?subject=US%20project%20enquiry">hello@breezeblockusa.com</a></p></div>
  <QuoteForm/>
 </section>;
}
