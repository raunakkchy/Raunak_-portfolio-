import React from 'react';
import {
  FolderGit2,
  Cpu,
  Award,
  Briefcase,
  Trophy,
  Plus,
  Sparkles,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

interface AdminDashboardProps {
  onNavigate: (tab: string) => void;
  onOpenQuickAdd: (type: 'project' | 'skill' | 'cert' | 'exp') => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigate,
  onOpenQuickAdd,
}) => {
  const { data } = useCMS();

  const metrics = [
    {
      label: 'Total Projects',
      count: data.projects.length,
      published: data.projects.filter((p) => p.published).length,
      icon: FolderGit2,
      tab: 'projects',
    },
    {
      label: 'Total Skills',
      count: data.skills.length,
      published: data.skills.length,
      icon: Cpu,
      tab: 'skills',
    },
    {
      label: 'Certifications',
      count: data.certifications.length,
      published: data.certifications.filter((c) => c.published).length,
      icon: Award,
      tab: 'certifications',
    },
    {
      label: 'Experience Entries',
      count: data.experience.length,
      published: data.experience.filter((e) => e.published).length,
      icon: Briefcase,
      tab: 'experience',
    },
    {
      label: 'Achievements',
      count: data.achievements.length,
      published: data.achievements.filter((a) => a.published).length,
      icon: Trophy,
      tab: 'achievements',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="w-8 h-[2.5px] bg-[#FF6B00] rounded-full mb-3 shadow-[0_0_10px_rgba(255,107,0,0.5)]" />
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            CMS Overview Dashboard
          </h1>
          <p className="font-body text-xs sm:text-sm text-[#A5A5A5] mt-1">
            Manage public portfolio content, projects, skills, and certifications in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#FF6B00] hover:bg-[#FF852C] shadow-lg shadow-[#FF6B00]/20 transition-all"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              onClick={() => onNavigate(m.tab)}
              className="liquid-glass p-6 rounded-3xl border border-white/10 hover:border-[#FF6B00]/40 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-heading text-xs font-semibold text-[#A5A5A5] group-hover:text-white">
                  {m.label}
                </span>
                <div className="w-10 h-10 rounded-2xl bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00] group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div>
                <div className="font-heading text-3xl font-bold text-white mb-1">
                  {m.count}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#FF852C]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{m.published} Published Live</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Shortcuts */}
      <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/15 bg-white/[0.02]">
        <div className="flex items-center gap-2 mb-4 text-[#FF6B00]">
          <Sparkles className="w-5 h-5" />
          <h2 className="font-heading text-lg font-bold text-white">
            Quick Actions
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={() => onOpenQuickAdd('project')}
            className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FF6B00]/50 hover:bg-[#FF6B00]/10 flex flex-col items-center justify-center gap-2 text-center transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00] group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5" />
            </div>
            <span className="font-heading text-xs font-semibold text-white">
              + Add Project
            </span>
          </button>

          <button
            type="button"
            onClick={() => onOpenQuickAdd('skill')}
            className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FF6B00]/50 hover:bg-[#FF6B00]/10 flex flex-col items-center justify-center gap-2 text-center transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00] group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5" />
            </div>
            <span className="font-heading text-xs font-semibold text-white">
              + Add Skill
            </span>
          </button>

          <button
            type="button"
            onClick={() => onOpenQuickAdd('cert')}
            className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FF6B00]/50 hover:bg-[#FF6B00]/10 flex flex-col items-center justify-center gap-2 text-center transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00] group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5" />
            </div>
            <span className="font-heading text-xs font-semibold text-white">
              + Add Certificate
            </span>
          </button>

          <button
            type="button"
            onClick={() => onOpenQuickAdd('exp')}
            className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FF6B00]/50 hover:bg-[#FF6B00]/10 flex flex-col items-center justify-center gap-2 text-center transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00] group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5" />
            </div>
            <span className="font-heading text-xs font-semibold text-white">
              + Add Experience
            </span>
          </button>
        </div>
      </div>

      {/* Recent Activity / Projects Quick List */}
      <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/15">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-lg font-bold text-white">
            Managed Projects List ({data.projects.length})
          </h2>
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="text-xs font-mono font-semibold text-[#FF6B00] hover:underline"
          >
            View All →
          </button>
        </div>

        <div className="space-y-3">
          {data.projects.slice(0, 4).map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#FF6B00]/30 transition-colors"
            >
              <div>
                <div className="font-heading text-sm font-bold text-white">
                  {p.title} <span className="text-xs font-normal text-[#A5A5A5]">— {p.subtitle}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FF6B00]/10 text-[#FF852C]">
                    {p.category}
                  </span>
                  <span className="text-xs text-[#A5A5A5] font-mono">
                    {p.technologies.slice(0, 3).join(', ')}
                  </span>
                </div>
              </div>

              <span
                className={`text-[10px] font-mono px-2.5 py-1 rounded-full font-bold ${
                  p.published
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                }`}
              >
                {p.published ? 'Published' : 'Draft'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
