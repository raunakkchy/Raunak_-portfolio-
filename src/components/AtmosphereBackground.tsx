import React from 'react';

export const AtmosphereBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Base deep background */}
      <div className="absolute inset-0 bg-[#071018]" />

      {/* Atmospheric Radial Glow - Soft Orange Top Right */}
      <div
        className="absolute -top-[12%] right-[5%] h-[550px] w-[550px] rounded-full blur-[140px] opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(255,99,56,0.35) 0%, rgba(255,99,56,0) 70%)',
        }}
      />

      {/* Atmospheric Radial Glow - Deep Navy / Muted Cyan Middle Left */}
      <div
        className="absolute top-[35%] -left-[10%] h-[600px] w-[600px] rounded-full blur-[160px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(16,42,68,0.8) 0%, rgba(7,16,24,0) 75%)',
        }}
      />

      {/* Atmospheric Glow - Warm Orange Accent Bottom Center */}
      <div
        className="absolute bottom-[5%] left-[30%] h-[500px] w-[500px] rounded-full blur-[150px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(255,138,98,0.3) 0%, rgba(255,99,56,0) 70%)',
        }}
      />

      {/* Subtle Noise / Grain Pattern */}
      <div className="absolute inset-0 bg-noise opacity-30" />

      {/* Vignette border fade */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#071018_90%)]" />
    </div>
  );
};
