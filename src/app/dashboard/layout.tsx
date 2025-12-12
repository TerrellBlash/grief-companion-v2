'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Map, Mail, MessageCircle, Sparkles } from 'lucide-react';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hide nav on these screens
  const hideNav = pathname?.includes('/rituals') ||
                  pathname?.includes('/settings') ||
                  pathname?.includes('/memories/create') ||
                  pathname?.includes('/streak') ||
                  pathname?.includes('/community');

  const isActive = (path: string) => {
    if (path === '/dashboard/home') {
      return pathname === '/dashboard/home' || pathname === '/dashboard';
    }
    return pathname?.startsWith(path);
  };

  return (
    <ThemeProvider>
      {/* EXACT Aura.build structure */}
      <div
        data-theme="light"
        style={{
          width: '100%',
          maxWidth: '420px',
          height: '100dvh',
          backgroundColor: '#F5F2ED',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Scrollable content area - flex-1 */}
        <div
          className="no-scrollbar"
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            WebkitOverflowScrolling: 'touch',
            position: 'relative',
            zIndex: 0,
          }}
        >
          {children}
        </div>

        {/* Fixed navigation - ABSOLUTE positioned at bottom */}
        {!hideNav && (
          <div
            style={{
              position: 'absolute',
              bottom: '32px',
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              zIndex: 50,
              pointerEvents: 'none',
            }}
          >
            <nav
              style={{
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                paddingLeft: '24px',
                paddingRight: '24px',
                height: '72px',
                borderRadius: '32px',
                background: 'rgba(245, 242, 237, 0.85)',
                backdropFilter: 'blur(40px) saturate(120%)',
                WebkitBackdropFilter: 'blur(40px) saturate(120%)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                boxShadow: '0 20px 40px -10px rgba(158, 88, 77, 0.1)',
              }}
            >
              {/* Home */}
              <Link
                href="/dashboard/home"
                style={{
                  position: 'relative',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '16px',
                  textDecoration: 'none',
                }}
              >
                <Home
                  size={24}
                  strokeWidth={isActive('/dashboard/home') ? 2.5 : 2}
                  color={isActive('/dashboard/home') ? '#2D2A26' : 'rgba(45, 42, 38, 0.4)'}
                />
                {isActive('/dashboard/home') && (
                  <span style={{
                    position: 'absolute',
                    bottom: '-8px',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#9E584D',
                  }} />
                )}
              </Link>

              {/* Journey */}
              <Link
                href="/dashboard/journey"
                style={{
                  position: 'relative',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '16px',
                  textDecoration: 'none',
                }}
              >
                <Map
                  size={24}
                  strokeWidth={isActive('/dashboard/journey') ? 2.5 : 2}
                  color={isActive('/dashboard/journey') ? '#2D2A26' : 'rgba(45, 42, 38, 0.4)'}
                />
                {isActive('/dashboard/journey') && (
                  <span style={{
                    position: 'absolute',
                    bottom: '-8px',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#9E584D',
                  }} />
                )}
              </Link>

              {/* Center Sparkle - Elevated */}
              <Link
                href="/rituals/candle"
                style={{
                  position: 'relative',
                  marginTop: '-32px',
                  textDecoration: 'none',
                }}
              >
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(214, 143, 84, 0.4)',
                  borderRadius: '50%',
                  filter: 'blur(16px)',
                }} />
                <div style={{
                  position: 'relative',
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'linear-gradient(to top right, #9E584D, #D68F54)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  boxShadow: '0 8px 24px -4px rgba(158, 88, 77, 0.4)',
                  border: '4px solid #F5F2ED',
                  zIndex: 10,
                }}>
                  <Sparkles
                    size={24}
                    style={{ animation: 'spin-slow 8s linear infinite' }}
                  />
                </div>
              </Link>

              {/* Letters */}
              <Link
                href="/dashboard/letters"
                style={{
                  position: 'relative',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '16px',
                  textDecoration: 'none',
                }}
              >
                <Mail
                  size={24}
                  strokeWidth={isActive('/dashboard/letters') ? 2.5 : 2}
                  color={isActive('/dashboard/letters') ? '#2D2A26' : 'rgba(45, 42, 38, 0.4)'}
                />
                {isActive('/dashboard/letters') && (
                  <span style={{
                    position: 'absolute',
                    bottom: '-8px',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#9E584D',
                  }} />
                )}
              </Link>

              {/* Companion */}
              <Link
                href="/dashboard/companion"
                style={{
                  position: 'relative',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '16px',
                  textDecoration: 'none',
                }}
              >
                <MessageCircle
                  size={24}
                  strokeWidth={isActive('/dashboard/companion') ? 2.5 : 2}
                  color={isActive('/dashboard/companion') ? '#2D2A26' : 'rgba(45, 42, 38, 0.4)'}
                />
                {isActive('/dashboard/companion') && (
                  <span style={{
                    position: 'absolute',
                    bottom: '-8px',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#9E584D',
                  }} />
                )}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
