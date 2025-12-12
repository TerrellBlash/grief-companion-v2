'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Lock, Plus, User, Heart, ArrowRight, MailOpen } from 'lucide-react';

type Mode = 'LIST' | 'RECIPIENT' | 'DATE' | 'WRITE';
type Tab = 'WAITING' | 'DELIVERED';

export default function LettersPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('LIST');
  const [activeTab, setActiveTab] = useState<Tab>('WAITING');
  const [draft, setDraft] = useState({ recipient: '', recipientName: '', date: '', content: '' });

  const goBack = () => {
    if (mode === 'LIST') router.back();
    else if (mode === 'RECIPIENT') setMode('LIST');
    else if (mode === 'DATE') setMode('RECIPIENT');
    else if (mode === 'WRITE') setMode('DATE');
  };

  const deliveryOptions = ['In 1 month', 'In 6 months', 'In 1 year', "On Mom's Birthday"];

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

  // List View
  if (mode === 'LIST') {
    return (
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F5F2ED',
        paddingTop: '48px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px',
          position: 'relative',
          zIndex: 10,
        }}>
          <button onClick={goBack} style={backButtonStyle}>
            <ArrowLeft size={20} />
          </button>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '24px',
            color: '#2D2A26',
            letterSpacing: '-0.02em',
          }}>
            Legacy Letters
          </h2>
          <div style={{ width: '40px' }} />
        </div>

        {/* Tabs */}
        <div style={{
          padding: '0 24px',
          marginTop: '24px',
          marginBottom: '24px',
          position: 'relative',
          zIndex: 10,
        }}>
          <div style={{
            display: 'flex',
            gap: '32px',
            borderBottom: '1px solid rgba(219, 203, 184, 0.4)',
          }}>
            <button
              onClick={() => setActiveTab('WAITING')}
              style={{
                paddingBottom: '12px',
                fontSize: '14px',
                fontWeight: 500,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                color: activeTab === 'WAITING' ? '#9E584D' : 'rgba(60, 56, 54, 0.55)',
              }}
            >
              Waiting
              {activeTab === 'WAITING' && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  backgroundColor: '#9E584D',
                  borderRadius: '2px 2px 0 0',
                }} />
              )}
            </button>
            <button
              onClick={() => setActiveTab('DELIVERED')}
              style={{
                paddingBottom: '12px',
                fontSize: '14px',
                fontWeight: 500,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                color: activeTab === 'DELIVERED' ? '#9E584D' : 'rgba(60, 56, 54, 0.55)',
              }}
            >
              Delivered
              {activeTab === 'DELIVERED' && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  backgroundColor: '#9E584D',
                  borderRadius: '2px 2px 0 0',
                }} />
              )}
            </button>
          </div>
        </div>

        <div
          className="no-scrollbar"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0 24px 128px',
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {activeTab === 'WAITING' ? (
            <>
              {/* Existing Letter */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '24px',
                padding: '24px',
                boxShadow: '0 2px 20px rgba(0, 0, 0, 0.02)',
                border: '1px solid white',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '20px',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'rgba(60, 56, 54, 0.55)',
                    opacity: 0.7,
                  }}>
                    <Lock size={14} />
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}>
                      Sealed
                    </span>
                  </div>
                  <div style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(158, 88, 77, 0.1)',
                    color: '#9E584D',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                  }}>
                    Dec 3, 2026
                  </div>
                </div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '28px',
                  color: '#2D2A26',
                  marginBottom: '8px',
                  letterSpacing: '-0.02em',
                }}>
                  Future Me
                </h3>
                <p style={{
                  color: 'rgba(60, 56, 54, 0.55)',
                  fontSize: '12px',
                }}>
                  Written on Oct 15, 2025
                </p>
              </div>

              {/* New Letter Button */}
              <div
                onClick={() => setMode('RECIPIENT')}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.4)',
                  borderRadius: '24px',
                  height: '180px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                  cursor: 'pointer',
                  border: '1px solid transparent',
                  transition: 'all 0.3s',
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(60, 56, 54, 0.55)',
                }}>
                  <Plus size={24} />
                </div>
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '20px',
                  color: 'rgba(60, 56, 54, 0.4)',
                }}>
                  Write a new letter
                </span>
              </div>
            </>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '80px',
              textAlign: 'center',
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(214, 143, 84, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D68F54',
                marginBottom: '16px',
              }}>
                <MailOpen size={24} />
              </div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '18px',
                color: '#2D2A26',
                marginBottom: '4px',
              }}>
                No delivered letters
              </h3>
              <p style={{
                color: 'rgba(60, 56, 54, 0.55)',
                fontSize: '14px',
                maxWidth: '200px',
              }}>
                Letters will appear here once their delivery date has passed.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Recipient Selection
  if (mode === 'RECIPIENT') {
    const selectRecipient = (type: string, name: string) => {
      setDraft({ ...draft, recipient: type, recipientName: name });
      setTimeout(() => setMode('DATE'), 200);
    };

    return (
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F5F2ED',
        paddingTop: '48px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
          position: 'relative',
          zIndex: 10,
        }}>
          <button onClick={goBack} style={backButtonStyle}>
            <ArrowLeft size={20} />
          </button>
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#9E584D',
            }} />
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'rgba(219, 203, 184, 0.5)',
            }} />
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'rgba(219, 203, 184, 0.5)',
            }} />
          </div>
          <div style={{ width: '40px' }} />
        </div>

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
            fontFamily: "'Playfair Display', serif",
            fontSize: '30px',
            color: '#2D2A26',
            marginBottom: '8px',
            marginTop: '32px',
          }}>
            Who is this for?
          </h2>

          <div style={{
            display: 'grid',
            gap: '16px',
            marginTop: '32px',
          }}>
            <button
              onClick={() => selectRecipient('self', 'Future Me')}
              style={{
                textAlign: 'left',
                ...glassRegularStyle,
                padding: '20px',
                borderRadius: '24px',
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#F5F2ED',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2D2A26',
                marginBottom: '12px',
              }}>
                <User size={24} />
              </div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '18px',
                color: '#2D2A26',
              }}>
                Future Me
              </h3>
              <p style={{
                fontSize: '12px',
                color: 'rgba(60, 56, 54, 0.55)',
              }}>
                A message to yourself
              </p>
            </button>

            <button
              onClick={() => selectRecipient('loved-one', 'Mom')}
              style={{
                textAlign: 'left',
                ...glassRegularStyle,
                padding: '20px',
                borderRadius: '24px',
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#F5F2ED',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9E584D',
                marginBottom: '12px',
              }}>
                <Heart size={24} />
              </div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '18px',
                color: '#2D2A26',
              }}>
                To Mom
              </h3>
              <p style={{
                fontSize: '12px',
                color: 'rgba(60, 56, 54, 0.55)',
              }}>
                Words you wish you could say
              </p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Date Selection
  if (mode === 'DATE') {
    return (
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F5F2ED',
        paddingTop: '48px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
          position: 'relative',
          zIndex: 10,
        }}>
          <button onClick={goBack} style={backButtonStyle}>
            <ArrowLeft size={20} />
          </button>
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'rgba(219, 203, 184, 0.5)',
            }} />
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#9E584D',
            }} />
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'rgba(219, 203, 184, 0.5)',
            }} />
          </div>
          <div style={{ width: '40px' }} />
        </div>

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
            fontFamily: "'Playfair Display', serif",
            fontSize: '30px',
            color: '#2D2A26',
            marginBottom: '8px',
            marginTop: '32px',
          }}>
            When to deliver?
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginTop: '32px',
          }}>
            {deliveryOptions.map((option, i) => (
              <button
                key={i}
                onClick={() => {
                  setDraft({ ...draft, date: option });
                  setTimeout(() => setMode('WRITE'), 200);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  ...glassRegularStyle,
                  padding: '16px',
                  borderRadius: '20px',
                  color: '#2D2A26',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                <span>{option}</span>
                <ArrowRight size={18} style={{ color: '#D68F54', opacity: 0.5 }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Write Letter
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#F5F2ED',
      paddingTop: '48px',
      padding: '48px 24px 32px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
      }}>
        <button onClick={goBack} style={backButtonStyle}>
          <ArrowLeft size={20} />
        </button>
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: 'rgba(219, 203, 184, 0.5)',
          }} />
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: 'rgba(219, 203, 184, 0.5)',
          }} />
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#9E584D',
          }} />
        </div>
        <div style={{ width: '40px' }} />
      </div>

      <div style={{
        flex: 1,
        ...glassRegularStyle,
        borderRadius: '32px',
        padding: '24px',
        marginBottom: '24px',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '20px',
          color: '#2D2A26',
          marginBottom: '16px',
        }}>
          Dear {draft.recipientName},
        </p>
        <textarea
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: 'transparent',
            resize: 'none',
            outline: 'none',
            border: 'none',
            color: '#2D2A26',
            lineHeight: 1.6,
            fontFamily: "'Playfair Display', serif",
            fontSize: '16px',
          }}
          placeholder="Start writing here..."
          value={draft.content}
          onChange={(e) => setDraft({ ...draft, content: e.target.value })}
          autoFocus
        />
        <p style={{
          fontSize: '12px',
          color: 'rgba(60, 56, 54, 0.55)',
          marginTop: '8px',
          textAlign: 'right',
        }}>
          Arrives {draft.date}
        </p>
      </div>

      <button style={{
        width: '100%',
        padding: '16px',
        borderRadius: '9999px',
        backgroundColor: '#D68F54',
        color: '#2A2730',
        fontFamily: "'Playfair Display', serif",
        fontSize: '18px',
        letterSpacing: '0.02em',
        boxShadow: '0 0 30px rgba(214, 143, 84, 0.4)',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontWeight: 500,
      }}>
        Seal Letter
      </button>
    </div>
  );
}
