'use client';

import { ReactNode, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Map, Mail, MessageCircle, Sparkles } from 'lucide-react';

interface MobileAppShellProps {
  children: ReactNode;
  showNav?: boolean;
}

export default function MobileAppShell({ children, showNav = true }: MobileAppShellProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Scroll to top on route change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [pathname]);

  return (
    <div className="app-container">
      {/* Scrollable Content */}
      <div ref={scrollRef} className="content-scroll">
        {children}
      </div>

      {/* Navigation - only shown on certain pages */}
      {showNav && (
        <>
          <div className="nav-container">
            <NavBar />
          </div>
          <div className="bottom-fade" />
        </>
      )}
    </div>
  );
}

// Inline NavBar component
function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  const NavButton = ({ path, icon: Icon, active }: { path: string; icon: React.ElementType; active: boolean }) => (
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
          <span className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-[#A85846]" />
          <div className="absolute inset-0 bg-white/20 blur-md rounded-full -z-0" />
        </>
      )}
    </button>
  );

  return (
    <div className="glass-thick rounded-[32px] px-6 h-[72px] flex items-center gap-6 shadow-[0_20px_40px_-10px_var(--glass-shadow)] border border-[var(--glass-border)]">
      <NavButton path="/dashboard/home" icon={Home} active={pathname === '/dashboard/home'} />
      <NavButton path="/dashboard/journey" icon={Map} active={pathname === '/dashboard/journey'} />

      {/* Center Orb */}
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
