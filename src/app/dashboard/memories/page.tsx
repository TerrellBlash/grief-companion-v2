'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, BookOpen, Image, MessageSquareQuote, Star, UploadCloud, Calendar, MessageSquare, Quote } from 'lucide-react'

type Step = 'SELECT' | 'INPUT'
type MemoryType = 'story' | 'photo' | 'quote' | 'favorite' | null

// BackButton component
const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--glass-bg-regular)] text-[var(--text-main)] border border-[var(--glass-border)] shadow-sm transition-all active:scale-95 hover:bg-[var(--glass-bg-thick)]"
  >
    <ArrowLeft size={20} />
  </button>
)

export default function MemoriesPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('SELECT')
  const [selected, setSelected] = useState<MemoryType>(null)
  const [favCategory, setFavCategory] = useState('Music')

  const memoryTypes = [
    { id: 'story' as const, title: 'Story', sub: 'Share a meaningful moment', icon: BookOpen },
    { id: 'photo' as const, title: 'Photo', sub: 'Upload a cherished picture', icon: Image },
    { id: 'quote' as const, title: 'Quote', sub: 'Remember their words', icon: MessageSquareQuote },
    { id: 'favorite' as const, title: 'Favorite Thing', sub: 'Something they loved', icon: Star },
  ]

  const favCategories = ['Music', 'Food', 'Movie', 'Place', 'Hobby', 'Color']

  const handleTypeSelect = (id: MemoryType) => {
    setSelected(id)
    setTimeout(() => setStep('INPUT'), 300)
  }

  const getTitle = () => {
    if (selected === 'story') return 'Story'
    if (selected === 'photo') return 'Photo'
    if (selected === 'quote') return 'Quote'
    if (selected === 'favorite') return 'Favorite'
    return ''
  }

  // Render Different Input Screens
  const renderInputScreen = () => {
    switch (selected) {
      case 'story':
        return (
          <div className="flex flex-col gap-6 animate-enter">
            <div>
              <label className="font-serif text-2xl text-[var(--text-main)] mb-3 block pl-1">Title</label>
              <div className="glass-card-input rounded-[24px] px-6 py-4 flex items-center">
                <input
                  type="text"
                  placeholder="Give this story a name..."
                  className="w-full bg-transparent border-none outline-none text-[var(--text-main)] placeholder:text-[var(--text-muted)]/40 font-bold text-lg"
                />
              </div>
            </div>
            <div>
              <label className="font-serif text-2xl text-[var(--text-main)] mb-3 block pl-1">The Story</label>
              <div className="glass-card-input rounded-[32px] p-6 min-h-[300px] relative">
                <div className="absolute top-0 left-8 bottom-0 w-px bg-[var(--color-clay)]/10" />
                <textarea
                  placeholder="Once upon a time..."
                  className="w-full h-full bg-transparent border-none outline-none resize-none font-serif text-lg leading-loose text-[var(--text-main)] placeholder:text-[var(--text-muted)]/40 pl-6 min-h-[260px]"
                />
              </div>
            </div>
          </div>
        )

      case 'photo':
        return (
          <div className="flex flex-col gap-6 animate-enter">
            <div className="w-full aspect-[4/3] rounded-[32px] border-2 border-dashed border-[var(--color-sand)] bg-[var(--color-sand)]/10 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-[var(--color-sand)]/20 transition-colors group">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[var(--color-clay)] shadow-sm group-hover:scale-110 transition-transform">
                <UploadCloud size={28} />
              </div>
              <span className="text-[var(--text-muted)] font-medium text-sm">Tap to upload photo</span>
            </div>

            <div>
              <div className="glass-card-input rounded-[24px] px-6 py-4 flex items-center mb-3">
                <MessageSquare size={20} className="text-[var(--color-clay)] mr-3 opacity-60" />
                <input
                  type="text"
                  placeholder="Add a caption..."
                  className="w-full bg-transparent border-none outline-none text-[var(--text-main)] placeholder:text-[var(--text-muted)]/40 font-medium"
                />
              </div>
              <div className="glass-card-input rounded-[24px] px-6 py-4 flex items-center">
                <Calendar size={20} className="text-[var(--color-clay)] mr-3 opacity-60" />
                <input
                  type="text"
                  placeholder="When was this? (Optional)"
                  className="w-full bg-transparent border-none outline-none text-[var(--text-main)] placeholder:text-[var(--text-muted)]/40 font-medium"
                />
              </div>
            </div>
          </div>
        )

      case 'quote':
        return (
          <div className="flex flex-col h-full animate-enter">
            <div className="flex-1 flex flex-col justify-center mb-6 relative">
              <Quote size={48} className="text-[var(--color-amber)] opacity-20 absolute -top-4 -left-2" />
              <textarea
                placeholder="Type their words here..."
                className="w-full bg-transparent border-none outline-none resize-none font-serif text-3xl text-center text-[var(--text-main)] placeholder:text-[var(--text-muted)]/30 leading-tight min-h-[200px]"
              />
              <Quote size={48} className="text-[var(--color-amber)] opacity-20 absolute -bottom-4 -right-2 rotate-180" />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] pl-4">
                Context
              </label>
              <div className="glass-card-input rounded-[24px] px-6 py-4 flex items-center">
                <input
                  type="text"
                  placeholder="Who said it? (e.g. Dad)"
                  className="w-full bg-transparent border-none outline-none text-[var(--text-main)] placeholder:text-[var(--text-muted)]/40 font-medium"
                />
              </div>
              <div className="glass-card-input rounded-[24px] px-6 py-4 flex items-center">
                <input
                  type="text"
                  placeholder="When/Where?"
                  className="w-full bg-transparent border-none outline-none text-[var(--text-main)] placeholder:text-[var(--text-muted)]/40 font-medium"
                />
              </div>
            </div>
          </div>
        )

      case 'favorite':
        return (
          <div className="flex flex-col gap-6 animate-enter">
            <div>
              <label className="font-serif text-2xl text-[var(--text-main)] mb-3 block pl-1">Category</label>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                {favCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFavCategory(cat)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      favCategory === cat
                        ? 'bg-[var(--text-main)] text-[var(--text-inverse)] shadow-lg'
                        : 'bg-white border border-[var(--color-sand)]/30 text-[var(--text-muted)]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card-input rounded-[32px] p-6 flex flex-col gap-4 border border-[var(--color-amber)]/20 shadow-md">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-clay)] mb-1 block">
                  Their Favorite {favCategory}
                </label>
                <input
                  type="text"
                  placeholder={`Name of ${favCategory}...`}
                  className="w-full bg-transparent border-b border-[var(--color-sand)]/30 pb-2 outline-none text-[var(--text-main)] placeholder:text-[var(--text-muted)]/30 font-serif text-2xl"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1 block mt-2">
                  Why they loved it
                </label>
                <textarea
                  placeholder="Add a small note..."
                  className="w-full bg-transparent border-none outline-none resize-none font-sans text-base text-[var(--text-main)] placeholder:text-[var(--text-muted)]/40 h-24"
                />
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // Selection Screen
  if (step === 'SELECT') {
    return (
      <div className="h-full flex flex-col bg-[var(--bg-main)] pt-12 relative overflow-hidden transition-colors duration-500">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[var(--color-amber)]/5 to-transparent pointer-events-none" />

        <div className="px-6 flex items-center justify-between mb-2 relative z-10">
          <BackButton onClick={() => router.back()} />
          <h2 className="font-serif text-xl text-[var(--text-main)] tracking-tight">Create a Memory</h2>
          <div className="w-10" />
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-32 relative z-10">
          <h2 className="font-serif text-3xl text-center text-[var(--text-main)] mb-10 mt-10 tracking-tight animate-enter">
            Choose a memory type
          </h2>

          <div className="space-y-4">
            {memoryTypes.map((type, idx) => (
              <div
                key={type.id}
                onClick={() => handleTypeSelect(type.id)}
                className={`relative group glass-regular rounded-[24px] p-4 pr-6 flex items-center gap-5 cursor-pointer transition-all duration-300 animate-enter hover:bg-white/80 ${
                  selected === type.id ? 'bg-white shadow-md ring-2 ring-[var(--color-amber)]' : 'shadow-sm'
                }`}
                style={{ animationDelay: `${100 + idx * 100}ms` }}
              >
                <div
                  className={`w-14 h-14 rounded-[20px] bg-[var(--color-sand)]/20 flex items-center justify-center text-[var(--text-main)] shrink-0 border border-[var(--color-sand)]/30 transition-colors ${
                    selected === type.id ? 'bg-[var(--color-amber)]/10 text-[var(--color-amber)]' : ''
                  }`}
                >
                  <type.icon size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-lg text-[var(--text-main)] mb-0.5 tracking-tight">{type.title}</h3>
                  <p className="text-[var(--text-muted)] text-xs font-medium truncate">{type.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Input Screen
  return (
    <div className="h-full flex flex-col bg-[var(--bg-main)] pt-12 relative overflow-hidden transition-colors duration-500">
      <div className="px-6 flex items-center justify-between mb-4 relative z-10">
        <BackButton onClick={() => setStep('SELECT')} />
        <h2 className="font-serif text-xl text-[var(--text-main)] tracking-tight capitalize">New {getTitle()}</h2>
        <div className="w-10" />
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-40 relative z-10 scroll-smooth">
        {renderInputScreen()}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[var(--bg-main)] via-[var(--bg-main)] to-transparent z-20">
        <button className="w-full bg-[var(--text-main)] text-[var(--text-inverse)] py-4 rounded-[20px] font-medium text-lg shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all">
          <span>Save {getTitle()}</span>
        </button>
      </div>
    </div>
  )
}
