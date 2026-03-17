'use client'
import { usePathname } from 'next/navigation'
import Nav from './Nav'
import Footer from './Footer'
import BookingBar from './BookingBar'

export default function SiteChrome({ children }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')
  const isApi   = pathname?.startsWith('/api')

  if (isAdmin || isApi) {
    return <>{children}</>
  }

  return (
    <>
      <Nav />
      <main>{children}</main>
      <BookingBar />
      <Footer />
    </>
  )
}
