'use client'

import { useRouter } from 'next/navigation'
import { Header } from '@/components/ui'
import { FloatingNav } from '@/components/layout/FloatingNav'
import { StreakContent } from '@/components/dashboard/StreakContent'
import type { StreakData } from '@/lib/services/streaks'

interface ProgressPageClientProps {
  data: StreakData
}

export function ProgressPageClient({ data }: ProgressPageClientProps) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F0E8] via-[#E8E4E0] to-[#D5C6B4]/30 safe-all">
      <Header title="Ritual Streak" onBack={() => router.back()} />
      <StreakContent data={data} />
      <FloatingNav />
    </div>
  )
}
