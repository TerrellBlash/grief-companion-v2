'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, Mail, MessageCircle, Sparkles } from 'lucide-react';

interface MobileAppShellProps {
  children: ReactNode;
  hideNav?: boolean;
}

export default function MobileAppShell({ children, hideNav = false }: MobileAppShellProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard/home', icon: Home, label: 'Home' },
    { href: '/dashboard/journey', icon: Map, label: 'Journey' },
    { href: '/dashboard/letters', icon: Mail, label: 'Letters' },
    { href: '/dashboard/companion', icon: MessageCircle, label: 'Chat' },
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard/home') return pathname === '/dashboard/home';
    return pathname?.startsWith(href);
  };

  // Hide nav on candle and settings views - matching Aura.build
  const shouldHideNav = hideNav ||
    pathname?.includes('/rituals/candle') ||
    pathname?.includes('/settings');

  return (
    <div className="app-container">
      {/* Scrollable Content */}
      <div className="content-scroll no-scrollbar">
        {children}
      </div>

      {/* Navigation - Hidden on candle/settings */}
      <div className={`nav-container transition-transform duration-500 ${shouldHideNav ? 'translate-y-32' : 'translate-y-0'}`}>
        <nav className="glass-thick rounded-[32px] px-6 h-[72px] flex items-center gap-6 shadow-[0_20px_40px_-10px_var(--glass-shadow)] border border-[var(--glass-border)]">
          {navItems.slice(0, 2).map(({ href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`relative w-12 h-12 flex items-center justify-center transition-all duration-300 rounded-2xl group ${
                isActive(href)
                  ? 'text-[var(--text-main)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              <Icon
                size={24}
                strokeWidth={isActive(href) ? 2.5 : 2}
                className="relative z-10 transition-transform group-active:scale-90"
              />
              {isActive(href) && (
                <>
                  <span className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-[#A85846] animate-enter" />
                  <div className="absolute inset-0 bg-white/20 blur-md rounded-full -z-0" />
                </>
              )}
            </Link>
          ))}

          {/* Center Floating Action - Candle Ritual */}
          <Link
            href="/rituals/candle"
            className="relative -mt-8 group"
          >
            <div className="absolute inset-0 bg-[#DE9C52]/40 rounded-full blur-xl animate-pulse" />
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#A85846] to-[#DE9C52] flex items-center justify-center text-white shadow-xl shadow-[#A85846]/30 relative z-10 transition-transform duration-300 group-hover:scale-110 group-active:scale-95 border-4 border-[var(--bg-main)]">
              <Sparkles size={24} className="animate-[spin_8s_linear_infinite]" />
            </div>
          </Link>

          {navItems.slice(2).map(({ href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`relative w-12 h-12 flex items-center justify-center transition-all duration-300 rounded-2xl group ${
                isActive(href)
                  ? 'text-[var(--text-main)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              <Icon
                size={24}
                strokeWidth={isActive(href) ? 2.5 : 2}
                className="relative z-10 transition-transform group-active:scale-90"
              />
              {isActive(href) && (
                <>
                  <span className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-[#A85846] animate-enter" />
                  <div className="absolute inset-0 bg-white/20 blur-md rounded-full -z-0" />
                </>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Fade - Hidden on candle */}
      <div className={`bottom-fade transition-opacity ${pathname?.includes('/rituals/candle') ? 'opacity-0' : 'opacity-100'}`} />
    </div>
  );
}
