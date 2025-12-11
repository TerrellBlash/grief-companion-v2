'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Settings, Flame, Users, Archive, Mail, ArrowRight, X } from 'lucide-react';

// Avatar component
const Avatar = ({ initial }: { initial: string }) => (
  <div className="w-8 h-8 rounded-full bg-[#D5C6B4] border-[3px] border-[var(--bg-main)] flex items-center justify-center text-[10px] font-bold text-[#202030] relative -ml-3 first:ml-0 transition-colors duration-500">
    {initial}
  </div>
);

// Nudge Banner
const NudgeBanner = ({ onDismiss }: { onDismiss: () => void }) => (
  <div className="mx-5 mb-6 glass-thin border-l-4 border-l-[#DE9C52] p-4 rounded-r-[16px] rounded-l-[4px] relative animate-enter shadow-sm flex items-start gap-3">
    <div className="min-w-[24px] pt-0.5 text-[#A85846]">
      <Flame size={20} />
    </div>
    <div className="flex-1">
      <p className="font-serif text-[var(--text-main)] text-lg leading-tight mb-1">
        Your space is here whenever you need it.
      </p>
      <p className="text-[var(--text-muted)] text-xs">
        Tomorrow marks one year since Mom&apos;s passing.
      </p>
    </div>
    <button onClick={onDismiss} className="text-[var(--text-muted)] hover:text-[var(--text-main)]">
      <X size={16} />
    </button>
  </div>
);

export default function HomeContent() {
  const [showNudge, setShowNudge] = useState(true);
  const timeOfDay = new Date().getHours() < 12 ? 'Morning' : 'Evening';
  const dayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="pb-32 min-h-full aurora-bg relative transition-colors duration-500">
      {/* Noise Texture */}
      <div className="absolute inset-0 noise-texture pointer-events-none z-0 mix-blend-overlay" />

      {/* Header */}
      <header className="pt-14 px-8 mb-6 relative z-10 animate-enter flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DE9C52] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DE9C52]" />
            </span>
            <p className="text-[#A85846] font-semibold text-xs uppercase tracking-[0.15em] opacity-80">
              {dayOfWeek} {timeOfDay}
            </p>
          </div>
          <h1 className="font-serif text-[32px] leading-[1.1] text-[var(--text-main)] tracking-tight">
            <span className="opacity-70 font-normal">Welcome home,</span>
            <br />
            <span className="font-hand text-[#A85846] text-4xl relative top-1">Michelle</span>
          </h1>
        </div>
        <Link
          href="/dashboard/settings"
          className="w-10 h-10 rounded-full glass-thin flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] active:scale-95 transition-all no-underline"
        >
          <Settings size={20} />
        </Link>
      </header>

      {/* Nudge Banner */}
      {showNudge && <NudgeBanner onDismiss={() => setShowNudge(false)} />}

      {/* Cards Grid - EXACT Aura.build Layout */}
      <div className="px-5 grid grid-cols-2 gap-4 relative z-10">

        {/* Candle Card - col-span-2 (full width) */}
        <Link
          href="/rituals/candle"
          className="col-span-2 aspect-[16/9] rounded-[36px] relative overflow-hidden cursor-pointer group animate-enter delay-100 shadow-xl shadow-[#A85846]/10 transition-all duration-700 hover:shadow-2xl hover:shadow-[#A85846]/15 hover:-translate-y-1 no-underline block"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#202030] via-[#A85846] to-[#DE9C52] transition-transform duration-[2s] group-hover:scale-105" />
          <div className="absolute inset-0 noise-texture opacity-20 mix-blend-overlay" />
          <div className="relative z-10 p-7 h-full flex flex-col justify-between">
            <div className="glass-thin px-3 py-1.5 rounded-full flex items-center gap-2 w-fit border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#DE9C52] shadow-[0_0_8px_#DE9C52]" />
              <span className="text-[10px] font-bold tracking-[0.15em] text-[#F7F7F7]">DAILY RITUAL</span>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <h2 className="font-serif text-3xl text-[#F7F7F7] leading-none mb-2 drop-shadow-lg">
                  Light a<br />Candle
                </h2>
                <p className="text-[#D5C6B4] text-xs font-medium tracking-wide">Reflect & remember.</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-[#DE9C52] border border-white/20 group-hover:bg-white/20 transition-all shadow-[0_0_20px_rgba(222,156,82,0.3)]">
                <Flame size={22} className="flame-core" fill="currentColor" />
              </div>
            </div>
          </div>
        </Link>

        {/* Community Circles - col-span-2 (full width) */}
        <Link
          href="/dashboard/community"
          className="col-span-2 glass-regular rounded-[32px] p-5 relative overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#A85846]/10 active:scale-[0.98] animate-enter delay-200 flex flex-col justify-between group border-l-4 border-l-[#DE9C52] no-underline block"
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Users size={16} className="text-[#DE9C52]" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#DE9C52]">Community</span>
              </div>
              <h3 className="font-serif text-xl text-[var(--text-main)]">Circles</h3>
            </div>
            <div className="flex items-center pl-3">
              <Avatar initial="S" />
              <Avatar initial="M" />
              <div className="w-8 h-8 rounded-full bg-[#DE9C52] text-white flex items-center justify-center text-[10px] font-bold relative -ml-3 shadow-md">
                +3
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="text-xs text-[var(--text-muted)]">
              5 people in <span className="font-semibold text-[#A85846]">Loss of a Parent</span>
            </p>
            <ArrowRight size={16} className="text-[var(--text-muted)] group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Memory Jar - col-span-1 (half width) */}
        <Link
          href="/dashboard/memories"
          className="col-span-1 glass-regular rounded-[32px] p-5 relative overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#A85846]/10 active:scale-[0.98] animate-enter delay-300 flex flex-col justify-between min-h-[140px] no-underline block"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F7F7F7] to-[#D5C6B4]/60 border border-white flex items-center justify-center text-[#A85846]">
            <Archive size={20} />
          </div>
          <div>
            <h3 className="font-serif text-lg text-[var(--text-main)] leading-tight">Memory Jar</h3>
            <p className="text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-wider mt-2">Store Moments</p>
          </div>
        </Link>

        {/* Letters - col-span-1 (half width) */}
        <Link
          href="/dashboard/letters"
          className="col-span-1 glass-regular rounded-[32px] p-5 relative overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#A85846]/10 active:scale-[0.98] animate-enter delay-400 flex flex-col justify-between min-h-[140px] no-underline block"
        >
          <div className="w-10 h-10 rounded-xl bg-[#A85846]/10 flex items-center justify-center text-[#A85846]">
            <Mail size={20} />
          </div>
          <div>
            <h3 className="font-serif text-lg text-[var(--text-main)] leading-tight">Letters</h3>
            <p className="text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-wider mt-2">Legacy Notes</p>
          </div>
        </Link>

      </div>
    </div>
  );
}
