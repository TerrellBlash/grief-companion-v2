'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Flame } from 'lucide-react'

// BackButton component
const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--glass-bg-regular)] text-[var(--text-main)] border border-[var(--glass-border)] shadow-sm transition-all active:scale-95 hover:bg-[var(--glass-bg-thick)]"
  >
    <ArrowLeft size={20} />
  </button>
)

export default function RitualStreakPage() {
  const router = useRouter()
  const today = new Date()
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
  const monthName = today.toLocaleString('default', { month: 'long' })

  // Sample streak data - days with completed rituals
  const streakData = [1, 2, 3, 5, 6, 7, 8, 10, 12, 13, 14, 15, 18, 19, 20, 21, 22]
  const currentStreak = 5

  const renderCalendar = () => {
    const days = []
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = i === today.getDate()
      const hasRitual = streakData.includes(i)
      const isFuture = i > today.getDate()

      days.push(
        <div key={i} className="aspect-square flex flex-col items-center justify-center relative">
          {hasRitual && !isFuture && (
            <div className="absolute inset-0 m-1 bg-[var(--color-amber)]/10 rounded-full z-0" />
          )}
          {isToday && (
            <div className="absolute inset-0 m-1 border-2 border-[var(--color-clay)] rounded-full z-10" />
          )}
          <span
            className={`relative z-10 text-xs font-medium ${
              hasRitual
                ? 'text-[var(--color-amber)] font-bold'
                : isFuture
                ? 'text-[var(--text-muted)]/30'
                : 'text-[var(--text-muted)]'
            }`}
          >
            {i}
          </span>
          {hasRitual && <div className="w-1 h-1 rounded-full bg-[var(--color-amber)] mt-0.5" />}
        </div>
      )
    }
    return days
  }

  return (
    <div className="h-full flex flex-col bg-[var(--bg-main)] pt-12 relative overflow-hidden transition-colors duration-500">
      {/* Header */}
      <div className="px-6 flex items-center justify-between mb-2 relative z-10">
        <BackButton onClick={() => router.back()} />
        <h2 className="font-serif text-2xl text-[var(--text-main)] tracking-tight">Ritual Streak</h2>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-32 pt-6 relative z-10">
        {/* Streak Summary */}
        <div className="text-center mb-10 animate-enter">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-[var(--color-amber)]/20 bg-[var(--color-amber)]/5 mb-4 relative">
            <Flame size={32} className="text-[var(--color-amber)]" fill="currentColor" />
            <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[var(--color-clay)] flex items-center justify-center text-white text-[10px] font-bold shadow-md animate-bounce">
              +1
            </div>
          </div>
          <h3 className="font-serif text-4xl text-[var(--text-main)] mb-1">{currentStreak} Day Streak</h3>
          <p className="text-[var(--text-muted)] text-sm">You&apos;ve found time for them this week.</p>
        </div>

        {/* Calendar Card */}
        <div className="glass-regular rounded-[32px] p-6 animate-enter delay-100">
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-clay)] opacity-80 mb-1">
                {today.getFullYear()}
              </p>
              <h4 className="font-serif text-2xl text-[var(--text-main)]">{monthName}</h4>
            </div>
            <div className="flex gap-1 items-center">
              <div className="w-2 h-2 rounded-full bg-[var(--color-amber)]" />
              <span className="text-[10px] font-medium text-[var(--text-muted)]">Ritual Complete</span>
            </div>
          </div>

          {/* Day Labels */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <div
                key={i}
                className="text-center text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider py-2"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
        </div>
      </div>
    </div>
  )
}
