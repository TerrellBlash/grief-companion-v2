'use client'

import { Header } from '@/components/ui'
import { FloatingNav } from '@/components/layout/FloatingNav'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sand/30 safe-all pb-40">
      <Header
        title="Grief Companion"
        subtitle="A space for remembering"
      />

      <div className="px-6 py-8 max-w-2xl mx-auto">
        <div className="glass-regular rounded-2xl p-6 mb-4">
          <p className="text-body text-martinique">
            Welcome home. This page is ready for content.
          </p>
        </div>
      </div>

      <FloatingNav />
    </div>
  )
}
