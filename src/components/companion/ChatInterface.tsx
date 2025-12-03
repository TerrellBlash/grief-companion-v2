'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, HeartHandshake, Smile } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTIONS = [
  {
    icon: HeartHandshake,
    text: 'How do I cope with loss?',
  },
  {
    icon: Sparkles,
    text: 'Tell me about grief rituals',
  },
  {
    icon: Smile,
    text: 'Share your favorite memory',
  },
]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showSuggestions, setShowSuggestions] = useState(true)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setShowSuggestions(false)
    setIsLoading(true)

    try {
      const response = await fetch('/api/companion/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const assistantId = (Date.now() + 1).toString()
      const assistantMessage: Message = {
        id: assistantId,
        role: 'assistant',
        content: '',
      }

      setMessages((prev) => [...prev, assistantMessage])

      const reader = response.body!.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const text = decoder.decode(value)
        const lines = text.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue

            try {
              const parsed = JSON.parse(data)
              const chunk = parsed.content || ''
              if (chunk) {
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantId
                      ? { ...msg, content: msg.content + chunk }
                      : msg
                  )
                )
              }
            } catch (e) {
              // Skip parsing errors
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content:
          "I'm having trouble connecting right now. Please try again in a moment.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-screen w-full flex flex-col relative bg-gradient-to-b from-white to-sand/30">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 pt-8 pb-40">
        <AnimatePresence initial={false}>
          {messages.length === 0 && showSuggestions && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center h-full gap-8"
            >
              <div className="text-center">
                <h1 className="font-serif text-3xl font-medium text-martinique mb-2">
                  Grief Companion
                </h1>
                <p className="text-martinique/60 text-sm">
                  A space to share, reflect, and heal
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 max-w-sm">
                {SUGGESTIONS.map((suggestion, idx) => {
                  const Icon = suggestion.icon
                  return (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      onClick={() => handleSendMessage(suggestion.text)}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-white/40 border border-white/60 text-left hover:bg-white/60 transition-colors"
                    >
                      <Icon size={20} className="text-honey flex-shrink-0" />
                      <span className="text-martinique font-medium text-sm">
                        {suggestion.text}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {messages.map((msg, idx) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-4 mb-6 ${
                msg.role === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`flex-1 flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-honey/30 border border-honey/50'
                      : 'bg-white/40 border border-white/60 backdrop-blur-md'
                  }`}
                >
                  <p className="text-martinique text-sm leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4 mb-6"
            >
              <div className="flex-1">
                <div className="max-w-xs lg:max-w-md rounded-2xl px-4 py-3 bg-white/40 border border-white/60 backdrop-blur-md">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((dot) => (
                      <motion.div
                        key={dot}
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: dot * 0.1,
                        }}
                        className="w-2 h-2 rounded-full bg-martinique/40"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Floating Glass Panel */}
      <div className="fixed bottom-0 left-0 right-0 px-6 pb-safe bg-gradient-to-t from-gradient-to-b from-sand/50 to-transparent pt-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl p-4 shadow-lg">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage(input)
              }}
              className="flex gap-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Share what's on your mind..."
                disabled={isLoading}
                className="flex-1 bg-transparent text-martinique placeholder:text-martinique/40 focus:outline-none disabled:opacity-50"
              />
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading || !input.trim()}
                className="!p-3 flex-shrink-0"
                aria-label="Send message"
              >
                <Send size={18} strokeWidth={1.5} />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
