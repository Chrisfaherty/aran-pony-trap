import { getAllBookings, getBooking, getBookingsForDate, getBookingStats } from '@/lib/db'

function isAdmin(req) {
  const auth = req.headers.get('x-admin-key')
  return auth === process.env.ADMIN_SECRET_KEY
}

// GET /api/bookings  (admin only)
// GET /api/bookings?date=2025-07-15  (admin only)
// GET /api/bookings?id=APT-XXX  (admin only)
// GET /api/bookings?stats=1  (admin only)
export async function GET(req) {
  if (!isAdmin(req)) {
    return Response.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const date = searchParams.get('date')
  const stats = searchParams.get('stats')
  const limit = parseInt(searchParams.get('limit') || '100')

  try {
    if (stats) {
      const result = await getBookingStats()
      return Response.json(result)
    }

    if (id) {
      const booking = await getBooking(id)
      if (!booking) return Response.json({ error: 'Not found' }, { status: 404 })
      return Response.json(booking)
    }

    if (date) {
      const bookings = await getBookingsForDate(date)
      return Response.json(bookings)
    }

    const bookings = await getAllBookings({ limit })
    return Response.json(bookings)

  } catch (err) {
    console.error('Bookings API error:', err)
    return Response.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}
