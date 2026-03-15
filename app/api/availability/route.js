import { getAvailability, getMonthAvailability } from '@/lib/db'

// GET /api/availability?date=2025-07-15
// GET /api/availability?year=2025&month=7
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const date = searchParams.get('date')
    const year = searchParams.get('year')
    const month = searchParams.get('month')

    if (date) {
      const result = await getAvailability(date)
      return Response.json(result)
    }

    if (year && month) {
      const result = await getMonthAvailability(int(year), parseInt(month))
      return Response.json(result)
    }

    return Response.json({ error: 'Provide ?date= or ?year=&month=' }, { status: 400 })
  } catch (err) {
    console.error('Availability error:', err)
    return Response.json({ error: 'Failed to check availability' }, { status: 500 })
  }
}
