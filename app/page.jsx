import Link from 'next/link'
import Image from 'next/image'
import { REVIEWS, OPERATING_SEASON } from '@/lib/tours'

// ─── Hero ──────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1800&q=80"
          alt="Inis Mór limestone landscape with Atlantic Ocean"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient overlay — dark at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-atlantic-dark via-atlantic-dark/60 to-transparent" />
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-atlantic/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-site w-full pb-24 md:pb-32 pt-32">
        <div className="max-w-2xl animate-stagger">
          <p className="section-label text-amber mb-4">Inis Mór · Aran Islands · Since the 1940s</p>

          <h1 className="font-display text-white text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6">
            See the island
            <br />
            <em className="text-amber not-italic">the way it was meant</em>
            <br />
            to be seen.
          </h1>

          <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
            Thomas Faherty guides you through Inis Mór on a traditional pony & trap —
            past ancient stone forts, hidden coves, and stories no guidebook will ever tell you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/book" className="btn-primary text-center">
              Book Your Tour →
            </Link>
            <Link href="/experience" className="btn-outline text-center">
              Discover the Experience
            </Link>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20">
            {[
              { val: '★ 4.9', label: 'TripAdvisor rating' },
              { val: '4hrs',  label: 'Full island tour' },
              { val: '€50',   label: 'Per person (shared)' },
              { val: 'Mar–Oct', label: 'Operating season' },
            ].map(s => (
              <div key={s.label}>
                <p className="text-white font-display text-xl">{s.val}</p>
                <p className="text-white/50 text-xs tracking-wide uppercase mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 md:right-12 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="text-white/40 text-xs tracking-[0.2em] uppercase [writing-mode:vertical-lr]">Scroll</span>
        <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  )
}

// ─── Trust Bar ─────────────────────────────────────────────────────
function TrustBar() {
  return (
    <div className="bg-atlantic py-4 overflow-hidden">
      <div className="flex items-center justify-center flex-wrap gap-x-10 gap-y-2 container-site">
        {[
          '★ ★ ★ ★ ★  TripAdvisor Certificate of Excellence',
          '·',
          'Wild Atlantic Way Partner',
          '·',
          'Family-run since the 1940s',
          '·',
          'Over 80 years on Inis Mór',
        ].map((item, i) => (
          <span key={i} className={`text-xs tracking-widest uppercase ${item === '·' ? 'text-white/20 hidden md:block' : 'text-white/60'}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── What You'll Experience ────────────────────────────────────────
function Experience() {
  const highlights = [
    {
      icon: '🏰',
      title: 'Dún Aonghasa',
      desc: 'The spectacular cliff-top stone fort, 300 feet above the Atlantic. One of the finest prehistoric monuments in Europe.',
    },
    {
      icon: '🌊',
      title: 'The Wormhole',
      desc: 'Poll na bPéist — a perfectly rectangular natural pool carved into the limestone cliffs. Thomas will walk you there himself.',
    },
    {
      icon: '🦭',
      title: 'Seal Colony',
      desc: 'At low tide, spot Atlantic grey seals lounging on the rocks along the island\'s sheltered coves.',
    },
    {
      icon: '📖',
      title: 'Island Stories',
      desc: 'Thomas knows every family, every ruin, every legend. He\'ll show you what no guidebook — and no other tour — ever will.',
    },
  ]

  return (
    <section className="py-24 bg-cream">
      <div className="container-site">
        <div className="max-w-xl mb-16">
          <p className="section-label mb-3">What you'll see</p>
          <h2 className="font-display text-stone text-4xl md:text-5xl leading-tight">
            Four hours.<br />A lifetime of memories.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 border border-limestone">
          {highlights.map((h, i) => (
            <div
              key={h.title}
              className={`p-8 ${i < 3 ? 'border-b md:border-b-0 md:border-r lg:border-r border-limestone' : ''}`}
            >
              <div className="text-3xl mb-4">{h.icon}</div>
              <h3 className="font-display text-stone text-xl mb-3">{h.title}</h3>
              <p className="text-stone/60 text-sm leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/experience" className="btn-ghost">
            Full tour details →
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Tour Options (Pricing) ────────────────────────────────────────
function TourOptions() {
  const options = [
    { name: 'Shared Tour',    price: '€50',  unit: 'per person', note: 'Join a small group', href: '/book?type=shared' },
    { name: 'Private · 4',   price: '€250', unit: 'total',       note: 'Up to 4 people',    href: '/book?type=private4' },
    { name: 'Private · 6',   price: '€350', unit: 'total',       note: 'Up to 6 people',    href: '/book?type=private6' },
    { name: 'Private · 8',   price: '€450', unit: 'total',       note: 'Up to 8 people',    href: '/book?type=private8' },
    { name: 'Private · 10',  price: '€550', unit: 'total',       note: 'Up to 10 people',   href: '/book?type=private10' },
  ]

  return (
    <section className="py-24 bg-stone text-white">
      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="section-label text-amber mb-3">Pricing</p>
            <h2 className="font-display text-4xl md:text-5xl">Choose your tour</h2>
          </div>
          <p className="text-white/50 max-w-xs text-sm leading-relaxed">
            All tours are 4 hours and run March through October.
            Direct booking — no platform fees.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/10">
          {options.map((opt, i) => (
            <Link
              key={opt.name}
              href={opt.href}
              className={`group flex flex-col p-8 bg-stone hover:bg-atlantic transition-colors duration-200 ${
                i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <p className="text-white/40 text-xs tracking-widest uppercase mb-6">{opt.note}</p>
              <p className="font-display text-4xl text-white group-hover:text-amber transition-colors">{opt.price}</p>
              <p className="text-white/40 text-xs mt-1 mb-6">{opt.unit}</p>
              <p className="text-white/80 text-sm font-semibold mt-auto">{opt.name}</p>
              <span className="text-amber text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                Book this →
              </span>
            </Link>
          ))}
        </div>

        <p className="text-white/30 text-xs mt-6 text-center">
          {OPERATING_SEASON.months} · {OPERATING_SEASON.note}
        </p>
      </div>
    </section>
  )
}

// ─── Reviews ───────────────────────────────────────────────────────
function Reviews() {
  const doubled = [...REVIEWS, ...REVIEWS] // duplicate for infinite scroll

  return (
    <section className="py-24 bg-cream overflow-hidden">
      <div className="container-site mb-12">
        <p className="section-label mb-3">What visitors say</p>
        <div className="flex items-baseline gap-6">
          <h2 className="font-display text-stone text-4xl md:text-5xl">★ 4.9 on TripAdvisor</h2>
          <p className="text-stone/40 text-sm">Certificate of Excellence</p>
        </div>
      </div>

      {/* Infinite scroll strip */}
      <div className="relative">
        <div className="review-track">
          {doubled.map((r, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-80 mx-4 bg-white border border-limestone p-6"
            >
              <div className="flex gap-0.5 mb-4">
                {Array(r.rating).fill(0).map((_, j) => (
                  <span key={j} className="text-amber text-sm">★</span>
                ))}
              </div>
              <p className="text-stone/70 text-sm leading-relaxed mb-4 line-clamp-4">
                "{r.text}"
              </p>
              <p className="text-stone/40 text-xs font-semibold tracking-wide">
                {r.flag} {r.author}
              </p>
            </div>
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />
      </div>

      <div className="container-site mt-10 text-center">
        <Link href="/experience#reviews" className="btn-ghost">
          Read all reviews →
        </Link>
      </div>
    </section>
  )
}

// ─── Thomas + Johnny ──────────────────────────────────────────────
function AboutThomas() {
  return (
    <section className="py-24 bg-white">
      <div className="container-site">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image placeholder */}
          <div className="relative aspect-[4/5] bg-limestone overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&q=80"
              alt="Thomas Faherty on pony and trap, Inis Mór"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Caption tag */}
            <div className="absolute bottom-0 left-0 right-0 bg-atlantic/90 px-6 py-4">
              <p className="text-white font-display text-sm">Thomas Faherty & Johnny Cash</p>
              <p className="text-white/50 text-xs mt-0.5">Kilronan, Inis Mór</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="section-label mb-4">Meet your guide</p>
            <h2 className="font-display text-stone text-4xl md:text-5xl leading-tight mb-6">
              Thomas Faherty
            </h2>
            <div className="space-y-4 text-stone/70 leading-relaxed">
              <p>
                Thomas Faherty has been guiding visitors around Inis Mór for decades.
                A pony & trap tradition in the Faherty family since the 1940s,
                he carries with him a knowledge of the island that goes far beyond
                what any map or guidebook could capture.
              </p>
              <p>
                He'll take you past the four great stone forts, down to the Wormhole,
                through ancient pathways that only the islanders know — and he'll tell
                you the stories that make them come alive.
              </p>
              <p className="font-semibold text-stone">
                And then there's Johnny Cash, the pony — a character in his own right.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/book" className="btn-primary">
                Book with Thomas →
              </Link>
              <Link href="/experience" className="btn-ghost">
                About the tour
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Island Teaser ─────────────────────────────────────────────────
function IslandTeaser() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1800&q=80"
          alt="Inis Mór cliffs and Atlantic Ocean"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-moss/80" />
      </div>

      <div className="relative z-10 container-site text-center text-white">
        <p className="section-label text-white/60 mb-4">The island</p>
        <h2 className="font-display text-4xl md:text-6xl mb-6 max-w-2xl mx-auto leading-tight">
          Inis Mór is unlike anywhere else on earth.
        </h2>
        <p className="text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
          Ancient stone forts. Limestone pavements that stretch to the cliff edge.
          A language and culture preserved for centuries. The best way to understand it
          is to let Thomas show you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/inis-mor" className="btn-outline">
            Explore the Island Guide
          </Link>
          <Link href="/book" className="btn-primary">
            Book a Tour
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Stay Teaser ───────────────────────────────────────────────────
function StayTeaser() {
  return (
    <section className="py-20 bg-cream border-t border-limestone">
      <div className="container-site">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="section-label mb-2">Make a night of it</p>
            <h2 className="font-display text-stone text-3xl md:text-4xl">
              Stay at Seacrest B&B
            </h2>
            <p className="text-stone/60 mt-3 max-w-md text-sm leading-relaxed">
              Run by Geraldine & Thomas Faherty in Kilronan. Rooms from €80/night
              including a homemade continental breakfast. Stay and see the island
              after the day-trippers have gone.
            </p>
          </div>
          <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
            <Link href="/stay" className="btn-primary whitespace-nowrap">
              View Rooms & Rates →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Page ──────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Experience />
      <TourOptions />
      <Reviews />
      <AboutThomas />
      <IslandTeaser />
      <StayTeaser />
    </>
  )
}
