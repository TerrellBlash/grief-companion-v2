'use client'

import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon' | 'glass'
  fullWidth?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = "rounded-full font-sans font-medium transition-all duration-300 active:scale-[0.96] flex items-center justify-center relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    // Primary: Martinique background with light text
    primary: "bg-martinique text-lynx shadow-lg hover:shadow-xl hover:-translate-y-0.5 px-8 py-4 text-[15px] border border-white/10 after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
    // Secondary: Glass Regular
    secondary: "glass-regular text-martinique hover:bg-white/80 shadow-glass px-6 py-3 text-sm",
    // Glass: High tech feel
    glass: "glass-thin text-martinique hover:bg-white/60 hover:border-white/60 px-6 py-3 text-sm backdrop-blur-md",
    // Outline
    outline: "bg-transparent border border-martinique/30 text-martinique hover:bg-martinique/5 px-6 py-3 text-sm",
    // Ghost
    ghost: "bg-transparent text-martinique hover:bg-martinique/5 px-4 py-2 text-sm",
    // Icon
    icon: "glass-regular w-12 h-12 text-martinique hover:bg-white/80 hover:scale-105 active:scale-95",
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
