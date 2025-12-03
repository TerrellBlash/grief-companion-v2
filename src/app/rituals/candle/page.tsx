'use client'

import { Header } from '@/components/ui'
import { CandleFlame } from '@/components/ritual/CandleFlame'

export default function CandlePage() {
  return (
    <div className="min-h-screen bg-howl text-white safe-all">
      <Header
        title="Light a Candle"
        transparent
        onBack={() => window.history.back()}
      />

      <div className="flex flex-col items-center justify-center h-96 py-8">
        <CandleFlame isLit={true} />
      </div>

      <div className="px-6 py-8 max-w-2xl mx-auto">
        <div className="glass-regular rounded-2xl p-6 mb-4">
          <p className="text-body text-martinique">
            Ritual experience coming soon.
          </p>
        </div>
      </div>
    </div>
  )
}
