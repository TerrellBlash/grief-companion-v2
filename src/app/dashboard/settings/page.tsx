'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

// BackButton component matching Aura.build
const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--glass-bg-regular)] text-[var(--text-main)] border border-[var(--glass-border)] shadow-sm transition-all active:scale-95"
  >
    <ArrowLeft size={20} />
  </button>
);

// Toggle component matching Aura.build
const Toggle = ({ active, onToggle }: { active: boolean; onToggle: () => void }) => (
  <div
    onClick={onToggle}
    className={`w-12 h-7 rounded-full flex items-center p-1 cursor-pointer transition-colors duration-300 ${
      active ? 'bg-[#DE9C52]' : 'bg-[#D5C6B4]'
    }`}
  >
    <div
      className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
        active ? 'translate-x-5' : 'translate-x-0'
      }`}
    />
  </div>
);

export default function SettingsPage() {
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const [nudgeEnabled, setNudgeEnabled] = useState(true)
  const [anniversary, setAnniversary] = useState(true)

  return (
    <div className="h-full flex flex-col bg-[var(--bg-main)] pt-12 px-6 relative transition-colors duration-500">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <BackButton onClick={() => router.back()} />
        <h2 className="font-serif text-2xl text-[var(--text-main)]">Settings</h2>
      </div>

      <div className="space-y-6 animate-enter">
        {/* Appearance Section */}
        <div className="glass-regular rounded-[24px] p-6">
          <h3 className="font-serif text-xl text-[var(--text-main)] mb-1">Appearance</h3>
          <div className="flex items-center justify-between mt-4">
            <div>
              <p className="font-medium text-[var(--text-main)]">Dark Mode</p>
              <p className="text-xs text-[var(--text-muted)]">Dim the lights</p>
            </div>
            <Toggle active={theme === 'dark'} onToggle={toggleTheme} />
          </div>
        </div>

        {/* Gentle Nudges Section */}
        <div className="glass-regular rounded-[24px] p-6">
          <h3 className="font-serif text-xl text-[var(--text-main)] mb-4">Gentle Nudges</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[var(--text-main)]">Nudge Mode</p>
                <p className="text-xs text-[var(--text-muted)]">Receive gentle reminders</p>
              </div>
              <Toggle active={nudgeEnabled} onToggle={() => setNudgeEnabled(!nudgeEnabled)} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[var(--text-main)]">Anniversaries</p>
                <p className="text-xs text-[var(--text-muted)]">Notes before significant dates</p>
              </div>
              <Toggle active={anniversary} onToggle={() => setAnniversary(!anniversary)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
