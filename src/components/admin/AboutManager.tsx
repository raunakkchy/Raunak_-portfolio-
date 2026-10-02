import React, { useState } from 'react';
import { User, Save } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export const AboutManager: React.FC = () => {
  const { data, updateProfile, updateAbout } = useCMS();

  const [profileForm, setProfileForm] = useState(data.profile);
  const [aboutForm, setAboutForm] = useState(data.about);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(profileForm);
  };

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateAbout(aboutForm);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="pb-6 border-b border-white/10">
        <div className="w-8 h-[2.5px] bg-[#FF6B00] rounded-full mb-3 shadow-[0_0_10px_rgba(255,107,0,0.5)]" />
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
          <User className="w-7 h-7 text-[#FF6B00]" />
          <span>Profile & About Section CMS</span>
        </h1>
        <p className="font-body text-xs sm:text-sm text-[#A5A5A5] mt-1">
          Manage your personal details, headline, biography, location, and photo URL.
        </p>
      </div>

      {/* Profile Form */}
      <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/15">
        <h2 className="font-heading text-lg font-bold text-white mb-4">
          Personal Information & Headlines
        </h2>

        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs font-sans">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A5A5A5] font-mono mb-1">Full Name</label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            <div>
              <label className="block text-[#A5A5A5] font-mono mb-1">Eyebrow Greeting</label>
              <input
                type="text"
                value={profileForm.eyebrow}
                onChange={(e) => setProfileForm({ ...profileForm, eyebrow: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#A5A5A5] font-mono mb-1">Headline / Subtitle</label>
            <input
              type="text"
              value={profileForm.headline}
              onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
            />
          </div>

          <div>
            <label className="block text-[#A5A5A5] font-mono mb-1">Hero Supporting Text</label>
            <textarea
              rows={3}
              value={profileForm.supportingText}
              onChange={(e) => setProfileForm({ ...profileForm, supportingText: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A5A5A5] font-mono mb-1">Personal Statement</label>
              <input
                type="text"
                value={profileForm.personalStatement}
                onChange={(e) => setProfileForm({ ...profileForm, personalStatement: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            <div>
              <label className="block text-[#A5A5A5] font-mono mb-1">Tagline</label>
              <input
                type="text"
                value={profileForm.tagline}
                onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A5A5A5] font-mono mb-1">Academic Institute</label>
              <input
                type="text"
                value={profileForm.institute}
                onChange={(e) => setProfileForm({ ...profileForm, institute: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            <div>
              <label className="block text-[#A5A5A5] font-mono mb-1">CGPA / Score</label>
              <input
                type="text"
                value={profileForm.cgpa}
                onChange={(e) => setProfileForm({ ...profileForm, cgpa: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#A5A5A5] font-mono mb-1">Profile Photo Image URL</label>
            <input
              type="url"
              value={profileForm.photoUrl}
              onChange={(e) => setProfileForm({ ...profileForm, photoUrl: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#FF6B00] hover:bg-[#FF852C] transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      </div>

      {/* About Section Form */}
      <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/15">
        <h2 className="font-heading text-lg font-bold text-white mb-4">
          About Me Section Content
        </h2>

        <form onSubmit={handleSaveAbout} className="space-y-4 text-xs font-sans">
          <div>
            <label className="block text-[#A5A5A5] font-mono mb-1">Section Heading</label>
            <input
              type="text"
              value={aboutForm.heading}
              onChange={(e) => setAboutForm({ ...aboutForm, heading: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
            />
          </div>

          <div>
            <label className="block text-[#A5A5A5] font-mono mb-1">Main About Text / Bio</label>
            <textarea
              rows={4}
              value={aboutForm.text}
              onChange={(e) => setAboutForm({ ...aboutForm, text: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#FF6B00] hover:bg-[#FF852C] transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save About Content</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
