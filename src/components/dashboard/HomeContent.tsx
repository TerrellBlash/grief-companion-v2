'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Flame,
  Sparkles,
  BookHeart,
  Users,
  ChevronRight,
  Check,
} from 'lucide-react'
import type { DashboardData } from '@/lib/services/dashboard'

interface HomeContentProps {
  data: DashboardData
}

export function HomeContent({ data }: HomeContentProps) {
  const router = useRouter()

  return (
    <div className="px-6 py-8 max-w-2xl mx-auto">
      {/* HEADER SECTION */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        {/* Day/Time with orange dot */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-honey" />
          <p className="text-sm font-semibold text-martinique/60 uppercase tracking-widest">
            {data.greetingTime}
          </p>
        </div>

        {/* Greeting text */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-body text-martinique mb-1">{data.greetingMessage},</p>
            <h1 className="text-4xl font-serif font-medium mb-1">
              <span className="text-honey">{data.displayName}</span>
            </h1>
          </div>

          {/* Time-based icon top right */}
          <div className="text-3xl flex-shrink-0">
            {getTimeEmoji()}
          </div>
        </div>
      </motion.header>

      {/* HERO RITUAL CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="mb-6"
      >
        <button
          onClick={() => router.push('/rituals/candle')}
          className="w-full rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 active:scale-95"
        >
          <div className="bg-gradient-to-br from-sand via-honey to-spice p-8 text-left relative">
            {/* Badge - Shows completion status */}
            <div className="flex items-center justify-between mb-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                <span className="text-xs font-bold text-white/90 uppercase tracking-widest">
                  Daily Ritual
                </span>
              </div>

              {/* Completion indicator */}
              {data.hasCompletedTodayRitual && (
                <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                  <Check size={14} className="text-white" />
                  <span className="text-xs font-bold text-white">Complete</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1 text-white">
                <h2 className="text-4xl font-serif font-medium mb-2">
                  {data.hasCompletedTodayRitual ? 'Candle Lit' : 'Light a Candle'}
                </h2>
                <p className="text-white/90 text-base leading-relaxed">
                  {data.hasCompletedTodayRitual
                    ? 'Your light shines bright today'
                    : 'Honor your memory with a moment of peace'}
                </p>
              </div>

              {/* Circular button with flame */}
              <div
                className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${
                  data.hasCompletedTodayRitual
                    ? 'bg-white/30 backdrop-blur-md border border-white/50'
                    : 'bg-white/20 backdrop-blur-md border border-white/40'
                }`}
              >
                <Flame
                  size={28}
                  className={`${data.hasCompletedTodayRitual ? 'text-white fill-white' : 'text-white'}`}
                  fill={data.hasCompletedTodayRitual ? 'currentColor' : 'none'}
                />
              </div>
            </div>
          </div>
        </button>
      </motion.div>

      {/* 2-COLUMN GRID */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="grid grid-cols-2 gap-4 mb-6"
      >
        {/* Streak Card - Shows real data */}
        <button
          onClick={() => router.push('/dashboard/progress')}
          className="glass-regular rounded-2xl p-6 text-center hover:bg-white/50 transition-colors duration-300 active:scale-95"
        >
          <div className="mb-4">
            <Flame size={32} className="text-honey mx-auto" />
          </div>
          <p className="text-4xl font-serif font-medium text-martinique mb-2">
            {data.currentStreak}
          </p>
          <p className="text-xs font-bold text-martinique/60 uppercase tracking-widest">
            {data.currentStreak === 1 ? 'Day' : 'Days'}
          </p>
        </button>

        {/* Companion Card */}
        <button
          onClick={() => router.push('/dashboard/memories')}
          className="glass-regular rounded-2xl p-6 flex flex-col items-center justify-center hover:bg-white/50 transition-colors duration-300 active:scale-95"
        >
          <div className="mb-3">
            <Sparkles size={32} className="text-martinique" />
          </div>
          <h3 className="font-serif text-base font-medium text-martinique mb-1">
            Memories
          </h3>
          <p className="text-xs text-martinique/60">Save today</p>
        </button>
      </motion.div>

      {/* MEMORY JAR CARD */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        onClick={() => router.push('/dashboard/memories')}
        className="w-full glass-regular rounded-2xl p-6 mb-4 flex items-center justify-between hover:bg-white/50 transition-colors duration-300 active:scale-95"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-honey/20 flex items-center justify-center flex-shrink-0">
            <BookHeart size={24} className="text-honey" />
          </div>
          <div className="text-left">
            <h3 className="font-serif text-lg font-medium text-martinique">
              Memory Jar
            </h3>
            <p className="text-sm text-martinique/60">Save a thought for today</p>
          </div>
        </div>
        <ChevronRight size={20} className="text-martinique/40 flex-shrink-0" />
      </motion.button>

      {/* CIRCLES CARD */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        onClick={() => router.push('/authenticated/community')}
        className="w-full glass-regular rounded-2xl p-6 flex items-center justify-between hover:bg-white/50 transition-colors duration-300 active:scale-95"
      >
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-honey to-spice border-2 border-white/80 flex items-center justify-center text-white text-xs font-bold">
              A
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-martinique to-honey border-2 border-white/80 flex items-center justify-center text-white text-xs font-bold">
              M
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-spice to-martinique border-2 border-white/80 flex items-center justify-center text-white text-xs font-bold">
              J
            </div>
          </div>
          <div className="text-left">
            <h3 className="font-serif text-lg font-medium text-martinique">
              Circles
            </h3>
            <p className="text-sm text-martinique/60">Finding healing together</p>
          </div>
        </div>
        <ChevronRight size={20} className="text-martinique/40 flex-shrink-0" />
      </motion.button>
    </div>
  )
}

function getTimeEmoji() {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return '☀️'
  if (hour >= 12 && hour < 17) return '🌤️'
  if (hour >= 17 && hour < 21) return '🌅'
  return '🌙'
}
