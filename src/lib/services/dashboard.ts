import { createClient } from '@/lib/supabase/server'

export interface DashboardData {
  displayName: string
  lovedOneName?: string
  currentStreak: number
  longestStreak: number
  hasCompletedTodayRitual: boolean
  greetingTime: string
  greetingMessage: string
}

/**
 * Fetches dashboard data for the authenticated user
 * This runs on the server to ensure data is fresh and secure
 */
export async function getDashboardData(): Promise<DashboardData | null> {
  try {
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      console.error('Auth error:', authError)
      return null
    }

    // Fetch user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('display_name, loved_one_name')
      .eq('id', user.id)
      .single()

    if (profileError) {
      console.error('Profile fetch error:', profileError)
      return null
    }

    // Fetch current streak
    const { data: streakData, error: streakError } = await supabase
      .from('streaks')
      .select('current_streak, longest_streak')
      .eq('user_id', user.id)
      .single()

    if (streakError && streakError.code !== 'PGRST116') {
      // PGRST116 = no rows returned, which is ok for new users
      console.error('Streak fetch error:', streakError)
    }

    // Check if ritual was completed today
    const today = new Date().toISOString().split('T')[0]
    const { data: ritualData, error: ritualError } = await supabase
      .from('ritual_completions')
      .select('id')
      .eq('user_id', user.id)
      .eq('ritual_type', 'candle')
      .gte('completed_at', `${today}T00:00:00`)
      .lte('completed_at', `${today}T23:59:59`)
      .single()

    if (ritualError && ritualError.code !== 'PGRST116') {
      console.error('Ritual fetch error:', ritualError)
    }

    // Calculate greeting based on current time
    const hour = new Date().getHours()
    let greetingMessage = 'Rest easy'
    if (hour >= 5 && hour < 12) greetingMessage = 'Good morning'
    else if (hour >= 12 && hour < 17) greetingMessage = 'Good afternoon'
    else if (hour >= 17 && hour < 21) greetingMessage = 'Good evening'

    // Format day and time
    const day = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()
    let period = 'MORNING'
    if (hour >= 12 && hour < 17) period = 'AFTERNOON'
    else if (hour >= 17 && hour < 21) period = 'EVENING'
    else if (hour >= 21 || hour < 5) period = 'NIGHT'
    const greetingTime = `${day} ${period}`

    return {
      displayName: profile?.display_name || user.email?.split('@')[0] || 'Friend',
      lovedOneName: profile?.loved_one_name,
      currentStreak: streakData?.current_streak || 0,
      longestStreak: streakData?.longest_streak || 0,
      hasCompletedTodayRitual: !!ritualData,
      greetingTime,
      greetingMessage,
    }
  } catch (error) {
    console.error('Dashboard data fetch error:', error)
    return null
  }
}
