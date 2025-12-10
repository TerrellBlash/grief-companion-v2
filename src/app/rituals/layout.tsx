import { ReactNode } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function RitualsLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      {/* Full screen, no nav for rituals */}
      <div className="h-[100dvh] w-full overflow-hidden">
        {children}
      </div>
    </ThemeProvider>
  );
}
