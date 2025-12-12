import type { Metadata, Viewport } from 'next';
import { DM_Sans, Playfair_Display, Caveat } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  weight: ['400', '500', '600', '700'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#F5F2ED',
};

export const metadata: Metadata = {
  title: 'Solace - Grief Companion',
  description: 'A compassionate companion for your grief journey',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${playfair.variable} ${caveat.variable}`}
        style={{
          fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
          backgroundColor: '#F5F2ED',
          color: '#2D2A26',
          WebkitFontSmoothing: 'antialiased',
          margin: 0,
          padding: 0,
          minHeight: '100dvh',
          overscrollBehavior: 'none',
        }}
      >
        <div
          id="app-root"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100dvh',
            width: '100%',
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
