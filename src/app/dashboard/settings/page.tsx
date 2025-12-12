'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function SettingsPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [reminderMode, setReminderMode] = useState('on');
  const [anniversaryNudge, setAnniversaryNudge] = useState(true);
  const [streakNudge, setStreakNudge] = useState(true);

  const backButtonStyle = {
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
  } as React.CSSProperties;

  const glassRegularStyle = {
    background: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(24px) saturate(105%)',
    WebkitBackdropFilter: 'blur(24px) saturate(105%)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    boxShadow: '0 8px 32px -8px rgba(158, 88, 77, 0.06)',
  } as React.CSSProperties;

  const RadioOption = ({
    value,
    label,
    sub,
    selectedValue,
    onSelect,
  }: {
    value: string;
    label: string;
    sub: string;
    selectedValue: string;
    onSelect: (val: string) => void;
  }) => (
    <button
      onClick={() => onSelect(value)}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '12px',
        borderRadius: '20px',
        border: selectedValue === value ? '1px solid #D68F54' : '1px solid transparent',
        backgroundColor: selectedValue === value ? '#F5F2ED' : 'transparent',
        cursor: 'pointer',
        transition: 'all 0.3s',
      }}
    >
      <div style={{
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        border: selectedValue === value ? '2px solid #D68F54' : '2px solid rgba(60, 56, 54, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        {selectedValue === value && (
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#D68F54',
          }} />
        )}
      </div>
      <div style={{ textAlign: 'left' }}>
        <p style={{
          fontSize: '14px',
          fontWeight: 600,
          color: selectedValue === value ? '#2D2A26' : 'rgba(60, 56, 54, 0.55)',
        }}>
          {label}
        </p>
        <p style={{
          fontSize: '11px',
          color: 'rgba(60, 56, 54, 0.55)',
          opacity: 0.8,
        }}>
          {sub}
        </p>
      </div>
    </button>
  );

  const Toggle = ({
    enabled,
    onChange,
    label,
  }: {
    enabled: boolean;
    onChange: (val: boolean) => void;
    label: string;
  }) => (
    <div
      onClick={() => onChange(!enabled)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 0',
        cursor: 'pointer',
      }}
    >
      <span style={{
        fontWeight: 500,
        color: '#2D2A26',
      }}>
        {label}
      </span>
      <div style={{
        width: '48px',
        height: '28px',
        borderRadius: '9999px',
        padding: '4px',
        backgroundColor: enabled ? '#9E584D' : 'rgba(150, 148, 143, 0.3)',
        display: 'flex',
        alignItems: 'center',
        transition: 'background-color 0.3s',
      }}>
        <div style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: 'white',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          transform: enabled ? 'translateX(20px)' : 'translateX(0)',
          transition: 'transform 0.3s',
        }} />
      </div>
    </div>
  );

  return (
    <div style={{
      height: '100%',
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
        marginBottom: '32px',
      }}>
        <button onClick={() => router.back()} style={backButtonStyle}>
          <ArrowLeft size={20} />
        </button>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '24px',
          color: '#2D2A26',
        }}>
          Settings
        </h2>
        <div style={{ width: '40px' }} />
      </div>

      <div
        className="no-scrollbar"
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingBottom: '128px',
        }}
      >
        <div style={{
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}>
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              width: '100%',
              ...glassRegularStyle,
              padding: '16px',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(219, 203, 184, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2D2A26',
              }}>
                {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
              </div>
              <span style={{
                fontWeight: 500,
                color: '#2D2A26',
              }}>
                Dark Mode
              </span>
            </div>
            <div style={{
              width: '48px',
              height: '28px',
              borderRadius: '9999px',
              padding: '4px',
              backgroundColor: theme === 'dark' ? '#D68F54' : 'rgba(150, 148, 143, 0.3)',
              display: 'flex',
              alignItems: 'center',
              transition: 'background-color 0.3s',
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                transform: theme === 'dark' ? 'translateX(20px)' : 'translateX(0)',
                transition: 'transform 0.3s',
              }} />
            </div>
          </button>

          {/* Gentle Reminders Section */}
          <div>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '18px',
              color: '#2D2A26',
              marginBottom: '12px',
              paddingLeft: '8px',
            }}>
              Gentle Reminders
            </h3>
            <div style={{
              ...glassRegularStyle,
              borderRadius: '32px',
              padding: '8px',
              border: '1px solid rgba(219, 203, 184, 0.3)',
            }}>
              <div style={{
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                marginBottom: '8px',
              }}>
                <RadioOption
                  value="on"
                  label="On"
                  sub="Check in if I'm away"
                  selectedValue={reminderMode}
                  onSelect={setReminderMode}
                />
                <RadioOption
                  value="quiet"
                  label="Quiet"
                  sub="Only important dates"
                  selectedValue={reminderMode}
                  onSelect={setReminderMode}
                />
                <RadioOption
                  value="off"
                  label="Off"
                  sub="I'll come when ready"
                  selectedValue={reminderMode}
                  onSelect={setReminderMode}
                />
              </div>
              <div style={{
                height: '1px',
                backgroundColor: 'rgba(219, 203, 184, 0.2)',
                margin: '0 16px 8px',
              }} />
              <div style={{ padding: '0 16px 8px' }}>
                <Toggle
                  label="Anniversary Reminders"
                  enabled={anniversaryNudge}
                  onChange={setAnniversaryNudge}
                />
                <Toggle
                  label="Missed Streak Nudges"
                  enabled={streakNudge}
                  onChange={setStreakNudge}
                />
              </div>
            </div>
            <p style={{
              fontSize: '11px',
              color: 'rgba(60, 56, 54, 0.55)',
              marginTop: '12px',
              padding: '0 16px',
              lineHeight: 1.6,
              opacity: 0.7,
              textAlign: 'center',
            }}>
              We&apos;ll only reach out when we think you might need a moment of space. No pressure, ever.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
