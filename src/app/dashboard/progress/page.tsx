import { Header } from '@/components/ui'
import { FloatingNav } from '@/components/layout/FloatingNav'
import { StreakContent } from '@/components/dashboard/StreakContent'
import { getStreakData } from '@/lib/services/streaks'

export const dynamic = 'force-dynamic'

export default async function ProgressPage() {
  const data = await getStreakData()

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F0E8] via-[#E8E4E0] to-[#D5C6B4]/30 safe-all">
      <Header title="Ritual Streak" onBack="/dashboard/home" />
      <StreakContent data={data} />
      <FloatingNav />
    </div>
  )
}
