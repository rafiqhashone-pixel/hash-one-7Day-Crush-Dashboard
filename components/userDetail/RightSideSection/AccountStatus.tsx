// components/userDetail/RightSideSection/AccountStatus.tsx
"use client";

import { CheckCircle, XCircle } from "lucide-react";
import { UserData } from "@/types/user";

interface AccountStatusProps {
  user: UserData;
}

export function AccountStatus({ user }: AccountStatusProps) {

  // StatusItem component (defined inline)
  const StatusItem = ({ label, status, trueText, falseText }: { 
    label: string; 
    status: boolean; 
    trueText: string; 
    falseText: string;
  }) => {
    return (
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="text-gray-600">{label}</span>
        <div className="flex items-center gap-2">
          {status ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <XCircle className="h-4 w-4 text-gray-400" />
          )}
          <span className={`text-sm font-medium ${status ? 'text-green-600' : 'text-gray-500'}`}>
            {status ? trueText : falseText}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="font-semibold text-gray-800 mb-4">Account Status</h3>
      <div className="space-y-3">
        <StatusItem 
          label="Verified" 
          status={user.isVerified} 
          trueText="Account Verified" 
          falseText="Not Verified" 
        />
        <StatusItem 
          label="Profile Complete" 
          status={user.isProfileComplete} 
          trueText="Profile Complete" 
          falseText="Incomplete" 
        />
        <StatusItem 
          label="Blocked" 
          status={user.isBlocked} 
          trueText="User Blocked" 
          falseText="Active User" 
        />
      </div>
    </div>
  );
}