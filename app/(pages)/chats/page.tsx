"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import PeopleList from '@/app/components/chats/PeopleList';

export default function ChatsPage() {
    const router = useRouter();
    const { status } = useSession();


    
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
        <div className="flex h-screen bg-gray-100">
            {status === 'authenticated' && (
                <div className="flex w-full max-w-screen-xl mx-auto bg-white shadow-md">
                    {/* People list sidebar */}
                    <div className="w-1/3 border-r border-gray-200">
                        <PeopleList />
                    </div>
                    
                    {/* Empty chat state */}
                    <div className="w-2/3 flex items-center justify-center text-gray-400 bg-[#f0f2f5]">
                        <div className="text-center">
                            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-light mb-2">Periskope Chat</h3>
                            <p className="max-w-sm mx-auto text-sm">
                                Select a contact to start chatting or click on the new chat icon.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// focus a little on sound and animation and pixel perfect design 

