'use client'

import React from 'react'
import { ChevronLeft } from 'lucide-react'

interface HeaderProps {
  title: string
  subtitle?: string
  onBack?: () => void
  transparent?: boolean
  action?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onBack,
  transparent = false,
  action,
}) => (
  <div
    className={`pt-12 pb-6 px-6 relative flex items-center justify-between z-20 ${
      transparent ? '' : ''
    }`}
  >
    <div className="flex items-center gap-4">
      {onBack && (
        <button
          onClick={onBack}
          className="w-11 h-11 rounded-full glass-thin text-martinique flex items-center justify-center hover:bg-white/60 hover:scale-105 transition-all active:scale-95 border-white/50"
        >
          <ChevronLeft size={22} strokeWidth={1.5} />
        </button>
      )}
      <div className={`${onBack ? 'animate-slide-up' : ''}`}>
        <h1 className="font-serif font-medium text-2xl text-martinique tracking-tight drop-shadow-sm">
          {title}
        </h1>
        {subtitle && (
          <p className="text-martinique/60 text-[13px] mt-0.5 font-medium tracking-wide opacity-80">
            {subtitle}
          </p>
        )}
      </div>
    </div>
    {action && <div className="animate-fade-in-slide">{action}</div>}
  </div>
)
