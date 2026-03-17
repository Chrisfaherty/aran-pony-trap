import { Playfair_Display, Source_Sans_3 } from 'next/font/google'
import './globals.css'
import SiteChrome from '@/components/SiteChrome'
import Schema from '@/components/Schema'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display', display: 'swap' })
const sourceSans = Source_Sans_3({ subsets: ['latin'], variable: '--font-body', display: 'swap' })

const BASE = 'https://www.aranponytrap.com'

export const metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'Aran Pony & Trap Tours | Inis Mór, Aran Islands',
    template: '%s | Aran Pony & Trap Tours',
  },
  description: 'Experience Inis Mór the traditional way with Thomas Faherty. Guided pony & trap tours on the Aran Islands since the 1940s. Visit Dún Aonghasa, the Wormhole & seal colonies. Book direct — no booking fees.',
  keywords: ['Aran Islands tours','Inis Mór','pony trap tour','Thomas Faherty','Aran Islands','Wild Atlantic Way','Dún Aonghasa','Irish island tour','Kilronan','things to do Inis Mór'],
  authors: [{ name: 'Thomas Faherty' }],
  alternates: { canonical: BASE },
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: BASE,
    siteName: 'Aran Pony & Trap Tours',
    title: 'Aran Pony & Trap Tours | Inis Mór',
    description: 'Guided pony & trap tours on Inis Mór. A family tradition since the 1940s. Visit Dún Aonghasa, the Wormhole, seal colonies. Book direct.',
    images: [{ url: 'https://static.wixstatic.com/media/3cdf95_9c49533441ad432880f3dc158c928fc2~mv2.jpg/v1/fill/w_1200,h_630,al_c,q_85/3cdf95_9c49533441ad432880f3dc158c928fc2~mv2.jpg', width: 1200, height: 630, alt: 'Aran Pony & Trap Tours — horses on the shore of Inis Mór' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aran Pony & Trap Tours | Inis Mór',
    description: 'Guided pony & trap tours on Inis Mór since the 1940s.',
    images: ['https://static.wixstatic.com/media/3cdf95_9c49533441ad432880f3dc158c928fc2~mv2.jpg'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable}`}>
      <head><Schema /></head>
      <body className="bg-cream font-body text-stone antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}