'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function CandleRitual() {
  const router = useRouter();
  const [breathPhase, setBreathPhase] = useState<'in' | 'out'>('in');
  const [dedication, setDedication] = useState('');
  const [ritualStarted, setRitualStarted] = useState(false);

  const toggleRitual = () => {
    if (!ritualStarted) {
      if (!dedication.trim()) return;
      setRitualStarted(true);
    } else {
      router.push('/dashboard/home');
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (ritualStarted) {
      setBreathPhase('in');
      interval = setInterval(() => {
        setBreathPhase(prev => prev === 'in' ? 'out' : 'in');
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [ritualStarted]);

  // Ring expands on exhale (out), contracts on inhale (in)
  const ringExpanded = ritualStarted && breathPhase === 'out';

  return (
    <>
      {/* Flame animation keyframes */}
      <style jsx global>{`
        @keyframes flame-flicker {
          0%, 100% {
            transform: translateX(-50%) scaleY(1) scaleX(1);
            filter: blur(1px);
          }
          25% {
            transform: translateX(-50%) scaleY(1.05) scaleX(0.95);
            filter: blur(0.5px);
          }
          50% {
            transform: translateX(-50%) scaleY(0.95) scaleX(1.05);
            filter: blur(1.5px);
          }
          75% {
            transform: translateX(-50%) scaleY(1.02) scaleX(0.98);
            filter: blur(1px);
          }
        }
      `}</style>

      <div style={{
        height: '100%',
        minHeight: '100dvh',
        backgroundColor: '#1F1D24',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '24px 0',
      }}>
        {/* Noise texture overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.1,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E")`,
        }} />

        {/* Pulsating Background Halo - expands on exhale */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          backgroundColor: 'rgba(214, 143, 84, 0.1)',
          filter: 'blur(80px)',
          transition: 'all 4000ms ease-in-out',
          scale: ringExpanded ? '1.5' : '1',
          opacity: ringExpanded ? 0.25 : 0.1,
        }} />

        {/* Back Button */}
        <div style={{
          width: '100%',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10,
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
              backgroundColor: 'rgba(219, 203, 184, 0.1)',
              border: 'none',
              cursor: 'pointer',
              color: '#DBCBB8',
              transition: 'all 0.2s',
            }}
          >
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Main Content Area */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
          padding: '0 24px',
          position: 'relative',
          zIndex: 10,
          overflow: 'hidden',
        }}>
          {/* Title - changes based on ritual state */}
          {!ritualStarted ? (
            <div style={{
              textAlign: 'center',
              marginBottom: '24px',
              marginTop: '24px',
            }}>
              <h2 style={{
                fontFamily: 'var(--font-playfair), Playfair Display, serif',
                fontSize: '28px',
                color: '#EBE8E1',
                marginBottom: '12px',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
              }}>
                Light a candle for<br />those you hold dear
              </h2>
              <p style={{
                color: 'rgba(235, 232, 225, 0.6)',
                fontSize: '12px',
                fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
                fontWeight: 500,
                lineHeight: 1.6,
                maxWidth: '260px',
                margin: '0 auto',
                letterSpacing: '0.02em',
              }}>
                Take a moment to pause, breathe, and honor their memory.
              </p>
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              marginBottom: '24px',
              marginTop: '24px',
            }}>
              <p style={{
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: '#9E584D',
                marginBottom: '8px',
                fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
              }}>
                In Loving Memory
              </p>
              <h2 style={{
                fontFamily: 'var(--font-playfair), Playfair Display, serif',
                fontSize: '28px',
                color: '#EBE8E1',
                letterSpacing: '0.02em',
              }}>
                For {dedication}
              </h2>
            </div>
          )}

          {/* Name Input - shows when ritual not started */}
          <div style={{
            width: '100%',
            maxWidth: '280px',
            marginBottom: '32px',
            transition: 'all 0.7s ease',
            opacity: !ritualStarted ? 1 : 0,
            transform: !ritualStarted ? 'translateY(0)' : 'translateY(-20px)',
            pointerEvents: !ritualStarted ? 'auto' : 'none',
            position: !ritualStarted ? 'relative' : 'absolute',
          }}>
            <label style={{
              display: 'block',
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#9E584D',
              marginBottom: '12px',
              textAlign: 'center',
              fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
            }}>
              Reflection Time
            </label>
            <input
              type="text"
              value={dedication}
              onChange={(e) => setDedication(e.target.value)}
              placeholder="Enter a name"
              style={{
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '12px 16px',
                textAlign: 'center',
                color: '#D68F54',
                fontSize: '18px',
                fontFamily: 'var(--font-playfair), Playfair Display, serif',
                letterSpacing: '0.02em',
                outline: 'none',
                transition: 'all 0.2s',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(214, 143, 84, 0.5)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              }}
            />
          </div>

          {/* ============================================= */}
          {/* CANDLE - NOW POSITIONED BELOW THE NAME INPUT */}
          {/* ============================================= */}
          <div style={{
            position: 'relative',
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'transform 1s ease',
            transform: ritualStarted ? 'scale(1.1)' : 'scale(0.9)',
          }}>
            {/* Pulsating Ring - expands on exhale */}
            <div style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              border: ringExpanded
                ? '1px solid rgba(214, 143, 84, 0.4)'
                : '1px solid rgba(214, 143, 84, 0.2)',
              transition: 'all 4000ms ease-in-out',
              width: ringExpanded ? '320px' : '160px',
              height: ringExpanded ? '320px' : '160px',
              opacity: ritualStarted ? (ringExpanded ? 0.6 : 0.3) : 0,
            }} />

            {/* Candle Body */}
            <div style={{
              width: '64px',
              height: '160px',
              background: 'linear-gradient(to top, #2A2730, #45414D)',
              borderRadius: '12px 12px 8px 8px',
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              zIndex: 20,
            }}>
              {/* Candle top rim */}
              <div style={{
                position: 'absolute',
                top: 0,
                width: '100%',
                height: '16px',
                backgroundColor: '#45414D',
                borderRadius: '50%',
                transform: 'translateY(-8px)',
                opacity: 0.5,
              }} />

              {/* Wick */}
              <div style={{
                position: 'absolute',
                top: '-16px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '4px',
                height: '16px',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
              }} />

              {/* Flame - only visible when ritual started */}
              <div style={{
                position: 'absolute',
                top: '-64px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '32px',
                height: '64px',
                background: 'linear-gradient(to top, #D68F54, #E8B991, white)',
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                mixBlendMode: 'screen',
                transition: 'opacity 0.7s, transform 0.7s',
                opacity: ritualStarted ? 0.9 : 0,
                scale: ritualStarted ? '1' : '0.5',
                animation: ritualStarted ? 'flame-flicker 2s ease-in-out infinite' : 'none',
              }} />

              {/* Glow when lit */}
              <div style={{
                position: 'absolute',
                top: '-80px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '128px',
                height: '128px',
                backgroundColor: '#D68F54',
                borderRadius: '50%',
                filter: 'blur(40px)',
                transition: 'opacity 1s ease',
                opacity: ritualStarted ? 0.3 : 0,
              }} />
            </div>

            {/* Breathing Text */}
            <div style={{
              marginTop: '32px',
              textAlign: 'center',
              transition: 'opacity 1s ease',
              height: '24px',
              opacity: ritualStarted ? 1 : 0,
            }}>
              <p style={{
                fontFamily: 'var(--font-playfair), Playfair Display, serif',
                fontSize: '18px',
                color: 'rgba(235, 232, 225, 0.7)',
                letterSpacing: '0.02em',
              }}>
                {breathPhase === 'in' ? 'Breathe in...' : 'Breathe out...'}
              </p>
            </div>
          </div>
        </div>

        {/* Begin/End Ritual Button */}
        <div style={{
          width: '100%',
          padding: '16px 32px',
          position: 'relative',
          zIndex: 10,
        }}>
          <button
            onClick={toggleRitual}
            disabled={!ritualStarted && !dedication.trim()}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '24px',
              fontFamily: 'var(--font-playfair), Playfair Display, serif',
              fontSize: '18px',
              letterSpacing: '0.02em',
              border: 'none',
              cursor: (!ritualStarted && !dedication.trim()) ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              fontWeight: 500,
              backgroundColor: (!ritualStarted && !dedication.trim())
                ? '#3C3748'
                : '#D68F54',
              color: (!ritualStarted && !dedication.trim())
                ? 'rgba(235, 232, 225, 0.3)'
                : '#2A2730',
              boxShadow: (!ritualStarted && !dedication.trim())
                ? 'none'
                : '0 0 30px rgba(214, 143, 84, 0.3)',
            }}
          >
            {ritualStarted ? 'End Ritual' : 'Begin Ritual'}
          </button>
        </div>
      </div>
    </>
  );
}
