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
}> = [
  {
    id: 'story',
    icon: BookOpen,
    label: 'Story',
    sub: 'Share a meaningful moment',
  },
  {
    id: 'photo',
    icon: ImageIcon,
    label: 'Photo',
    sub: 'Upload a cherished picture',
  },
  {
    id: 'quote',
    icon: MessageSquareQuote,
    label: 'Quote',
    sub: 'Remember their words',
  },
  {
    id: 'favorite',
    icon: Star,
    label: 'Favorite Thing',
    sub: 'Something they loved',
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
      <p className="text-[10px] font-bold text-martinique/40 tracking-[0.2em] uppercase mb-4 opacity-70">
        Step {step} of 4
      </p>
      <div className="flex items-center justify-center gap-2">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`h-1.5 rounded-full transition-all duration-500 ease-out shadow-sm ${
              s === step
                ? 'w-10 bg-honey'
                : s < step
                  ? 'w-2 bg-honey/40'
                  : 'w-2 bg-black/10'
            }`}
          />
        ))}
      </div>
    </div>
  )

  // Step 1: Type Selection
  if (step === 1) {
    return (
      <div className="pb-40 min-h-screen flex flex-col px-6 pt-8">
        {renderStepIndicator()}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1"
        >
          <h2 className="font-serif font-medium text-3xl text-martinique text-center mb-8 drop-shadow-sm">
            Choose a memory type
          </h2>
          <div className="space-y-4">
            {MEMORY_TYPES.map((type) => {
              const Icon = type.icon
              return (
                <motion.button
                  key={type.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setData({ ...data, type: type.id })
                    handleNext()
                  }}
                  className="w-full bg-white/40 hover:bg-white/60 active:scale-[0.98] p-5 rounded-3xl flex items-center justify-between text-left transition-all group relative overflow-hidden border border-white/60"
                >
                  <div className="flex items-center gap-5 relative z-10">
                    <div className="w-14 h-14 bg-white/50 rounded-[18px] flex items-center justify-center text-martinique/60 group-hover:text-honey group-hover:bg-white transition-all shadow-inner border border-white/20">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-serif font-medium text-martinique text-xl mb-1 tracking-tight">
                        {type.label}
                      </p>
                      <p className="text-sm text-martinique/60 font-medium">
                        {type.sub}
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-transparent group-hover:text-honey group-hover:border-honey transition-all bg-white/30">
                    <Check size={16} />
                  </div>
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      </div>
    )
  }

  // Step 2: Details (Type-specific UI)
  if (step === 2) {
    return (
      <div className="pb-40 min-h-screen flex flex-col px-6 pt-8">
        {renderStepIndicator()}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 space-y-8"
        >
          {/* STORY TYPE */}
          {data.type === 'story' && (
            <>
              <div>
                <label className="block text-martinique font-serif font-medium text-xl mb-3 pl-1">
                  Share your story
                </label>
                <textarea
                  rows={10}
                  placeholder="What moment do you want to remember? Describe the setting, the feelings, what made it special..."
                  value={data.text || ''}
                  onChange={(e) => setData({ ...data, text: e.target.value })}
                  className="w-full text-lg leading-relaxed bg-white/40 border border-white/60 rounded-3xl px-5 py-4 text-martinique placeholder:text-martinique/40 focus:outline-none focus:bg-white/60 focus:ring-2 focus:ring-honey/30 resize-none"
                />
                <p className="text-right text-xs font-medium text-martinique/60 mt-2 pr-2">
                  {data.text?.length || 0} / 1000
                </p>
              </div>

              <div>
                <label className="block text-martinique font-serif font-medium text-xl mb-3 pl-1">
                  When did this happen?
                </label>
                <div className="relative">
                  <Input
                    placeholder="Select date"
                    type="date"
                    value={data.date || ''}
                    onChange={(e) => setData({ ...data, date: e.target.value })}
                    className="pl-5 bg-white/40 border border-white/60"
                  />
                  <Calendar
                    className="absolute right-6 top-4 text-martinique/60 pointer-events-none"
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
                className={`border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all group cursor-pointer ${
                  photoPreview
                    ? 'border-honey/50 bg-white/40 p-4'
                    : 'border-black/10 hover:border-honey/30 bg-white/30 hover:bg-white/60 p-12'
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
                      className="w-full aspect-[4/3] object-cover rounded-2xl"
                    />
                    <p className="text-center text-sm text-martinique/60 mt-3">
                      Tap to change photo
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-white/60 rounded-full flex items-center justify-center text-martinique/60 mb-4 shadow-sm border border-white/40 group-hover:scale-110 transition-transform">
                      <Upload size={32} strokeWidth={1.5} />
                    </div>
                    <p className="font-serif font-medium text-martinique text-xl mb-2">
                      Upload a photo
                    </p>
                    <p className="text-martinique/60 text-sm text-center">
                      Drag and drop or tap to select
                    </p>
                  </>
                )}
              </div>

              <div>
                <label className="block text-martinique font-serif font-medium text-xl mb-3 pl-1">
                  Add a caption{' '}
                  <span className="text-martinique/40 font-sans font-normal text-sm">
                    (optional)
                  </span>
                </label>
                <textarea
                  rows={3}
                  placeholder="What's the story behind this photo?"
                  value={data.caption || ''}
                  onChange={(e) => setData({ ...data, caption: e.target.value })}
                  className="w-full text-base leading-relaxed bg-white/40 border border-white/60 rounded-2xl px-4 py-3 text-martinique placeholder:text-martinique/40 focus:outline-none focus:bg-white/60 focus:ring-2 focus:ring-honey/30 resize-none"
                />
              </div>

              <div>
                <label className="block text-martinique font-serif font-medium text-xl mb-3 pl-1">
                  When was this taken?
                </label>
                <div className="relative">
                  <Input
                    placeholder="Select date"
                    type="date"
                    value={data.date || ''}
                    onChange={(e) => setData({ ...data, date: e.target.value })}
                    className="pl-5 bg-white/40 border border-white/60"
                  />
                  <Calendar
                    className="absolute right-6 top-4 text-martinique/60 pointer-events-none"
                    size={20}
                  />
                </div>
              </div>
            </>
          )}

          {/* QUOTE TYPE */}
          {data.type === 'quote' && (
            <>
              <div className="relative">
                <Quote
                  size={48}
                  className="absolute -top-2 -left-2 text-honey/20"
                  fill="currentColor"
                />
                <label className="block text-martinique font-serif font-medium text-xl mb-3 pl-1">
                  What did they say?
                </label>
                <textarea
                  rows={6}
                  placeholder="Enter the quote or words you remember..."
                  value={data.text || ''}
                  onChange={(e) => setData({ ...data, text: e.target.value })}
                  className="w-full text-xl leading-relaxed bg-white/40 border border-white/60 rounded-3xl px-5 py-4 text-martinique placeholder:text-martinique/40 focus:outline-none focus:bg-white/60 focus:ring-2 focus:ring-honey/30 resize-none font-serif italic"
                />
              </div>

              <div>
                <label className="block text-martinique font-serif font-medium text-xl mb-3 pl-1">
                  Who said this?
                </label>
                <Input
                  placeholder="Their name or relationship (e.g., 'Grandma Rose')"
                  value={data.quote_author || ''}
                  onChange={(e) => setData({ ...data, quote_author: e.target.value })}
                  className="bg-white/40 border border-white/60"
                />
              </div>

              <div>
                <label className="block text-martinique font-serif font-medium text-xl mb-3 pl-1">
                  Context{' '}
                  <span className="text-martinique/40 font-sans font-normal text-sm">
                    (optional)
                  </span>
                </label>
                <textarea
                  rows={3}
                  placeholder="When or why did they say this?"
                  value={data.caption || ''}
                  onChange={(e) => setData({ ...data, caption: e.target.value })}
                  className="w-full text-base leading-relaxed bg-white/40 border border-white/60 rounded-2xl px-4 py-3 text-martinique placeholder:text-martinique/40 focus:outline-none focus:bg-white/60 focus:ring-2 focus:ring-honey/30 resize-none"
                />
              </div>
            </>
          )}

          {/* FAVORITE THING TYPE */}
          {data.type === 'favorite' && (
            <>
              <div>
                <label className="block text-martinique font-serif font-medium text-xl mb-4 pl-1">
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
                            ? 'bg-honey/20 border-honey text-honey'
                            : 'bg-white/40 border-white/60 text-martinique/60 hover:bg-white/60'
                        }`}
                      >
                        <Icon size={24} strokeWidth={1.5} />
                        <span className="text-sm font-medium">{cat.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="block text-martinique font-serif font-medium text-xl mb-3 pl-1">
                  What was it?
                </label>
                <Input
                  placeholder="e.g., 'Chocolate chip cookies', 'Jazz music'"
                  value={data.text || ''}
                  onChange={(e) => setData({ ...data, text: e.target.value })}
                  className="bg-white/40 border border-white/60 text-lg"
                />
              </div>

              <div>
                <label className="block text-martinique font-serif font-medium text-xl mb-3 pl-1">
                  Tell us more
                </label>
                <textarea
                  rows={5}
                  placeholder="Why was this special to them? Any memories connected to it?"
                  value={data.caption || ''}
                  onChange={(e) => setData({ ...data, caption: e.target.value })}
                  className="w-full text-base leading-relaxed bg-white/40 border border-white/60 rounded-2xl px-4 py-3 text-martinique placeholder:text-martinique/40 focus:outline-none focus:bg-white/60 focus:ring-2 focus:ring-honey/30 resize-none"
                />
              </div>

              {/* Optional photo for favorite thing */}
              <div
                onClick={() => {
                  const input = document.getElementById('photo-upload') as HTMLInputElement
                  input?.click()
                }}
                className="border-2 border-dashed border-black/10 hover:border-honey/30 rounded-2xl p-6 flex flex-col items-center justify-center bg-white/30 hover:bg-white/60 transition-all group cursor-pointer"
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
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-xl"
                  />
                ) : (
                  <>
                    <Upload size={20} className="text-martinique/40 mb-2" />
                    <p className="text-sm text-martinique/60">
                      Add a photo (optional)
                    </p>
                  </>
                )}
              </div>
            </>
          )}
        </motion.div>

        <div className="p-6 space-y-3">
          <Button fullWidth onClick={handleNext} className="shadow-xl">
            Continue
          </Button>
          <Button
            fullWidth
            variant="glass"
            onClick={handleBack}
            className="shadow-xl"
          >
            Back
          </Button>
        </div>
      </div>
    )
  }

  // Step 3: Context
  if (step === 3) {
    return (
      <div className="pb-40 min-h-screen flex flex-col px-6 pt-8">
        {renderStepIndicator()}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 space-y-8"
        >
          <div>
            <label className="block text-martinique font-serif font-medium text-xl mb-4 pl-1">
              Where did this take place?
            </label>
            <div className="relative">
              <div className="absolute left-5 top-4 w-7 h-7 bg-white/50 rounded-full flex items-center justify-center text-martinique/60 text-xs">
                <MapPin size={14} />
              </div>
              <Input
                placeholder="Add location"
                value={data.location || ''}
                onChange={(e) => setData({ ...data, location: e.target.value })}
                className="pl-14 bg-white/40 border border-white/60"
              />
            </div>
          </div>

          <div>
            <label className="block text-martinique font-serif font-medium text-xl mb-3 pl-1">
              Who else was there?{' '}
              <span className="text-martinique/60 font-sans font-normal text-sm opacity-60">
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
              className="bg-white/40 border border-white/60"
            />
          </div>

          <div>
            <label className="block text-martinique font-serif font-medium text-xl mb-3 pl-1">
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
                        ? 'bg-white/60 border-honey text-honey'
                        : 'bg-transparent border-black/10 text-martinique/60 hover:bg-white/40'
                    }`}
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </div>
        </motion.div>

        <div className="p-6 space-y-3">
          <Button fullWidth onClick={handleNext} className="shadow-xl">
            Continue
          </Button>
          <Button
            fullWidth
            variant="glass"
            onClick={handleBack}
            className="shadow-xl"
          >
            Back
          </Button>
        </div>
      </div>
    )
  }

  // Step 4: Review
  if (step === 4) {
    const typeLabel = MEMORY_TYPES.find((t) => t.id === data.type)?.label
    const categoryLabel = FAVORITE_CATEGORIES.find((c) => c.id === data.favorite_category)?.label

    return (
      <div className="pb-40 min-h-screen flex flex-col px-6 pt-8">
        {renderStepIndicator()}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1"
        >
          <div className="rounded-3xl bg-white/40 border border-white/60 p-8 space-y-6 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-honey/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <p className="text-[10px] font-bold text-martinique/40 tracking-[0.2em] uppercase mb-2">
                {typeLabel} {categoryLabel && `• ${categoryLabel}`}
              </p>
            </div>

            {/* Quote display */}
            {data.type === 'quote' && data.text && (
              <div className="relative z-10">
                <Quote size={32} className="text-honey/30 mb-2" fill="currentColor" />
                <p className="text-martinique text-xl leading-relaxed font-serif italic mb-2">
                  "{data.text}"
                </p>
                {data.quote_author && (
                  <p className="text-martinique/60 text-sm">— {data.quote_author}</p>
                )}
              </div>
            )}

            {/* Story/Favorite display */}
            {(data.type === 'story' || data.type === 'favorite') && data.text && (
              <div className="relative z-10">
                <h3 className="font-serif text-lg font-medium text-martinique mb-2">
                  {data.type === 'favorite' ? 'Favorite' : 'Story'}
                </h3>
                <p className="text-martinique text-[16px] leading-relaxed opacity-90">
                  {data.type === 'favorite' ? data.text : `"${data.text}"`}
                </p>
                {data.caption && (
                  <p className="text-martinique/70 text-sm mt-2 italic">{data.caption}</p>
                )}
              </div>
            )}

            {/* Photo display */}
            {photoPreview && (
              <div className="relative z-10">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] w-full bg-white/30 shadow-inner border border-white/30">
                  <img
                    src={photoPreview}
                    alt="Memory"
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>
                {data.type === 'photo' && data.caption && (
                  <p className="text-martinique/70 text-sm mt-3 italic text-center">
                    {data.caption}
                  </p>
                )}
              </div>
            )}

            {data.location && (
              <div className="relative z-10 flex items-center gap-2 text-martinique/60">
                <MapPin size={14} />
                <span className="text-sm">{data.location}</span>
              </div>
            )}

            {data.tags && data.tags.length > 0 && (
              <div className="relative z-10 flex gap-2 flex-wrap">
                {data.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-honey/20 border border-honey/30 rounded-full text-xs text-martinique"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        <div className="p-6 space-y-3">
          <Button
            fullWidth
            onClick={handleSaveMemory}
            disabled={isSubmitting}
            className="shadow-xl"
          >
            {isSubmitting ? 'Saving...' : 'Save Memory'}
          </Button>
          <Button
            fullWidth
            variant="glass"
            onClick={handleBack}
            disabled={isSubmitting}
            className="shadow-xl"
          >
            Back
          </Button>
        </div>
      </div>
    )
  }

  return null
}
