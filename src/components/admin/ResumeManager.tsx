import React, { useState } from 'react';
import { FileText, Upload, Download, Save, Check } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export const ResumeManager: React.FC = () => {
  const { data, updateResume } = useCMS();

  const [resumeUrl, setResumeUrl] = useState<string>(data.profile.resumeUrl || '');
  const [fileName, setFileName] = useState<string>(data.profile.resumeFileName || 'Raunak_Kumar_Resume.pdf');
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setResumeUrl(reader.result);
          setIsUploaded(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateResume(resumeUrl, fileName);
    setIsUploaded(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="pb-6 border-b border-white/10">
        <div className="w-8 h-[2.5px] bg-[#FF6B00] rounded-full mb-3 shadow-[0_0_10px_rgba(255,107,0,0.5)]" />
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
          <FileText className="w-7 h-7 text-[#FF6B00]" />
          <span>Resume Management CMS</span>
        </h1>
        <p className="font-body text-xs sm:text-sm text-[#A5A5A5] mt-1">
          Upload or link a new PDF resume. The public "Resume" button automatically uses the latest uploaded resume.
        </p>
      </div>

      <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/15">
        <form onSubmit={handleSubmit} className="space-y-6 text-xs font-sans">
          {/* File Upload Box */}
          <div className="border-2 border-dashed border-white/20 hover:border-[#FF6B00] rounded-3xl p-8 text-center transition-colors relative bg-white/[0.02]">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
            />
            <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00] mx-auto mb-3">
              <Upload className="w-6 h-6" />
            </div>
            <div className="font-heading font-bold text-sm text-white mb-1">
              Click or Drag & Drop PDF Resume File
            </div>
            <div className="text-xs text-[#A5A5A5]">
              Supported formats: PDF, DOC, DOCX
            </div>

            {isUploaded && (
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>New File Prepared: {fileName}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A5A5A5] font-mono mb-1">Resume File Name Display</label>
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                placeholder="e.g. Raunak_Kumar_Resume.pdf"
              />
            </div>

            <div>
              <label className="block text-[#A5A5A5] font-mono mb-1">External Resume URL (Optional)</label>
              <input
                type="url"
                value={resumeUrl.startsWith('data:') ? '' : resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
                placeholder="https://drive.google.com/..."
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            {resumeUrl && (
              <a
                href={resumeUrl}
                download={fileName}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-[#F5F5F5] bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>Test Download Current Resume</span>
              </a>
            )}

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#FF6B00] hover:bg-[#FF852C] transition-all ml-auto"
            >
              <Save className="w-4 h-4" />
              <span>Save Resume Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
