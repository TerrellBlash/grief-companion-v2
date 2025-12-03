import { createClient } from '@/lib/supabase/server'

export interface StreakData {
  currentStreak: number
  longestStreak: number
  totalSessions: number
  completedDates: string[]
}

export async function getStreakData(): Promise<StreakData> {
  const supabase = await createClient()

  // Get current user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error('Unauthorized')
  }

  // Fetch streak data
  const { data: streakData, error: streakError } = await supabase
    .from('streaks')
    .select('current_streak, longest_streak')
    .eq('user_id', user.id)
    .single()

  if (streakError && streakError.code !== 'PGRST116') {
    throw new Error('Failed to fetch streak data')
  }

  // Fetch ritual completions for this user to get completed dates
  const { data: completions, error: completionsError } = await supabase
    .from('ritual_completions')
    .select('completed_at')
    .eq('user_id', user.id)
    .order('completed_at', { ascending: false })

  if (completionsError) {
    throw new Error('Failed to fetch ritual completions')
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
}
