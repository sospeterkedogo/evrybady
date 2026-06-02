'use client';

import TopBar from '@/components/TopBar';
import { ScrollText } from 'lucide-react';

export default function AuditPage() {
  return (
    <div className="page-fade">
      <TopBar />

      <div className="p-6 max-w-5xl">
        <div className="animate-fade-in mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-white">Audit Log</h2>
          <p className="mt-1 text-sm text-white/40">
            Review workspace activity and security events.
          </p>
        </div>

        <div className="glass-card flex flex-col items-center justify-center p-20 animate-fade-in text-center">
          <div className="mb-4 rounded-full bg-[#ec4899]/10 p-4 text-[#ec4899]">
            <ScrollText size={32} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Coming Soon</h3>
          <p className="text-sm text-white/50 max-w-sm">
            We are tracking events in the background. The detailed audit log viewer will be available in a future update.
          </p>
        </div>
      </div>
    </div>
  );
}
