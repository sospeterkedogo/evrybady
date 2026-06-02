'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Sidebar from '@/components/Sidebar';
import { ShellProvider } from '@/components/ShellContext';
import { ThemeProvider } from '@/components/ThemeContext';
import ToastContainer from '@/components/Toast';
import type { Toast } from '@/types';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { session, user, loading, signOut } = useAuth();
  const router = useRouter();
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    if (!loading && !session) router.replace('/login');
  }, [session, loading, router]);

  const pushToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.replace('/login');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="h-8 w-8 rounded-full border-2 border-white/10 border-t-[#3b82f6]" style={{ animation: 'spin 0.8s linear infinite' }} />
      </div>
    );
  }

  if (!session) return null;

  return (
    <ThemeProvider>
      <ShellProvider>
        {/* Ambient background effects */}
        <div className="studio-grid-bg" />
        <div className="studio-glow studio-glow--tl" />
        <div className="studio-glow studio-glow--br" />

        <div style={{ display: 'flex', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
          <Sidebar userEmail={user?.email} onSignOut={handleSignOut} />

          {/* Main content — offset by sidebar width */}
          <main
            className="main-content"
            style={{
              marginLeft: 'var(--sidebar-w)',
              flex: 1,
              minHeight: '100vh',
              transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <DashboardContext.Provider value={{ pushToast }}>
              {children}
            </DashboardContext.Provider>
          </main>
        </div>

        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      </ShellProvider>
    </ThemeProvider>
  );
}

// Simple context for toast notifications across dashboard pages
import { createContext, useContext } from 'react';

type DashboardContextType = {
  pushToast: (message: string, type?: Toast['type']) => void;
};

export const DashboardContext = createContext<DashboardContextType>({
  pushToast: () => {},
});

export function useDashboard() {
  return useContext(DashboardContext);
}
