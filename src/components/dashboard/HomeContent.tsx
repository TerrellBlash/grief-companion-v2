'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Settings, Flame, Users, Archive, Mail, Sparkles, ArrowRight, X } from 'lucide-react';

export default function HomeContent() {
  const [showNudge, setShowNudge] = useState(true);
  const timeOfDay = new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening';
  const dayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="min-h-full aurora-bg relative" style={{ paddingBottom: '160px' }}>
      {/* Noise Texture */}
      <div className="absolute inset-0 noise-texture pointer-events-none z-0 mix-blend-overlay" />

      {/* Header */}
      <header className="pt-14 px-6 mb-6 relative z-10 animate-enter flex justify-between items-start">
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
          className="w-10 h-10 rounded-full glass-thin flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] active:scale-95 transition-all"
        >
          <Settings size={20} />
        </Link>
      </header>

      {/* Nudge Banner */}
      {showNudge && (
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
          <button
            onClick={() => setShowNudge(false)}
            className="text-[var(--text-muted)] hover:text-[var(--text-main)]"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Cards - VERTICAL LAYOUT */}
      <div className="px-5 space-y-4 relative z-10">
        {/* Candle Card - Full Width Gradient */}
        <Link
          href="/rituals/candle"
          className="block aspect-[16/9] rounded-[36px] relative overflow-hidden cursor-pointer group animate-enter delay-100 shadow-xl shadow-[#A85846]/10 transition-all duration-700 hover:shadow-2xl hover:shadow-[#A85846]/15 hover:-translate-y-1"
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

        {/* Memory Jar - Full Width */}
        <Link
          href="/dashboard/memories"
          className="block glass-regular rounded-[32px] p-5 relative overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#A85846]/10 active:scale-[0.98] animate-enter delay-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F7F7F7] to-[#D5C6B4]/60 dark:from-[#2A2A35] dark:to-[#3A3A45] border border-white/50 dark:border-white/10 flex items-center justify-center text-[#A85846]">
                <Archive size={24} />
              </div>
              <div>
                <h3 className="font-serif text-xl text-[var(--text-main)]">Memory Jar</h3>
                <p className="text-[var(--text-muted)] text-sm">Save a thought for today</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/80 dark:bg-white/10 flex items-center justify-center text-[var(--text-muted)]">
              <ArrowRight size={18} />
            </div>
          </div>
        </Link>

        {/* Legacy Letters - Full Width */}
        <Link
          href="/dashboard/letters"
          className="block glass-regular rounded-[32px] p-5 relative overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#A85846]/10 active:scale-[0.98] animate-enter delay-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#A85846]/10 flex items-center justify-center text-[#A85846]">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-serif text-xl text-[var(--text-main)]">Legacy Letters</h3>
                <p className="text-[var(--text-muted)] text-sm">Words across time</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/80 dark:bg-white/10 flex items-center justify-center text-[var(--text-muted)]">
              <ArrowRight size={18} />
            </div>
          </div>
        </Link>

        {/* Companion - Full Width */}
        <Link
          href="/dashboard/companion"
          className="block glass-regular rounded-[32px] p-5 relative overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#A85846]/10 active:scale-[0.98] animate-enter delay-400"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#DE9C52]/10 flex items-center justify-center text-[#DE9C52]">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="font-serif text-xl text-[var(--text-main)]">Companion</h3>
                <p className="text-[var(--text-muted)] text-sm">Always here to listen</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/80 dark:bg-white/10 flex items-center justify-center text-[var(--text-muted)]">
              <ArrowRight size={18} />
            </div>
          </div>
        </Link>

        {/* Community Circles - Full Width */}
        <Link
          href="/authenticated/community"
          className="block glass-regular rounded-[32px] p-5 relative overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#A85846]/10 active:scale-[0.98] animate-enter delay-500 border-l-4 border-l-[#DE9C52]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#D5C6B4]/20 flex items-center justify-center text-[#A85846]">
                <Users size={24} />
              </div>
              <div>
                <h3 className="font-serif text-xl text-[var(--text-main)]">Circles</h3>
                <p className="text-[var(--text-muted)] text-sm">Finding healing together</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#D5C6B4] border-2 border-[var(--bg-main)] flex items-center justify-center text-[10px] font-bold text-[#202030]">S</div>
                <div className="w-8 h-8 rounded-full bg-[#D5C6B4] border-2 border-[var(--bg-main)] flex items-center justify-center text-[10px] font-bold text-[#202030]">M</div>
                <div className="w-8 h-8 rounded-full bg-[#DE9C52] border-2 border-[var(--bg-main)] flex items-center justify-center text-[10px] font-bold text-white">+3</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
