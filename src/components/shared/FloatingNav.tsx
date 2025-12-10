'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Home, Map, Mail, MessageCircle, Sparkles } from 'lucide-react';

export default function FloatingNav() {
  const router = useRouter();
  const pathname = usePathname();

  const NavButton = ({ path, icon: Icon, active }: { path: string; icon: any; active: boolean }) => (
    <button
      onClick={() => router.push(path)}
      className={`relative w-12 h-12 flex items-center justify-center transition-all duration-300 rounded-2xl group ${
        active ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
      }`}
    >
      <Icon
        className="w-6 h-6 relative z-10 transition-transform group-active:scale-90"
        strokeWidth={active ? 2.5 : 2}
      />
      {active && (
        <>
          <span className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-[#A85846] animate-enter" />
          <div className="absolute inset-0 bg-white/20 blur-md rounded-full -z-0" />
        </>
      )}
    </button>
  );

  return (
    <div className="glass-thick rounded-[32px] px-6 h-[72px] flex items-center gap-6 shadow-[0_20px_40px_-10px_var(--glass-shadow)] pointer-events-auto border border-[var(--glass-border)]">
      <NavButton path="/dashboard/home" icon={Home} active={pathname === '/dashboard/home'} />
      <NavButton path="/dashboard/journey" icon={Map} active={pathname === '/dashboard/journey'} />

      {/* Center Orb - Candle Ritual */}
      <div
        className="relative -mt-8 group cursor-pointer"
        onClick={() => router.push('/rituals/candle')}
      >
        <div className="absolute inset-0 bg-[#DE9C52]/40 rounded-full blur-xl animate-pulse" />
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#A85846] to-[#DE9C52] flex items-center justify-center text-white shadow-xl shadow-[#A85846]/30 relative z-10 transition-transform duration-300 group-hover:scale-110 group-active:scale-95 border-4 border-[var(--bg-main)]">
          <Sparkles className="w-6 h-6 animate-[spin_8s_linear_infinite]" />
        </div>
      </div>

      <NavButton path="/dashboard/letters" icon={Mail} active={pathname === '/dashboard/letters'} />
      <NavButton path="/dashboard/companion" icon={MessageCircle} active={pathname === '/dashboard/companion'} />
    </div>
  );
}
