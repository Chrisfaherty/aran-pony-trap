import { getAllBookings, getBooking, getBookingsForDate, getBookingStats } from '@/lib/db'
function isAdmin(req) { return req.headers.get('x-admin-key') === process.env.ADMIN_SECRET_KEY }
export async function GET(req) {
  if (!isAdmin(req)) return Response.json({ error: 'Unauthorised' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id'), date = searchParams.get('date'), stats = searchParams.get('stats')
  const limit = parseInt(searchParams.get('limit') || '100')
  try {
    if (stats) return Response.json(await getBookingStats())
    if (id) { const b = await getBooking(id); return b ? Response.json(b) : Response.json({ error: 'Not found' }, { status: 404 }) }
    if (date) return Response.json(await getBookingsForDate(date))
    return Response.json(await getAllBookings({ limit }))
  } catch (err) {
    console.error('Bookings API error:', err)
    return Response.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}
