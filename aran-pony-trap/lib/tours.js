// ============================================================
// TOUR DATA — edit prices and details here, updates everywhere
// ============================================================

export const TOURS = {
  shared: {
    id:          'shared',
    name:        'Shared Island Tour',
    tagline:     'Join a small group and share the experience',
    duration:    '4 hours',
    price:       50,
    priceLabel:  '€50 per person',
    maxPerGroup: 12,
    includes: [
      'Guided tour of Inis Mór',
      'Visit to Dún Aonghasa',
      'The Wormhole (Poll na bPéist)',
      'Seal watching (low tide)',
      'Island stories and history from Thomas',
      'Stops for photos throughout',
    ],
    description:
      'Join Thomas on a shared pony & trap tour of Inis Mór. ' +
      'Perfect for solo travellers, couples, or families who want to meet fellow explorers. ' +
      'Thomas will share the hidden stories of the island that most tourists never hear.',
    stripeProductId: '', // add after Stripe setup
  },

  private4: {
    id:          'private4',
    name:        'Private Tour — up to 4 people',
    tagline:     'Your own carriage, your own pace',
    duration:    '4 hours',
    price:       250,
    priceLabel:  '€250 total (up to 4 people)',
    maxPerGroup: 4,
    includes: [
      'Exclusive private carriage',
      'Fully flexible itinerary',
      'Visit to Dún Aonghasa',
      'The Wormhole (Poll na bPéist)',
      'Seal watching (low tide)',
      'Island stories from Thomas',
      'Stops wherever you wish',
    ],
    description:
      'Your own private carriage and driver. Perfect for couples, families, or small groups ' +
      'who want the full Thomas Faherty experience at their own pace with complete flexibility.',
    stripeProductId: '',
  },

  private6: {
    id:          'private6',
    name:        'Private Tour — up to 6 people',
    tagline:     'Your own carriage, your own pace',
    duration:    '4 hours',
    price:       350,
    priceLabel:  '€350 total (up to 6 people)',
    maxPerGroup: 6,
    includes: [
      'Exclusive private carriage',
      'Fully flexible itinerary',
      'Visit to Dún Aonghasa',
      'The Wormhole (Poll na bPéist)',
      'Seal watching (low tide)',
      'Island stories from Thomas',
      'Stops wherever you wish',
    ],
    description:
      'A private carriage for up to six. Ideal for families or groups of friends ' +
      'who want an unforgettable shared experience — without sharing with strangers.',
    stripeProductId: '',
  },

  private8: {
    id:          'private8',
    name:        'Private Tour — up to 8 people',
    tagline:     'The full carriage experience',
    duration:    '4 hours',
    price:       450,
    priceLabel:  '€450 total (up to 8 people)',
    maxPerGroup: 8,
    includes: [
      'Exclusive private carriage',
      'Fully flexible itinerary',
      'Full island circuit',
      'The Wormhole (Poll na bPéist)',
      'Seal watching (low tide)',
      'Island stories from Thomas',
    ],
    description:
      'A large private carriage for up to eight people. Great for extended families, ' +
      'school or community groups, or reunions making a special trip to the islands.',
    stripeProductId: '',
  },

  private10: {
    id:          'private10',
    name:        'Private Tour — up to 10 people',
    tagline:     'Our largest private experience',
    duration:    '4 hours',
    price:       550,
    priceLabel:  '€550 total (up to 10 people)',
    maxPerGroup: 10,
    includes: [
      'Exclusive large private carriage',
      'Fully flexible itinerary',
      'Full island circuit',
      'The Wormhole (Poll na bPéist)',
      'Seal watching (low tide)',
      'Island stories from Thomas',
    ],
    description:
      'The ultimate Aran Islands group experience. Up to ten people in one private carriage, ' +
      'guided personally by Thomas Faherty.',
    stripeProductId: '',
  },
}

export const TOUR_LIST = Object.values(TOURS)

export const REVIEWS = [
  {
    id:      1,
    text:    "We did the pony & trap tour with Thomas and he got out and personally walked us to the Worm Hole. Not sure if we would have found it on our own. Don't miss it.",
    author:  'Visitor from Colorado',
    flag:    '🇺🇸',
    rating:  5,
  },
  {
    id:      2,
    text:    'Thomas went out of his way to share with us his wealth of knowledge about Inis Mór history and its people. We thoroughly enjoyed the tour Thomas provided. The tour horse, Johnny (as in Cash), is a character himself!',
    author:  'Visitor from Ohio',
    flag:    '🇺🇸',
    rating:  5,
  },
  {
    id:      3,
    text:    'Absolutely the highlight of our trip to Ireland. Thomas knows every stone on that island. Johnny Cash trotted us past scenery that took our breath away.',
    author:  'Visitor from Germany',
    flag:    '🇩🇪',
    rating:  5,
  },
  {
    id:      4,
    text:    'Booked on the ferry on the way over — so glad we did. Thomas is a natural storyteller. The Wormhole alone was worth the whole trip.',
    author:  'Visitor from Australia',
    flag:    '🇦🇺',
    rating:  5,
  },
  {
    id:      5,
    text:    'A magical way to see the island. Thomas pointed out things we never would have noticed — ancient ruins hidden behind stone walls, the seal colony, and the most dramatic cliffs in Ireland.',
    author:  'Visitor from France',
    flag:    '🇫🇷',
    rating:  5,
  },
]

export const OPERATING_SEASON = {
  months: 'March – October',
  start:  3,  // March
  end:    10, // October
  note:   'Tours run daily, weather permitting. Private tours available on request.',
}

export const CANCELLATION_POLICY = [
  'Free cancellation or rescheduling within 7 days of booking.',
  'If the ferry is not running, please contact us before 10am on the day.',
  'Full payment is charged for cancellations outside these conditions.',
]
