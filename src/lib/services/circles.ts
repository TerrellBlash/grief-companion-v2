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

// Mock data for when database is unavailable
const MOCK_CIRCLES: Circle[] = [
  {
    id: '1',
    name: 'Loss of Partner',
    description: 'A safe space for those navigating life after losing a spouse or partner.',
    icon: 'flower',
    is_open: true,
    member_count: 24,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Loss of Pet',
    description: 'Connect with others who understand the deep bond with our animal companions.',
    icon: 'paw',
    is_open: false,
    member_count: 18,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Loss of Parent',
    description: 'Support for those grieving the loss of a mother or father.',
    icon: 'heart',
    is_open: true,
    member_count: 42,
    created_at: new Date().toISOString(),
  },
]

export async function getCircles(): Promise<Circle[]> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('circles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching circles:', error)
      return MOCK_CIRCLES
    }

    if (!data || data.length === 0) {
      return MOCK_CIRCLES
    }

    return data.map((circle) => ({
      id: circle.id,
      name: circle.name,
      description: circle.description,
      icon: circle.icon || 'flower',
      is_open: circle.is_open,
      member_count: circle.member_count || 0,
      created_at: circle.created_at,
    }))
  } catch (error) {
    console.error('getCircles error:', error)
    return MOCK_CIRCLES
  }
}

export async function getCircleDetail(circleId: string): Promise<Circle | null> {
  try {
    // Check if it's a mock circle first
    const mockCircle = MOCK_CIRCLES.find(c => c.id === circleId)
    if (mockCircle) {
      return mockCircle
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from('circles')
      .select('*')
      .eq('id', circleId)
      .single()

    if (error || !data) {
      return mockCircle || null
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
  } catch (error) {
    console.error('getCircleDetail error:', error)
    return MOCK_CIRCLES.find(c => c.id === circleId) || null
  }
}

export async function getCirclePosts(
  circleId: string,
  limit = 10
): Promise<CirclePost[]> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('circle_posts')
      .select('*, profiles(display_name, avatar_url)')
      .eq('circle_id', circleId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error || !data) {
      // Return mock posts
      return [
        {
          id: '1',
          user_id: 'mock-user',
          circle_id: circleId,
          content: 'Today marks three months. Some days feel lighter, but the waves still come unexpectedly. Grateful for this space to just be.',
          created_at: new Date().toISOString(),
          user_name: 'Sarah Mitchell',
          user_avatar: 'https://picsum.photos/seed/user1/100/100',
        },
      ]
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
  } catch (error) {
    console.error('getCirclePosts error:', error)
    return []
  }
}
