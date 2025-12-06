import { createClient } from '@/lib/supabase/server'

export interface StreakData {
  currentStreak: number
  longestStreak: number
  totalSessions: number
  completedDates: string[]
}

const DEFAULT_STREAK_DATA: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  totalSessions: 0,
  completedDates: [],
}

export async function getStreakData(): Promise<StreakData> {
  try {
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      // Return default data for unauthenticated users
      return DEFAULT_STREAK_DATA
    }

    // Fetch streak data
    const { data: streakData, error: streakError } = await supabase
      .from('streaks')
      .select('current_streak, longest_streak')
      .eq('user_id', user.id)
      .single()

    if (streakError && streakError.code !== 'PGRST116') {
      console.error('Streak fetch error:', streakError)
      return DEFAULT_STREAK_DATA
    }

    // Fetch ritual completions for this user to get completed dates
    const { data: completions, error: completionsError } = await supabase
      .from('ritual_completions')
      .select('completed_at')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false })

    if (completionsError) {
      console.error('Completions fetch error:', completionsError)
      return {
        currentStreak: streakData?.current_streak ?? 0,
        longestStreak: streakData?.longest_streak ?? 0,
        totalSessions: 0,
        completedDates: [],
      }
    }

    // Extract unique dates from completions
    const completedDates = Array.from(
      new Set(
        (completions || []).map((c) => c.completed_at.split('T')[0])
      )
    ).sort()

    return {
      currentStreak: streakData?.current_streak ?? 0,
      longestStreak: streakData?.longest_streak ?? 0,
      totalSessions: completions?.length ?? 0,
      completedDates,
    }
  } catch (error) {
    console.error('getStreakData error:', error)
    return DEFAULT_STREAK_DATA
  }
}
