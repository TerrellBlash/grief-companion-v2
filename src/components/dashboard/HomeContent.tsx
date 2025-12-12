'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Settings, Flame, Mail, ArrowRight, X, HeartHandshake, BookHeart, Sparkles } from 'lucide-react';

export default function HomeContent() {
  const [showNudge, setShowNudge] = useState(true);
  const hours = new Date().getHours();
  const timeOfDay = hours < 12 ? 'MORNING' : hours < 17 ? 'AFTERNOON' : 'EVENING';
  const dayName = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();

  return (
    <div
      style={{
        minHeight: '100%',
        paddingBottom: '140px',
        background: 'linear-gradient(-45deg, #F5F2ED, #E3E0D9, #E0E6E3, #E8DCCF)',
        backgroundSize: '400% 400%',
        animation: 'aurora-shift 35s ease infinite',
        position: 'relative',
      }}
    >
      {/* Header */}
      <header style={{
        paddingTop: '56px',
        paddingLeft: '24px',
        paddingRight: '24px',
        paddingBottom: '16px',
        position: 'relative',
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            {/* Day indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#D68F54',
              }} />
              <p style={{
                color: '#9E584D',
                fontWeight: 600,
                fontSize: '11px',
                letterSpacing: '0.12em',
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {dayName} {timeOfDay}
              </p>
            </div>

            {/* Welcome text */}
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '32px',
              lineHeight: 1.15,
              color: '#2D2A26',
              letterSpacing: '-0.02em',
              margin: 0,
            }}>
              Welcome home,
            </h1>
            <p style={{
              fontFamily: "'Caveat', cursive",
              color: '#9E584D',
              fontSize: '34px',
              lineHeight: 1.1,
              marginTop: '2px',
            }}>
              Michelle
            </p>
            <p style={{
              color: 'rgba(45, 42, 38, 0.5)',
              fontSize: '14px',
              marginTop: '12px',
              fontWeight: 500,
              lineHeight: 1.5,
              maxWidth: '220px',
              fontFamily: "'DM Sans', sans-serif",
            }}>
              Your space is here whenever you need it.
            </p>
          </div>

          {/* Settings button */}
          <Link
            href="/dashboard/settings"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              textDecoration: 'none',
            }}
          >
            <Settings size={20} color="rgba(45, 42, 38, 0.4)" />
          </Link>
        </div>
      </header>

      {/* Content */}
      <div style={{ padding: '0 20px', position: 'relative', zIndex: 10 }}>

        {/* Gentle Nudge Banner */}
        {showNudge && (
          <div
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '12px',
              border: '1px solid rgba(219, 203, 184, 0.4)',
              boxShadow: '0 4px 20px -4px rgba(158, 88, 77, 0.08)',
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'white',
              border: '1px solid rgba(219, 203, 184, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <HeartHandshake size={18} color="#9E584D" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '16px',
                color: '#2D2A26',
                marginBottom: '2px',
              }}>
                Your candle is waiting 🕯️
              </p>
              <p style={{
                color: 'rgba(45, 42, 38, 0.5)',
                fontSize: '12px',
                fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif",
              }}>
                No pressure. Just here if you need us.
              </p>
            </div>
            <button
              onClick={() => setShowNudge(false)}
              style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <X size={16} color="rgba(45, 42, 38, 0.3)" />
            </button>
          </div>
        )}

        {/* Daily Ritual Card */}
        <Link
          href="/rituals/candle"
          style={{
            display: 'block',
            width: '100%',
            borderRadius: '28px',
            padding: '20px',
            minHeight: '175px',
            background: 'linear-gradient(110deg, #2A2730 0%, #9E584D 55%, #D68F54 100%)',
            boxShadow: '0 10px 30px -10px rgba(168, 88, 70, 0.35)',
            textDecoration: 'none',
            marginBottom: '12px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Tag */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            borderRadius: '999px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(8px)',
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#E8B991',
            }} />
            <span style={{
              fontSize: '10px',
              fontWeight: 700,
              color: 'white',
              letterSpacing: '0.12em',
              fontFamily: "'DM Sans', sans-serif",
            }}>
              DAILY RITUAL
            </span>
          </div>

          {/* Content */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginTop: '32px',
          }}>
            <div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '34px',
                lineHeight: 1.05,
                color: 'white',
                letterSpacing: '-0.02em',
                margin: 0,
              }}>
                Light a<br/>Candle
              </h2>
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '13px',
                fontWeight: 500,
                marginTop: '6px',
                letterSpacing: '0.02em',
                fontFamily: "'DM Sans', sans-serif",
              }}>
                Reflect & remember.
              </p>
            </div>

            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '18px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Flame size={24} color="#E8B991" fill="#E8B991" />
            </div>
          </div>
        </Link>

        {/* Days & Journey Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
          {/* Days */}
          <Link
            href="/dashboard/streak"
            style={{
              borderRadius: '28px',
              padding: '20px',
              aspectRatio: '1.15',
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
            }}
          >
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '40px',
              lineHeight: 1,
              color: '#2D2A26',
            }}>0</span>
            <span style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              color: 'rgba(158, 88, 77, 0.8)',
              marginTop: '4px',
              fontFamily: "'DM Sans', sans-serif",
            }}>
              DAYS
            </span>
          </Link>

          {/* Journey */}
          <Link
            href="/dashboard/journey"
            style={{
              borderRadius: '28px',
              padding: '20px',
              aspectRatio: '1.15',
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
            }}
          >
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '22px',
              color: '#2D2A26',
              margin: 0,
            }}>Journey</h3>
            <p style={{
              color: 'rgba(45, 42, 38, 0.5)',
              fontSize: '13px',
              fontWeight: 500,
              marginTop: '2px',
              fontFamily: "'DM Sans', sans-serif",
            }}>Your path</p>
          </Link>
        </div>

        {/* Menu Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

          {/* Memory Jar */}
          <Link
            href="/dashboard/memories"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px',
              borderRadius: '28px',
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              textDecoration: 'none',
            }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '20px',
              background: '#F5F2ED',
              border: '1px solid rgba(219, 203, 184, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <BookHeart size={24} color="#2D2A26" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '20px',
                color: '#2D2A26',
                letterSpacing: '-0.02em',
                margin: 0,
              }}>Memory Jar</h3>
              <p style={{
                color: 'rgba(45, 42, 38, 0.5)',
                fontSize: '12px',
                fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif",
              }}>Save a thought for today</p>
            </div>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'white',
              border: '1px solid rgba(219, 203, 184, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <ArrowRight size={18} color="rgba(45, 42, 38, 0.5)" />
            </div>
          </Link>

          {/* Legacy Letters */}
          <Link
            href="/dashboard/letters"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px',
              borderRadius: '28px',
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              textDecoration: 'none',
            }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '20px',
              background: '#F9F3F2',
              border: '1px solid rgba(219, 203, 184, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Mail size={24} color="#9E584D" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '20px',
                color: '#2D2A26',
                letterSpacing: '-0.02em',
                margin: 0,
              }}>Legacy Letters</h3>
              <p style={{
                color: 'rgba(45, 42, 38, 0.5)',
                fontSize: '12px',
                fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif",
              }}>Words across time</p>
            </div>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'white',
              border: '1px solid rgba(219, 203, 184, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <ArrowRight size={18} color="rgba(45, 42, 38, 0.5)" />
            </div>
          </Link>

          {/* Companion */}
          <Link
            href="/dashboard/companion"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px',
              borderRadius: '28px',
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              textDecoration: 'none',
            }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '20px',
              background: '#F2F4F3',
              border: '1px solid rgba(219, 203, 184, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Sparkles size={24} color="#7E8D85" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '20px',
                color: '#2D2A26',
                letterSpacing: '-0.02em',
                margin: 0,
              }}>Companion</h3>
              <p style={{
                color: 'rgba(45, 42, 38, 0.5)',
                fontSize: '12px',
                fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif",
              }}>Always here to listen</p>
            </div>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'white',
              border: '1px solid rgba(219, 203, 184, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <ArrowRight size={18} color="rgba(45, 42, 38, 0.5)" />
            </div>
          </Link>

          {/* Circles */}
          <Link
            href="/dashboard/community"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px',
              borderRadius: '28px',
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              textDecoration: 'none',
            }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '20px',
              background: 'white',
              border: '1px solid rgba(219, 203, 184, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#DBCBB8',
                  border: '2px solid white',
                  marginRight: '-8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#2D2A26',
                }}>
                  S
                </div>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#9E584D',
                  border: '2px solid white',
                  marginRight: '-8px',
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: 'white',
                }}>
                  M
                </div>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#D68F54',
                  border: '2px solid white',
                  position: 'relative',
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: 'white',
                }}>
                  K
                </div>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '20px',
                color: '#2D2A26',
                letterSpacing: '-0.02em',
                margin: 0,
              }}>Circles</h3>
              <p style={{
                color: 'rgba(45, 42, 38, 0.5)',
                fontSize: '12px',
                fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif",
              }}>Finding healing together</p>
            </div>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'white',
              border: '1px solid rgba(219, 203, 184, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <ArrowRight size={18} color="rgba(45, 42, 38, 0.5)" />
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}
