import Link from 'next/link'
import Image from 'next/image'
import { REVIEWS, OPERATING_SEASON } from '@/lib/tours'

function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://static.wixstatic.com/media/3cdf95_9c49533441ad432880f3dc158c928fc2~mv2.jpg/v1/fill/w_1800,h_900,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3cdf95_9c49533441ad432880f3dc158c928fc2~mv2.jpg"
          alt="Johnny Cash and the pony trap by the turquoise water of Inis MÃ³r"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-atlantic-dark via-atlantic-dark/60 to-transparent" />
        <div className="absolute inset-0 bg-atlantic/20" />
      </div>
      <div className="relative z-10 container-site w-full pb-24 md:pb-32 pt-32">
        <div className="max-w-2xl animate-stagger">
          <p className="section-label text-amber mb-4">Inis MÃ³r Â· Aran Islands Â· Since the 1940s</p>
          <h1 className="font-display text-white text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6">
            See the island
            <br />
            <em className="text-amber not-italic">the way it was meant</em>
            <br />
            to be seen.
          </h1>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
            Thomas Faherty guides you through Inis MÃ³r on a traditional pony & trap â€” past ancient stone forts, hidden coves, and stories no guidebook will ever tell you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/book" className="btn-primary text-center">Book Your Tour â†’</Link>
            <Link href="/experience" className="btn-outline text-center">Discover the Experience</Link>
          </div>
          <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20">
            {[{val:'â˜… 4.9',label:'TripAdvisor rating'},{val:'4hrs',label:'Full island tour'},{val:'â‚¬50',label:'Per person (shared)'},{val:'Marâ€“Oct',label:'Operating season'}].map(s=>(<div key={s.label}><p className="text-white font-display text-xl">{s.val}</p><p className="text-white/50 text-xs tracking-wide uppercase mt-0.5">{s.label}</p></div>))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustBar() {
  return (
    <div className="bg-atlantic py-4 overflow-hidden">
      <div className="flex items-center justify-center flex-wrap gap-x-10 gap-y-2 container-site">
        {['â˜… â˜… â˜… â˜… â˜…  TripAdvisor Certificate of Excellence','Â·',
          'Wild Atlantic Way Partner','Â·','Family-run since the 1940s','Â·',
          'Over 80 years on Inis MÃ³r'].map((item,i) => (
          <span key={i} className={`text-xs tracking-widest uppercase ${item==='Â·'?'text-white/20 hidden md:block':'text-white/60'}`}>{item}</span>
        ))}
      </div>
    </div>
  )
}

function Experience() {
  const highlights = [
    {icon:'ðŸ°',title:'DÃºn Aonghasa',desc:'The spectacular cliff-top stone fort, 300 feet above the Atlantic.'},
    {icon:'ðŸŒŠ',title:'The Wormhole',desc:'Poll na bPÃ©ist â€” a perfectly rectangular pool carved into the limestone cliffs.'},
    {icon:'ðŸ¦­',title:'Seal Colony',desc:'At low tide, spot Atlantic grey seals lounging on the rocks along the island\'s sheltered coves.'},
    {icon:'ðŸ”–',title:'Island Stories',desc:'Thomas knows every family, every ruin, every legend.'},
  ]
  return (
    <section className="py-24 bg-cream">
      <div className="container-site">
        <div className="max-w-xl mb-16"><p className="section-label mb-3">What you'll see</p><h2 className="font-display text-stone text-4xl md:text-5xl leading-tight">Four hours.<br />A lifetime of memories.</h2></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 border border-limestone">
          {highlights.map((h,i) => (<div key={h.title} className={`p-8 ${i<3?'border-b md:border-b-0 md:border-r lg:border-r border-limestone':''}`}><div className="text-3xl mb-4">{h.icon}</div><h3 className="font-display text-stone text-xl mb-3">{h.title}</h3><p className="text-stone/60 text-sm leading-relaxed">{h.desc}</p></div>))}
        </div>
        <div className="mt-8 text-center"><Link href="/experience" className="btn-ghost">Full tour details â†’</Link></div>
      </div>
    </section>
  )
}

function TourOptions() {
  const options = [
    {name:'Shared Tour',    price:'â‚¬50', unit:'per person',note:'Join a small group',href:'/book?type=shared'},
    {name:'Private Â· 4',   price:'â‚¬250',unit:'total',       note:'Up to 4 people',    href:'/book?type=private4'},
    {name:'Private Â· ˜ 6',   price:'â‚¬350',unit:'total',       note:'Up to 6 people',    href:'/book?type=private6'},
    {name:'Private Â· ˜ 8',   price:'â‚¬450',unit:'total',       note:'Up to 8 people',    href:'/book?type=private8'},
    {name:'Private Â· 10',  price:'~(*ÀÓSrÇVæ—C¢wF÷FÂrÂæ÷FS¢uWFòV÷ÆRrÂ‡&Vc¢rö&öö³÷G—S×&—fFSwÒÀ¢Ð¢&WGW&â€¢Ç6V7F–öâ6Æ74æÖSÒ'’Ó#B&r×7FöæRFW‡B×v†—FR#à¢ÆF—b6Æ74æÖSÒ&6öçF–æW"×6—FR#à¢ÆF—b6Æ74æÖSÒ&fÆW‚fÆW‚Ö6öÂÖC¦fÆW‚×&÷rÖC¦—FV×2ÖVæB§W7F–g’Ö&WGvVVâÖ"ÓbvÓb#ãÆF—cãÇ6Æ74æÖSÒ'6V7F–öâÖÆ&VÂFW‡BÖÖ&W"Ö"Ó2#å&–6–æsÂ÷ãÆƒ"6Æ74æÖSÒ&föçBÖF—7Æ’FW‡BÓG†ÂÖC§FW‡BÓW†Â#ä6†ö÷6R–÷W"F÷W#Âöƒ#ãÂöF—cãÇ6Æ74æÖSÒ'FW‡B×v†—FRóSÖ‚×r×‡2FW‡B×6ÒÆVF–ær×&VÆ†VB#äÆÂF÷W'2&RB†÷W'2æB'VâÖ&6‚F‡&÷Vv‚ö7Fö&W"âF—&V7B&öö¶–ær(	BÆFf÷&ÒfVW2fö–FVBãÂ÷ãÂöF—cà¢ÆF—b6Æ74æÖSÒ&w&–Bw&–BÖ6öÇ2Ó6Ó¦w&–BÖ6öÇ2Ó"Æs¦w&–BÖ6öÇ2ÓRv×‚&r×v†—FRó#à¢¶÷F–öç2æÖ‚†÷BÆ’’ÓâƒÄÆ–æ²¶W“×¶÷BææÖWÒ‡&Vc×¶÷Bæ‡&VgÒ6Æ74æÖS×¶w&÷WfÆW‚fÆW‚Ö6öÂÓ‚&r×7FöæR†÷fW#¦&rÖFÆçF–2G&ç6—F–öâÖ6öÆ÷'2GW&F–öâÓ#G¶“ÓÓÓw6Ó¦6öÂ×7âÓ"Æs¦6öÂ×7âÓs¢rwÖÓãÇ6Æ74æÖSÒ'FW‡B×v†—FRóCFW‡B×‡2G&6¶–ær×v–FW7BWW&66RÖ"Ób#ç¶÷Bææ÷FWÓÂ÷ãÇ6Æ74æÖSÒ&föçBÖF—7Æ’FW‡BÓG†ÂFW‡B×v†—FRw&÷WÖ†÷fW#§FW‡BÖÖ&W"G&ç6—F–öâÖ6öÆ÷'2#ç¶÷Bç&–6WÓÂ÷ãÇ6Æ74æÖSÒ'FW‡B×v†—FRóCFW‡B×‡2×BÓÖ"Ób#ç¶÷BçVæ—GÓÂ÷ãÇ6Æ74æÖSÒ'FW‡B×v†—FRóƒFW‡B×6ÒföçB×6VÖ–&öÆB×BÖWFò#ç¶÷BææÖWÓÂ÷ãÇ7â6Æ74æÖSÒ'FW‡BÖÖ&W"FW‡B×‡2×BÓ"÷6—G’Ów&÷WÖ†÷fW#¦÷6—G’ÓG&ç6—F–öâÖ÷6—G’#ä&öö²F†—2(i#Â÷7ããÂôÆ–æ³â’—Ð¢ÂöF—cà¢Ç6Æ74æÖSÒ'FW‡B×v†—FRó3FW‡B×‡2×BÓbFW‡BÖ6VçFW"#ç´õU$D”äuõ4T4ôâæÖöçF‡7Ò+r´õU$D”äuõ4T4ôâææ÷FWÓÂ÷à¢ÂöF—cà¢Â÷6V7F–öãà¢§Ð ¦gVæ7F–öâ&Wf–Ww2‚’°¢6öç7BF÷V&ÆVBÒ²ââå$Ud”Uu2Âââå$Ud”Uu5Ð¢&WGW&â€¢Ç6V7F–öâ6Æ74æÖSÒ'’Ó#B&rÖ7&VÒ÷fW&fÆ÷rÖ†–FFVâ#à¢ÆF—b6Æ74æÖSÒ&6öçF–æW"×6—FRÖ"Ó"#ãÇ6Æ74æÖSÒ'6V7F–öâÖÆ&VÂÖ"Ó2#åv†Bf—6—F÷'26“Â÷ãÆF—b6Æ74æÖSÒ&fÆW‚—FV×2Ö&6VÆ–æRvÓb#ãÆƒ"6Æ74æÖSÒ&föçBÖF—7Æ’FW‡B×7FöæRFW‡BÓG†ÂÖC§FW‡BÓW†Â#î)ˆRBã’öâG&—Gf—6÷#Âöƒ#ãÇ6Æ74æÖSÒ'FW‡B×7FöæRóCFW‡B×6Ò#ä6W'F–f–6FRöbW†6VÆÆVæ6SÂ÷ãÂöF—cãÂöF—cà¢ÆF—b6Æ74æÖSÒ'&VÆF—fR#ãÆF—b6Æ74æÖSÒ'&Wf–Wr×G&6²#à¢¶F÷V&ÆVBæÖ‚‡"Æ’’ÓâƒÆF—b¶W“×¶—Ò6Æ74æÖSÒ&fÆW‚×6‡&–æ²ÓrÓƒ×‚ÓB&r×v†—FR&÷&FW"&÷&FW"ÖÆ–ÖW7FöæRÓb#ãÆF—b6Æ74æÖSÒ&fÆW‚vÓãRÖ"ÓB#ç´'&’‡"ç&F–ær’æf–ÆÂƒ’æÖ‚…òÆ¢’ÓâÇ7â¶W“×¶§Ò6Æ74æÖSÒ'FW‡BÖÖ&W"FW‡B×6Ò#î)ˆSÂ÷7ãâ—ÓÂöF—cãÇ6Æ74æÖSÒ'FW‡B×7FöæRósFW‡B×6ÒÆVF–ær×&VÆ†VBÖ"ÓBÆ–æRÖ6Æ×ÓB#â'·"çFW‡GÒ#Â÷ãÇ6Æ74æÖSÒ'FW‡B×7FöæRóCFW‡B×‡2föçB×6VÖ–&öÆBG&6¶–ær×v–FR#ç·"æfÆwÒ·"æWF†÷'ÓÂ÷ãÂöF—câ’—Ð¢ÂöF—cãÆF—b6Æ74æÖSÒ&'6öÇWFR–ç6WB×’ÓÆVgBÓrÓb&rÖw&F–VçB×Fò×"g&öÒÖ7&VÒFò×G&ç7&VçB¢Óö–çFW"ÖWfVçG2ÖæöæR"óãÆF—b6Æ74æÖSÒ&'6öÇWFR–ç6WB×’Ó&–v‡BÓrÓb&rÖw&F–VçB×FòÖÂg&öÒÖ7&VÒFò×G&ç7&VçB¢Óö–çFW"ÖWfVçG2ÖæöæR"óãÂöF—cà¢ÆF—b6Æ74æÖSÒ&6öçF–æW"×6—FR×BÓFW‡BÖ6VçFW"#ãÄÆ–æ²‡&VcÒ"öW‡W&–Væ6R7&Wf–Ww2"6Æ74æÖSÒ&'FâÖv†÷7B#å&VBÆÂ&Wf–Ww2(i#ÂôÆ–æ³ãÂöF—cà¢Â÷6V7F–öãà¢§Ð ¦gVæ7F–öâ&÷WEF†öÖ2‚’°¢&WGW&â€¢Ç6V7F–öâ6Æ74æÖSÒ'’Ó#B&r×v†—FR#à¢ÆF—b6Æ74æÖSÒ&6öçF–æW"×6—FR#à¢ÆF—b6Æ74æÖSÒ&w&–BÖC¦w&–BÖ6öÇ2Ó"vÓb—FV×2Ö6VçFW"#à¢ÆF—b6Æ74æÖSÒ'&VÆF—fR7V7BÕ³BóUÒ&rÖÆ–ÖW7FöæR÷fW&fÆ÷rÖ†–FFVâ#à¢Ä–ÖvP¢7&3Ò&‡GG3¢ò÷7FF–2çv—‡7FF–2æ6öÒöÖVF–ó66Fc“UóSCsfVF3C#FCF&ƒfc&S&f&Cƒ6VRæ§r÷cöf–ÆÂ÷uó“Æ…ósÆÅö2ÇóƒRÇW6ÕóãceóãóãÆVæ5öf–bÇVÆ—G•öWFòó66Fc“UóSCsfVF3C#FCF&ƒfc&S&f&Cƒ6VRæ§r ¢ÇCÒ%F†öÖ2f†W'G’v—F‚¦ö†æç’66‚F†Röç’æBF†R&VBG&Â–æ—2Ü;7" ¢f–ÆÀ¢6Æ74æÖSÒ&ö&¦V7BÖ6÷fW" ¢6—¦W3Ò"†Ö‚×v–GFƒ¢sc‡‚’grÂSgr ¢óà¢ÆF—b6Æ74æÖSÒ&'6öÇWFR&÷GFöÒÓÆVgBÓ&–v‡BÓ&rÖFÆçF–2ó“‚Ób’ÓB#à¢Ç6Æ74æÖSÒ'FW‡B×v†—FRföçBÖF—7Æ’FW‡B×6Ò#åF†öÖ2f†W'G’b¦ö†æç’66ƒÂ÷à¢Ç6Æ74æÖSÒ'FW‡B×v†—FRóSFW‡B×‡2×BÓãR#ä¶–Ç&öæâÂ–æ—2Ü;7#Â÷à¢ÂöF—cà¢ÂöF—cà¢ÆF—cà¢Ç6Æ74æÖSÒ'6V7F–öâÖÆ&VÂÖ"ÓB#äÖVWB–÷W"wV–FSÂ÷à¢Æƒ"6Æ74æÖSÒ&föçBÖF—7Æ’FW‡B×7FöæRFW‡BÓG†ÂÖC§FW‡BÓW†ÂÆVF–ær×F–v‡BÖ"Ób#åF†öÖ2f†W'G“Âöƒ#à¢ÆF—b6Æ74æÖSÒ'76R×’ÓBFW‡B×7FöæRósÆVF–ær×&VÆ†VB#à¢ÇåF†öÖ2f†W'G’†2&VVâwV–F–ærf—6—F÷'2&÷VæB–æ—2Ü;7"f÷"FV6FW2âöç’bG&G&F—F–öâ–âF†Rf†W'G’fÖ–Ç’6–æ6RF†R“C2ãÂ÷à¢Çä†RvÆÂF¶R–÷R7BF†Rf÷W"w&VB7FöæRf÷'G2ÂF÷vâFòF†Rv÷&Ö†öÆRÂF‡&÷Vv‚æ6–VçBF‡v—2F†BöæÇ’F†R—6ÆæFW'2¶æ÷rãÂ÷à¢Ç6Æ74æÖSÒ&föçB×6VÖ–&öÆBFW‡B×7FöæR#äæBF†VâF†W&Rw2¦ö†æç’66‚ÂF†Röç’(	B6†&7FW"–â†—2÷vâ&–v‡BãÂ÷à¢ÂöF—cà¢ÆF—b6Æ74æÖSÒ&×BÓ‚fÆW‚fÆW‚Ö6öÂ6Ó¦fÆW‚×&÷rvÓB#à¢ÄÆ–æ²‡&VcÒ"ö&öö²"6Æ74æÖSÒ&'Fâ×&–Ö'’#ä&öö²v—F‚F†öÖ2(i#ÂôÆ–æ³à¢ÄÆ–æ²‡&VcÒ"öW‡W&–Væ6R"6Æ74æÖSÒ&'FâÖv†÷7B#ä&÷WBF†RF÷W#ÂôÆ–æ³à¢ÂöF—cà¢ÂöF—cà¢ÂöF—cà¢ÂöF—cà¢Â÷6V7F–öãà¢§Ð ¦gVæ7F–öâ—6ÆæEFV6W"‚’°¢&WGW&â€¢Ç6V7F–öâ6Æ74æÖSÒ'&VÆF—fR’Ó3"÷fW&fÆ÷rÖ†–FFVâ#à¢ÆF—b6Æ74æÖSÒ&'6öÇWFR–ç6WBÓ¢Ó#à¢Ä–ÖvR7&3Ò&‡GG3¢ò÷7FF–2çv—‡7FF–2æ6öÒöÖVF–ó“C#“óf3S#3s#c#CSs–cs&3s##CV3fS“æ×c"æ§r÷cöf–ÆÂ÷uóƒÆ…ó“ÆÅö2ÇóƒRÇW6ÕóãceóãóãÆVæ5öf–bÇVÆ—G•öWFòó“C#“óf3S#3s#c#CSs–cs&3s##CV3fS“æ×c"æ§r"ÇCÒ$–æ—2Ü;7"FÆçF–26ö7FÆ–æR"f–ÆÂ6Æ74æÖSÒ&ö&¦V7BÖ6÷fW""6—¦W3Ò#gr"óà¢ÆF—b6Æ74æÖSÒ&'6öÇWFR–ç6WBÓ&rÖÖ÷72óƒ"óà¢ÂöF—cà¢ÆF—b6Æ74æÖSÒ'&VÆF—fR¢Ó6öçF–æW"×6—FRFW‡BÖ6VçFW"FW‡B×v†—FR#à¢Ç6Æ74æÖSÒ'6V7F–öâÖÆ&VÂFW‡B×v†—FRócÖ"ÓB#åF†R—6ÆæCÂ÷à¢Æƒ"6Æ74æÖSÒ&föçBÖF—7Æ’FW‡BÓG†ÂÖC§FW‡BÓg†ÂÖ"ÓbÖ‚×rÓ'†Â×‚ÖWFòÆVF–ær×F–v‡B#ä–æ—2Ü;7"—2VæÆ–¶Rç—v†W&RVÇ6RöâV'F‚ãÂöƒ#à¢Ç6Æ74æÖSÒ'FW‡B×v†—FRósÖ‚×r×†Â×‚ÖWFòÖ"ÓÆVF–ær×&VÆ†VB#äæ6–VçB7FöæRf÷'G2âÆ–ÖW7FöæRfVÖVçG2F†B7G&WF6‚FòF†R6Æ–fbVFvRâÆæwVvRæB7VÇGW&R&W6W'fVBf÷"6VçGW&–W2ãÂ÷à¢ÆF—b6Æ74æÖSÒ&fÆW‚fÆW‚Ö6öÂ6Ó¦fÆW‚×&÷rvÓB§W7F–g’Ö6VçFW"#à¢ÄÆ–æ²‡&VcÒ"ö–æ—2ÖÖ÷""6Æ74æÖSÒ&'FâÖ÷WFÆ–æR#äW‡Æ÷&RF†R—6ÆæBwV–FSÂôÆ–æ³à¢ÄÆ–æ²‡&VcÒ"ö&öö²"6Æ74æÖSÒ&'Fâ×&–Ö'’#ä&öö²F÷W#ÂôÆ–æ³à¢ÂöF—cà¢ÂöF—cà¢Â÷6V7F–öãà¢§Ð ¦gVæ7F–öâ7F•FV6W"‚’°¢&WGW&â€¢Ç6V7F–öâ6Æ74æÖSÒ'’Ó#&rÖ7&VÒ&÷&FW"×B&÷&FW"ÖÆ–ÖW7FöæR#à¢ÆF—b6Æ74æÖSÒ&6öçF–æW"×6—FR#à¢ÆF—b6Æ74æÖSÒ&fÆW‚fÆW‚Ö6öÂÖC¦fÆW‚×&÷r—FV×2Ö6VçFW"§W7F–g’Ö&WGvVVâvÓ‚#à¢ÆF—cãÇ6Æ74æÖSÒ'6V7F–öâÖÆ&VÂÖ"Ó"#äÖ¶Ræ–v‡Böb—CÂ÷ãÆƒ"6Æ74æÖSÒ&föçBÖF—7Æ’FW‡B×7FöæRFW‡BÓ7†ÂÖC§FW‡BÓG†Â#å7F’B6V7&W7B"d#Âöƒ#ãÇ6Æ74æÖSÒ'FW‡B×7FöæRóc×BÓ2Ö‚×rÖÖBFW‡B×6ÒÆVF–ær×&VÆ†VB#å'Vâ'’vW&ÆF–æRbF†öÖ2f†W'G’–â¶–Ç&öæââ&öö×2g&öÒ(*Ãƒöæ–v‡B–æ6ÇVF–ær†öÖVÖFR6öçF–æVçFÂ'&V¶f7BãÂ÷ãÂöF—cà¢ÆF—b6Æ74æÖSÒ&fÆW‚×6‡&–æ²ÓfÆW‚fÆW‚Ö6öÂ6Ó¦fÆW‚×&÷rvÓ2#ãÄÆ–æ²‡&VcÒ"÷7F’"6Æ74æÖSÒ&'Fâ×&–Ö'’v†—FW76RÖæ÷w&#åf–Wr&öö×2b&FW2(i#ÂôÆ–æ³ãÂöF—cà¢ÂöF—cà¢ÂöF—cà¢Â÷6V7F–öãà¢§Ð ¦W‡÷'BFVfVÇBgVæ7F–öâ†öÖUvR‚’°¢&WGW&â€¢Ãà¢Ä†W&òóà¢ÅG'W7D&"óà¢ÄW‡W&–Væ6Róà¢ÅF÷W$÷F–öç2óà¢Å&Wf–Ww2óà¢Ä&÷WEF†öÖ2óà¢Ä—6ÆæEFV6W"óà¢Å7F•FV6W"óà¢Âóà¢§Ð 