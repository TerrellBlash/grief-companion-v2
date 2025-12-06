'use client'

import { useRouter } from 'next/navigation'
import { Header } from '@/components/ui'
import { ChatInterface } from '@/components/companion/ChatInterface'

export default function CompanionPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F0E8] via-[#E8E4E0] to-[#D5C6B4]/30 safe-all">
      <Header title="Companion" subtitle="Always here" onBack={() => router.back()} />
      <ChatInterface />
    </div>
  )
}
