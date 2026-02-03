"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";
import { getImageUrl } from "@/utils/imageUtils";

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
  coverPhoto?: string; // optional avatar
}

interface UserTableProps {
  users: User[];
}

export const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-red-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-48">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-20">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-24">
                Profile
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-24">
                Verified
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-24">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-32">
                Registered
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-48">
                Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-24">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                  {/* Name with Avatar */}
                  <td className="px-2 py-4 w-48">
                    <div className="flex items-center gap-2">
                      {/* Avatar */}
                      <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                        {user.coverPhoto ? (
                          <img
                            src={getImageUrl(user.coverPhoto)}
                            alt={`${user.firstName} ${user.lastName}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = `https://placehold.co/100x100/3b82f6/ffffff?text=${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}`;
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                            <Users className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* Name */}
                      <div className="text-sm font-medium">
                        {!user.firstName ? (
                          <span className="text-red-800">Unknown</span>
                        ) : (
                          <span className="text-gray-900">
                            {user.firstName} {user.lastName}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Gender */}
                  <td className="px-4 py-4 text-sm text-gray-700 w-20">
                    {user.gender || "-"}
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 text-sm text-gray-700">{user.email || "-"}</td>

                  {/* Profile */}
                  <td className="px-4 py-4 w-24">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.isProfileComplete ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {user.isProfileComplete ? "Complete" : "Incomplete"}
                    </span>
                  </td>

                  {/* Verified */}
                  <td className="px-4 py-4 w-24">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.isVerified ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.isVerified ? "Yes" : "No"}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4 w-24">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.isBlocked ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>

                  {/* Registered */}
                  <td className="px-4 py-4 text-sm text-gray-700 w-32">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
                  </td>

                  {/* Location */}
                  <td className="px-6 py-4 text-sm text-gray-700 w-48">
                    {user.city && user.country ? `${user.city}, ${user.country}` : "-"}
                  </td>

                  {/* Action */}
                  <td className="px-4 py-4 text-sm font-medium w-24">
                    <button
                      onClick={() => router.push(`/userList/${user._id}`)}
                      className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-400 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No users found</h3>
                    <p className="text-gray-500">No user data available to display.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
