"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Chat from '@/app/components/chats/chat';

interface PageParams {
    id: string;
}

export default function ChatPage({ params }: { params: Promise<PageParams> }) {
    const router = useRouter();
    const { status } = useSession();
    const unwrappedParams = React.use(params);
    const conversationId = unwrappedParams.id;
    
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
            {status === 'authenticated' && conversationId && (
                <div className="flex-1 h-full max-w-screen-xl mx-auto bg-white shadow-md">
                    <Chat conversationId={conversationId} />
                </div>
            )}
        </div>
    );
} 