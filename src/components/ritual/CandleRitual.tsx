'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Heart } from 'lucide-react'

interface CandleRitualProps {
  durationSeconds?: number
}

export function CandleRitual({ durationSeconds = 300 }: CandleRitualProps) {
  const router = useRouter()
  const [ritualStarted, setRitualStarted] = useState(false)
  const [isBreathing, setIsBreathing] = useState(false)
  const [dedication, setDedication] = useState('')
  const [timeLeft, setTimeLeft] = useState(durationSeconds)

  // Timer effect
  useEffect(() => {
    if (!ritualStarted || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return 0
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [ritualStarted, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const toggleRitual = () => {
    if (!ritualStarted) {
      if (!dedication.trim()) return
      setRitualStarted(true)
      setIsBreathing(true)
    } else {
      router.push('/dashboard/home')
    }
  }

  return (
    <div className="h-full bg-[#18181F] relative overflow-hidden flex flex-col items-center justify-between py-6">
      {/* Noise Texture */}
      <div className="absolute inset-0 noise-texture opacity-10 pointer-events-none" />

      {/* Ambient Glow - Breathing animation */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#DE9C52]/10 blur-[80px] transition-all duration-[4s] ${
          isBreathing ? 'scale-150 opacity-20' : 'scale-100 opacity-10'
        }`}
      />

      {/* Header */}
      <div className="w-full px-6 flex justify-between items-center relative z-10">
        {/* Back Button - Dark Style */}
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-[#E8E6E3]/10 text-[#E8E6E3] hover:bg-[#E8E6E3]/20 transition-all active:scale-95 z-20"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Guide Breath Button - Only visible when ritual started */}
        <div className={`transition-opacity duration-500 ${ritualStarted ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={() => setIsBreathing(!isBreathing)}
            className={`px-4 py-2 rounded-full border text-xs font-medium tracking-wide transition-all ${
              isBreathing
                ? 'bg-[#DE9C52]/20 border-[#DE9C52] text-[#DE9C52]'
                : 'border-[#E8E6E3]/20 text-[#E8E6E3]/60'
            }`}
          >
            {isBreathing ? 'Breathing...' : 'Guide Breath'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full px-6 overflow-y-auto no-scrollbar relative z-10">
        {/* Pre-ritual title */}
        {!ritualStarted && (
          <div className="text-center mb-10 animate-enter absolute top-12 left-0 right-0">
            <h2 className="font-serif text-3xl text-[#E8E6E3] mb-3 leading-tight tracking-tight">
              Light a candle for
              <br />
              those you hold dear
            </h2>
            <p className="text-[#E8E6E3]/60 text-xs font-medium leading-relaxed max-w-[260px] mx-auto tracking-wide">
              Take a moment to pause, breathe, and honor their memory in your heart.
            </p>
          </div>
        )}

        {/* Post-ritual dedication display */}
        {ritualStarted && (
          <div className="text-center mb-10 animate-enter absolute top-16 left-0 right-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A85846] mb-2">
              In Loving Memory
            </p>
            <h2 className="font-serif text-3xl text-[#E8E6E3] tracking-wide">For {dedication}</h2>
          </div>
        )}

        {/* Name Input - Only visible before starting */}
        <div
          className={`w-full max-w-[280px] mb-8 transition-all duration-700 absolute top-[220px] z-20 ${
            !ritualStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
        >
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#A85846] mb-3 text-center">
            Reflection Time
          </label>
          <div className="relative group">
            <input
              type="text"
              value={dedication}
              onChange={(e) => setDedication(e.target.value)}
              placeholder="Enter a name"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-center text-[#DE9C52] placeholder:text-white/20 outline-none focus:border-[#DE9C52]/50 focus:bg-white/10 transition-all font-serif text-lg tracking-wide group-hover:border-white/20"
            />
            {dedication && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#DE9C52] animate-enter">
                <Heart size={14} fill="currentColor" />
              </div>
            )}
          </div>
        </div>

        {/* Candle Visualization */}
        <div
          className={`relative mb-6 shrink-0 transition-transform duration-1000 ${
            ritualStarted ? 'scale-110 mt-12' : 'scale-90 mt-[180px]'
          }`}
        >
          {/* Breathing Circle */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#DE9C52]/20 transition-all duration-[4000ms] ease-in-out ${
              isBreathing ? 'w-64 h-64 opacity-100' : 'w-32 h-32 opacity-0'
            }`}
          />

          {/* Candle Body */}
          <div className="w-16 h-40 bg-gradient-to-t from-[#202030] to-[#3C3748] rounded-t-xl rounded-b-lg relative mx-auto shadow-2xl">
            {/* Top ellipse */}
            <div className="absolute top-0 w-full h-4 bg-[#3C3748] rounded-[50%] -translate-y-2 opacity-50" />
            {/* Wick */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1 h-4 bg-black/60" />
            {/* Flame */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-8 h-16 bg-gradient-to-t from-[#DE9C52] via-[#D5C6B4] to-white rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] flame-core mix-blend-screen filter blur-[1px]" />
          </div>
        </div>

        {/* Timer / Breathing Text */}
        <div
          className={`text-center space-y-2 h-10 transition-opacity duration-1000 ${
            ritualStarted ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h2
            className={`font-serif text-4xl text-[#E8E6E3] transition-all duration-[4000ms] ${
              isBreathing ? 'tracking-widest opacity-80' : 'tracking-normal opacity-100'
            }`}
          >
            {isBreathing ? 'Inhale' : formatTime(timeLeft)}
          </h2>
        </div>
      </div>

      {/* Action Button */}
      <div className="w-full px-8 relative z-10 pt-4">
        <button
          onClick={toggleRitual}
          disabled={!ritualStarted && !dedication.trim()}
          className={`w-full py-4 rounded-[24px] font-serif text-lg tracking-wide shadow-[0_0_30px_rgba(222,156,82,0.3)] transition-all font-medium ${
            !ritualStarted && !dedication.trim()
              ? 'bg-[#3C3748] text-[#E8E6E3]/30 cursor-not-allowed shadow-none'
              : 'bg-[#DE9C52] text-[#202030] hover:brightness-110'
          }`}
        >
          {ritualStarted ? 'End Ritual' : 'Begin Ritual'}
        </button>
      </div>
    </div>
  )
}
