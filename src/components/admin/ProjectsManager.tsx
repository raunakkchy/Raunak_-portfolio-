import React, { useState } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Github,
  X,
  Eye,
  EyeOff,
  FolderGit2,
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { ProjectItem } from '../../types/cms';
import { ConfirmModal } from './ConfirmModal';

interface ProjectsManagerProps {
  quickAddOpen?: boolean;
}

export const ProjectsManager: React.FC<ProjectsManagerProps> = ({ quickAddOpen = false }) => {
  const { data, addProject, updateProject, deleteProject, togglePublishProject } = useCMS();

  const [isFormOpen, setIsFormOpen] = useState<boolean>(quickAddOpen);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<ProjectItem>>({
    title: '',
    subtitle: '',
    category: 'Full Stack',
    description: '',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB'],
    liveDemoUrl: '',
    githubUrl: '',
    published: true,
    featured: true,
    whatItDoes: '',
    problem: '',
    approach: '',
    developmentChallenges: '',
    solution: '',
    whatILearned: '',
    mainFeatures: ['Feature 1', 'Feature 2'],
  });

  const [techInput, setTechInput] = useState<string>('');
  const [featureInput, setFeatureInput] = useState<string>('');

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      subtitle: '',
      category: 'Full Stack Web App',
      description: '',
      technologies: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
      liveDemoUrl: 'https://',
      githubUrl: 'https://github.com/raunakkchy',
      published: true,
      featured: true,
      mainFeatures: [],
    });
    setIsFormOpen(true);
  };

  const openEditModal = (proj: ProjectItem) => {
    setEditingProject(proj);
    setFormData(proj);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    if (editingProject) {
      await updateProject({
        ...editingProject,
        ...formData,
      } as ProjectItem);
    } else {
      await addProject({
        title: formData.title || 'New Project',
        subtitle: formData.subtitle || '',
        category: formData.category || 'Web Application',
        description: formData.description || '',
        technologies: formData.technologies || ['React'],
        liveDemoUrl: formData.liveDemoUrl || '#',
        githubUrl: formData.githubUrl,
        whatItDoes: formData.whatItDoes,
        problem: formData.problem,
        approach: formData.approach,
        developmentChallenges: formData.developmentChallenges,
        solution: formData.solution,
        whatILearned: formData.whatILearned,
        mainFeatures: formData.mainFeatures,
        published: formData.published ?? true,
        featured: formData.featured ?? true,
      });
    }

    setIsFormOpen(false);
  };

  const addTechTag = () => {
    if (!techInput.trim()) return;
    const currentTechs = formData.technologies || [];
    if (!currentTechs.includes(techInput.trim())) {
      setFormData({ ...formData, technologies: [...currentTechs, techInput.trim()] });
    }
    setTechInput('');
  };

  const removeTechTag = (tech: string) => {
    const currentTechs = formData.technologies || [];
    setFormData({ ...formData, technologies: currentTechs.filter((t) => t !== tech) });
  };

  const addFeature = () => {
    if (!featureInput.trim()) return;
    const currentFeats = formData.mainFeatures || [];
    setFormData({ ...formData, mainFeatures: [...currentFeats, featureInput.trim()] });
    setFeatureInput('');
  };

  const removeFeature = (feat: string) => {
    const currentFeats = formData.mainFeatures || [];
    setFormData({ ...formData, mainFeatures: currentFeats.filter((f) => f !== feat) });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="w-8 h-[2.5px] bg-[#FF6B00] rounded-full mb-3 shadow-[0_0_10px_rgba(255,107,0,0.5)]" />
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
            <FolderGit2 className="w-7 h-7 text-[#FF6B00]" />
            <span>Projects Management</span>
          </h1>
          <p className="font-body text-xs sm:text-sm text-[#A5A5A5] mt-1">
            Add, update, or unpublish portfolio projects shown on the public site.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#FF6B00] hover:bg-[#FF852C] shadow-lg shadow-[#FF6B00]/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.projects.map((p) => (
          <div
            key={p.id}
            className="liquid-glass rounded-3xl p-6 border border-white/10 hover:border-[#FF6B00]/30 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-0.5 rounded-full border border-[#FF6B00]/30">
                  #{p.number} · {p.category}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => togglePublishProject(p.id)}
                    className={`inline-flex items-center gap-1 text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold transition-colors ${
                      p.published
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}
                    title="Click to toggle publish status"
                  >
                    {p.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>{p.published ? 'Published' : 'Draft'}</span>
                  </button>
                </div>
              </div>

              <h2 className="font-heading text-xl font-bold text-white mb-1">
                {p.title}
              </h2>
              <div className="text-xs text-[#A5A5A5] font-medium mb-3">
                {p.subtitle}
              </div>

              <p className="font-body text-xs text-[#A5A5A5] leading-relaxed mb-4 line-clamp-3">
                {p.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.technologies.map((t) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#F5F5F5]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {p.liveDemoUrl && (
                  <a
                    href={p.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-full text-[#A5A5A5] hover:text-[#FF6B00] bg-white/5"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-full text-[#A5A5A5] hover:text-[#FF6B00] bg-white/5"
                    title="GitHub Repository"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEditModal(p)}
                  className="px-3 py-1 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-[#FF6B00] transition-colors flex items-center gap-1"
                >
                  <Pencil className="w-3 h-3" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeletingId(p.id)}
                  className="p-1.5 rounded-xl text-rose-400 hover:text-white bg-rose-950/30 hover:bg-rose-600 transition-colors"
                  title="Delete Project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto liquid-glass rounded-3xl p-6 sm:p-8 border border-white/20 bg-[#0D1013] my-8">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#A5A5A5] hover:text-white bg-white/5"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="font-heading text-2xl font-bold text-white mb-6">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h2>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A5A5A5] font-mono mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                    placeholder="e.g. Placement OS"
                  />
                </div>

                <div>
                  <label className="block text-[#A5A5A5] font-mono mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category || ''}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                    placeholder="e.g. AI Career Platform"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#A5A5A5] font-mono mb-1">Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle || ''}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                  placeholder="e.g. Your Operating System for Career Readiness"
                />
              </div>

              <div>
                <label className="block text-[#A5A5A5] font-mono mb-1">Short Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                  placeholder="Overview of the application..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A5A5A5] font-mono mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    value={formData.liveDemoUrl || ''}
                    onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-[#A5A5A5] font-mono mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={formData.githubUrl || ''}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                    placeholder="https://github.com/username/repo"
                  />
                </div>
              </div>

              {/* Technologies Tags input */}
              <div>
                <label className="block text-[#A5A5A5] font-mono mb-1">Technologies / Stack</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTechTag())}
                    className="flex-1 p-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none"
                    placeholder="Add technology (e.g. React, MongoDB) and press Enter"
                  />
                  <button
                    type="button"
                    onClick={addTechTag}
                    className="px-3 py-2 rounded-xl bg-[#FF6B00] text-white font-semibold text-xs"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {(formData.technologies || []).map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-[#FF6B00]/15 border border-[#FF6B00]/30 text-white"
                    >
                      <span>{t}</span>
                      <button
                        type="button"
                        onClick={() => removeTechTag(t)}
                        className="hover:text-rose-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Features input */}
              <div>
                <label className="block text-[#A5A5A5] font-mono mb-1">Main Features</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    className="flex-1 p-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none"
                    placeholder="e.g. AI Mock Interview Practice"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-3 py-2 rounded-xl bg-white/10 text-white font-semibold text-xs"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-1">
                  {(formData.mainFeatures || []).map((f) => (
                    <div
                      key={f}
                      className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                    >
                      <span>• {f}</span>
                      <button
                        type="button"
                        onClick={() => removeFeature(f)}
                        className="text-rose-400 hover:text-rose-300 font-bold px-1"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Publish toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <div className="font-bold text-white">Publish Status</div>
                  <div className="text-[11px] text-[#A5A5A5]">Only published projects appear on live portfolio.</div>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, published: !formData.published })}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                    formData.published
                      ? 'bg-emerald-500 text-white'
                      : 'bg-amber-500/30 text-amber-300'
                  }`}
                >
                  {formData.published ? 'Published' : 'Draft'}
                </button>
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
                  className="px-6 py-2 rounded-xl text-xs font-semibold text-white bg-[#FF6B00] hover:bg-[#FF852C] transition-colors"
                >
                  {editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deletingId}
        title="Delete Project?"
        message="This action cannot be undone. This project will be removed from the CMS and public portfolio."
        onConfirm={() => {
          if (deletingId) {
            deleteProject(deletingId);
            setDeletingId(null);
          }
        }}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
