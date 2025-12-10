'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Search } from 'lucide-react'

// BackButton component matching Aura.build
const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--glass-bg-regular)] text-[var(--text-main)] border border-[var(--glass-border)] shadow-sm transition-all active:scale-95"
  >
    <ArrowLeft size={20} />
  </button>
);

// Avatar component
const Avatar = ({ initial }: { initial: string }) => (
  <div className="w-8 h-8 rounded-full bg-[#D5C6B4] border-[3px] border-[var(--bg-main)] flex items-center justify-center text-[9px] font-bold text-[#202030] relative -ml-3 first:ml-0 transition-colors duration-500">
    {initial}
  </div>
);

export default function CommunityCirclesPage() {
  const router = useRouter()

  const circles = [
    { id: 1, title: "Loss of a Parent", members: "1.2k", active: 12, lastMsg: "How did you handle the first birthday?", tags: ["Support", "Grief"] },
    { id: 2, title: "Loss of A Partner", members: "840", active: 15, lastMsg: "Cooking for one is the hardest part.", tags: ["Partners", "Healing"] },
    { id: 3, title: "Loss of Family", members: "320", active: 6, lastMsg: "The holidays feel so empty now.", tags: ["Family", "Bond"] },
    { id: 4, title: "Loss of Pet", members: "2.1k", active: 24, lastMsg: "I still expect to hear the paws.", tags: ["Companions", "Love"] },
  ];

  return (
    <div className="h-full flex flex-col bg-[var(--bg-main)] pt-12 relative transition-colors duration-500">
      {/* Header */}
      <div className="px-6 flex items-center justify-between mb-6">
        <BackButton onClick={() => router.back()} />
        <h2 className="font-serif text-2xl text-[var(--text-main)]">Community Circles</h2>
        <div className="w-10 h-10 flex items-center justify-center rounded-full glass-thin text-[var(--text-main)]">
          <Search size={20} />
        </div>
      </div>

      {/* Tabs - Aura.build style */}
      <div className="px-6 mb-6 animate-enter">
        <div className="glass-regular p-1 rounded-full flex relative">
          <div className="w-1/2 h-full absolute left-0 top-0 bg-[#DE9C52] rounded-full shadow-sm" />
          <button className="flex-1 py-2.5 relative z-10 text-xs font-bold uppercase tracking-wider text-white text-center">
            My Circles
          </button>
          <button className="flex-1 py-2.5 relative z-10 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] text-center">
            Discover
          </button>
        </div>
      </div>

      {/* Circles List */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 space-y-4 pb-32">
        {circles.map((circle, idx) => (
          <div
            key={circle.id}
            className="glass-regular rounded-[24px] p-5 hover:border-[#DE9C52]/50 transition-all cursor-pointer animate-enter"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-2 mb-2">
                {circle.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded-full bg-[#D5C6B4]/20 text-[10px] font-bold uppercase tracking-wider text-[#A85846]">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DE9C52] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DE9C52]" />
              </span>
            </div>

            <h3 className="font-serif text-xl text-[var(--text-main)] mb-1">{circle.title}</h3>
            <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-1">"{circle.lastMsg}"</p>

            <div className="flex items-center justify-between border-t border-[#D5C6B4]/20 pt-3">
              <div className="flex items-center pl-2">
                <Avatar initial="J" />
                <Avatar initial="M" />
                <Avatar initial="K" />
                <div className="w-8 h-8 rounded-full bg-[var(--bg-main)] border-[3px] border-[var(--bg-main)] flex items-center justify-center text-[9px] font-bold text-[var(--text-muted)] relative -ml-3 transition-colors duration-500">
                  +{circle.active}
                </div>
              </div>
              <span className="text-xs font-medium text-[#DE9C52]">Enter Circle</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
