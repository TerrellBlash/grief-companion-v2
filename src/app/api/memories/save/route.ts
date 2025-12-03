import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { type, text, photo_url, date, location, people, tags } =
      await request.json()

    if (!type) {
      return NextResponse.json(
        { error: 'Memory type is required' },
        { status: 400 }
      )
    }

    const { error: insertError } = await supabase.from('memories').insert([
      {
        user_id: user.id,
        type,
        content: text,
        photo_url,
        memory_date: date,
        location,
        people: people || [],
        tags: tags || [],
        created_at: new Date().toISOString(),
      },
    ])

    if (insertError) {
      console.error('Error inserting memory:', insertError)
      return NextResponse.json(
        { error: 'Failed to save memory' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Memory saved successfully',
      success: true,
    })
  } catch (error) {
    console.error('Memory save error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
