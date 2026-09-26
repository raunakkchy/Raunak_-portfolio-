import React from 'react';

// Project 1 Preview: Placement OS (AI Career Platform)
export const PlacementOSPreview: React.FC = () => {
  return (
    <div className="w-full h-48 rounded-xl bg-[#091522]/90 border border-white/[0.08] p-3.5 flex flex-col justify-between overflow-hidden relative font-mono text-[10px] select-none group-hover:scale-[1.02] transition-transform duration-300">
      {/* Subtle background glow */}
      <div className="absolute -top-6 -right-6 w-28 h-28 bg-[#FF6338]/10 blur-xl pointer-events-none" />

      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#FF6338]" />
          <span className="text-[#F5F7FA] font-sans font-medium text-[11px]">Role: Full Stack Engineer</span>
        </div>
        <span className="text-[#9AA8B5] text-[9px] bg-white/[0.05] px-1.5 py-0.5 rounded font-mono">
          Gemini AI Verified
        </span>
      </div>

      {/* Center Analytics: Skill Gap & Mock Interview */}
      <div className="grid grid-cols-3 gap-2 my-1">
        <div className="bg-white/[0.03] p-2 rounded-lg border border-white/[0.05]">
          <div className="text-[#687785] text-[8px] uppercase">Skill Gap</div>
          <div className="text-[#F5F7FA] font-bold text-xs mt-0.5">Analyzed</div>
          <div className="w-full bg-white/10 h-1 rounded-full mt-1 overflow-hidden">
            <div className="bg-[#FF6338] h-full w-[88%]" />
          </div>
        </div>

        <div className="bg-white/[0.03] p-2 rounded-lg border border-white/[0.05]">
          <div className="text-[#687785] text-[8px] uppercase">Roadmap</div>
          <div className="text-[#F5F7FA] font-bold text-xs mt-0.5">Adaptive</div>
          <div className="w-full bg-white/10 h-1 rounded-full mt-1 overflow-hidden">
            <div className="bg-[#FF8A62] h-full w-[72%]" />
          </div>
        </div>

        <div className="bg-white/[0.03] p-2 rounded-lg border border-white/[0.05]">
          <div className="text-[#687785] text-[8px] uppercase">Mock Interview</div>
          <div className="text-[#F5F7FA] font-bold text-xs mt-0.5">Score: 9.1</div>
          <div className="w-full bg-white/10 h-1 rounded-full mt-1 overflow-hidden">
            <div className="bg-emerald-400 h-full w-[91%]" />
          </div>
        </div>
      </div>

      {/* Bottom Timeline Step */}
      <div className="flex items-center justify-between text-[9px] bg-[#071018]/80 px-2.5 py-1.5 rounded-md border border-white/[0.04]">
        <span className="text-[#9AA8B5] truncate">Next Milestone: System Design & APIs</span>
        <span className="text-[#FF6338] font-bold">Stage 3 →</span>
      </div>
    </div>
  );
};

// Project 2 Preview: Simple Hisaab (Finance Utility - Lending & Interest Tracker)
export const SimpleHisaabPreview: React.FC = () => {
  return (
    <div className="w-full h-48 rounded-xl bg-[#091522]/90 border border-white/[0.08] p-3.5 flex flex-col justify-between overflow-hidden relative font-mono text-[10px] select-none group-hover:scale-[1.02] transition-transform duration-300">
      <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-[#FF6338]/10 blur-xl pointer-events-none" />

      {/* Header Ledger */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
        <span className="text-[#687785] text-[9px] uppercase tracking-wider">Total Active Lending</span>
        <span className="text-emerald-400 font-bold text-xs">₹ 42,500</span>
      </div>

      {/* Lending Records Rows */}
      <div className="space-y-1.5 my-1 font-sans">
        <div className="flex items-center justify-between bg-white/[0.03] px-2 py-1.5 rounded border border-white/[0.04]">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-[#F5F7FA] text-[11px]">Rahul Sharma</span>
          </div>
          <div className="text-right">
            <div className="text-[#F5F7FA] font-mono text-[10px]">₹ 15,000 + 2%</div>
            <div className="text-amber-400 text-[8px] font-mono">Status: Pending</div>
          </div>
        </div>

        <div className="flex items-center justify-between bg-white/[0.03] px-2 py-1.5 rounded border border-white/[0.04]">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[#F5F7FA] text-[11px]">Amit Verma</span>
          </div>
          <div className="text-right">
            <div className="text-[#F5F7FA] font-mono text-[10px]">₹ 27,500 settled</div>
            <div className="text-emerald-400 text-[8px] font-mono">Status: Paid</div>
          </div>
        </div>
      </div>

      {/* Export / Audit Pill */}
      <div className="flex items-center justify-between text-[9px] bg-[#071018]/80 px-2.5 py-1.5 rounded-md border border-white/[0.04]">
        <span className="text-[#9AA8B5]">Due-Date Tracking Active</span>
        <span className="text-[#FF6338] font-mono">CSV & PDF Exports</span>
      </div>
    </div>
  );
};

// Project 3 Preview: NSIT AI Chatbot (AI Assistant for College Students)
export const NSITChatbotPreview: React.FC = () => {
  return (
    <div className="w-full h-48 rounded-xl bg-[#091522]/90 border border-white/[0.08] p-3 flex flex-col justify-between overflow-hidden relative font-mono text-[10px] select-none group-hover:scale-[1.02] transition-transform duration-300">
      <div className="absolute top-2 right-2 w-24 h-24 bg-[#FF6338]/10 blur-xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-1.5">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#FF6338] animate-pulse" />
          <span className="text-[#F5F7FA] font-sans font-medium text-[11px]">NSIT Student Assistant</span>
        </div>
        <span className="text-[#FF6338] text-[9px] bg-[#FF6338]/10 px-1.5 py-0.5 rounded border border-[#FF6338]/20">
          Gemini API
        </span>
      </div>

      {/* Conversational Stream */}
      <div className="space-y-1.5 text-[9.5px] leading-relaxed my-1 font-sans">
        {/* Student question */}
        <div className="flex justify-end">
          <div className="bg-[#FF6338]/20 text-[#F5F7FA] px-2.5 py-1 rounded-lg rounded-tr-none border border-[#FF6338]/30 max-w-[85%]">
            When do our 5th sem diploma exams start?
          </div>
        </div>

        {/* Chatbot response */}
        <div className="flex justify-start">
          <div className="bg-white/[0.05] text-[#9AA8B5] px-2.5 py-1 rounded-lg rounded-tl-none border border-white/10 max-w-[90%] leading-snug">
            <span className="text-white font-medium">NSIT Assistant:</span> The theory exams commence next month. Practical labs precede by 10 days.
          </div>
        </div>
      </div>

      {/* Input preview */}
      <div className="flex items-center justify-between text-[9px] bg-[#071018]/80 px-2 py-1.5 rounded-md border border-white/[0.04]">
        <span className="text-[#687785] truncate">Ask about courses, syllabus, dates...</span>
        <span className="text-[#FF6338] font-bold">Ask →</span>
      </div>
    </div>
  );
};
