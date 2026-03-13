import { Playfair_Display, Source_Sans_3 } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BookingBar from '@/components/BookingBar'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '600'],
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://www.aranponytrap.com'),
  title: {
    default: 'Aran Pony & Trap Tours | Inis Mór, Aran Islands',
    template: '%s | Aran Pony & Trap Tours',
  },
  description:
    'Experience Inis Mór the traditional way with Thomas Faherty. Guided pony & trap tours on the Aran Islands since the 1940s. Book direct — no booking fees.',
  keywords: ['Aran Islands', 'Inis Mór', 'pony trap tour', 'Thomas Faherty', 'Aran Islands tour', 'Wild Atlantic Way'],
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://www.aranponytrap.com',
    siteName: 'Aran Pony & Trap Tours',
    title: 'Aran Pony & Trap Tours | Inis Mór',
    description: 'Guided pony & trap tours on Inis Mór. A family tradition since the 1940s.',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable}`}>
      <body className="bg-cream font-body text-stone antialiased">
        <Nav />
        <main>{children}</main>
        <BookingBar />
        <Footer />
      </body>
    </html>
  )
}
