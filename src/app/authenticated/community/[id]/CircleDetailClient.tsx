'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Users, Flower2, Dog, Heart, Send, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { FloatingNav } from '@/components/layout/FloatingNav'
import type { Circle, CirclePost } from '@/lib/services/circles'

interface CircleDetailClientProps {
  circle: Circle
  posts: CirclePost[]
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

export function CircleDetailClient({ circle, posts }: CircleDetailClientProps) {
  const router = useRouter()
  const [newPost, setNewPost] = useState('')
  const [localPosts, setLocalPosts] = useState(posts)
  const [isPosting, setIsPosting] = useState(false)

  const Icon = circleIcons[circle.icon] || Flower2
  const bgColorClass = circleColors[circle.icon] || circleColors.flower

  const handlePost = async () => {
    if (!newPost.trim() || isPosting) return

    setIsPosting(true)

    // Optimistically add the post
    const optimisticPost: CirclePost = {
      id: Date.now().toString(),
      user_id: 'current-user',
      circle_id: circle.id,
      content: newPost,
      created_at: new Date().toISOString(),
      user_name: 'You',
    }

    setLocalPosts([optimisticPost, ...localPosts])
    setNewPost('')
    setIsPosting(false)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F0E8] via-[#E8E4E0] to-[#D5C6B4]/30 safe-all pb-48">
      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-[#F5F0E8]/80 border-b border-white/40">
        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full glass-thin flex items-center justify-center text-martinique hover:bg-white/60 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="text-center">
            <h1 className="font-serif font-semibold text-lg text-martinique">{circle.name}</h1>
            <p className="text-xs text-martinique/60">{circle.member_count} members</p>
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      {/* Circle Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-6 mt-6 rounded-3xl bg-white/40 border border-white/60 p-6"
      >
        <div className="flex items-start gap-4 mb-4">
          <div
            className={`w-16 h-16 rounded-[20px] flex items-center justify-center shadow-inner border border-white/20 bg-gradient-to-br ${bgColorClass}`}
          >
            <Icon size={28} strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div
                className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                  circle.is_open
                    ? 'bg-[#4A7C59]/10 text-[#4A7C59] border border-[#4A7C59]/20'
                    : 'bg-black/5 text-martinique/60 border border-black/5'
                }`}
              >
                {circle.is_open ? 'Active now' : 'Closed'}
              </div>
            </div>
            <p className="text-martinique/70 text-sm leading-relaxed">
              {circle.description}
            </p>
          </div>
        </div>

        {/* Member Avatars */}
        <div className="flex items-center gap-3 pt-2 border-t border-black/5">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-white/60 bg-gradient-to-br from-sand to-honey shadow-sm overflow-hidden"
              >
                <img
                  src={`https://picsum.photos/seed/${i + 100}/100/100`}
                  className="w-full h-full object-cover opacity-90"
                  alt="member"
                />
              </div>
            ))}
          </div>
          <span className="text-xs text-martinique/60">
            +{Math.max(0, circle.member_count - 4)} others
          </span>
        </div>
      </motion.div>

      {/* New Post Input */}
      <div className="mx-6 mt-6">
        <div className="rounded-2xl bg-white/40 border border-white/60 p-4">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share what's on your mind..."
            rows={3}
            className="w-full bg-transparent border-none focus:outline-none text-martinique placeholder:text-martinique/40 text-[15px] resize-none"
          />
          <div className="flex justify-end pt-2 border-t border-black/5">
            <Button
              onClick={handlePost}
              disabled={!newPost.trim() || isPosting}
              className="text-sm px-5 py-2 h-9 min-h-0 rounded-full"
            >
              <Send size={14} className="mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="px-6 pt-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <MessageCircle size={16} className="text-martinique/60" />
          <span className="text-sm font-medium text-martinique/60">
            Recent Shares
          </span>
        </div>

        {localPosts.length === 0 ? (
          <div className="text-center py-12 text-martinique/50">
            <MessageCircle size={32} className="mx-auto mb-3 opacity-50" />
            <p className="text-sm">No posts yet. Be the first to share.</p>
          </div>
        ) : (
          localPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="rounded-2xl bg-white/40 border border-white/60 p-5"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sand to-honey overflow-hidden border border-white/40">
                  {post.user_avatar ? (
                    <img
                      src={post.user_avatar}
                      alt={post.user_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm font-bold text-martinique">
                      {post.user_name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-martinique text-sm">
                    {post.user_name}
                  </p>
                  <p className="text-xs text-martinique/50">
                    {formatDate(post.created_at)}
                  </p>
                </div>
              </div>
              <p className="text-martinique/80 text-[15px] leading-relaxed pl-1">
                {post.content}
              </p>
            </motion.div>
          ))
        )}
      </div>

      <FloatingNav />
    </div>
  )
}
