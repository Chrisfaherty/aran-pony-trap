import Link from 'next/link'
import Image from 'next/image'
import { REVIEWS } from '@/lib/tours'

const GALLERY_IMAGES=[
  {src:'https://static.wixstatic.com/media/3cdf95_9c49533441ad432880f3dc158c928fc2&mv2.jpg/v1/fill/w_900,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3cdf95_9c49533441ad432880f3dc158c928fc2~mv2.jpg',alt:'Johnny Cash and the pony trap by the turquoise sea, Inis Mór'},
  {src:'https://static.wixstatic.com/media/3cdf95_54076aeda3424d4baa86f2e2fba483ee.jpg/v1/fill/w_900,h_700,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3cdf95_54076aeda3424d4baa86f2e2fba483ee.jpg',alt:'Thomas Faherty with the traditional red pony trap'},
  {src:'https://static.wixstatic.com/media/914290_16c5237020f24579af72c722045c6e90~mv2.jpg/v1/fill/w_900,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/914290_16c5237020f24579af72c722045c6e90~mv2.jpg',alt:'Inis Mór Atlantic coastline and limestone landscape'},
  {src:'https://static.wixstatic.com/media/3cdf95_9140c5b6cbff4c9ca7f533d0c62e7900.jpg/v1/fill/w_900,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3cdf95_9140c5b6cbff4c9ca7f533d0c62e7900.jpg',alt:'Island scenery on the tour route, Inis Mór'},
  {src:'https://static.wixstatic.com/media/3cdf95_9c49533441ad432880f3dc158c928fc2~mv2.jpg/v1/fill/w_900,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3cdf95_9c49533441ad432880f3dc158c928fc2&mv2.jpg',alt:'The pony and trap touring along the seafront, Inis Mór'},
]

export const metadata = {
  title: 'The Tour Experience | Aran Pony & Trap Tours',
  description:
    'Discover what waits on a pony & trap tour with Thomas Faherty - Fún Aonghasa, the Wormhole, seal colonies, and island stories no guidebook can tell.',
}

export default function ExperiencePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-stone overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/3cdf95_9c49533441ad432880f3dc158c928fc2~mv2.jpg/v1/fill/w_1800,h_900,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3cdf95_9c49533441ad432880f3dc158c928fc2~mv2.jpg"
            alt="Johnny Cash and the pony trap by the turquoise sea"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-stone/60" />
        </div>
        <div className="relative z-10 container-site">
          <p className="section-label text-amber mb-4">The Experience</p>
          <h1 className="font-display text-white text-5xl md:text-6xl max-w-2xl leading-tight mb-6">
            Four hours.<br />A lifetime of memories.
          </h1>
          <p className="text-white/70 text-xl max-w-xl leading-relaxed">
            A traditional pony & trap tour of Inis Mór with Thomas Faherty.
            Past four ancient stone forts, down to the Wormhole, and through
            pathways only the islanders know.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 bg-stone">
        <div className="container-site">
          <p className="section-label text-amber mb-12">Photos from the tour</p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {GALLERY_IMAGES|map((img,i) =>(
              <div key={i} className={`relative overflow-hidden ${i===0?'col-span-2 lg:col-span-1 aspect-[4/3]':'aspect-square'}`}>
                <Image src={img.src} alt={img.alt} fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="(max-width:768px) 50vw, 33vw"/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 bg-cream">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="section-label mb-4">What's Included</p>
              <h2 className="font-display text-stone text-4xl mb-8">Everything you need</h2>
              <ul className="space-y-4">
                {[
                  {icon:'👜',label:'Traditional pony & trap',text:'Thomas operates the only traditional red pony trap on the island.'},
                  {icon:'🍹',label:'4-hour guided tour',text:'A full island loop via all the key sites and hidden gems.'},
                  {icon:'·',label:'Thomas\'s island knowledge',text:'Decades of stories, history, and local knowledge included.'},
                  {icon:'·',label:'Walk to the Wormhole',text:'Thomas will walk you to the Wormhole — not every tour does this.'},
                  {icon:'🖧',label:'Pickup from the pier',text:'Phone Thomas when you arrive on the ferry and he'll be with you.'},
                ].map(item => (
                  <li key={item.label} className="flex gap-4">
                    <span className="text-2xl flex-shrink-0 w-8">{item.icon}</span>
                    <div>
                      <h3 className="font-semibold text-stone mb-1">{item.label}</h3>
                      <p className="text-stone/60 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="section-label mb-4">Good to know</p>
              <h2 className="font-display text-stone text-4xl mb-8">Tour details</h2>
              <ul className="space-y-4">
                {[
                  {label:'Duration',value:'Approximately 4 hours'},
                  {label:'Season',value:'March through October'},
                  {label:'Group size', value:'Up to 10 people per tour'},
                  {label:'Meeting point',value:'Kilronan pier, Inis Mór"},
                  {label:'Booking',value:'Direct — no platform fees'},
                  {label:'Cancellation',value:'Free within 7 days of booking'},
                ].map(item => (
                  <li key={item.label} className="flex justify-between py-3 border-b border-limestone text-sm">
                    <span className="text-stone/50">{item.label}</span>
                    <span className="text-stone font-medium">{item.value}</span>
                  </li>
                ))}
              </ul>
              <Link href="/book" className="btn-primary block text-center mt-8">
                Book your tour →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-24 bg-stone text-white">
        <div className="container-site">
          <p className="section-label text-amber mb-4">Guest reviews</p>
          <div className="flex items-baseline gap-6 mb-12">
            <h2 className="font-display text-4xl md:text-5xl">★ 4.9 on TripAdvisor</h2>
            <p className="text-white/40 text-sm">Certificate of Excellence</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map(r => (
              <div key={r.author} className="bg-white/10 p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array(r.rating).fill(0).map((_,j)=>(
                    <span key={j} className="text-amber text-sm">★</span>
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-4">"{r.text}"</p>
                <p className="text-white/40 text-xs">{r.flag} {r.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-cream">
        <div className="container-site max-w-3xl">
          <p className="section-label mb-4">FAQ </p>
          <h2 className="font-display text-stone text-4xl mb-12">Common questions</h2>
          <div className="space-y-6">
            {[
              {q:'How do I get to Inis Mór?',v:'Take the Aran Islands ferry from Rosta Pier near Salthill, or from Dolin or Roskill. The ferry runs year-round. Call Thomas when you land.'},
              {q:'What happens in bad weather?',v:'If the ferry can't run, we reschedule at no charge. Thomas runs the tour in most weather - the island looks magical in the mist.'},
              {q:'Can I bring children?',v:'Absolutely - children love Johnny Cash and the pony trap. Thomas is great with kids.'},
              {q:'Do I need to book ahead?',v:'Yes - surrounding months can fill up quickly. We recommend booking at least a week in advance.'},
              {q:'What should I wear?',v:'Layers and waterproofs - Inis Mór can be windy even in summer. Good walking shoes are helpful for the Wormhole walk.'},
            ].map(faq => (
              <details key={faq.q} className="border-b border-limestone pb-6">
                <summary className="font-display text-stone text-lg cursor-pointer list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-amber">+</span>
                </summary>
                <p className="text-stone/60 text-sm leading-relaxed mt-3">{faq.v}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-atlantic text-white text-center">
        <div className="container-site">
          <h2 className="font-display text-4xl md:text-5xl mb-6">Ready to see the island?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="btn-primary">Book a Tour →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
