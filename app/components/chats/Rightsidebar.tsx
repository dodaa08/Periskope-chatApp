"use client";

import { RiMessage2Line, RiArrowGoBackLine } from "react-icons/ri";
import { IoSettingsOutline, IoAppsOutline } from "react-icons/io5";
import { LuPenLine } from "react-icons/lu";
import { MdOutlineList } from "react-icons/md";
import { TbChartBar } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BsFolder } from "react-icons/bs";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

export default function RightSidebar() {
    return (
        <div className="h-full px-4 py-10 flex flex-col items-center border-l border-gray-200 py-4 bg-white">
            <div className="flex flex-col items-center gap-7 mt-2">
                <button className="w-6 h-6 text-gray-400 hover:text-gray-600">
                    <RiMessage2Line size={20} />
                </button>
                
                <button className="w-6 h-6 text-gray-400 hover:text-gray-600">
                    <RiArrowGoBackLine size={20} />
                </button>
                
                <button className="w-6 h-6 text-gray-400 hover:text-gray-600">
                    <LuPenLine size={20} />
                </button>
                
                <button className="w-6 h-6 text-gray-400 hover:text-gray-600">
                    <MdOutlineList size={20} />
                </button>
                
                <button className="w-6 h-6 text-gray-400 hover:text-gray-600">
                    <TbChartBar size={20} />
                </button>
                
                <button className="w-6 h-6 text-gray-400 hover:text-gray-600">
                    <FiUsers size={20} />
                </button>
                
                <button className="w-6 h-6 text-gray-400 hover:text-gray-600">
                    <AiOutlineQuestionCircle size={20} />
                </button>
                
                <button className="w-6 h-6 text-gray-400 hover:text-gray-600">
                    <BsFolder size={20} />
                </button>
                
                <button className="w-6 h-6 text-gray-400 hover:text-gray-600">
                    <HiOutlineMenuAlt2 size={20} />
                </button>
            </div>
        </div>
    );
}