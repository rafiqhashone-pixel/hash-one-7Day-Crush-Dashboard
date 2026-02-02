// components/userDetail/Header.tsx
"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserData } from "@/types/user";

interface HeaderProps {
  user: UserData;
}

export function Header({ user }: HeaderProps) {
  const router = useRouter();

  return (
    <div className="mb-6">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Users
      </button>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-gray-600 mt-1">
            User ID: <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{user._id}</span>
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${user.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
            {user.isBlocked ? 'Blocked' : 'Active'}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${user.isVerified ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {user.isVerified ? 'Verified' : 'Unverified'}
          </span>
        </div>
      </div>
    </div>
  );
}