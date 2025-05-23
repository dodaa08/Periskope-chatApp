"use client";

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface ChatLayoutProps {
    children: ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
    const router = useRouter();
    const { data: session, status } = useSession();
    
    // Redirect if not authenticated
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/signin');
        }
    }, [status, router]);
    
    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex">
                            <Link href="/" className="flex-shrink-0 text-2xl font-bold text-blue-500 flex items-center">
                                <h1 className="text-xl font-bold">Periskope</h1>
                            </Link>
                        </div>
                        
                        <div className="flex items-center">
                            {session?.user && (
                                <div className="ml-3 relative">
                                    <div className="flex items-center">
                                        <span className="mr-2 text-sm text-gray-700">
                                            {(session.user as any)?.name || session.user.email}
                                        </span>
                                        <div className="h-8 w-8  flex items-center justify-center text-white">
                                            {(session.user as any)?.name ? (session.user as any).name.charAt(0).toUpperCase() : '?'}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            
            {/* Main content */}
            <main className="max-w-screen-xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
} 