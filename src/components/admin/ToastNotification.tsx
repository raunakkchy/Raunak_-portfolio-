import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  toast: { type: 'success' | 'error'; text: string } | null;
  onClose: () => void;
}

export const ToastNotification: React.FC<ToastProps> = ({ toast, onClose }) => {
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl liquid-glass border shadow-2xl backdrop-blur-md ${
          toast.type === 'success'
            ? 'border-emerald-500/40 text-emerald-300 bg-emerald-950/40'
            : 'border-rose-500/40 text-rose-300 bg-rose-950/40'
        }`}
      >
        {toast.type === 'success' ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        ) : (
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
        )}
        <span className="font-heading text-xs font-semibold">{toast.text}</span>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
