'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function CandleRitual() {
  const router = useRouter();
  const [breathIn, setBreathIn] = useState(true);
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
      setBreathIn(true);
      interval = setInterval(() => {
        setBreathIn(prev => !prev);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [ritualStarted]);

  return (
    <div style={{
      height: '100%',
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

      {/* Pulsating Background Halo */}
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
        scale: ritualStarted && breathIn ? '1.5' : '1',
        opacity: ritualStarted && breathIn ? 0.2 : 0.1,
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
            background: 'rgba(219, 203, 184, 0.1)',
            color: '#DBCBB8',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '0 24px',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* Header Text */}
        {!ritualStarted ? (
          <div style={{
            textAlign: 'center',
            marginBottom: '40px',
            position: 'absolute',
            top: '48px',
            left: 0,
            right: 0,
          }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '28px',
              color: '#EBE8E1',
              marginBottom: '12px',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}>
              Light a candle for<br/>those you hold dear
            </h2>
            <p style={{
              color: 'rgba(235, 232, 225, 0.6)',
              fontSize: '12px',
              fontWeight: 500,
              lineHeight: 1.5,
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
            marginBottom: '40px',
            position: 'absolute',
            top: '64px',
            left: 0,
            right: 0,
          }}>
            <p style={{
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#9E584D',
              marginBottom: '8px',
            }}>
              In Loving Memory
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '28px',
              color: '#EBE8E1',
              letterSpacing: '0.02em',
            }}>
              For {dedication}
            </h2>
          </div>
        )}

        {/* Name Input */}
        <div style={{
          width: '100%',
          maxWidth: '280px',
          marginBottom: '32px',
          transition: 'all 0.7s',
          position: 'absolute',
          top: '220px',
          zIndex: 20,
          opacity: !ritualStarted ? 1 : 0,
          transform: !ritualStarted ? 'translateY(0)' : 'translateY(40px)',
          pointerEvents: !ritualStarted ? 'auto' : 'none',
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
              fontFamily: "'Playfair Display', serif",
              fontSize: '18px',
              letterSpacing: '0.02em',
              outline: 'none',
            }}
          />
        </div>

        {/* Candle */}
        <div style={{
          position: 'relative',
          marginBottom: '24px',
          flexShrink: 0,
          transition: 'transform 1s',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: ritualStarted ? 'scale(1.1)' : 'scale(0.9)',
          marginTop: ritualStarted ? '48px' : '180px',
        }}>
          {/* Pulsating Ring */}
          <div style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            border: '1px solid rgba(214, 143, 84, 0.2)',
            transition: 'all 4000ms ease-in-out',
            width: ritualStarted && breathIn ? '320px' : '160px',
            height: ritualStarted && breathIn ? '320px' : '160px',
            opacity: ritualStarted && breathIn ? 0.6 : 0,
            borderColor: ritualStarted && breathIn ? 'rgba(214, 143, 84, 0.4)' : 'rgba(214, 143, 84, 0.2)',
          }} />

          {/* Candle Body */}
          <div style={{
            width: '64px',
            height: '160px',
            background: 'linear-gradient(to top, #2A2730, #45414D)',
            borderRadius: '12px 12px 8px 8px',
            position: 'relative',
            margin: '0 auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            zIndex: 20,
          }}>
            {/* Top ellipse */}
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

            {/* Flame */}
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
              filter: 'blur(1px)',
              transition: 'all 0.7s',
              opacity: ritualStarted ? 0.9 : 0,
              scale: ritualStarted ? '1' : '0.5',
              animation: ritualStarted ? 'flame-flicker 2s infinite cubic-bezier(0.45, 0.05, 0.55, 0.95)' : 'none',
            }} />

            {/* Glow */}
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
              transition: 'all 1s',
              opacity: ritualStarted ? 0.3 : 0,
            }} />
          </div>

          {/* Breathing Text */}
          <div style={{
            marginTop: '32px',
            textAlign: 'center',
            transition: 'opacity 1s',
            height: '24px',
            opacity: ritualStarted ? 1 : 0,
          }}>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '18px',
              color: 'rgba(235, 232, 225, 0.7)',
              letterSpacing: '0.02em',
              transition: 'opacity 1s',
            }}>
              {breathIn ? 'Breathe in...' : 'Breathe out...'}
            </p>
          </div>
        </div>
      </div>

      {/* Begin/End Button */}
      <div style={{
        width: '100%',
        padding: '16px 32px 0',
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
            fontFamily: "'Playfair Display', serif",
            fontSize: '18px',
            letterSpacing: '0.02em',
            fontWeight: 500,
            border: 'none',
            cursor: (!ritualStarted && !dedication.trim()) ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            backgroundColor: (!ritualStarted && !dedication.trim()) ? '#3C3748' : '#D68F54',
            color: (!ritualStarted && !dedication.trim()) ? 'rgba(235, 232, 225, 0.3)' : '#2A2730',
            boxShadow: (!ritualStarted && !dedication.trim()) ? 'none' : '0 0 30px rgba(214, 143, 84, 0.3)',
          }}
        >
          {ritualStarted ? 'End Ritual' : 'Begin Ritual'}
        </button>
      </div>

      <style jsx global>{`
        @keyframes flame-flicker {
          0% { transform: translateX(-50%) scaleY(1) skewX(0deg); opacity: 0.9; }
          25% { transform: translateX(-50%) scaleY(1.1) skewX(-2deg); opacity: 1; }
          50% { transform: translateX(-50%) scaleY(1.0) skewX(2deg); opacity: 0.85; }
          75% { transform: translateX(-50%) scaleY(1.15) skewX(-1deg); opacity: 1; }
          100% { transform: translateX(-50%) scaleY(1) skewX(0deg); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}
