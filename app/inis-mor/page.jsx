import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Inis Mór Travel Guide',
  description:
    'Everything you need to know about visiting Inis Mór, Aran Islands. Getting there, what to see, Dún Aonghasa, the Wormhole, seal colony and more.',
}

const FORTS = [
  {
    name: 'Dún Aonghasa',
    location: 'South coast, Inis Mór',
    desc: 'The most spectacular of the Aran forts — a semi-circular stone structure perched on a 300-foot cliff overlooking the Atlantic. Three terraced walls enclose an inner platform right at the cliff edge.',
    highlight: 'Standing at the cliff edge is one of the most dramatic experiences in all of Ireland.',
    img: 'https://static.wixstatic.com/media/3cdf95_9c49533441ad432880f3dc158c928fc2~mv2.jpg/v1/fill/w_900,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3cdf95_9c49533441ad432880f3dc158c928fc2~mv2.jpg',
  },
  {
    name: 'Dún Duchathair',
    location: 'The Black Fort, Killeany',
    desc: 'Situated on the cliffs at Killeany, this fort consists of a terraced wall with early stone dwelling houses known as Clochans.',
    highlight: 'One of the oldest inhabited sites on the island.',
    img: 'https://static.wixstatic.com/media/914290_16c5237020f24579af72c722045c6e90~mv2.jpg/v1/fill/w_900,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/914290_16c5237020f24579af72c722045c6e90~mv2.jpg',
  },
  {
    name: 'Dún Eochla',
    location: 'Middle of the island',
    desc: 'Located in the heart of Inis Mór. Two terraced stone walls near the remains of an early 19th-century lighthouse.',
    highlight: 'Great views across the island in all directions.',
    img: 'https://static.wixstatic.com/media/3cdf95_9140c5b6cbff4c9ca7f533d0c62e7900.jpg/v1/fill/w_900,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3cdf95_9140c5b6cbff4c9ca7f533d0c62e7900.jpg',
  },
  {
    name: 'Dun Eoghanachta',
    location: 'Western head of the island',
    desc: 'Found at the western end of the island. A single circular wall with the remains of several Clochans inside.',
    highlight: 'The most westerly of the four great forts.',
    img: 'https://static.wixstatic.com/media/3cdf95_54076aeda3424d4baa86f2e2fba483ee.jpg/v1/fill/w_900,h_700,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3cdf95_54076aeda3424d4baa86f2e2fba483ee.jpg',
  },
]

export default function InisMorePage() { return (<><section className="relative pt-32 pb-20 overflow-hidden"><div className="absolute inset-0 z-0"><Image src="https://static.wixstatic.com/media/3cdf95_9c49533441ad432880f3dc158c928fc2~mv2.jpg/v1/fill/w_1800,h_900,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3cdf95_9c49533441ad432880f3dc158c928fc2~mv2.jpg" alt="Inis Mór aerial view" fill className="object-cover" sizes="100vw" /><div className="absolute inset-0 bg-gradient-to-b from-stone/80 to-stone/95" /></div><div className="relative z-10 container-site"><p className="section-label text-amber mb-4">The island</p><h1 className="font-display text-white text-5xl md:text-6xl max-w-2xl leading-tight mb-6">Inis Mór: your complete guide.</h1><p className="text-white/70 text-lg max-w-xl leading-relaxed">The largest of the three Aran Islands. Nine miles of limestone, ancient forts, a living Celtic language, and some of the most dramatic coastline in Europe.</p></div></section><section className="py-24 bg-white"><div className="container-site"><p className="section-label mb-4">Archaeology</p><h2 className="font-display text-stone text-4xl mb-4">The four great stone forts</h2><div className="space-y-16">{FORTS.map((fort, i) => (<div key={fort.name} className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}><div className="relative aspect-[4/3] overflow-hidden"><Image src={fort.img} alt={fort.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" /></div><div><p className="section-label mb-2">{fort.location}</p><h3 className="font-display text-stone text-3xl mb-4">{fort.name}</h3><p className="text-stone/60 leading-relaxed mb-4">{fort.desc}</p><p className="text-moss font-semibold text-sm border-l-2 border-moss pl-4">{fort.highlight}</p></div></div>))}</div></div></section><section className="py-20 bg-amber text-white text-center"><div className="container-site"><h2 className="font-display text-4xl mb-4">Ready to explore?</h2><p className="text-white/80 mb-8 max-w-md mx-auto">Let Thomas Faherty show you the real Inis Mór.</p><Link href="/book" className="bg-white text-amber font-semibold px-8 py-4 text-sm tracking-widest uppercase hover:bg-stone hover:text-white transition-colors">Book a Tour</Link></div></section></>))}
