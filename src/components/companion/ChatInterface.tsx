'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Sparkles, HeartHandshake, Smile, ArrowUp } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTIONS = [
  { label: "Can't sleep", icon: HeartHandshake },
  { label: 'Remembering...', icon: Sparkles },
  { label: 'Feeling lonely', icon: Smile },
]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "How are you feeling this morning? I'm here to listen.",
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
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
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 hide-scrollbar relative z-10 pb-40">
        {messages.map((msg) => {
          const isUser = msg.role === 'user'
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} animate-slide-up`}
            >
              {!isUser && (
                <div className="w-10 h-10 rounded-[14px] glass-thin flex items-center justify-center shrink-0 text-warning mt-auto mb-1 shadow-sm">
                  <Sparkles size={16} className="text-warning" fill="currentColor" fillOpacity={0.2} />
                </div>
              )}

              <div
                className={`max-w-[85%] px-6 py-4 text-[15px] leading-relaxed shadow-sm transition-all backdrop-blur-md ${
                  isUser
                    ? 'bg-martinique/90 text-white rounded-[26px] rounded-br-[4px] shadow-lg border border-white/10'
                    : 'glass-regular text-martinique rounded-[26px] rounded-bl-[4px]'
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          )
        })}

        {isLoading && (
          <div className="flex gap-3 animate-pulse">
            <div className="w-10 h-10 rounded-[14px] glass-thin flex items-center justify-center shrink-0 mt-auto mb-1">
              <Sparkles size={16} className="text-martinique/60" />
            </div>
            <div className="glass-regular px-6 py-5 rounded-[26px] rounded-bl-[4px] flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-martinique/50 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-martinique/50 rounded-full animate-bounce [animation-delay:100ms]" />
              <div className="w-1.5 h-1.5 bg-martinique/50 rounded-full animate-bounce [animation-delay:200ms]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Floating Glass Panel */}
      <div className="absolute bottom-32 left-0 right-0 px-4 z-20">
        <div className="glass-thick rounded-[40px] p-2 shadow-glass-deep border border-white/50">
          {/* Suggestions */}
          {messages.length < 3 && (
            <div className="flex gap-2.5 overflow-x-auto hide-scrollbar mb-3 px-2 pt-2">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setInput(s.label)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/40 border border-white/30 rounded-full text-martinique text-[13px] font-medium whitespace-nowrap hover:bg-white/60 transition-all active:scale-95"
                >
                  <s.icon size={14} className="text-martinique/60" />
                  {s.label}
                </button>
              ))}
            </div>
          )}

          <div className="relative flex items-center gap-2">
            <button className="p-3 rounded-full text-martinique/60 hover:text-martinique transition-colors hover:bg-black/5">
              <Mic size={22} />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(input)}
              className="flex-1 bg-transparent border-none focus:outline-none text-martinique placeholder:text-martinique/40 text-[16px] font-sans h-full py-3"
            />
            <button
              onClick={() => handleSendMessage(input)}
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 bg-martinique text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:shadow-none transition-all active:scale-95"
            >
              <ArrowUp size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
