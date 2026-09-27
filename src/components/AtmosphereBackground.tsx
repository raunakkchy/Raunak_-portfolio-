import React from 'react';

export const AtmosphereBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden contain-strict"
    >
      {/* Base Deep Almost-Black Canvas (#050607) */}
      <div className="absolute inset-0 bg-[#050607]" />

      {/* Priority 4: Subtle organic ambient glow */}
      <div
        className="ambient-reflection absolute inset-0 opacity-80"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% -10%, #0D1013 0%, #080A0C 50%, #050607 100%)',
        }}
      />

      {/* Priority 4: Background Orb Glow - Top Right */}
      <div
        className="background-orb absolute -top-[10%] right-[10%] h-[500px] w-[500px] rounded-full blur-[140px] translate-z-0"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 107, 0, 0.35) 0%, rgba(255, 107, 0, 0) 70%)',
        }}
      />

      {/* Priority 4: Ambient Glow - Mid Left */}
      <div
        className="ambient-glow absolute top-[40%] -left-[10%] h-[550px] w-[550px] rounded-full blur-[160px] translate-z-0"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 107, 0, 0.2) 0%, rgba(13, 16, 19, 0) 70%)',
        }}
      />

      {/* Micro-grain texture */}
      <div className="absolute inset-0 bg-noise opacity-20" />
    </div>
  );
};
