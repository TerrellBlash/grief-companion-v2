'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Flame,
  Settings,
  Sparkles,
  BookHeart,
  Users,
  ArrowRight,
  Map,
  Mail,
  X,
} from 'lucide-react'
import type { DashboardData } from '@/lib/services/dashboard'

interface HomeContentProps {
  data: DashboardData
}

// Gentle Nudge Banner Component
const NudgeBanner = ({ onDismiss }: { onDismiss: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mx-5 mb-6 glass-thin border-l-4 border-l-honey p-4 rounded-r-2xl rounded-l-sm relative animate-enter shadow-sm flex items-start gap-3"
    >
      <div className="min-w-6 pt-0.5 text-spice">
        <Flame className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="font-serif text-howl text-lg leading-tight mb-1">
          Your space is here whenever you need it.
        </p>
        <p className="text-howl/60 text-xs">
          Tomorrow marks one year since Mom's passing.
        </p>
      </div>
      <button
        onClick={onDismiss}
        className="text-howl/40 hover:text-howl transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  )
}

export function HomeContent({ data }: HomeContentProps) {
  const router = useRouter()
  const [showNudge, setShowNudge] = useState(true)

  return (
    <div className="pb-40 min-h-screen aurora-bg relative transition-colors duration-500">
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 noise-texture opacity-40 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header - Enhanced Gemini Style */}
        <header className="pt-14 px-8 mb-6 animate-enter flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-3">
              {/* Pulsing status dot */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-honey opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-honey" />
              </span>
              <p className="text-spice font-semibold text-xs uppercase tracking-[0.15em] opacity-80">
                {data.greetingTime}
              </p>
            </div>
            <h1 className="font-serif text-[32px] leading-[1.1] text-howl tracking-tight">
              <span className="opacity-70 font-normal">Welcome home,</span>
              <br />
              <span className="font-hand text-spice text-4xl relative top-1">
                {data.displayName}
              </span>
            </h1>
          </div>
          <button
            onClick={() => router.push('/dashboard/settings')}
            className="w-10 h-10 rounded-full glass-thin flex items-center justify-center text-howl/60 hover:text-howl active:scale-95 transition-all"
          >
            <Settings className="w-5 h-5" />
          </button>
        </header>

        {/* Gentle Nudge Banner */}
        {showNudge && <NudgeBanner onDismiss={() => setShowNudge(false)} />}

        {/* Dashboard Layout - Grid */}
        <div className="px-6 grid grid-cols-2 gap-5">
          {/* Ritual Card (Span 2) - Enhanced Dark Gradient */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            onClick={() => router.push('/rituals/candle')}
            className="col-span-2 aspect-[16/10] rounded-[40px] relative overflow-hidden cursor-pointer group transition-all duration-500 hover:-translate-y-2 border border-white/40 shadow-diffused-honey"
          >
            {/* Base Gradient Layer - Updated to darker */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#202030] via-[#A85846] to-[#DE9C52] opacity-95 transition-transform duration-700 group-hover:scale-105" />

            {/* Ambient Lighting (Top Left Highlight) */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/20 rounded-full blur-[60px] pointer-events-none mix-blend-soft-light" />

            {/* Ambient Shadow (Bottom Right Depth) */}
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-black/30 rounded-full blur-[60px] pointer-events-none mix-blend-multiply" />

            {/* Specular Noise/Texture Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Content Layer */}
            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
              {/* Header Badge */}
              <div className="flex justify-between items-start">
                <div className="bg-black/20 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-2 border border-white/10 shadow-sm ring-1 ring-white/5 transition-colors group-hover:bg-black/25">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] animate-pulse shadow-[0_0_8px_#FFD700]" />
                  <span className="text-[10px] font-bold tracking-[0.2em] text-white/90 font-sans">
                    DAILY RITUAL
                  </span>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="font-serif font-medium text-[32px] mb-2 text-white drop-shadow-md leading-[1.1] tracking-tight">
                    Light a
                    <br />
                    Candle
                  </h2>
                  <p className="text-white/70 text-[15px] font-medium tracking-wide leading-snug max-w-[160px]">
                    Honor your memory with a moment of peace.
                  </p>
                </div>

                {/* Glowing Action Button */}
                <div className="relative group/btn">
                  <div className="absolute inset-0 bg-white/30 rounded-[28px] blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 scale-110" />
                  <div className="w-[4.5rem] h-[4.5rem] rounded-[28px] bg-white/20 text-white flex items-center justify-center group-hover:bg-white/25 group-hover:scale-105 transition-all duration-300 shadow-glass border border-white/30 backdrop-blur-xl relative z-10">
                    <Flame
                      size={32}
                      fill="currentColor"
                      className="text-white drop-shadow-lg opacity-90 group-hover:opacity-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Streak Card (Square) */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            onClick={() => router.push('/dashboard/progress')}
            className="aspect-square flex flex-col justify-between p-6 glass-regular rounded-[28px] group shadow-glass hover:shadow-glass-hover transition-all duration-300 active:scale-95"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-[18px] bg-sand/20 flex items-center justify-center text-honey group-hover:bg-honey/20 transition-colors shadow-inner">
                <Flame
                  size={22}
                  className="text-honey"
                  fill="currentColor"
                  fillOpacity={0.3}
                />
              </div>
            </div>
            <div className="text-left">
              <span className="font-serif font-medium text-[48px] text-martinique block mb-[-4px] leading-none tracking-tighter">
                {data.currentStreak}
              </span>
              <p className="text-wellness-textSecondary text-[11px] font-bold uppercase tracking-wider pl-1">
                {data.currentStreak === 1 ? 'Day' : 'Days'}
              </p>
            </div>
          </motion.button>

          {/* Journey Map Card (Square) - NEW */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            onClick={() => router.push('/dashboard/journey')}
            className="aspect-square flex flex-col justify-between p-6 glass-regular rounded-[28px] group shadow-glass hover:shadow-glass-hover transition-all duration-300 active:scale-95"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-[18px] bg-sand/20 flex items-center justify-center text-spice group-hover:bg-spice/10 transition-colors shadow-inner">
                <Map size={20} strokeWidth={1.5} />
              </div>
            </div>
            <div className="text-left">
              <h3 className="font-serif font-semibold text-[20px] text-martinique mb-1 tracking-tight">
                Journey
              </h3>
              <p className="text-wellness-textSecondary text-xs font-medium">
                Your path
              </p>
            </div>
          </motion.button>

          {/* Memory Jar Card (Wide) */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            onClick={() => router.push('/dashboard/memories')}
            className="col-span-2 flex items-center justify-between p-6 glass-regular rounded-[28px] group shadow-glass hover:shadow-glass-hover transition-all duration-300 active:scale-95"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-[22px] bg-gradient-to-br from-lynx to-sand/40 flex items-center justify-center text-martinique border border-white/60 shadow-glass group-hover:rotate-3 transition-transform duration-300">
                <BookHeart size={28} strokeWidth={1.2} />
              </div>
              <div className="text-left">
                <h3 className="font-serif font-semibold text-[20px] text-martinique">
                  Memory Jar
                </h3>
                <p className="text-wellness-textSecondary text-sm mt-0.5">
                  Save a thought for today
                </p>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full glass-thin flex items-center justify-center text-wellness-textTertiary group-hover:text-martinique group-hover:bg-white/60 transition-all border border-white/50">
              <ArrowRight size={20} />
            </div>
          </motion.button>

          {/* Legacy Letters Card (Wide) - NEW */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            onClick={() => router.push('/dashboard/letters')}
            className="col-span-2 flex items-center justify-between p-6 glass-regular rounded-[28px] group shadow-glass hover:shadow-glass-hover transition-all duration-300 active:scale-95"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-[22px] bg-gradient-to-br from-spice/20 to-honey/20 flex items-center justify-center text-spice border border-white/60 shadow-glass group-hover:rotate-3 transition-transform duration-300">
                <Mail size={28} strokeWidth={1.2} />
              </div>
              <div className="text-left">
                <h3 className="font-serif font-semibold text-[20px] text-martinique">
                  Legacy Letters
                </h3>
                <p className="text-wellness-textSecondary text-sm mt-0.5">
                  Words across time
                </p>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full glass-thin flex items-center justify-center text-wellness-textTertiary group-hover:text-martinique group-hover:bg-white/60 transition-all border border-white/50">
              <ArrowRight size={20} />
            </div>
          </motion.button>

          {/* Companion Card (Wide) */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            onClick={() => router.push('/dashboard/companion')}
            className="col-span-2 flex items-center justify-between p-6 glass-regular rounded-[28px] group shadow-glass hover:shadow-glass-hover transition-all duration-300 active:scale-95"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-[22px] bg-gradient-to-br from-martinique/10 to-sand/30 flex items-center justify-center text-martinique border border-white/60 shadow-glass group-hover:rotate-3 transition-transform duration-300">
                <Sparkles size={28} strokeWidth={1.2} />
              </div>
              <div className="text-left">
                <h3 className="font-serif font-semibold text-[20px] text-martinique">
                  Companion
                </h3>
                <p className="text-wellness-textSecondary text-sm mt-0.5">
                  Always here to listen
                </p>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full glass-thin flex items-center justify-center text-wellness-textTertiary group-hover:text-martinique group-hover:bg-white/60 transition-all border border-white/50">
              <ArrowRight size={20} />
            </div>
          </motion.button>

          {/* Community Circles Card (Wide) - KEPT! */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            onClick={() => router.push('/authenticated/community')}
            className="col-span-2 flex items-center justify-between p-6 glass-regular rounded-[28px] group shadow-glass hover:shadow-glass-hover transition-all duration-300 active:scale-95"
          >
            <div className="flex items-center gap-6">
              <div className="flex -space-x-4 pl-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full border-[3px] border-lynx bg-sand overflow-hidden shadow-sm relative z-0 group-hover:z-10 transition-all hover:scale-110"
                  >
                    <img
                      src={`https://picsum.photos/seed/${i + 45}/100/100`}
                      className="w-full h-full object-cover opacity-90"
                      alt="community member"
                    />
                  </div>
                ))}
              </div>
              <div className="pl-2 text-left">
                <h3 className="font-serif font-semibold text-[20px] text-martinique">
                  Circles
                </h3>
                <p className="text-wellness-textSecondary text-sm mt-0.5">
                  Finding healing together
                </p>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full glass-thin flex items-center justify-center text-martinique group-hover:bg-white/60 transition-colors border border-white/50">
              <Users size={20} />
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  )
}
