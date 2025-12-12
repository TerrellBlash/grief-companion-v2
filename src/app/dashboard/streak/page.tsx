'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Flame } from 'lucide-react';

export default function StreakPage() {
  const router = useRouter();
  const [currentStreak] = useState(5);

  // Get current date info
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDay = now.getDate();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  // Calculate days in month and first day
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Mock streak data - last 5 days
  const streakDays = Array.from({ length: currentStreak }, (_, i) => currentDay - i).filter(d => d > 0);

  const dayHeaders = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

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
        marginBottom: '24px',
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
        <h2 style={{
          fontFamily: 'var(--font-playfair), Playfair Display, serif',
          fontSize: '20px',
          color: '#2D2A26',
          letterSpacing: '-0.02em',
        }}>Ritual Streak</h2>
        <div style={{ width: '40px' }} />
      </div>

      {/* Content */}
      <div
        className="no-scrollbar"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0 24px 128px',
        }}
      >
        {/* Streak Display */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(214, 143, 84, 0.2), rgba(158, 88, 77, 0.2))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Flame size={40} color="#D68F54" fill="#D68F54" />
            </div>
            <div style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#9E584D',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 700,
              fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
              boxShadow: '0 2px 8px rgba(158, 88, 77, 0.3)',
            }}>
              +1
            </div>
          </div>

          <h3 style={{
            fontFamily: 'var(--font-playfair), Playfair Display, serif',
            fontSize: '32px',
            color: '#2D2A26',
            marginTop: '16px',
            marginBottom: '4px',
          }}>
            {currentStreak} Day Streak
          </h3>
          <p style={{
            color: 'rgba(45, 42, 38, 0.55)',
            fontSize: '14px',
            fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
          }}>
            You&apos;re building a beautiful habit
          </p>
        </div>

        {/* Calendar */}
        <div style={{
          background: 'white',
          borderRadius: '32px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
        }}>
          {/* Month Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '20px',
          }}>
            <h4 style={{
              fontFamily: 'var(--font-playfair), Playfair Display, serif',
              fontSize: '18px',
              color: '#2D2A26',
            }}>
              {monthNames[currentMonth]} {currentYear}
            </h4>
          </div>

          {/* Day Headers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '4px',
            marginBottom: '8px',
          }}>
            {dayHeaders.map((day, idx) => (
              <div
                key={idx}
                style={{
                  textAlign: 'center',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'rgba(45, 42, 38, 0.4)',
                  padding: '8px 0',
                  fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '4px',
          }}>
            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
              <div key={`empty-${idx}`} style={{ aspectRatio: '1' }} />
            ))}

            {/* Day cells */}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const isToday = day === currentDay;
              const hasStreak = streakDays.includes(day);

              return (
                <div
                  key={day}
                  style={{
                    aspectRatio: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: hasStreak ? 'rgba(214, 143, 84, 0.15)' : 'transparent',
                    border: isToday ? '2px solid #9E584D' : 'none',
                    transition: 'all 0.2s',
                  }}>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: isToday ? 600 : 400,
                      color: hasStreak ? '#D68F54' : '#2D2A26',
                      fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
                    }}>
                      {day}
                    </span>
                  </div>

                  {/* Streak indicator dot */}
                  {hasStreak && (
                    <div style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: '#D68F54',
                      marginTop: '4px',
                    }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
