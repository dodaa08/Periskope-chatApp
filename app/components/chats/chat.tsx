"use client";

import { useState, useEffect, useRef } from "react";
import { BiSmile } from "react-icons/bi";
import { FiPaperclip } from "react-icons/fi";
import { BsThreeDotsVertical, BsMic } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineCheck } from "react-icons/ai";
import { RiRefreshLine } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useSession } from "next-auth/react";
import Image from "next/image";


interface ChatProps {
    conversationId: string;
}

export default function Chat({ conversationId }: ChatProps) {
    const [message, setMessage] = useState("");
    const [tab, setTab] = useState("whatsapp");
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [participants, setParticipants] = useState<any[]>([]);
    const [otherUser, setOtherUser] = useState<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
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
    
    // Fetch conversation details and participants
    useEffect(() => {
        async function fetchConversationDetails() {
            if (!conversationId || !currentUserId) return;
            
            try {
                setLoading(true);
                
                // Get participants
                const { data: participantsData, error: participantsError } = await supabase
                    .from('conversation_participants')
                    .select('user_id')
                    .eq('conversation_id', conversationId);
                
                if (participantsError) {
                    console.error('Error fetching participants:', participantsError);
                    return;
                }
                
                if (!participantsData?.length) {
                    console.error('No participants found for this conversation');
                    return;
                }
                
                // Get user details for all participants
                const participantIds = participantsData.map(p => p.user_id);
                const { data: usersData, error: usersError } = await supabase
                    .from('profiles')
                    .select('*')
                    .in('id', participantIds);
                
                if (usersError) {
                    console.error('Error fetching user details:', usersError);
                    return;
                }
                
                setParticipants(usersData || []);
                
                // Find the other user (for 1-on-1 chats)
                const other = usersData?.find(user => user.id !== currentUserId);
                setOtherUser(other || null);
                
            } catch (error) {
                console.error('Error fetching conversation details:', error);
            } finally {
                setLoading(false);
            }
        }
        
        fetchConversationDetails();
    }, [conversationId, currentUserId, supabase]);
    
    // Fetch messages
    useEffect(() => {
        if (!conversationId || !currentUserId) return;
        
        async function fetchMessages() {
            try {
                // First check if the conversation exists
                const { data: conversationData, error: conversationError } = await supabase
                    .from('conversations')
                    .select('id')
                    .eq('id', conversationId)
                    .single();
                
                if (conversationError) {
                    console.error('Error checking conversation:', conversationError);
                    if (conversationError.code === 'PGRST116') {
                        console.error('Table "conversations" may not exist. Have you run the SQL setup script?');
                    }
                    return;
                }
                
                // Now fetch messages
                const { data, error } = await supabase
                    .from('messages')
                    .select('*, sender:sender_id(full_name, avatar_url, username, email)')
                    .eq('conversation_id', conversationId)
                    .order('created_at');
                
                if (error) {
                    console.error('Error fetching messages:', error);
                    if (error.code === 'PGRST116') {
                        console.error('Table "messages" may not exist. Have you run the SQL setup script?');
                    }
                    return;
                }
                
                setMessages(data || []);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        }
        
        fetchMessages();
        
        // Set up real-time subscription for new messages
        let channel: ReturnType<typeof supabase.channel> | null = null;
        try {
            channel = supabase
                .channel(`chat:${conversationId}`)
                .on(
                    'postgres_changes',
                    {
                        event: 'INSERT',
                        schema: 'public',
                        table: 'messages',
                        filter: `conversation_id=eq.${conversationId}`,
                    },
                    (payload) => {
                        // Fetch the sender details for the new message
                        (async () => {
                            try {
                                const { data: senderData, error: senderError } = await supabase
                                    .from('profiles')
                                    .select('*')
                                    .eq('id', payload.new.sender_id)
                                    .single();
                                
                                if (senderError) {
                                    console.error('Error fetching sender data:', senderError);
                                    return;
                                }
                                
                                const newMessage = {
                                    ...payload.new,
                                    sender: senderData
                                };
                                
                                setMessages(prev => [...prev, newMessage]);
                            } catch (error) {
                                console.error('Error handling new message:', error);
                            }
                        })();
                    }
                )
                .subscribe();
        } catch (error) {
            console.error('Error setting up realtime subscription:', error);
        }
        
        return () => {
            if (channel) supabase.removeChannel(channel);
        };
    }, [conversationId, currentUserId, supabase]);
    
    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    
    const handleSend = async () => {
        if (!message.trim() || !conversationId || !currentUserId || sending) return;
        
        try {
            setSending(true);
            
            const { error } = await supabase.from('messages').insert([{
                conversation_id: conversationId,
                sender_id: currentUserId,
                content: message,
            }]);
            
            if (error) {
                console.error('Error sending message:', error);
                return;
            }
            
            setMessage("");
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setSending(false);
        }
    };
    
    // Format date for message timestamp
    const formatMessageTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };
    
    // Format date for date separators
    const formatMessageDate = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };
    
    // Group messages by date
    const messagesByDate = messages.reduce((groups, message) => {
        const date = new Date(message.created_at).toDateString();
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(message);
        return groups;
    }, {} as Record<string, any[]>);

    return (
        <div className="h-full flex flex-col">
            {/* Chat header */}
            <div className="flex items-center justify-between p-2 border-b border-gray-200 bg-white">
                {loading ? (
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                        <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8">
                            {otherUser?.avatar_url ? (
                                <Image 
                                    src={otherUser.avatar_url} 
                                    alt={otherUser.full_name || 'User'}
                                    width={32}
                                    height={32}
                                    className="rounded-full object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = '/default-avatar.png';
                                    }}
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm">
                                    {otherUser?.full_name ? otherUser.full_name.charAt(0).toUpperCase() : '?'}
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 className="font-medium text-sm text-gray-800">{otherUser?.full_name || 'Chat'}</h3>
                            <p className="text-xs text-gray-500 truncate max-w-[250px]">{otherUser?.username || otherUser?.email || ''}</p>
                        </div>
                    </div>
                )}
                
                <div className="flex items-center gap-2">
                    <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full">
                        <RiRefreshLine className="text-lg" />
                    </button>
                    <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full">
                        <IoSearchOutline className="text-lg" />
                    </button>
                    <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full">
                        <BsThreeDotsVertical className="text-lg" />
                    </button>
                </div>
            </div>
            
            {/* Tab switcher */}
            <div className="flex border-b border-gray-200 bg-white">
                <button 
                    className={`flex-1 py-2 text-sm relative ${tab === 'whatsapp' ? 'text-green-600' : 'text-gray-500'}`}
                    onClick={() => setTab('whatsapp')}
                >
                    WhatsApp
                    {tab === 'whatsapp' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500"></div>}
                </button>
                <button 
                    className={`flex-1 py-2 text-sm relative ${tab === 'private' ? 'text-green-600' : 'text-gray-500'}`}
                    onClick={() => setTab('private')}
                >
                    Private Note
                    {tab === 'private' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500"></div>}
                </button>
            </div>
            
            {/* Messages container */}
            <div className="flex-grow overflow-y-auto bg-[#f0f2f5]">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
                    </div>
                ) : (
                    <div className="p-4 space-y-4">
                        {Object.entries(messagesByDate).map(([date, dateMessages]) => (
                            <div key={date}>
                                <div className="flex justify-center my-3">
                                    <div className="px-3 py-0.5 text-xs bg-white text-gray-500 rounded-md shadow-sm">
                                        {formatMessageDate((dateMessages as any[])[0].created_at)}
                                    </div>
                                </div>
                                
                                {(dateMessages as any[]).map((msg: any) => (
                                    <div key={msg.id} className="w-full">
                                        <div className={`flex ${msg.sender_id === currentUserId ? 'justify-end' : 'justify-start'} w-full`}>
                                            <div 
                                                className={`max-w-[65%] px-2 py-1.5 rounded-md ${
                                                    msg.sender_id === currentUserId 
                                                        ? 'bg-[#d9fdd3] text-black rounded-tr-none' 
                                                        : 'bg-white text-black rounded-tl-none'
                                                }`}
                                            >
                                                {msg.sender_id !== currentUserId && msg.sender && (
                                                    <p className="text-xs text-blue-600 font-medium">
                                                        {msg.sender.full_name || msg.sender.username || 'User'}
                                                    </p>
                                                )}
                                                
                                                <p className="text-sm">{msg.content}</p>
                                                
                                                <div className="flex items-center justify-end gap-1 mt-1">
                                                    <span className="text-xs text-gray-500">{formatMessageTime(msg.created_at)}</span>
                                                    {msg.sender_id === currentUserId && (
                                                        <div className="text-blue-500">
                                                            <AiOutlineCheck className="inline-block text-xs" />
                                                            <AiOutlineCheck className="inline-block text-xs -ml-[3px]" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>
            
            {/* Message input */}
            <div className="px-3 py-2 bg-[#f0f2f5] border-t border-gray-200">
                <div className="flex items-center gap-3 bg-white rounded-lg py-1 px-3">
                    <button className="text-gray-500 p-1">
                        <BiSmile className="text-xl" />
                    </button>
                    
                    <button className="text-gray-500 p-1">
                        <FiPaperclip className="text-xl" />
                    </button>
                    
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Message..."
                        className="flex-grow text-gray-500 py-2 px-2 text-sm border-none outline-none"
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        disabled={sending}
                    />
                    
                    {sending ? (
                        <div className="p-1">
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-500"></div>
                        </div>
                    ) : (
                        <button 
                            className="text-gray-500 p-1"
                            onClick={handleSend}
                            disabled={!message.trim()}
                        >
                            <BsMic className="text-xl" />
                        </button>
                    )}
                </div>
                
                {/* WhatsApp tab indicator */}
                <div className="flex justify-between text-xs text-gray-400 px-2 mt-1">
                    <div>WhatsApp <MdKeyboardArrowDown className="inline text-base align-middle" /></div>
                    <div>▶</div>
                </div>
            </div>
        </div>
    );
}   