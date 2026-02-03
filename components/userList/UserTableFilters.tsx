"use client";

import { ChevronDown } from "lucide-react";
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
}

interface Props {
  users: User[];
  onFiltered: (filtered: User[]) => void;
}

export const UserTableFilters: React.FC<Props> = ({ users, onFiltered }) => {
  const [search, setSearch] = useState("");
  const [verified, setVerified] = useState<"all" | "yes" | "no">("all");
  const [blocked, setBlocked] = useState<"all" | "yes" | "no">("all");
  const [profileStatus, setProfileStatus] =
    useState<"all" | "complete" | "incomplete">("all");

  const applyFilters = () => {
    let result = [...users];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (u) =>
          `${u.firstName} ${u.lastName}`.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      );
    }

    if (verified !== "all") {
      result = result.filter((u) =>
        verified === "yes" ? u.isVerified : !u.isVerified
      );
    }

    if (blocked !== "all") {
      result = result.filter((u) =>
        blocked === "yes" ? u.isBlocked : !u.isBlocked
      );
    }

    if (profileStatus !== "all") {
      result = result.filter((u) =>
        profileStatus === "complete"
          ? u.isProfileComplete
          : !u.isProfileComplete
      );
    }

    onFiltered(result);
  };

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

  /** 🔁 Reusable select wrapper UI */
  const SelectWrapper = ({
    label,
    value,
    onChange,
    options,
    width = "sm:w-48",
  }: any) => (
    <div className={`w-full ${width}`}>
      <label className="mb-1 block text-xs font-medium text-gray-500">
        {label}
      </label>

      <div className="group relative">
        <select
          value={value}
          onChange={onChange}
          className="h-10 w-full appearance-none rounded-lg border bg-white px-3 pr-10 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          {options.map((opt: any) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Chevron */}
        <span
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2
                     text-gray-400 transition-transform duration-200
                     group-focus-within:rotate-180"
        >
          <ChevronDown size={16} />
        </span>
      </div>
    </div>
  );

  return (
    <div className="mb-6 rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        {/* Search */}
        <div className="flex-1">
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Search
          </label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email"
            className="h-10 w-full rounded-lg border px-3 text-sm
                       focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Verified */}
        <SelectWrapper
          label="Verified"
          value={verified}
          onChange={(e: any) => setVerified(e.target.value)}
          options={[
            { value: "all", label: "All" },
            { value: "yes", label: "Verified" },
            { value: "no", label: "Unverified" },
          ]}
        />

        {/* Blocked */}
        <SelectWrapper
          label="Blocked"
          value={blocked}
          onChange={(e: any) => setBlocked(e.target.value)}
          options={[
            { value: "all", label: "All" },
            { value: "yes", label: "Blocked" },
            { value: "no", label: "Active" },
          ]}
        />

        {/* Profile Status */}
        <SelectWrapper
          label="Profile Status"
          width="sm:w-52"
          value={profileStatus}
          onChange={(e: any) => setProfileStatus(e.target.value)}
          options={[
            { value: "all", label: "All" },
            { value: "complete", label: "Complete" },
            { value: "incomplete", label: "Incomplete" },
          ]}
        />

        {/* Reset */}
        <div className="flex justify-end">
          <button
            onClick={handleReset}
            className="h-10 rounded-lg border border-gray-200 bg-gray-50 px-4
                       text-sm font-medium text-gray-700 hover:bg-gray-100
                       active:scale-[0.98]"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTableFilters;
