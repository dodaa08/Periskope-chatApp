"use client";

import { useState } from "react";
import { BiSmile } from "react-icons/bi";
import { FiPaperclip } from "react-icons/fi";
import { BsThreeDotsVertical, BsMic } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineCheck } from "react-icons/ai";
import { RiRefreshLine } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function Chat() {
    const [message, setMessage] = useState("");
    const [tab, setTab] = useState("whatsapp");
    
    // Selected contact data based on image
    const contact = {
        name: "Test El Centro",
        details: "Rosnhag Ariel, Rosnhag Jo, Bharat Kumar Ramesh, Periskope",
        image: null
    };
    
    // Mock conversation data based on the image
    const messages = [
        {
            id: 1,
            text: "CVFER",
            sender: "them",
            time: "11:37",
            user: "Rosnhag Airtel"
        },
        {
            id: 2,
            text: "CDERT",
            sender: "them",
            time: "11:54",
            user: "Rosnhag Airtel"
        },
        {
            id: 3,
            text: "Hello, South Euna!",
            sender: "them",
            time: "08:01",
            user: "Rosnhag Airtel",
            date: "22-01-2025"
        },
        {
            id: 4,
            text: "Hello, Livonia!",
            sender: "me",
            time: "08:01",
            date: "23-01-2025"
        },
        {
            id: 5,
            text: "test el centro",
            sender: "me",
            time: "09:15",
            company: "Periskope",
            email: "time@periskope.dev"
        },
        {
            id: 6,
            text: "CDERT",
            sender: "them",
            time: "09:48",
            user: "Rosnhag Airtel"
        },
        {
            id: 7,
            text: "testing",
            sender: "me",
            time: "09:55",
            company: "Periskope",
            email: "time@periskope.dev"
        }
    ];

    const handleSend = () => {
        if (message.trim()) {
            console.log("Sending message:", message);
            setMessage("");
        }
    };

    return (
        <div className="h-full flex flex-col">
            {/* Chat header */}
            <div className="flex items-center justify-between p-2 border-b border-gray-200 bg-white">
                <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                        {contact.name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-medium text-sm text-gray-800">{contact.name}</h3>
                        <p className="text-xs text-gray-500 truncate max-w-[250px]">{contact.details}</p>
                    </div>
                </div>
                
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
                <div className="p-4 space-y-4">
                    {messages.map((msg, index) => {
                        // Check if we need to show date
                        const showDate = index === 2 || index === 3; // Dates from the image
                        
                        return (
                            <div key={msg.id} className="w-full">
                                {showDate && (
                                    <div className="flex justify-center my-3">
                                        <div className="px-3 py-0.5 text-xs bg-white text-gray-500 rounded-md shadow-sm">
                                            {msg.date}
                                        </div>
                                    </div>
                                )}
                                
                                <div className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} w-full`}>
                                    <div 
                                        className={`max-w-[65%] px-2 py-1.5 rounded-md ${
                                            msg.sender === 'me' 
                                                ? 'bg-[#d9fdd3] text-black rounded-tr-none' 
                                                : 'bg-white text-black rounded-tl-none'
                                        }`}
                                    >
                                        {msg.user && (
                                            <p className="text-xs text-blue-600 font-medium">
                                                {msg.user}
                                            </p>
                                        )}
                                        
                                        {msg.company && (
                                            <p className="text-xs text-green-600 font-medium">
                                                {msg.company}
                                            </p>
                                        )}
                                        
                                        <p className="text-sm">{msg.text}</p>
                                        
                                        <div className="flex items-center justify-end gap-1 mt-1">
                                            {msg.email && (
                                                <p className="text-[10px] text-gray-500 italic">
                                                    {msg.email}
                                                </p>
                                            )}
                                            <span className="text-xs text-gray-500">{msg.time}</span>
                                            {msg.sender === 'me' && (
                                                <div className="text-blue-500">
                                                    <AiOutlineCheck className="inline-block text-xs" />
                                                    <AiOutlineCheck className="inline-block text-xs -ml-[3px]" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
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
                        className="flex-grow py-2 px-2 text-sm border-none outline-none"
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    
                    <button className="text-gray-500 p-1">
                        <BsMic className="text-xl" />
                    </button>
                </div>
                
                {/* WhatsApp tab indicator - only in the exact image */}
                <div className="flex justify-between text-xs text-gray-400 px-2 mt-1">
                    <div>WhatsApp <MdKeyboardArrowDown className="inline text-base align-middle" /></div>
                    <div>▶</div>
                </div>
            </div>
        </div>
    );
}   