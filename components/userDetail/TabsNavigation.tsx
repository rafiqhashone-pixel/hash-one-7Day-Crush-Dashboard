"use client";

import {
  User,
  Image as ImageIcon,
  Backpack,
  Globe,
  Users,
  MessageSquare,
} from "lucide-react";

type Tab =
  | "overview"
  | "gallery"
  | "quiz"
  | "matches"
  | "chats";

interface TabsNavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  galleryImagesCount: number;
 
}

export function TabsNavigation({
  activeTab,
  setActiveTab,
  galleryImagesCount,
}: TabsNavigationProps) {
  const TabButton = ({
    active,
    onClick,
    children,
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => {
    return (
      <button
        onClick={onClick}
        className={`
          flex items-center gap-1 px-4 py-3 whitespace-nowrap
          text-sm font-medium rounded-lg transition-all
          ${
            active
              ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }
        `}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-2 sm:p-4">
      {/* 
        Mobile: horizontal scroll
        Desktop: normal tabs
      */}
      <div
        className="
          flex gap-4 sm:gap-3
          overflow-x-auto
          scrollbar-hide
          sm:overflow-visible
          justify-center 
        "
      >
        <TabButton
          active={activeTab === "overview"}
          onClick={() => setActiveTab("overview")}
        >
          <User className="h-4 w-4" />
          <span className="hidden lg:inline">Overview</span>
        </TabButton>

        <TabButton
          active={activeTab === "gallery"}
          onClick={() => setActiveTab("gallery")}
        >
          <ImageIcon className="h-4 w-4" />
          <span className="hidden lg:inline">
            Gallery ({galleryImagesCount})
          </span>
        </TabButton>

        <TabButton
          active={activeTab === "quiz"}
          onClick={() => setActiveTab("quiz")}
        >
          <Backpack className="h-4 w-4" />
          <span className="hidden lg:inline">Personality Quiz</span>
        </TabButton>

        <TabButton
          active={activeTab === "matches"}
          onClick={() => setActiveTab("matches")}
        >
          <Users className="h-4 w-4" />
          <span className="hidden lg:inline">Matches</span>
        </TabButton>

        <TabButton
          active={activeTab === "chats"}
          onClick={() => setActiveTab("chats")}
        >
          <MessageSquare className="h-4 w-4" />
          <span className="hidden lg:inline">Chats</span>
        </TabButton>
      </div>
    </div>
  );
}
