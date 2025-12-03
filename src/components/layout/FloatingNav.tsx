'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  LayoutGrid,
  Plus,
  Users,
  Sparkles,
} from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  isCenter?: boolean
}

export const FloatingNav: React.FC = () => {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      label: 'Home',
      href: '/dashboard/home',
      icon: <Home size={22} strokeWidth={pathname === '/dashboard/home' ? 2.5 : 2} />,
    },
    {
      label: 'Progress',
      href: '/dashboard/progress',
      icon: <LayoutGrid size={22} strokeWidth={pathname === '/dashboard/progress' ? 2.5 : 2} />,
    },
    {
      label: 'Ritual',
      href: '/rituals/candle',
      icon: <Sparkles size={24} />,
      isCenter: true,
    },
    {
      label: 'Community',
      href: '/authenticated/community',
      icon: <Users size={22} strokeWidth={pathname === '/authenticated/community' ? 2.5 : 2} />,
    },
    {
      label: 'Memories',
      href: '/dashboard/memories',
      icon: <Plus size={22} strokeWidth={pathname === '/dashboard/memories' ? 2.5 : 2} />,
    },
  ]

  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-4 animate-slide-up pointer-events-none">
      <div className="glass-thick rounded-full h-[4.5rem] px-6 flex items-center justify-between gap-2 w-full max-w-[20rem] pointer-events-auto shadow-glass-deep border border-white/40">
        {navItems.map((item) => {
          if (item.isCenter) {
            return (
              <div key={item.label} className="px-1 -mt-12 relative z-10">
                <Link
                  href={item.href}
                  aria-label="Ritual"
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 active:scale-95 transition-all relative overflow-hidden group"
                  style={{
                    background:
                      'conic-gradient(from 180deg at 50% 50%, #C4A77D 0deg, #E8D4C4 180deg, #C4A77D 360deg)',
                  }}
                >
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-md" />
                  <div className="absolute inset-1 bg-martinique rounded-full flex items-center justify-center border border-white/10">
                    {item.icon}
                  </div>
                </Link>
              </div>
            )
          }

          const isActive = pathname === item.href
          return (
            <NavButton
              key={item.label}
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
      ${active ? 'text-honey bg-white/50 shadow-inner' : 'text-martinique/60 hover:text-honey hover:bg-white/30'}`}
    title={label}
  >
    <div className="relative z-10">{icon}</div>
    {active && (
      <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-honey" />
    )}
  </Link>
)
