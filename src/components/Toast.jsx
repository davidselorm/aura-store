import React from 'react';
import { Sparkles, X } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-item">
          <Sparkles size={17} color="#38bdf8" />
          <span style={{ fontWeight: 500 }}>{toast.message}</span>
          <button
            onClick={() => onDismiss(toast.id)}
            style={{ color: '#64748b', marginLeft: 'auto', padding: '2px' }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
