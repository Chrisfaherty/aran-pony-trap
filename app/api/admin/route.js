import { setDateAvailability, getAvailability, updateBookingStatus } from '@/lib/db'

function isAdmin(req) {
  const auth = req.headers.get('x-admin-key')
  return auth === process.env.ADMIN_SECRET_KEY
}

// POST /api/admin -- block or unblock a date
export async function POST(req) {
  if (!isAdmin(req)) {
    return Response.json({ error: 'Unauthorised' }, { status: 401 })
  }

  try {
    const { date, closed, note } = await req.json()
    if (!date) return Response.json({ error: 'date required' }, { status: 400 })

    await setDateAvailability(date, { closed: !!closed, note: note || '' })
    const availability = await getAvailability(date)
    return Response.json({ success: true, availability })
  } catch (err) {
    console.error('Admin availability error:', err)
    return Response.json({ error: 'Failed to update availability' }, { status: 500 })
  }
}

// PATCH /api/admin -- update a booking status
export async function PATCH(req) {
  if (!isAdmin(req)) {
    return Response.json({ error: 'Unauthorised' }, { status: 401 })
  }

  try {
    const { bookingId, status } = await req.json()
    if (!bookingId || !status) {
      return Response.json({ error: 'bookingId and status required' }, { status: 400 })
    }

    const updated = await updateBookingStatus(bookingId, status)
    if (!updated) return Response.json({ error: 'Booking not found' }, { status: 404 })

    return Response.json({ success: true, booking: updated })
  } catch (err) {
    console.error('Admin update error:', err)
    return Response.json({ error: 'Failed to update booking' }, { status: 500 })
  }
}
