'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Users, Flower2, Dog, Heart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { Circle } from '@/lib/services/circles'

interface CirclesListProps {
  circles: Circle[]
}

const circleIcons = {
  flower: Flower2,
  paw: Dog,
  heart: Heart,
}

const circleColors = {
  flower: 'from-[#F0E8E0] to-[#E8D4C4] text-[#8B7355]',
  paw: 'from-[#E0F0E8] to-[#C4E8D4] text-[#4A7C59]',
  heart: 'from-[#F0E0E8] to-[#E8C4D4] text-[#8B5575]',
}

export function CirclesList({ circles }: CirclesListProps) {
  return (
    <div className="pb-40 min-h-screen">
      <div className="px-6 pt-8 space-y-6">
        {circles.map((circle, idx) => {
          const Icon = circleIcons[circle.icon] || Flower2
          const bgColorClass = circleColors[circle.icon] || circleColors.flower

          return (
            <motion.div
              key={circle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-3xl bg-white/40 border border-white/60 p-6 hover:bg-white/60 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-5">
                  <div
                    className={`w-18 h-18 rounded-[24px] flex items-center justify-center shadow-inner border border-white/20 bg-gradient-to-br ${bgColorClass}`}
                  >
                    <Icon size={30} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-xl text-martinique tracking-tight">
                      {circle.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <div
                        className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider backdrop-blur-sm ${
                          circle.is_open
                            ? 'bg-[#4A7C59]/10 text-[#4A7C59] border border-[#4A7C59]/20'
                            : 'bg-black/5 text-martinique/60 border border-black/5'
                        }`}
                      >
                        {circle.is_open ? 'Active now' : 'Closed'}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-martinique/60">
                        <Users size={12} />
                        {circle.member_count} members
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-martinique/60 text-[15px] leading-relaxed pl-1 mb-4">
                {circle.description}
              </p>

              {/* Avatars Preview */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex -space-x-3 pl-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full border-2 border-white/60 bg-gradient-to-br from-sand to-honey shadow-sm overflow-hidden relative z-0 group-hover:z-10 transition-all"
                    >
                      <div className="w-full h-full flex items-center justify-center text-xs font-bold text-martinique">
                        {String(i)}
                      </div>
                    </div>
                  ))}
                </div>
                <Link href={`/authenticated/community/${circle.id}`}>
                  <Button
                    variant={circle.is_open ? 'primary' : 'glass'}
                    className="text-sm px-6 py-2.5 h-11 min-h-0 rounded-full"
                  >
                    {circle.is_open ? 'Join' : 'Request'}
                  </Button>
                </Link>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
