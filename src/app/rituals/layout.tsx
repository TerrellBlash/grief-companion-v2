import { ReactNode } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function RitualsLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <div className="app-container">
        <div className="content-scroll">
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}
