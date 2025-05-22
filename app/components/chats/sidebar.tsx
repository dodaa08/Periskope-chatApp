"use client";

import { AiFillHome } from "react-icons/ai";
import { BsChatLeftTextFill } from "react-icons/bs";
import { IoDocumentText } from "react-icons/io5";
import { BiLineChart } from "react-icons/bi";
import { TbReportAnalytics } from "react-icons/tb";
import { BsListCheck } from "react-icons/bs";
import { HiOutlineStar } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import { TbUserQuestion } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineUserGroup } from "react-icons/hi";

export default function Sidebar() {
    return (
        <div className="bg-white h-screen w-[60px] border-r border-gray-100 flex flex-col items-center shadow-sm">
            {/* Logo */}
            <div className="py-4 flex justify-center w-full">
                <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center">
                    <BsChatLeftTextFill className="text-white text-sm" />
                </div>
            </div>
            
            {/* Main navigation icons */}
            <div className="flex flex-col items-center gap-6 mt-3 flex-grow">
                <button className="text-gray-400 hover:text-green-600 transition-colors">
                    <AiFillHome className="text-xl" />
                </button>
                
                <button className="text-green-600 relative">
                    <BsChatLeftTextFill className="text-xl" />
                    <div className="absolute -right-1 -top-1 w-2 h-2 bg-green-600 rounded-full"></div>
                </button>
                
                <button className="text-gray-400 hover:text-green-600 transition-colors">
                    <IoDocumentText className="text-xl" />
                </button>
                
                <button className="text-gray-400 hover:text-green-600 transition-colors">
                    <BiLineChart className="text-xl" />
                </button>
                
                <button className="text-gray-400 hover:text-green-600 transition-colors">
                    <TbReportAnalytics className="text-xl" />
                </button>
                
                <button className="text-gray-400 hover:text-green-600 transition-colors">
                    <BsListCheck className="text-xl" />
                </button>
                
                <button className="text-gray-400 hover:text-green-600 transition-colors">
                    <HiOutlineStar className="text-xl" />
                </button>
                
                <button className="text-gray-400 hover:text-green-600 transition-colors">
                    <IoNotificationsOutline className="text-xl" />
                </button>
                
                <button className="text-gray-400 hover:text-green-600 transition-colors">
                    <TbUserQuestion className="text-xl" />
                </button>
            </div>
            
            {/* Bottom icons */}
            <div className="mb-5 flex flex-col items-center gap-6">
                <button className="text-gray-400 hover:text-green-600 transition-colors">
                    <IoSettingsOutline className="text-xl" />
                </button>
                
                <button className="text-gray-400 hover:text-green-600 transition-colors">
                    <HiOutlineUserGroup className="text-xl" />
                </button>
                
                <button className="w-7 h-7 bg-gray-200 rounded-full text-xs text-gray-600 font-medium flex items-center justify-center">
                    P
                </button>
            </div>
        </div>
    );
}   