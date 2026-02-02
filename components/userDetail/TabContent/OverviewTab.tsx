// components/userDetail/TabContent/OverviewTab.tsx
"use client";

import { Target, Star, GraduationCap, MapPin, Shield, Wine, Cigarette, Dumbbell, Utensils } from "lucide-react";
import { UserData } from "@/types/user";

interface OverviewTabProps {
  user: UserData;
}

export function OverviewTab({ user }: OverviewTabProps) {

  // InfoCard component (defined inline)
  const InfoCard = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => {
    return (
      <div className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-blue-600">{icon}</div>
          <h4 className="font-semibold text-gray-800">{title}</h4>
        </div>
        {children}
      </div>
    );
  };

  // LifestyleItem component (defined inline)
  const LifestyleItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string }) => {
    return (
      <div className="flex items-center gap-2">
        <div className="text-gray-500">{icon}</div>
        <div>
          <p className="text-xs text-gray-500">{label}</p>
          <p className="text-sm font-medium">{value || 'Not specified'}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Relationship & Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard title="Relationship Goals" icon={<Target className="h-5 w-5" />}>
          <p className="text-lg font-semibold text-gray-800">{user.relationshipGoal || 'Not specified'}</p>
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Age Preference</p>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-gray-100 rounded-lg">
                {user.ageRange?.[0] || 18} - {user.ageRange?.[1] || 60} years
              </span>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-2">Distance Preference</p>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-gray-100 rounded-lg">
                  {user.distance || 'No preference'}
                </span>
              </div>
            </div>
          </div>
        </InfoCard>

        <InfoCard title="Lifestyle" icon={<Star className="h-5 w-5" />}>
          <div className="grid grid-cols-2 gap-3">
            <LifestyleItem icon={<Wine className="h-4 w-4" />} label="Alcohol" value={user.alcohol} />
            <LifestyleItem icon={<Cigarette className="h-4 w-4" />} label="Smoking" value={user.smoking} />
            <LifestyleItem icon={<Dumbbell className="h-4 w-4" />} label="Exercise" value={user.exercise} />
            <LifestyleItem icon={<Utensils className="h-4 w-4" />} label="Diet" value={user.diet} />
          </div>
        </InfoCard>
      </div>

      {/* Education & Career */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard title="Education & Career" icon={<GraduationCap className="h-5 w-5" />}>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Education</p>
              <p className="font-medium">{user.education || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Job Title</p>
              <p className="font-medium">{user.jobTitle || 'Not specified'}</p>
            </div>
            {user.workplace && (
              <div>
                <p className="text-sm text-gray-600">Workplace</p>
                <p className="font-medium">{user.workplace}</p>
              </div>
            )}
          </div>
        </InfoCard>

        <InfoCard title="Location Details" icon={<MapPin className="h-5 w-5" />}>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Address</p>
              <p className="font-medium">{user.address || 'Not specified'}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-gray-600">City</p>
                <p className="font-medium">{user.city || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Country</p>
                <p className="font-medium">{user.country || '-'}</p>
              </div>
            </div>
            {user.postalCode && (
              <div>
                <p className="text-sm text-gray-600">Postal Code</p>
                <p className="font-medium">{user.postalCode}</p>
              </div>
            )}
          </div>
        </InfoCard>
      </div>

      {/* System Info */}
      <InfoCard title="System Information" icon={<Shield className="h-5 w-5" />}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600">Auth Provider</p>
            <p className="font-medium">{user.authProvider || 'Email'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Role</p>
            <p className="font-medium capitalize">{user.role || 'user'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Profile Step</p>
            <p className="font-medium">{user.currentStep || 'completed'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Last Updated</p>
            <p className="font-medium">{new Date(user.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </InfoCard>
    </div>
  );
}