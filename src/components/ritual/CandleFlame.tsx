'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface CandleFlameProps {
  isLit?: boolean
}

export const CandleFlame: React.FC<CandleFlameProps> = ({ isLit = true }) => {
  // If not lit, just show the wick
  if (!isLit)
    return (
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 w-1 h-3 bg-neutral-800 rounded-sm opacity-80" />
    )

  return (
    <div className="relative w-[120px] h-[180px] flex justify-center items-end -translate-y-6 pointer-events-none">
      {/* 1. Ambient Bloom/Glow (Static + Pulse) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.3, 0.45, 0.3],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 w-40 h-40 bg-orange-300/20 rounded-full blur-[60px] z-0 mix-blend-screen"
      />

      {/* 2. Main Flame Group */}
      <div className="relative z-10 w-full h-full flex items-end justify-center pb-8">
        {/* Outer Halo (Soft Yellow) */}
        <motion.div
          animate={{
            scale: [1, 1.02, 0.98, 1.01, 1],
            skewX: [0, 1, -1, 0],
            height: [80, 85, 82, 84, 80],
          }}
          transition={{ duration: 0.1, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-0 w-12 h-20 bg-gradient-to-t from-orange-400/40 via-yellow-200/30 to-transparent rounded-[50%] blur-[8px]"
          style={{ transformOrigin: 'bottom center' }}
        />

        {/* Inner Flame (The actual flame shape) */}
        <svg viewBox="0 0 100 200" className="w-16 h-28 overflow-visible">
          <defs>
            <linearGradient
              id="flameGradient"
              x1="50%"
              y1="100%"
              x2="50%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#FFD580" /> {/* Base Orange/Gold */}
              <stop offset="40%" stopColor="#FFF8E7" /> {/* Middle Cream */}
              <stop offset="100%" stopColor="#FFFFFF" /> {/* Tip White */}
            </linearGradient>
            <filter id="blurFilter">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
            </filter>
          </defs>

          {/* Core Flame Shape */}
          <motion.path
            d="M50 180 C20 180 20 130 50 10 C80 130 80 180 50 180 Z"
            fill="url(#flameGradient)"
            initial={{ d: 'M50 180 C25 180 25 130 50 20 C75 130 75 180 50 180 Z' }}
            animate={{
              d: [
                'M50 180 C25 180 25 130 50 20 C75 130 75 180 50 180 Z', // Straight
                'M50 180 C22 180 22 130 46 15 C75 130 78 180 50 180 Z', // Slight Left Tip
                'M50 180 C25 180 25 130 50 20 C75 130 75 180 50 180 Z', // Straight
                'M50 180 C28 180 25 130 54 15 C78 130 72 180 50 180 Z', // Slight Right Tip
                'M50 180 C25 180 25 130 50 20 C75 130 75 180 50 180 Z', // Straight
              ],
            }}
            transition={{
              duration: 2.5, // Slower, more organic base movement
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ filter: 'url(#blurFilter)', opacity: 0.9 }}
          />

          {/* The Blue Base (Heat) */}
          <circle
            cx="50"
            cy="175"
            r="8"
            fill="#1e3a8a"
            className="opacity-40 blur-[4px]"
          />
        </svg>

        {/* Tip Flicker (Fast, erratic movement at the very top) */}
        <motion.div
          animate={{
            x: [0, 2, -1, 3, 0],
            y: [0, -4, -1, -5, 0],
            opacity: [0.6, 0.8, 0.5, 0.9, 0.6],
          }}
          transition={{ duration: 0.2, repeat: Infinity }} // 60fps feel
          className="absolute bottom-[90px] w-2 h-4 bg-white rounded-full blur-[4px]"
        />
      </div>
    </div>
  )
}
