import { getAvailability, getMonthAvailability } from '@/lib/db'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const date = searchParams.get('date')
    const year = searchParams.get('year')
    const month = searchParams.get('month')
    if (date) return Response.json(await getAvailability(date))
    if (year && month) return Response.json(await getMonthAvailability(parseInt(year), parseInt(month)))
    return Response.json({ error: 'Provide ?date= or ?year=&month=' }, { status: 400 })
  } catch (err) {
    console.error('Availability error:', err)
    return Response.json({ error: 'Failed to check availability' }, { status: 500 })
  }
}
