// components/userDetail/TabsNavigation.tsx
"use client";

import { User, Image as ImageIcon, Backpack, Globe, Users, MessageSquare } from "lucide-react";

interface TabsNavigationProps {
  activeTab: "overview" | "gallery" | "quiz" | "devices" | "matches" | "chats";
  setActiveTab: (tab: "overview" | "gallery" | "quiz" | "devices" | "matches" | "chats") => void;
  galleryImagesCount: number;
  deviceTokensCount: number;
}

export function TabsNavigation({
  activeTab,
  setActiveTab,
  galleryImagesCount,
  deviceTokensCount,
}: TabsNavigationProps) {

  // TabButton component (defined inline)
  const TabButton = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => {
    return (
      <button
        onClick={onClick}
        className={`flex items-center px-4 py-3 font-medium text-sm rounded-lg transition-all ${active 
          ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        }`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4">
      <div className="flex  border-b">
        <TabButton 
          active={activeTab === 'overview'} 
          onClick={() => setActiveTab('overview')}
        >
          <User className="h-4 w-4 mr-2" />
          Overview
        </TabButton>
        
        <TabButton 
          active={activeTab === 'gallery'} 
          onClick={() => setActiveTab('gallery')}
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          Gallery ({galleryImagesCount})
        </TabButton>
        
        <TabButton 
          active={activeTab === 'quiz'} 
          onClick={() => setActiveTab('quiz')}
        >
          <Backpack  className="h-4 w-4 mr-2" />
          Personality Quiz
        </TabButton>
        
        <TabButton 
          active={activeTab === 'devices'} 
          onClick={() => setActiveTab('devices')}
        >
          <Globe className="h-4 w-4 mr-2" />
          Devices 
        </TabButton>

        <TabButton 
          active={activeTab === 'matches'} 
          onClick={() => setActiveTab('matches')}
        >
          <Users className="h-4 w-4 mr-2" />
          Matches
        </TabButton>

        <TabButton 
          active={activeTab === 'chats'} 
          onClick={() => setActiveTab('chats')}
        >
          <MessageSquare  className="h-4 w-4 mr-2" />
          Chats
        </TabButton>
      </div>
    </div>
  );
}