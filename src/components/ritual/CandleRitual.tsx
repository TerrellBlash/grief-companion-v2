'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

interface CandleRitualProps {
  durationSeconds?: number
}

// BackButton component - Dark variant for ritual
const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95 z-20 bg-[var(--color-sand)]/10 text-[var(--color-sand)] hover:bg-[var(--color-sand)]/20"
  >
    <ArrowLeft size={20} />
  </button>
)

export function CandleRitual({ durationSeconds = 300 }: CandleRitualProps) {
  const router = useRouter()
  const [breathIn, setBreathIn] = useState(true)
  const [dedication, setDedication] = useState('')
  const [ritualStarted, setRitualStarted] = useState(false)

  const toggleRitual = () => {
    if (!ritualStarted) {
      if (!dedication.trim()) return
      setRitualStarted(true)
    } else {
      router.push('/dashboard/home')
    }
  }

  // Breathing Cycle Effect - 4 seconds in, 4 seconds out
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (ritualStarted) {
      setBreathIn(true)
      interval = setInterval(() => {
        setBreathIn(prev => !prev)
      }, 4000)
    }
    return () => clearInterval(interval)
  }, [ritualStarted])

  return (
    <div className="h-full bg-[#1F1D24] relative overflow-hidden flex flex-col items-center justify-between py-6">
      {/* Noise Texture */}
      <div className="absolute inset-0 noise-texture opacity-10 pointer-events-none" />

      {/* Pulsating Background Halo */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[var(--color-amber)]/10 blur-[80px] transition-all duration-[4000ms] ease-in-out ${
          ritualStarted && breathIn ? 'scale-150 opacity-20' : 'scale-100 opacity-10'
        }`}
      />

      {/* Header */}
      <div className="w-full px-6 flex justify-between items-center relative z-10">
        <BackButton onClick={() => router.back()} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full px-6 overflow-y-auto no-scrollbar relative z-10">
        {/* Pre-ritual Title */}
        {!ritualStarted ? (
          <div className="text-center mb-10 animate-enter absolute top-12 left-0 right-0">
            <h2 className="font-serif text-3xl text-[#EBE8E1] mb-3 leading-tight tracking-tight">
              Light a candle for
              <br />
              those you hold dear
            </h2>
            <p className="text-[#EBE8E1]/60 text-xs font-medium leading-relaxed max-w-[260px] mx-auto tracking-wide">
              Take a moment to pause, breathe, and honor their memory.
            </p>
          </div>
        ) : (
          <div className="text-center mb-10 animate-enter absolute top-16 left-0 right-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-clay)] mb-2">
              In Loving Memory
            </p>
            <h2 className="font-serif text-3xl text-[#EBE8E1] tracking-wide">For {dedication}</h2>
          </div>
        )}

        {/* Name Input - Hidden when ritual started */}
        <div
          className={`w-full max-w-[280px] mb-8 transition-all duration-700 absolute top-[220px] z-20 ${
            !ritualStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
        >
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-clay)] mb-3 text-center">
            Reflection Time
          </label>
          <div className="relative group">
            <input
              type="text"
              value={dedication}
              onChange={(e) => setDedication(e.target.value)}
              placeholder="Enter a name"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-center text-[var(--color-amber)] placeholder:text-white/20 outline-none focus:border-[var(--color-amber)]/50 focus:bg-white/10 transition-all font-serif text-lg tracking-wide group-hover:border-white/20"
            />
          </div>
        </div>

        {/* Candle Visualization */}
        <div
          className={`relative mb-6 shrink-0 transition-transform duration-1000 flex flex-col items-center ${
            ritualStarted ? 'scale-110 mt-12' : 'scale-90 mt-[180px]'
          }`}
        >
          {/* Pulsating Ring */}
          <div
            className={`absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-amber)]/20 transition-all duration-[4000ms] ease-in-out ${
              ritualStarted && breathIn
                ? 'w-80 h-80 opacity-60 border-[var(--color-amber)]/40'
                : 'w-40 h-40 opacity-0'
            }`}
          />

          {/* Candle Body */}
          <div className="w-16 h-40 bg-gradient-to-t from-[#2A2730] to-[#45414D] rounded-t-xl rounded-b-lg relative mx-auto shadow-2xl z-20">
            {/* Top ellipse */}
            <div className="absolute top-0 w-full h-4 bg-[#45414D] rounded-[50%] -translate-y-2 opacity-50" />
            {/* Wick */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1 h-4 bg-black/60" />

            {/* Animated Flame */}
            <div
              className={`absolute -top-16 left-1/2 -translate-x-1/2 w-8 h-16 bg-gradient-to-t from-[var(--color-amber)] via-[#E8B991] to-white rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] mix-blend-screen filter blur-[1px] transition-all duration-700 ${
                ritualStarted ? 'animate-flame opacity-90 scale-100' : 'opacity-0 scale-50'
              }`}
            />

            {/* Glow when lit */}
            <div
              className={`absolute -top-20 left-1/2 -translate-x-1/2 w-32 h-32 bg-[var(--color-amber)] rounded-full filter blur-[40px] transition-all duration-1000 ${
                ritualStarted ? 'opacity-30' : 'opacity-0'
              }`}
            />
          </div>

          {/* Breathing Text */}
          <div
            className={`mt-8 text-center transition-opacity duration-1000 h-6 ${
              ritualStarted ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="font-serif text-lg text-[#EBE8E1]/70 tracking-wide transition-opacity duration-1000">
              {breathIn ? 'Breathe in...' : 'Breathe out...'}
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="w-full px-8 relative z-10 pt-4">
        <button
          onClick={toggleRitual}
          disabled={!ritualStarted && !dedication.trim()}
          className={`w-full py-4 rounded-[24px] font-serif text-lg tracking-wide shadow-[0_0_30px_rgba(214,143,84,0.3)] transition-all font-medium ${
            !ritualStarted && !dedication.trim()
              ? 'bg-[#3C3748] text-[#EBE8E1]/30 cursor-not-allowed shadow-none'
              : 'bg-[var(--color-amber)] text-[#2A2730] hover:brightness-110'
          }`}
        >
          {ritualStarted ? 'End Ritual' : 'Begin Ritual'}
        </button>
      </div>
    </div>
  )
}
