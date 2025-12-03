import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { ritualType = 'candle', dedication = '' } = await request.json()

    // Record ritual completion
    const { error: insertError } = await supabase
      .from('ritual_completions')
      .insert([
        {
          user_id: user.id,
          ritual_type: ritualType,
          dedication,
          completed_at: new Date().toISOString(),
        },
      ])

    if (insertError) {
      console.error('Ritual insertion error:', insertError)
      return NextResponse.json(
        { error: 'Failed to record ritual completion' },
        { status: 500 }
      )
    }

    // Update or create streak
    const today = new Date().toISOString().split('T')[0]

    // Get current streak data
    const { data: streakData, error: streakFetchError } = await supabase
      .from('streaks')
      .select('current_streak, longest_streak, last_completed_date')
      .eq('user_id', user.id)
      .single()

    if (streakFetchError && streakFetchError.code !== 'PGRST116') {
      console.error('Streak fetch error:', streakFetchError)
      return NextResponse.json(
        { error: 'Failed to fetch streak data' },
        { status: 500 }
      )
    }

    let newStreak = 1
    let longestStreak = 1

    if (streakData) {
      const lastCompleted = streakData.last_completed_date
      const lastCompletedDate = lastCompleted
        ? new Date(lastCompleted).toISOString().split('T')[0]
        : null

      // Check if ritual was already completed today
      if (lastCompletedDate === today) {
        return NextResponse.json({
          message: 'Ritual already completed today',
          currentStreak: streakData.current_streak,
          longestStreak: streakData.longest_streak,
        })
      }

      // Check if streak should continue (completed yesterday)
      const yesterday = new Date(Date.now() - 86400000)
        .toISOString()
        .split('T')[0]

      if (lastCompletedDate === yesterday) {
        newStreak = streakData.current_streak + 1
      }

      longestStreak = Math.max(newStreak, streakData.longest_streak)

      // Update existing streak
      const { error: updateError } = await supabase
        .from('streaks')
        .update({
          current_streak: newStreak,
          longest_streak: longestStreak,
          last_completed_date: today,
        })
        .eq('user_id', user.id)

      if (updateError) {
        console.error('Streak update error:', updateError)
        return NextResponse.json(
          { error: 'Failed to update streak' },
          { status: 500 }
        )
      }
    } else {
      // Create new streak record
      const { error: createError } = await supabase
        .from('streaks')
        .insert([
          {
            user_id: user.id,
            current_streak: 1,
            longest_streak: 1,
            last_completed_date: today,
          },
        ])

      if (createError) {
        console.error('Streak creation error:', createError)
        return NextResponse.json(
          { error: 'Failed to create streak' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({
      message: 'Ritual completed successfully',
      currentStreak: newStreak,
      longestStreak,
    })
  } catch (error) {
    console.error('Ritual completion error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
