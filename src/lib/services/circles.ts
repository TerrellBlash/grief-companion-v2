import { createClient } from '@/lib/supabase/server'

export interface Circle {
  id: string
  name: string
  description: string
  icon: 'flower' | 'paw' | 'heart'
  is_open: boolean
  member_count: number
  created_at: string
}

export interface CirclePost {
  id: string
  user_id: string
  circle_id: string
  content: string
  created_at: string
  user_name: string
  user_avatar?: string
}

export async function getCircles(): Promise<Circle[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('circles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching circles:', error)
    return []
  }

  return (data || []).map((circle) => ({
    id: circle.id,
    name: circle.name,
    description: circle.description,
    icon: circle.icon || 'flower',
    is_open: circle.is_open,
    member_count: circle.member_count || 0,
    created_at: circle.created_at,
  }))
}

export async function getCircleDetail(circleId: string): Promise<Circle | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('circles')
    .select('*')
    .eq('id', circleId)
    .single()

  if (error || !data) {
    return null
  }

  return {
    id: data.id,
    name: data.name,
    description: data.description,
    icon: data.icon || 'flower',
    is_open: data.is_open,
    member_count: data.member_count || 0,
    created_at: data.created_at,
  }
}

export async function getCirclePosts(
  circleId: string,
  limit = 10
): Promise<CirclePost[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('circle_posts')
    .select('*, profiles(display_name, avatar_url)')
    .eq('circle_id', circleId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error || !data) {
    return []
  }

  return data.map((post: any) => ({
    id: post.id,
    user_id: post.user_id,
    circle_id: post.circle_id,
    content: post.content,
    created_at: post.created_at,
    user_name: post.profiles?.display_name || 'Anonymous',
    user_avatar: post.profiles?.avatar_url,
  }))
}
