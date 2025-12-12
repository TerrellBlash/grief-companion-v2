'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mic, MicOff, Send, Sparkles } from 'lucide-react';

export default function CompanionPage() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi there. I'm here whenever you need someone to listen. What's on your mind today?" }
  ]);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Web Speech API
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
          setMessage(transcript);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSend = () => {
    if (!message.trim()) return;

    // Stop listening if active
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Thank you for sharing that with me. It takes courage to open up about how you're feeling. I'm here to listen and support you through this."
      }]);
    }, 1500);
  };

  return (
    <div style={{
      height: '100%',
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#F5F2ED',
      paddingTop: '48px',
    }}>
      {/* Header */}
      <div style={{
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
      }}>
        <button
          onClick={() => router.push('/dashboard/home')}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            cursor: 'pointer',
            color: '#2D2A26',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          }}
        >
          <ArrowLeft size={20} strokeWidth={1.5} />
        </button>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Playfair Display, serif',
            fontSize: '20px',
            color: '#2D2A26',
            letterSpacing: '-0.02em',
          }}>Companion</h2>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            marginTop: '2px',
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#7E8D85',
            }} />
            <span style={{
              fontSize: '10px',
              fontWeight: 600,
              color: '#7E8D85',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
            }}>Always here</span>
          </div>
        </div>
        <div style={{ width: '40px' }} />
      </div>

      {/* Messages */}
      <div
        className="no-scrollbar"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0 24px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              maxWidth: '85%',
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            {msg.role === 'assistant' && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #9E584D, #D68F54)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Sparkles size={14} color="white" />
                </div>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'rgba(45, 42, 38, 0.55)',
                  fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
                }}>Solace</span>
              </div>
            )}
            <div style={{
              padding: '16px 20px',
              borderRadius: msg.role === 'user'
                ? '24px 24px 8px 24px'
                : '24px 24px 24px 8px',
              backgroundColor: msg.role === 'user' ? '#2D2A26' : 'white',
              color: msg.role === 'user' ? '#F9F7F5' : '#2D2A26',
              fontSize: '15px',
              lineHeight: 1.6,
              fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
              boxShadow: msg.role === 'assistant'
                ? '0 2px 12px rgba(0, 0, 0, 0.04)'
                : 'none',
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Fixed at bottom */}
      <div style={{
        padding: '16px 24px',
        paddingBottom: 'max(32px, env(safe-area-inset-bottom, 32px))',
        backgroundColor: '#F5F2ED',
        borderTop: '1px solid rgba(219, 203, 184, 0.3)',
        position: 'relative',
        zIndex: 100,
      }}>
        {/* Listening indicator */}
        {isListening && (
          <div style={{
            textAlign: 'center',
            marginBottom: '8px',
            fontSize: '12px',
            color: '#9E584D',
            fontWeight: 600,
            fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
          }}>
            Listening...
          </div>
        )}

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'white',
          borderRadius: '28px',
          padding: '8px 8px 8px 20px',
          border: '1px solid rgba(219, 203, 184, 0.4)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
        }}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Share what's on your mind..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '16px',
              color: '#2D2A26',
              fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
              minHeight: '24px',
            }}
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: message.trim() ? '#9E584D' : 'rgba(158, 88, 77, 0.2)',
              border: 'none',
              cursor: message.trim() ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              color: message.trim() ? 'white' : 'rgba(158, 88, 77, 0.4)',
              flexShrink: 0,
            }}
          >
            <Send size={18} strokeWidth={2} />
          </button>

          {/* Mic Button - Voice to Text */}
          <button
            onClick={toggleListening}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isListening ? '#9E584D' : 'rgba(214, 143, 84, 0.15)',
              border: 'none',
              cursor: 'pointer',
              color: isListening ? 'white' : '#D68F54',
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
          >
            {isListening ? <MicOff size={20} strokeWidth={2} /> : <Mic size={20} strokeWidth={2} />}
          </button>
        </div>
      </div>
    </div>
  );
}
