'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, Mail, MessageCircle, Sparkles } from 'lucide-react';

export default function FloatingNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/dashboard/home') return pathname === '/dashboard/home';
    return pathname?.startsWith(path);
  };

  const NavButton = ({ href, icon: Icon, active }: { href: string; icon: React.ElementType; active: boolean }) => (
    <Link
      href={href}
      className={`relative w-12 h-12 flex items-center justify-center transition-all duration-300 rounded-2xl group no-underline ${
        active ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
      }`}
    >
      <Icon
        size={24}
        strokeWidth={active ? 2.5 : 2}
        className="relative z-10 transition-transform group-active:scale-90"
      />
      {active && (
        <span className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-[var(--color-clay)] animate-enter" />
      )}
    </Link>
  );

  return (
    <nav className="glass-thick rounded-[32px] px-6 h-[72px] flex items-center gap-6 shadow-[0_20px_40px_-10px_var(--glass-shadow)] pointer-events-auto border border-[var(--glass-border)]">
      <NavButton href="/dashboard/home" icon={Home} active={isActive('/dashboard/home')} />
      <NavButton href="/dashboard/journey" icon={Map} active={isActive('/dashboard/journey')} />

      {/* Floating Center Action */}
      <Link href="/rituals/candle" className="relative -mt-8 group no-underline">
        <div className="absolute inset-0 bg-[var(--color-amber)]/40 rounded-full blur-xl animate-pulse" />
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[var(--color-clay)] to-[var(--color-amber)] flex items-center justify-center text-white shadow-xl shadow-[var(--color-clay)]/30 relative z-10 transition-transform duration-300 group-hover:scale-110 group-active:scale-95 border-4 border-[var(--bg-main)]">
          <Sparkles size={24} className="animate-[spin_8s_linear_infinite]" />
        </div>
      </Link>

      <NavButton href="/dashboard/letters" icon={Mail} active={isActive('/dashboard/letters')} />
      <NavButton href="/dashboard/companion" icon={MessageCircle} active={isActive('/dashboard/companion')} />
    </nav>
  );
}
