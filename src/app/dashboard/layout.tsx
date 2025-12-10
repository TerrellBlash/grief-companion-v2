import { ReactNode } from 'react';
import MobileAppShell from '@/components/layout/MobileAppShell';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <MobileAppShell>
        {children}
      </MobileAppShell>
    </ThemeProvider>
  );
}
