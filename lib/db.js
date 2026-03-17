import Redis from 'ioredis'
import { OPERATING_SEASON } from './tours'

// ── Redis client ──────────────────────────────────────────────
let _client = null
function getClient() {
  if (!_client) {
    _client = new Redis(process.env.REDIS_URL, {
      tls: process.env.REDIS_URL?.includes('rediss://') ? { rejectUnauthorized: false } : undefined,
      maxRetriesPerRequest: 3,
      lazyConnect: false,
    })
    _client.on('error', err => console.error('Redis error:', err))
  }
  return _client
}

// ── Booking ID ────────────────────────────────────────────────
export function generateBookingId() {
  return `APT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2,6).toUpperCase()}`
}

// ── Save booking ──────────────────────────────────────────────
export async function saveBooking(booking) {
  const rc = getClient()
  const id = booking.id || generateBookingId()
  const record = { ...booking, id, createdAt: booking.createdAt || Date.now() }
  await Promise.all([
    rc.set(`booking:${id}`, JSON.stringify(record)),
    rc.sadd(`bookings:date:${booking.date}`, id),
    rc.zadd('bookings:all', record.createdAt, id),
  ])
  return record
}

// ── Get single booking ────────────────────────────────────────
export async function getBooking(id) {
  const raw = await getClient().get(`booking:${id}`)
  return raw ? JSON.parse(raw) : null
}

// ── Get bookings for a date ───────────────────────────────────
export async function getBookingsForDate(date) {
  const rc = getClient()
  const ids = await rc.smembers(`bookings:date:${date}`)
  if (!ids?.length) return []
  const records = await Promise.all(ids.map(id => rc.get(`booking:${id}`)))
  return records.filter(Boolean).map(r => JSON.parse(r))
}

// ── Get all bookings (admin) ──────────────────────────────────
export async function getAllBookings({ limit = 100 } = {}) {
  const rc = getClient()
  const ids = await rc.zrevrange('bookings:all', 0, limit - 1)
  if (!ids?.length) return []
  const records = await Promise.all(ids.map(id => rc.get(`booking:${id}`)))
  return records.filter(Boolean).map(r => JSON.parse(r))
}

// ── Check availability for a date ────────────────────────────
export async function getAvailability(date) {
  const rc = getClient()
  const m = new Date(date + 'T12:00:00').getMonth() + 1
  if (m < OPERATING_SEASON.start || m > OPERATING_SEASON.end) return { available: false, reason: 'out_of_season' }
  const overrideRaw = await rc.get(`availability:${date}`)
  if (overrideRaw) {
    const override = JSON.parse(overrideRaw)
    if (override.closed) return { available: false, reason: 'closed', note: override.note }
  }
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

// ── Get availability for a whole month ───────────────────────
export async function getMonthAvailability(year, month) {
  const dim = new Date(year, month, 0).getDate()
  const dates = Array.from({length:dim}, (_,i) => `${year}-${String(month).padStart(2,'0')}-${String(i+1).padStart(2,'0')}`)
  const results = await Promise.all(dates.map(getAvailability))
  return Object.fromEntries(dates.map((d,i) => [d, results[i]]))
}

// ── Block / unblock a date ────────────────────────────────────
export async function setDateAvailability(date, { closed, note='' }) {
  const rc = getClient()
  if (closed) await rc.set(`availability:${date}`, JSON.stringify({ closed: true, note }))
  else await rc.del(`availability:${date}`)
}

// ── Update booking status ─────────────────────────────────────
export async function updateBookingStatus(id, status) {
  const booking = await getBooking(id)
  if (!booking) return null
  const updated = { ...booking, status, updatedAt: Date.now() }
  await getClient().set(`booking:${id}`, JSON.stringify(updated))
  return updated
}

// ── Get booking stats ─────────────────────────────────────────
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
