'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { TOURS, TOUR_LIST, OPERATING_SEASON, CANCELLATION_POLICY } from '@/lib/tours'

const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December']
const TODAY=new Date()
function fmt(d){return d?`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`:''}
function disp(s){if(!s)return'';const[y,m,d]=s.split('-').map(Number);return`${d} ${MONTHS[m-1]} ${y}`}
function inSeason(d){const m=d.getMonth()+1;return m>=OPERATING_SEASON.start&&m<=OPERATING_SEASON.end}

function Steps({current}){
  const steps=['Tour & Date','Your Guide','Your Details','Payment']
  return(<div className="flex items-center gap-0 mb-10">
    {steps.map((s,i)=>(<div key={s} className="flex items-center">
      <div className={`flex items-center gap-2 ${i<current?'text-moss':i===current?'text-stone':'text-stone/30'}`}>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border ${i<current?'bg-moss border-moss text-white':i===current?'bg-white border-stone text-stone':'bg-transparent border-stone/20 text-stone/30'}`}>{i<current?'✓':i+1}</div>
        <span className="text-sm font-semibold hidden sm:block">{s}</span>
      </div>
      {i<steps.length-1&&<div className={`w-8 h-px mx-2 ${i<current?'bg-moss':'bg-stone/20'}`}/>}
    </div>))}
  </div>)
}

function Calendar({tourId,guideId,onSelect,selected}){
  const[yr,setYr]=useState(TODAY.getFullYear())
  const[mo,setMo]=useState(TODAY.getMonth()+1)
  const[avail,setAvail]=useState({})
  const[gAvail,setGAvail]=useState({})
  const[loading,setLoading]=useState(true)
  const load=useCallback(async(y,m)=>{
    setLoading(true)
    try{
      const reqs=[fetch(`/api/availability?year=${y}&month=${m}`).then(r=>r.json())]
      if(guideId)reqs.push(fetch(`/api/guides?guideId=${guideId}&year=${y}&month=${m}`).then(r=>r.json()))
      const[td,gd]=await Promise.all(reqs)
      setAvail(td||{});setGAvail(gd||{})
    }catch{setAvail({});setGAvail({})}finally{setLoading(false)}
  },[guideId])
  useEffect(()=>{load(yr,mo)},[yr,mo,load])
  const prev=()=>{if(mo===1){setYr(y=>y-1);setMo(12)}else setMo(m=>m-1)}
  const next=()=>{if(mo===12){setYr(y=>y+1);setMo(1)}else setMo(m=>m+1)}
  const canPrev=yr>TODAY.getFullYear()||(yr===TODAY.getFullYear()&&mo>TODAY.getMonth()+1)
  const fdo=(new Date(yr,mo-1,1).getDay()+6)%7
  const dim=new Date(yr,mo,0).getDate()
  const getSt=day=>{
    const ds=`${yr}-${String(mo).padStart(2,'0')}-${String(day).padStart(2,'0')}`
    const dt=new Date(yr,mo-1,day)
    if(ds<fmt(TODAY))return'past'
    if(!inSeason(dt))return'off'
    const info=avail[ds]
    if(!info)return loading?'loading':'unkn'
    if(!info.available)return'na'
    if(guideId&&gAvail[ds]===false)return'goff'
    if(tourId==='shared'){if(!info.shared?.available)return'full';if(info.shared.spotsLeft<=3)return'lim';return'ok'}
    if(!info.private?.available)return'full'
    return'ok'
  }
  const ss={past:'opacity-20 cursor-not-allowed',off:'opacity-20 cursor-not-allowed',loading:'animate-pulse opacity-30 cursor-wait',unkn:'opacity-30',na:'line-through opacity-20 cursor-not-allowed',full:'opacity-25 cursor-not-allowed',goff:'opacity-25 cursor-not-allowed bg-stone/5',lim:'text-amber-700 bg-amber-50 hover:bg-amber-100 cursor-pointer font-semibold',ok:'hover:bg-atlantic/10 cursor-pointer font-semibold hover:text-atlantic'}
  return(<div className="bg-white border border-limestone">
    <div className="flex items-center justify-between px-5 py-4 border-b border-limestone">
      <button onClick={prev} disabled={!canPrev} className="w-8 h-8 flex items-center justify-center text-stone hover:bg-cream disabled:opacity-20 disabled:cursor-not-allowed">←</button>
      <span className="font-display text-stone text-lg">{MONTHS[mo-1]} {yr}</span>
      <button onClick={next} className="w-8 h-8 flex items-center justify-center text-stone hover:bg-cream">→</button>
    </div>
    <div className="grid grid-cols-7 border-b border-limestone">
      {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=><div key={d} className="text-center text-xs text-stone/40 uppercase tracking-wide py-2">{d}</div>)}
    </div>
    <div className="grid grid-cols-7">
      {Array(fdo).fill(null).map((_,i)=><div key={`e${i}`} className="h-10"/>)}
      {Array(dim).fill(null).map((_,i)=>{
        const day=i+1,ds=`${yr}-${String(mo).padStart(2,'0')}-${String(day).padStart(2,'0')}`
        const st=getSt(day),isSl=selected===ds,ok=['ok','lim'].includes(st),info=avail[ds]
        return(<button key={day} onClick={()=>ok&&onSelect(ds)} disabled={!ok}
          className={`relative h-10 flex items-center justify-center text-sm transition-all ${isSl?'bg-atlantic text-white font-bold':ss[st]}`}
          title={st==='full'?'Fully booked':st==='lim'?`${info?.shared?.spotsLeft} spots left`:st==='goff'?'Guide not available':st==='off'?'Out of season':''}>
          {day}{st==='lim'&&!isSl&&<span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-500"/>}
        </button>)
      })}
    </div>
    <div className="flex flex-wrap gap-3 px-4 py-3 border-t border-limestone text-xs text-stone/50">
      <span className="flex items-center gap-1.5"><span className="w-3 h-3 border border-atlantic/30 bg-atlantic/10 inline-block"/> Available</span>
      <span className="flex items-center gap-1.5"><span className="w-3 h-3 border border-amber-200 bg-amber-50 inline-block"/> Limited</span>
      <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-stone/10 inline-block"/> Unavailable</span>
      {guideId&&<span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-stone/5 border border-stone/20 inline-block"/> Guide off</span>}
    </div>
  </div>)
}

function Step1({tourId,guests,date,onTour,onGuests,onDate}){
  const tour=TOURS[tourId]
  return(<div className="space-y-8">
    <div>
      <h2 className="font-display text-stone text-2xl mb-1">Choose your tour</h2>
      <p className="text-stone/50 text-sm mb-5">All tours · 4 hours · {OPERATING_SEASON.months}</p>
      <div className="space-y-2">
        {TOUR_LIST.map(t=>(<button key={t.id} onClick={()=>onTour(t.id)}
          className={`w-full text-left border p-4 transition-all flex items-center justify-between ${tourId===t.id?'border-atlantic bg-atlantic/5':'border-limestone bg-white hover:border-stone/40'}`}>
          <div><p className="font-semibold text-stone text-sm">{t.name}</p><p className="text-stone/50 text-xs mt-0.5">{t.tagline}</p></div>
          <div className="text-right flex-shrink-0 ml-4">
            <p className="font-display text-atlantic text-lg">{t.priceLabel.split(' ')[0]}</p>
            <p className="text-stone/40 text-xs">{t.priceLabel.split(' ').slice(1).join(' ')}</p>
          </div>
        </button>))}
      </div>
    </div>
    {tourId==='shared'&&(<div>
      <h3 className="font-display text-stone text-lg mb-3">Number of guests</h3>
      <div className="flex items-center gap-4">
        <button onClick={()=>onGuests(Math.max(1,guests-1))} className="w-10 h-10 border border-limestone text-xl text-stone hover:border-stone flex items-center justify-center">−</button>
        <span className="font-display text-stone text-2xl w-8 text-center">{guests}</span>
        <button onClick={()=>onGuests(Math.min(12,guests+1))} className="w-10 h-10 border border-limestone text-xl text-stone hover:border-stone flex items-center justify-center">+</button>
        <span className="text-stone/50 text-sm ml-2">Total: <strong className="text-stone">€{guests*(tour?.price||50)}</strong></span>
      </div>
    </div>)}
    {tourId&&(<div>
      <h3 className="font-display text-stone text-lg mb-3">Choose a date</h3>
      <Calendar tourId={tourId} guideId={null} onSelect={onDate} selected={date}/>
    </div>)}
  </div>)
}

function PayBadge({settings}){
  if(!settings)return null
  const m=settings.methods||[],w=settings.when||'either'
  return(<div className="flex flex-wrap gap-1.5 mt-2">
    {m.includes('card')&&<span className="text-xs bg-atlantic/10 text-atlantic px-2 py-0.5 rounded-full font-medium">💳 Card</span>}
    {m.includes('cash')&&<span className="text-xs bg-moss/10 text-moss px-2 py-0.5 rounded-full font-medium">💵 Cash</span>}
    {w==='onday'&&<span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-medium">📅 Pay on the day</span>}
    {w==='advance'&&<span className="text-xs bg-stone/10 text-stone/70 px-2 py-0.5 rounded-full font-medium">🔒 Pay in advance</span>}
    {w==='either'&&<span className="text-xs bg-stone/10 text-stone/70 px-2 py-0.5 rounded-full font-medium">⚡ Flexible payment</span>}
  </div>)
}

function Step2Guide({date,guideId,onGuide,guides,loading}){
  if(loading)return<div className="text-center py-12 text-stone/40 animate-pulse">Loading guides…</div>
  return(<div>
    <h2 className="font-display text-stone text-2xl mb-1">Choose your guide</h2>
    <p className="text-stone/50 text-sm mb-6">{date?`Availability shown for ${disp(date)}`:'All guides are experienced Inis Mór locals.'}</p>
    <div className="space-y-3">
      {guides.map(g=>{
        const avail=g.availableOnDate!==false,isSel=guideId===g.id
        return(<button key={g.id} onClick={()=>avail&&onGuide(g.id)} disabled={!avail}
          className={`w-full text-left border p-5 transition-all ${isSel?'border-atlantic bg-atlantic/5':!avail?'border-limestone opacity-40 cursor-not-allowed bg-stone/5':'border-limestone bg-white hover:border-stone/40'}`}>
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center text-xl font-display font-bold ${isSel?'bg-atlantic text-white':'bg-cream text-stone'}`}>{g.name.charAt(0)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold text-stone">{g.name}</p>
                <span className="text-xs text-stone/40 bg-stone/10 px-2 py-0.5 rounded-full">{g.role}</span>
                {!avail&&<span className="text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Not available {disp(date)}</span>}
              </div>
              <p className="text-stone/60 text-sm mt-1 leading-relaxed">{g.bio}</p>
              <PayBadge settings={g.settings}/>
            </div>
            {isSel&&<span className="text-atlantic text-xl flex-shrink-0">✓</span>}
          </div>
        </button>)
      })}
    </div>
    {guideId&&(()=>{
      const g=guides.find(x=>x.id===guideId),s=g?.settings||g?.defaultPayment
      if(s?.when==='onday')return(<div className="mt-4 bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
        <strong>💵 Pay on the day</strong> — {g?.shortName} collects payment at Kilronan Pier. No online payment needed!
      </div>)
      return null
    })()}
  </div>)
}

function Step3Details({form,onChange}){
  const fields=[{name:'firstName',label:'First name',type:'text',required:true,half:true},{name:'lastName',label:'Last name',type:'text',required:true,half:true},{name:'email',label:'Email address',type:'email',required:true},{name:'phone',label:'Phone (optional)',type:'tel'},{name:'notes',label:'Special requests',type:'textarea'}]
  return(<div>
    <h2 className="font-display text-stone text-2xl mb-1">Your details</h2>
    <p className="text-stone/50 text-sm mb-6">We'll send your confirmation to your email.</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {fields.map(f=>(<div key={f.name} className={f.half?'':'sm:col-span-2'}>
        <label className="block text-sm font-semibold text-stone mb-1.5">{f.label}{f.required&&<span className="text-red-500"> *</span>}</label>
        {f.type==='textarea'?<textarea name={f.name} value={form[f.name]||''} onChange={e=>onChange(f.name,e.target.value)} rows={3} className="w-full border border-limestone px-3 py-2 text-sm text-stone focus:outline-none focus:border-atlantic resize-none"/>
        :<input type={f.type} name={f.name} value={form[f.name]||''} onChange={e=>onChange(f.name,e.target.value)} required={f.required} className="w-full border border-limestone px-3 py-2 text-sm text-stone focus:outline-none focus:border-atlantic"/>}
      </div>))}
    </div>
  </div>)
}

function Step4Review({tourId,guests,date,guideId,form,guides,onPay,paying,error}){
  const tour=TOURS[tourId],guide=guides.find(g=>g.id===guideId)
  const total=tourId==='shared'?guests*(tour?.price||50):(tour?.price||0)
  const s=guide?.settings||guide?.defaultPayment,payOnDay=s?.when==='onday',cashOnly=s?.methods?.length===1&&s.methods[0]==='cash'
  return(<div>
    <h2 className="font-display text-stone text-2xl mb-6">Review your booking</h2>
    <div className="bg-cream border border-limestone p-6 mb-6">
      <h3 className="font-display text-stone text-lg mb-4">Booking summary</h3>
      <dl className="space-y-2 text-sm">
        {[['Tour',tour?.name],['Date',disp(date)],['Guests',tourId==='shared'?`${guests} person${guests>1?'s':''}`:`Up to ${tour?.maxPerGroup}`],['Guide',guide?.name],['Name',`${form.firstName} ${form.lastName}`],['Email',form.email],...(form.phone?[['Phone',form.phone]]:[]),...(form.notes?[['Notes',form.notes]]:[])].map(([k,v])=>(
          <div key={k} className="flex justify-between gap-4"><dt className="text-stone/50 shrink-0">{k}</dt><dd className="text-stone font-medium text-right">{v}</dd></div>
        ))}
      </dl>
      <div className="border-t border-limestone mt-4 pt-4 flex justify-between items-center">
        <span className="font-semibold text-stone">Total</span>
        <span className="font-display text-atlantic text-2xl">€{total}</span>
      </div>
    </div>
    <div className="bg-cream border border-limestone p-4 mb-6 text-sm">
      {payOnDay?(<div className="text-amber-800"><p className="font-semibold mb-1">💵 Pay on the day with {guide?.shortName}</p>
        <p className="text-amber-700 text-xs">{cashOnly?'Cash only. ':'Cash or card. '}Your booking is confirmed — {guide?.shortName} will collect payment at Kilronan Pier.</p></div>)
      :(<div className="text-stone/60"><p className="font-semibold text-stone mb-1">💳 Secure online payment</p><p className="text-xs">Powered by Stripe · Your card details never touch our servers</p></div>)}
    </div>
    <div className="bg-cream border border-limestone p-4 mb-6 text-xs text-stone/60 space-y-1">{CANCELLATION_POLICY.map((p,i)=><p key={i}>— {p}</p>)}</div>
    {error&&<div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 mb-4">{error}</div>}
    <button onClick={onPay} disabled={paying} className="btn-primary w-full text-center text-base py-4 disabled:opacity-60 disabled:cursor-wait">
      {paying?(payOnDay?'Confirming…':'Redirecting…'):payOnDay?`Confirm booking — pay €${total} on the day →`:`Pay €${total} securely now →`}
    </button>
  </div>)
}

function Sidebar({tourId,guests,date,guideId,guides}){
  const tour=TOURS[tourId],guide=guides.find(g=>g.id===guideId)
  if(!tourId)return null
  const total=tourId==='shared'?guests*(tour?.price||50):(tour?.price||0)
  return(<div className="bg-cream border border-limestone p-6 sticky top-24">
    <p className="section-label mb-3">Your selection</p>
    <div className="space-y-3 text-sm">
      {tour&&<div><p className="font-semibold text-stone">{tour.name}</p><p className="text-stone/50 text-xs mt-0.5">{tour.duration}</p></div>}
      {date&&<div className="pt-3 border-t border-limestone"><p className="text-stone/50 text-xs uppercase tracking-wide">Date</p><p className="font-semibold text-stone mt-0.5">{disp(date)}</p></div>}
      {tourId==='shared'&&guests&&<div className="pt-3 border-t border-limestone"><p className="text-stone/50 text-xs uppercase tracking-wide">Guests</p><p className="font-semibold text-stone mt-0.5">{guests} person{guests>1?'s':''}</p></div>}
      {guide&&<div className="pt-3 border-t border-limestone"><p className="text-stone/50 text-xs uppercase tracking-wide">Guide</p><p className="font-semibold text-stone mt-0.5">{guide.name}</p></div>}
      <div className="pt-3 border-t border-limestone flex justify-between items-center"><span className="text-stone/50 text-xs uppercase tracking-wide">Total</span><span className="font-display text-atlantic text-xl">€{total}</span></div>
    </div>
    <div className="mt-6 pt-4 border-t border-limestone space-y-2 text-xs text-stone/50">
      <p>📞 Questions? Call Thomas:</p>
      <a href="tel:+353852859777" className="font-semibold text-stone block hover:text-amber">+353 (0) 85 285 9777</a>
    </div>
  </div>)
}

export default function BookPage(){
  const[step,setStep]=useState(0)
  const[tourId,setTourId]=useState('shared')
  const[guests,setGuests]=useState(2)
  const[date,setDate]=useState('')
  const[guideId,setGuideId]=useState('')
  const[form,setForm]=useState({firstName:'',lastName:'',email:'',phone:'',notes:''})
  const[paying,setPaying]=useState(false)
  const[error,setError]=useState('')
  const[guides,setGuides]=useState([])
  const[loadingGuides,setLoadingGuides]=useState(false)
  const tour=TOURS[tourId]
  const upd=(k,v)=>setForm(f=>({...f,[k]:v}))
  const selGuide=guides.find(g=>g.id===guideId)
  const payOnDay=(selGuide?.settings||selGuide?.defaultPayment)?.when==='onday'

  useEffect(()=>{
    if(step!==1)return
    setLoadingGuides(true)
    fetch('/api/guides').then(r=>r.json()).then(async data=>{
      if(date){
        const yr=date.split('-')[0],mo=parseInt(date.split('-')[1])
        const withA=await Promise.all(data.map(async g=>{
          try{const av=await fetch(`/api/guides?guideId=${g.id}&year=${yr}&month=${mo}`).then(r=>r.json());return{...g,availableOnDate:av[date]!==false}}
          catch{return{...g,availableOnDate:true}}
        }))
        setGuides(withA)
      }else setGuides(data.map(g=>({...g,availableOnDate:true})))
    }).catch(()=>setGuides([])).finally(()=>setLoadingGuides(false))
  },[step,date])

  const total=tourId==='shared'?guests*(tour?.price||50):(tour?.price||0)
  const can0=tourId&&date,can1=guideId,can2=can1&&form.firstName&&form.lastName&&form.email

  const pay=async()=>{
    setError('');setPaying(true)
    try{
      const res=await fetch('/api/checkout',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({tourId,totalPrice:total,payOnDay,form:{...form,date,guests,guideId,guideName:selGuide?.name}})})
      const d=await res.json()
      if(d.url)window.location.href=d.url
      else if(d.bookingId)window.location.href=`/book/confirmed?bookingId=${d.bookingId}`
      else{setError(d.error||'Booking failed. Please try again.');setPaying(false)}
    }catch{setError('Connection error. Please try again.');setPaying(false)}
  }

  return(<div className="min-h-screen bg-cream">
    <div className="bg-atlantic text-white py-8">
      <div className="container-site">
        <Link href="/" className="text-white/60 text-sm hover:text-white mb-2 block">← Back to home</Link>
        <h1 className="font-display text-3xl">Book your tour</h1>
        <p className="text-white/70 text-sm mt-1">Inis Mór · With Thomas, Christopher or Niamh</p>
      </div>
    </div>
    <div className="container-site py-10">
      <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-start">
        <div className="bg-white border border-limestone p-6 md:p-10">
          <Steps current={step}/>
          {step===0&&<><Step1 tourId={tourId} guests={guests} date={date} onTour={id=>{setTourId(id);setDate('');setGuideId('')}} onGuests={setGuests} onDate={setDate}/>
            <button onClick={()=>setStep(1)} disabled={!can0} className="btn-primary w-full text-center mt-8 disabled:opacity-40 disabled:cursor-not-allowed">Choose your guide →</button></>}
          {step===1&&<><Step2Guide date={date} guideId={guideId} onGuide={setGuideId} guides={guides} loading={loadingGuides}/>
            <div className="flex gap-3 mt-8">
              <button onClick={()=>setStep(0)} className="btn-ghost flex-1 text-center">← Back</button>
              <button onClick={()=>setStep(2)} disabled={!can1} className="btn-primary flex-[2] text-center disabled:opacity-40 disabled:cursor-not-allowed">Enter your details →</button>
            </div></>}
          {step===2&&<><Step3Details form={form} onChange={upd}/>
            <div className="flex gap-3 mt-8">
              <button onClick={()=>setStep(1)} className="btn-ghost flex-1 text-center">← Back</button>
              <button onClick={()=>setStep(3)} disabled={!can2} className="btn-primary flex-[2] text-center disabled:opacity-40 disabled:cursor-not-allowed">Review booking →</button>
            </div></>}
          {step===3&&<><Step4Review tourId={tourId} guests={guests} date={date} guideId={guideId} form={form} guides={guides} onPay={pay} paying={paying} error={error}/>
            <button onClick={()=>setStep(2)} className="btn-ghost w-full text-center mt-3">← Edit details</button></>}
        </div>
        <Sidebar tourId={tourId} guests={guests} date={date} guideId={guideId} guides={guides}/>
      </div>
    </div>
  </div>)
}
