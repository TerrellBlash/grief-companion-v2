'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { X, Wind } from 'lucide-react'
import { CandleFlame } from './CandleFlame'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface CandleRitualProps {
  durationSeconds?: number
}

type RitualState = 'setup' | 'lighting' | 'reflection' | 'completing'

export function CandleRitual({ durationSeconds = 120 }: CandleRitualProps) {
  const router = useRouter()
  const [state, setState] = useState<RitualState>('setup')
  const [isLit, setIsLit] = useState(false)
  const [timeLeft, setTimeLeft] = useState(durationSeconds)
  const [dedication, setDedication] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [breathingActive, setBreathingActive] = useState(false)

  // Timer effect
  useEffect(() => {
    if (state !== 'reflection' || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setState('completing')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [state, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleBeginRitual = () => {
    setIsLit(true)
    setState('reflection')
    setTimeLeft(durationSeconds)
  }

  const handleCompleteRitual = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/rituals/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ritualType: 'candle',
          dedication,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to complete ritual')
      }

      setState('completing')
      setTimeout(() => {
        router.push('/dashboard/home')
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsLoading(false)
    }
  }

  return (
    <div className="h-screen w-full flex flex-col relative overflow-hidden bg-[#18181F] transition-colors duration-700">
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 noise-texture opacity-20 pointer-events-none" />

      {/* Header Area */}
      <div className="relative z-50 flex items-center justify-between pt-8 pb-4 px-6">
        {/* Close Button */}
        <button
          onClick={() => router.back()}
          className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 transition-all border border-white/5 active:scale-95 backdrop-blur-md"
          aria-label="Close ritual"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        {/* Title */}
        <span className="font-serif text-[#E8E6E3] text-lg font-medium tracking-wide">
          Daily Ritual
        </span>

        {/* Breathing Toggle */}
        <button
          onClick={() => setBreathingActive(!breathingActive)}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all border active:scale-95 backdrop-blur-md ${
            breathingActive
              ? 'bg-honey/20 border-honey/40 text-honey'
              : 'bg-white/10 border-white/5 text-white/80 hover:bg-white/20'
          }`}
          aria-label="Toggle breathing guide"
        >
          <Wind size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center relative z-10 px-6 pt-10">
        {/* Candle Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-12 scale-110"
        >
          {/* Breathing Circle - Expands/contracts when active */}
          {breathingActive && isLit && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border-2 border-[#DE9C52]/30 animate-breathe pointer-events-none" />
          )}

          {/* Dynamic Ambient Glow */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[80px] transition-all duration-1000 ${
              isLit ? 'opacity-100' : 'opacity-30'
            } ${breathingActive ? 'animate-breathe' : ''}`}
            style={{
              background: isLit
                ? 'radial-gradient(circle, rgba(222,156,82,0.4) 0%, rgba(168,88,70,0.2) 50%, transparent 70%)'
                : 'rgba(222,156,82,0.2)',
            }}
          />

          {/* Secondary Glow Layer */}
          {isLit && (
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#DE9C52]/30 rounded-full blur-[60px] ${
                breathingActive ? 'animate-breathe' : 'animate-glow-pulse'
              }`}
            />
          )}

          {/* Candle Body */}
          <div className="relative flex flex-col items-center">
            {/* Flame */}
            <div
              className={`absolute -top-[100px] transition-opacity duration-700 ${
                isLit ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="flame-core">
                <CandleFlame isLit={true} />
              </div>
            </div>

            {/* Wick */}
            <div
              className={`w-1 h-3 bg-martinique mb-[-2px] transition-opacity duration-300 ${
                isLit ? 'opacity-0' : 'opacity-100'
              }`}
            />

            {/* Wax Body */}
            <div className="w-16 h-36 bg-gradient-to-b from-lynx to-sand rounded-t-lg rounded-b-xl relative shadow-lg">
              {/* Highlight */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/30 to-transparent rounded-t-lg rounded-b-xl pointer-events-none" />
              {/* Top Surface */}
              <div className="absolute -top-1.5 left-0 w-full h-3 bg-[#F0ECE4] rounded-[50%]" />
              {/* Drip */}
              <div className="absolute top-4 right-[-4px] w-2 h-8 bg-[#EAE4D8] rounded-full shadow-sm" />
            </div>

            {/* Candle Base */}
            <div className="w-24 h-4 bg-[#8B7355] rounded-full mt-[-2px] shadow-md relative z-10" />
          </div>
        </motion.div>

        {/* Breathing Guide Text */}
        {breathingActive && isLit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-6"
          >
            <p className="text-[#DE9C52]/80 font-serif text-lg animate-pulse-slow">
              Breathe in... and out...
            </p>
          </motion.div>
        )}

        {/* Typography */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center space-y-4 max-w-xs mx-auto mb-10"
        >
          <h1 className="font-serif text-[32px] leading-[1.2] text-[#E8E6E3] font-medium drop-shadow-sm">
            Light a candle for those you hold dear
          </h1>
          <p className="font-serif italic text-[#E8E6E3]/60 text-[17px] leading-relaxed">
            Take a moment to pause, breathe, and honor their memory in your
            heart.
          </p>
        </motion.div>

        {/* Timer Section - Only show during reflection */}
        {state === 'reflection' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-10"
          >
            <div className="font-serif text-[56px] text-[#DE9C52] leading-none mb-2 drop-shadow-[0_0_30px_rgba(222,156,82,0.4)]">
              {formatTime(timeLeft)}
            </div>
            <div className="text-[11px] font-sans font-bold text-[#E8E6E3]/40 uppercase tracking-[0.2em]">
              Reflection Time
            </div>
          </motion.div>
        )}

        {/* Dedication Input - Only show during setup and reflection */}
        {(state === 'setup' || state === 'reflection') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-sm space-y-3 mb-8"
          >
            <label className="block text-center text-[11px] font-sans font-bold text-[#E8E6E3]/40 uppercase tracking-[0.2em]">
              Dedicate this moment to
            </label>
            <Input
              type="text"
              placeholder="Enter a name..."
              value={dedication}
              onChange={(e) => setDedication(e.target.value)}
              disabled={state === 'reflection' || isLoading}
              className="bg-[#242430] border border-[#E8E6E3]/10 text-center text-[#E8E6E3] placeholder:text-[#E8E6E3]/30 focus:ring-[#DE9C52]/30"
            />
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-sm mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl"
          >
            <p className="text-sm text-red-200 text-center">{error}</p>
          </motion.div>
        )}

        {/* Completion State */}
        {state === 'completing' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
          >
            <div className="text-6xl mb-4">✨</div>
            <h2 className="font-serif text-2xl text-[#E8E6E3] font-medium">
              Ritual Complete
            </h2>
            <p className="text-[#E8E6E3]/60 font-serif italic">
              {dedication && `Your light shines for ${dedication}`}
            </p>
          </motion.div>
        )}

        {/* Action Button */}
        {state === 'setup' && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={handleBeginRitual}
            className="w-full max-w-sm bg-gradient-to-r from-[#A85846] to-[#DE9C52] text-white rounded-2xl py-4 font-sans font-bold text-[16px] flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-[#A85846]/30 hover:shadow-[#DE9C52]/40"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="opacity-90"
            >
              <path d="M12 2C10.5 5.5 8 8 8 11.5C8 14.5 10 17 12 17C14 17 16 14.5 16 11.5C16 8 13.5 5.5 12 2Z" />
            </svg>
            Begin Ritual
          </motion.button>
        )}

        {/* Complete Button - Show at end of reflection */}
        {state === 'reflection' && timeLeft <= 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-sm"
          >
            <Button
              onClick={handleCompleteRitual}
              variant="primary"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'Completing Ritual...' : 'Complete Ritual'}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
