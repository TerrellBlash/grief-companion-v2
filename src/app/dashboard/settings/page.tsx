'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Sun, Moon } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

// BackButton component
const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--glass-bg-regular)] text-[var(--text-main)] border border-[var(--glass-border)] shadow-sm transition-all active:scale-95 hover:bg-[var(--glass-bg-thick)]"
  >
    <ArrowLeft size={20} />
  </button>
)

// Toggle component
const Toggle = ({ enabled, onChange, label }: { enabled: boolean; onChange: (val: boolean) => void; label: string }) => (
  <div onClick={() => onChange(!enabled)} className="flex items-center justify-between py-3 cursor-pointer group">
    <span className="font-medium text-[var(--text-main)]">{label}</span>
    <div
      className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 flex items-center ${
        enabled ? 'bg-[var(--color-clay)]' : 'bg-[var(--color-stone)]/30'
      }`}
    >
      <div
        className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </div>
  </div>
)

// Radio Option component
const RadioOption = ({
  value,
  label,
  sub,
  selectedValue,
  onSelect,
}: {
  value: string
  label: string
  sub: string
  selectedValue: string
  onSelect: (val: string) => void
}) => (
  <button
    onClick={() => onSelect(value)}
    className={`w-full flex items-center gap-4 p-3 rounded-[20px] transition-all duration-300 border ${
      selectedValue === value
        ? 'bg-[var(--bg-main)] border-[var(--color-amber)]'
        : 'bg-transparent border-transparent hover:bg-[var(--glass-bg-thin)]'
    }`}
  >
    <div
      className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
        selectedValue === value ? 'border-[var(--color-amber)] text-[var(--color-amber)]' : 'border-[var(--text-muted)] opacity-30'
      }`}
    >
      {selectedValue === value && <div className="w-3 h-3 rounded-full bg-[var(--color-amber)]" />}
    </div>
    <div className="text-left">
      <p className={`text-sm font-semibold ${selectedValue === value ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)]'}`}>
        {label}
      </p>
      <p className="text-[11px] text-[var(--text-muted)] opacity-80">{sub}</p>
    </div>
  </button>
)

export default function SettingsPage() {
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const [reminderMode, setReminderMode] = useState('on')
  const [anniversaryNudge, setAnniversaryNudge] = useState(true)
  const [streakNudge, setStreakNudge] = useState(true)

  return (
    <div className="h-full flex flex-col bg-[var(--bg-main)] pt-12 transition-colors duration-500">
      {/* Header */}
      <div className="px-6 flex items-center justify-between mb-8">
        <BackButton onClick={() => router.back()} />
        <h2 className="font-serif text-2xl text-[var(--text-main)]">Settings</h2>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        <div className="px-6 space-y-6">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="w-full glass-regular p-4 rounded-[24px] flex items-center justify-between active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--color-sand)]/20 flex items-center justify-center text-[var(--text-main)]">
                {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
              </div>
              <span className="font-medium text-[var(--text-main)]">Dark Mode</span>
            </div>
            <div
              className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 flex items-center ${
                theme === 'dark' ? 'bg-[var(--color-amber)]' : 'bg-[var(--color-stone)]/30'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                  theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </div>
          </button>

          {/* Gentle Reminders Section */}
          <div>
            <h3 className="font-serif text-lg text-[var(--text-main)] mb-3 pl-2">Gentle Reminders</h3>
            <div className="glass-regular rounded-[32px] p-2 border border-[var(--color-sand)]/30">
              <div className="p-2 space-y-1 mb-2">
                <RadioOption value="on" label="On" sub="Check in if I'm away" selectedValue={reminderMode} onSelect={setReminderMode} />
                <RadioOption value="quiet" label="Quiet" sub="Only important dates" selectedValue={reminderMode} onSelect={setReminderMode} />
                <RadioOption value="off" label="Off" sub="I'll come when ready" selectedValue={reminderMode} onSelect={setReminderMode} />
              </div>
              <div className="h-px bg-[var(--color-sand)]/20 mx-4 mb-2" />
              <div className="px-4 pb-2">
                <Toggle label="Anniversary Reminders" enabled={anniversaryNudge} onChange={setAnniversaryNudge} />
                <Toggle label="Missed Streak Nudges" enabled={streakNudge} onChange={setStreakNudge} />
              </div>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] mt-3 px-4 leading-relaxed opacity-70 text-center">
              We&apos;ll only reach out when we think you might need a moment of space. No pressure, ever.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
