'use client';

export default function RitualsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '420px',
        height: '100dvh',
        backgroundColor: '#1F1D24',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {children}
    </div>
  );
}
