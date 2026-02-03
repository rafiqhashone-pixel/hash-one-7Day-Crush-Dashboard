// app/(Pages)/layout.tsx
"use client";
import { ReactNode, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleDesktopSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar 
        onMenuClick={toggleMobileSidebar}
        isSidebarOpen={isMobileSidebarOpen}
      />

      <div className="flex flex-1 pt-9 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleDesktopSidebar}
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={closeMobileSidebar}
        />

        {/* Overlay for mobile sidebar */}
        {isMobileSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 sm:hidden"
            onClick={closeMobileSidebar}
          />
        )}

        {/* Main Content - Adjusts based on sidebar state */}
        <main 
          className={`
            flex-1 bg-gray-50 p-4 md:p-6 overflow-y-auto transition-all duration-300 ease-in-out
            ${isSidebarCollapsed ? 'sm:ml-20' : 'sm:ml-64'}
          `}
        >
          {children}
        </main>
      </div>
    </div>
  );
}