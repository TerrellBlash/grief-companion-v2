'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Lock, Plus, User, Heart, ArrowRight, Stamp } from 'lucide-react'

type Step = 'LIST' | 'WIZARD_1' | 'WIZARD_2' | 'WIZARD_3' | 'SEALED'

// BackButton component matching Aura.build
const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--glass-bg-regular)] text-[var(--text-main)] border border-[var(--glass-border)] shadow-sm transition-all active:scale-95"
  >
    <ArrowLeft size={20} />
  </button>
);

export default function LettersPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('LIST')
  const [recipient, setRecipient] = useState<'self' | 'loved-one' | null>(null)
  const [deliveryDate, setDeliveryDate] = useState<string>('')
  const [letterContent, setLetterContent] = useState('')

  const existingLetters = [
    {
      id: '1',
      recipient: 'For Future Me',
      writtenDate: 'Oct 15, 2025',
      deliveryDate: 'Dec 3, 2026',
    },
  ]

  const deliveryOptions = [
    'In 1 month',
    'In 6 months',
    'In 1 year',
    "On Mom's Birthday",
  ]

  // List View
  if (step === 'LIST') {
    return (
      <div className="h-full flex flex-col bg-[var(--bg-main)] pt-12 px-6 relative transition-colors duration-500">
        <div className="flex items-center justify-between mb-8">
          <BackButton onClick={() => router.back()} />
          <h2 className="font-serif text-2xl text-[var(--text-main)]">Legacy Letters</h2>
          <div className="w-10" />
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-[#D5C6B4]/40 pb-1">
          <button className="text-sm font-bold text-[#A85846] border-b-2 border-[#A85846] pb-2 px-2">Waiting</button>
          <button className="text-sm font-medium text-[var(--text-muted)] pb-2 px-2">Delivered</button>
        </div>

        {/* Letters List */}
        <div className="space-y-4 animate-enter">
          {existingLetters.map((letter) => (
            <div key={letter.id} className="glass-regular rounded-[24px] p-5 border-l-4 border-l-[#D5C6B4] relative overflow-hidden group">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Lock size={14} className="text-[var(--text-muted)]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Sealed</span>
                </div>
                <span className="text-xs text-[#A85846] bg-[#A85846]/10 px-2 py-1 rounded-full">{letter.deliveryDate}</span>
              </div>
              <h3 className="font-serif text-xl text-[var(--text-main)]">{letter.recipient}</h3>
              <p className="text-[var(--text-muted)] text-xs mt-1">Written on {letter.writtenDate}</p>
            </div>
          ))}

          {/* New Letter Button */}
          <div
            onClick={() => setStep('WIZARD_1')}
            className="glass-thin border-dashed border-2 border-[#D5C6B4] rounded-[24px] p-6 flex flex-col items-center justify-center text-[#D5C6B4] cursor-pointer hover:bg-white/10 hover:border-[#DE9C52] hover:text-[#DE9C52] transition-all gap-2 min-h-[140px]"
          >
            <Plus size={24} />
            <span className="font-serif text-lg">Write a new letter</span>
          </div>
        </div>
      </div>
    )
  }

  // Wizard Step 1: Who is this for?
  if (step === 'WIZARD_1') {
    return (
      <div className="h-full flex flex-col bg-[var(--bg-main)] pt-12 px-6 transition-colors duration-500">
        <div className="flex items-center justify-between mb-8">
          <BackButton onClick={() => setStep('LIST')} />
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#A85846]" />
            <div className="w-2 h-2 rounded-full bg-[#D5C6B4]/50" />
            <div className="w-2 h-2 rounded-full bg-[#D5C6B4]/50" />
          </div>
          <div className="w-10" />
        </div>

        <h2 className="font-serif text-3xl text-[var(--text-main)] mb-2 animate-enter">Who is this for?</h2>

        <div className="grid gap-4 mt-8 animate-enter delay-100">
          <button
            onClick={() => { setRecipient('self'); setStep('WIZARD_2'); }}
            className="text-left glass-regular p-5 rounded-[24px] hover:border-[#DE9C52] transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-[var(--bg-main)] flex items-center justify-center text-[var(--text-main)] mb-3 group-hover:bg-[#DE9C52] group-hover:text-white transition-colors">
              <User size={24} />
            </div>
            <h3 className="font-serif text-lg text-[var(--text-main)]">Future Me</h3>
            <p className="text-xs text-[var(--text-muted)]">A message to yourself</p>
          </button>

          <button
            onClick={() => { setRecipient('loved-one'); setStep('WIZARD_2'); }}
            className="text-left glass-regular p-5 rounded-[24px] hover:border-[#DE9C52] transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-[var(--bg-main)] flex items-center justify-center text-[#A85846] mb-3 group-hover:bg-[#DE9C52] group-hover:text-white transition-colors">
              <Heart size={24} />
            </div>
            <h3 className="font-serif text-lg text-[var(--text-main)]">To Mom</h3>
            <p className="text-xs text-[var(--text-muted)]">Words you wish you could say</p>
          </button>
        </div>
      </div>
    )
  }

  // Wizard Step 2: When to deliver?
  if (step === 'WIZARD_2') {
    return (
      <div className="h-full flex flex-col bg-[var(--bg-main)] pt-12 px-6 transition-colors duration-500">
        <div className="flex items-center justify-between mb-8">
          <BackButton onClick={() => setStep('WIZARD_1')} />
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#D5C6B4]/50" />
            <div className="w-2 h-2 rounded-full bg-[#A85846]" />
            <div className="w-2 h-2 rounded-full bg-[#D5C6B4]/50" />
          </div>
          <div className="w-10" />
        </div>

        <h2 className="font-serif text-3xl text-[var(--text-main)] mb-2 animate-enter">When to deliver?</h2>

        <div className="space-y-3 mt-8 animate-enter delay-100">
          {deliveryOptions.map((t, i) => (
            <button
              key={i}
              onClick={() => { setDeliveryDate(t); setStep('WIZARD_3'); }}
              className="w-full flex items-center justify-between glass-regular p-4 rounded-[20px] hover:bg-white/10 text-[var(--text-main)] font-medium transition-all group"
            >
              <span>{t}</span>
              <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#DE9C52]" />
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Wizard Step 3: Write Letter
  if (step === 'WIZARD_3') {
    return (
      <div className="h-full flex flex-col bg-[var(--bg-main)] pt-12 px-6 pb-8 transition-colors duration-500">
        <div className="flex items-center justify-between mb-4">
          <BackButton onClick={() => setStep('WIZARD_2')} />
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#D5C6B4]/50" />
            <div className="w-2 h-2 rounded-full bg-[#D5C6B4]/50" />
            <div className="w-2 h-2 rounded-full bg-[#A85846]" />
          </div>
          <div className="w-10" />
        </div>

        <div className="flex-1 glass-regular rounded-[32px] p-6 mb-6 shadow-sm border border-white/60 relative flex flex-col animate-enter">
          <p className="font-serif text-xl text-[var(--text-main)] mb-4">
            Dear {recipient === 'self' ? 'Future Me' : 'Mom'},
          </p>
          <textarea
            className="flex-1 w-full bg-transparent resize-none outline-none text-[var(--text-main)] leading-relaxed font-serif placeholder:text-[var(--text-muted)]"
            placeholder="Start writing here..."
            value={letterContent}
            onChange={(e) => setLetterContent(e.target.value)}
            autoFocus
          />
          <p className="text-xs text-[var(--text-muted)] mt-2 text-right">Arrives Dec 3, 2026</p>
        </div>

        <button
          onClick={() => setStep('SEALED')}
          className="w-full py-4 rounded-full bg-[#DE9C52] text-[#202030] font-serif text-lg tracking-wide shadow-[0_0_30px_rgba(222,156,82,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 font-medium"
        >
          <Stamp size={20} />
          Seal Letter
        </button>
      </div>
    )
  }

  // Sealed Confirmation
  if (step === 'SEALED') {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-[var(--bg-main)] px-8 text-center relative overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 noise-texture opacity-30" />

        {/* Envelope with Wax Seal */}
        <div className="relative mb-12">
          <div className="w-48 h-32 bg-[#D5C6B4]/40 rounded-lg shadow-xl flex items-center justify-center border border-[#D5C6B4] relative overflow-hidden">
            {/* Envelope flap */}
            <div className="absolute top-0 left-0 w-full h-full border-t-[64px] border-r-[96px] border-l-[96px] border-t-[#D5C6B4]/70 border-r-transparent border-l-transparent z-10 drop-shadow-sm" />

            {/* Wax seal with animation */}
            <div className="absolute z-20 w-16 h-16 rounded-full bg-gradient-to-br from-[#A85846] to-[#3C3748] shadow-[0_4px_12px_rgba(0,0,0,0.2)] flex items-center justify-center text-[#F7F7F7]/90 animate-[wax-drip_0.6s_ease-out_forwards]">
              <div className="w-12 h-12 rounded-full border-2 border-[#F7F7F7]/20 flex items-center justify-center animate-[stamp-press_0.4s_ease-out_0.5s_backwards]">
                <Heart size={24} fill="currentColor" />
              </div>
            </div>
          </div>
        </div>

        <h2 className="font-serif text-3xl text-[var(--text-main)] mb-3 animate-enter delay-500">Letter Sealed</h2>
        <p className="text-[var(--text-muted)] text-sm mb-8 animate-enter delay-500">It will arrive safely on Dec 3, 2026.</p>

        <button
          onClick={() => {
            setStep('LIST')
            setLetterContent('')
            setRecipient(null)
            setDeliveryDate('')
          }}
          className="glass-regular px-8 py-3 rounded-full text-[var(--text-main)] font-medium hover:bg-white/10 transition-all animate-enter delay-500 border border-[#D5C6B4]"
        >
          Return to List
        </button>
      </div>
    )
  }

  return null
}
