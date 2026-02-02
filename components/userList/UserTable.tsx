"use client";

import React from "react";
import { useRouter } from "next/navigation";

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
}

interface UserTableProps {
  users: User[];
}

export const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const router = useRouter();

  return (
    <div className="overflow-x-auto border rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-red-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
              Name
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
              Gender
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
              Email
            </th>
            <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">
              Profile Status
            </th>
            <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">
              Verified
            </th>
            <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">
              Blocked
            </th>
            <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">
              Registration Date
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
              Location
            </th>
            <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white">
          {users.map((user) => (
            <tr key={user._id} className="h-16">
              {/* Name */}
              <td className="px-4 py-2 font-medium">
                {user.firstName} {user.lastName}
              </td>

              {/* Gender */}
              <td className="px-4 py-2">{user.gender}</td>

              {/* Email */}
              <td className="px-4 py-2">{user.email}</td>

              {/* Profile Status */}
              <td className="px-4 py-2 text-center">
                {user.isProfileComplete ? "Complete" : "Incomplete"}
              </td>

              {/* Verified */}
              <td className="px-4 py-2 text-center">
                {user.isVerified ? "Yes" : "No"}
              </td>

              {/* Blocked */}
              <td className="px-4 py-2 text-center">
                {user.isBlocked ? "Yes" : "No"}
              </td>

              {/* Registration Date */}
              <td className="px-4 py-2 text-center">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>

              {/* Location */}
              <td className="px-4 py-2">
                {user.city}, {user.country}
              </td>

              {/* Action */}
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => router.push(`/userList/${user._id}`)}
                  className="px-5 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
