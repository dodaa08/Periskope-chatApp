"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface RedirectProps {
  to: string;
  delay?: number;
  message?: string;
  type?: 'success' | 'error' | 'info';
}

export default function Redirect({ to, delay = 2000, message, type = 'info' }: RedirectProps) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(Math.ceil(delay / 1000));
  const [showToast, setShowToast] = useState(!!message);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(to);
    }, delay);

    return () => clearTimeout(timer);
  }, [router, to, delay]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const countdownTimer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, [timeLeft]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black mx-auto mb-6"></div>
        <h2 className="text-xl font-semibold mb-2">Redirecting you{to ? ` to ${to}` : ''}...</h2>
        <p className="text-gray-600 mb-4">Please wait, you will be redirected in {timeLeft} seconds.</p>
        
        {showToast && (
          <div className={`mt-4 p-4 rounded-md ${
            type === 'success' ? 'bg-green-100 text-green-700' : 
            type === 'error' ? 'bg-red-100 text-red-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            <div className="flex">
              <div className="flex-shrink-0">
                {type === 'success' && (
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
                {type === 'error' && (
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
                {type === 'info' && (
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <p className="ml-3">{message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 