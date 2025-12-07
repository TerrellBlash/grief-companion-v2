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

// Fallback responses when API is unavailable
const FALLBACK_RESPONSES = [
  "I hear you, and I want you to know that whatever you're feeling right now is completely valid. Grief doesn't follow a timeline, and there's no right or wrong way to process loss. Take all the time you need.",
  "Thank you for sharing that with me. It takes courage to open up about these feelings. Remember, you don't have to go through this alone. I'm here to listen whenever you need.",
  "That sounds really difficult. Grief can feel overwhelming at times, and it's okay to take things one moment at a time. What would feel most supportive for you right now?",
  "I'm so sorry you're going through this. Your feelings are a testament to the love you shared. Would it help to talk about a favorite memory, or would you rather just sit with these feelings for a bit?",
  "It's natural to have days that feel harder than others. Be gentle with yourself today. Is there something small that might bring you a moment of comfort?",
]

function getMockResponse(message: string): string {
  // Simple keyword matching for more contextual responses
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes('sleep') || lowerMessage.includes('night')) {
    return "Sleep can be so difficult during grief. The quiet of night often amplifies our feelings. Some find it helpful to create a gentle bedtime ritual - perhaps lighting a candle, writing in a journal, or listening to calming music. What usually helps you feel more at peace?"
  }
  if (lowerMessage.includes('lonely') || lowerMessage.includes('alone')) {
    return "Loneliness in grief can feel especially heavy. Even when surrounded by others, we can feel isolated in our pain. Know that this community is here for you. Have you considered connecting with others who understand this journey?"
  }
  if (lowerMessage.includes('remember') || lowerMessage.includes('memory')) {
    return "Memories are such precious gifts. They can bring both joy and tears, sometimes at the same time. Would you like to share a memory? Sometimes speaking them aloud helps keep our loved ones close to our hearts."
  }
  if (lowerMessage.includes('angry') || lowerMessage.includes('mad') || lowerMessage.includes('unfair')) {
    return "Anger is a natural part of grief, even when it surprises us. It's okay to feel angry - at the situation, at life, even at your loved one for leaving. These feelings don't diminish your love. What's bringing up these feelings today?"
  }

  // Return a random fallback response
  return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)]
}

function createMockStream(message: string): ReadableStream {
  const encoder = new TextEncoder()
  const response = getMockResponse(message)
  const words = response.split(' ')

  return new ReadableStream({
    async start(controller) {
      for (let i = 0; i < words.length; i++) {
        const chunk = (i === 0 ? '' : ' ') + words[i]
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`))
        await new Promise(resolve => setTimeout(resolve, 50)) // Simulate streaming delay
      }
      controller.enqueue(encoder.encode('data: [DONE]\n\n'))
      controller.close()
    }
  })
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Check if we can use the real API
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // If no API key or no user, use mock responses
    if (!PERPLEXITY_API_KEY || !user) {
      console.log('Using mock companion response (no API key or unauthenticated)')
      return new NextResponse(createMockStream(message), {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      })
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
