import React, { useState } from 'react';
import {
  LayoutDashboard,
  FolderGit2,
  Cpu,
  Briefcase,
  GraduationCap,
  Award,
  Trophy,
  User,
  Share2,
  FileText,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

interface AdminLayoutProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeTab,
  onTabChange,
  children,
}) => {
  const { logout, data } = useCMS();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderGit2, count: data.projects.length },
    { id: 'skills', label: 'Skills', icon: Cpu, count: data.skills.length },
    { id: 'experience', label: 'Experience', icon: Briefcase, count: data.experience.length },
    { id: 'education', label: 'Education', icon: GraduationCap, count: data.educationTimeline.length },
    { id: 'certifications', label: 'Certifications', icon: Award, count: data.certifications.length },
    { id: 'achievements', label: 'Achievements', icon: Trophy, count: data.achievements.length },
    { id: 'about', label: 'About & Profile', icon: User },
    { id: 'social-links', label: 'Social Links', icon: Share2 },
    { id: 'resume', label: 'Resume', icon: FileText },
  ];

  const handleNavClick = (id: string) => {
    onTabChange(id);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#050607] text-[#F5F5F5] font-sans flex flex-col md:flex-row">
      {/* Top Header for Mobile */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0D1013]/90 border-b border-white/10 sticky top-0 z-40 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#FF6B00]/20 border border-[#FF6B00]/40 flex items-center justify-center text-[#FF6B00] font-bold font-heading text-xs">
            R
          </div>
          <span className="font-heading font-bold text-sm text-white">
            Admin CMS
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl text-[#A5A5A5] hover:text-white bg-white/5 border border-white/10 text-xs flex items-center gap-1"
            title="View Live Portfolio"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-xl text-[#F5F5F5] bg-white/5 border border-white/10"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5 text-[#FF6B00]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Desktop & Mobile Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 bottom-0 z-50 w-64 bg-[#080A0C] border-r border-white/10 flex flex-col justify-between transition-transform duration-200 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } h-screen`}
      >
        <div>
          {/* Header Badge */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00] shadow-[0_0_15px_rgba(255,107,0,0.2)]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-heading font-bold text-sm text-white leading-tight">
                  {data.profile.name}
                </h1>
                <span className="font-mono text-[10px] text-[#FF6B00] uppercase tracking-wider font-semibold">
                  Portfolio CMS
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden p-1 text-[#A5A5A5] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="p-3 space-y-1 max-h-[calc(100vh-160px)] overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#FF6B00] text-white shadow-[0_4px_20px_rgba(255,107,0,0.35)]'
                      : 'text-[#A5A5A5] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-[#A5A5A5]'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-semibold text-[#F5F5F5] bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>View Public Site</span>
          </a>

          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-semibold text-rose-300 bg-rose-950/30 hover:bg-rose-900/40 border border-rose-800/40 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content View */}
      <main className="flex-1 p-4 sm:p-8 max-w-6xl mx-auto overflow-y-auto">
        {children}
      </main>
    </div>
  );
};
