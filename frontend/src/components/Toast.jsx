import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

const ICONS = {
  success: <CheckCircle size={20} />,
  error: <XCircle size={20} />,
  info: <Info size={20} />,
};

const Toast = ({ toasts, removeToast }) => {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} removeToast={removeToast} />
      ))}
    </div>
  );
};

const ToastItem = ({ toast, removeToast }) => {
  useEffect(() => {
    const timer = setTimeout(() => removeToast(toast.id), 3000);
    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);

  return (
    <div className={`toast toast-${toast.type}`}>
      <span className="toast-icon">{ICONS[toast.type] || ICONS.info}</span>
      <span className="toast-message">{toast.message}</span>
      <button className="toast-close" onClick={() => removeToast(toast.id)}>
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
