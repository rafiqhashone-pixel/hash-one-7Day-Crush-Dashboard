// components/userDetail/RightSideSection/ContactInfo.tsx
"use client";

import { Mail, Phone, Calendar } from "lucide-react";
import { UserData } from "@/types/user";

interface ContactInfoProps {
  user: UserData;
  age: number;
}

export function ContactInfo({ user, age }: ContactInfoProps) {

  // ContactItem component (defined inline)
  const ContactItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string }) => {
    if (!value) return null;
    return (
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
        <div className="text-gray-500">{icon}</div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500">{label}</p>
          <p className="text-sm font-medium truncate">{value}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="font-semibold text-gray-800 mb-4">Contact Information</h3>
      <div className="space-y-3">
        <ContactItem icon={<Mail className="h-4 w-4" />} label="Email" value={user.email} />
        <ContactItem icon={<Phone className="h-4 w-4" />} label="Phone" value={user.phoneNumber} />
        <ContactItem 
          icon={<Calendar className="h-4 w-4" />} 
          label="Date of Birth" 
          value={`${new Date(user.dateOfBirth).toLocaleDateString()} (${age} years)`} 
        />
      </div>
    </div>
  );
}