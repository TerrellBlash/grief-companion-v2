import { Header } from '@/components/ui'
import { FloatingNav } from '@/components/layout/FloatingNav'
import { CirclesList } from '@/components/circles/CirclesList'
import { getCircles } from '@/lib/services/circles'

export const dynamic = 'force-dynamic'

export default async function CommunityPage() {
  const circles = await getCircles()

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F0E8] via-[#E8E4E0] to-[#D5C6B4]/30 safe-all pb-40">
      <Header title="Community Circles" subtitle="Find your space to heal together" />
      <CirclesList circles={circles} />
      <FloatingNav />
    </div>
  )
}
