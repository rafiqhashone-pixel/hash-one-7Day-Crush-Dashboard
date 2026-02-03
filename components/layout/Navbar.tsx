"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Settings, LogOut, Menu, X } from "lucide-react";

interface NavbarProps {
  onMenuClick?: () => void;
  isSidebarOpen?: boolean;
}

export default function Navbar({ onMenuClick, isSidebarOpen }: NavbarProps) {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Handle click outside for dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 z-50 bg-white border-b border-gray-200">
      <div className="flex h-full items-center px-4 sm:px-6">
        {/* Left side - Logo and Menu Toggle */}
        <div className="flex items-center">
          {/* Mobile Menu Toggle Button */}
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 mr-3 sm:hidden"
          >
            {isSidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/aubonlogo.png"
              alt="Logo"
              width={160}
              height={40}
              className="object-contain h-10 w-auto"
            />
          </div>
        </div>

        {/* Center - Optional content like title */}
        <div className="flex-1 ml-6">
          
        </div>

        {/* Right side - User dropdown */}
        <div className="flex items-center space-x-4" ref={dropdownRef}>
          <div className="relative">
            <button
              onClick={() => setDropdown(!dropdown)}
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Image
                  src="https://choice-delivery.com/dashboard/img/undraw_profile.svg"
                  alt="User"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-700">cvsadmin</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </button>

            {/* Dropdown Menu */}
            {dropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <User className="mr-3 h-4 w-4" />
                  Profile
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Settings className="mr-3 h-4 w-4" />
                  Settings
                </a>
                <div className="border-t my-1" />
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}