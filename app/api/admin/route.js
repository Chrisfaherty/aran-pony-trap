import { setDateAvailability, getAvailability, updateBookingStatus, saveGuideSettings, setGuideDayAvailability, getGuideSettings, getGuideSchedule } from '@/lib/db'

function isAdmin(req) { return req.headers.get('x-admin-key') === process.env.ADMIN_SECRET_KEY }

export async function POST(req) {
  if (!isAdmin(req)) return Response.json({ error: 'Unauthorised' }, { status: 401 })
  try {
    const body = await req.json()
    if (body.guideId && body.date !== undefined) {
      const schedule = await setGuideDayAvailability(body.guideId, body.date, body.available !== false, body.note || '')
      return Response.json({ success: true, schedule })
    }
    if (!body.date) return Response.json({ error: 'date required' }, { status: 400 })
    await setDateAvailability(body.date, { closed: !!body.closed, note: body.note || '' })
    return Response.json({ success: true, availability: await getAvailability(body.date) })
  } catch (err) { return Response.json({ error: 'Failed to update' }, { status: 500 }) }
}

export async function PATCH(req) {
  if (!isAdmin(req)) return Response.json({ error: 'Unauthorised' }, { status: 401 })
  try {
    const body = await req.json()
    if (body.guideId && body.settings) {
      const saved = await saveGuideSettings(body.guideId, body.settings)
      return Response.json({ success: true, settings: saved })
    }
    if (!body.bookingId || !body.status) return Response.json({ error: 'bookingId and status required' }, { status: 400 })
    const updated = await updateBookingStatus(body.bookingId, body.status)
    if (!updated) return Response.json({ error: 'Booking not found' }, { status: 404 })
    return Response.json({ success: true, booking: updated })
  } catch (err) { return Response.json({ error: 'Failed to update' }, { status: 500 }) }
}

export async function GET(req) {
  if (!isAdmin(req)) return Response.json({ error: 'Unauthorised' }, { status: 401 })
  try {
    const { searchParams } = new URL(req.url)
    const guideId = searchParams.get('guideId')
    if (guideId) {
      const [settings, schedule] = await Promise.all([getGuideSettings(guideId), getGuideSchedule(guideId)])
      return Response.json({ settings, schedule })
    }
    return Response.json({ error: 'guideId required' }, { status: 400 })
  } catch (err) { return Response.json({ error: 'Failed to get guide data' }, { status: 500 }) }
}
