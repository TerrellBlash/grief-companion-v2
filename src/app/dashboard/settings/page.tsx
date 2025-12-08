'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Bell, Calendar, Moon, Sun, Heart } from 'lucide-react'

export default function SettingsPage() {
  const router = useRouter()
  const [nudgesEnabled, setNudgesEnabled] = useState(true)
  const [anniversaryReminders, setAnniversaryReminders] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="min-h-screen bg-lynx flex flex-col pt-12 px-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center hover:bg-white/80 transition-all active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 text-howl" />
        </button>
        <h2 className="font-serif text-2xl text-howl">Settings</h2>
        <div className="w-10" />
      </div>

      <div className="space-y-6 animate-enter">
        {/* Notifications Section */}
        <div className="glass-regular rounded-3xl p-5">
          <h3 className="font-serif text-lg text-howl mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-honey" />
            Gentle Nudges
          </h3>

          {/* Nudge Mode Toggle */}
          <div className="flex items-center justify-between py-3 border-b border-sand/30">
            <div>
              <p className="text-howl font-medium">Nudge Mode</p>
              <p className="text-xs text-howl/50 mt-0.5">
                Receive gentle reminders to check in
              </p>
            </div>
            <button
              onClick={() => setNudgesEnabled(!nudgesEnabled)}
              className={`w-12 h-7 rounded-full transition-colors relative ${
                nudgesEnabled ? 'bg-honey' : 'bg-sand/50'
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  nudgesEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Anniversary Reminders Toggle */}
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-howl font-medium">Anniversary Reminders</p>
              <p className="text-xs text-howl/50 mt-0.5">
                Get notified on meaningful dates
              </p>
            </div>
            <button
              onClick={() => setAnniversaryReminders(!anniversaryReminders)}
              className={`w-12 h-7 rounded-full transition-colors relative ${
                anniversaryReminders ? 'bg-honey' : 'bg-sand/50'
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  anniversaryReminders ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Notification Preview */}
        {nudgesEnabled && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-thin border-l-4 border-l-honey p-4 rounded-r-2xl rounded-l-sm"
          >
            <p className="text-[10px] uppercase font-bold text-howl/40 tracking-wider mb-2">
              Preview
            </p>
            <p className="font-serif text-howl text-sm">
              "Your space is here whenever you need it."
            </p>
            <p className="text-howl/50 text-xs mt-1">
              Tomorrow marks one year since Mom's passing.
            </p>
          </motion.div>
        )}

        {/* Appearance Section */}
        <div className="glass-regular rounded-3xl p-5">
          <h3 className="font-serif text-lg text-howl mb-4 flex items-center gap-2">
            {darkMode ? (
              <Moon className="w-5 h-5 text-honey" />
            ) : (
              <Sun className="w-5 h-5 text-honey" />
            )}
            Appearance
          </h3>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-howl font-medium">Dark Mode</p>
              <p className="text-xs text-howl/50 mt-0.5">
                Easier on the eyes at night
              </p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-7 rounded-full transition-colors relative ${
                darkMode ? 'bg-honey' : 'bg-sand/50'
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Loved Ones Section */}
        <div className="glass-regular rounded-3xl p-5">
          <h3 className="font-serif text-lg text-howl mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-honey" />
            Loved Ones
          </h3>

          <div className="flex items-center gap-4 py-3 border-b border-sand/30">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-honey to-spice flex items-center justify-center text-white font-serif text-lg">
              M
            </div>
            <div className="flex-1">
              <p className="text-howl font-medium">Mom</p>
              <p className="text-xs text-howl/50 mt-0.5">
                Added Oct 1, 2024
              </p>
            </div>
          </div>

          <button className="w-full mt-4 py-3 text-center text-honey font-medium hover:text-spice transition-colors">
            + Add another loved one
          </button>
        </div>

        {/* Calendar Section */}
        <div className="glass-regular rounded-3xl p-5">
          <h3 className="font-serif text-lg text-howl mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-honey" />
            Important Dates
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-howl font-medium">Mom's Birthday</p>
                <p className="text-xs text-howl/50">March 15</p>
              </div>
              <span className="text-xs text-spice bg-spice/10 px-2 py-1 rounded-full">
                In 98 days
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-howl font-medium">Anniversary</p>
                <p className="text-xs text-howl/50">October 20</p>
              </div>
              <span className="text-xs text-howl/40 bg-sand/20 px-2 py-1 rounded-full">
                Passed
              </span>
            </div>
          </div>

          <button className="w-full mt-4 py-3 text-center text-honey font-medium hover:text-spice transition-colors">
            + Add important date
          </button>
        </div>
      </div>
    </div>
  )
}
