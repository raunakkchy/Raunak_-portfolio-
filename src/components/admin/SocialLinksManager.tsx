import React, { useState } from 'react';
import { Share2, Save } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export const SocialLinksManager: React.FC = () => {
  const { data, updateSocials } = useCMS();
  const [socials, setSocials] = useState(data.profile.socials);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSocials(socials);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="pb-6 border-b border-white/10">
        <div className="w-8 h-[2.5px] bg-[#FF6B00] rounded-full mb-3 shadow-[0_0_10px_rgba(255,107,0,0.5)]" />
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
          <Share2 className="w-7 h-7 text-[#FF6B00]" />
          <span>Social & Contact Links CMS</span>
        </h1>
        <p className="font-body text-xs sm:text-sm text-[#A5A5A5] mt-1">
          Update social media profiles, email, phone number, and location.
        </p>
      </div>

      <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/15">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A5A5A5] font-mono mb-1">GitHub Profile URL</label>
              <input
                type="url"
                value={socials.github || ''}
                onChange={(e) => setSocials({ ...socials, github: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            <div>
              <label className="block text-[#A5A5A5] font-mono mb-1">LinkedIn Profile URL</label>
              <input
                type="url"
                value={socials.linkedin || ''}
                onChange={(e) => setSocials({ ...socials, linkedin: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A5A5A5] font-mono mb-1">Email Address</label>
              <input
                type="text"
                value={socials.email || ''}
                onChange={(e) => setSocials({ ...socials, email: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            <div>
              <label className="block text-[#A5A5A5] font-mono mb-1">Phone Number</label>
              <input
                type="text"
                value={socials.phone || ''}
                onChange={(e) => setSocials({ ...socials, phone: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A5A5A5] font-mono mb-1">X (Twitter) URL</label>
              <input
                type="url"
                value={socials.x || ''}
                onChange={(e) => setSocials({ ...socials, x: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            <div>
              <label className="block text-[#A5A5A5] font-mono mb-1">Instagram URL</label>
              <input
                type="url"
                value={socials.instagram || ''}
                onChange={(e) => setSocials({ ...socials, instagram: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF6B00]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-white/10">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#FF6B00] hover:bg-[#FF852C] transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Social Links</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
