'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Lock,
  Plus,
  User,
  Heart,
  ArrowRight,
  Stamp,
} from 'lucide-react'

type Step = 'LIST' | 'WIZARD_1' | 'WIZARD_2' | 'WIZARD_3' | 'SEALED'

export default function LettersPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('LIST')
  const [recipient, setRecipient] = useState<'self' | 'loved-one' | null>(null)
  const [deliveryDate, setDeliveryDate] = useState<string>('')
  const [letterContent, setLetterContent] = useState('')

  // Mock data
  const existingLetters = [
    {
      id: '1',
      recipient: 'Future Me',
      writtenDate: 'Oct 15, 2025',
      deliveryDate: 'Dec 3, 2026',
      isSealed: true,
      isDelivered: false,
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
      <div className="min-h-screen bg-lynx flex flex-col pt-12 px-6">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center hover:bg-white/80 transition-all active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-howl" />
          </button>
          <h2 className="font-serif text-2xl text-howl">Legacy Letters</h2>
          <div className="w-10" />
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-sand/40 pb-1">
          <button className="text-sm font-bold text-spice border-b-2 border-spice pb-2 px-2">
            Waiting
          </button>
          <button className="text-sm font-medium text-howl/40 pb-2 px-2">
            Delivered
          </button>
        </div>

        {/* Letters List */}
        <div className="space-y-4 animate-enter">
          {existingLetters.map((letter) => (
            <div
              key={letter.id}
              className="glass-regular rounded-3xl p-5 border-l-4 border-l-sand"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-howl/40" />
                  <span className="text-xs font-bold uppercase tracking-wider text-howl/60">
                    Sealed
                  </span>
                </div>
                <span className="text-xs text-spice bg-spice/10 px-2 py-1 rounded-full">
                  {letter.deliveryDate}
                </span>
              </div>
              <h3 className="font-serif text-xl text-howl">{letter.recipient}</h3>
              <p className="text-howl/50 text-xs mt-1">
                Written on {letter.writtenDate}
              </p>
            </div>
          ))}

          {/* New Letter Button */}
          <button
            onClick={() => setStep('WIZARD_1')}
            className="w-full glass-thin border-dashed border-2 border-sand rounded-3xl p-6 flex flex-col items-center justify-center text-sand hover:bg-white/40 hover:border-honey hover:text-honey transition-all gap-2 min-h-[140px]"
          >
            <Plus className="w-6 h-6" />
            <span className="font-serif text-lg">Write a new letter</span>
          </button>
        </div>
      </div>
    )
  }

  // Wizard Step 1: Choose Recipient
  if (step === 'WIZARD_1') {
    return (
      <div className="min-h-screen bg-lynx flex flex-col pt-12 px-6">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setStep('LIST')}
            className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center hover:bg-white/80 transition-all active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-howl" />
          </button>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-spice" />
            <div className="w-2 h-2 rounded-full bg-sand/50" />
            <div className="w-2 h-2 rounded-full bg-sand/50" />
          </div>
          <div className="w-10" />
        </div>

        <h2 className="font-serif text-3xl text-howl mb-2 animate-enter">
          Who is this for?
        </h2>

        <div className="grid gap-4 mt-8 animate-enter delay-100">
          <button
            onClick={() => {
              setRecipient('self')
              setStep('WIZARD_2')
            }}
            className="text-left glass-regular p-5 rounded-3xl hover:border-honey transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-lynx flex items-center justify-center text-howl mb-3 group-hover:bg-honey group-hover:text-white transition-colors">
              <User className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg text-howl">Future Me</h3>
            <p className="text-xs text-howl/50">A message to yourself</p>
          </button>

          <button
            onClick={() => {
              setRecipient('loved-one')
              setStep('WIZARD_2')
            }}
            className="text-left glass-regular p-5 rounded-3xl hover:border-honey transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-lynx flex items-center justify-center text-spice mb-3 group-hover:bg-honey group-hover:text-white transition-colors">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg text-howl">To Mom</h3>
            <p className="text-xs text-howl/50">Words you wish you could say</p>
          </button>
        </div>
      </div>
    )
  }

  // Wizard Step 2: Choose Delivery Date
  if (step === 'WIZARD_2') {
    return (
      <div className="min-h-screen bg-lynx flex flex-col pt-12 px-6">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setStep('WIZARD_1')}
            className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center hover:bg-white/80 transition-all active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-howl" />
          </button>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-sand/50" />
            <div className="w-2 h-2 rounded-full bg-spice" />
            <div className="w-2 h-2 rounded-full bg-sand/50" />
          </div>
          <div className="w-10" />
        </div>

        <h2 className="font-serif text-3xl text-howl mb-2 animate-enter">
          When to deliver?
        </h2>

        <div className="space-y-3 mt-8 animate-enter delay-100">
          {deliveryOptions.map((option, i) => (
            <button
              key={i}
              onClick={() => {
                setDeliveryDate(option)
                setStep('WIZARD_3')
              }}
              className="w-full flex items-center justify-between glass-regular p-4 rounded-2xl hover:bg-white text-howl font-medium transition-all group"
            >
              <span>{option}</span>
              <ArrowRight className="w-[18px] h-[18px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-honey" />
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Wizard Step 3: Write Letter
  if (step === 'WIZARD_3') {
    return (
      <div className="min-h-screen bg-lynx flex flex-col pt-12 px-6 pb-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setStep('WIZARD_2')}
            className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center hover:bg-white/80 transition-all active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-howl" />
          </button>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-sand/50" />
            <div className="w-2 h-2 rounded-full bg-sand/50" />
            <div className="w-2 h-2 rounded-full bg-spice" />
          </div>
          <div className="w-10" />
        </div>

        <div className="flex-1 glass-regular rounded-[32px] p-6 mb-6 shadow-sm border border-white/60 relative flex flex-col animate-enter">
          <p className="font-serif text-xl text-howl mb-4">
            Dear {recipient === 'self' ? 'Future Me' : 'Mom'},
          </p>
          <textarea
            className="flex-1 w-full bg-transparent resize-none outline-none text-howl leading-relaxed font-serif placeholder:text-howl/20 min-h-[300px]"
            placeholder="Start writing here..."
            value={letterContent}
            onChange={(e) => setLetterContent(e.target.value)}
            autoFocus
          />
          <p className="text-xs text-howl/40 mt-2 text-right">
            Arrives {deliveryDate}
          </p>
        </div>

        <button
          onClick={() => setStep('SEALED')}
          disabled={!letterContent.trim()}
          className="w-full py-4 rounded-full bg-spice text-lynx font-serif text-lg tracking-wide shadow-[0_0_30px_rgba(168,88,70,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Stamp className="w-5 h-5" />
          Seal Letter
        </button>
      </div>
    )
  }

  // Sealed Confirmation
  if (step === 'SEALED') {
    return (
      <div className="min-h-screen bg-lynx flex flex-col items-center justify-center px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 noise-texture opacity-30" />

        {/* Wax Seal Animation */}
        <div className="relative mb-12">
          <div className="w-48 h-32 bg-sand/40 rounded-lg shadow-xl flex items-center justify-center border border-sand relative overflow-hidden">
            {/* Envelope flap */}
            <div className="absolute top-0 left-0 w-full h-full border-t-[64px] border-r-[96px] border-l-[96px] border-t-sand/70 border-r-transparent border-l-transparent z-10 drop-shadow-sm" />

            {/* Wax seal */}
            <motion.div
              className="absolute z-20 w-16 h-16 rounded-full bg-gradient-to-br from-spice to-howl shadow-lg flex items-center justify-center text-lynx/80"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <motion.div
                className="w-12 h-12 rounded-full border-2 border-lynx/20 flex items-center justify-center"
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4, ease: 'easeOut' }}
              >
                <Heart className="w-6 h-6 fill-current" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.h2
          className="font-serif text-3xl text-howl mb-3"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Letter Sealed
        </motion.h2>
        <motion.p
          className="text-howl/60 text-sm mb-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          It will arrive safely {deliveryDate}.
        </motion.p>

        <motion.button
          onClick={() => {
            setStep('LIST')
            setLetterContent('')
            setRecipient(null)
            setDeliveryDate('')
          }}
          className="glass-regular px-8 py-3 rounded-full text-howl font-medium hover:bg-white transition-all"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          Return to Letters
        </motion.button>
      </div>
    )
  }

  return null
}
