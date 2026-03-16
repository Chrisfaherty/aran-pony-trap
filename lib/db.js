// DATABASE — Upstash Redis REST API (no package needed)
// Uses KV_REST_API_URL and KV_REST_API_TOKEN
import { OPERATING_SEASON } from './tours'

async function redis(cmd, ...args) {
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!url || !token) throw new Error('KV_REST_API_URL / KV_REST_API_TOKEN not set')
  const res = await fetch(`${url}/${[cmd, ...args].map(encodeURIComponent).join('/')}`, {
    headers: { Authorization: `Bearer ${token}` }, cache: 'no-store',
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.result
}

async function rSet(k, v) { return redis('SET', k, JSON.stringify(v)) }
async function rGet(k) { const v = await redis('GET', k); return v ? JSON.parse(v) : null }
async function rDel(k) { return redis('DEL', k) }
async function rSadd(k, ...m) { return redis('SADD', k, ...m) }
async function rSmembers(k) { return await redis('SMEMBERS', k) || [] }
async function rZadd(k, score, member) { return redis('ZADD', k, String(score), member) }
async function rZrange(k, s, e, rev=false) {
  return rev ? redis('ZREVRANGE', k, String(s), String(e)) : redis('ZRANGE', k, String(s), String(e))
}

export function generateBookingId() {
  return `APT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2,6).toUpperCase()}`
}

export async function saveBooking(booking) {
  const id = booking.id || generateBookingId()
  const record = { ...booking, id, createdAt: booking.createdAt || Date.now() }
  await Promise.all([rSet(`booking:${id}`, record), rSadd(`bookings:date:${booking.date}`, id), rZadd('bookings:all', record.createdAt, id)])
  return record
}

export async function getBooking(id) { return rGet(`booking:${id}`) }

export async function getBookingsForDate(date) {
  const ids = await rSmembers(`bookings:date:${date}`)
  if (!ids?.length) return []
  return (await Promise.all(ids.map(id => rGet(`booking:${id}`)))).filter(Boolean)
}

export async function getAllBookings({ limit = 100 } = {}) {
  const ids = await rZrange('bookings:all', 0, limit - 1, true)
  if (!ids?.length) return []
  return (await Promise.all(ids.map(id => rGet(`booking:${id}`)))).filter(Boolean)
}

export async function getAvailability(date) {
  const m = new Date(date + 'T12:00:00').getMonth() + 1
  if (m < OPERATING_SEASON.start || m > OPERATING_SEASON.end) return { available: false, reason: 'out_of_season' }
  const override = await rGet(`availability:${date}`)
  if (override?.closed) return { available: false, reason: 'closed', note: override.note }
  const bookings = await getBookingsForDate(date)
  const confirmed = bookings.filter(b => b.status === 'confirmed' || b.status === 'paid')
  const sharedGuests = confirmed.filter(b => b.tourId === 'shared').reduce((s,b) => s+(b.guests||1), 0)
  const privateBooked = confirmed.some(b => b.tourId !== 'shared')
  const CAP = 12
  return {
    available: sharedGuests < CAP || !privateBooked, date,
    shared: { booked: sharedGuests, capacity: CAP, available: sharedGuests < CAP, spotsLeft: CAP - sharedGuests },
    private: { booked: privateBooked, available: !privateBooked },
  }
}

export async function getMonthAvailability(year, month) {
  const dim = new Date(year, month, 0).getDate()
  const dates = Array.from({length:dim}, (_,i) => `${year}-${String(month).padStart(2,'0')}-${String(i+1).padStart(2,'0')}`)
  const results = await Promise.all(dates.map(getAvailability))
  return Object.fromEntries(dates.map((d,i) => [d, results[i]]))
}

export async function setDateAvailability(date, { closed, note='' }) {
  if (closed) await rSet(`availability:${date}`, { closed: true, note })
  else await rDel(`availability:${date}`)
}

export async function updateBookingStatus(id, status) {
  const booking = await getBooking(id)
  if (!booking) return null
  const updated = { ...booking, status, updatedAt: Date.now() }
  await rSet(`booking:${id}`, updated)
  return updated
}

export async function getBookingStats() {
  const all = await getAllBookings({ limit: 1000 })
  const confirmed = all.filter(b => b.status === 'paid' || b.status === 'confirmed')
  const byTour = {}
  confirmed.forEach(b => { byTour[b.tourId] = (byTour[b.tourId]||0) + 1 })
  return {
    totalBookings: confirmed.length,
    totalRevenue: confirmed.reduce((s,b) => s+(b.totalPrice||0), 0),
    totalGuests: confirmed.reduce((s,b) => s+(b.guests||1), 0),
    byTour,
  }
}
