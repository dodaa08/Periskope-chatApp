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
              <a href="#pricing" className="text-l text-gray-600 hover:text-gray-900 font-light transition-colors">
                Pricing
              </a>
            </li>
          </ul>
        </nav>
        
        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <Link 
            href="/" 
            className="px-4 py-2 text-sm rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
          >
            Sign In
          </Link>

          <Link 
            href="/" 
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