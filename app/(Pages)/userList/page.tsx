"use client";

import { useEffect, useState } from "react";
import { UserTable } from "@/components/userList/UserTable";
import UserTableFilters from "@/components/userList/UserTableFilters";
import { apiFetch } from "@/lib/apiFetch";

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

export default function CustomersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await apiFetch("/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data: User[] = await res.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-4 mt-16">
      <h1 className="text-3xl font-medium text-gray-700 mb-6">
        User List
      </h1>

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <UserTableFilters users={users} onFiltered={setFilteredUsers} />
          <UserTable users={filteredUsers} />
        </>
      )}
    </div>
  );
}
