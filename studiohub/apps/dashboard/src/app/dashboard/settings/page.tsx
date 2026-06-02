'use client';

import { useState } from 'react';
import TopBar from '@/components/TopBar';
import {
  User,
  Palette,
  Bell,
  Shield,
  Check,
} from 'lucide-react';
import { useTheme } from '@/components/ThemeContext';
import { useAuth } from '@/hooks/useAuth';
import { useDashboard } from '../layout';

type SettingsTab = 'profile' | 'appearance' | 'notifications' | 'security';

const TABS: { id: SettingsTab; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { pushToast } = useDashboard();

  // Profile state
  const [displayName, setDisplayName] = useState(user?.user_metadata?.full_name ?? '');
  const [saving, setSaving] = useState(false);

  // Notification state
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [browserNotifs, setBrowserNotifs] = useState(false);
  const [digestFreq, setDigestFreq] = useState('daily');

  // Security state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveProfile = async () => {
    setSaving(true);
    // Simulate save
    await new Promise((r) => setTimeout(r, 800));
    pushToast('Profile updated successfully', 'success');
    setSaving(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      pushToast('Passwords do not match', 'error');
      return;
    }
    if (newPassword.length < 8) {
      pushToast('Password must be at least 8 characters', 'error');
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    pushToast('Password updated successfully', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setSaving(false);
  };

  return (
    <div className="page-fade">
      <TopBar />

      <div className="settings-layout">
        {/* Tab sidebar */}
        <div className="settings-tabs">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={17} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="settings-content">
          {/* ── Profile ── */}
          {activeTab === 'profile' && (
            <div className="animate-fade-in">
              <div className="settings-section">
                <h2 className="settings-section-title">Profile</h2>
                <p className="settings-section-desc">Manage your personal information and account details.</p>

                <div className="glass-card" style={{ padding: '1.5rem' }}>
                  {/* Avatar preview */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.75rem' }}>
                    <div
                      className="sidebar-avatar"
                      style={{ width: 64, height: 64, fontSize: '1.4rem' }}
                    >
                      {user?.email?.[0]?.toUpperCase() ?? 'U'}
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '1rem', margin: 0, color: 'var(--text-primary)' }}>
                        {displayName || user?.email?.split('@')[0] || 'User'}
                      </p>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-sub)', margin: '0.2rem 0 0' }}>
                        {user?.email ?? 'No email set'}
                      </p>
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label className="form-label" htmlFor="display-name">Display Name</label>
                    <input
                      id="display-name"
                      type="text"
                      className="form-input"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Your display name"
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                    <label className="form-label" htmlFor="profile-email">Email</label>
                    <input
                      id="profile-email"
                      type="email"
                      className="form-input"
                      value={user?.email ?? ''}
                      disabled
                      style={{ opacity: 0.6, cursor: 'not-allowed' }}
                    />
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      Email cannot be changed from here.
                    </span>
                  </div>

                  <button
                    className="btn btn-primary"
                    onClick={handleSaveProfile}
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── Appearance ── */}
          {activeTab === 'appearance' && (
            <div className="animate-fade-in">
              <div className="settings-section">
                <h2 className="settings-section-title">Appearance</h2>
                <p className="settings-section-desc">Customize the look and feel of your dashboard.</p>

                <div className="glass-card" style={{ padding: '1.5rem' }}>
                  <div className="settings-row">
                    <div>
                      <p className="settings-row-label">Theme</p>
                      <p className="settings-row-desc">Switch between dark and light mode.</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-sub)', textTransform: 'capitalize' }}>
                        {theme}
                      </span>
                      <button
                        className={`toggle ${theme === 'light' ? 'active' : ''}`}
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                      />
                    </div>
                  </div>

                  <div className="settings-row">
                    <div>
                      <p className="settings-row-label">Accent Color</p>
                      <p className="settings-row-desc">Choose your primary accent color.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899'].map((c) => (
                        <button
                          key={c}
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            background: c,
                            border: c === '#3b82f6' ? '2px solid #fff' : '2px solid transparent',
                            cursor: 'pointer',
                            transition: 'transform 0.15s',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
                          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                          aria-label={`Select accent color ${c}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="settings-row">
                    <div>
                      <p className="settings-row-label">Compact Mode</p>
                      <p className="settings-row-desc">Reduce spacing for more content density.</p>
                    </div>
                    <button className="toggle" aria-label="Toggle compact mode" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Notifications ── */}
          {activeTab === 'notifications' && (
            <div className="animate-fade-in">
              <div className="settings-section">
                <h2 className="settings-section-title">Notifications</h2>
                <p className="settings-section-desc">Control how and when you receive notifications.</p>

                <div className="glass-card" style={{ padding: '1.5rem' }}>
                  <div className="settings-row">
                    <div>
                      <p className="settings-row-label">Email Notifications</p>
                      <p className="settings-row-desc">Receive project updates and alerts via email.</p>
                    </div>
                    <button
                      className={`toggle ${emailNotifs ? 'active' : ''}`}
                      onClick={() => setEmailNotifs((v) => !v)}
                      aria-label="Toggle email notifications"
                    />
                  </div>

                  <div className="settings-row">
                    <div>
                      <p className="settings-row-label">Browser Notifications</p>
                      <p className="settings-row-desc">Get push notifications in your browser.</p>
                    </div>
                    <button
                      className={`toggle ${browserNotifs ? 'active' : ''}`}
                      onClick={() => setBrowserNotifs((v) => !v)}
                      aria-label="Toggle browser notifications"
                    />
                  </div>

                  <div className="settings-row">
                    <div>
                      <p className="settings-row-label">Digest Frequency</p>
                      <p className="settings-row-desc">How often to receive summary emails.</p>
                    </div>
                    <select
                      value={digestFreq}
                      onChange={(e) => setDigestFreq(e.target.value)}
                      style={{ width: 'auto', minWidth: 140 }}
                    >
                      <option value="realtime">Real-time</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="never">Never</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Security ── */}
          {activeTab === 'security' && (
            <div className="animate-fade-in">
              <div className="settings-section">
                <h2 className="settings-section-title">Security</h2>
                <p className="settings-section-desc">Manage your password and security preferences.</p>

                <div className="glass-card" style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 1rem', color: 'var(--text-primary)' }}>
                    Change Password
                  </h3>

                  <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="current-password">Current Password</label>
                      <input
                        id="current-password"
                        type="password"
                        className="form-input"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                        autoComplete="current-password"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="new-password">New Password</label>
                      <input
                        id="new-password"
                        type="password"
                        className="form-input"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        autoComplete="new-password"
                        required
                        minLength={8}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="confirm-password">Confirm New Password</label>
                      <input
                        id="confirm-password"
                        type="password"
                        className="form-input"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        autoComplete="new-password"
                        required
                        minLength={8}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={saving} style={{ alignSelf: 'flex-start' }}>
                      {saving ? 'Updating...' : 'Update Password'}
                    </button>
                  </form>
                </div>

                {/* 2FA Section */}
                <div className="glass-card" style={{ padding: '1.5rem', marginTop: '1.25rem' }}>
                  <div className="settings-row" style={{ borderBottom: 'none' }}>
                    <div>
                      <p className="settings-row-label">Two-Factor Authentication</p>
                      <p className="settings-row-desc">Add an extra layer of security to your account.</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span className="badge badge--warning">Not enabled</span>
                      <button className="btn btn-ghost btn-sm">Enable</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
