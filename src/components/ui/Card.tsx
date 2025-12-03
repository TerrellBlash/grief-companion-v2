'use client'

import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  noPadding?: boolean
  variant?: 'regular' | 'thick'
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  noPadding = false,
  variant = 'regular',
}) => (
  <div
    onClick={onClick}
    className={`
      ${variant === 'regular' ? 'glass-regular' : 'glass-thick'}
      rounded-[32px] relative transition-all duration-300
      ${noPadding ? 'p-0' : 'p-6'}
      ${
        onClick
          ? 'cursor-pointer hover:-translate-y-[4px] hover:shadow-glass-hover hover:brightness-105 active:scale-[0.98] active:translate-y-0'
          : ''
      }
      border-white/60
      ${className}
    `}
  >
    {/* Specular Shine Gradient */}
    <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-white/30 to-transparent opacity-40 pointer-events-none" />
    <div className="relative z-10">{children}</div>
  </div>
)
