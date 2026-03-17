import Redis from 'ioredis'
import { OPERATING_SEASON } from './tours'

let _client=null
function getClient(){
  if(!_client){
    _client=new Redis(process.env.REDIS_URL,{tls:process.env.REDIS_URL?.includes('rediss://')?{rejectUnauthorized:false}:undefined,maxRetriesPerRequest:3})
    _client.on('error',err=>console.error('Redis error:',err))
  }
  return _client
}

export function generateBookingId(){return`APT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2,6).toUpperCase()}`}

async function rSet(k,v){return getClient().set(k,JSON.stringify(v))}
async function rGet(k){const v=await getClient().get(k);return v?JSON.parse(v):null}
async function rDel(k){return getClient().del(k)}

export async function saveBooking(booking){
  const rc=getClient(),id=booking.id||generateBookingId(),record={...booking,id,createdAt:booking.createdAt||Date.now()}
  await Promise.all([rc.set(`booking:${id}`,JSON.stringify(record)),rc.sadd(`bookings:date:${booking.date}`,id),rc.zadd('bookings:all',record.createdAt,id)])
  return record
}
export async function getBooking(id){const raw=await getClient().get(`booking:${id}`);return raw?JSON.parse(raw):null}
export async function getBookingsForDate(date){const rc=getClient(),ids=await rc.smembers(`bookings:date:${date}`);if(!ids?.length)return[];const r=await Promise.all(ids.map(id=>rc.get(`booking:${id}`)));return r.filter(Boolean).map(x=>JSON.parse(x))}
export async function getAllBookings({limit=100}={}){const rc=getClient(),ids=await rc.zrevrange('bookings:all',0,limit-1);if(!ids?.length)return[];const r=await Promise.all(ids.map(id=>rc.get(`booking:${id}`)));return r.filter(Boolean).map(x=>JSON.parse(x))}

export async function getAvailability(date){
  const rc=getClient(),m=new Date(date+'T12:00:00').getMonth()+1
  if(m<OPERATING_SEASON.start||m>OPERATING_SEASON.end)return{available:false,reason:'out_of_season'}
  const overrideRaw=await rc.get(`availability:${date}`)
  if(overrideRaw){const o=JSON.parse(overrideRaw);if(o.closed)return{available:false,reason:'closed',note:o.note}}
  const bookings=await getBookingsForDate(date),confirmed=bookings.filter(b=>b.status==='confirmed'||b.status==='paid')
  const sharedGuests=confirmed.filter(b=>b.tourId==='shared').reduce((s,b)=>s+(b.guests||1),0)
  const privateBooked=confirmed.some(b=>b.tourId!=='shared'),CAP=12
  return{available:sharedGuests<CAP||!privateBooked,date,shared:{booked:sharedGuests,capacity:CAP,available:sharedGuests<CAP,spotsLeft:CAP-sharedGuests},private:{booked:privateBooked,available:!privateBooked}}
}

export async function getMonthAvailability(year,month){
  const dim=new Date(year,month,0).getDate()
  const dates=Array.from({length:dim},(_,i)=>`${year}-${String(month).padStart(2,'0')}-${String(i+1).padStart(2,'0')}`)
  const results=await Promise.all(dates.map(getAvailability))
  return Object.fromEntries(dates.map((d,i)=>[d,results[i]]))
}

export async function setDateAvailability(date,{closed,note=''}){
  const rc=getClient()
  if(closed)await rc.set(`availability:${date}`,JSON.stringify({closed:true,note}))
  else await rc.del(`availability:${date}`)
}

export async function updateBookingStatus(id,status){
  const booking=await getBooking(id);if(!booking)return null
  const updated={...booking,status,updatedAt:Date.now()}
  await getClient().set(`booking:${id}`,JSON.stringify(updated));return updated
}

export async function getBookingStats(){
  const all=await getAllBookings({limit:1000}),confirmed=all.filter(b=>b.status==='paid'||b.status==='confirmed')
  const byTour={};confirmed.forEach(b=>{byTour[b.tourId]=(byTour[b.tourId]||0)+1})
  return{totalBookings:confirmed.length,totalRevenue:confirmed.reduce((s,b)=>s+(b.totalPrice||0),0),totalGuests:confirmed.reduce((s,b)=>s+(b.guests||1),0),byTour}
}

// ── Guide functions ───────────────────────────────────────────
export async function getGuideSettings(guideId){
  const {GUIDES}=await import('./guides.js')
  const guide=GUIDES[guideId];if(!guide)return null
  const saved=await rGet(`guide:${guideId}:settings`)
  return saved||guide.defaultPayment
}
export async function saveGuideSettings(guideId,settings){await rSet(`guide:${guideId}:settings`,settings);return settings}

export async function getGuideSchedule(guideId){return(await rGet(`guide:${guideId}:schedule`))||{}}

export async function setGuideDayAvailability(guideId,date,available=true,note=''){
  const schedule=await getGuideSchedule(guideId)
  if(available){delete schedule[date]}else{schedule[date]={available:false,note}}
  await rSet(`guide:${guideId}:schedule`,schedule);return schedule
}

export async function isGuideAvailableOnDate(guideId,date){
  const m=new Date(date+'T12:00:00').getMonth()+1
  if(m<OPERATING_SEASON.start||m>OPERATING_SEASON.end)return false
  const schedule=await getGuideSchedule(guideId)
  if(schedule[date]&&schedule[date].available===false)return false
  return true
}

export async function getGuideMonthAvailability(guideId,year,month){
  const dim=new Date(year,month,0).getDate()
  const dates=Array.from({length:dim},(_,i)=>`${year}-${String(month).padStart(2,'0')}-${String(i+1).padStart(2,'0')}`)
  const results=await Promise.all(dates.map(d=>isGuideAvailableOnDate(guideId,d)))
  return Object.fromEntries(dates.map((d,i)=>[d,results[i]]))
}
