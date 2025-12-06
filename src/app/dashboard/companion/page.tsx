import { Header } from '@/components/ui'
import { ChatInterface } from '@/components/companion/ChatInterface'

export default function CompanionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F0E8] via-[#E8E4E0] to-[#D5C6B4]/30 safe-all">
      <Header title="Companion" subtitle="Always here" onBack="/dashboard/home" />
      <ChatInterface />
    </div>
  )
}
