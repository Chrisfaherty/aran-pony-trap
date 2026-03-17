export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/admin'] }],
    sitemap: 'https://www.aranponytrap.com/sitemap.xml',
    host: 'https://www.aranponytrap.com',
  }
}