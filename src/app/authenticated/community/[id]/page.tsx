import { Header } from '@/components/ui'
import { CircleDetail } from '@/components/circles/CircleDetail'
import { getCircleDetail, getCirclePosts } from '@/lib/services/circles'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface CircleDetailPageProps {
  params: {
    id: string
  }
}

export default async function CircleDetailPage({
  params,
}: CircleDetailPageProps) {
  const circle = await getCircleDetail(params.id)

  if (!circle) {
    notFound()
  }

  const posts = await getCirclePosts(params.id)

  return (
    <div className="relative">
      <Header title={circle.name} subtitle={`${circle.member_count} members`} />
      <CircleDetail circle={circle} posts={posts} />
    </div>
  )
}
