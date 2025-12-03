import { getDashboardData } from '@/lib/services/dashboard'
import { Header } from '@/components/ui'
import { FloatingNav } from '@/components/layout/FloatingNav'
import { HomeContent } from '@/components/dashboard/HomeContent'

export const dynamic = 'force-dynamic' // Fetch fresh data on each request

export default async function HomePage() {
  const data = await getDashboardData()

  // Fallback for unauthenticated users
  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-sand/30 safe-all pb-40">
        <Header
          title="Grief Companion"
          subtitle="A space for remembering"
        />

        <div className="px-6 py-8 max-w-2xl mx-auto">
          <div className="glass-regular rounded-2xl p-6 mb-4">
            <p className="text-body text-martinique">
              Please log in to view your dashboard.
            </p>
          </div>
        </div>

        <FloatingNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sand/30 safe-all pb-40">
      <Header title="Grief Companion" />

      <HomeContent data={data} />

      <FloatingNav />
    </div>
  )
}
