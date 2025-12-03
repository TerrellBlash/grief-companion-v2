import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY
const SYSTEM_PROMPT = `You are a compassionate grief support companion. Your role is to provide emotional support, validation, and gentle guidance to someone processing loss.

Guidelines:
- Listen with empathy and validate their feelings
- Ask thoughtful questions to help them process their grief
- Offer coping strategies and resources when appropriate
- Acknowledge the complexity and non-linear nature of grief
- Be warm, human, and authentic in your responses
- Avoid being preachy or dismissive of their pain
- Remember that grief is deeply personal and unique
- Encourage self-care and connection with others
- Suggest rituals or practices that might help

Respond with warmth and genuine care.`

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    if (!PERPLEXITY_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    // Save user message to database
    const { error: userMsgError } = await supabase
      .from('companion_messages')
      .insert([
        {
          user_id: user.id,
          role: 'user',
          content: message,
        },
      ])

    if (userMsgError) {
      console.error('Error saving user message:', userMsgError)
      return NextResponse.json(
        { error: 'Failed to save message' },
        { status: 500 }
      )
    }

    // Call Perplexity API with streaming
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar-pro',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: message,
          },
        ],
        stream: true,
      }),
    })

    if (!response.ok) {
      console.error('Perplexity API error:', response.statusText)
      return NextResponse.json(
        { error: 'Failed to get response from AI' },
        { status: 500 }
      )
    }

    // Create a readable stream for streaming response
    const encoder = new TextEncoder()
    let fullResponse = ''

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const reader = response.body!.getReader()

          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const text = new TextDecoder().decode(value)
            const lines = text.split('\n')

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6)
                if (data === '[DONE]') continue

                try {
                  const parsed = JSON.parse(data)
                  const chunk =
                    parsed.choices?.[0]?.delta?.content || ''
                  if (chunk) {
                    fullResponse += chunk
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`)
                    )
                  }
                } catch (e) {
                  // Skip parsing errors for individual chunks
                }
              }
            }
          }

          // Save assistant response to database
          if (fullResponse) {
            await supabase.from('companion_messages').insert([
              {
                user_id: user.id,
                role: 'assistant',
                content: fullResponse,
              },
            ])
          }

          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (error) {
          console.error('Stream error:', error)
          controller.error(error)
        }
      },
    })

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
