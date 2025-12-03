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

  // Calculate calendar grid
  useEffect(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const lastDate = new Date(year, month + 1, 0).getDate()
    const days = Array.from({ length: lastDate }, (_, i) => i + 1)
    const paddedDays = [...Array(firstDay).fill(0), ...days]
    setDaysInMonth(paddedDays)
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
    if (day === 0) return false
    const dateStr = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return data.completedDates.includes(dateStr)
  }

  const isToday = (day: number) => {
    if (day === 0) return false
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

  return (
    <div className="h-screen w-full flex flex-col relative overflow-hidden bg-gradient-to-b from-white to-sand/30">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative pt-8 pb-12 px-6"
      >
        {/* Glow Behind Flame */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-honey/15 rounded-full blur-3xl" />

        {/* Flame Icon */}
        <div className="relative flex flex-col items-center gap-4">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="drop-shadow-lg"
          >
            <Flame
              size={32}
              fill="currentColor"
              className="text-honey"
              aria-hidden="true"
            />
          </motion.div>

          {/* Streak Number */}
          <div className="text-center">
            <div className="font-serif text-6xl font-medium text-martinique">
              {data.currentStreak}
            </div>
            <div className="text-sm font-sans font-medium text-martinique/60 tracking-wide">
              DAY STREAK
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-6 pb-40 overflow-y-auto">
        {/* Calendar Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-md"
        >
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={previousMonth}
              className="p-2 rounded-lg bg-white/40 border border-white/60 text-martinique hover:bg-white/60 transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="font-serif text-xl font-medium text-martinique text-center flex-1">
              {monthName}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 rounded-lg bg-white/40 border border-white/60 text-martinique hover:bg-white/60 transition-colors"
              aria-label="Next month"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div
                key={day}
                className="text-center text-xs font-sans font-bold text-martinique/40 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 mb-10">
            {daysInMonth.map((day, idx) => {
              const completed = isDateCompleted(day)
              const today = isToday(day)

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: idx * 0.02 }}
                  className={`relative flex flex-col items-center justify-center rounded-lg p-2 transition-all ${
                    day === 0
                      ? 'invisible'
                      : today
                        ? 'bg-honey/30 border border-honey/50'
                        : completed
                          ? 'bg-white/60 border border-white/80'
                          : 'bg-white/30 border border-white/40'
                  }`}
                >
                  {day !== 0 && (
                    <>
                      <span
                        className={`font-sans font-medium text-sm ${
                          today
                            ? 'text-honey font-bold'
                            : 'text-martinique'
                        }`}
                      >
                        {day}
                      </span>
                      {completed && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className="mt-1"
                        >
                          <Flame
                            size={14}
                            fill="currentColor"
                            className="text-honey"
                            aria-hidden="true"
                          />
                        </motion.div>
                      )}
                    </>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl bg-white/40 border border-white/60 p-4 text-center backdrop-blur-md"
            >
              <div className="font-serif text-3xl font-medium text-honey mb-1">
                {data.longestStreak}
              </div>
              <div className="text-xs font-sans font-medium text-martinique/60 uppercase tracking-wide">
                Longest Streak
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-2xl bg-white/40 border border-white/60 p-4 text-center backdrop-blur-md"
            >
              <div className="font-serif text-3xl font-medium text-honey mb-1">
                {data.totalSessions}
              </div>
              <div className="text-xs font-sans font-medium text-martinique/60 uppercase tracking-wide">
                Total Sessions
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
