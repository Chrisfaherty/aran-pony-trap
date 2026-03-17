'use client'
import { useState, useEffect, useCallback } from 'react'

const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December']
const TODAY=new Date()
function disp(s){if(!s)return'—';const[y,m,d]=s.split('-').map(Number);return`${d} ${MONTHS[m-1]} ${y}`}
function euro(n){return`€${Number(n||0).toLocaleString('en-IE')}`}
function tourLabel(id){return({shared:'Shared',private4:'Private·4',private6:'Private·6',private8:'Private·8',private10:'Private·10'})[id]||id}
function statusCol(s){return({paid:'bg-moss/15 text-moss',confirmed:'bg-atlantic/15 text-atlantic',cancelled:'bg-red-100 text-red-600',refunded:'bg-stone/15 text-stone/60'})[s]||'bg-stone/10 text-stone/50'}

function StatCard({label,value,sub}){return(<div className="bg-white border border-limestone p-6"><p className="text-xs text-stone/40 uppercase tracking-widest font-semibold mb-2">{label}</p><p className="font-display text-stone text-4xl">{value}</p>{sub&&<p className="text-stone/40 text-xs mt-1">{sub}</p>}</div>)}

function LoginScreen({onLogin}){
  const[pw,setPw]=useState(''),[ err,setErr]=useState(''),[ loading,setLoading]=useState(false)
  const submit=async()=>{
    setLoading(true);setErr('')
    const r=await fetch('/api/bookings',{headers:{'x-admin-key':pw}})
    if(r.ok){localStorage.setItem('admin_key',pw);onLogin(pw)}
    else{setErr('Incorrect password. Try again.');setLoading(false)}
  }
  return(<div className="min-h-screen bg-cream flex items-center justify-center p-6">
    <div className="bg-white border border-limestone p-10 w-full max-w-sm">
      <div className="text-center mb-8"><h1 className="font-display text-atlantic text-3xl mb-1">Admin Dashboard</h1><p className="text-stone/50 text-sm">Aran Pony & Trap Tours</p></div>
      <div className="space-y-4">
        <div><label className="block text-sm font-semibold text-stone mb-1.5">Admin password</label>
          <input type="password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==='Enter'&&submit()} className="w-full border border-limestone px-3 py-2.5 text-sm text-stone focus:outline-none focus:border-atlantic" placeholder="Enter your admin password" autoFocus/></div>
        {err&&<p className="text-red-500 text-sm">{err}</p>}
        <button onClick={submit} disabled={!pw||loading} className="w-full bg-atlantic text-white font-semibold text-sm tracking-widest uppercase py-3 hover:bg-stone transition-colors disabled:opacity-50">{loading?'Signing in…':'SIGN IN →'}</button>
      </div>
    </div>
  </div>)
}
function BookingPanel({booking,adminKey,onClose,onUpdate}){
  const[status,setStatus]=useState(booking.status),[ saving,setSaving]=useState(false)
  const update=async(s)=>{
    setSaving(true)
    const r=await fetch('/api/admin',{method:'PATCH',headers:{'Content-Type':'application/json','x-admin-key':adminKey},body:JSON.stringify({bookingId:booking.id,status:s})})
    if(r.ok){setStatus(s);onUpdate(booking.id,s)}
    setSaving(false)
  }
  const guide=booking.guideName||booking.guideId||'—'
  const pay=booking.paymentMethod==='cash_on_day'?'💵 Cash on day':'💳 Card (Stripe)'
  return(<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
    <div className="bg-white border border-limestone w-full max-w-md p-6 space-y-4 max-h-[90vh] overflow-y-auto" onClick={e=>e.stopPropagation()}>
      <div className="flex items-start justify-between">
        <div><p className="font-display text-stone text-xl">{booking.firstName} {booking.lastName}</p><p className="text-stone/40 text-xs mt-0.5 font-mono">{booking.id}</p></div>
        <button onClick={onClose} className="text-stone/40 hover:text-stone text-xl leading-none">×</button>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        {[['Tour',tourLabel(booking.tourId)],['Date',disp(booking.date)],['Guests',booking.guests||1],['Total',euro(booking.totalPrice)],['Guide',guide],['Payment',pay],['Email',booking.email],['Phone',booking.phone||'—'],...(booking.notes?[['Notes',booking.notes]]:[])].map(([k,v])=>(
          <div key={k} className={k==='Email'||k==='Phone'||k==='Notes'?'col-span-2':''}>
            <p className="text-stone/40 text-xs uppercase tracking-wide">{k}</p><p className="font-medium text-stone mt-0.5 break-all">{v}</p>
          </div>
        ))}
      </div>
      <div><p className="text-stone/40 text-xs uppercase tracking-wide mb-2">Status</p>
        <div className="flex flex-wrap gap-2">
          {['confirmed','paid','cancelled','refunded'].map(s=>(<button key={s} onClick={()=>update(s)} disabled={saving||status===s} className={`px-3 py-1.5 text-xs font-semibold capitalize rounded-full border transition-all ${status===s?`${statusCol(s)} border-transparent`:'border-limestone text-stone/50 hover:border-stone/30'}`}>{s}</button>))}
        </div>
        {saving&&<p className="text-stone/40 text-xs mt-2 animate-pulse">Saving…</p>}
      </div>
    </div>
  </div>)
}

function BlockDateModal({adminKey,onClose}){
  const[date,setDate]=useState(''),[ note,setNote]=useState(''),[ action,setAction]=useState('block'),[ saving,setSaving]=useState(false),[ result,setResult]=useState('')
  const submit=async()=>{
    if(!date)return;setSaving(true);setResult('')
    const r=await fetch('/api/admin',{method:'POST',headers:{'Content-Type':'application/json','x-admin-key':adminKey},body:JSON.stringify({date,closed:action==='block',note})})
    const d=await r.json();setResult(d.success?`✅ ${date} ${action==='block'?'blocked':'unblocked'}`:'❌ Failed');setSaving(false)
  }
  return(<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
    <div className="bg-white border border-limestone w-full max-w-sm p-6 space-y-4" onClick={e=>e.stopPropagation()}>
      <div className="flex items-center justify-between"><h2 className="font-display text-stone text-xl">Manage Dates</h2><button onClick={onClose} className="text-stone/40 hover:text-stone text-xl">×</button></div>
      <div className="space-y-3">
        <div><label className="block text-sm font-semibold text-stone mb-1.5">Date</label><input type="date" value={date} onChange={e=>setDate(e.target.value)} className="w-full border border-limestone px-3 py-2 text-sm text-stone focus:outline-none focus:border-atlantic"/></div>
        <div className="flex gap-2">{['block','unblock'].map(a=>(<button key={a} onClick={()=>setAction(a)} className={`flex-1 py-2 text-sm font-semibold capitalize border transition-all ${action===a?'bg-atlantic text-white border-atlantic':'border-limestone text-stone/50 hover:border-stone/40'}`}>{a}</button>))}</div>
        {action==='block'&&<div><label className="block text-sm font-semibold text-stone mb-1.5">Reason (optional)</label><input type="text" value={note} onChange={e=>setNote(e.target.value)} placeholder="e.g. Weather, Off-island…" className="w-full border border-limestone px-3 py-2 text-sm text-stone focus:outline-none focus:border-atlantic"/></div>}
        {result&&<p className="text-sm">{result}</p>}
        <button onClick={submit} disabled={!date||saving} className="w-full bg-atlantic text-white font-semibold text-sm tracking-widest uppercase py-3 hover:bg-stone transition-colors disabled:opacity-50">{saving?'Saving…':'Save →'}</button>
      </div>
    </div>
  </div>)
}
function GuideCalendar({guide,adminKey,onScheduleChange}){
  const[yr,setYr]=useState(TODAY.getFullYear()),[ mo,setMo]=useState(TODAY.getMonth()+1),[ schedule,setSchedule]=useState({}),[ loading,setLoading]=useState(true),[ saving,setSaving]=useState(null)
  const load=useCallback(async()=>{
    setLoading(true)
    try{const r=await fetch(`/api/admin?guideId=${guide.id}`,{headers:{'x-admin-key':adminKey}});const d=await r.json();setSchedule(d.schedule||{})}catch{setSchedule({})}
    setLoading(false)
  },[guide.id,adminKey])
  useEffect(()=>{load()},[load])
  const toggle=async(date)=>{
    const blocked=schedule[date]?.available===false;setSaving(date)
    const r=await fetch('/api/admin',{method:'POST',headers:{'Content-Type':'application/json','x-admin-key':adminKey},body:JSON.stringify({guideId:guide.id,date,available:blocked})})
    const d=await r.json();if(d.success){setSchedule(d.schedule);onScheduleChange&&onScheduleChange()}
    setSaving(null)
  }
  const prev=()=>{if(mo===1){setYr(y=>y-1);setMo(12)}else setMo(m=>m-1)}
  const next=()=>{if(mo===12){setYr(y=>y+1);setMo(1)}else setMo(m=>m+1)}
  const fdo=(new Date(yr,mo-1,1).getDay()+6)%7,dim=new Date(yr,mo,0).getDate()
  const todayStr=`${TODAY.getFullYear()}-${String(TODAY.getMonth()+1).padStart(2,'0')}-${String(TODAY.getDate()).padStart(2,'0')}`
  return(<div className="bg-white border border-limestone">
    <div className="flex items-center justify-between px-5 py-4 border-b border-limestone">
      <button onClick={prev} className="w-8 h-8 flex items-center justify-center text-stone hover:bg-cream">←</button>
      <span className="font-display text-stone text-lg">{MONTHS[mo-1]} {yr}</span>
      <button onClick={next} className="w-8 h-8 flex items-center justify-center text-stone hover:bg-cream">→</button>
    </div>
    <div className="grid grid-cols-7 border-b border-limestone">
      {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=><div key={d} className="text-center text-xs text-stone/40 uppercase tracking-wide py-2">{d}</div>)}
    </div>
    <div className="grid grid-cols-7">
      {Array(fdo).fill(null).map((_,i)=><div key={`e${i}`} className="h-12"/>)}
      {Array(dim).fill(null).map((_,i)=>{
        const day=i+1,ds=`${yr}-${String(mo).padStart(2,'0')}-${String(day).padStart(2,'0')}`
        const isPast=ds<todayStr,offSeason=mo<3||mo>10,blocked=schedule[ds]?.available===false,isSav=saving===ds
        return(<button key={day} onClick={()=>!isPast&&!offSeason&&toggle(ds)} disabled={isPast||offSeason||isSav}
          title={blocked?`Off: ${schedule[ds]?.note||'Unavailable'}`:`${guide.shortName} available`}
          className={`relative h-12 flex flex-col items-center justify-center text-sm transition-all ${offSeason||isPast?'opacity-20 cursor-not-allowed':isSav?'animate-pulse opacity-50 cursor-wait':blocked?'bg-red-50 text-red-500 hover:bg-red-100 cursor-pointer':'bg-moss/10 text-moss hover:bg-moss/20 cursor-pointer'}`}>
          <span className="font-semibold">{day}</span>
          {!offSeason&&!isPast&&<span className={`text-xs mt-0.5 ${blocked?'text-red-400':'text-moss/70'}`}>{blocked?'off':'on'}</span>}
        </button>)
      })}
    </div>
    <div className="flex items-center gap-4 px-4 py-3 border-t border-limestone text-xs text-stone/50">
      <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-moss/10 border border-moss/30 inline-block"/> Working</span>
      <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-red-50 border border-red-200 inline-block"/> Off</span>
      <span className="ml-auto text-stone/30">{loading?'Loading…':'Click to toggle'}</span>
    </div>
  </div>)
}
function GuideSettings({guide,adminKey,onSave}){
  const[methods,setMethods]=useState(guide.settings?.methods||guide.defaultPayment?.methods||['cash'])
  const[when,setWhen]=useState(guide.settings?.when||guide.defaultPayment?.when||'onday')
  const[saving,setSaving]=useState(false),[ saved,setSaved]=useState(false)
  const toggle=m=>{setMethods(p=>p.includes(m)?p.filter(x=>x!==m):[...p,m]);setSaved(false)}
  const save=async()=>{
    if(!methods.length)return;setSaving(true);setSaved(false)
    const r=await fetch('/api/admin',{method:'PATCH',headers:{'Content-Type':'application/json','x-admin-key':adminKey},body:JSON.stringify({guideId:guide.id,settings:{methods,when}})})
    const d=await r.json();if(d.success){setSaved(true);onSave&&onSave({methods,when})}
    setSaving(false)
  }
  return(<div className="bg-cream border border-limestone p-5 space-y-4">
    <h4 className="font-semibold text-stone text-sm uppercase tracking-wide">Payment settings</h4>
    <div><p className="text-xs text-stone/50 mb-2 uppercase tracking-wide">Accepted methods</p>
      <div className="flex gap-2">
        {[['card','💳 Card'],['cash','💵 Cash']].map(([val,label])=>(<button key={val} onClick={()=>toggle(val)} className={`px-4 py-2 text-sm font-semibold border transition-all ${methods.includes(val)?'bg-atlantic text-white border-atlantic':'border-limestone text-stone/50 hover:border-stone/40'}`}>{label}</button>))}
      </div>
    </div>
    <div><p className="text-xs text-stone/50 mb-2 uppercase tracking-wide">When to pay</p>
      <div className="space-y-2">
        {[['advance','🔒 Pay in advance (Stripe)'],['onday','📅 Pay on the day'],['either','⚡ Either — customer chooses']].map(([val,label])=>(<button key={val} onClick={()=>{setWhen(val);setSaved(false)}} className={`w-full text-left px-4 py-2.5 text-sm border transition-all ${when===val?'bg-atlantic/10 border-atlantic text-stone':'border-limestone text-stone/50 hover:border-stone/40'}`}>{label}</button>))}
      </div>
    </div>
    <button onClick={save} disabled={saving||!methods.length} className="w-full bg-atlantic text-white font-semibold text-sm tracking-widest uppercase py-3 hover:bg-stone transition-colors disabled:opacity-50">{saving?'Saving…':saved?'✓ Saved!':'Save settings →'}</button>
  </div>)
}

function GuidesTab({adminKey}){
  const[guides,setGuides]=useState([]),[ loading,setLoading]=useState(true),[ selected,setSelected]=useState(null)
  useEffect(()=>{
    fetch('/api/guides').then(r=>r.json()).then(d=>{setGuides(d);setSelected(d[0]?.id||null)}).catch(()=>{}).finally(()=>setLoading(false))
  },[])
  if(loading)return<div className="text-center py-16 text-stone/40 animate-pulse">Loading guides…</div>
  const ag=guides.find(g=>g.id===selected)
  return(<div className="space-y-6">
    <div className="flex gap-0 border border-limestone overflow-hidden">
      {guides.map(g=>(<button key={g.id} onClick={()=>setSelected(g.id)} className={`flex-1 py-3 px-4 text-sm font-semibold transition-all border-r border-limestone last:border-r-0 ${selected===g.id?'bg-atlantic text-white':'bg-white text-stone/60 hover:bg-cream'}`}>
        <span className={`w-7 h-7 rounded-full inline-flex items-center justify-center text-xs font-bold mr-2 ${selected===g.id?'bg-white/20':'bg-stone/10'}`}>{g.name.charAt(0)}</span>{g.shortName}
      </button>))}
    </div>
    {ag&&(<div className="grid md:grid-cols-[1fr_280px] gap-6">
      <div className="space-y-3">
        <div><h3 className="font-display text-stone text-xl">{ag.name}</h3><p className="text-stone/50 text-sm">{ag.role} — {ag.tagline}</p><p className="text-stone/60 text-sm mt-2 leading-relaxed">{ag.bio}</p></div>
        <p className="text-xs text-stone/40 uppercase tracking-wide font-semibold">Working days — click to toggle on/off</p>
        <GuideCalendar guide={ag} adminKey={adminKey}/>
      </div>
      <div className="space-y-4">
        <GuideSettings guide={ag} adminKey={adminKey} onSave={s=>setGuides(p=>p.map(g=>g.id===ag.id?{...g,settings:s}:g))}/>
        <div className="bg-white border border-limestone p-4">
          <p className="text-xs text-stone/40 uppercase tracking-wide font-semibold mb-3">Payment summary</p>
          <div className="space-y-2 text-sm">{(()=>{
            const s=ag.settings||ag.defaultPayment||{},m=s.methods||[],w=s.when||'onday'
            return(<><div className="flex justify-between"><span className="text-stone/50">Accepts</span><span className="font-medium text-stone">{m.map(x=>x==='card'?'Card':'Cash').join(' + ')||'—'}</span></div>
              <div className="flex justify-between"><span className="text-stone/50">When</span><span className="font-medium text-stone">{w==='onday'?'On the day':w==='advance'?'In advance':'Either'}</span></div>
              <div className="flex justify-between"><span className="text-stone/50">Online checkout</span><span className={`font-medium ${m.includes('card')&&w!=='onday'?'text-moss':'text-stone/40'}`}>{m.includes('card')&&w!=='onday'?'Active':'Disabled'}</span></div></>)
          })()}</div>
        </div>
      </div>
    </div>)}
  </div>)
}
function BookingsTab({adminKey}){
  const[bookings,setBookings]=useState([]),[ stats,setStats]=useState({}),[ loading,setLoading]=useState(true)
  const[filter,setFilter]=useState('all'),[ search,setSearch]=useState(''),[ selected,setSelected]=useState(null),[ showBlock,setShowBlock]=useState(false)
  const load=useCallback(async()=>{
    setLoading(true)
    try{
      const[br,sr]=await Promise.all([fetch('/api/bookings',{headers:{'x-admin-key':adminKey}}),fetch('/api/bookings?stats=1',{headers:{'x-admin-key':adminKey}})])
      const bd=await br.json(),sd=await sr.json()
      setBookings(Array.isArray(bd)?bd:[]);setStats(sd.stats||sd||{})
    }catch{setBookings([])}
    setLoading(false)
  },[adminKey])
  useEffect(()=>{load()},[load])
  const handleUpdate=(id,status)=>setBookings(p=>p.map(b=>b.id===id?{...b,status}:b))
  const now=new Date(),todayStr=now.toISOString().slice(0,10)
  const filtered=bookings.filter(b=>{
    if(filter==='upcoming')return b.date>=todayStr&&b.status!=='cancelled'
    if(filter==='paid')return b.status==='paid'
    return true
  }).filter(b=>{
    if(!search)return true
    const q=search.toLowerCase()
    return[b.firstName,b.lastName,b.email,b.id,b.date,b.guideName].filter(Boolean).some(v=>v.toLowerCase().includes(q))
  }).sort((a,b)=>new Date(b.createdAt||0)-new Date(a.createdAt||0))
  const upcoming=bookings.filter(b=>b.date>=todayStr&&b.status!=='cancelled').length
  return(<div className="space-y-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard label="Total Bookings" value={stats.totalBookings||0}/>
      <StatCard label="Total Revenue" value={euro(stats.totalRevenue||0)}/>
      <StatCard label="Total Guests" value={stats.totalGuests||0}/>
      <StatCard label="Upcoming" value={upcoming} sub="confirmed future tours"/>
    </div>
    <div className="flex flex-wrap items-center gap-3 justify-between">
      <div className="flex gap-2">
        {[['all','All'],['upcoming','Upcoming'],['paid','Paid']].map(([val,label])=>(<button key={val} onClick={()=>setFilter(val)} className={`px-4 py-2 text-sm font-semibold border transition-all ${filter===val?'bg-atlantic text-white border-atlantic':'bg-white border-limestone text-stone/60 hover:border-stone/30'}`}>{label}</button>))}
      </div>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name, email, ref, date…" className="border border-limestone px-3 py-2 text-sm text-stone focus:outline-none focus:border-atlantic flex-1 min-w-0 max-w-xs"/>
      <div className="flex gap-2">
        <button onClick={()=>setShowBlock(true)} className="flex items-center gap-2 px-4 py-2 border border-limestone text-sm font-semibold text-stone hover:border-stone/40 bg-white">🗓 Manage dates</button>
        <button onClick={load} className="flex items-center gap-2 px-4 py-2 border border-limestone text-sm font-semibold text-stone hover:border-stone/40 bg-white">↺ Refresh</button>
      </div>
    </div>
    <div className="bg-white border border-limestone overflow-x-auto">
      {loading?(<div className="text-center py-12 text-stone/40 animate-pulse">Loading bookings…</div>)
      :filtered.length===0?(<div className="text-center py-12 text-stone/40">No bookings yet.</div>)
      :(<table className="w-full text-sm"><thead><tr className="border-b border-limestone text-xs text-stone/40 uppercase tracking-widest">
          {['Date','Ref','Name','Tour','Guide','Guests','Total','Payment','Status'].map(h=>(<th key={h} className="text-left px-4 py-3 font-semibold">{h}</th>))}
        </tr></thead>
        <tbody className="divide-y divide-limestone">
          {filtered.map(b=>(<tr key={b.id} onClick={()=>setSelected(b)} className="hover:bg-cream cursor-pointer transition-colors">
            <td className="px-4 py-3 font-medium text-stone whitespace-nowrap">{disp(b.date)}</td>
            <td className="px-4 py-3 text-stone/40 font-mono text-xs whitespace-nowrap">{b.id}</td>
            <td className="px-4 py-3 font-medium text-stone whitespace-nowrap">{b.firstName} {b.lastName}</td>
            <td className="px-4 py-3 text-stone/60 whitespace-nowrap">{tourLabel(b.tourId)}</td>
            <td className="px-4 py-3 text-stone/60 whitespace-nowrap">{b.guideName||'—'}</td>
            <td className="px-4 py-3 text-center text-stone/60">{b.guests||1}</td>
            <td className="px-4 py-3 font-semibold text-stone whitespace-nowrap">{euro(b.totalPrice)}</td>
            <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${b.paymentMethod==='cash_on_day'?'bg-amber-50 text-amber-700':'bg-atlantic/10 text-atlantic'}`}>{b.paymentMethod==='cash_on_day'?'💵 Cash':'💳 Card'}</span></td>
            <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-full font-semibold capitalize ${statusCol(b.status)}`}>{b.status}</span></td>
          </tr>))}
        </tbody></table>)}
      <div className="px-4 py-3 border-t border-limestone text-xs text-stone/40">{filtered.length} booking{filtered.length!==1?'s':''} shown</div>
    </div>
    {selected&&<BookingPanel booking={selected} adminKey={adminKey} onClose={()=>setSelected(null)} onUpdate={handleUpdate}/>}
    {showBlock&&<BlockDateModal adminKey={adminKey} onClose={()=>setShowBlock(false)}/>}
  </div>)
}

export default function AdminPage(){
  const[adminKey,setAdminKey]=useState(null),[ tab,setTab]=useState('bookings')
  useEffect(()=>{const s=localStorage.getItem('admin_key');if(s)setAdminKey(s)},[])
  if(!adminKey)return<LoginScreen onLogin={setAdminKey}/>
  return(<div className="min-h-screen bg-cream">
    <div className="bg-atlantic text-white">
      <div className="container-site py-5 flex items-center justify-between gap-4 flex-wrap">
        <div><h1 className="font-display text-2xl">Aran Pony & Trap — {tab==='bookings'?'Bookings':'Guides'}</h1><p className="text-white/60 text-sm">Thomas Faherty · Admin Dashboard</p></div>
        <div className="flex items-center gap-2">
          <button onClick={()=>setTab('bookings')} className={`px-4 py-2 text-sm font-semibold border transition-all ${tab==='bookings'?'bg-white text-atlantic border-white':'border-white/30 text-white/70 hover:border-white/60'}`}>📋 Bookings</button>
          <button onClick={()=>setTab('guides')} className={`px-4 py-2 text-sm font-semibold border transition-all ${tab==='guides'?'bg-white text-atlantic border-white':'border-white/30 text-white/70 hover:border-white/60'}`}>👤 Guides</button>
          <button onClick={()=>{localStorage.removeItem('admin_key');setAdminKey(null)}} className="px-4 py-2 text-sm border border-white/20 text-white/50 hover:text-white/80 transition-all">Sign out</button>
        </div>
      </div>
    </div>
    <div className="bg-white border-b border-limestone">
      <div className="container-site flex">
        {[['bookings','📋 Bookings'],['guides','👤 Guides']].map(([val,label])=>(<button key={val} onClick={()=>setTab(val)} className={`px-6 py-3 text-sm font-semibold border-b-2 transition-all ${tab===val?'border-atlantic text-atlantic':'border-transparent text-stone/50 hover:text-stone'}`}>{label}</button>))}
      </div>
    </div>
    <div className="container-site py-8 pb-16">
      {tab==='bookings'&&<BookingsTab adminKey={adminKey}/>}
      {tab==='guides'&&<GuidesTab adminKey={adminKey}/>}
    </div>
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-limestone px-4 py-2 flex items-center justify-between text-xs text-stone/40">
      <span>Aran Pony & Trap Tours · Admin</span>
      <a href="/" className="hover:text-stone">View public site →</a>
    </div>
  </div>)
}