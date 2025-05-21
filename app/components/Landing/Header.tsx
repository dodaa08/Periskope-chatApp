"use client";

import { useSession, signOut as nextAuthSignOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';


export default function Header() {
  const router = useRouter();
  const [showSignIn, setShowSignIn] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const session = useSession();

  console.log(session);
  
  const handleChatClick = () => {
    if(isAuthenticated){
      setToastMessage('Redirecting to chat...');
      setToastType('success');
      setShowToast(true);
      setTimeout(() => {
        router.push('/chats');
      }, 1000);
    } else {
      setToastMessage('Please sign in to access the chat');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => {
        router.push('/signin');
      }, 2000);
    }
  }

  const isAuthenticated = session?.data?.user;

  console.log(isAuthenticated);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleSignOut = async () => {
    setToastMessage('Signing out...');
    setShowToast(true);
    await nextAuthSignOut();
  }


  return (
    <header className="w-full py-5 bg-white border-b border-gray-50">
      {showToast && (
        <div className={`fixed top-5 right-5 p-4 rounded shadow-lg z-50 ${
          toastType === 'success' ? 'bg-green-100 border-l-4 border-green-500 text-green-700' : 
          toastType === 'error' ? 'bg-red-100 border-l-4 border-red-500 text-red-700' :
          'bg-blue-100 border-l-4 border-blue-500 text-blue-700'
        }`}>
          <div className="flex">
            <div className="flex-shrink-0">
              {toastType === 'success' && (
                <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              {toastType === 'error' && (
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              {(toastType !== 'success' && toastType !== 'error') && (
                <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm">{toastMessage}</p>
            </div>
            <button onClick={() => setShowToast(false)} className="ml-auto pl-3">
              <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo/Brand */}
        <Link href="/" className="text-xl text-black font-light tracking-tight">
          <span className="font-medium">Periskope</span>    
        </Link>
        
        {/* Navigation */}
        <nav className="hidden sm:block">
          <ul className="flex items-center space-x-10">
           
            <li>
              <div className="text-l text-gray-600 hover:text-gray-900 font-light transition-colors cursor-pointer" onClick={handleChatClick}>
                Chat
              </div>
            </li>
            <li>
              <a href="#features" className="text-l text-gray-600 hover:text-gray-900 font-light transition-colors">
                Features
              </a>
            </li>
            
            <li>
              <a href="#how-it-works" className="text-l text-gray-600 hover:text-gray-900 font-light transition-colors">
                How it works
              </a>
            </li>
          </ul>
        </nav>
        
        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/dodaa08/periskope-chatApp" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            <span>GitHub</span>
          </a>

          {
            isAuthenticated ? (
              <button 
                onClick={() => {
                  setToastMessage('Signing out...');
                  setShowToast(true);
                  setTimeout(() => nextAuthSignOut(), 1000);
                }} 
                className="px-4 py-2 text-sm rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link 
                  href="/signin" 
                  className="px-4 py-2 text-sm rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
                  
                >
                  Sign In
                </Link>

                <Link 
                  href="/signup" 
                  className="px-4 py-2 text-sm rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
                  
                >
                  Sign Up
                </Link>
              </>
            )
          }
        </div>
        
        {/* Mobile menu button - add mobile menu implementation later if needed */}
        <button className="sm:hidden p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </header>
  );
}