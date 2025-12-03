'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Heart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import type { Circle, CirclePost } from '@/lib/services/circles'

interface CircleDetailProps {
  circle: Circle
  posts: CirclePost[]
}

const timeAgo = (date: string) => {
  const now = new Date()
  const postDate = new Date(date)
  const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000)

  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}

export function CircleDetail({ circle, posts }: CircleDetailProps) {
  const [reflection, setReflection] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleShareReflection = async () => {
    if (!reflection.trim()) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/circles/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          circle_id: circle.id,
          content: reflection,
        }),
      })

      if (response.ok) {
        setReflection('')
        // Optionally refresh posts here
      }
    } catch (error) {
      console.error('Error sharing reflection:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pb-40 min-h-screen px-6 pt-8 space-y-6">
      {/* Privacy Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl bg-white/40 border border-white/60 p-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/40 rounded-full -mr-16 -mt-16 blur-3xl opacity-50 pointer-events-none" />
        <div className="flex gap-4 items-start relative z-10">
          <div className="p-3 bg-white/50 rounded-[16px] border border-white/40 text-honey shadow-sm">
            <Lock size={22} strokeWidth={1.5} />
          </div>
          <div>
            <h4 className="font-serif font-medium text-lg text-martinique">
              Private & Secure
            </h4>
            <p className="text-martinique/60 text-sm mt-1 leading-relaxed">
              Everything shared here stays within our circle. Your reflections are held with care.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Share Reflection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-3xl bg-white/40 border border-white/60 p-6"
      >
        <h3 className="font-serif font-medium text-lg text-martinique mb-3">
          Share your reflection
        </h3>
        <textarea
          placeholder="What's on your mind today?"
          rows={3}
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          className="w-full bg-white/30 border border-white/40 rounded-2xl px-4 py-3 text-martinique placeholder:text-martinique/40 focus:outline-none focus:bg-white/60 focus:ring-2 focus:ring-honey/30 resize-none"
        />
        <div className="flex justify-end mt-4">
          <Button
            onClick={handleShareReflection}
            disabled={isSubmitting || !reflection.trim()}
            className="px-6 py-2.5 text-sm"
          >
            {isSubmitting ? 'Sharing...' : 'Share'}
          </Button>
        </div>
      </motion.div>

      {/* Feed */}
      <div className="space-y-4">
        <h3 className="font-sans font-bold text-xs text-martinique/40 uppercase tracking-widest px-1">
          Latest Reflections
        </h3>

        {posts.length === 0 ? (
          <p className="text-center text-martinique/60 py-8">
            No reflections yet. Be the first to share.
          </p>
        ) : (
          posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="rounded-3xl bg-white/40 border border-white/60 p-6 hover:bg-white/60 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sand to-honey border border-white/60 flex items-center justify-center text-xs font-bold text-martinique shadow-sm">
                  {post.user_name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-martinique text-sm">
                    {post.user_name}
                  </p>
                  <p className="text-xs text-martinique/60 font-medium">
                    {timeAgo(post.created_at)}
                  </p>
                </div>
              </div>
              <p className="text-martinique text-[15px] leading-relaxed opacity-90 mb-4">
                {post.content}
              </p>
              <div className="flex gap-5 border-t border-black/5 pt-4">
                <button className="text-xs text-martinique/60 flex items-center gap-1.5 hover:text-honey transition-colors font-bold uppercase tracking-wide">
                  <Heart size={14} /> Hug (0)
                </button>
                <button className="text-xs text-martinique/60 flex items-center gap-1.5 hover:text-honey transition-colors font-bold uppercase tracking-wide">
                  Reply
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
