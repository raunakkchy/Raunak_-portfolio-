import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Award, ExternalLink, X } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { CertificationItem } from '../../types/cms';
import { ConfirmModal } from './ConfirmModal';

interface CertificationsManagerProps {
  quickAddOpen?: boolean;
}

export const CertificationsManager: React.FC<CertificationsManagerProps> = ({ quickAddOpen = false }) => {
  const { data, addCertification, updateCertification, deleteCertification } = useCMS();

  const [isFormOpen, setIsFormOpen] = useState<boolean>(quickAddOpen);
  const [editingCert, setEditingCert] = useState<CertificationItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<CertificationItem>>({
    title: '',
    issuer: '',
    dateVerified: '',
    scoreCredits: '',
    status: 'Verified Certificate',
    credentialUrl: '',
    published: true,
  });

  const openCreateModal = () => {
    setEditingCert(null);
    setFormData({
      title: '',
      issuer: 'Spoken Tutorial / IIT Bombay',
      dateVerified: '2026',
      scoreCredits: '',
      status: 'Verified Certificate',
      credentialUrl: '',
      published: true,
    });
    setIsFormOpen(true);
  };

  const openEditModal = (cert: CertificationItem) => {
    setEditingCert(cert);
    setFormData(cert);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.issuer) return;

    if (editingCert) {
      await updateCertification({ ...editingCert, ...formData } as CertificationItem);
    } else {
      await addCertification({
        title: formData.title || '',
        issuer: formData.issuer || '',
        dateVerified: formData.dateVerified,
        scoreCredits: formData.scoreCredits,
        status: formData.status || 'Verified Certificate',
        credentialUrl: formData.credentialUrl,
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
            <Award className="w-7 h-7 text-[#FF6B00]" />
            <span>Certifications Gallery CMS</span>
          </h1>
          <p className="font-body text-xs sm:text-sm text-[#A5A5A5] mt-1">
            Manage verified certifications, IIT Bombay Spoken Tutorials, Cisco, and training credentials.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#FF6B00] hover:bg-[#FF852C] shadow-lg shadow-[#FF6B00]/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certification</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.certifications.map((c) => (
          <div
            key={c.id}
            className="liquid-glass rounded-3xl p-6 border border-white/10 hover:border-[#FF6B00]/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-[10px] font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-0.5 rounded-full border border-[#FF6B00]/30">
                  {c.status}
                </span>
                {c.credentialUrl && (
                  <a
                    href={c.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#A5A5A5] hover:text-[#FF6B00]"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <h2 className="font-heading text-base font-bold text-white mb-1">
                {c.title}
              </h2>
              <div className="text-xs text-[#A5A5A5] mb-3">
                {c.issuer}
              </div>

              {c.dateVerified && (
                <div className="text-[11px] font-mono text-[#FF852C] mb-1">
                  Date: {c.dateVerified}
                </div>
              )}
              {c.scoreCredits && (
                <div className="text-[11px] font-mono text-white/80">
                  {c.scoreCredits}
                </div>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => openEditModal(c)}
                className="px-3 py-1 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-[#FF6B00] transition-colors flex items-center gap-1"
              >
                <Pencil className="w-3 h-3" />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => setDeletingId(c.id)}
                className="p-1.5 rounded-xl text-rose-400 hover:text-white bg-rose-950/30 hover:bg-rose-600 transition-colors"
                title="Delete Certification"
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
              {editingCert ? 'Edit Certification' : 'Add Certification'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-[#A5A5A5] font-mono mb-1">Certification Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                  placeholder="e.g. Python 3.4.3 Training"
                />
              </div>

              <div>
                <label className="block text-[#A5A5A5] font-mono mb-1">Issuing Organization *</label>
                <input
                  type="text"
                  required
                  value={formData.issuer || ''}
                  onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                  placeholder="e.g. Spoken Tutorial / IIT Bombay"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A5A5A5] font-mono mb-1">Issue / Verified Date</label>
                  <input
                    type="text"
                    value={formData.dateVerified || ''}
                    onChange={(e) => setFormData({ ...formData, dateVerified: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                    placeholder="e.g. 24 February 2026"
                  />
                </div>

                <div>
                  <label className="block text-[#A5A5A5] font-mono mb-1">Status Badge</label>
                  <input
                    type="text"
                    value={formData.status || ''}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                    placeholder="e.g. Verified Certificate"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#A5A5A5] font-mono mb-1">Score / Credits</label>
                <input
                  type="text"
                  value={formData.scoreCredits || ''}
                  onChange={(e) => setFormData({ ...formData, scoreCredits: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                  placeholder="e.g. Score: 75.00% · Credits: 4"
                />
              </div>

              <div>
                <label className="block text-[#A5A5A5] font-mono mb-1">Credential URL</label>
                <input
                  type="url"
                  value={formData.credentialUrl || ''}
                  onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                  placeholder="https://verify.example.com"
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
                  {editingCert ? 'Save Changes' : 'Add Certification'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!deletingId}
        title="Delete Certification?"
        message="This certification will be removed from your portfolio."
        onConfirm={() => {
          if (deletingId) {
            deleteCertification(deletingId);
            setDeletingId(null);
          }
        }}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
