import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Inis Mór Travel Guide',
  description:
    'Everything you need to know about visiting Inis Mór, Aran Islands. Getting there, what to see, Dún Aonghasa, the Wormhole, seal colony and more.',
}

const FORTS = [
  {
    name: 'Dún Aonghasa',
    location: 'South coast, Inis Mór',
    desc: 'The most spectacular of the Aran forts — a semi-circular stone structure perched on a 300-foot cliff overlooking the Atlantic. Three terraced walls enclose an inner platform right at the cliff edge. Late Bronze Age objects including rings, tools, and beads were found here and are now in the National Museum in Dublin.',
    highlight: 'Standing at the cliff edge is one of the most dramatic experiences in all of Ireland.',
    img: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80',
  },
  {
    name: 'Dún Duchathair',
    location: 'The Black Fort, Killeany',
    desc: 'Situated on the cliffs at Killeany, this dramatic fort consists of a terraced wall surrounding the remains of early stone dwelling houses known as Clochans — the beehive-shaped stone structures unique to this part of Ireland.',
    highlight: 'One of the oldest inhabited sites on the island.',
    img: 'https://images.unsplash.com/photo-1563906267088-b029e7101114?w=800&q=80',
  },
  {
    name: 'Dún Eochla',
    location: 'Middle of the island',
    desc: 'Located in the heart of Inis Mór and easily accessed from the main road, Dún Eochla consists of two terraced stone walls. Nearby are the remains of an early 19th-century lighthouse — an unusual combination of ancient and relatively modern history.',
    highlight: 'Great views across the island in all directions.',
    img: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80',
  },
  {
    name: 'Dun Eoghanachta',
    location: 'Western head of the island',
    desc: "Found in the townland of Eoghanacht at the western end of the island. A single circular wall of impressive height with the remains of several Clochans inside. The fort takes its name from the Eoghanachta tribe of Munster, associated with the island during the Iron Age.",
    highlight: 'The most westerly of the four great forts.',
    img: 'https://images.unsplash.com/photo-1541089404510-5c9a779841fc?w=800&q=80',
  },
]

export default function InisMorePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1800&q=80"
            alt="Inis Mór aerial view"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone/80 to-stone/95" />
        </div>
        <div className="relative z-10 container-site">
          <p className="section-label text-amber mb-4">The island</p>
          <h1 className="font-display text-white text-5xl md:text-6xl max-w-2xl leading-tight mb-6">
            Inis Mór: your complete guide.
          </h1>
          <p className="text-white/70 text-lg max-w-xl leading-relaxed">
            The largest of the three Aran Islands. Nine miles of limestone, ancient forts,
            a living Celtic language, and some of the most dramatic coastline in Europe.
          </p>
        </div>
      </section>

      {/* Island Overview */}
      <section className="py-20 bg-cream">
        <div className="container-site max-w-3xl">
          <p className="section-label mb-4">Overview</p>
          <h2 className="font-display text-stone text-4xl mb-8">About Inis Mór</h2>
          <div className="prose text-stone/70 leading-relaxed space-y-4">
            <p>
              Inis Mór — "the big island" in Irish — is the largest of the three Aran Islands,
              situated 9 miles off the Galway coastline. The island is 9 miles long and about
              2 miles wide, mostly made of Burren limestone rock with small fields divided by
              ancient stone walls.
            </p>
            <p>
              The Irish language is spoken every day on Inis Mór — one of the last places in
              Ireland where the ancient Celtic language is preserved as a living tongue.
              The island has four Celtic stone forts, early Christian church remains,
              a thriving seal colony, and miles of spectacular limestone cliff coastline.
            </p>
            <p>
              Visitors describe it as unlike anywhere else in Ireland — or anywhere else on earth.
              The best way to understand Inis Mór is not to rush through it, but to let
              someone who has lived here their whole life show it to you.
            </p>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-limestone mt-12">
            {[
              { val: '9 miles', label: 'Long' },
              { val: '2 miles', label: 'Wide' },
              { val: '~900',    label: 'Residents' },
              { val: '4',       label: 'Stone forts' },
            ].map(s => (
              <div key={s.label} className="p-6 text-center border-r border-limestone last:border-r-0">
                <p className="font-display text-stone text-2xl">{s.val}</p>
                <p className="text-stone/40 text-xs uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA inline */}
      <div className="bg-atlantic py-10">
        <div className="container-site flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-display text-xl">The best way to see all of this?</p>
            <p className="text-white/50 text-sm mt-1">A pony & trap tour with Thomas Faherty. 4 hours. From €50 per person.</p>
          </div>
          <Link href="/book" className="btn-primary flex-shrink-0">Book a Tour →</Link>
        </div>
      </div>

      {/* The Four Forts */}
      <section className="py-24 bg-white">
        <div className="container-site">
          <p className="section-label mb-4">Archaeology</p>
          <h2 className="font-display text-stone text-4xl mb-4">The four great stone forts</h2>
          <p className="text-stone/60 max-w-xl mb-16">
            Inis Mór is home to four extraordinary Celtic stone forts — among the finest
            prehistoric monuments in Ireland. Thomas will take you to all of them.
          </p>

          <div className="space-y-16">
            {FORTS.map((fort, i) => (
              <div
                key={fort.name}
                className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={fort.img}
                    alt={fort.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <p className="section-label mb-2">{fort.location}</p>
                  <h3 className="font-display text-stone text-3xl mb-4">{fort.name}</h3>
                  <p className="text-stone/60 leading-relaxed mb-4">{fort.desc}</p>
                  <p className="text-moss font-semibold text-sm border-l-2 border-moss pl-4">
                    {fort.highlight}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Attractions */}
      <section className="py-24 bg-cream">
        <div className="container-site">
          <p className="section-label mb-4">Don't miss</p>
          <h2 className="font-display text-stone text-4xl mb-12">Hidden gems of Inis Mór</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-limestone p-8">
              <div className="text-4xl mb-4">🌊</div>
              <h3 className="font-display text-stone text-2xl mb-3">The Wormhole (Poll na bPéist)</h3>
              <p className="text-stone/60 text-sm leading-relaxed mb-4">
                One of the most extraordinary natural features on the island — a perfectly rectangular
                tidal pool carved into the limestone by the Atlantic. The Wormhole is hidden from the
                main path, and most tourists never find it. Thomas knows exactly where it is and will
                walk you there himself.
              </p>
              <p className="text-moss text-sm font-semibold">Featured on every Thomas Faherty tour.</p>
            </div>

            <div className="bg-white border border-limestone p-8">
              <div className="text-4xl mb-4">🦭</div>
              <h3 className="font-display text-stone text-2xl mb-3">The Seal Colony</h3>
              <p className="text-stone/60 text-sm leading-relaxed mb-4">
                Atlantic grey seals live along the sheltered coves of Inis Mór.
                At low tide, they haul out onto the rocks and can be spotted easily
                from the coastal paths. Thomas knows where to find them.
              </p>
              <p className="text-moss text-sm font-semibold">Best spotted at low tide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Here */}
      <section className="py-24 bg-stone text-white">
        <div className="container-site max-w-3xl">
          <p className="section-label text-amber mb-4">Getting here</p>
          <h2 className="font-display text-4xl mb-10">How to reach Inis Mór</h2>

          <div className="space-y-8">
            {[
              {
                method: '⛴ Ferry from Rossaveal',
                detail: 'About 40 minutes. Aran Island Ferries run regular services from Rossaveal pier, Co. Galway. Bus transfer from Galway city to Rossaveal available.',
              },
              {
                method: '⛴ Ferry from Doolin',
                detail: 'About 75 minutes. Doolin2Aran Ferries operate from Doolin Pier in Co. Clare. Seasonal service — check schedule in advance.',
              },
              {
                method: '✈️ Aer Árann Islands',
                detail: 'Daily flights from Connemara Airport (Inverin), Co. Galway. About 10 minutes by air. A spectacular way to arrive.',
              },
            ].map(item => (
              <div key={item.method} className="border-b border-white/10 pb-8">
                <h3 className="font-display text-white text-xl mb-2">{item.method}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white/5 p-6 border border-white/10">
            <p className="text-white/70 text-sm leading-relaxed">
              <strong className="text-white">Pro tip from Thomas:</strong> Book the morning ferry
              and spend the full day on the island. The afternoon ferry crowds the pier —
              arriving early means you have the forts to yourself.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-amber text-white text-center">
        <div className="container-site">
          <h2 className="font-display text-4xl mb-4">Ready to explore?</h2>
          <p className="text-white/80 mb-8 max-w-md mx-auto">
            Let Thomas Faherty show you the real Inis Mór — the island he's called home his whole life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="bg-white text-amber font-semibold px-8 py-4 text-sm tracking-widest uppercase hover:bg-stone hover:text-white transition-colors">
              Book a Tour
            </Link>
            <Link href="/stay" className="border border-white text-white font-semibold px-8 py-4 text-sm tracking-widest uppercase hover:bg-white/10 transition-colors">
              Stay With Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
