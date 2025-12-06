'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react'
import type { StreakData } from '@/lib/services/streaks'

interface StreakContentProps {
  data: StreakData
}

export function StreakContent({ data }: StreakContentProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [daysInMonth, setDaysInMonth] = useState<number[]>([])
  const [startDayOffset, setStartDayOffset] = useState(0)

  // Calculate calendar grid
  useEffect(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const lastDate = new Date(year, month + 1, 0).getDate()
    setStartDayOffset(firstDay)
    setDaysInMonth(Array.from({ length: lastDate }, (_, i) => i + 1))
  }, [currentDate])

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    )
  }

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    )
  }

  const isDateCompleted = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return data.completedDates.includes(dateStr)
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    )
  }

  const monthName = currentDate.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  })

  // Get previous month's last days for padding
  const prevMonthLastDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate()

  const renderCalendarDays = () => {
    const days = []

    // Previous month padding
    for (let i = 0; i < startDayOffset; i++) {
      days.push(
        <div key={`prev-${i}`} className="h-12 flex items-center justify-center text-martinique/20 text-sm">
          {prevMonthLastDate - (startDayOffset - 1) + i}
        </div>
      )
    }

    // Current month days
    for (const day of daysInMonth) {
      const today = isToday(day)
      const completed = isDateCompleted(day)

      days.push(
        <div key={day} className="flex flex-col items-center justify-center h-12 relative group cursor-pointer">
          <div className={`
            w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-medium transition-all relative z-10
            ${today ? 'bg-warning text-white font-bold shadow-lg scale-110' : 'text-martinique'}
            ${completed && !today ? 'bg-warning/20 text-warning font-semibold' : 'group-hover:bg-white/40'}
          `}>
            {day}
          </div>

          {/* Flame dot for completed days */}
          {completed && (
            <div className="absolute -bottom-1 z-20">
              <div className={`w-1.5 h-1.5 rounded-full ${today ? 'bg-warning' : 'bg-warning'} shadow-[0_0_8px_#C4A77D]`} />
            </div>
          )}
        </div>
      )
    }

    return days
  }

  return (
    <div className="min-h-screen flex flex-col pb-40">
      <div className="flex-1 overflow-y-auto hide-scrollbar px-6">

        {/* Hero Section - 3D Floating Flame */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center py-10 relative"
        >
          <div className="relative mb-6 animate-float">
            <div className="absolute inset-0 bg-warning/40 blur-[50px] opacity-70 rounded-full scale-150 animate-pulse" />
            <div className="w-32 h-32 glass-regular rounded-full flex items-center justify-center shadow-glass-deep border-t border-white/60 relative z-10">
              <Flame size={60} className="text-warning fill-warning drop-shadow-md" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="font-serif text-[64px] font-medium text-martinique mb-0 leading-none drop-shadow-sm">
            {data.currentStreak}
          </h1>
          <p className="font-sans text-martinique/60 text-xs font-bold uppercase tracking-[0.2em]">
            Day Streak
          </p>
        </motion.div>

        {/* Calendar Card - Floating Glass Panel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-regular rounded-[32px] p-8 mb-6 shadow-glass-hover backdrop-blur-xl border border-white/40"
        >
          <div className="flex items-center justify-between mb-6 px-2">
            <h3 className="font-serif font-semibold text-martinique text-xl">{monthName}</h3>
            <div className="flex gap-2 text-martinique/60">
              <button
                onClick={previousMonth}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/50 transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextMonth}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/50 transition-colors"
                aria-label="Next month"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 mb-4">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <div key={i} className="text-center text-[10px] font-bold text-martinique/40 uppercase tracking-widest py-2">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1">
            {renderCalendarDays()}
          </div>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-regular rounded-[28px] p-6"
          >
            <p className="text-[10px] font-bold text-martinique/60 uppercase tracking-wider mb-3">
              Longest streak
            </p>
            <div className="flex items-end gap-2">
              <p className="font-serif text-3xl font-medium text-martinique">{data.longestStreak}</p>
              <p className="text-sm text-martinique/40 mb-1.5 font-medium">days</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-regular rounded-[28px] p-6"
          >
            <p className="text-[10px] font-bold text-martinique/60 uppercase tracking-wider mb-3">
              Total Sessions
            </p>
            <div className="flex items-end gap-2">
              <p className="font-serif text-3xl font-medium text-martinique">{data.totalSessions}</p>
              <p className="text-sm text-martinique/40 mb-1.5 font-medium">sessions</p>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  )
}
