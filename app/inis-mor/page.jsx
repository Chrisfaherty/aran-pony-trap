import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Inis Mór Island Guide | Aran Pony & Trap Tours',
  description:
    'Explore Inis Mór, the largest of the Aran Islands. From Dún Aonghasa to the Wormhole, discover the island by pony & trap with Thomas Faherty.',
}

const SIGHTS = [
  {
    name: 'Dún Aonghasa',
    gaelic: 'Fort of Aonghus',
    desc: 'The spectacular cliff-top stone fort stands 300 feet above the Atlantic on the southern cliffs. One of the finest prehistoric monuments in Europe, dating back over 3000 years.',
    img: 'https://static.wixstatic.com/media/3cdf95_9c49533441ad432880f3dc158c928fc2~mv2.jpg/v1/fill/w_900,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3cdf95_9c49533441ad432880f3dc158c928fc2~mv2.jpg',
  },
  {
    name: 'Poll na bPéist',
    gaelic: 'The Wormhole',
    desc: 'A perfectly rectangular natural pool carved into the limestone cliffs by the Atlantic. One of the most spectacular natural features in Ireland. Thomas will walk you there himself.',
    img: 'https://static.wixstatic.com/media/914290_16c5237020f24579af72c722045c6e90~mv2.jpg/v1/fill/w_900,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/914290_16c5237020f24579af72c722045c6e90~mv2.jpg',
  },
  {
    name: 'Dún Eochaill',
    gaelic: 'Eight forts',
    desc: 'One of four great stone forts on Inis Mór. Thomas will take you past each on the tour, sharing the legends and history of each one.',
    img: 'https://static.wixstatic.com/media/3cdf95_9140c5b6cbff4c9ca7f533d0c62e7900.jpg/v1/fill/w_900,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3cdf95_9140c5b6cbff4c9ca7f533d0c62e7900.jpg',
  },
  {
    name: 'Seal Colony',
    gaelic: 'Rón Phoinne',
    desc: 'At low tide, Atlantic grey seals lounge on the rocks along the sheltered coves. Thomas knows exactly where to spot them.',
    img: 'https://static.wixstatic.com/media/3cdf95_54076aeda3424d4baa86f2e2fba483ee.jpg/v1/fill/w_900,h_700,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3cdf95_54076aeda3424d4baa86f2e2fba483ee.jpg',
  },
]

export default function InisMorPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/3cdf95_9c49533441ad432880f3dc158c928fc2~mv2.jpg/v1/fill/w_1800,h_900,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3cdf95_9c49533441ad432880f3dc158c928fc2~mv2.jpg"
            alt="Inis Mór turquoise coastline"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-stone/60" />
        </div>
        <div className="relative z-10 container-site">
          <p className="section-label text-amber mb-4">Aran Islands, Ireland</p>
          <h1 className="font-display text-white text-5xl md:text-6xl max-w-2xl leading-tight mb-6">
            Inis Mór Island Guide
          </h1>
          <p className="text-white/70 text-xl max-w-xl leading-relaxed">
            Everything you need to know about Ireland's most spectacular island.
          </p>
        </div>
      </section>

      {/* Sights Grid */}
      <section className="py-24 bg-cream">
        <div className="container-site">
          <p className="section-label mb-4">What you'll see</p>
          <h2 className="font-display text-stone text-4xl mb-12">The highlights</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {SIGHTS.map(sight => (
              <div key={sight.name} className="grid md:grid-cols-2 gap-6 items-start">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={sight.img}
                    alt={sight.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <div>
                  <p className="text-xs text-stone/40 uppercase tracking-widest mb-1">{sight.gaelic}</p>
                  <h3 className="font-display text-stone text-2xl mb-3">{sight.name}</h3>
                  <p className="text-stone/60 text-sm leading-relaxed">{sight.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Get There */}
      <section className="py-24 bg-stone text-white">
        <div className="container-site max-w-2xl">
          <p className="section-label text-amber mb-4">Getting there</p>
          <h2 className="font-display text-4xl mb-8">How to reach Inis Mór</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {title:'Ferry from Galway',desc:'Aran Island Ferries runs from Rosta Pier, Salthill. The fastest route – about 40 minutes.'},
              {title:'Ferry from Dolin',desc:'Doilin Ferry runs from Dolin pier in County Clare. Scenic route, seasonal operations.'},
              {title:'By air',
               desc:'Aronmore Air flies from Connemara regional airport. A spectacular 10-minute flight over the Atlantic.'},
            ].map(item => (
              <div key={item.title}>
                <h3 className="font-display text-xl mb-3">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-amber">
        <div className="container-site text-center">
          <h2 className="font-display text-white text-4xl mb-4">Ready to explore Inis Mór?</h2>
          <p className="text-white/80 mb-8">Let Thomas show you the island the way the islanders see it.</p>
          <Link href="/book" className="bg-white text-amber font-semibold px-8 py-4 text-sm tracking-widest uppercase hover:bg-stone hover:text-white transition-colors">
            Book a Tour →
          </Link>
        </div>
      </section>
    </>
  )
}
