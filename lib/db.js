// ============================================================
// DATABASE — Vercel KV (Redis) helpers
// Keys:
//   booking:{id}           — individual booking record
//   bookings:date:{date}   — set of booking IDs for a date
//   bookings:all           — sorted set of all booking IDs (score = timestamp)
//   availability:{date}    — overrides (e.g. "closed" or custom capacity)
// ============================================================

import { kv } from '@vercel/kv'
import { TOURS, OPERATING_SEASON } from './tours'

// ── Booking ID ───────────────────────────────────────────────
export function generateBookingId() {
  const ts = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `APT-${ts}-${rand}`   // e.g. APT-LZQK4XY7-K3M2
}

// ── Save a booking (called from webhook after payment confirmed) ──
export async function saveBooking(booking) {
  const id = booking.id || generateBookingId()
  const record = { ...booking, id, createdAt: booking.createdAt || Date.now() }

  await Promise.all([
    // Store the full record
    kv.set(`booking:${id}`, JSON.stringify(record)),
    // Index by date
    kv.sadd(`bookings:date:${booking.date}`, id),
    // Global sorted set (score = timestamp for ordering)
    kv.zadd('bookings:all', { score: record.createdAt, member: id }),
  ])

  return record
}

// ── Get single booking ────────────────────────────────────────
export async function getBooking(id) {
  const raw = await kv.get(`booking:${id}`)
  return raw ? JSON.parse(raw) : null
}

// ── Get all bookings for a date ───────────────────────────────
export async function getBookingsForDate(date) {
  const ids = await kv.smembers(`bookings:date:${date}`)
  if (!ids || ids.length === 0) return []
  const records = await Promise.all(ids.map(id => kv.get(`booking:${id}`)))
  return records.filter(Boolean).map(r => JSON.parse(r))
}

// ── Get recent bookings (for admin dashboard) ─────────────────
export async function getAllBookings({ limit = 100, offset = 0 } = {}) {
  // Get IDs in reverse chronological order
  const ids = await kv.zrange('bookings:all', 0, limit - 1, { rev: true, offset })
  if (!ids || ids.length === 0) return []
  const records = await Promise.all(ids.map(id => kv.get(`booking:${id}`)))
  return records.filter(Boolean).map(r => JSON.parse(r))
}

// ── Check availability for a date ────────────────────────────
// Returns: { available: bool, shared: { booked, capacity }, private: { booked } }
export async function getAvailability(date) {
  const dateObj = new Date(date + 'T12:00:00')
  const month = dateObj.getMonth() + 1

  // Outside operating season
  if (month < OPERATING_SEASON.start || month > OPERATING_SEASON.end) {
    return { available: false, reason: 'out_of_season' }
  }

  // Check for manual override (Thomas can block days)
  const override = await kv.get(`availability:${date}`)
  if (override) {
    const parsed = JSON.parse(override)
    if (parsed.closed) return { available: false, reason: 'closed', note: parsed.note }
  }

  // Get existing bookings for this date
  const bookings = await getBookingsForDate(date)
  const confirmed = bookings.filter(b => b.status === 'confirmed' || b.status === 'paid')

  // Count shared tour guests
  const sharedBookings = confirmed.filter(b => b.tourId === 'shared')
  const sharedGuests = sharedBookings.reduce((sum, b) => sum + (b.guests || 1), 0)
  const SHARED_CAPACITY = 12

  // Count private bookings (each blocks the whole day for that slot)
  const privateBookings = confirmed.filter(b => b.tourId !== 'shared')

  // Determine what's still available
  const sharedAvailable = sharedGuests < SHARED_CAPACITY
  const privateAvailable = privateBookings.length === 0 // Only 1 private tour per day

  return {
    available: sharedAvailable || privateAvailable,
    date,
    shared: {
      booked: sharedGuests,
      capacity: SHARED_CAPACITY,
      available: sharedAvailable,
      spotsLeft: SHARED_CAPACITY - sharedGuests,
    },
    private: {
      booked: privateBookings.length > 0,
      available: privateAvailable,
    },
  }
}

// ── Get availability for a whole month ───────────────────────
export async function getMonthAvailability(year, month) {
  const daysInMonth = new Date(year, month, 0).getDate()
  const dates = []
  for (let d = 1; d <= daysInMonth; d++) {
    const mm = String(month).padStart(2, '0')
    const dd = String(d).padStart(2, '0')
    dates.push(`${year}-${mm}-${dd}`)
  }

  const results = await Promise.all(dates.map(date => getAvailability(date)))
  const map = {}
  dates.forEach((date, i) => { map[date] = results[i] })
  return map
}

// ── Block / unblock a date (admin) ────────────────────────────
export async function setDateAvailability(date, { closed, note = '' }) {
  if (closed) {
    await kv.set(`availability:${date}`, JSON.stringify({ closed: true, note }))
  } else {
    await kv.del(`availability:${date}`)
  }
}

// ── Update booking status ─────────────────────────────────────
export async function updateBookingStatus(id, status) {
  const booking = await getBooking(id)
  if (!booking) return null
  const updated = { ...booking, status, updatedAt: Date.now() }
  await kv.set(`booking:${id}`, JSON.stringify(updated))
  return updated
}

// ── Get booking stats (for admin) ────────────────────────────
export async function getBookingStats() {
  const allBookings = await getAllBookings({ limit: 1000 })
  const confirmed = allBookings.filter(b => b.status === 'paid' || b.status === 'confirmed')

  const totalRevenue = confirmed.reduce((sum, b) => sum + (b.totalPrice || 0), 0)
  const totalGuests = confirmed.reduce((sum, b) => sum + (b.guests || 1), 0)

  const byTour = {}
  confirmed.forEach(b => {
    byTour[b.tourId] = (byTour[b.tourId] || 0) + 1
  })

  return {
    totalBookings: confirmed.length,
    totalRevenue,
    totalGuests,
    byTour,
  }
}
