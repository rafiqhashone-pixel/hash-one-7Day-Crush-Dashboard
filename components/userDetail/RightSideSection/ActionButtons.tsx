// components/userDetail/RightSideSection/ActionButtons.tsx
"use client";

import { Edit2, Lock, Unlock, Trash2 } from "lucide-react";
import { UserData } from "@/types/user";

interface ActionButtonsProps {
  user: UserData;
  onToggleBlock: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export function ActionButtons({ user, onToggleBlock, onDelete, onEdit }: ActionButtonsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="font-semibold text-gray-800 mb-4">User Actions</h3>
      <div className="space-y-3">
        <button 
          onClick={onEdit}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Edit2 className="h-4 w-4" />
          Edit User
        </button>
        
        <button 
          onClick={onToggleBlock}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition ${user.isBlocked 
            ? 'bg-green-600 hover:bg-green-700 text-white' 
            : 'bg-yellow-600 hover:bg-yellow-700 text-white'
          }`}
        >
          {user.isBlocked ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
          {user.isBlocked ? 'Unblock User' : 'Block User'}
        </button>
        
        <button 
          onClick={onDelete}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          <Trash2 className="h-4 w-4" />
          Delete User
        </button>
      </div>
    </div>
  );
}