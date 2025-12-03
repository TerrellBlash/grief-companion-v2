'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'w-full glass-thin hover:bg-white/50 focus:bg-white/70 focus:border-sand focus:ring-1 focus:ring-sand/30 rounded-[20px] px-5 py-4 text-martinique placeholder:text-martinique/50 focus:outline-none transition-all font-sans text-[15px] shadow-inner',
        className
      )}
      {...props}
    />
  )
)

Input.displayName = 'Input'
