import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  // Handle errors from OAuth provider
  if (error) {
    const errorMessage = searchParams.get('error_description') || 'Authentication failed'
    return NextResponse.redirect(
      `${request.nextUrl.origin}/login?error=${encodeURIComponent(errorMessage)}`
    )
  }

  // Exchange code for session
  if (code) {
    const supabase = await createClient()
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (exchangeError) {
      console.error('Session exchange error:', exchangeError)
      return NextResponse.redirect(
        `${request.nextUrl.origin}/login?error=${encodeURIComponent(exchangeError.message)}`
      )
    }
  }

  // Redirect to dashboard on success
  return NextResponse.redirect(`${request.nextUrl.origin}/dashboard/home`)
}
