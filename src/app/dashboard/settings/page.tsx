'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Bell, Calendar, Moon, Sun, Heart } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import Toggle from '@/components/shared/Toggle'

export default function SettingsPage() {
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const [nudgesEnabled, setNudgesEnabled] = useState(true)
  const [anniversaryReminders, setAnniversaryReminders] = useState(true)

  const isDarkMode = theme === 'dark'

  return (
    <div className="min-h-full aurora-bg relative flex flex-col pt-12 px-6 pb-12 transition-colors duration-500">
      <div className="absolute inset-0 noise-texture pointer-events-none z-0 mix-blend-overlay" />
      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full glass-thin flex items-center justify-center hover:bg-white/80 transition-all active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 text-[var(--text-main)]" />
        </button>
        <h2 className="font-serif text-2xl text-[var(--text-main)]">Settings</h2>
        <div className="w-10" />
      </div>

      <div className="space-y-6 animate-enter relative z-10">
        {/* Notifications Section */}
        <div className="glass-regular rounded-3xl p-5">
          <h3 className="font-serif text-lg text-[var(--text-main)] mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#DE9C52]" />
            Gentle Nudges
          </h3>

          {/* Nudge Mode Toggle */}
          <div className="flex items-center justify-between py-3 border-b border-[#D5C6B4]/30">
            <div>
              <p className="text-[var(--text-main)] font-medium">Nudge Mode</p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Receive gentle reminders to check in
              </p>
            </div>
            <Toggle active={nudgesEnabled} onToggle={() => setNudgesEnabled(!nudgesEnabled)} />
          </div>

          {/* Anniversary Reminders Toggle */}
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-[var(--text-main)] font-medium">Anniversary Reminders</p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Get notified on meaningful dates
              </p>
            </div>
            <Toggle active={anniversaryReminders} onToggle={() => setAnniversaryReminders(!anniversaryReminders)} />
          </div>
        </div>

        {/* Notification Preview */}
        {nudgesEnabled && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-thin border-l-4 border-l-[#DE9C52] p-4 rounded-r-2xl rounded-l-sm"
          >
            <p className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider mb-2">
              Preview
            </p>
            <p className="font-serif text-[var(--text-main)] text-sm">
              "Your space is here whenever you need it."
            </p>
            <p className="text-[var(--text-muted)] text-xs mt-1">
              Tomorrow marks one year since Mom's passing.
            </p>
          </motion.div>
        )}

        {/* Appearance Section */}
        <div className="glass-regular rounded-3xl p-5">
          <h3 className="font-serif text-lg text-[var(--text-main)] mb-4 flex items-center gap-2">
            {isDarkMode ? (
              <Moon className="w-5 h-5 text-[#DE9C52]" />
            ) : (
              <Sun className="w-5 h-5 text-[#DE9C52]" />
            )}
            Appearance
          </h3>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-[var(--text-main)] font-medium">Dark Mode</p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Easier on the eyes at night
              </p>
            </div>
            <Toggle active={isDarkMode} onToggle={toggleTheme} />
          </div>
        </div>

        {/* Loved Ones Section */}
        <div className="glass-regular rounded-3xl p-5">
          <h3 className="font-serif text-lg text-[var(--text-main)] mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#DE9C52]" />
            Loved Ones
          </h3>

          <div className="flex items-center gap-4 py-3 border-b border-[#D5C6B4]/30">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#DE9C52] to-[#A85846] flex items-center justify-center text-white font-serif text-lg">
              M
            </div>
            <div className="flex-1">
              <p className="text-[var(--text-main)] font-medium">Mom</p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Added Oct 1, 2024
              </p>
            </div>
          </div>

          <button className="w-full mt-4 py-3 text-center text-[#DE9C52] font-medium hover:text-[#A85846] transition-colors">
            + Add another loved one
          </button>
        </div>

        {/* Calendar Section */}
        <div className="glass-regular rounded-3xl p-5">
          <h3 className="font-serif text-lg text-[var(--text-main)] mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#DE9C52]" />
            Important Dates
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-[var(--text-main)] font-medium">Mom's Birthday</p>
                <p className="text-xs text-[var(--text-muted)]">March 15</p>
              </div>
              <span className="text-xs text-[#A85846] bg-[#A85846]/10 px-2 py-1 rounded-full">
                In 98 days
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-[var(--text-main)] font-medium">Anniversary</p>
                <p className="text-xs text-[var(--text-muted)]">October 20</p>
              </div>
              <span className="text-xs text-[var(--text-muted)] bg-[#D5C6B4]/20 px-2 py-1 rounded-full">
                Passed
              </span>
            </div>
          </div>

          <button className="w-full mt-4 py-3 text-center text-[#DE9C52] font-medium hover:text-[#A85846] transition-colors">
            + Add important date
          </button>
        </div>
      </div>
    </div>
  )
}
