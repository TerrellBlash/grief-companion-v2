'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Flower2, Dog, Home, Coffee, Users } from 'lucide-react'

// BackButton component
const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--glass-bg-regular)] text-[var(--text-main)] border border-[var(--glass-border)] shadow-sm transition-all active:scale-95 hover:bg-[var(--glass-bg-thick)]"
  >
    <ArrowLeft size={20} />
  </button>
)

// Avatar component
const Avatar = ({ initial }: { initial: string }) => (
  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-[var(--color-sand)]">
    <div className="w-full h-full flex items-center justify-center text-xs font-bold text-[var(--text-main)]">
      {initial}
    </div>
  </div>
)

export default function CommunityCirclesPage() {
  const router = useRouter()

  const circles = [
    {
      title: 'Loss of Partner',
      members: 24,
      active: true,
      description: 'A safe space for those navigating life after losing a spouse or partner.',
      icon: Flower2,
      iconBg: 'bg-[#F3EBE6]',
      iconColor: 'text-[#9E584D]',
      buttonStyle: 'bg-[#2D2A26] text-[#F9F7F5] hover:bg-black',
      buttonText: 'Join',
      avatars: ['J', 'M', 'K'],
    },
    {
      title: 'Loss of Pet',
      members: 18,
      active: false,
      description: 'Connect with others who understand the deep bond with our animal companions.',
      icon: Dog,
      iconBg: 'bg-[#E6E8E7]',
      iconColor: 'text-[#7E8D85]',
      buttonStyle: 'bg-white border border-[#E5E5E5] text-[#2D2A26] hover:bg-[#FAFAFA] shadow-sm',
      buttonText: 'Request',
      avatars: ['S', 'L', 'P'],
    },
    {
      title: 'Loss of Family',
      members: 42,
      active: true,
      description: 'Supporting one another through the loss of parents, siblings, and children.',
      icon: Home,
      iconBg: 'bg-[#EBF0F5]',
      iconColor: 'text-[#6A7A85]',
      buttonStyle: 'bg-[#2D2A26] text-[#F9F7F5] hover:bg-black',
      buttonText: 'Join',
      avatars: ['A', 'B', 'C'],
    },
    {
      title: 'Loss of Friend',
      members: 15,
      active: true,
      description: 'Honoring the chosen family and deep friendships that shaped our lives.',
      icon: Coffee,
      iconBg: 'bg-[#F4EFF2]',
      iconColor: 'text-[#856A7A]',
      buttonStyle: 'bg-[#2D2A26] text-[#F9F7F5] hover:bg-black',
      buttonText: 'Join',
      avatars: ['R', 'T', 'N'],
    },
  ]

  return (
    <div className="h-full flex flex-col bg-[#F9F7F5] pt-12 relative overflow-hidden transition-colors duration-500">
      {/* Header */}
      <div className="px-6 flex items-center justify-between mb-2 relative z-10">
        <BackButton onClick={() => router.back()} />
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-32 pt-2 relative z-10">
        <h2 className="font-serif text-[38px] leading-tight text-[var(--text-main)] mb-3 tracking-tight animate-enter">
          Community Circles
        </h2>
        <p className="text-[11px] font-bold tracking-[0.1em] text-[var(--color-clay)] opacity-80 uppercase font-sans mb-10 animate-enter delay-100">
          Find your space to heal together
        </p>

        <div className="space-y-4">
          {circles.map((circle, index) => (
            <div
              key={index}
              className="bg-white rounded-[32px] p-6 shadow-sm border border-white/60 animate-enter"
              style={{ animationDelay: `${200 + index * 100}ms` }}
            >
              {/* Card Header */}
              <div className="flex gap-4 mb-4">
                <div
                  className={`w-14 h-14 rounded-[20px] ${circle.iconBg} ${circle.iconColor} flex items-center justify-center shrink-0`}
                >
                  <circle.icon size={28} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <h3 className="font-serif text-2xl text-[var(--text-main)] mb-2 tracking-tight">{circle.title}</h3>
                  <div className="flex items-center gap-3 flex-wrap">
                    {circle.active ? (
                      <div className="px-2.5 py-1 rounded-full bg-[#EBF5EE] border border-[#DEE8E1] flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#7E8D85]" />
                        <span className="text-[10px] font-bold text-[#7E8D85] uppercase tracking-wide">Active Now</span>
                      </div>
                    ) : (
                      <div className="px-2.5 py-1 rounded-full bg-[#F5F5F5] border border-[#EBEBEB] flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-[#999] uppercase tracking-wide">Closed</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
                      <Users size={14} />
                      <span className="text-xs font-medium opacity-80">{circle.members} members</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-[var(--text-main)] opacity-60 text-[15px] leading-relaxed mb-8 font-medium">
                {circle.description}
              </p>

              {/* Footer: Avatars + Button */}
              <div className="flex items-center justify-between">
                <div className="flex -space-x-3">
                  {circle.avatars.map((initial, i) => (
                    <Avatar key={i} initial={initial} />
                  ))}
                </div>
                <button
                  className={`px-8 py-3 rounded-[16px] text-sm font-semibold transition-transform active:scale-95 ${circle.buttonStyle}`}
                >
                  {circle.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
