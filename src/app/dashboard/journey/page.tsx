'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Sparkles, BookHeart } from 'lucide-react'

// BackButton component
const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--glass-bg-regular)] text-[var(--text-main)] border border-[var(--glass-border)] shadow-sm transition-all active:scale-95 hover:bg-[var(--glass-bg-thick)]"
  >
    <ArrowLeft size={20} />
  </button>
)

export default function JourneyPage() {
  const router = useRouter()

  return (
    <div className="h-full flex flex-col bg-[#F5F2ED] relative overflow-hidden transition-colors duration-500">
      <div className="pt-12 px-6 pb-4 relative z-20">
        <div className="flex items-center justify-between mb-6">
          <BackButton onClick={() => router.back()} />
          <h2 className="font-serif text-2xl text-[var(--text-main)]">Your Journey</h2>
          <div className="w-10" />
        </div>

        {/* Stats Card */}
        <div className="glass-opaque backdrop-blur-md rounded-[32px] p-6 shadow-sm border border-white/50 animate-enter">
          <h3 className="font-serif text-lg text-[var(--text-main)] text-center mb-6 leading-tight">
            &quot;You&apos;ve saved 12 memories of Mom&quot;
          </h3>
          <div className="flex justify-between items-center px-2 relative">
            <div className="absolute left-1/3 top-2 bottom-2 w-px bg-[var(--color-sand)]/40" />
            <div className="absolute right-1/3 top-2 bottom-2 w-px bg-[var(--color-sand)]/40" />
            <div className="flex-1 text-center">
              <div className="font-serif text-2xl text-[var(--color-amber)] mb-1">34</div>
              <div className="text-[9px] font-bold tracking-[0.15em] text-[var(--color-clay)]/60 uppercase font-sans">
                Candles
              </div>
            </div>
            <div className="flex-1 text-center">
              <div className="font-serif text-2xl text-[var(--color-amber)] mb-1">12</div>
              <div className="text-[9px] font-bold tracking-[0.15em] text-[var(--color-clay)]/60 uppercase font-sans">
                Memories
              </div>
            </div>
            <div className="flex-1 text-center">
              <div className="font-serif text-2xl text-[var(--color-amber)] mb-1">47</div>
              <div className="text-[9px] font-bold tracking-[0.15em] text-[var(--color-clay)]/60 uppercase font-sans">
                Days
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Journey Path Visualization */}
      <div className="flex-1 relative w-full overflow-y-auto no-scrollbar" style={{ perspective: '1000px' }}>
        <div className="min-h-[600px] relative w-full pb-32">
          {/* SVG Winding Path */}
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 390 800"
            preserveAspectRatio="none"
          >
            <path
              d="M 65 50 C 65 150, 320 150, 320 320 C 320 480, 100 500, 100 650"
              fill="none"
              stroke="var(--color-sand)"
              strokeWidth="2"
              strokeDasharray="8 8"
              strokeLinecap="round"
              className="opacity-60"
            />
          </svg>

          {/* Today Milestone */}
          <div className="absolute top-[50px] left-[20px] flex items-center gap-4 animate-enter delay-100 z-10">
            <div className="w-14 h-14 rounded-full bg-[#F9F7F5] border-2 border-[var(--color-amber)]/20 flex items-center justify-center text-[var(--color-amber)] shadow-sm relative group">
              <div className="absolute inset-0 bg-[var(--color-amber)]/10 rounded-full animate-pulse" />
              <Sparkles size={22} />
            </div>
            <div className="glass-opaque px-4 py-2 rounded-xl border border-white/50 shadow-sm">
              <p className="font-bold text-sm text-[var(--text-main)] mb-0.5">Today</p>
              <p className="text-[11px] text-[var(--text-muted)] font-medium">You&apos;re here now</p>
            </div>
          </div>

          {/* First Memory Milestone */}
          <div className="absolute top-[300px] right-[20px] flex flex-row-reverse items-center gap-4 animate-enter delay-200 z-10">
            <div className="w-12 h-12 rounded-full bg-[#F9F7F5] border-2 border-[var(--color-clay)]/20 flex items-center justify-center text-[var(--color-clay)] shadow-sm">
              <BookHeart size={20} />
            </div>
            <div className="glass-opaque px-4 py-2 rounded-xl border border-white/50 shadow-sm text-right">
              <p className="font-bold text-sm text-[var(--text-main)] mb-0.5">First Memory</p>
              <p className="text-[11px] text-[var(--text-muted)] font-medium">Oct 12</p>
            </div>
          </div>

          {/* Week 1 Milestone */}
          <div className="absolute top-[500px] left-[60px] flex items-center gap-4 animate-enter delay-300 z-10">
            <div className="w-10 h-10 rounded-full bg-[var(--color-sand)]/20 border border-[var(--color-sand)]/40 flex items-center justify-center text-[var(--color-stone)] shadow-sm">
              <span className="text-xs font-bold">1</span>
            </div>
            <div className="glass-opaque px-4 py-2 rounded-xl border border-white/50 shadow-sm">
              <p className="font-bold text-sm text-[var(--text-main)] mb-0.5">Week 1</p>
              <p className="text-[11px] text-[var(--text-muted)] font-medium">Your journey begins</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
