"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Chats() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // If not loading and not authenticated, redirect to sign in page
    if (status === 'unauthenticated') {
      setShowToast(true);
      const timer = setTimeout(() => {
        router.push('/signin');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [status, router]);

  // If still loading, show loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast notification when not authenticated */}
      {showToast && (
        <div className="fixed top-5 right-5 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg z-50">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm">You need to be signed in to access this page. Redirecting to sign in...</p>
            </div>
          </div>
        </div>
      )}
      
      {status === 'authenticated' && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h1 className="text-2xl font-semibold text-gray-900">Chat Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">Welcome, {session.user?.email || 'User'}</p>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Your Chats</h2>
                <p className="text-gray-500 text-center py-10">
                  Chat functionality is coming soon! This is just a placeholder for now.
                </p>
              </div>
              
              <div className="mt-8">
                <Link 
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 