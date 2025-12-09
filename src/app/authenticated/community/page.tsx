import { Header } from '@/components/ui'
import { FloatingNav } from '@/components/layout/FloatingNav'
import { CirclesList } from '@/components/circles/CirclesList'
import { getCircles } from '@/lib/services/circles'

export const dynamic = 'force-dynamic'

export default async function CommunityPage() {
  const circles = await getCircles()

  return (
    <div className="min-h-screen aurora-bg relative safe-all pb-40">
      <div className="absolute inset-0 noise-texture pointer-events-none z-0 mix-blend-overlay" />
      <Header title="Community Circles" subtitle="Find your space to heal together" />
      <CirclesList circles={circles} />
      <FloatingNav />
    </div>
  )
}
