'use client';

import TopBar from '@/components/TopBar';
import {
  Shield,
  Monitor,
  Smartphone,
  Globe,
  Check,
  AlertTriangle,
  Key,
  Lock,
  Eye,
  Fingerprint,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';

const SESSIONS = [
  {
    id: '1',
    device: 'Windows Desktop',
    browser: 'Chrome 126',
    location: 'London, UK',
    lastActive: 'Just now',
    current: true,
    icon: Monitor,
  },
  {
    id: '2',
    device: 'iPhone 15',
    browser: 'Safari Mobile',
    location: 'London, UK',
    lastActive: '2 hours ago',
    current: false,
    icon: Smartphone,
  },
  {
    id: '3',
    device: 'MacBook Pro',
    browser: 'Firefox 128',
    location: 'Manchester, UK',
    lastActive: '3 days ago',
    current: false,
    icon: Monitor,
  },
];

const LOGIN_HISTORY = [
  { time: 'Today, 10:15 PM', status: 'success' as const, location: 'London, UK', method: 'Password' },
  { time: 'Today, 8:30 AM', status: 'success' as const, location: 'London, UK', method: 'Password' },
  { time: 'Yesterday, 11:45 PM', status: 'failed' as const, location: 'Unknown', method: 'Password' },
  { time: 'Jun 1, 3:20 PM', status: 'success' as const, location: 'Manchester, UK', method: 'OAuth' },
  { time: 'May 31, 9:10 AM', status: 'success' as const, location: 'London, UK', method: 'Password' },
];

const CHECKLIST = [
  { label: 'Strong password set', done: true, desc: 'Using a password with 12+ characters' },
  { label: 'Email verified', done: true, desc: 'Your email address has been confirmed' },
  { label: 'Two-factor authentication', done: false, desc: 'Add an extra security layer' },
  { label: 'Recovery email configured', done: false, desc: 'Set a backup email for account recovery' },
  { label: 'Session timeout configured', done: true, desc: 'Auto-logout after inactivity' },
];

export default function SecurityPage() {
  const { user } = useAuth();
  const { role } = useUserRole();

  const doneCount = CHECKLIST.filter((c) => c.done).length;
  const scorePercent = Math.round((doneCount / CHECKLIST.length) * 100);
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (scorePercent / 100) * circumference;
  const scoreColor =
    scorePercent >= 80 ? 'var(--accent-emerald)' : scorePercent >= 50 ? 'var(--accent-amber)' : 'var(--accent-red)';

  return (
    <div className="page-fade">
      <TopBar />

      <div style={{ padding: '1.5rem', maxWidth: 1100 }}>
        <div className="animate-fade-in" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>
            Security Overview
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', margin: '0.35rem 0 0' }}>
            Monitor your account security, sessions, and access controls.
          </p>
        </div>

        <div className="security-grid">
          {/* ── Security Score ── */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 1.25rem', color: 'var(--text-primary)' }}>
              Security Score
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div className="security-score">
                <svg className="security-score-ring" width={120} height={120} viewBox="0 0 120 120">
                  <circle className="security-score-bg" cx={60} cy={60} r={45} />
                  <circle
                    className="security-score-fill"
                    cx={60}
                    cy={60}
                    r={45}
                    stroke={scoreColor}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{ animation: 'scoreReveal 1.2s ease-out forwards' }}
                  />
                </svg>
                <div className="security-score-value" style={{ color: scoreColor }}>
                  {scorePercent}%
                </div>
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: '1.05rem', margin: 0, color: 'var(--text-primary)' }}>
                  {scorePercent >= 80 ? 'Strong' : scorePercent >= 50 ? 'Moderate' : 'Weak'}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)', margin: '0.25rem 0 0' }}>
                  {doneCount} of {CHECKLIST.length} checks passed
                </p>
              </div>
            </div>
          </div>

          {/* ── Role & Permissions ── */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 1.25rem', color: 'var(--text-primary)' }}>
              Access Level
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(139, 92, 246, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-purple)',
                }}
              >
                <Shield size={22} />
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: '1.05rem', margin: 0, textTransform: 'capitalize', color: 'var(--text-primary)' }}>
                  {role}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)', margin: '0.15rem 0 0' }}>
                  {user?.email}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {['Dashboard', 'Projects', role === 'admin' ? 'Users' : null, role === 'admin' ? 'Audit' : null, 'Settings']
                .filter(Boolean)
                .map((p) => (
                  <span key={p} className="badge badge--info">{p}</span>
                ))}
            </div>
          </div>

          {/* ── Active Sessions ── */}
          <div className="glass-card" style={{ padding: '1.5rem', gridColumn: '1 / -1' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                Active Sessions
              </h3>
              <span className="badge badge--success">{SESSIONS.length} active</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {SESSIONS.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.id} className={`session-card ${s.current ? 'session-current' : ''}`}>
                    <div className="session-icon">
                      <Icon size={20} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{s.device}</span>
                        {s.current && <span className="badge badge--success">Current</span>}
                      </div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-sub)', margin: '0.15rem 0 0' }}>
                        {s.browser} · {s.location} · {s.lastActive}
                      </p>
                    </div>
                    {!s.current && (
                      <button className="btn btn-ghost btn-sm" style={{ flexShrink: 0 }}>
                        Revoke
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Login History ── */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 1.25rem', color: 'var(--text-primary)' }}>
              Login History
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {LOGIN_HISTORY.map((entry, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.65rem 0',
                    borderBottom: i < LOGIN_HISTORY.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: entry.status === 'success' ? 'var(--accent-emerald)' : 'var(--accent-red)',
                      flexShrink: 0,
                      boxShadow: entry.status === 'success'
                        ? '0 0 8px rgba(16, 185, 129, 0.5)'
                        : '0 0 8px rgba(239, 68, 68, 0.5)',
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {entry.time}
                    </span>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-sub)', margin: '0.1rem 0 0' }}>
                      {entry.location} · {entry.method}
                    </p>
                  </div>
                  <span className={`badge ${entry.status === 'success' ? 'badge--success' : 'badge--danger'}`}>
                    {entry.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Security Checklist ── */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 1.25rem', color: 'var(--text-primary)' }}>
              Security Checklist
            </h3>
            {CHECKLIST.map((item, i) => (
              <div key={i} className="security-checklist-item">
                <div className={`security-check ${item.done ? 'security-check--done' : 'security-check--pending'}`}>
                  {item.done ? <Check size={14} /> : <AlertTriangle size={14} />}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {item.label}
                  </span>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-sub)', margin: '0.1rem 0 0' }}>
                    {item.desc}
                  </p>
                </div>
                {!item.done && (
                  <button className="btn btn-ghost btn-sm">Setup</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
