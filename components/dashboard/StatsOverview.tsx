"use client";

import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import { apiFetch } from "@/lib/apiFetch"; // your apiFetch helper

export default function DashboardCard() {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const res = await apiFetch("/users"); // your endpoint
        if (!res.ok) throw new Error("Failed to fetch users");

        const data = await res.json();
        setTotalUsers(data.length); // count of users
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTotalUsers();
  }, []);

  return (
    <div className="flex flex-col mb-6">
      {/* Scrollable Area */}
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="flex flex-wrap gap-6">
          {/* Total Users */}
          <div className="flex-1 min-w-[260px] bg-white rounded-xl shadow p-6 border-l-4 border-purple-500 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-purple-600 mb-1">
                TOTAL USERS
              </div>
              <div className="text-2xl font-bold text-gray-700">
                {loading ? "..." : error ? "Error" : totalUsers}
              </div>
            </div>
            <User className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
