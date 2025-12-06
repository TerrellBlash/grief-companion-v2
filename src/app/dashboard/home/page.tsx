import { getDashboardData } from '@/lib/services/dashboard'
import { FloatingNav } from '@/components/layout/FloatingNav'
import { HomeContent } from '@/components/dashboard/HomeContent'

export const dynamic = 'force-dynamic' // Fetch fresh data on each request

export default async function HomePage() {
  const data = await getDashboardData()

  // Fallback for unauthenticated users - show guest experience
  if (!data) {
    const guestData = {
      displayName: 'Friend',
      currentStreak: 0,
      longestStreak: 0,
      hasCompletedTodayRitual: false,
      greetingTime: getGreetingTime(),
      greetingMessage: getGreetingMessage(),
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F5F0E8] via-[#E8E4E0] to-[#D5C6B4]/30 safe-all">
        <HomeContent data={guestData} />
        <FloatingNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F0E8] via-[#E8E4E0] to-[#D5C6B4]/30 safe-all">
      <HomeContent data={data} />
      <FloatingNav />
    </div>
  )
}

// Helper functions for guest experience
function getGreetingTime(): string {
  const hour = new Date().getHours()
  const day = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()
  let period = 'MORNING'
  if (hour >= 12 && hour < 17) period = 'AFTERNOON'
  else if (hour >= 17 && hour < 21) period = 'EVENING'
  else if (hour >= 21 || hour < 5) period = 'NIGHT'
  return `${day} ${period}`
}

function getGreetingMessage(): string {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return 'Good morning'
  if (hour >= 12 && hour < 17) return 'Good afternoon'
  if (hour >= 17 && hour < 21) return 'Good evening'
  return 'Rest easy'
}
