import { createClient } from '@/lib/supabase/server'

export enum MemoryType {
  STORY = 'story',
  PHOTO = 'photo',
  QUOTE = 'quote',
  FAVORITE = 'favorite',
}

export interface MemoryData {
  type: MemoryType
  text?: string
  photo_url?: string
  date?: string
  location?: string
  people?: string[]
  tags?: string[]
  loved_one_id?: string
}

export async function saveMemory(data: MemoryData) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error('Unauthorized')
  }

  const { error } = await supabase.from('memories').insert([
    {
      user_id: user.id,
      type: data.type,
      content: data.text,
      photo_url: data.photo_url,
      memory_date: data.date,
      location: data.location,
      people: data.people || [],
      tags: data.tags || [],
      loved_one_id: data.loved_one_id,
      created_at: new Date().toISOString(),
    },
  ])

  if (error) {
    console.error('Error saving memory:', error)
    throw new Error('Failed to save memory')
  }

  return { success: true }
}

export async function uploadMemoryPhoto(
  file: File
): Promise<string | null> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}.${fileExt}`
  const filePath = `memories/${user.id}/${fileName}`

  const { data, error } = await supabase.storage
    .from('memories')
    .upload(filePath, file)

  if (error) {
    console.error('Error uploading photo:', error)
    return null
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from('memories').getPublicUrl(filePath)

  return publicUrl
}
