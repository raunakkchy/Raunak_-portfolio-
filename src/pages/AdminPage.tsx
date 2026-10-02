import React, { useState, useEffect } from 'react';
import { Lock, ShieldCheck, ArrowRight, User } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { AdminLayout } from '../components/admin/AdminLayout';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { ProjectsManager } from '../components/admin/ProjectsManager';
import { SkillsManager } from '../components/admin/SkillsManager';
import { ExperienceManager } from '../components/admin/ExperienceManager';
import { EducationManager } from '../components/admin/EducationManager';
import { CertificationsManager } from '../components/admin/CertificationsManager';
import { AchievementsManager } from '../components/admin/AchievementsManager';
import { AboutManager } from '../components/admin/AboutManager';
import { SocialLinksManager } from '../components/admin/SocialLinksManager';
import { ResumeManager } from '../components/admin/ResumeManager';
import { ToastNotification } from '../components/admin/ToastNotification';

export const AdminPage: React.FC = () => {
  const { isAuthenticated, login, toastMessage, clearToast } = useCMS();

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [quickAddModal, setQuickAddModal] = useState<'project' | 'skill' | 'cert' | 'exp' | null>(null);

  // Login Form State
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Handle URL hash or tab navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').replace('/admin/', '');
      if (hash && hash !== 'admin') {
        setActiveTab(hash);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = `/admin/${tab}`;
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);

    const res = await login(username, password);
    setIsSubmitting(false);

    if (!res.success) {
      setLoginError(res.message || 'Invalid username or password');
    }
  };

  // If not authenticated, render Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050607] text-[#F5F5F5] font-sans flex items-center justify-center p-4 relative overflow-hidden">
        {/* Ambient Glows */}
        <div
          aria-hidden="true"
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[140px] bg-[#FF6B00]/25 pointer-events-none"
        />

        <div className="relative w-full max-w-md liquid-glass rounded-3xl p-8 border border-white/20 shadow-2xl z-10 bg-[#0D1013]/90">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00] mx-auto mb-3 shadow-[0_0_20px_rgba(255,107,0,0.3)]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-white mb-1">
              Admin CMS Login
            </h1>
            <p className="font-body text-xs text-[#A5A5A5]">
              Protected portfolio content management panel
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs text-center font-mono">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs font-sans">
            <div>
              <label className="block text-[#A5A5A5] font-mono mb-1">Username</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                  placeholder="admin"
                />
                <User className="w-4 h-4 text-[#A5A5A5] absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-[#A5A5A5] font-mono mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                  placeholder="••••••••"
                />
                <Lock className="w-4 h-4 text-[#A5A5A5] absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl font-semibold text-xs text-white bg-[#FF6B00] hover:bg-[#FF852C] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#FF6B00]/30 mt-2"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <a
              href="/"
              className="text-xs font-mono text-[#A5A5A5] hover:text-white transition-colors"
            >
              ← Back to Public Portfolio
            </a>
          </div>
        </div>

        <ToastNotification toast={toastMessage} onClose={clearToast} />
      </div>
    );
  }

  // Render Authenticated Admin Dashboard Layout
  return (
    <AdminLayout activeTab={activeTab} onTabChange={handleTabChange}>
      {activeTab === 'dashboard' && (
        <AdminDashboard
          onNavigate={handleTabChange}
          onOpenQuickAdd={(type) => {
            setQuickAddModal(type);
            if (type === 'project') handleTabChange('projects');
            if (type === 'skill') handleTabChange('skills');
            if (type === 'cert') handleTabChange('certifications');
            if (type === 'exp') handleTabChange('experience');
          }}
        />
      )}

      {activeTab === 'projects' && (
        <ProjectsManager quickAddOpen={quickAddModal === 'project'} />
      )}

      {activeTab === 'skills' && (
        <SkillsManager quickAddOpen={quickAddModal === 'skill'} />
      )}

      {activeTab === 'experience' && (
        <ExperienceManager quickAddOpen={quickAddModal === 'exp'} />
      )}

      {activeTab === 'education' && <EducationManager />}

      {activeTab === 'certifications' && (
        <CertificationsManager quickAddOpen={quickAddModal === 'cert'} />
      )}

      {activeTab === 'achievements' && <AchievementsManager />}

      {activeTab === 'about' && <AboutManager />}

      {activeTab === 'social-links' && <SocialLinksManager />}

      {activeTab === 'resume' && <ResumeManager />}

      <ToastNotification toast={toastMessage} onClose={clearToast} />
    </AdminLayout>
  );
};
