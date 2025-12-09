import FloatingNav from '@/components/shared/FloatingNav'
import HomeContent from '@/components/dashboard/HomeContent'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <div className="min-h-screen safe-all">
      <HomeContent />
      <FloatingNav />
    </div>
  )
}
