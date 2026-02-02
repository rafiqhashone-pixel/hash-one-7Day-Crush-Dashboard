// components/userDetail/TabContent/DevicesTab.tsx
"use client";

import { UserData } from "@/types/user";

interface DevicesTabProps {
  user: UserData;
}

export function DevicesTab({ user }: DevicesTabProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Registered Devices ({user.deviceTokens?.length || 0})</h3>
      {user.deviceTokens && user.deviceTokens.length > 0 ? (
        <div className="space-y-3">
          {user.deviceTokens.map((token, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-sm text-gray-600 truncate max-w-md">
                    {token}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Device {index + 1}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                  <span className="text-xs text-gray-600">Active</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">No registered devices</p>
      )}
    </div>
  );
}