import { Header } from '@/components/ui'
import { MemoryWizard } from '@/components/memory/MemoryWizard'

export default function MemoriesPage() {
  return (
    <div className="aurora-bg relative transition-colors duration-500" style={{ paddingBottom: '160px', minHeight: '100%' }}>
      <div className="absolute inset-0 noise-texture pointer-events-none z-0 mix-blend-overlay" />
      <Header title="Create a Memory" />
      <MemoryWizard />
    </div>
  )
}
