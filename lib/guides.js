// ============================================================
// GUIDE DATA — edit bios and defaults here
// ============================================================

export const GUIDES = {
  thomas: {
    id:          'thomas',
    name:        'Thomas Faherty',
    shortName:   'Thomas',
    role:        'Head Guide & Owner',
    bio:         'Thomas has been guiding tours on Inis Mór his whole life. His family has worked these roads since the 1940s — he knows every stone, every story, and every secret the island holds.',
    tagline:     'Four generations on Inis Mór',
    avatar:      null,
    defaultPayment: { methods: ['card', 'cash'], when: 'either' },
  },
  christopher: {
    id:          'christopher',
    name:        'Christopher',
    shortName:   'Christopher',
    role:        'Tour Guide',
    bio:         'Christopher grew up on Inis Mór and brings a warm, unhurried style to every tour. He loves sharing the folklore and geology of the island with visitors from around the world.',
    tagline:     'Island born and raised',
    avatar:      null,
    defaultPayment: { methods: ['cash'], when: 'onday' },
  },
  niamh: {
    id:          'niamh',
    name:        'Niamh',
    shortName:   'Niamh',
    role:        'Tour Guide',
    bio:         'Niamh is a passionate storyteller with deep roots in the Aran Islands. She speaks Irish and English and brings a unique perspective to Inis Mór\'s rich cultural heritage.',
    tagline:     'Stories in two languages',
    avatar:      null,
    defaultPayment: { methods: ['card', 'cash'], when: 'either' },
  },
}

export const GUIDE_LIST = Object.values(GUIDES)
