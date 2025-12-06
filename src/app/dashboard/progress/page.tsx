import { getStreakData } from '@/lib/services/streaks'
import { ProgressPageClient } from './ProgressPageClient'

export const dynamic = 'force-dynamic'

export default async function ProgressPage() {
  const data = await getStreakData()

  return <ProgressPageClient data={data} />
}
