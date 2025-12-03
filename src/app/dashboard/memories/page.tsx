'use client'

import { Header } from '@/components/ui'
import { FloatingNav } from '@/components/layout/FloatingNav'

export default function MemoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sand/30 safe-all pb-40">
      <Header title="Memories" onBack={() => window.history.back()} />

      <div className="px-6 py-8 max-w-2xl mx-auto">
        <div className="glass-regular rounded-2xl p-6 mb-4">
          <p className="text-body text-martinique">
            Memory creation and gallery coming soon.
          </p>
        </div>
      </div>

      <FloatingNav />
    </div>
  )
}
