import React, { useState } from 'react';
import { Plus, Pencil, Trash2, GraduationCap, X } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { EducationItem } from '../../types/cms';
import { ConfirmModal } from './ConfirmModal';

export const EducationManager: React.FC = () => {
  const { data, addEducation, updateEducation, deleteEducation } = useCMS();

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingEdu, setEditingEdu] = useState<EducationItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<EducationItem>>({
    degree: '',
    institution: '',
    yearStatus: '',
    score: '',
    details: '',
  });

  const openCreateModal = () => {
    setEditingEdu(null);
    setFormData({
      degree: '',
      institution: '',
      yearStatus: 'Completed',
      score: 'Score: 85%',
      details: '',
    });
    setIsFormOpen(true);
  };

  const openEditModal = (edu: EducationItem) => {
    setEditingEdu(edu);
    setFormData(edu);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.degree || !formData.institution) return;

    if (editingEdu) {
      await updateEducation({ ...editingEdu, ...formData } as EducationItem);
    } else {
      await addEducation({
        degree: formData.degree || '',
        institution: formData.institution || '',
        yearStatus: formData.yearStatus || '',
        score: formData.score || '',
        details: formData.details,
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
            <GraduationCap className="w-7 h-7 text-[#FF6B00]" />
            <span>Academic Education CMS</span>
          </h1>
          <p className="font-body text-xs sm:text-sm text-[#A5A5A5] mt-1">
            Manage academic qualifications, institutions, CGPA, and completion years.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#FF6B00] hover:bg-[#FF852C] shadow-lg shadow-[#FF6B00]/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education Record</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {data.educationTimeline.map((edu) => (
          <div
            key={edu.id}
            className="liquid-glass rounded-3xl p-6 border border-white/10 hover:border-[#FF6B00]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-heading text-lg font-bold text-white">
                  {edu.degree}
                </span>
                <span className="font-mono text-xs text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-0.5 rounded-full border border-[#FF6B00]/30 font-bold">
                  {edu.score}
                </span>
              </div>

              <div className="text-xs text-[#A5A5A5] font-mono mb-2">
                {edu.institution} · <span className="text-white">{edu.yearStatus}</span>
              </div>

              {edu.details && (
                <p className="font-body text-xs text-[#A5A5A5] leading-relaxed max-w-2xl">
                  {edu.details}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => openEditModal(edu)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-[#FF6B00] transition-colors flex items-center gap-1"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => setDeletingId(edu.id)}
                className="p-2 rounded-xl text-rose-400 hover:text-white bg-rose-950/30 hover:bg-rose-600 transition-colors"
                title="Delete Record"
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
              {editingEdu ? 'Edit Education Record' : 'Add Education Record'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-[#A5A5A5] font-mono mb-1">Degree / Course *</label>
                <input
                  type="text"
                  required
                  value={formData.degree || ''}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                  placeholder="e.g. Diploma in Computer Science Engineering (CSE)"
                />
              </div>

              <div>
                <label className="block text-[#A5A5A5] font-mono mb-1">Institution *</label>
                <input
                  type="text"
                  required
                  value={formData.institution || ''}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                  placeholder="e.g. Netaji Subhas Institute of Polytechnic, Bihta"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A5A5A5] font-mono mb-1">Year / Semester Status</label>
                  <input
                    type="text"
                    value={formData.yearStatus || ''}
                    onChange={(e) => setFormData({ ...formData, yearStatus: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                    placeholder="e.g. 5th Semester / 3rd Year"
                  />
                </div>

                <div>
                  <label className="block text-[#A5A5A5] font-mono mb-1">Score / CGPA</label>
                  <input
                    type="text"
                    value={formData.score || ''}
                    onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                    placeholder="e.g. CGPA: 8.5 / 10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#A5A5A5] font-mono mb-1">Details / Core Subjects</label>
                <textarea
                  rows={3}
                  value={formData.details || ''}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                  placeholder="Summary of core subjects and academic focus..."
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
                  {editingEdu ? 'Save Changes' : 'Add Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!deletingId}
        title="Delete Education Record?"
        message="This academic record will be deleted."
        onConfirm={() => {
          if (deletingId) {
            deleteEducation(deletingId);
            setDeletingId(null);
          }
        }}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
