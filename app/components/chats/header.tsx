"use client";

import { IoChatbubbleOutline } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";
import { BiHelpCircle, BiDownload } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { HiOutlineStar } from "react-icons/hi";
import { CgMenuGridO } from "react-icons/cg";

export default function Header() {
    return (
        <header className="bg-white py-2 px-4 flex items-center justify-between">
            {/* Left side with chat icon and chats text */}
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                    <div className="text-gray-500 flex items-center">
                        <IoChatbubbleOutline className="text-lg" />
                    </div>
                    <span className="text-sm text-gray-600">Chats</span>
                </div>
               
            </div>
            
           
            
            {/* Right side with action buttons */}
            <div className="flex items-center gap-1.5">
            <div className="flex items-center text-xs text-gray-500 ml-3">
                    <span className="bg-yellow-400 w-1.5 h-1.5 rounded-full mr-1"></span>
                    <span>5 / 6</span>
                    <span className="ml-1">phones</span>
                </div>

                <button className="p-1 text-sm text-gray-500 hover:bg-gray-50 rounded-full">
                    <LuRefreshCw />
                </button>
                
                <button className="p-1 text-sm text-gray-500 hover:bg-gray-50 rounded-full">
                    <BiHelpCircle />
                </button>
                
                <button className="p-1 text-sm text-gray-500 hover:bg-gray-50 rounded-full">
                    <BiDownload />
                </button>
                
                <button className="p-1 text-sm text-gray-500 hover:bg-gray-50 rounded-full">
                    <IoIosNotificationsOutline />
                </button>
                
                <button className="flex items-center gap-1 p-1 text-sm text-gray-500 hover:bg-gray-50 rounded-full">
                    <HiOutlineStar className="text-lg" />
                </button>
                
                <button className="p-1 text-sm text-gray-500 hover:bg-gray-50 rounded-full">
                    <CgMenuGridO className="text-lg" />
                </button>
            </div>
        </header>
    );
}

// Add a style to hide scrollbar but keep functionality
// Add this to your global.css file if not already there
/*
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
*/