import Link from 'next/link'
import Image from 'next/image'
import { REVIEWS, CANCELLATION_POLICY, OPERATING_SEASON } from '@/lib/tours'

export const metadata = {
  title: 'The Tour Experience',
  description:
    'Everything you need to know about a pony & trap tour on Inis Mór with Thomas Faherty. Tour highlights, photos, reviews, and FAQ.',
}

const FAQS = [
  {
    q: 'Do I need to book in advance?',
    a: 'We strongly recommend booking in advance, especially in peak season (June–August). Tours can fill up quickly on busy ferry days. You can book right here on our site.',
  },
  {
    q: 'Is it suitable for children?',
    a: 'Absolutely. Children love the pony & trap experience. Johnny Cash is a gentle, experienced tour horse. We welcome families with children of all ages.',
  },
  {
    q: 'What if the weather is bad?',
    a: "Inis Mór has its own microclimate and tours run in most weather — the island is beautiful in all conditions. If the ferry isn't running due to severe weather, you'll receive a full refund.",
  },
  {
    q: 'Is the tour wheelchair accessible?',
    a: 'Please contact Thomas directly to discuss your needs. We will do our best to accommodate everyone.',
  },
  {
    q: 'How do I get to Inis Mór?',
    a: 'Ferry from Rossaveal (40 min) or Doolin (75 min). Aran Island Ferries and Doolin2Aran Ferries run regular services. You can also fly from Inverin Airport with Aer Árann Islands.',
  },
  {
    q: 'Can I book a private tour for a larger group?',
    a: 'Yes — we have carriages for up to 10 people. See our pricing page or contact Thomas directly to arrange a private group tour.',
  },
]

const GALLERY_IMAGES = [
  { src: 'https://static.wixstatic.com/media/3cdf95_9c49533441ad432880f3dc158c928fc2~mv2.jpg/v1/fill/w_900,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3cdf95_9c49533441ad432880f3dc158c928fc2~mv2.jpg', alt: 'Johnny Cash and the pony trap by the turquoise sea, Inis Mór' },
  { src: 'https://static.wixstatic.com/media/3cdf95_54076aeda3424d4baa86f2e2fba483ee.jpg/v1/fill/w_900,h_700,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3cdf95_54076aeda3424d4baa86f2e2fba483ee.jpg', alt: 'Thomas Faherty with the traditional red pony trap' },
  { src: 'https://static.wixstatic.com/media/914290_16c5237020f24579af72c722045c6e90~mv2.jpg/v1/fill/w_900,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/914290_16c5237020f24579af72c722045c6e90~mv2.jpg', alt: 'Inis Mór Atlantic coastline and limestone landscape' },
  { src: 'https://static.wixstatic.com/media/3cdf95_9140c5b6cbff4c9ca7f533d0c62e7900.jpg/v1/fill/w_900,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3cdf95_9140c5b6cbff4c9ca7f533d0c62e7900.jpg', alt: 'Island scenery on the tour route, Inis Mór' },
  { src: 'https://static.wixstatic.com/media/3cdf95_9c49533441ad432880f3dc158c928fc2~mv2.jpg/v1/fill/w_900,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3cdf95_9c49533441ad432880f3dc158c928fc2~mv2.jpg', alt: 'The pony and trap touring along the seafront, Inis Mór' },
]

export default function ExperiencePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-atlantic overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://static.wixstatic.com/media/3cdf95_9c49533441ad432880f3dc158c928fc2~mv2.jpg/v1/fill/w_1800,h_900,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3cdf95_9c49533441ad432880f3dc158c928fc2~mv2.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 container-site">
          <p className="section-label text-amber mb-4">The experience</p>
          <h1 className="font-display text-white text-5xl md:text-6xl max-w-2xl leading-tight mb-6">
            A tour like no guidebook could describe.
          </h1>
          <p className="text-white/70 text-lg max-w-xl leading-relaxed mb-8">
            Thomas Faherty has been sharing the secrets of Inis Mór for decades.
            Four hours. A pony called Johnny Cash. Stories you'll tell for the rest of your life.
          </p>
          <Link href="/book" className="btn-primary">Book Your Tour →</Link>
        </div>
      </section>

      {/* Tour Highlights */}
      <section className="py-24 bg-cream">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="section-label mb-4">What's included</p>
              <h2 className="font-display text-stone text-4xl mb-8">Every tour includes</h2>
              <ul className="space-y-4">
                {[
                  { icon: '🏰', title: 'Dún Aonghasa', desc: 'The iconic Iron Age cliff-top fort, 300ft above the Atlantic. We\'ll stop so you can hike up and stand at the edge.' },
                  { icon: '🌀', title: 'The Wormhole (Poll na bPéist)', desc: 'Thomas will personally walk you to this mysterious rectangular tidal pool carved by nature into the limestone — most tourists never find it.' },
                  { icon: '🦭', title: 'Seal spotting', desc: 'At low tide, we look for the resident grey seal colony along the sheltered coves.' },
                  { icon: '🗿', title: 'Four ancient stone forts', desc: 'Dún Aonghasa, Dún Duchathair, Dún Eochla, and Dun Eoghanachta — each with its own extraordinary story.' },
                  { icon: '📸', title: 'Photography stops', desc: 'Thomas knows every perfect angle and viewpoint on the island. You\'ll stop wherever the shot demands it.' },
                  { icon: '📖', title: 'Island stories', desc: 'History, folklore, family stories, and island life — shared by someone who has lived it all.' },
                ].map(item => (
                  <li key={item.title} className="flex gap-4">
                    <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <h3 className="font-display text-stone text-lg leading-tight">{item.title}</h3>
                      <p className="text-stone/60 text-sm mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tour details sidebar */}
            <div className="bg-white border border-limestone p-8 sticky top-24">
              <h3 className="font-display text-stone text-2xl mb-6">Tour details</h3>
              <dl className="space-y-4 text-sm">
                {[
                  { label: 'Duration',  val: '4 hours' },
                  { label: 'Season',    val: 'March – October' },
                  { label: 'Transport', val: 'Traditional pony & trap' },
                  { label: 'Guide',     val: 'Thomas Faherty' },
                  { label: 'Pony',      val: 'Johnny Cash' },
                  { label: 'Languages', val: 'English & Irish' },
                  { label: 'Departs',   val: 'Kilronan Pier, Inis Mór' },
                ].map(d => (
                  <div key={d.label} className="flex justify-between border-b border-limestone pb-4">
                    <dt className="text-stone/40 uppercase tracking-wide text-xs font-semibold">{d.label}</dt>
                    <dd className="text-stone font-semibold">{d.val}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 space-y-3">
                <Link href="/book" className="btn-primary w-full text-center block">
                  Book Now →
                </Link>
                <a href="tel:+353852859777" className="block text-center text-stone/50 text-sm hover:text-amber transition-colors">
                  Or call: +353 (0) 852 859 777
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-24 bg-stone">
        <div className="container-site mb-12">
          <p className="section-label text-amber mb-3">Gallery</p>
          <h2 className="font-display text-white text-4xl">Inis Mór through the seasons</h2>
        </div>
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {GALLERY_IMAGES.map((img, i) => (
              <div key={i} className={`relative overflow-hidden ${i === 0 ? 'col-span-2 md:col-span-1 aspect-square' : 'aspect-square'}`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-24 bg-cream">
        <div className="container-site">
          <p className="section-label mb-3">What visitors say</p>
          <h2 className="font-display text-stone text-4xl mb-12">★ 4.9 — TripAdvisor Certificate of Excellence</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map(r => (
              <div key={r.id} className="bg-white border border-limestone p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array(r.rating).fill(0).map((_, i) => <span key={i} className="text-amber">★</span>)}
                </div>
                <p className="text-stone/70 text-sm leading-relaxed mb-4">"{r.text}"</p>
                <p className="text-stone/40 text-xs font-semibold tracking-wide">{r.flag} {r.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="container-site max-w-2xl">
          <p className="section-label mb-3">FAQ</p>
          <h2 className="font-display text-stone text-4xl mb-12">Common questions</h2>
          <div className="space-y-6">
            {FAQS.map(faq => (
              <div key={faq.q} className="border-b border-limestone pb-6">
                <h3 className="font-display text-stone text-lg mb-2">{faq.q}</h3>
                <p className="text-stone/60 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          {/* Cancellation policy */}
          <div className="mt-12 bg-cream p-6 border border-limestone">
            <h3 className="font-display text-stone text-xl mb-4">Cancellation policy</h3>
            <ul className="space-y-2">
              {CANCELLATION_POLICY.map((p, i) => (
                <li key={i} className="text-stone/60 text-sm flex gap-2">
                  <span className="text-amber flex-shrink-0">—</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-atlantic text-white text-center">
        <div className="container-site">
          <h2 className="font-display text-4xl mb-4">Ready to see Inis Mór?</h2>
          <p className="text-white/60 mb-8">Book directly with Thomas. No platform fees. No middleman.</p>
          <Link href="/book" className="btn-primary">Book Your Tour →</Link>
        </div>
      </section>
    </>
  )
}
