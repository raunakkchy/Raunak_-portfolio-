import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Briefcase, X } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { ExperienceItem } from '../../types/cms';
import { ConfirmModal } from './ConfirmModal';

interface ExperienceManagerProps {
  quickAddOpen?: boolean;
}

export const ExperienceManager: React.FC<ExperienceManagerProps> = ({ quickAddOpen = false }) => {
  const { data, addExperience, updateExperience, deleteExperience } = useCMS();

  const [isFormOpen, setIsFormOpen] = useState<boolean>(quickAddOpen);
  const [editingExp, setEditingExp] = useState<ExperienceItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<ExperienceItem>>({
    role: '',
    organization: '',
    status: 'Completed Internship',
    description: '',
    published: true,
  });

  const openCreateModal = () => {
    setEditingExp(null);
    setFormData({
      role: 'Web Development Intern',
      organization: 'NIELIT Patna',
      status: 'Completed Internship',
      description: '',
      published: true,
    });
    setIsFormOpen(true);
  };

  const openEditModal = (exp: ExperienceItem) => {
    setEditingExp(exp);
    setFormData(exp);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.role || !formData.organization) return;

    if (editingExp) {
      await updateExperience({ ...editingExp, ...formData } as ExperienceItem);
    } else {
      await addExperience({
        role: formData.role || '',
        organization: formData.organization || '',
        status: formData.status || 'Completed Internship',
        description: formData.description || '',
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
            <Briefcase className="w-7 h-7 text-[#FF6B00]" />
            <span>Experience & Internships CMS</span>
          </h1>
          <p className="font-body text-xs sm:text-sm text-[#A5A5A5] mt-1">
            Manage practical internships and work experience records.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#FF6B00] hover:bg-[#FF852C] shadow-lg shadow-[#FF6B00]/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {data.experience.map((exp) => (
          <div
            key={exp.id}
            className="liquid-glass rounded-3xl p-6 border border-white/10 hover:border-[#FF6B00]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-heading text-lg font-bold text-white">
                  {exp.role}
                </span>
                <span className="font-mono text-[11px] text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-0.5 rounded-full border border-[#FF6B00]/30 font-bold">
                  {exp.organization}
                </span>
              </div>

              <div className="text-xs text-[#FF852C] font-mono mb-2">
                Status: {exp.status}
              </div>

              <p className="font-body text-xs text-[#A5A5A5] leading-relaxed max-w-2xl">
                {exp.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => openEditModal(exp)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-[#FF6B00] transition-colors flex items-center gap-1"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => setDeletingId(exp.id)}
                className="p-2 rounded-xl text-rose-400 hover:text-white bg-rose-950/30 hover:bg-rose-600 transition-colors"
                title="Delete Experience"
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
          <div className="relative w-full max-w-lg liquid-glass rounded-3xl p-6 border border-white/20 bg-[#0D1013]">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#A5A5A5] hover:text-white bg-white/5"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="font-heading text-xl font-bold text-white mb-4">
              {editingExp ? 'Edit Experience' : 'Add Experience Entry'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-[#A5A5A5] font-mono mb-1">Role / Position *</label>
                <input
                  type="text"
                  required
                  value={formData.role || ''}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                  placeholder="e.g. Web Development Intern"
                />
              </div>

              <div>
                <label className="block text-[#A5A5A5] font-mono mb-1">Organization *</label>
                <input
                  type="text"
                  required
                  value={formData.organization || ''}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                  placeholder="e.g. NIELIT Patna"
                />
              </div>

              <div>
                <label className="block text-[#A5A5A5] font-mono mb-1">Status Badge</label>
                <input
                  type="text"
                  value={formData.status || ''}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                  placeholder="e.g. Completed Internship"
                />
              </div>

              <div>
                <label className="block text-[#A5A5A5] font-mono mb-1">Description *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                  placeholder="Key responsibilities and achievements during the internship..."
                />
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
                  {editingExp ? 'Save Changes' : 'Add Experience'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!deletingId}
        title="Delete Experience Entry?"
        message="This entry will be permanently removed from your portfolio."
        onConfirm={() => {
          if (deletingId) {
            deleteExperience(deletingId);
            setDeletingId(null);
          }
        }}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
