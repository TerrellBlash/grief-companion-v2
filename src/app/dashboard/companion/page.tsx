'use client'

import { useRouter } from 'next/navigation'
import { Header } from '@/components/ui'
import { ChatInterface } from '@/components/companion/ChatInterface'

export default function CompanionPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen aurora-bg relative safe-all transition-colors duration-500">
      <div className="absolute inset-0 noise-texture pointer-events-none z-0 mix-blend-overlay" />
      <Header title="Companion" subtitle="Always here" onBack={() => router.back()} />
      <ChatInterface />
    </div>
  )
}
