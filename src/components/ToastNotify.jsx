import React, { useState, useCallback, createContext, useContext } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className="fixed top-20 right-4 z-[100] bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-3 py-1.5 rounded-lg shadow-lg text-xs font-medium animate-in fade-in slide-in-from-top-2">
          {toast}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export const useToastNotify = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToastNotify must be used within ToastProvider');
  return ctx.showToast;
};
