'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, Mail, MessageCircle, Sparkles } from 'lucide-react';

export default function FloatingNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/dashboard/home') {
      return pathname === '/dashboard/home' || pathname === '/dashboard';
    }
    return pathname?.startsWith(path);
  };

  return (
    <nav
      className="pointer-events-auto flex items-center gap-4 px-5 h-[68px] rounded-[32px] border border-white/50"
      style={{
        background: 'rgba(245, 242, 237, 0.85)',
        backdropFilter: 'blur(40px) saturate(120%)',
        WebkitBackdropFilter: 'blur(40px) saturate(120%)',
        boxShadow: '0 20px 40px -10px rgba(158, 88, 77, 0.1)',
      }}
    >
      {/* Home */}
      <Link
        href="/dashboard/home"
        className="relative w-11 h-11 flex items-center justify-center rounded-xl no-underline"
      >
        <Home
          size={22}
          strokeWidth={isActive('/dashboard/home') ? 2.5 : 1.5}
          className={isActive('/dashboard/home') ? 'text-[#2D2A26]' : 'text-[#2D2A26]/40'}
        />
        {isActive('/dashboard/home') && (
          <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#9E584D]" />
        )}
      </Link>

      {/* Journey/Map */}
      <Link
        href="/dashboard/journey"
        className="relative w-11 h-11 flex items-center justify-center rounded-xl no-underline"
      >
        <Map
          size={22}
          strokeWidth={isActive('/dashboard/journey') ? 2.5 : 1.5}
          className={isActive('/dashboard/journey') ? 'text-[#2D2A26]' : 'text-[#2D2A26]/40'}
        />
        {isActive('/dashboard/journey') && (
          <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#9E584D]" />
        )}
      </Link>

      {/* Center Sparkle Button - Elevated */}
      <Link
        href="/rituals/candle"
        className="relative -mt-6 no-underline"
      >
        <div
          className="absolute inset-0 rounded-full blur-xl"
          style={{ background: 'rgba(214, 143, 84, 0.4)' }}
        />
        <div
          className="relative w-14 h-14 rounded-full flex items-center justify-center text-white border-4 border-[#F5F2ED]"
          style={{
            background: 'linear-gradient(to top right, #9E584D, #D68F54)',
            boxShadow: '0 8px 24px -4px rgba(158, 88, 77, 0.4)',
          }}
        >
          <Sparkles size={22} className="animate-[spin_8s_linear_infinite]" />
        </div>
      </Link>

      {/* Mail/Letters */}
      <Link
        href="/dashboard/letters"
        className="relative w-11 h-11 flex items-center justify-center rounded-xl no-underline"
      >
        <Mail
          size={22}
          strokeWidth={isActive('/dashboard/letters') ? 2.5 : 1.5}
          className={isActive('/dashboard/letters') ? 'text-[#2D2A26]' : 'text-[#2D2A26]/40'}
        />
        {isActive('/dashboard/letters') && (
          <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#9E584D]" />
        )}
      </Link>

      {/* Companion/Chat */}
      <Link
        href="/dashboard/companion"
        className="relative w-11 h-11 flex items-center justify-center rounded-xl no-underline"
      >
        <MessageCircle
          size={22}
          strokeWidth={isActive('/dashboard/companion') ? 2.5 : 1.5}
          className={isActive('/dashboard/companion') ? 'text-[#2D2A26]' : 'text-[#2D2A26]/40'}
        />
        {isActive('/dashboard/companion') && (
          <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#9E584D]" />
        )}
      </Link>
    </nav>
  );
}
