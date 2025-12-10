'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles, BookHeart, Flame } from 'lucide-react'

export default function JourneyPage() {
  const router = useRouter()

  // Mock data - replace with real data from Supabase
  const stats = {
    candlesLit: 34,
    memoriesSaved: 12,
    daysOnJourney: 47,
    lovedOneName: 'Mom',
  }

  return (
    <div className="min-h-full pb-32 aurora-bg flex flex-col pt-12 relative overflow-hidden transition-colors duration-500">
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 noise-texture pointer-events-none z-0 mix-blend-overlay" />

      {/* Header */}
      <div className="px-6 flex items-center justify-between mb-6 relative z-10">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full glass-thin flex items-center justify-center hover:bg-white/80 transition-all active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 text-[var(--text-main)]" />
        </button>
        <h2 className="font-serif text-2xl text-[var(--text-main)]">Your Journey</h2>
        <div className="w-10" />
      </div>

      {/* Stats Card */}
      <div className="px-6 mb-8 relative z-10 animate-enter">
        <div className="glass-regular rounded-[32px] p-6 text-center">
          <p className="font-serif text-lg text-[var(--text-main)] mb-6">
            "You've saved {stats.memoriesSaved} memories of {stats.lovedOneName}"
          </p>
          <div className="flex justify-between divide-x divide-[#D5C6B4]/50">
            <div className="flex-1 px-2">
              <p className="font-serif text-2xl text-[#DE9C52]">{stats.candlesLit}</p>
              <p className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">
                Candles
              </p>
            </div>
            <div className="flex-1 px-2">
              <p className="font-serif text-2xl text-[#DE9C52]">{stats.memoriesSaved}</p>
              <p className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">
                Memories
              </p>
            </div>
            <div className="flex-1 px-2">
              <p className="font-serif text-2xl text-[#DE9C52]">{stats.daysOnJourney}</p>
              <p className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">
                Days
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Journey Path */}
      <div className="flex-1 relative w-full overflow-y-auto no-scrollbar pb-32">
        {/* SVG Winding Path */}
        <svg className="absolute top-0 left-0 w-full h-[600px] pointer-events-none">
          <path
            d="M 180 30 C 180 100, 320 100, 320 180 C 320 260, 100 280, 100 380 C 100 480, 180 550, 180 600"
            fill="none"
            stroke="#D5C6B4"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
        </svg>

        {/* Milestones */}
        <div className="relative h-[600px] px-6">
          {/* Today - Current Position */}
          <motion.div
            className="absolute flex items-center gap-4"
            style={{ top: 30, left: '45%', transform: 'translateX(-50%)' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-10 h-10 rounded-full bg-[var(--bg-main)] border-2 border-[#D5C6B4] flex items-center justify-center text-[#DE9C52] z-10 shadow-sm relative">
              <Sparkles className="w-[18px] h-[18px]" />
              <div className="absolute inset-0 rounded-full border-2 border-[#DE9C52]/20 animate-ping" />
            </div>
            <div className="glass-thin px-3 py-2 rounded-xl">
              <p className="text-xs font-bold text-[var(--text-main)]">Today</p>
              <p className="text-[10px] text-[var(--text-muted)]">You're here now</p>
            </div>
          </motion.div>

          {/* First Memory Milestone */}
          <motion.div
            className="absolute flex flex-row-reverse items-center gap-4"
            style={{ top: 180, right: '15%' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-8 h-8 rounded-full bg-[var(--bg-main)] border border-[#D5C6B4] flex items-center justify-center text-[#A85846] z-10">
              <BookHeart className="w-[14px] h-[14px]" />
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-[var(--text-main)]">First Memory</p>
              <p className="text-[10px] text-[var(--text-muted)]">Oct 12</p>
            </div>
          </motion.div>

          {/* 7 Day Streak */}
          <motion.div
            className="absolute flex items-center gap-4"
            style={{ top: 380, left: '20%' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-8 h-8 rounded-full bg-[var(--bg-main)] border border-[#D5C6B4] flex items-center justify-center text-[#DE9C52] z-10">
              <Flame className="w-[14px] h-[14px]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--text-main)]">7 Day Streak</p>
              <p className="text-[10px] text-[var(--text-muted)]">Oct 04</p>
            </div>
          </motion.div>

          {/* Beginning */}
          <motion.div
            className="absolute flex flex-col items-center gap-2 opacity-60"
            style={{ top: 550, left: '45%', transform: 'translateX(-50%)' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="w-3 h-3 rounded-full bg-[#D5C6B4]" />
            <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
              Beginning
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
