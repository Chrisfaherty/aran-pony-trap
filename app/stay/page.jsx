import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Stay With Us — Seacrest B&B',
  description:
    'Stay at Seacrest Bed & Breakfast in Kilronan, Inis Mór. Run by Geraldine & Thomas Faherty. Rooms from €80/night including continental breakfast.',
}

const ROOMS = [
  {
    name:  'Standard Double',
    price: '€80',
    beds:  'One double bed',
    img:   'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    features: ['En-suite bathroom', 'Television', 'Free WiFi', 'Continental breakfast included'],
  },
  {
    name:  'Deluxe Double',
    price: '€95',
    beds:  'One double bed',
    img:   'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
    features: ['En-suite bathroom', 'Desk and chair', 'Television', 'Free WiFi', 'Continental breakfast included'],
    popular: true,
  },
  {
    name:  'Twin Room',
    price: '€95',
    beds:  'Double bed + single bed',
    img:   'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    features: ['En-suite bathroom', 'Television', 'Free WiFi', 'Continental breakfast included', 'Ideal for families'],
  },
]

const BREAKFAST = [
  'Freshly brewed tea & coffee',
  'Fruit juices',
  'Fresh fruit',
  'Homebaked brown bread',
  'Freshly baked muffin & scone',
  'Assorted jams',
  'Cereals',
  'Yogurts',
  'Ham & cheese',
]

export default function StayPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-stone overflow-hidden">
        <div className="absolute inset-0 opacity-20 z-0">
          <Image
            src="https://static.wixstatic.com/media/914290_16c5237020f24579af72c722045c6e90~mv2.jpg/v1/fill/w_1800,h_900,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/914290_16c5237020f24579af72c722045c6e90~mv2.jpg"
            alt="Seacrest B&B Inis Mór"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 container-site">
          <p className="section-label text-amber mb-4">Kilronan, Inis Mór</p>
          <h1 className="font-display text-white text-5xl md:text-6xl max-w-2xl leading-tight mb-6">
            Seacrest Bed & Breakfast
          </h1>
          <p className="text-white/70 text-lg max-w-xl leading-relaxed">
            Stay the night and see the island after the crowds have gone.
            Run by Geraldine & Thomas Faherty for over 17 years in the heart of Kilronan.
          </p>
        </div>
      </section>

      {/* Bundle offer */}
      <div className="bg-amber py-8">
        <div className="container-site flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-display text-xl">Stay & Tour Bundle</p>
            <p className="text-white/80 text-sm mt-1">Book a room and a pony & trap tour together and mention it when booking for a special rate.</p>
          </div>
          <Link href="/book" className="flex-shrink-0 bg-white text-amber font-semibold px-6 py-3 text-sm tracking-widest uppercase hover:bg-stone hover:text-white transition-colors">
            Book a Tour →
          </Link>
        </div>
      </div>

      {/* Rooms */}
      <section className="py-24 bg-cream">
        <div className="container-site">
          <p className="section-label mb-4">Accommodation</p>
          <h2 className="font-display text-stone text-4xl mb-4">Rooms & rates</h2>
          <p className="text-stone/60 mb-12 max-w-md">
            All rates include a homemade continental breakfast. All rooms are en-suite with TV and free WiFi.
            <br /><span className="text-amber font-semibold">2-night minimum stay required.</span>
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {ROOMS.map(room => (
              <div
                key={room.name}
                className={`bg-white border flex flex-col ${room.popular ? 'border-amber shadow-lg' : 'border-limestone'}`}
              >
                {room.popular && (
                  <div className="bg-amber text-white text-xs font-semibold text-center py-1.5 tracking-widest uppercase">
                    Most popular
                  </div>
                )}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={room.img}
                    alt={room.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-stone text-xl">{room.name}</h3>
                    <div className="text-right">
                      <p className="font-display text-stone text-2xl">{room.price}</p>
                      <p className="text-stone/40 text-xs">per night</p>
                    </div>
                  </div>
                  <p className="text-stone/50 text-sm mb-4">{room.beds}</p>
                  <ul className="space-y-1.5 mb-6 flex-1">
                    {room.features.map(f => (
                      <li key={f} className="text-stone/60 text-sm flex gap-2">
                        <span className="text-moss flex-shrink-0">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="http://www.aranaccommodations.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-center block text-sm"
                  >
                    Book This Room →
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="text-stone/40 text-xs text-center mt-6">
            To book accommodation, visit <a href="http://www.aranaccommodations.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber transition-colors">aranaccommodations.com</a> or call Thomas directly.
          </p>
        </div>
      </section>

      {/* Breakfast */}
      <section className="py-24 bg-white">
        <div className="container-site max-w-2xl">
          <p className="section-label mb-4">Every morning</p>
          <h2 className="font-display text-stone text-4xl mb-4">Continental breakfast</h2>
          <p className="text-stone/60 mb-8">
            Included in the price of every room. Served 8:30am – 10:00am (earlier on special request).
            Coffee & tea available in the dining room every day from 10am until dark.
          </p>
          <ul className="grid grid-cols-2 gap-3">
            {BREAKFAST.map(item => (
              <li key={item} className="flex gap-2 text-stone/70 text-sm">
                <span className="text-amber">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Policies */}
      <section className="py-16 bg-cream border-t border-limestone">
        <div className="container-site max-w-2xl">
          <h3 className="font-display text-stone text-2xl mb-6">Booking policies</h3>
          <div className="space-y-3 text-stone/60 text-sm leading-relaxed">
            <p><span className="text-amber">—</span> 2-night minimum stay required.</p>
            <p><span className="text-amber">—</span> All bookings confirmed by email.</p>
            <p><span className="text-amber">—</span> Reservations held with a valid credit card and contact information.</p>
            <p><span className="text-amber">—</span> Stag and hen parties are not accepted.</p>
            <p><span className="text-amber">—</span> Free cancellation or rescheduling within 7 days of booking.</p>
            <p><span className="text-amber">—</span> If the ferry is not running, please contact us before 10am that morning.</p>
            <p><span className="text-amber">—</span> Otherwise, full payment will be charged.</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-atlantic text-white text-center">
        <div className="container-site">
          <h2 className="font-display text-4xl mb-4">Ready to stay?</h2>
          <p className="text-white/60 mb-8">Contact Geraldine & Thomas directly, or book online.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="http://www.aranaccommodations.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Book at aranaccommodations.com →
            </a>
            <a href="tel:+35399612920" className="btn-outline">
              Call: +353 (0) 99 61292
            </a>
          </div>
          <p className="text-white/30 text-xs mt-8">
            Also book your pony & trap tour while you're here —
            <Link href="/book" className="underline ml-1 hover:text-amber transition-colors">Book a tour →</Link>
          </p>
        </div>
      </section>
    </>
  )
}
