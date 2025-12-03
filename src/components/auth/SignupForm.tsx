'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function SignupForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    // Validate password strength
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        return
      }

      setSuccess(true)
      setEmail('')
      setPassword('')
      setConfirmPassword('')

      // Redirect to login after a brief delay to show success message
      setTimeout(() => {
        router.push('/login?message=Check your email to confirm your account')
      }, 2000)
    } catch (err) {
      setError('An unexpected error occurred')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-serif font-medium text-martinique mb-2">
          Create Account
        </h1>
        <p className="text-martinique/60">Begin your healing journey</p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="glass-regular rounded-2xl p-4 bg-green-50/50 border border-green-200/50">
          <p className="text-sm text-green-700">
            Account created! Redirecting to login...
          </p>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="glass-regular rounded-2xl p-4 bg-red-50/50 border border-red-200/50">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Signup Form */}
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-martinique mb-2">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading || success}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-martinique mb-2">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading || success}
          />
          <p className="text-xs text-martinique/50 mt-1">At least 8 characters</p>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-martinique mb-2">
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading || success}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={loading || success}
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-martinique/10" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gradient-to-b from-white to-sand/30 text-martinique/60">
            or
          </span>
        </div>
      </div>

      {/* Login Link */}
      <p className="text-center text-sm text-martinique/60">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-semibold text-honey hover:text-honey/80 transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}
