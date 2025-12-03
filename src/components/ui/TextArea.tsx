'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = '', ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'w-full glass-thin hover:bg-white/50 focus:bg-white/70 focus:border-sand focus:ring-1 focus:ring-sand/30 rounded-[24px] px-6 py-5 text-martinique placeholder:text-martinique/50 focus:outline-none transition-all font-sans resize-none text-[15px] shadow-inner',
        className
      )}
      {...props}
    />
  )
)

TextArea.displayName = 'TextArea'
