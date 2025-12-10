import { Header } from '@/components/ui'
import { MemoryWizard } from '@/components/memory/MemoryWizard'

export default function MemoriesPage() {
  return (
    <div className="min-h-full pb-32 aurora-bg relative transition-colors duration-500">
      <div className="absolute inset-0 noise-texture pointer-events-none z-0 mix-blend-overlay" />
      <Header title="Create a Memory" />
      <MemoryWizard />
    </div>
  )
}
