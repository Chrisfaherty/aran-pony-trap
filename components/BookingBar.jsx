'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BookingBar() {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()

  // Don't show on booking page itself
  const isBookPage = pathname === '/book'

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  if (isBookPage) return null

  return (
    <div
      className={`booking-bar fixed bottom-0 left-0 right-0 z-50 md:hidden
        bg-atlantic border-t border-white/10 px-4 pt-3 pb-4
        transition-transform duration-500 ${visible ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-white text-xs font-semibold leading-none">From €50 per person</p>
          <p className="text-white/50 text-xs mt-0.5">4-hour guided tour · March–October</p>
        </div>
        <Link
          href="/book"
          className="flex-shrink-0 bg-amber text-white font-semibold text-sm tracking-wide uppercase px-6 py-3 active:scale-95 transition-transform"
        >
          Book Now
        </Link>
      </div>
    </div>
  )
}
