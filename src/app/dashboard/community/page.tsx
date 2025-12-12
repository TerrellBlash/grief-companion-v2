'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Flower2, Dog, Home, Coffee, Users } from 'lucide-react';

export default function CommunityCirclesPage() {
  const router = useRouter();

  const circles = [
    {
      title: 'Loss of Partner',
      members: 24,
      active: true,
      description: 'A safe space for those navigating life after losing a spouse or partner.',
      icon: Flower2,
      iconBg: '#F3EBE6',
      iconColor: '#9E584D',
      buttonActive: true,
      avatars: ['J', 'M', 'K'],
    },
    {
      title: 'Loss of Pet',
      members: 18,
      active: false,
      description: 'Connect with others who understand the deep bond with our animal companions.',
      icon: Dog,
      iconBg: '#E6E8E7',
      iconColor: '#7E8D85',
      buttonActive: false,
      avatars: ['S', 'L', 'P'],
    },
    {
      title: 'Loss of Family',
      members: 42,
      active: true,
      description: 'Supporting one another through the loss of parents, siblings, and children.',
      icon: Home,
      iconBg: '#EBF0F5',
      iconColor: '#6A7A85',
      buttonActive: true,
      avatars: ['A', 'B', 'C'],
    },
    {
      title: 'Loss of Friend',
      members: 15,
      active: true,
      description: 'Honoring the chosen family and deep friendships that shaped our lives.',
      icon: Coffee,
      iconBg: '#F4EFF2',
      iconColor: '#856A7A',
      buttonActive: true,
      avatars: ['R', 'T', 'N'],
    },
  ];

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#F9F7F5',
      paddingTop: '48px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '8px',
        position: 'relative',
        zIndex: 10,
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
        <div style={{ width: '40px' }} />
      </div>

      <div
        className="no-scrollbar"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px 24px 128px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '38px',
          lineHeight: 1.1,
          color: '#2D2A26',
          marginBottom: '12px',
          letterSpacing: '-0.02em',
        }}>
          Community Circles
        </h2>
        <p style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.1em',
          color: '#9E584D',
          opacity: 0.8,
          textTransform: 'uppercase',
          marginBottom: '40px',
        }}>
          Find your space to heal together
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {circles.map((circle, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'white',
                borderRadius: '32px',
                padding: '24px',
                boxShadow: '0 2px 20px rgba(0, 0, 0, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.6)',
              }}
            >
              {/* Card Header */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '20px',
                  backgroundColor: circle.iconBg,
                  color: circle.iconColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <circle.icon size={28} strokeWidth={1.5} />
                </div>
                <div style={{ flex: 1, minWidth: 0, paddingTop: '2px' }}>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '24px',
                    color: '#2D2A26',
                    marginBottom: '8px',
                    letterSpacing: '-0.02em',
                  }}>
                    {circle.title}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    {circle.active ? (
                      <div style={{
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        backgroundColor: '#EBF5EE',
                        border: '1px solid #DEE8E1',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}>
                        <div style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: '#7E8D85',
                        }} />
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          color: '#7E8D85',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}>
                          Active Now
                        </span>
                      </div>
                    ) : (
                      <div style={{
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        backgroundColor: '#F5F5F5',
                        border: '1px solid #EBEBEB',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          color: '#999',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}>
                          Closed
                        </span>
                      </div>
                    )}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: 'rgba(60, 56, 54, 0.55)',
                    }}>
                      <Users size={14} />
                      <span style={{ fontSize: '12px', fontWeight: 500, opacity: 0.8 }}>
                        {circle.members} members
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p style={{
                color: '#2D2A26',
                opacity: 0.6,
                fontSize: '15px',
                lineHeight: 1.6,
                marginBottom: '32px',
                fontWeight: 500,
              }}>
                {circle.description}
              </p>

              {/* Footer: Avatars + Button */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex' }}>
                  {circle.avatars.map((initial, i) => (
                    <div
                      key={i}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        border: '2px solid white',
                        overflow: 'hidden',
                        backgroundColor: '#DBCBB8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#2D2A26',
                        marginLeft: i > 0 ? '-12px' : 0,
                      }}
                    >
                      {initial}
                    </div>
                  ))}
                </div>
                <button style={{
                  padding: '12px 32px',
                  borderRadius: '16px',
                  fontSize: '14px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: circle.buttonActive ? '#2D2A26' : 'white',
                  color: circle.buttonActive ? '#F9F7F5' : '#2D2A26',
                  boxShadow: circle.buttonActive ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.04)',
                  ...(circle.buttonActive ? {} : { border: '1px solid #E5E5E5' }),
                }}>
                  {circle.buttonActive ? 'Join' : 'Request'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
