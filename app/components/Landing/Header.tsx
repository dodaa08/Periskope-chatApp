"use client";

import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full py-5 bg-white border-b border-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo/Brand */}
        <Link href="/" className="text-xl text-black font-light tracking-tight">
          <span className="font-medium">Periskope</span>    
        </Link>
        
        {/* Navigation */}
        <nav className="hidden sm:block">
          <ul className="flex items-center space-x-10">
           
            <li>
              <a href="/" className="text-l text-gray-600 hover:text-gray-900 font-light transition-colors">
                Chat
              </a>
            </li>
            <li>
              <a href="#features" className="text-l text-gray-600 hover:text-gray-900 font-light transition-colors">
                Features
              </a>
            </li>
            
            <li>
              <a href="" className="text-l text-gray-600 hover:text-gray-900 font-light transition-colors">
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
          
          <Link 
            href="/SignIn" 
            className="px-4 py-2 text-sm rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
          >
            Sign In
          </Link>

          <Link 
            href="/Signup" 
            className="px-4 py-2 text-sm rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
          >
            Sign Up
          </Link>
          
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