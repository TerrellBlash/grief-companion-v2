import { Header } from '@/components/ui'
import { ChatInterface } from '@/components/companion/ChatInterface'

export default function CompanionPage() {
  return (
    <div className="relative">
      <Header title="Grief Companion" />
      <ChatInterface />
    </div>
  )
}
