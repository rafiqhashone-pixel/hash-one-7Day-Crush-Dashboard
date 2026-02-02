// components/userDetail/ProfileCard.tsx
"use client";

import { User, MapPin, Briefcase, Heart, UserCircle } from "lucide-react";
import { UserData } from "@/types/user";
import { getImageUrl } from "@/utils/imageUtils";

interface ProfileCardProps {
  user: UserData;
  age: number;
  onImageClick: (url: string) => void;
}

export function ProfileCard({ user, age, onImageClick }: ProfileCardProps) {
  const profilePicUrl = getImageUrl(user.coverPhoto);

  // InfoBadge component (defined inline)
  const InfoBadge = ({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string }) => {
    if (!value || value.trim() === '') return null;
    return (
      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
        <div className="text-gray-500">{icon}</div>
        <div>
          <p className="text-xs text-gray-500">{label}</p>
          <p className="text-sm font-medium">{value}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* PROFILE PICTURE */}
          <div className="relative">
            {profilePicUrl ? (
              <div
                className="relative h-28 w-28 rounded-xl overflow-hidden border-4 border-white shadow-lg cursor-pointer bg-gray-50"
                onClick={() => onImageClick(profilePicUrl)}
              >
                <img
                  src={profilePicUrl}
                  alt="Profile Picture"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error(`Failed to load profile picture: ${profilePicUrl}`);
                    e.currentTarget.src = `https://placehold.co/400x400/3b82f6/ffffff?text=${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
                  }}
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">View</span>
                </div>
              </div>
            ) : (
              <div className="h-28 w-28 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 border-4 border-white shadow-lg flex items-center justify-center">
                <UserCircle className="h-16 w-16 text-gray-400" />
              </div>
            )}
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h2 className="text-2xl font-bold text-gray-900">
                {user.firstName} {user.lastName}, {age}
              </h2>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                {user.gender}
              </span>
            </div>
            
            {user.bio && (
              <p className="text-gray-700 mb-4 italic border-l-4 border-blue-500 pl-4">
                "{user.bio}"
              </p>
            )}
            
            <div className="flex flex-wrap gap-3">
              <InfoBadge 
                icon={<MapPin className="h-4 w-4" />} 
                label="Location" 
                value={`${user.city || ''}${user.city && user.country ? ', ' : ''}${user.country || ''}`} 
              />
              <InfoBadge 
                icon={<Briefcase className="h-4 w-4" />} 
                label="Profession" 
                value={user.jobTitle || 'Not specified'} 
              />
              <InfoBadge 
                icon={<Heart className="h-4 w-4" />} 
                label="Looking for" 
                value={user.matchWith || 'Not specified'} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}