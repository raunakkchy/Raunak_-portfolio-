import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { CertificationItem } from '../types/cms';
import { Award, X, ExternalLink, ShieldCheck } from 'lucide-react';
import { useScrollLock } from '../hooks/useScrollLock';

export const Certifications: React.FC = () => {
  const { data } = useCMS();
  const certifications = data.certifications.filter((c) => c.published !== false);
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);

  useScrollLock(!!selectedCert);

  return (
    <section
      id="certifications"
      aria-label="Certifications Gallery"
      className="reveal reveal-up relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="w-8 h-[2.5px] bg-[#FF6B00] rounded-full mb-3 shadow-[0_0_10px_rgba(255,107,0,0.5)]" />
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F5]">
            Verified Certifications
          </h2>
          <p className="font-body text-[#A5A5A5] text-sm sm:text-base mt-1">
            Technical training and certification programs from recognized academic and technical institutions.
          </p>
        </div>

        {/* Certification Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="stagger-child liquid-glass droplet-shape-card-1 p-6 flex flex-col justify-between cursor-pointer border border-white/10 hover:border-[#FF6B00]/40 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Glass Reflection */}
              <div
                aria-hidden="true"
                className="project-reflection absolute top-2 left-6 w-20 h-6 rounded-full bg-white/10 blur-md pointer-events-none"
              />

              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-9 h-9 rounded-2xl bg-[#FF6B00]/15 flex items-center justify-center text-[#FF6B00] border border-[#FF6B00]/30 group-hover:scale-110 transition-transform">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[10px] font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-0.5 rounded-full border border-[#FF6B00]/30">
                    {cert.status}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-bold text-[#F5F5F5] group-hover:text-white mb-1">
                  {cert.title}
                </h3>

                <p className="font-body text-xs text-[#A5A5A5] mb-4">
                  {cert.issuer}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#6F7378]">
                <span>{cert.dateVerified || 'Verified Completion'}</span>
                <span className="text-[#FF6B00] font-semibold group-hover:underline inline-flex items-center gap-1">
                  <span>View Details</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certification Lightbox / Detail Dialog */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="fixed inset-0 bg-[#050607]/90 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedCert(null)}
          />

          <div
            className="relative w-full max-w-md liquid-glass rounded-3xl p-6 sm:p-8 z-10 border border-white/20 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            style={{
              boxShadow:
                'inset 1.5px 1.5px 2px rgba(255, 255, 255, 0.25), inset -1.5px -1.5px 4px rgba(255, 107, 0, 0.2), 0 30px 90px rgba(0, 0, 0, 0.95)',
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedCert(null)}
              aria-label="Close dialog"
              className="absolute top-5 right-5 p-2 rounded-full text-[#A5A5A5] hover:text-white bg-white/[0.06] border border-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-[#FF6B00] font-bold mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>{selectedCert.status}</span>
            </div>

            <h3 id="cert-dialog-title" className="font-heading text-xl sm:text-2xl font-bold text-white mb-2">
              {selectedCert.title}
            </h3>

            <p className="font-body text-sm text-[#A5A5A5] mb-4">
              Issued by: <strong className="text-white">{selectedCert.issuer}</strong>
            </p>

            {selectedCert.dateVerified && (
              <div className="bg-white/[0.03] p-3 rounded-xl border border-white/10 text-xs font-mono text-[#F5F5F5] mb-3">
                <span className="text-[#FF852C] font-semibold">Verified Date: </span>
                {selectedCert.dateVerified}
              </div>
            )}

            {selectedCert.scoreCredits && (
              <div className="bg-[#FF6B00]/10 p-3 rounded-xl border border-[#FF6B00]/30 text-xs font-mono text-[#F5F5F5] mb-6">
                <span className="text-[#FF6B00] font-bold">Details: </span>
                {selectedCert.scoreCredits}
              </div>
            )}

            {selectedCert.credentialUrl && (
              <a
                href={selectedCert.credentialUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#FF6B00] hover:underline mb-4"
              >
                <span>Verify Credential Online</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="px-5 py-2 rounded-full text-xs font-medium text-[#F5F5F5] bg-white/[0.06] hover:bg-white/10 border border-white/15 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
