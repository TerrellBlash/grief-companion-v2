import { Header } from '@/components/ui'
import { FloatingNav } from '@/components/layout/FloatingNav'
import { CirclesList } from '@/components/circles/CirclesList'
import { getCircles } from '@/lib/services/circles'

export const dynamic = 'force-dynamic'

export default async function CommunityPage() {
  const circles = await getCircles()

  return (
    <div className="relative">
      <Header title="Community Circles" subtitle="Find your space to heal together" />
      <CirclesList circles={circles} />
      <FloatingNav />
    </div>
  )
}
