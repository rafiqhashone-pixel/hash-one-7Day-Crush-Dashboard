// components/userDetail/ErrorState.tsx
"use client";

import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface ErrorStateProps {
  error: string;
  router: ReturnType<typeof useRouter>;
}

export function ErrorState({ error, router }: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading User</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => router.push("/userList")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Back to Users
        </button>
      </div>
    </div>
  );
}