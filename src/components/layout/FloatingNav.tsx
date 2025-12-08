'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Map, Sparkles, Mail, MessageCircle } from 'lucide-react'

interface NavItem {
  id: string
  label: string
  href: string
  icon: React.ReactNode
  isCenter?: boolean
}

export const FloatingNav: React.FC = () => {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: 'Home',
      href: '/dashboard/home',
      icon: (
        <Home
          size={22}
          strokeWidth={pathname === '/dashboard/home' ? 2.5 : 2}
        />
      ),
    },
    {
      id: 'journey',
      label: 'Journey',
      href: '/dashboard/journey',
      icon: (
        <Map
          size={22}
          strokeWidth={pathname === '/dashboard/journey' ? 2.5 : 2}
        />
      ),
    },
    {
      id: 'ritual',
      label: 'Ritual',
      href: '/rituals/candle',
      icon: <Sparkles size={24} />,
      isCenter: true,
    },
    {
      id: 'letters',
      label: 'Letters',
      href: '/dashboard/letters',
      icon: (
        <Mail
          size={22}
          strokeWidth={pathname === '/dashboard/letters' ? 2.5 : 2}
        />
      ),
    },
    {
      id: 'companion',
      label: 'Companion',
      href: '/dashboard/companion',
      icon: (
        <MessageCircle
          size={22}
          strokeWidth={pathname === '/dashboard/companion' ? 2.5 : 2}
        />
      ),
    },
  ]

  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-4 animate-slide-up pointer-events-none">
      <div className="glass-thick rounded-full h-[4.5rem] px-6 flex items-center justify-between gap-2 w-full max-w-[22rem] pointer-events-auto shadow-glass-deep border border-white/40">
        {navItems.map((item) => {
          if (item.isCenter) {
            return (
              <div key={item.id} className="px-1 -mt-8 relative z-10">
                {/* Ambient Glow Behind */}
                <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-spice to-honey rounded-full blur-xl opacity-30 animate-pulse-slow" />

                <Link
                  href={item.href}
                  aria-label="Ritual"
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 active:scale-95 transition-all relative overflow-hidden group border-4 border-lynx"
                  style={{
                    background:
                      'linear-gradient(135deg, #A85846 0%, #DE9C52 100%)',
                    boxShadow: '0 8px 32px rgba(168, 88, 70, 0.3)',
                  }}
                >
                  <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">{item.icon}</div>
                </Link>
              </div>
            )
          }

          const isActive = pathname === item.href
          return (
            <NavButton
              key={item.id}
              active={isActive}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          )
        })}
      </div>
    </div>
  )
}

interface NavButtonProps {
  active: boolean
  href: string
  icon: React.ReactNode
  label: string
}

const NavButton: React.FC<NavButtonProps> = ({ active, href, icon, label }) => (
  <Link
    href={href}
    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 relative group
      ${
        active
          ? 'text-honey bg-white/50 shadow-inner'
          : 'text-martinique/60 hover:text-honey hover:bg-white/30'
      }`}
    title={label}
  >
    <div className="relative z-10">{icon}</div>
    {active && (
      <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-honey" />
    )}
  </Link>
)
