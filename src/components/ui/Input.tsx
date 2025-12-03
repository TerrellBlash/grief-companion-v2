'use client'

import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className = '', ...props }) => (
  <input
    className={`w-full glass-thin hover:bg-white/50 focus:bg-white/70 focus:border-sand focus:ring-1 focus:ring-sand/30 rounded-[20px] px-5 py-4 text-martinique placeholder:text-martinique/50 focus:outline-none transition-all font-sans text-[15px] shadow-inner ${className}`}
    {...props}
  />
)
