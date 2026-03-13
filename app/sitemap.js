export default function sitemap() {
  const base = 'https://www.aranponytrap.com'
  const now  = new Date()

  return [
    { url: base,              lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/book`,    lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/experience`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/inis-mor`,   lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/stay`,       lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
