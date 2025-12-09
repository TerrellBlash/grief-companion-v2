'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Image as ImageIcon,
  MessageSquareQuote,
  Star,
  Calendar,
  MapPin,
  Upload,
  Check,
  Quote,
  Heart,
  Music,
  Utensils,
  Palette,
  ArrowLeft,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

type MemoryType = 'story' | 'photo' | 'quote' | 'favorite'

interface MemoryData {
  type?: MemoryType
  text?: string
  photo_url?: string
  date?: string
  location?: string
  people?: string[]
  tags?: string[]
  loved_one_id?: string
  quote_author?: string
  favorite_category?: string
  caption?: string
}

type Step = 1 | 2 | 3 | 4

const MEMORY_TYPES: Array<{
  id: MemoryType
  icon: any
  label: string
  sub: string
  color: string
  bgColor: string
}> = [
  {
    id: 'story',
    icon: BookOpen,
    label: 'Story',
    sub: 'Share a meaningful moment',
    color: 'text-[#A85846]',
    bgColor: 'bg-[#A85846]/10',
  },
  {
    id: 'photo',
    icon: ImageIcon,
    label: 'Photo',
    sub: 'Upload a cherished picture',
    color: 'text-[#DE9C52]',
    bgColor: 'bg-[#DE9C52]/10',
  },
  {
    id: 'quote',
    icon: MessageSquareQuote,
    label: 'Quote',
    sub: 'Remember their words',
    color: 'text-[#3C3748]',
    bgColor: 'bg-[#3C3748]/10',
  },
  {
    id: 'favorite',
    icon: Star,
    label: 'Favorite Thing',
    sub: 'Something they loved',
    color: 'text-[#7D9D6A]',
    bgColor: 'bg-[#7D9D6A]/10',
  },
]

const FAVORITE_CATEGORIES = [
  { id: 'food', label: 'Food', icon: Utensils },
  { id: 'music', label: 'Music', icon: Music },
  { id: 'hobby', label: 'Hobby', icon: Palette },
  { id: 'place', label: 'Place', icon: MapPin },
  { id: 'other', label: 'Other', icon: Heart },
]

interface MemoryWizardProps {
  onClose?: () => void
}

export function MemoryWizard({ onClose }: MemoryWizardProps) {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [data, setData] = useState<MemoryData>({})
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNext = () => {
    if (step < 4) {
      setStep((step + 1) as Step)
    }
  }

  const handleBack = () => {
    if (step === 1) {
      onClose?.()
      router.back()
    } else {
      setStep((step - 1) as Step)
    }
  }

  const handlePhotoUpload = (file: File) => {
    const preview = URL.createObjectURL(file)
    setPhotoPreview(preview)
    setData({ ...data, photo_url: preview })
  }

  const handleSaveMemory = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/memories/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push('/dashboard/home?memory=saved')
      } else {
        console.error('Failed to save memory')
      }
    } catch (error) {
      console.error('Error saving memory:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepIndicator = () => (
    <div className="flex flex-col items-center mb-8">
      <p className="text-[10px] font-bold text-[#3C3748]/40 tracking-[0.2em] uppercase mb-4">
        Step {step} of 4
      </p>
      <div className="flex items-center justify-center gap-2">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
              s === step
                ? 'w-10 bg-[#DE9C52] shadow-[0_0_10px_rgba(222,156,82,0.4)]'
                : s < step
                  ? 'w-2 bg-[#DE9C52]/40'
                  : 'w-2 bg-[#D5C6B4]/50'
            }`}
          />
        ))}
      </div>
    </div>
  )

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-6 pt-4">
      <button
        onClick={handleBack}
        className="w-11 h-11 rounded-full glass-thin flex items-center justify-center text-[#3C3748]/60 hover:text-[#3C3748] hover:bg-white/60 transition-all active:scale-95"
      >
        <ArrowLeft size={20} strokeWidth={1.5} />
      </button>
      <h2 className="font-serif text-xl text-[#3C3748] font-medium">
        New Memory
      </h2>
      <div className="w-11" />
    </div>
  )

  // Step 1: Type Selection
  if (step === 1) {
    return (
      <div className="pb-40 min-h-screen aurora-bg relative">
        {/* Noise Texture */}
        <div className="absolute inset-0 noise-texture opacity-30 pointer-events-none" />

        <div className="relative z-10 px-6 pt-8">
          {renderHeader()}
          {renderStepIndicator()}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1"
          >
            <h2 className="font-serif font-medium text-3xl text-[#3C3748] text-center mb-8 drop-shadow-sm">
              Choose a memory type
            </h2>
            <div className="space-y-4">
              {MEMORY_TYPES.map((type, index) => {
                const Icon = type.icon
                return (
                  <motion.button
                    key={type.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setData({ ...data, type: type.id })
                      handleNext()
                    }}
                    className="w-full glass-regular hover:bg-white/80 active:scale-[0.98] p-5 rounded-3xl flex items-center justify-between text-left transition-all group relative overflow-hidden shadow-glass hover:shadow-glass-hover"
                  >
                    {/* Ambient glow on hover */}
                    <div className={`absolute inset-0 ${type.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl`} />

                    <div className="flex items-center gap-5 relative z-10">
                      <div className={`w-14 h-14 ${type.bgColor} rounded-[18px] flex items-center justify-center ${type.color} group-hover:scale-110 transition-transform shadow-sm border border-white/40`}>
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="font-serif font-medium text-[#3C3748] text-xl mb-1 tracking-tight">
                          {type.label}
                        </p>
                        <p className="text-sm text-[#3C3748]/60 font-medium">
                          {type.sub}
                        </p>
                      </div>
                    </div>
                    <div className={`w-8 h-8 rounded-full border-2 border-[#D5C6B4]/50 flex items-center justify-center text-transparent group-hover:border-[#DE9C52] group-hover:text-[#DE9C52] transition-all bg-white/50 relative z-10`}>
                      <Check size={16} />
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  // Step 2: Details (Type-specific UI)
  if (step === 2) {
    const selectedType = MEMORY_TYPES.find((t) => t.id === data.type)

    return (
      <div className="pb-40 min-h-screen aurora-bg relative">
        <div className="absolute inset-0 noise-texture opacity-30 pointer-events-none" />

        <div className="relative z-10 px-6 pt-8">
          {renderHeader()}
          {renderStepIndicator()}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1 space-y-8"
          >
            {/* Type Badge */}
            {selectedType && (
              <div className="flex justify-center mb-4">
                <div className={`${selectedType.bgColor} ${selectedType.color} px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium border border-white/40`}>
                  <selectedType.icon size={16} />
                  {selectedType.label}
                </div>
              </div>
            )}

            {/* STORY TYPE */}
            {data.type === 'story' && (
              <>
                <div className="glass-regular rounded-3xl p-6 shadow-glass">
                  <label className="block text-[#3C3748] font-serif font-medium text-xl mb-3">
                    Share your story
                  </label>
                  <textarea
                    rows={8}
                    placeholder="What moment do you want to remember? Describe the setting, the feelings, what made it special..."
                    value={data.text || ''}
                    onChange={(e) => setData({ ...data, text: e.target.value })}
                    className="w-full text-lg leading-relaxed bg-white/50 border border-[#D5C6B4]/30 rounded-2xl px-5 py-4 text-[#3C3748] placeholder:text-[#3C3748]/40 focus:outline-none focus:bg-white/70 focus:ring-2 focus:ring-[#DE9C52]/30 focus:border-[#DE9C52]/50 resize-none transition-all"
                  />
                  <p className="text-right text-xs font-medium text-[#3C3748]/50 mt-2 pr-2">
                    {data.text?.length || 0} / 1000
                  </p>
                </div>

                <div className="glass-regular rounded-3xl p-6 shadow-glass">
                  <label className="block text-[#3C3748] font-serif font-medium text-xl mb-3">
                    When did this happen?
                  </label>
                  <div className="relative">
                    <Input
                      placeholder="Select date"
                      type="date"
                      value={data.date || ''}
                      onChange={(e) => setData({ ...data, date: e.target.value })}
                      className="pl-5 bg-white/50 border-[#D5C6B4]/30 focus:ring-[#DE9C52]/30 focus:border-[#DE9C52]/50"
                    />
                    <Calendar
                      className="absolute right-6 top-4 text-[#3C3748]/40 pointer-events-none"
                      size={20}
                    />
                  </div>
                </div>
              </>
            )}

            {/* PHOTO TYPE */}
            {data.type === 'photo' && (
              <>
                <div
                  onClick={() => {
                    const input = document.getElementById('photo-upload') as HTMLInputElement
                    input?.click()
                  }}
                  className={`glass-regular rounded-3xl flex flex-col items-center justify-center transition-all group cursor-pointer shadow-glass hover:shadow-glass-hover ${
                    photoPreview
                      ? 'border-[#DE9C52]/50 p-4'
                      : 'border-2 border-dashed border-[#D5C6B4]/50 hover:border-[#DE9C52]/50 p-12'
                  }`}
                >
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handlePhotoUpload(file)
                    }}
                    className="hidden"
                  />
                  {photoPreview ? (
                    <div className="relative w-full">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-full aspect-[4/3] object-cover rounded-2xl shadow-md"
                      />
                      <p className="text-center text-sm text-[#3C3748]/60 mt-3">
                        Tap to change photo
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="w-20 h-20 bg-[#DE9C52]/10 rounded-full flex items-center justify-center text-[#DE9C52] mb-4 shadow-sm border border-white/40 group-hover:scale-110 transition-transform">
                        <Upload size={32} strokeWidth={1.5} />
                      </div>
                      <p className="font-serif font-medium text-[#3C3748] text-xl mb-2">
                        Upload a photo
                      </p>
                      <p className="text-[#3C3748]/60 text-sm text-center">
                        Drag and drop or tap to select
                      </p>
                    </>
                  )}
                </div>

                <div className="glass-regular rounded-3xl p-6 shadow-glass">
                  <label className="block text-[#3C3748] font-serif font-medium text-xl mb-3">
                    Add a caption{' '}
                    <span className="text-[#3C3748]/40 font-sans font-normal text-sm">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="What's the story behind this photo?"
                    value={data.caption || ''}
                    onChange={(e) => setData({ ...data, caption: e.target.value })}
                    className="w-full text-base leading-relaxed bg-white/50 border border-[#D5C6B4]/30 rounded-2xl px-4 py-3 text-[#3C3748] placeholder:text-[#3C3748]/40 focus:outline-none focus:bg-white/70 focus:ring-2 focus:ring-[#DE9C52]/30 resize-none transition-all"
                  />
                </div>

                <div className="glass-regular rounded-3xl p-6 shadow-glass">
                  <label className="block text-[#3C3748] font-serif font-medium text-xl mb-3">
                    When was this taken?
                  </label>
                  <div className="relative">
                    <Input
                      placeholder="Select date"
                      type="date"
                      value={data.date || ''}
                      onChange={(e) => setData({ ...data, date: e.target.value })}
                      className="pl-5 bg-white/50 border-[#D5C6B4]/30 focus:ring-[#DE9C52]/30"
                    />
                    <Calendar
                      className="absolute right-6 top-4 text-[#3C3748]/40 pointer-events-none"
                      size={20}
                    />
                  </div>
                </div>
              </>
            )}

            {/* QUOTE TYPE */}
            {data.type === 'quote' && (
              <>
                <div className="glass-regular rounded-3xl p-6 shadow-glass relative overflow-hidden">
                  <Quote
                    size={64}
                    className="absolute -top-4 -left-4 text-[#3C3748]/5"
                    fill="currentColor"
                  />
                  <label className="block text-[#3C3748] font-serif font-medium text-xl mb-3 relative z-10">
                    What did they say?
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Enter the quote or words you remember..."
                    value={data.text || ''}
                    onChange={(e) => setData({ ...data, text: e.target.value })}
                    className="w-full text-xl leading-relaxed bg-white/50 border border-[#D5C6B4]/30 rounded-2xl px-5 py-4 text-[#3C3748] placeholder:text-[#3C3748]/40 focus:outline-none focus:bg-white/70 focus:ring-2 focus:ring-[#DE9C52]/30 resize-none font-serif italic relative z-10 transition-all"
                  />
                </div>

                <div className="glass-regular rounded-3xl p-6 shadow-glass">
                  <label className="block text-[#3C3748] font-serif font-medium text-xl mb-3">
                    Who said this?
                  </label>
                  <Input
                    placeholder="Their name or relationship (e.g., 'Grandma Rose')"
                    value={data.quote_author || ''}
                    onChange={(e) => setData({ ...data, quote_author: e.target.value })}
                    className="bg-white/50 border-[#D5C6B4]/30 focus:ring-[#DE9C52]/30"
                  />
                </div>

                <div className="glass-regular rounded-3xl p-6 shadow-glass">
                  <label className="block text-[#3C3748] font-serif font-medium text-xl mb-3">
                    Context{' '}
                    <span className="text-[#3C3748]/40 font-sans font-normal text-sm">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="When or why did they say this?"
                    value={data.caption || ''}
                    onChange={(e) => setData({ ...data, caption: e.target.value })}
                    className="w-full text-base leading-relaxed bg-white/50 border border-[#D5C6B4]/30 rounded-2xl px-4 py-3 text-[#3C3748] placeholder:text-[#3C3748]/40 focus:outline-none focus:bg-white/70 focus:ring-2 focus:ring-[#DE9C52]/30 resize-none transition-all"
                  />
                </div>
              </>
            )}

            {/* FAVORITE THING TYPE */}
            {data.type === 'favorite' && (
              <>
                <div className="glass-regular rounded-3xl p-6 shadow-glass">
                  <label className="block text-[#3C3748] font-serif font-medium text-xl mb-4">
                    What category?
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {FAVORITE_CATEGORIES.map((cat) => {
                      const Icon = cat.icon
                      const isSelected = data.favorite_category === cat.id
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setData({ ...data, favorite_category: cat.id })}
                          className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                            isSelected
                              ? 'bg-[#DE9C52]/20 border-[#DE9C52] text-[#DE9C52] shadow-[0_0_20px_rgba(222,156,82,0.2)]'
                              : 'bg-white/50 border-[#D5C6B4]/30 text-[#3C3748]/60 hover:bg-white/70 hover:border-[#DE9C52]/50'
                          }`}
                        >
                          <Icon size={24} strokeWidth={1.5} />
                          <span className="text-sm font-medium">{cat.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="glass-regular rounded-3xl p-6 shadow-glass">
                  <label className="block text-[#3C3748] font-serif font-medium text-xl mb-3">
                    What was it?
                  </label>
                  <Input
                    placeholder="e.g., 'Chocolate chip cookies', 'Jazz music'"
                    value={data.text || ''}
                    onChange={(e) => setData({ ...data, text: e.target.value })}
                    className="bg-white/50 border-[#D5C6B4]/30 text-lg focus:ring-[#DE9C52]/30"
                  />
                </div>

                <div className="glass-regular rounded-3xl p-6 shadow-glass">
                  <label className="block text-[#3C3748] font-serif font-medium text-xl mb-3">
                    Tell us more
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Why was this special to them? Any memories connected to it?"
                    value={data.caption || ''}
                    onChange={(e) => setData({ ...data, caption: e.target.value })}
                    className="w-full text-base leading-relaxed bg-white/50 border border-[#D5C6B4]/30 rounded-2xl px-4 py-3 text-[#3C3748] placeholder:text-[#3C3748]/40 focus:outline-none focus:bg-white/70 focus:ring-2 focus:ring-[#DE9C52]/30 resize-none transition-all"
                  />
                </div>

                {/* Optional photo for favorite thing */}
                <div
                  onClick={() => {
                    const input = document.getElementById('photo-upload-fav') as HTMLInputElement
                    input?.click()
                  }}
                  className="glass-thin border-2 border-dashed border-[#D5C6B4]/30 hover:border-[#DE9C52]/50 rounded-2xl p-6 flex flex-col items-center justify-center transition-all group cursor-pointer"
                >
                  <input
                    id="photo-upload-fav"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handlePhotoUpload(file)
                    }}
                    className="hidden"
                  />
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-xl"
                    />
                  ) : (
                    <>
                      <Upload size={20} className="text-[#3C3748]/40 mb-2 group-hover:text-[#DE9C52] transition-colors" />
                      <p className="text-sm text-[#3C3748]/60">
                        Add a photo (optional)
                      </p>
                    </>
                  )}
                </div>
              </>
            )}
          </motion.div>

          <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#F7F7F7] via-[#F7F7F7]/95 to-transparent pt-12">
            <div className="space-y-3 max-w-lg mx-auto">
              <Button fullWidth onClick={handleNext} className="shadow-lg shadow-[#A85846]/20">
                Continue
              </Button>
              <Button
                fullWidth
                variant="glass"
                onClick={handleBack}
              >
                Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Step 3: Context
  if (step === 3) {
    return (
      <div className="pb-40 min-h-screen aurora-bg relative">
        <div className="absolute inset-0 noise-texture opacity-30 pointer-events-none" />

        <div className="relative z-10 px-6 pt-8">
          {renderHeader()}
          {renderStepIndicator()}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1 space-y-6"
          >
            <h2 className="font-serif font-medium text-2xl text-[#3C3748] text-center mb-6">
              Add some context
            </h2>

            <div className="glass-regular rounded-3xl p-6 shadow-glass">
              <label className="block text-[#3C3748] font-serif font-medium text-xl mb-4">
                Where did this take place?
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#A85846]/10 rounded-full flex items-center justify-center text-[#A85846]">
                  <MapPin size={16} />
                </div>
                <Input
                  placeholder="Add location"
                  value={data.location || ''}
                  onChange={(e) => setData({ ...data, location: e.target.value })}
                  className="pl-14 bg-white/50 border-[#D5C6B4]/30 focus:ring-[#DE9C52]/30"
                />
              </div>
            </div>

            <div className="glass-regular rounded-3xl p-6 shadow-glass">
              <label className="block text-[#3C3748] font-serif font-medium text-xl mb-3">
                Who else was there?{' '}
                <span className="text-[#3C3748]/40 font-sans font-normal text-sm">
                  (optional)
                </span>
              </label>
              <Input
                placeholder="Add people"
                value={data.people?.join(', ') || ''}
                onChange={(e) =>
                  setData({
                    ...data,
                    people: e.target.value.split(',').map((p) => p.trim()),
                  })
                }
                className="bg-white/50 border-[#D5C6B4]/30 focus:ring-[#DE9C52]/30"
              />
            </div>

            <div className="glass-regular rounded-3xl p-6 shadow-glass">
              <label className="block text-[#3C3748] font-serif font-medium text-xl mb-4">
                Add tags
              </label>
              <div className="flex gap-3 flex-wrap">
                {['Holiday', 'Birthday', 'Funny', 'Everyday', 'Adventure'].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        const tags = data.tags || []
                        if (tags.includes(tag)) {
                          setData({
                            ...data,
                            tags: tags.filter((t) => t !== tag),
                          })
                        } else {
                          setData({ ...data, tags: [...tags, tag] })
                        }
                      }}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all border ${
                        data.tags?.includes(tag)
                          ? 'bg-[#DE9C52]/20 border-[#DE9C52] text-[#A85846] shadow-[0_0_15px_rgba(222,156,82,0.2)]'
                          : 'bg-white/50 border-[#D5C6B4]/30 text-[#3C3748]/60 hover:bg-white/70 hover:border-[#DE9C52]/50'
                      }`}
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          </motion.div>

          <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#F7F7F7] via-[#F7F7F7]/95 to-transparent pt-12">
            <div className="space-y-3 max-w-lg mx-auto">
              <Button fullWidth onClick={handleNext} className="shadow-lg shadow-[#A85846]/20">
                Continue
              </Button>
              <Button
                fullWidth
                variant="glass"
                onClick={handleBack}
              >
                Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Step 4: Review
  if (step === 4) {
    const selectedType = MEMORY_TYPES.find((t) => t.id === data.type)
    const categoryLabel = FAVORITE_CATEGORIES.find((c) => c.id === data.favorite_category)?.label

    return (
      <div className="pb-40 min-h-screen aurora-bg relative">
        <div className="absolute inset-0 noise-texture opacity-30 pointer-events-none" />

        <div className="relative z-10 px-6 pt-8">
          {renderHeader()}
          {renderStepIndicator()}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1"
          >
            <h2 className="font-serif font-medium text-2xl text-[#3C3748] text-center mb-6">
              Review your memory
            </h2>

            <div className="glass-thick rounded-3xl p-8 space-y-6 relative overflow-hidden shadow-glass-deep">
              {/* Ambient glow */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#DE9C52]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Type Badge */}
              {selectedType && (
                <div className="relative z-10">
                  <div className={`inline-flex items-center gap-2 ${selectedType.bgColor} ${selectedType.color} px-3 py-1.5 rounded-full text-xs font-bold tracking-wide border border-white/40`}>
                    <selectedType.icon size={14} />
                    {selectedType.label.toUpperCase()}
                    {categoryLabel && ` • ${categoryLabel.toUpperCase()}`}
                  </div>
                </div>
              )}

              {/* Quote display */}
              {data.type === 'quote' && data.text && (
                <div className="relative z-10">
                  <Quote size={32} className="text-[#DE9C52]/30 mb-2" fill="currentColor" />
                  <p className="text-[#3C3748] text-xl leading-relaxed font-serif italic mb-2">
                    "{data.text}"
                  </p>
                  {data.quote_author && (
                    <p className="text-[#3C3748]/60 text-sm">— {data.quote_author}</p>
                  )}
                </div>
              )}

              {/* Story/Favorite display */}
              {(data.type === 'story' || data.type === 'favorite') && data.text && (
                <div className="relative z-10">
                  <h3 className="font-serif text-lg font-medium text-[#3C3748] mb-2">
                    {data.type === 'favorite' ? 'Favorite' : 'Story'}
                  </h3>
                  <p className="text-[#3C3748] text-[16px] leading-relaxed opacity-90">
                    {data.type === 'favorite' ? data.text : `"${data.text}"`}
                  </p>
                  {data.caption && (
                    <p className="text-[#3C3748]/70 text-sm mt-2 italic">{data.caption}</p>
                  )}
                </div>
              )}

              {/* Photo display */}
              {photoPreview && (
                <div className="relative z-10">
                  <div className="rounded-2xl overflow-hidden aspect-[4/3] w-full bg-white/30 shadow-md border border-white/30">
                    <img
                      src={photoPreview}
                      alt="Memory"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {data.type === 'photo' && data.caption && (
                    <p className="text-[#3C3748]/70 text-sm mt-3 italic text-center">
                      {data.caption}
                    </p>
                  )}
                </div>
              )}

              {data.location && (
                <div className="relative z-10 flex items-center gap-2 text-[#3C3748]/60">
                  <MapPin size={14} />
                  <span className="text-sm">{data.location}</span>
                </div>
              )}

              {data.tags && data.tags.length > 0 && (
                <div className="relative z-10 flex gap-2 flex-wrap">
                  {data.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-[#DE9C52]/20 border border-[#DE9C52]/30 rounded-full text-xs text-[#A85846] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#F7F7F7] via-[#F7F7F7]/95 to-transparent pt-12">
            <div className="space-y-3 max-w-lg mx-auto">
              <Button
                fullWidth
                onClick={handleSaveMemory}
                disabled={isSubmitting}
                className="shadow-lg shadow-[#A85846]/20"
              >
                {isSubmitting ? 'Saving...' : 'Save Memory'}
              </Button>
              <Button
                fullWidth
                variant="glass"
                onClick={handleBack}
                disabled={isSubmitting}
              >
                Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
