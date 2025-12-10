'use client';

import Link from 'next/link';
import { Settings, Flame, BookHeart, Mail, Sparkles, ArrowRight } from 'lucide-react';

// Avatar component matching Aura.build
const Avatar = ({ initial }: { initial: string }) => (
  <div className="w-8 h-8 rounded-full bg-[#D5C6B4] border-[3px] border-[var(--bg-main)] flex items-center justify-center text-[9px] font-bold text-[#202030] relative -ml-2 first:ml-0 transition-colors duration-500 shadow-sm">
    {initial}
  </div>
);

// List Button component - mobile optimized
const ListButton = ({
  title,
  subtitle,
  icon: Icon,
  iconBg = "bg-[#F6F4EF]",
  iconColor = "text-[#202030]",
  href,
  delay = ""
}: {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  iconBg?: string;
  iconColor?: string;
  href: string;
  delay?: string;
}) => (
  <Link
    href={href}
    className={`glass-regular rounded-[28px] p-4 flex items-center gap-4 relative overflow-hidden cursor-pointer active:scale-[0.98] transition-all duration-300 animate-enter ${delay} hover:bg-white/80`}
  >
    <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center ${iconBg} ${iconColor} shadow-sm shrink-0`}>
      <Icon size={22} />
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="font-serif text-lg text-[var(--text-main)] mb-0.5 tracking-tight">{title}</h3>
      <p className="text-[var(--text-muted)] text-xs leading-tight truncate">{subtitle}</p>
    </div>
    <div className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-[var(--text-main)] shadow-sm shrink-0">
      <ArrowRight size={16} />
    </div>
  </Link>
);

export default function HomeContent() {
  const timeOfDay = new Date().getHours() < 12 ? 'Morning' : 'Evening';
  const dayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="pb-40 min-h-full aurora-bg relative transition-colors duration-500">
      {/* Noise Texture */}
      <div className="absolute inset-0 noise-texture pointer-events-none z-0 mix-blend-overlay" />

      {/* Header - Mobile optimized with safe area */}
      <header className="pt-12 px-5 mb-3 relative z-10 animate-enter flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DE9C52] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DE9C52]" />
            </span>
            <p className="text-[#A85846] font-semibold text-[10px] uppercase tracking-[0.15em] opacity-80">
              {dayOfWeek} {timeOfDay}
            </p>
          </div>
          <h1 className="font-serif text-[28px] leading-[1.1] text-[var(--text-main)] tracking-tight">
            <span className="opacity-70 font-normal">Welcome home,</span>
            <br />
            <span className="font-hand text-[#A85846] text-[32px] relative top-0.5">Michelle</span>
          </h1>
          <p className="text-[var(--text-muted)] mt-1.5 text-xs font-medium">
            Your space is here whenever you need it.
          </p>
        </div>
        <Link
          href="/dashboard/settings"
          className="w-9 h-9 rounded-full glass-thin flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] active:scale-95 transition-all"
        >
          <Settings size={18} />
        </Link>
      </header>

      {/* Cards Container */}
      <div className="px-4 flex flex-col gap-3 relative z-10">

        {/* Candle Ritual Hero Card - Mobile optimized */}
        <Link
          href="/rituals/candle"
          className="w-full relative h-[180px] rounded-[28px] overflow-hidden cursor-pointer group animate-enter delay-100 shadow-[0_15px_30px_-10px_rgba(168,88,70,0.3)] transition-all active:scale-[0.98]"
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2A232E] via-[#8E4A3C] to-[#DFA35C]" />

          {/* Noise Texture */}
          <div className="absolute inset-0 noise-texture opacity-20 mix-blend-overlay" />

          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#DE9C52]/20 rounded-full blur-[50px] pointer-events-none mix-blend-screen" />

          {/* Content */}
          <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
            {/* Badge */}
            <div className="self-start glass-thin border border-white/20 rounded-full pl-2 pr-3 py-1 flex items-center gap-1.5 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-[#DE9C52] shadow-[0_0_6px_#DE9C52] animate-pulse" />
              <span className="text-[9px] font-bold tracking-[0.15em] text-white/90 uppercase">Daily Ritual</span>
            </div>

            {/* Texts */}
            <div>
              <h2 className="font-serif text-[32px] leading-[0.9] text-[#F7F7F7] mb-1 tracking-tight">
                Light a <br />Candle
              </h2>
              <p className="text-[#F7F7F7]/80 text-sm font-medium tracking-wide">Reflect & remember.</p>
            </div>
          </div>

          {/* Floating Button Icon */}
          <div className="absolute bottom-4 right-4 w-12 h-12 rounded-[16px] glass-thin border border-white/20 flex items-center justify-center text-[#DE9C52] shadow-lg group-hover:bg-white/20 transition-colors backdrop-blur-md">
            <Flame size={22} fill="currentColor" />
          </div>
        </Link>

        {/* Stats Row - 2 columns */}
        <div className="grid grid-cols-2 gap-3 animate-enter delay-200">
          {/* Days Card */}
          <div className="glass-regular rounded-[28px] p-5 flex flex-col items-center justify-center text-center">
            <span className="font-serif text-[36px] leading-none text-[var(--text-main)] mb-1">0</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--text-muted)]">Days</span>
          </div>

          {/* Journey Card */}
          <Link
            href="/dashboard/journey"
            className="glass-regular rounded-[28px] p-5 flex flex-col items-center justify-center text-center cursor-pointer active:scale-95 transition-transform hover:bg-white/80"
          >
            <h3 className="font-serif text-xl text-[var(--text-main)] mb-0.5">Journey</h3>
            <p className="text-[var(--text-muted)] text-xs">Your path</p>
          </Link>
        </div>

        {/* List Buttons */}
        <ListButton
          title="Memory Jar"
          subtitle="Save a thought for today"
          icon={BookHeart}
          iconBg="bg-[#F6F4EF]"
          iconColor="text-[#202030]"
          href="/dashboard/memories"
          delay="delay-300"
        />

        <ListButton
          title="Legacy Letters"
          subtitle="Words across time"
          icon={Mail}
          iconBg="bg-[#EFE8E2]"
          iconColor="text-[#A85846]"
          href="/dashboard/letters"
          delay="delay-400"
        />

        <ListButton
          title="Companion"
          subtitle="Always here to listen"
          icon={Sparkles}
          iconBg="bg-[#EBEBEF]"
          iconColor="text-[#202030]"
          href="/dashboard/companion"
          delay="delay-500"
        />

        {/* Circles Card */}
        <Link
          href="/dashboard/community"
          className="glass-regular rounded-[28px] p-5 flex flex-col justify-center relative overflow-hidden cursor-pointer active:scale-[0.98] transition-all duration-300 animate-enter delay-500 hover:bg-white/80"
        >
          <div className="flex justify-between items-start mb-3 relative z-10">
            <div>
              <h3 className="font-serif text-lg text-[var(--text-main)] mb-0.5">Circles</h3>
              <p className="text-[var(--text-muted)] text-xs">Finding healing together</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-[var(--text-main)] shadow-sm">
              <ArrowRight size={16} />
            </div>
          </div>
          <div className="flex items-center pl-1 relative z-10">
            <Avatar initial="S" />
            <Avatar initial="M" />
            <Avatar initial="K" />
            <div className="w-8 h-8 rounded-full bg-[#DE9C52] text-white flex items-center justify-center text-[9px] font-bold relative -ml-2 shadow-md ring-[3px] ring-[var(--bg-main)]">
              +5
            </div>
          </div>
          {/* Abstract bg element */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-t from-[#D5C6B4]/30 to-transparent rounded-full blur-xl" />
        </Link>

      </div>
    </div>
  );
}
