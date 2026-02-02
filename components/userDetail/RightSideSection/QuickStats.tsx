// components/userDetail/RightSideSection/QuickStats.tsx
"use client";

import { Clock, ImageIcon, Hash, Globe, User, Award } from "lucide-react";
import { UserData } from "@/types/user";

interface QuickStatsProps {
  user: UserData;
  memberSince: string;
  age: number;
}

export function QuickStats({ user, memberSince, age }: QuickStatsProps) {

  // StatItem component (defined inline)
  const StatItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) => {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-gray-400">{icon}</div>
          <span className="text-gray-600">{label}</span>
        </div>
        <span className="font-semibold text-gray-900">{value}</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Award className="h-5 w-5 text-blue-600" />
        Quick Stats
      </h3>
      <div className="space-y-4">
        <StatItem 
          icon={<Clock className="h-4 w-4" />} 
          label="Member Since" 
          value={memberSince}
        />
        <StatItem 
          icon={<ImageIcon className="h-4 w-4" />} 
          label="Gallery Images" 
          value={user.galleryImages?.length || 0}
        />
        <StatItem 
          icon={<Hash className="h-4 w-4" />} 
          label="Quiz Questions" 
          value={user.personalityQuizQuestions?.length || 0}
        />
        <StatItem 
          icon={<Globe className="h-4 w-4" />} 
          label="Active Devices" 
          value={user.deviceTokens?.length || 0}
        />
        <StatItem 
          icon={<User className="h-4 w-4" />} 
          label="Profile Picture" 
          value={user.coverPhoto ? "✓ Uploaded" : "✗ Not set"}
        />
      </div>
    </div>
  );
}