"use client";

import { BiSearchAlt, BiFilterAlt } from "react-icons/bi";
import { MdOutlineCheck } from "react-icons/md";
import Image from "next/image";
import { useState } from "react";

export default function PeopleList() {
    const [filter, setFilter] = useState(false);
    
    // Mock data for conversation list with tags and more details
    const conversations = [
        {
            id: 1,
            name: "Test El Centro",
            lastMessage: "Rosnhag Ariel, Rosnhag Jo, Bharat Kumar Ramesh, Periskope",
            time: "11:37",
            unread: 0,
            online: true,
            tag: "Demo",
            isSelected: true,
            hasAttachment: false,
            number: "+91 99718 44208"
        },
        {
            id: 2,
            name: "Test Skope Final 5",
            lastMessage: "Support2: This doesn't go on Tuesday...",
            time: "Yesterday",
            unread: 0,
            online: true,
            tag: "Demo",
            isSelected: false,
            hasAttachment: false,
            number: "+91 99718 44208-01"
        },
        {
            id: 3,
            name: "Periskope Team Chat",
            lastMessage: "Periskope: Test message",
            time: "28-Feb-25",
            unread: 0,
            online: false,
            tag: "Demo Internal",
            isSelected: false,
            hasAttachment: false,
            number: "+91 99718 44208-03"
        },
        {
            id: 4,
            name: "+91 99999 99999",
            lastMessage: "Hi there, I'm Swapnika, Co-Founder of...",
            time: "29-Feb-25",
            unread: 0,
            online: false,
            tag: "Demo Signup",
            isSelected: false,
            hasAttachment: false,
            number: "+91 97889 89999-01"
        },
        {
            id: 5,
            name: "Test Demo17",
            lastMessage: "Rohasen: 123",
            time: "25-Feb-25",
            unread: 0,
            online: false,
            tag: "Content Demo",
            isSelected: false,
            hasAttachment: false,
            number: "+91 99718 44208"
        },
        {
            id: 6,
            name: "Test El Centro",
            lastMessage: "Rosnhag: Hello, Ahmadpor!",
            time: "04-Feb-25",
            unread: 0,
            online: false,
            tag: "Demo",
            isSelected: false,
            hasAttachment: false,
            number: "+91 99718 44208"
        },
        {
            id: 7,
            name: "Testing group",
            lastMessage: "Testing 12345",
            time: "27-Jan-25",
            unread: 0,
            online: false,
            tag: "Demo",
            isSelected: false,
            hasAttachment: false,
            number: "+91 97889 89999"
        },
        {
            id: 8,
            name: "Yasin 3",
            lastMessage: "First Bulk Message",
            time: "23-Nov-24",
            unread: 0,
            online: false,
            tag: "Demo Dont Send",
            isSelected: false,
            hasAttachment: false,
            number: "+91 99718 44208-13"
        }
    ];

    return (
        <div className="h-screen flex flex-col bg-white">
            {/* Filter and search bar */}
            <div className="p-2 border-b border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                    <button className={`flex items-center gap-1 text-xs py-1 px-2 rounded-full ${filter ? 'bg-green-100 text-green-700' : 'border border-gray-300 text-gray-600'}`}>
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
                        placeholder="Search" 
                        className="w-full pl-8 pr-4 py-1.5 bg-gray-100 border border-gray-200 rounded-md text-sm focus:outline-none"
                    />
                    <BiSearchAlt className="absolute left-2.5 top-2 text-gray-400 text-lg" />
                    <span className="absolute right-2.5 top-1.5 bg-green-100 text-green-700 text-xs py-0.5 px-2 rounded-full">Filtered</span>
                </div>
            </div>
            
            {/* Conversation list */}
            <div className="flex-grow overflow-y-auto">
                {conversations.map(conversation => (
                    <div 
                        key={conversation.id} 
                        className={`flex items-center gap-3 p-2 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${conversation.isSelected ? 'bg-gray-50' : ''}`}
                    >
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                {conversation.name.charAt(0)}
                            </div>
                            {conversation.online && (
                                <div className="absolute -right-0.5 -bottom-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                            {conversation.unread > 0 && (
                                <div className="absolute -right-2 -top-1 w-5 h-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">
                                    {conversation.unread}
                                </div>
                            )}
                        </div>
                        
                        {/* Conversation details */}
                        <div className="flex-grow min-w-0">
                            <div className="flex justify-between items-center">
                                <h3 className="font-medium text-gray-800 truncate text-sm">{conversation.name}</h3>
                                <span className="text-xs text-gray-500 whitespace-nowrap">{conversation.time}</span>
                            </div>
                            
                            <div className="flex items-center text-xs text-gray-500 mt-0.5">
                                {conversation.id === 3 && <span className="mr-1 text-gray-400">1</span>}
                                <p className="truncate">{conversation.lastMessage}</p>
                            </div>
                            
                            <div className="flex items-center mt-1 gap-1">
                                {conversation.tag.split(' ').map((tag, idx) => (
                                    <span 
                                        key={idx}
                                        className={`text-xs px-1.5 py-0.5 rounded ${
                                            tag === 'Demo' ? 'bg-red-50 text-red-600' : 
                                            tag === 'Internal' ? 'bg-green-50 text-green-600' : 
                                            tag === 'Signup' ? 'bg-blue-50 text-blue-600' :
                                            tag === 'Content' ? 'bg-purple-50 text-purple-600' :
                                            tag === 'Dont' ? 'bg-orange-50 text-orange-600' :
                                            'bg-gray-50 text-gray-600'
                                        }`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            
                            <div className="text-xs text-gray-400 mt-0.5">
                                {conversation.number}
                            </div>
                        </div>
                        
                        {/* Status indicators */}
                        <div className="flex flex-col items-end gap-1">
                            {conversation.id === 1 && (
                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                    <MdOutlineCheck className="text-green-600 text-xs" />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}