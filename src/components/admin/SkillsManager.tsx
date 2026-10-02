import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Cpu, X } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { SkillItem } from '../../types/cms';
import { ConfirmModal } from './ConfirmModal';

interface SkillsManagerProps {
  quickAddOpen?: boolean;
}

export const SkillsManager: React.FC<SkillsManagerProps> = ({ quickAddOpen = false }) => {
  const { data, addSkill, updateSkill, deleteSkill } = useCMS();

  const [isFormOpen, setIsFormOpen] = useState<boolean>(quickAddOpen);
  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'Programming Languages',
    'Web Technologies',
    'Backend Development',
    'Databases',
    'Tools & AI',
  ];

  const [formData, setFormData] = useState<Partial<SkillItem>>({
    name: '',
    category: 'Programming Languages',
    tag: 'Used in Projects',
  });

  const openCreateModal = () => {
    setEditingSkill(null);
    setFormData({
      name: '',
      category: selectedCategory !== 'All' ? selectedCategory : 'Programming Languages',
      tag: 'Used in Projects',
    });
    setIsFormOpen(true);
  };

  const openEditModal = (s: SkillItem) => {
    setEditingSkill(s);
    setFormData(s);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category) return;

    if (editingSkill) {
      await updateSkill({ ...editingSkill, ...formData } as SkillItem);
    } else {
      await addSkill({
        name: formData.name,
        category: formData.category,
        tag: formData.tag,
      });
    }
    setIsFormOpen(false);
  };

  const filteredSkills = selectedCategory === 'All'
    ? data.skills
    : data.skills.filter((s) => s.category === selectedCategory);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="w-8 h-[2.5px] bg-[#FF6B00] rounded-full mb-3 shadow-[0_0_10px_rgba(255,107,0,0.5)]" />
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-7 h-7 text-[#FF6B00]" />
            <span>Skills & Capabilities CMS</span>
          </h1>
          <p className="font-body text-xs sm:text-sm text-[#A5A5A5] mt-1">
            Manage technical capabilities, categories, and project usage tags.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#FF6B00] hover:bg-[#FF852C] shadow-lg shadow-[#FF6B00]/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Skill</span>
        </button>
      </div>

      {/* Category Tabs Filter */}
      <div className="flex flex-wrap gap-2 pb-2">
        <button
          type="button"
          onClick={() => setSelectedCategory('All')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-colors ${
            selectedCategory === 'All'
              ? 'bg-[#FF6B00] text-white font-bold'
              : 'bg-white/5 text-[#A5A5A5] hover:text-white'
          }`}
        >
          All ({data.skills.length})
        </button>
        {categories.map((cat) => {
          const count = data.skills.filter((s) => s.category === cat).length;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#FF6B00] text-white font-bold'
                  : 'bg-white/5 text-[#A5A5A5] hover:text-white'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Skills List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredSkills.map((s) => (
          <div
            key={s.id}
            className="liquid-glass p-4 rounded-2xl border border-white/10 hover:border-[#FF6B00]/30 transition-all flex items-center justify-between"
          >
            <div>
              <div className="font-heading text-sm font-bold text-white">
                {s.name}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-mono text-[#A5A5A5]">
                  {s.category}
                </span>
                {s.tag && (
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#FF6B00]/10 text-[#FF852C] border border-[#FF6B00]/20">
                    {s.tag}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => openEditModal(s)}
                className="p-1.5 rounded-lg text-[#A5A5A5] hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                title="Edit Skill"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setDeletingId(s.id)}
                className="p-1.5 rounded-lg text-rose-400 hover:text-white bg-rose-950/30 hover:bg-rose-600 transition-colors"
                title="Delete Skill"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
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
              {editingSkill ? 'Edit Skill' : 'Add New Skill'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-[#A5A5A5] font-mono mb-1">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                  placeholder="e.g. Python, React, PostgreSQL"
                />
              </div>

              <div>
                <label className="block text-[#A5A5A5] font-mono mb-1">Category *</label>
                <select
                  value={formData.category || 'Programming Languages'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#0D1013] border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#A5A5A5] font-mono mb-1">Badge Tag</label>
                <input
                  type="text"
                  value={formData.tag || ''}
                  onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                  placeholder="e.g. Used in Projects, Core Skill"
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
                  {editingSkill ? 'Save Changes' : 'Add Skill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!deletingId}
        title="Delete Skill?"
        message="This skill will be removed from your portfolio."
        onConfirm={() => {
          if (deletingId) {
            deleteSkill(deletingId);
            setDeletingId(null);
          }
        }}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
