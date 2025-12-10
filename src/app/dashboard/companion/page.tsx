'use client'

import { useRouter } from 'next/navigation'
import { Header } from '@/components/ui'
import { ChatInterface } from '@/components/companion/ChatInterface'

export default function CompanionPage() {
  const router = useRouter()

  return (
    <div className="h-full aurora-bg relative safe-all transition-colors duration-500 flex flex-col">
      <div className="absolute inset-0 noise-texture pointer-events-none z-0 mix-blend-overlay" />
      <Header title="Companion" subtitle="Always here" onBack={() => router.back()} />
      <div className="flex-1 relative">
        <ChatInterface />
      </div>
    </div>
  )
}
