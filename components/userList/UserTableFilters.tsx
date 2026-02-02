"use client";

import React, { useEffect, useState } from "react";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
  isProfileComplete: boolean;
  isBlocked: boolean;
  createdAt: string;
  gender: string;
  city?: string;
  country?: string;
  dateOfBirth?: string;
  currentStep?: string;
}

interface Props {
  users: User[]; // original full list from parent
  onFiltered: (filtered: User[]) => void; // emits filtered list back to parent
}

export const UserTableFilters: React.FC<Props> = ({ users, onFiltered }) => {
  const [search, setSearch] = useState("");
  const [verified, setVerified] = useState<"all" | "yes" | "no">("all");
  const [blocked, setBlocked] = useState<"all" | "yes" | "no">("all");
  const [profileStatus, setProfileStatus] = useState<"all" | "complete" | "incomplete">("all");

  // filter function
  const applyFilters = () => {
    let result = [...users];

    // search by name or email
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (u) =>
          `${u.firstName ?? ""} ${u.lastName ?? ""}`.toLowerCase().includes(q) ||
          (u.email ?? "").toLowerCase().includes(q)
      );
    }

    // verified
    if (verified !== "all") {
      result = result.filter((u) => (verified === "yes" ? u.isVerified : !u.isVerified));
    }

    // blocked
    if (blocked !== "all") {
      result = result.filter((u) => (blocked === "yes" ? u.isBlocked : !u.isBlocked));
    }

    // profile status
    if (profileStatus !== "all") {
      result = result.filter((u) =>
        profileStatus === "complete" ? u.isProfileComplete : !u.isProfileComplete
      );
    }

    onFiltered(result);
  };

  // run when controls or original users change
  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, verified, blocked, profileStatus, users]);

  const handleReset = () => {
    setSearch("");
    setVerified("all");
    setBlocked("all");
    setProfileStatus("all");
    onFiltered(users);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
      {/* Search */}
      <div className="flex-1 md:flex-none">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name or email..."
          className="w-full md:w-64 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Verified */}
      <select
        value={verified}
        onChange={(e) => setVerified(e.target.value as any)}
        className="border rounded px-3 py-2"
      >
        <option value="all">Verified: All</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      {/* Blocked */}
      <select
        value={blocked}
        onChange={(e) => setBlocked(e.target.value as any)}
        className="border rounded px-3 py-2"
      >
        <option value="all">Blocked: All</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      {/* Profile status */}
      <select
        value={profileStatus}
        onChange={(e) => setProfileStatus(e.target.value as any)}
        className="border rounded px-3 py-2"
      >
        <option value="all">Profile: All</option>
        <option value="complete">Complete</option>
        <option value="incomplete">Incomplete</option>
      </select>

      {/* Reset */}
      <button
        onClick={handleReset}
        className="ml-auto md:ml-0 px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
      >
        Reset
      </button>
    </div>
  );
};

export default UserTableFilters;
