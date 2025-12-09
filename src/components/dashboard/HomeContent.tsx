'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Settings, Flame, Users, Archive, Mail, ArrowRight } from 'lucide-react';
import Card from '@/components/shared/Card';
import Avatar from '@/components/shared/Avatar';
import NudgeBanner from '@/components/shared/NudgeBanner';

export default function HomeContent() {
  const router = useRouter();
  const [showNudge, setShowNudge] = useState(true);

  const hour = new Date().getHours();
  const timeOfDay = hour < 12 ? 'Morning' : hour < 17 ? 'Afternoon' : 'Evening';
  const dayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="pb-32 min-h-full aurora-bg relative transition-colors duration-500">
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
              {dayName} {timeOfDay}
            </p>
          </div>
          <h1 className="font-serif text-[32px] leading-[1.1] text-[var(--text-main)] tracking-tight">
            <span className="opacity-70 font-normal">Welcome home,</span>
            <br />
            <span className="font-hand text-[#A85846] text-4xl relative top-1">Michelle</span>
          </h1>
        </div>
        <button
          onClick={() => router.push('/dashboard/settings')}
          className="w-10 h-10 rounded-full glass-thin flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] active:scale-95 transition-all"
        >
          <Settings className="w-5 h-5" />
        </button>
      </header>

      {showNudge && <NudgeBanner onDismiss={() => setShowNudge(false)} />}

      <div className="px-5 grid grid-cols-2 gap-4 relative z-10">
        {/* Candle Card */}
        <div
          onClick={() => router.push('/rituals/candle')}
          className="col-span-2 aspect-[16/9] rounded-[36px] relative overflow-hidden cursor-pointer group animate-enter delay-100 shadow-xl shadow-[#A85846]/10 transition-all duration-700 hover:shadow-2xl hover:shadow-[#A85846]/15 hover:-translate-y-1"
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
                <Flame className="w-[22px] h-[22px] flame-core" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>

        {/* Community Circles Card */}
        <Card
          onClick={() => router.push('/authenticated/community')}
          delay="delay-200"
          className="col-span-2 flex flex-col justify-between group border-l-4 border-l-[#DE9C52]"
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-[#DE9C52]" />
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
            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:translate-x-1 transition-transform" />
          </div>
        </Card>

        {/* Memory Jar Card */}
        <Card
          onClick={() => router.push('/dashboard/memories')}
          delay="delay-300"
          className="col-span-1 flex flex-col justify-between min-h-[140px]"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F7F7F7] to-[#D5C6B4]/60 border border-white flex items-center justify-center text-[#A85846]">
            <Archive className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg text-[var(--text-main)] leading-tight">Memory Jar</h3>
            <p className="text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-wider mt-2">Store Moments</p>
          </div>
        </Card>

        {/* Letters Card */}
        <Card
          onClick={() => router.push('/dashboard/letters')}
          delay="delay-400"
          className="col-span-1 flex flex-col justify-between min-h-[140px]"
        >
          <div className="w-10 h-10 rounded-xl bg-[#A85846]/10 flex items-center justify-center text-[#A85846]">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg text-[var(--text-main)] leading-tight">Letters</h3>
            <p className="text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-wider mt-2">Legacy Notes</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
