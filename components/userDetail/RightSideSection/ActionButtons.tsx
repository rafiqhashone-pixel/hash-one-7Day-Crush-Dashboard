"use client";

import { Lock, Unlock, Trash2 } from "lucide-react";
import { UserData } from "@/types/user";
import { confirmDanger } from "@/lib/confirm";
import { notify } from "@/lib/toast";

interface ActionButtonsProps {
  user: UserData;
  onToggleBlock: () => Promise<void> | void;
  onDelete: () => Promise<void> | void;
}

export function ActionButtons({
  user,
  onToggleBlock,
  onDelete,
}: ActionButtonsProps) {
  const handleToggleBlock = async () => {
    const ok = await confirmDanger({
      title: user.isBlocked ? "Unblock user?" : "Block user?",
      text: user.isBlocked
        ? "This user will regain access to the platform."
        : "This user will be prevented from accessing the platform.",
      confirmText: user.isBlocked ? "Yes, unblock" : "Yes, block",
    });

    if (!ok) return;

    try {
      await onToggleBlock();
      notify.success(
        user.isBlocked ? "User unblocked successfully" : "User blocked successfully"
      );
    } catch (err) {
      console.error(err);
      notify.error("Failed to update user status");
    }
  };

  const handleDeleteUser = async () => {
    const ok = await confirmDanger({
      title: "Delete user?",
      text: "This action is permanent and cannot be undone.",
      confirmText: "Yes, delete user",
    });

    if (!ok) return;

    try {
      await onDelete();
      notify.success("User deleted successfully");
    } catch (err) {
      console.error(err);
      notify.error("Failed to delete user");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="font-semibold text-gray-800 mb-4">User Actions</h3>

      <div className="space-y-3">
        {/* BLOCK / UNBLOCK */}
        <button
          onClick={handleToggleBlock}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition
            ${
              user.isBlocked
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-yellow-600 hover:bg-yellow-700 text-white"
            }`}
        >
          {user.isBlocked ? (
            <Unlock className="h-4 w-4" />
          ) : (
            <Lock className="h-4 w-4" />
          )}
          {user.isBlocked ? "Unblock User" : "Block User"}
        </button>

        {/* DELETE USER */}
        <button
          onClick={handleDeleteUser}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          <Trash2 className="h-4 w-4" />
          Delete User
        </button>
      </div>
    </div>
  );
}
