'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/',           label: 'Home' },
  { href: '/experience', label: 'The Tour' },
  { href: '/inis-mor',   label: 'Inis Mór' },
  { href: '/stay',       label: 'Stay With Us' },
  { href: '/book',       label: 'Book Now', cta: true },
]

export default function Nav() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname                = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-atlantic/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container-site">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link href="/" className="flex flex-col leading-none group">
              <span className="font-display text-white text-lg font-semibold tracking-tight group-hover:text-amber transition-colors">
                Aran Pony & Trap
              </span>
              <span className="section-label text-white/60 text-[9px] tracking-[0.25em]">
                INIS MÓR · EST. 1940s
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {links.map(link =>
                link.cta ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="ml-4 bg-amber text-white text-xs font-semibold tracking-[0.15em] uppercase px-5 py-2.5 hover:bg-amber-dark transition-colors"
                  >
                    Book Now
                  </Link>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 text-sm font-body transition-colors ${
                      pathname === link.href
                        ? 'text-amber'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(o => !o)}
              className="md:hidden flex flex-col gap-1.5 p-2 group"
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-px bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-px bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-px bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-atlantic flex flex-col transition-all duration-300 md:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex-1 flex flex-col justify-center items-center gap-2 pt-16">
          {links.map((link, i) =>
            link.cta ? (
              <Link
                key={link.href}
                href={link.href}
                className="mt-4 bg-amber text-white text-base font-semibold tracking-[0.15em] uppercase px-10 py-4"
              >
                Book Now
              </Link>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display text-3xl py-2 transition-colors ${
                  pathname === link.href ? 'text-amber' : 'text-white hover:text-amber'
                }`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Contact in mobile menu */}
        <div className="pb-12 text-center text-white/50 text-sm space-y-1">
          <p>+353 (0) 99 61292</p>
          <p>thomasfahertytours@gmail.com</p>
        </div>
      </div>
    </>
  )
}
