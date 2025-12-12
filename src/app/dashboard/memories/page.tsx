'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen, Image, MessageSquareQuote, Star, Upload, Calendar, MessageSquare, Quote } from 'lucide-react';

type MemoryType = 'story' | 'photo' | 'quote' | 'favorite' | null;
type Step = 'SELECT' | 'INPUT';

export default function CreateMemoryPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('SELECT');
  const [selectedType, setSelectedType] = useState<MemoryType>(null);
  const [favCategory, setFavCategory] = useState('Music');

  const memoryTypes = [
    { id: 'story' as const, title: 'Story', sub: 'Share a meaningful moment', icon: BookOpen },
    { id: 'photo' as const, title: 'Photo', sub: 'Upload a cherished picture', icon: Image },
    { id: 'quote' as const, title: 'Quote', sub: 'Remember their words', icon: MessageSquareQuote },
    { id: 'favorite' as const, title: 'Favorite Thing', sub: 'Something they loved', icon: Star },
  ];

  const favCategories = ['Music', 'Food', 'Movie', 'Place', 'Hobby', 'Color'];

  const handleTypeSelect = (id: MemoryType) => {
    setSelectedType(id);
    setTimeout(() => setStep('INPUT'), 300);
  };

  const handleBack = () => {
    if (step === 'INPUT') {
      setStep('SELECT');
      setSelectedType(null);
    } else {
      router.push('/dashboard/home');
    }
  };

  const backButtonStyle = {
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
  } as React.CSSProperties;

  const glassInputStyle = {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderRadius: '24px',
    padding: '16px 24px',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    boxShadow: '0 2px 20px rgba(0, 0, 0, 0.02)',
  } as React.CSSProperties;

  // Render input screens based on selection
  const renderInputScreen = () => {
    switch (selectedType) {
      case 'story':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{
                fontFamily: 'var(--font-playfair), Playfair Display, serif',
                fontSize: '24px',
                color: '#2D2A26',
                marginBottom: '12px',
                display: 'block',
                paddingLeft: '4px',
              }}>Title</label>
              <div style={glassInputStyle}>
                <input
                  type="text"
                  placeholder="Give this story a name..."
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#2D2A26',
                    fontSize: '18px',
                    fontWeight: 700,
                    fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
                  }}
                />
              </div>
            </div>
            <div>
              <label style={{
                fontFamily: 'var(--font-playfair), Playfair Display, serif',
                fontSize: '24px',
                color: '#2D2A26',
                marginBottom: '12px',
                display: 'block',
                paddingLeft: '4px',
              }}>The Story</label>
              <div style={{
                ...glassInputStyle,
                borderRadius: '32px',
                padding: '24px',
                minHeight: '300px',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '32px',
                  bottom: 0,
                  width: '1px',
                  backgroundColor: 'rgba(158, 88, 77, 0.1)',
                }} />
                <textarea
                  placeholder="Once upon a time..."
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: '250px',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    resize: 'none',
                    fontFamily: 'var(--font-playfair), Playfair Display, serif',
                    fontSize: '18px',
                    lineHeight: 2,
                    color: '#2D2A26',
                    paddingLeft: '24px',
                  }}
                />
              </div>
            </div>
          </div>
        );

      case 'photo':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              width: '100%',
              aspectRatio: '4/3',
              borderRadius: '32px',
              border: '2px dashed #DBCBB8',
              backgroundColor: 'rgba(219, 203, 184, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9E584D',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
              }}>
                <Upload size={28} />
              </div>
              <span style={{
                color: 'rgba(45, 42, 38, 0.55)',
                fontWeight: 500,
                fontSize: '14px',
                fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
              }}>Tap to upload photo</span>
            </div>

            <div style={{
              ...glassInputStyle,
              display: 'flex',
              alignItems: 'center',
              marginBottom: '12px',
            }}>
              <MessageSquare size={20} style={{ color: '#9E584D', marginRight: '12px', opacity: 0.6 }} />
              <input
                type="text"
                placeholder="Add a caption..."
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#2D2A26',
                  fontWeight: 500,
                  fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
                }}
              />
            </div>

            <div style={{
              ...glassInputStyle,
              display: 'flex',
              alignItems: 'center',
            }}>
              <Calendar size={20} style={{ color: '#9E584D', marginRight: '12px', opacity: 0.6 }} />
              <input
                type="text"
                placeholder="When was this? (Optional)"
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#2D2A26',
                  fontWeight: 500,
                  fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
                }}
              />
            </div>
          </div>
        );

      case 'quote':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              marginBottom: '24px',
              position: 'relative',
            }}>
              <Quote size={48} style={{
                color: '#D68F54',
                opacity: 0.2,
                position: 'absolute',
                top: '-16px',
                left: '-8px',
              }} />
              <textarea
                placeholder="Type their words here..."
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  resize: 'none',
                  fontFamily: 'var(--font-playfair), Playfair Display, serif',
                  fontSize: '28px',
                  textAlign: 'center',
                  color: '#2D2A26',
                  lineHeight: 1.3,
                  minHeight: '200px',
                }}
              />
              <Quote size={48} style={{
                color: '#D68F54',
                opacity: 0.2,
                position: 'absolute',
                bottom: '-16px',
                right: '-8px',
                transform: 'rotate(180deg)',
              }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'rgba(45, 42, 38, 0.55)',
                paddingLeft: '16px',
                fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
              }}>Context</label>
              <div style={glassInputStyle}>
                <input
                  type="text"
                  placeholder="Who said it? (e.g. Dad)"
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#2D2A26',
                    fontWeight: 500,
                    fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
                  }}
                />
              </div>
              <div style={glassInputStyle}>
                <input
                  type="text"
                  placeholder="When/Where?"
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#2D2A26',
                    fontWeight: 500,
                    fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
                  }}
                />
              </div>
            </div>
          </div>
        );

      case 'favorite':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{
                fontFamily: 'var(--font-playfair), Playfair Display, serif',
                fontSize: '24px',
                color: '#2D2A26',
                marginBottom: '12px',
                display: 'block',
                paddingLeft: '4px',
              }}>Category</label>
              <div style={{
                display: 'flex',
                gap: '8px',
                overflowX: 'auto',
                paddingBottom: '8px',
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
              }}>
                {favCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFavCategory(cat)}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '9999px',
                      fontSize: '14px',
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s',
                      border: favCategory === cat ? 'none' : '1px solid rgba(219, 203, 184, 0.3)',
                      backgroundColor: favCategory === cat ? '#2D2A26' : 'white',
                      color: favCategory === cat ? '#F9F7F5' : 'rgba(45, 42, 38, 0.55)',
                      boxShadow: favCategory === cat ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div style={{
              ...glassInputStyle,
              borderRadius: '32px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              border: '1px solid rgba(214, 143, 84, 0.2)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            }}>
              <div>
                <label style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#9E584D',
                  marginBottom: '4px',
                  display: 'block',
                  fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
                }}>Their Favorite {favCategory}</label>
                <input
                  type="text"
                  placeholder={`Name of ${favCategory}...`}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid rgba(219, 203, 184, 0.3)',
                    paddingBottom: '8px',
                    outline: 'none',
                    color: '#2D2A26',
                    fontFamily: 'var(--font-playfair), Playfair Display, serif',
                    fontSize: '24px',
                  }}
                />
              </div>
              <div>
                <label style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'rgba(45, 42, 38, 0.55)',
                  marginBottom: '4px',
                  marginTop: '8px',
                  display: 'block',
                  fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
                }}>Why they loved it</label>
                <textarea
                  placeholder="Add a small note..."
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    resize: 'none',
                    fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
                    fontSize: '16px',
                    color: '#2D2A26',
                    height: '96px',
                  }}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // SELECT screen - memory type selection
  if (step === 'SELECT') {
    return (
      <div style={{
        height: '100%',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F5F2ED',
        paddingTop: '48px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Gradient overlay at top */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '300px',
          background: 'linear-gradient(to bottom, rgba(214, 143, 84, 0.05), transparent)',
          pointerEvents: 'none',
        }} />

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
          <button onClick={handleBack} style={backButtonStyle}>
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Playfair Display, serif',
            fontSize: '20px',
            color: '#2D2A26',
            letterSpacing: '-0.02em',
          }}>Create a Memory</h2>
          <div style={{ width: '40px' }} />
        </div>

        {/* Content */}
        <div
          className="no-scrollbar"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0 24px 128px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <h2 style={{
            fontFamily: 'var(--font-playfair), Playfair Display, serif',
            fontSize: '28px',
            textAlign: 'center',
            color: '#2D2A26',
            marginBottom: '40px',
            marginTop: '40px',
            letterSpacing: '-0.02em',
          }}>
            Choose a memory type
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {memoryTypes.map((type) => {
              const IconComponent = type.icon;
              const isSelected = selectedType === type.id;

              return (
                <div
                  key={type.id}
                  onClick={() => handleTypeSelect(type.id)}
                  style={{
                    position: 'relative',
                    background: isSelected ? 'white' : 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    borderRadius: '24px',
                    padding: '16px',
                    paddingRight: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: isSelected
                      ? '2px solid #D68F54'
                      : '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: isSelected
                      ? '0 8px 32px -8px rgba(158, 88, 77, 0.15)'
                      : '0 2px 8px rgba(0, 0, 0, 0.02)',
                  }}
                >
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '20px',
                    backgroundColor: isSelected ? 'rgba(214, 143, 84, 0.1)' : 'rgba(219, 203, 184, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isSelected ? '#D68F54' : '#2D2A26',
                    flexShrink: 0,
                    border: '1px solid rgba(219, 203, 184, 0.3)',
                    transition: 'all 0.2s',
                  }}>
                    <IconComponent size={22} strokeWidth={1.5} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{
                      fontFamily: 'var(--font-playfair), Playfair Display, serif',
                      fontSize: '18px',
                      color: '#2D2A26',
                      marginBottom: '2px',
                      letterSpacing: '-0.02em',
                    }}>{type.title}</h3>
                    <p style={{
                      color: 'rgba(45, 42, 38, 0.55)',
                      fontSize: '12px',
                      fontWeight: 500,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
                    }}>{type.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // INPUT screen - form based on selected type
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
        <button onClick={handleBack} style={backButtonStyle}>
          <ArrowLeft size={20} strokeWidth={1.5} />
        </button>
        <h2 style={{
          fontFamily: 'var(--font-playfair), Playfair Display, serif',
          fontSize: '20px',
          color: '#2D2A26',
          letterSpacing: '-0.02em',
          textTransform: 'capitalize',
        }}>
          {selectedType === 'favorite' ? 'Favorite Thing' : selectedType}
        </h2>
        <div style={{ width: '40px' }} />
      </div>

      {/* Content */}
      <div
        className="no-scrollbar"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0 24px 180px',
        }}
      >
        {renderInputScreen()}
      </div>

      {/* Save Button */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px 24px 32px',
        background: 'linear-gradient(to top, #F5F2ED, transparent)',
      }}>
        <button style={{
          width: '100%',
          padding: '16px',
          borderRadius: '24px',
          backgroundColor: '#2D2A26',
          color: '#F9F7F5',
          fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
          fontSize: '16px',
          fontWeight: 600,
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        }}>
          Save Memory
        </button>
      </div>
    </div>
  );
}
