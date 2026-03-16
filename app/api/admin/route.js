import { setDateAvailability, getAvailability, updateBookingStatus } from '@/lib/db'
function isAdmin(req) { return req.headers.get('x-admin-key') === process.env.ADMIN_SECRET_KEY }
export async function POST(req) {
  if (!isAdmin(req)) return Response.json({ error: 'Unauthorised' }, { status: 401 })
  try {
    const { date, closed, note } = await req.json()
    if (!date) return Response.json({ error: 'date required' }, { status: 400 })
    await setDateAvailability(date, { closed: !!closed, note: note || '' })
    return Response.json({ success: true, availability: await getAvailability(date) })
  } catch (err) {
    return Response.json({ error: 'Failed to update availability' }, { status: 500 })
  }
}
export async function PATCH(req) {
  if (!isAdmin(req)) return Response.json({ error: 'Unauthorised' }, { status: 401 })
  try {
    const { bookingId, status } = await req.json()
    if (!bookingId || !status) return Response.json({ error: 'bookingId and status required' }, { status: 400 })
    const updated = await updateBookingStatus(bookingId, status)
    if (!updated) return Response.json({ error: 'Booking not found' }, { status: 404 })
    return Response.json({ success: true, booking: updated })
  } catch (err) {
    return Response.json({ error: 'Failed to update booking' }, { status: 500 })
  }
}
