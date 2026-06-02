'use client';

import TopBar from '@/components/TopBar';
import { Users } from 'lucide-react';

export default function UsersPage() {
  return (
    <div className="page-fade">
      <TopBar />

      <div className="p-6 max-w-5xl">
        <div className="animate-fade-in mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-white">User Management</h2>
          <p className="mt-1 text-sm text-white/40">
            Manage your team, roles, and access permissions.
          </p>
        </div>

        <div className="glass-card flex flex-col items-center justify-center p-20 animate-fade-in text-center">
          <div className="mb-4 rounded-full bg-[#06b6d4]/10 p-4 text-[#06b6d4]">
            <Users size={32} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Coming Soon</h3>
          <p className="text-sm text-white/50 max-w-sm">
            The user management console is under construction. Soon you'll be able to invite team members and configure role-based access.
          </p>
        </div>
      </div>
    </div>
  );
}
