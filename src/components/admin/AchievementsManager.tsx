import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Trophy, ExternalLink, X } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { AchievementItem } from '../../types/cms';
import { ConfirmModal } from './ConfirmModal';

export const AchievementsManager: React.FC = () => {
  const { data, addAchievement, updateAchievement, deleteAchievement } = useCMS();

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingAch, setEditingAch] = useState<AchievementItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<AchievementItem>>({
    title: '',
    description: '',
    date: '',
    link: '',
    published: true,
  });

  const openCreateModal = () => {
    setEditingAch(null);
    setFormData({
      title: 'Academic Milestone',
      description: '',
      date: '2026',
      published: true,
    });
    setIsFormOpen(true);
  };

  const openEditModal = (ach: AchievementItem) => {
    setEditingAch(ach);
    setFormData(ach);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description) return;

    if (editingAch) {
      await updateAchievement({ ...editingAch, ...formData } as AchievementItem);
    } else {
      await addAchievement({
        title: formData.title || 'Achievement',
        description: formData.description || '',
        date: formData.date,
        link: formData.link,
        published: formData.published ?? true,
      });
    }
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="w-8 h-[2.5px] bg-[#FF6B00] rounded-full mb-3 shadow-[0_0_10px_rgba(255,107,0,0.5)]" />
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-7 h-7 text-[#FF6B00]" />
            <span>Achievements CMS</span>
          </h1>
          <p className="font-body text-xs sm:text-sm text-[#A5A5A5] mt-1">
            Manage factual academic milestones and project achievements.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#FF6B00] hover:bg-[#FF852C] shadow-lg shadow-[#FF6B00]/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Achievement</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {data.achievements.map((ach) => (
          <div
            key={ach.id}
            className="liquid-glass rounded-2xl p-5 border border-white/10 hover:border-[#FF6B00]/30 transition-all flex items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-heading font-bold text-sm text-white">
                  {ach.title}
                </span>
                {ach.date && (
                  <span className="font-mono text-[10px] text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded-full">
                    {ach.date}
                  </span>
                )}
              </div>
              <p className="font-body text-xs text-[#A5A5A5] leading-relaxed">
                {ach.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {ach.link && (
                <a
                  href={ach.link}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg text-[#A5A5A5] hover:text-[#FF6B00] bg-white/5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                type="button"
                onClick={() => openEditModal(ach)}
                className="p-1.5 rounded-lg text-[#A5A5A5] hover:text-white bg-white/5"
                title="Edit Achievement"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setDeletingId(ach.id)}
                className="p-1.5 rounded-lg text-rose-400 hover:text-white bg-rose-950/30 hover:bg-rose-600"
                title="Delete Achievement"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md liquid-glass rounded-3xl p-6 border border-white/20 bg-[#0D1013]">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#A5A5A5] hover:text-white bg-white/5"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="font-heading text-xl font-bold text-white mb-4">
              {editingAch ? 'Edit Achievement' : 'Add Achievement'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-[#A5A5A5] font-mono mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                  placeholder="e.g. Academic Distinction"
                />
              </div>

              <div>
                <label className="block text-[#A5A5A5] font-mono mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                  placeholder="e.g. Maintained an academic CGPA of 8.5 / 10..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A5A5A5] font-mono mb-1">Date</label>
                  <input
                    type="text"
                    value={formData.date || ''}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                    placeholder="e.g. 2026"
                  />
                </div>

                <div>
                  <label className="block text-[#A5A5A5] font-mono mb-1">Proof / Link</label>
                  <input
                    type="url"
                    value={formData.link || ''}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#A5A5A5] bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl text-xs font-semibold text-white bg-[#FF6B00] hover:bg-[#FF852C]"
                >
                  {editingAch ? 'Save Changes' : 'Add Achievement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!deletingId}
        title="Delete Achievement?"
        message="This achievement will be removed from your portfolio."
        onConfirm={() => {
          if (deletingId) {
            deleteAchievement(deletingId);
            setDeletingId(null);
          }
        }}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
