'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Volume2, Mic } from 'lucide-react'

// BackButton component
const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--glass-bg-regular)] text-[var(--text-main)] border border-[var(--glass-border)] shadow-sm transition-all active:scale-95 hover:bg-[var(--glass-bg-thick)]"
  >
    <ArrowLeft size={20} />
  </button>
)

export default function CompanionPage() {
  const router = useRouter()
  const [isListening, setIsListening] = useState(false)

  return (
    <div className="h-full flex flex-col bg-[var(--bg-main)] relative transition-colors duration-500">
      {/* Header */}
      <div className="pt-12 px-6 pb-4 flex items-center justify-between bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--glass-border)] z-20">
        <div className="flex items-center gap-3">
          <BackButton onClick={() => router.back()} />
          <div>
            <h2 className="font-serif text-xl text-[var(--text-main)]">Solace</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-sage)] animate-pulse" />
              <span className="text-[10px] uppercase font-bold text-[var(--color-sage)] tracking-wider">
                Compassionate AI
              </span>
            </div>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-[var(--bg-main)] border border-[var(--color-sand)]/50 flex items-center justify-center text-[var(--text-muted)]">
          <Volume2 size={18} />
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scroll-smooth">
        {/* AI Message */}
        <div className="flex justify-start animate-enter">
          <div className="glass-regular p-5 rounded-[24px] rounded-tl-sm border border-[var(--glass-border)] text-sm leading-relaxed shadow-sm text-[var(--text-main)] max-w-[85%]">
            Hello Michelle. How is your heart feeling today?
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[var(--nav-bg)] backdrop-blur-xl border-t border-[var(--glass-border)] mb-[80px]">
        <div className="flex items-center gap-2 bg-[var(--input-bg)] p-1.5 pl-4 rounded-[32px] border border-[var(--color-sand)]/50 shadow-sm relative">
          <input
            type="text"
            placeholder="Share your thoughts..."
            className="flex-1 bg-transparent border-none outline-none py-3 text-[var(--text-main)] placeholder:text-[var(--text-muted)] text-sm font-medium"
          />
          <button
            onClick={() => setIsListening(!isListening)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative ${
              isListening
                ? 'bg-[var(--color-sage)] text-white'
                : 'bg-transparent text-[var(--text-muted)] hover:bg-[var(--glass-bg-regular)]'
            }`}
          >
            {isListening && (
              <div className="absolute inset-0 rounded-full border border-[var(--color-sage)] mic-active-ring" />
            )}
            <Mic size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
