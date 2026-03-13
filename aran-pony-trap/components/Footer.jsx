import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-stone text-white/70 pb-28 md:pb-0">
      <div className="container-site py-16">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <h3 className="font-display text-white text-xl mb-2">Aran Pony & Trap Tours</h3>
            <p className="text-xs tracking-[0.2em] uppercase text-moss-light mb-4">Inis Mór · Est. 1940s</p>
            <p className="text-sm leading-relaxed">
              A family tradition on the Aran Islands for over 80 years.
              See Inis Mór the way the islanders always have.
            </p>

            {/* Trust badges */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="http://www.wildatlanticway.com/home"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-widest uppercase text-white/40 hover:text-amber transition-colors border border-white/10 px-3 py-1.5"
              >
                Wild Atlantic Way
              </a>
              <span className="text-xs text-white/40 border border-white/10 px-3 py-1.5">
                TripAdvisor ★ Excellence
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-white/40 mb-4">Explore</h4>
            <nav className="space-y-2">
              {[
                { href: '/experience', label: 'The Tour' },
                { href: '/book',       label: 'Book a Tour' },
                { href: '/inis-mor',   label: 'Inis Mór Guide' },
                { href: '/stay',       label: 'Stay With Us' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm hover:text-amber transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-white/40 mb-4">Contact Thomas</h4>
            <div className="space-y-3 text-sm">
              <a href="tel:+35399612920" className="flex items-center gap-2 hover:text-amber transition-colors">
                <span className="text-amber">—</span>
                +353 (0) 99 61292
              </a>
              <a href="tel:+353852859777" className="flex items-center gap-2 hover:text-amber transition-colors">
                <span className="text-amber">—</span>
                +353 (0) 852 859 777
              </a>
              <a href="mailto:thomasfahertytours@gmail.com" className="flex items-center gap-2 hover:text-amber transition-colors">
                <span className="text-amber">—</span>
                thomasfahertytours@gmail.com
              </a>
              <a
                href="https://www.facebook.com/Thomas-Faherty-Tours-1597079633883693/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-amber transition-colors"
              >
                <span className="text-amber">—</span>
                Facebook
              </a>
            </div>

            <div className="mt-6">
              <Link
                href="/book"
                className="inline-block bg-amber text-white text-xs font-semibold tracking-[0.15em] uppercase px-6 py-3 hover:bg-amber-dark transition-colors"
              >
                Book Now →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Thomas Faherty Tours · Kilronan, Inis Mór, Co. Galway, Ireland</p>
          <p>Also: <a href="http://www.aranaccommodations.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber transition-colors underline">Seacrest B&B</a></p>
        </div>
      </div>
    </footer>
  )
}
