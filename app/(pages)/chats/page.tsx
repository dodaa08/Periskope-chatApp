"use client";

import Sidebar from "@/app/components/chats/sidebar";
import Header from "@/app/components/chats/header";
import Chat from "@/app/components/chats/chat";
import RightSidebar from "@/app/components/chats/Rightsidebar"; 
import PeopleList from "@/app/components/chats/PeopleList";

export default function ChatsPage() {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      {/* Header spanning the full width */}
      <div className="w-full flex-shrink-0 border-b border-gray-200">
        <Header />
      </div>
      
      {/* Main content area below header */}
      <div className="flex flex-grow h-full overflow-hidden">
        {/* Left sidebar with navigation icons */}
        <div className="flex-shrink-0 h-full">
          <Sidebar />
        </div>
        
        {/* Main layout - the columns */}
        <div className="flex flex-grow h-full overflow-hidden">
          {/* Left column with conversation list */}
          <div className="w-[350px] flex-shrink-0 h-full border-r border-gray-100 overflow-hidden flex flex-col">
            {/* Conversation list */}
            <div className="flex-grow overflow-hidden">
              <PeopleList />
            </div>
          </div>
          
          {/* Middle column with chat content */}
          <div className="flex-grow h-full overflow-hidden">
            <Chat />
          </div>
          
          {/* Right sidebar with contact details */}
          {/* <div className="w-[350px] flex-shrink-0 h-full border-l border-gray-100 overflow-hidden">
            <RightSidebar />
          </div> */}
        </div>
      </div>
    </div>
  );
}

// focus a little on sound and animation and pixel perfect design 