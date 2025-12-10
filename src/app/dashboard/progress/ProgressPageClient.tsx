'use client'

import { useRouter } from 'next/navigation'
import { Header } from '@/components/ui'
import { StreakContent } from '@/components/dashboard/StreakContent'
import type { StreakData } from '@/lib/services/streaks'

interface ProgressPageClientProps {
  data: StreakData
}

export function ProgressPageClient({ data }: ProgressPageClientProps) {
  const router = useRouter()

  return (
    <div className="aurora-bg relative transition-colors duration-500" style={{ paddingBottom: '160px', minHeight: '100%' }}>
      <div className="absolute inset-0 noise-texture pointer-events-none z-0 mix-blend-overlay" />
      <Header title="Ritual Streak" onBack={() => router.back()} />
      <StreakContent data={data} />
    </div>
  )
}
