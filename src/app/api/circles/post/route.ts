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

    const { circle_id, content } = await request.json()

    if (!circle_id || !content) {
      return NextResponse.json(
        { error: 'Circle ID and content are required' },
        { status: 400 }
      )
    }

    const { error: insertError } = await supabase
      .from('circle_posts')
      .insert([
        {
          circle_id,
          user_id: user.id,
          content,
          created_at: new Date().toISOString(),
        },
      ])

    if (insertError) {
      console.error('Error inserting post:', insertError)
      return NextResponse.json(
        { error: 'Failed to create post' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Post created successfully',
      success: true,
    })
  } catch (error) {
    console.error('Post error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
