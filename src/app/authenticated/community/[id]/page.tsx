import { getCircleDetail, getCirclePosts } from '@/lib/services/circles'
import { CircleDetailClient } from './CircleDetailClient'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface CircleDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function CircleDetailPage({ params }: CircleDetailPageProps) {
  const { id } = await params
  const circle = await getCircleDetail(id)

  if (!circle) {
    notFound()
  }

  const posts = await getCirclePosts(id)

  return <CircleDetailClient circle={circle} posts={posts} />
}
