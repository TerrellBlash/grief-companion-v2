'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Settings, Flame, Users, Mail, ArrowRight, X, HeartHandshake, BookHeart, Sparkles } from 'lucide-react';

export default function HomeContent() {
  const [showNudge, setShowNudge] = useState(true);
  const hours = new Date().getHours();
  const timeOfDay = hours < 12 ? 'Morning' : hours < 17 ? 'Afternoon' : 'Evening';
  const dayName = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();

  return (
    <div
      className="min-h-full pb-32"
      style={{
        background: 'linear-gradient(-45deg, #F5F2ED, #E3E0D9, #E0E6E3, #E8DCCF)',
        backgroundSize: '400% 400%',
        animation: 'aurora-shift 35s ease infinite',
      }}
    >
      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Header */}
      <header className="relative z-10 pt-14 px-6 pb-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            {/* Day indicator */}
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D68F54] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D68F54]" />
              </span>
              <p className="text-[#9E584D] font-semibold text-[11px] uppercase tracking-[0.12em]">
                {dayName} {timeOfDay}
              </p>
            </div>

            {/* Welcome text */}
            <h1 className="font-serif text-[32px] leading-[1.15] text-[#2D2A26] tracking-tight">
              Welcome home,
            </h1>
            <p
              className="text-[#9E584D] text-[34px] leading-[1.1] mt-0.5"
              style={{ fontFamily: 'Caveat, cursive' }}
            >
              Michelle
            </p>
            <p className="text-[#2D2A26]/50 text-[14px] mt-3 font-medium leading-relaxed max-w-[220px]">
              Your space is here whenever you need it.
            </p>
          </div>

          {/* Settings button */}
          <Link
            href="/dashboard/settings"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#2D2A26]/40 hover:text-[#2D2A26] active:scale-95 transition-all no-underline"
            style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
            }}
          >
            <Settings size={20} />
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10 px-5 space-y-3">

        {/* Gentle Nudge Banner */}
        {showNudge && (
          <div
            className="relative overflow-hidden rounded-[20px] p-4 flex items-center gap-4"
            style={{
              background: 'white',
              border: '1px solid rgba(219, 203, 184, 0.4)',
              boxShadow: '0 4px 20px -4px rgba(158, 88, 77, 0.08)',
            }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: 'white',
                border: '1px solid rgba(219, 203, 184, 0.3)',
              }}
            >
              <HeartHandshake size={18} className="text-[#9E584D]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-serif text-[16px] text-[#2D2A26] mb-0.5">
                Your candle is waiting
              </p>
              <p className="text-[#2D2A26]/50 text-[12px] font-medium">
                No pressure. Just here if you need us.
              </p>
            </div>
            <button
              onClick={() => setShowNudge(false)}
              className="w-8 h-8 flex items-center justify-center text-[#2D2A26]/30 hover:text-[#9E584D] transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Daily Ritual Card - Gradient */}
        <Link
          href="/rituals/candle"
          className="group relative block w-full overflow-hidden rounded-[28px] p-5 min-h-[175px] no-underline"
          style={{
            background: 'linear-gradient(110deg, #2A2730 0%, #9E584D 55%, #D68F54 100%)',
            boxShadow: '0 10px 30px -10px rgba(168, 88, 70, 0.35)',
          }}
        >
          {/* Tag */}
          <div className="mb-auto">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#E8B991]" />
              <span className="text-[10px] font-bold text-white tracking-[0.12em] uppercase">
                Daily Ritual
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex justify-between items-end mt-8">
            <div>
              <h2 className="font-serif text-[34px] leading-[1.05] text-white tracking-tight">
                Light a<br/>Candle
              </h2>
              <p className="text-white/70 text-[13px] font-medium mt-1.5 tracking-wide">
                Reflect & remember.
              </p>
            </div>

            <div
              className="w-12 h-12 rounded-[18px] flex items-center justify-center text-[#E8B991]"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Flame size={24} fill="currentColor" />
            </div>
          </div>
        </Link>

        {/* Days & Journey Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Days */}
          <Link
            href="/dashboard/streak"
            className="rounded-[28px] p-5 flex flex-col items-center justify-center text-center aspect-[1.15] no-underline"
            style={{
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
            }}
          >
            <span className="font-serif text-[40px] leading-none text-[#2D2A26]">0</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9E584D]/80 mt-1">
              Days
            </span>
          </Link>

          {/* Journey */}
          <Link
            href="/dashboard/journey"
            className="rounded-[28px] p-5 flex flex-col items-center justify-center text-center aspect-[1.15] no-underline"
            style={{
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
            }}
          >
            <h3 className="font-serif text-[22px] text-[#2D2A26]">Journey</h3>
            <p className="text-[#2D2A26]/50 text-[13px] font-medium mt-0.5">Your path</p>
          </Link>
        </div>

        {/* Menu Cards */}
        <div className="space-y-2.5">

          {/* Memory Jar */}
          <Link
            href="/dashboard/memories"
            className="flex items-center gap-4 p-4 rounded-[28px] no-underline active:scale-[0.98] transition-transform"
            style={{
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
            }}
          >
            <div
              className="w-14 h-14 rounded-[20px] flex items-center justify-center shrink-0"
              style={{ background: '#F5F2ED', border: '1px solid rgba(219, 203, 184, 0.2)' }}
            >
              <BookHeart size={24} className="text-[#2D2A26]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-[20px] text-[#2D2A26] tracking-tight">Memory Jar</h3>
              <p className="text-[#2D2A26]/50 text-[12px] font-medium">Save a thought for today</p>
            </div>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'white', border: '1px solid rgba(219, 203, 184, 0.2)' }}
            >
              <ArrowRight size={18} className="text-[#2D2A26]/50" />
            </div>
          </Link>

          {/* Legacy Letters */}
          <Link
            href="/dashboard/letters"
            className="flex items-center gap-4 p-4 rounded-[28px] no-underline active:scale-[0.98] transition-transform"
            style={{
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
            }}
          >
            <div
              className="w-14 h-14 rounded-[20px] flex items-center justify-center shrink-0"
              style={{ background: '#F9F3F2', border: '1px solid rgba(219, 203, 184, 0.2)' }}
            >
              <Mail size={24} className="text-[#9E584D]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-[20px] text-[#2D2A26] tracking-tight">Legacy Letters</h3>
              <p className="text-[#2D2A26]/50 text-[12px] font-medium">Words across time</p>
            </div>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'white', border: '1px solid rgba(219, 203, 184, 0.2)' }}
            >
              <ArrowRight size={18} className="text-[#2D2A26]/50" />
            </div>
          </Link>

          {/* Companion */}
          <Link
            href="/dashboard/companion"
            className="flex items-center gap-4 p-4 rounded-[28px] no-underline active:scale-[0.98] transition-transform"
            style={{
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
            }}
          >
            <div
              className="w-14 h-14 rounded-[20px] flex items-center justify-center shrink-0"
              style={{ background: '#F2F4F3', border: '1px solid rgba(219, 203, 184, 0.2)' }}
            >
              <Sparkles size={24} className="text-[#7E8D85]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-[20px] text-[#2D2A26] tracking-tight">Companion</h3>
              <p className="text-[#2D2A26]/50 text-[12px] font-medium">Always here to listen</p>
            </div>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'white', border: '1px solid rgba(219, 203, 184, 0.2)' }}
            >
              <ArrowRight size={18} className="text-[#2D2A26]/50" />
            </div>
          </Link>

          {/* Circles */}
          <Link
            href="/dashboard/community"
            className="flex items-center gap-4 p-4 rounded-[28px] no-underline active:scale-[0.98] transition-transform"
            style={{
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
            }}
          >
            <div
              className="w-14 h-14 rounded-[20px] flex items-center justify-center shrink-0"
              style={{ background: 'white', border: '1px solid rgba(219, 203, 184, 0.2)' }}
            >
              <div className="flex items-center -space-x-2">
                <div className="w-6 h-6 rounded-full bg-[#DBCBB8] border-2 border-white flex items-center justify-center text-[8px] font-bold text-[#2D2A26]">S</div>
                <div className="w-6 h-6 rounded-full bg-[#9E584D] border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">M</div>
                <div className="w-6 h-6 rounded-full bg-[#D68F54] border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">K</div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-[20px] text-[#2D2A26] tracking-tight">Circles</h3>
              <p className="text-[#2D2A26]/50 text-[12px] font-medium">Finding healing together</p>
            </div>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'white', border: '1px solid rgba(219, 203, 184, 0.2)' }}
            >
              <ArrowRight size={18} className="text-[#2D2A26]/50" />
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}
