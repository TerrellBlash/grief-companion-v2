import { Header } from '@/components/ui'
import { MemoryWizard } from '@/components/memory/MemoryWizard'

export default function MemoriesPage() {
  return (
    <div className="relative">
      <Header title="Create a Memory" />
      <MemoryWizard />
    </div>
  )
}
