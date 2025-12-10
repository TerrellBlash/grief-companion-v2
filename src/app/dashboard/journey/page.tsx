'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Sparkles, BookHeart } from 'lucide-react'

// BackButton component matching Aura.build
const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--glass-bg-regular)] text-[var(--text-main)] border border-[var(--glass-border)] shadow-sm transition-all active:scale-95"
  >
    <ArrowLeft size={20} />
  </button>
);

export default function JourneyPage() {
  const router = useRouter()

  return (
    <div className="h-full flex flex-col bg-[var(--bg-main)] pt-12 relative overflow-hidden transition-colors duration-500">
      {/* Header */}
      <div className="px-6 flex items-center justify-between mb-6 relative z-10">
        <BackButton onClick={() => router.back()} />
        <h2 className="font-serif text-2xl text-[var(--text-main)]">Your Journey</h2>
        <div className="w-10" />
      </div>

      {/* Stats Card - Aura.build exact */}
      <div className="px-6 mb-8 relative z-10 animate-enter">
        <div className="glass-regular rounded-[32px] p-6 text-center">
          <p className="font-serif text-lg text-[var(--text-main)] mb-6">
            "You've saved 12 memories of Mom"
          </p>
          <div className="flex justify-between divide-x divide-[#D5C6B4]/50">
            <div className="flex-1 px-2">
              <p className="font-serif text-2xl text-[#DE9C52]">34</p>
              <p className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Candles</p>
            </div>
            <div className="flex-1 px-2">
              <p className="font-serif text-2xl text-[#DE9C52]">12</p>
              <p className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Memories</p>
            </div>
            <div className="flex-1 px-2">
              <p className="font-serif text-2xl text-[#DE9C52]">47</p>
              <p className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Journey Path Visualization */}
      <div className="flex-1 relative w-full overflow-y-auto no-scrollbar pb-32">
        {/* SVG Winding Path - Aura.build exact */}
        <svg className="absolute top-0 left-0 w-full h-[600px] pointer-events-none" preserveAspectRatio="none">
          <path
            d="M 60 0 C 60 100, 200 100, 200 200 C 200 300, 100 300, 100 400 C 100 500, 175 550, 175 600"
            fill="none"
            stroke="#D5C6B4"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
        </svg>

        {/* Milestones */}
        <div className="relative h-[600px]">
          {/* Today - Current Position */}
          <div className="absolute top-[30px] left-[60px] -translate-x-1/2 flex items-center gap-4 animate-enter delay-100">
            <div className="w-10 h-10 rounded-full bg-[var(--bg-main)] border-2 border-[#D5C6B4] flex items-center justify-center text-[#DE9C52] z-10 shadow-sm relative transition-colors duration-500">
              <Sparkles size={18} />
              <div className="absolute inset-0 rounded-full border-2 border-[#DE9C52]/20 animate-ping" />
            </div>
            <div className="glass-thin px-3 py-2 rounded-xl backdrop-blur-md">
              <p className="text-xs font-bold text-[var(--text-main)]">Today</p>
              <p className="text-[10px] text-[var(--text-muted)]">You're here now</p>
            </div>
          </div>

          {/* First Memory Milestone */}
          <div className="absolute top-[180px] right-[20%] w-full flex justify-end pr-[60px] animate-enter delay-200">
            <div className="flex flex-row-reverse items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-[var(--bg-main)] border border-[#D5C6B4] flex items-center justify-center text-[#A85846] z-10 transition-colors duration-500">
                <BookHeart size={14} />
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-[var(--text-main)]">First Memory</p>
                <p className="text-[10px] text-[var(--text-muted)]">Oct 12</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
