'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Lock, Plus, User, Heart, ArrowRight, MailOpen } from 'lucide-react'

type Mode = 'LIST' | 'RECIPIENT' | 'DATE' | 'WRITE'
type Tab = 'WAITING' | 'DELIVERED'

// BackButton component
const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--glass-bg-regular)] text-[var(--text-main)] border border-[var(--glass-border)] shadow-sm transition-all active:scale-95 hover:bg-[var(--glass-bg-thick)]"
  >
    <ArrowLeft size={20} />
  </button>
)

export default function LettersPage() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>('LIST')
  const [activeTab, setActiveTab] = useState<Tab>('WAITING')
  const [draft, setDraft] = useState({ recipient: '', recipientName: '', date: '', content: '' })

  const goBack = () => {
    if (mode === 'LIST') router.back()
    else if (mode === 'RECIPIENT') setMode('LIST')
    else if (mode === 'DATE') setMode('RECIPIENT')
    else if (mode === 'WRITE') setMode('DATE')
  }

  const deliveryOptions = ['In 1 month', 'In 6 months', 'In 1 year', "On Mom's Birthday"]

  // List View
  if (mode === 'LIST') {
    return (
      <div className="h-full flex flex-col bg-[var(--bg-main)] pt-12 relative overflow-hidden transition-colors duration-500">
        <div className="px-6 flex items-center justify-between mb-2 relative z-10">
          <BackButton onClick={goBack} />
          <h2 className="font-serif text-2xl text-[var(--text-main)] tracking-tight">Legacy Letters</h2>
          <div className="w-10" />
        </div>

        {/* Tabs */}
        <div className="px-6 mt-6 mb-6 relative z-10">
          <div className="flex gap-8 border-b border-[var(--color-sand)]/40">
            <button
              onClick={() => setActiveTab('WAITING')}
              className={`pb-3 text-sm font-medium transition-all relative ${
                activeTab === 'WAITING' ? 'text-[var(--color-clay)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              Waiting
              {activeTab === 'WAITING' && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-clay)] rounded-t-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('DELIVERED')}
              className={`pb-3 text-sm font-medium transition-all relative ${
                activeTab === 'DELIVERED' ? 'text-[var(--color-clay)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              Delivered
              {activeTab === 'DELIVERED' && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-clay)] rounded-t-full" />
              )}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-32 relative z-10 space-y-4">
          {activeTab === 'WAITING' ? (
            <>
              {/* Existing Letter */}
              <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_20px_rgba(0,0,0,0.02)] animate-enter border border-white">
                <div className="flex justify-between items-start mb-5">
                  <div className="flex items-center gap-2 text-[var(--text-muted)] opacity-70">
                    <Lock size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Sealed</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-[var(--color-clay)]/10 text-[var(--color-clay)] text-[10px] font-semibold tracking-wide">
                    Dec 3, 2026
                  </div>
                </div>
                <h3 className="font-serif text-[28px] text-[var(--text-main)] mb-2 tracking-tight">Future Me</h3>
                <p className="text-[var(--text-muted)] text-xs">Written on Oct 15, 2025</p>
              </div>

              {/* New Letter Button */}
              <div
                onClick={() => setMode('RECIPIENT')}
                className="bg-[var(--glass-bg-thin)] rounded-[24px] h-[180px] flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-white transition-all duration-300 animate-enter delay-100 group border border-transparent hover:border-[var(--color-sand)]/30"
              >
                <div className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center text-[var(--text-muted)] group-hover:text-[var(--color-clay)] transition-colors">
                  <Plus size={24} />
                </div>
                <span className="font-serif text-xl text-[var(--text-muted)]/60 group-hover:text-[var(--text-muted)] transition-colors">
                  Write a new letter
                </span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center pt-20 animate-enter text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-amber)]/10 flex items-center justify-center text-[var(--color-amber)] mb-4">
                <MailOpen size={24} />
              </div>
              <h3 className="font-serif text-lg text-[var(--text-main)] mb-1">No delivered letters</h3>
              <p className="text-[var(--text-muted)] text-sm max-w-[200px]">
                Letters will appear here once their delivery date has passed.
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Recipient Selection
  if (mode === 'RECIPIENT') {
    const selectRecipient = (type: string, name: string) => {
      setDraft({ ...draft, recipient: type, recipientName: name })
      setTimeout(() => setMode('DATE'), 200)
    }

    return (
      <div className="h-full flex flex-col bg-[var(--bg-main)] pt-12 relative overflow-hidden transition-colors duration-500">
        <div className="px-6 flex items-center justify-between mb-4 relative z-10">
          <BackButton onClick={goBack} />
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[var(--color-clay)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--color-sand)]/50" />
            <div className="w-2 h-2 rounded-full bg-[var(--color-sand)]/50" />
          </div>
          <div className="w-10" />
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-32 relative z-10">
          <h2 className="font-serif text-3xl text-[var(--text-main)] mb-2 mt-8 animate-enter">Who is this for?</h2>

          <div className="grid gap-4 mt-8 animate-enter delay-100">
            <button
              onClick={() => selectRecipient('self', 'Future Me')}
              className="text-left glass-regular p-5 rounded-[24px] hover:border-[var(--color-amber)] transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--bg-main)] flex items-center justify-center text-[var(--text-main)] mb-3 group-hover:bg-[var(--color-amber)] group-hover:text-white transition-colors">
                <User size={24} />
              </div>
              <h3 className="font-serif text-lg text-[var(--text-main)]">Future Me</h3>
              <p className="text-xs text-[var(--text-muted)]">A message to yourself</p>
            </button>

            <button
              onClick={() => selectRecipient('loved-one', 'Mom')}
              className="text-left glass-regular p-5 rounded-[24px] hover:border-[var(--color-amber)] transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--bg-main)] flex items-center justify-center text-[var(--color-clay)] mb-3 group-hover:bg-[var(--color-amber)] group-hover:text-white transition-colors">
                <Heart size={24} />
              </div>
              <h3 className="font-serif text-lg text-[var(--text-main)]">To Mom</h3>
              <p className="text-xs text-[var(--text-muted)]">Words you wish you could say</p>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Date Selection
  if (mode === 'DATE') {
    return (
      <div className="h-full flex flex-col bg-[var(--bg-main)] pt-12 relative overflow-hidden transition-colors duration-500">
        <div className="px-6 flex items-center justify-between mb-4 relative z-10">
          <BackButton onClick={goBack} />
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[var(--color-sand)]/50" />
            <div className="w-2 h-2 rounded-full bg-[var(--color-clay)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--color-sand)]/50" />
          </div>
          <div className="w-10" />
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-32 relative z-10">
          <h2 className="font-serif text-3xl text-[var(--text-main)] mb-2 mt-8 animate-enter">When to deliver?</h2>

          <div className="space-y-3 mt-8 animate-enter delay-100">
            {deliveryOptions.map((option, i) => (
              <button
                key={i}
                onClick={() => {
                  setDraft({ ...draft, date: option })
                  setTimeout(() => setMode('WRITE'), 200)
                }}
                className="w-full flex items-center justify-between glass-regular p-4 rounded-[20px] hover:bg-white/80 text-[var(--text-main)] font-medium transition-all group"
              >
                <span>{option}</span>
                <ArrowRight
                  size={18}
                  className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[var(--color-amber)]"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Write Letter
  return (
    <div className="h-full flex flex-col bg-[var(--bg-main)] pt-12 px-6 pb-8 relative overflow-hidden transition-colors duration-500">
      <div className="flex items-center justify-between mb-4">
        <BackButton onClick={goBack} />
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[var(--color-sand)]/50" />
          <div className="w-2 h-2 rounded-full bg-[var(--color-sand)]/50" />
          <div className="w-2 h-2 rounded-full bg-[var(--color-clay)]" />
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 glass-regular rounded-[32px] p-6 mb-6 shadow-sm border border-white/60 relative flex flex-col animate-enter">
        <p className="font-serif text-xl text-[var(--text-main)] mb-4">Dear {draft.recipientName},</p>
        <textarea
          className="flex-1 w-full bg-transparent resize-none outline-none text-[var(--text-main)] leading-relaxed font-serif placeholder:text-[var(--text-muted)]"
          placeholder="Start writing here..."
          value={draft.content}
          onChange={(e) => setDraft({ ...draft, content: e.target.value })}
          autoFocus
        />
        <p className="text-xs text-[var(--text-muted)] mt-2 text-right">Arrives {draft.date}</p>
      </div>

      <button className="w-full py-4 rounded-full bg-[var(--color-amber)] text-[#2A2730] font-serif text-lg tracking-wide shadow-[0_0_30px_rgba(214,143,84,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 font-medium">
        Seal Letter
      </button>
    </div>
  )
}
