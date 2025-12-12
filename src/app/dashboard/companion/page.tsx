'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Volume2, Mic } from 'lucide-react';

export default function CompanionPage() {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#F5F2ED',
      position: 'relative',
    }}>
      {/* Header */}
      <div style={{
        paddingTop: '48px',
        padding: '48px 24px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(245, 242, 237, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
        zIndex: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => router.back()}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.6)',
              color: '#2D2A26',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              cursor: 'pointer',
            }}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '20px',
              color: '#2D2A26',
            }}>
              Solace
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#7E8D85',
                animation: 'pulse 2s infinite',
              }} />
              <span style={{
                fontSize: '10px',
                textTransform: 'uppercase',
                fontWeight: 700,
                color: '#7E8D85',
                letterSpacing: '0.1em',
              }}>
                Compassionate AI
              </span>
            </div>
          </div>
        </div>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#F5F2ED',
          border: '1px solid rgba(219, 203, 184, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(60, 56, 54, 0.55)',
        }}>
          <Volume2 size={18} />
        </div>
      </div>

      {/* Chat Messages */}
      <div
        className="no-scrollbar"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {/* AI Message */}
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(24px) saturate(105%)',
            WebkitBackdropFilter: 'blur(24px) saturate(105%)',
            padding: '20px',
            borderRadius: '24px',
            borderTopLeftRadius: '4px',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            fontSize: '14px',
            lineHeight: 1.6,
            boxShadow: '0 8px 32px -8px rgba(158, 88, 77, 0.06)',
            color: '#2D2A26',
            maxWidth: '85%',
          }}>
            Hello Michelle. How is your heart feeling today?
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div style={{
        padding: '16px',
        background: 'rgba(245, 242, 237, 0.85)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.5)',
        marginBottom: '80px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'white',
          padding: '6px 6px 6px 16px',
          borderRadius: '32px',
          border: '1px solid rgba(219, 203, 184, 0.5)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        }}>
          <input
            type="text"
            placeholder="Share your thoughts..."
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              padding: '12px 0',
              color: '#2D2A26',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: "'DM Sans', sans-serif",
            }}
          />
          <button
            onClick={() => setIsListening(!isListening)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              backgroundColor: isListening ? '#7E8D85' : 'transparent',
              color: isListening ? 'white' : 'rgba(60, 56, 54, 0.55)',
              transition: 'all 0.3s',
            }}
          >
            {isListening && (
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '1px solid #7E8D85',
                animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
              }} />
            )}
            <Mic size={20} />
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
