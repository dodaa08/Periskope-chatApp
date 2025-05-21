"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import Toast from './Toast';

type ToastType = 'success' | 'error' | 'info';
type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

interface ToastOptions {
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
}

interface ToastContextValue {
  showToast: (message: string, options?: ToastOptions) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'info' as ToastType,
    duration: 4000,
    position: 'top-right' as ToastPosition,
  });

  const showToast = (message: string, options?: ToastOptions) => {
    setToast({
      show: true,
      message,
      type: options?.type || 'info',
      duration: options?.duration || 4000,
      position: options?.position || 'top-right',
    });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <Toast
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
        position={toast.position}
        show={toast.show}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
}

export default ToastContext; 