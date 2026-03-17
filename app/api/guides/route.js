import { GUIDE_LIST } from '@/lib/guides'
import { getGuideSettings, getGuideMonthAvailability } from '@/lib/db'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const guideId = searchParams.get('guideId')
    const year    = searchParams.get('year')
    const month   = searchParams.get('month')

    if (guideId && year && month) {
      const avail = await getGuideMonthAvailability(guideId, parseInt(year), parseInt(month))
      return Response.json(avail)
    }

    const guides = await Promise.all(
      GUIDE_LIST.map(async g => {
        const settings = await getGuideSettings(g.id)
        return { ...g, settings }
      })
    )
    return Response.json(guides)
  } catch (err) {
    console.error('Guides API error:', err)
    return Response.json({ error: 'Failed to load guides' }, { status: 500 })
  }
}
