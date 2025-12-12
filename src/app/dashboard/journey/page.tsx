'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles, BookHeart } from 'lucide-react';

export default function JourneyPage() {
  const router = useRouter();

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#F5F2ED',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        paddingTop: '48px',
        padding: '48px 24px 16px',
        position: 'relative',
        zIndex: 20,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
        }}>
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
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '24px',
            color: '#2D2A26',
          }}>
            Your Journey
          </h2>
          <div style={{ width: '40px' }} />
        </div>

        {/* Stats Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '32px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
        }}>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '18px',
            color: '#2D2A26',
            textAlign: 'center',
            marginBottom: '24px',
            lineHeight: 1.4,
          }}>
            &quot;You&apos;ve saved 12 memories of Mom&quot;
          </h3>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 8px',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              left: '33.33%',
              top: '8px',
              bottom: '8px',
              width: '1px',
              backgroundColor: 'rgba(219, 203, 184, 0.4)',
            }} />
            <div style={{
              position: 'absolute',
              right: '33.33%',
              top: '8px',
              bottom: '8px',
              width: '1px',
              backgroundColor: 'rgba(219, 203, 184, 0.4)',
            }} />
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '24px',
                color: '#D68F54',
                marginBottom: '4px',
              }}>
                34
              </div>
              <div style={{
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: 'rgba(158, 88, 77, 0.6)',
                textTransform: 'uppercase',
              }}>
                Candles
              </div>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '24px',
                color: '#D68F54',
                marginBottom: '4px',
              }}>
                12
              </div>
              <div style={{
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: 'rgba(158, 88, 77, 0.6)',
                textTransform: 'uppercase',
              }}>
                Memories
              </div>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '24px',
                color: '#D68F54',
                marginBottom: '4px',
              }}>
                47
              </div>
              <div style={{
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: 'rgba(158, 88, 77, 0.6)',
                textTransform: 'uppercase',
              }}>
                Days
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Journey Path Visualization */}
      <div
        className="no-scrollbar"
        style={{
          flex: 1,
          position: 'relative',
          width: '100%',
          overflowY: 'auto',
          perspective: '1000px',
        }}
      >
        <div style={{
          minHeight: '600px',
          position: 'relative',
          width: '100%',
          paddingBottom: '128px',
        }}>
          {/* SVG Winding Path */}
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 0,
            }}
            viewBox="0 0 390 800"
            preserveAspectRatio="none"
          >
            <path
              d="M 65 50 C 65 150, 320 150, 320 320 C 320 480, 100 500, 100 650"
              fill="none"
              stroke="#DBCBB8"
              strokeWidth="2"
              strokeDasharray="8 8"
              strokeLinecap="round"
              style={{ opacity: 0.6 }}
            />
          </svg>

          {/* Today Milestone */}
          <div style={{
            position: 'absolute',
            top: '50px',
            left: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            zIndex: 10,
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#F9F7F5',
              border: '2px solid rgba(214, 143, 84, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#D68F54',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(214, 143, 84, 0.1)',
                borderRadius: '50%',
                animation: 'pulse 2s infinite',
              }} />
              <Sparkles size={22} />
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              padding: '8px 16px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            }}>
              <p style={{
                fontWeight: 700,
                fontSize: '14px',
                color: '#2D2A26',
                marginBottom: '2px',
              }}>
                Today
              </p>
              <p style={{
                fontSize: '11px',
                color: 'rgba(60, 56, 54, 0.55)',
                fontWeight: 500,
              }}>
                You&apos;re here now
              </p>
            </div>
          </div>

          {/* First Memory Milestone */}
          <div style={{
            position: 'absolute',
            top: '300px',
            right: '20px',
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            gap: '16px',
            zIndex: 10,
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#F9F7F5',
              border: '2px solid rgba(158, 88, 77, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#9E584D',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            }}>
              <BookHeart size={20} />
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              padding: '8px 16px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              textAlign: 'right',
            }}>
              <p style={{
                fontWeight: 700,
                fontSize: '14px',
                color: '#2D2A26',
                marginBottom: '2px',
              }}>
                First Memory
              </p>
              <p style={{
                fontSize: '11px',
                color: 'rgba(60, 56, 54, 0.55)',
                fontWeight: 500,
              }}>
                Oct 12
              </p>
            </div>
          </div>

          {/* Week 1 Milestone */}
          <div style={{
            position: 'absolute',
            top: '500px',
            left: '60px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            zIndex: 10,
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(219, 203, 184, 0.2)',
              border: '1px solid rgba(219, 203, 184, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#96948F',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            }}>
              <span style={{ fontSize: '12px', fontWeight: 700 }}>1</span>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              padding: '8px 16px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            }}>
              <p style={{
                fontWeight: 700,
                fontSize: '14px',
                color: '#2D2A26',
                marginBottom: '2px',
              }}>
                Week 1
              </p>
              <p style={{
                fontSize: '11px',
                color: 'rgba(60, 56, 54, 0.55)',
                fontWeight: 500,
              }}>
                Your journey begins
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
