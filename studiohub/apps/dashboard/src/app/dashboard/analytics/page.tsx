'use client';

import TopBar from '@/components/TopBar';
import { BarChart3 } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="page-fade">
      <TopBar />

      <div className="p-6 max-w-5xl">
        <div className="animate-fade-in mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-white">Analytics</h2>
          <p className="mt-1 text-sm text-white/40">
            Performance metrics and project statistics.
          </p>
        </div>

        <div className="glass-card flex flex-col items-center justify-center p-20 animate-fade-in text-center">
          <div className="mb-4 rounded-full bg-[#8b5cf6]/10 p-4 text-[#8b5cf6]">
            <BarChart3 size={32} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Coming Soon</h3>
          <p className="text-sm text-white/50 max-w-sm">
            We're building out advanced analytics and reporting features. Check back later to view your project metrics.
          </p>
        </div>
      </div>
    </div>
  );
}
