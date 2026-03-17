export default function Schema() {
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'TouristAttraction'],
    name: 'Aran Pony & Trap Tours',
    description: 'Traditional pony and trap tours of Inis Mór, Aran Islands. Guided by Thomas Faherty whose family has worked these roads since the 1940s.',
    url: 'https://www.aranponytrap.com',
    telephone: '+353852859777',
    email: 'thomasfahertytours@gmail.com',
    image: 'https://static.wixstatic.com/media/3cdf95_9c49533441ad432880f3dc158c928fc2~mv2.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kilronan Pier',
      addressLocality: 'Kilronan',
      addressRegion: 'Inis Mór, Aran Islands',
      addressCountry: 'IE',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 53.1219, longitude: -9.6613 },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      opens: '09:00', closes: '18:00',
      validFrom: '2025-03-01', validThrough: '2025-10-31',
    },
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card',
    hasMap: 'https://maps.google.com/?q=Kilronan+Pier+Inis+Mor',
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '200', bestRating: '5' },
  }

  const tourActivity = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: 'Inis Mór Pony & Trap Tour',
    description: '4-hour guided pony and trap tour of Inis Mór with Thomas Faherty. Visit Dún Aonghasa, the Wormhole, seal colonies and hidden coves. Book direct — no platform fees.',
    url: 'https://www.aranponytrap.com/book',
    touristType: ['Sightseeing', 'Nature', 'Cultural', 'Family'],
    offers: [
      { '@type': 'Offer', name: 'Shared Tour', price: '50', priceCurrency: 'EUR', availability: 'https://schema.org/InStock', url: 'https://www.aranponytrap.com/book?type=shared', validFrom: '2025-03-01', validThrough: '2025-10-31' },
      { '@type': 'Offer', name: 'Private Tour (up to 4)', price: '250', priceCurrency: 'EUR', availability: 'https://schema.org/InStock', url: 'https://www.aranponytrap.com/book?type=private4' },
      { '@type': 'Offer', name: 'Private Tour (up to 6)', price: '350', priceCurrency: 'EUR', availability: 'https://schema.org/InStock', url: 'https://www.aranponytrap.com/book?type=private6' },
    ],
    provider: { '@type': 'Person', name: 'Thomas Faherty', jobTitle: 'Tour Guide', telephone: '+353852859777' },
    duration: 'PT4H',
    inLanguage: ['en', 'ga'],
    startDate: '2025-03-01',
    endDate: '2025-10-31',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tourActivity) }}/>
    </>
  )
}