"use client";

import { BiSearchAlt, BiFilterAlt } from "react-icons/bi";
import { MdOutlineCheck } from "react-icons/md";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function PeopleList() {
    const [filter, setFilter] = useState(false);
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [processingChat, setProcessingChat] = useState(false);
    
    const router = useRouter();
    const { data: session } = useSession();
    const currentUserId = (session?.user as any)?.id;
    
    const supabase = createClientComponentClient({
        cookieOptions: {
            name: "sb-periskope-auth",
            domain: "",
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        }
    });
    
    // Fetch users from profiles table
    useEffect(() => {
        async function fetchUsers() {
            if (!currentUserId) return;
            
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .neq('id', currentUserId) // Don't show current user
                    .order('created_at', { ascending: false });
                
                if (error) {
                    console.error('Error fetching profiles:', error);
                    return;
                }
                
                if (data) {
                    setUsers(data);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        }
        
        fetchUsers();
    }, [supabase, currentUserId]);
    
    // Filter users based on search term
    const filteredUsers = users.filter(user => 
        user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const startChatWith = async (otherUserId: string) => {
        if (!currentUserId || processingChat) return;
        
        try {
            setProcessingChat(true);
            
            // Step 1: Try to find an existing conversation with BOTH users
            const { data: conversations } = await supabase
                .rpc('find_common_conversation', { user_a: currentUserId, user_b: otherUserId });
            
            let conversationId;
            
            if (conversations && conversations.length > 0) {
                // Found one
                conversationId = conversations[0].id;
            } else {
                // Step 2: Create a new conversation
                const { data: newConversation, error: convError } = await supabase
                    .from('conversations')
                    .insert({})
                    .select()
                    .single();
                
                if (convError) {
                    console.error('Error creating conversation:', convError);
                    return;
                }
                
                conversationId = newConversation.id;
                
                // Step 3: Add both users to participants
                const { error: partError } = await supabase
                    .from('conversation_participants')
                    .insert([
                        { conversation_id: conversationId, user_id: currentUserId },
                        { conversation_id: conversationId, user_id: otherUserId }
                    ]);
                
                if (partError) {
                    console.error('Error adding participants:', partError);
                    return;
                }
            }
            
            // Navigate to chat
            router.push(`/chats/${conversationId}`);
            
        } catch (error) {
            console.error('Error starting chat:', error);
        } finally {
            setProcessingChat(false);
        }
    };
    
    const handleUserClick = (userId: string) => {
        setSelectedUser(userId);
        startChatWith(userId);
    };
    
    // Function to get formatted time (will be replaced with actual last message time)
    const getFormattedTime = () => {
        const now = new Date();
        return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    };

    return (
        <div className="h-screen flex flex-col bg-white">
            {/* Filter and search bar */}
            <div className="p-2 border-b border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                    <button 
                        className={`flex items-center gap-1 text-xs py-1 px-2 rounded-full ${filter ? 'bg-green-100 text-green-700' : 'border border-gray-300 text-gray-600'}`}
                        onClick={() => setFilter(!filter)}
                    >
                        <BiFilterAlt className={filter ? 'text-green-600' : 'text-gray-600'} />
                        <span>Custom filter</span>
                    </button>
                    
                    <button className="text-xs py-1 px-3 rounded-full border border-gray-300 text-gray-600">
                        Save
                    </button>
                </div>
                
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Search users" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-8 pr-4 py-1.5 bg-gray-100 border border-gray-200 rounded-md text-sm focus:outline-none"
                    />
                    <BiSearchAlt className="absolute left-2.5 top-2 text-gray-400 text-lg" />
                    {filter && <span className="absolute right-2.5 top-1.5 bg-green-100 text-green-700 text-xs py-0.5 px-2 rounded-full">Filtered</span>}
                </div>
            </div>
            
            {/* User list */}
            <div className="flex-grow overflow-y-auto">
                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        No users found
                    </div>
                ) : (
                    filteredUsers.map(user => (
                        <div 
                            key={user.id} 
                            className={`flex items-center gap-3 p-2 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${selectedUser === user.id ? 'bg-gray-50' : ''} ${processingChat && selectedUser === user.id ? 'opacity-70' : ''}`}
                            onClick={() => handleUserClick(user.id)}
                        >
                            {/* Avatar */}
                            <div className="relative flex-shrink-0">
                                {user.avatar_url ? (
                                    <div className="w-10 h-10 rounded-full overflow-hidden">
                                        <Image 
                                            src={user.avatar_url} 
                                            alt={user.full_name || 'User'}
                                            width={40}
                                            height={40}
                                            className="object-cover"
                                            onError={(e) => {
                                                // Fallback if image fails to load
                                                const target = e.target as HTMLImageElement;
                                                target.src = '/default-avatar.png';
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-medium">
                                        {user.full_name ? user.full_name.charAt(0).toUpperCase() : '?'}
                                    </div>
                                )}
                                
                                {/* Online indicator (placeholder) */}
                                {Math.random() > 0.7 && (
                                    <div className="absolute -right-0.5 -bottom-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                )}
                            </div>
                            
                            {/* User details */}
                            <div className="flex-grow min-w-0">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-medium text-gray-800 truncate text-sm">
                                        {user.full_name || 'Unnamed User'}
                                    </h3>
                                    <span className="text-xs text-gray-500 whitespace-nowrap">
                                        {getFormattedTime()}
                                    </span>
                                </div>
                                
                                <div className="flex items-center text-xs text-gray-500 mt-0.5">
                                    <p className="truncate">
                                        {user.username || user.email || 'No contact info'}
                                    </p>
                                </div>
                                
                                {/* Tags - could be implemented with user roles or groups */}
                                <div className="flex items-center mt-1 gap-1">
                                    <span className="text-xs px-1.5 py-0.5 rounded bg-blue-50 text-blue-600">
                                        User
                                    </span>
                                </div>
                            </div>
                            
                            {processingChat && selectedUser === user.id && (
                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-black ml-1"></div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}