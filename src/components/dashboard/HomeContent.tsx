'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Settings, Flame, BookHeart, Mail, Sparkles, ArrowRight, X, HeartHandshake } from 'lucide-react';

// MenuCard component - Aura.build exact
const MenuCard = ({
  title,
  subtitle,
  icon: Icon,
  href,
  delay = "",
  bgColor = "bg-[#F5F2ED]",
  iconColor = "text-[var(--text-main)]",
  customIcon
}: {
  title: string;
  subtitle: string;
  icon?: React.ElementType;
  href: string;
  delay?: string;
  bgColor?: string;
  iconColor?: string;
  customIcon?: React.ReactNode;
}) => (
  <Link
    href={href}
    className={`glass-opaque rounded-[32px] p-5 flex items-center gap-5 cursor-pointer active:scale-[0.98] transition-all duration-300 hover:bg-white animate-enter ${delay} mb-3`}
  >
    <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center ${bgColor} ${iconColor} shadow-sm shrink-0 border border-[var(--color-sand)]/20`}>
      {customIcon ? customIcon : Icon && <Icon size={26} />}
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="font-serif text-[22px] text-[var(--text-main)] mb-0.5 tracking-tight font-medium">{title}</h3>
      <p className="text-[var(--text-muted)] text-[13px] leading-tight truncate font-medium opacity-80">{subtitle}</p>
    </div>
    <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[var(--text-main)] shadow-sm shrink-0 border border-[var(--color-sand)]/20 group-hover:scale-105 transition-transform">
      <ArrowRight size={20} className="opacity-60" />
    </div>
  </Link>
);

// Avatar component for Circles
const Avatar = ({ src, fallback }: { src?: string; fallback: string }) => (
  <div className="w-7 h-7 rounded-full bg-[var(--color-sand)] border-2 border-white overflow-hidden">
    {src ? (
      <div className="w-full h-full bg-[var(--color-sand)] flex items-center justify-center text-[8px] font-bold text-[var(--text-main)]">
        {fallback}
      </div>
    ) : (
      <div className="w-full h-full bg-[var(--color-sand)] flex items-center justify-center text-[8px] font-bold text-[var(--text-main)]">
        {fallback}
      </div>
    )}
  </div>
);

export default function HomeContent() {
  const timeOfDay = new Date().getHours() < 12 ? 'Morning' : 'Evening';
  const dayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const [showNudge, setShowNudge] = useState(true);

  return (
    <div className="pb-36 min-h-full aurora-bg relative transition-colors duration-500">
      {/* Noise Texture */}
      <div className="absolute inset-0 noise-texture pointer-events-none z-0 mix-blend-overlay" />

      {/* Header */}
      <header className="pt-14 px-8 mb-6 relative z-10 animate-enter flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-amber)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-amber)]" />
            </span>
            <p className="text-[var(--color-clay)] font-semibold text-xs uppercase tracking-[0.15em] opacity-90">
              {dayOfWeek} {timeOfDay}
            </p>
          </div>
          <h1 className="font-serif text-[32px] leading-[1.1] text-[var(--text-main)] tracking-tight">
            <span className="opacity-70 font-normal">Welcome home,</span>
            <br />
            <span className="font-hand text-[var(--color-clay)] text-4xl relative top-1">Michelle</span>
          </h1>
          <p className="text-[var(--text-muted)] text-sm mt-3 font-medium opacity-80 leading-relaxed max-w-[240px]">
            Your space is here whenever you need it.
          </p>
        </div>
        <Link
          href="/dashboard/settings"
          className="w-10 h-10 rounded-full glass-thin flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] active:scale-95 transition-all"
        >
          <Settings size={20} />
        </Link>
      </header>

      {/* Cards Container */}
      <div className="px-5 flex flex-col gap-4 relative z-10">

        {/* Gentle Nudge Banner */}
        {showNudge && (
          <div className="bg-[var(--bg-card)] border border-[var(--color-sand)]/40 rounded-[24px] p-4 flex items-center justify-between shadow-[0_4px_20px_-4px_rgba(158,88,77,0.1)] relative overflow-hidden group animate-enter">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-clay)]/5 to-transparent opacity-50" />
            <div className="flex gap-4 items-center relative z-10">
              <div className="w-10 h-10 rounded-full bg-white border border-[var(--color-sand)]/30 flex items-center justify-center text-[var(--color-clay)] shadow-sm shrink-0">
                <HeartHandshake size={18} />
              </div>
              <div className="min-w-0">
                <p className="font-serif text-[17px] text-[var(--text-main)] mb-0.5 tracking-tight">Your candle is waiting</p>
                <p className="text-[var(--text-muted)] text-xs font-medium">No pressure. Just here if you need us.</p>
              </div>
            </div>
            <button
              onClick={() => setShowNudge(false)}
              className="w-8 h-8 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--color-clay)] transition-colors relative z-10"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Daily Ritual Card - Updated Gradients */}
        <Link
          href="/rituals/candle"
          className="group relative w-full overflow-hidden rounded-[32px] p-6 min-h-[190px] flex flex-col justify-between cursor-pointer active:scale-[0.98] transition-all shadow-[0_10px_30px_-10px_rgba(168,88,70,0.3)] animate-enter delay-100 mb-2"
        >
          {/* Gradient Background - Using new palette */}
          <div className="absolute inset-0 bg-[linear-gradient(110deg,#2A2730_0%,#9E584D_55%,#D68F54_100%)] transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 noise-texture opacity-30 mix-blend-overlay" />

          {/* Tag */}
          <div className="relative z-10 self-start">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-md shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-[#E8B991]" />
              <span className="text-[10px] font-bold text-white tracking-[0.15em] uppercase">Daily Ritual</span>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex justify-between items-end mt-4">
            <div>
              <h2 className="font-serif text-[36px] leading-[1.1] text-white mb-1.5 tracking-tight">
                Light a<br />Candle
              </h2>
              <p className="text-[#F2F0E9]/80 text-sm font-medium tracking-wide">Reflect & remember.</p>
            </div>

            <div className="w-14 h-14 rounded-[22px] bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#E8B991] shadow-lg group-hover:bg-white/20 transition-colors">
              <Flame size={26} fill="currentColor" />
            </div>
          </div>
        </Link>

        {/* Top Grid: Streak & Journey */}
        <div className="grid grid-cols-2 gap-3 mb-2 animate-enter delay-200">
          <Link
            href="/dashboard/streak"
            className="glass-opaque rounded-[32px] p-6 flex flex-col items-center justify-center text-center aspect-[6/5] cursor-pointer active:scale-95 transition-transform hover:bg-white border border-[var(--color-sand)]/20"
          >
            <div className="flex items-end gap-1 mb-1">
              <span className="font-serif text-[42px] leading-none text-[var(--text-main)]">0</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-clay)]/80">Days</span>
          </Link>

          <Link
            href="/dashboard/journey"
            className="glass-opaque rounded-[32px] p-6 flex flex-col items-center justify-center text-center aspect-[6/5] cursor-pointer active:scale-95 transition-transform hover:bg-white border border-[var(--color-sand)]/20"
          >
            <h3 className="font-serif text-2xl text-[var(--text-main)] mb-1">Journey</h3>
            <p className="text-[var(--text-muted)] text-sm font-medium opacity-80">Your path</p>
          </Link>
        </div>

        {/* Vertical Menu List */}
        <div className="flex flex-col gap-0.5">
          {/* Memory Jar */}
          <MenuCard
            title="Memory Jar"
            subtitle="Save a thought for today"
            icon={BookHeart}
            bgColor="bg-[#F5F2ED]"
            iconColor="text-[var(--text-main)]"
            href="/dashboard/memories"
            delay="delay-300"
          />

          {/* Legacy Letters - Uses Clay Tone */}
          <MenuCard
            title="Legacy Letters"
            subtitle="Words across time"
            icon={Mail}
            bgColor="bg-[#F9F3F2]"
            iconColor="text-[var(--color-clay)]"
            href="/dashboard/letters"
            delay="delay-400"
          />

          {/* Companion - Uses Sage Tone */}
          <MenuCard
            title="Companion"
            subtitle="Always here to listen"
            icon={Sparkles}
            bgColor="bg-[#F2F4F3]"
            iconColor="text-[var(--color-sage)]"
            href="/dashboard/companion"
            delay="delay-500"
          />

          {/* Circles - Uses Amber Tone with Avatars */}
          <MenuCard
            title="Circles"
            subtitle="Finding healing together"
            bgColor="bg-white"
            iconColor="text-[var(--color-amber)]"
            href="/dashboard/community"
            delay="delay-600"
            customIcon={
              <div className="flex items-center justify-center -space-x-2">
                <Avatar fallback="S" />
                <Avatar fallback="M" />
                <Avatar fallback="K" />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}
