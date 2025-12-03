import { Header } from '@/components/ui'
import { FloatingNav } from '@/components/layout/FloatingNav'
import { StreakContent } from '@/components/dashboard/StreakContent'
import { getStreakData } from '@/lib/services/streaks'

export const dynamic = 'force-dynamic'

export default async function ProgressPage() {
  const data = await getStreakData()

  return (
    <div className="relative">
      <Header title="Ritual Streak" />
      <StreakContent data={data} />
      <FloatingNav />
    </div>
  )
}
