"use client";

import { useState } from "react";
import { User, MapPin, Briefcase, Heart, UserCircle, Trash2 } from "lucide-react";
import { UserData } from "@/types/user";
import { getImageUrl } from "@/utils/imageUtils";
import { apiFetch } from "@/lib/apiFetch"; 
import { notify } from "@/lib/toast";
import { confirmDanger } from "@/lib/confirm";


interface ProfileCardProps {
  user: UserData;
  age: number;
  onImageClick: (url: string) => void;
}

export function ProfileCard({ user, age, onImageClick }: ProfileCardProps) {
  const [coverPhoto, setCoverPhoto] = useState(user.coverPhoto || "");
  const [deleting, setDeleting] = useState(false);

  const profilePicUrl = coverPhoto ? getImageUrl(coverPhoto) : "/defaultProfileImg.webp";

  // InfoBadge component
  const InfoBadge = ({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string }) => {
    if (!value || value.trim() === '') return null;
    return (
      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
        <div className="text-gray-500">{icon}</div>
        <div>
          <p className="text-xs text-gray-500">{label}</p>
          <p className="text-sm font-medium">{value}</p>
        </div>
      </div>
    );
  };

  // DELETE cover photo handler using apiFetch
const handleDeleteCoverPhoto = async (e: React.MouseEvent) => {
  e.stopPropagation();
  if (!user._id || deleting) return;

  // 🔥 SweetAlert confirmation
  const ok = await confirmDanger({
    title: "Delete profile picture?",
    text: "This profile picture will be permanently removed.",
    confirmText: "Yes, delete",
  });

  if (!ok) return;

  try {
    setDeleting(true);

    const res = await apiFetch(`/users/admin/${user._id}/cover-photo`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete cover photo");
    }

    // ✅ Update UI
    setCoverPhoto("");

    // ✅ Success toast
    notify.success("Profile picture deleted");
  } catch (err: any) {
    console.error(err);

    // ❌ Error toast
    notify.error(err.message || "Failed to delete profile picture");
  } finally {
    setDeleting(false);
  }
};


  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* PROFILE PICTURE */}
          <div className="relative">
            <div
              className="relative h-28 w-28 rounded-xl overflow-hidden border-4 border-white shadow-lg cursor-pointer bg-gray-50"
              onClick={() => onImageClick(profilePicUrl)}
            >
              <img
                src={profilePicUrl}
                alt="Profile Picture"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/defaultProfileImg.webp";
                }}
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <span className="text-white text-xs font-semibold">View</span>
              </div>
            </div>

            {/* Delete Icon */}
            {coverPhoto && (
              <div
                className="absolute -bottom-3 cursor-pointer z-10"
                style={{ left: 'calc(100% - 30px)' }}
                onClick={handleDeleteCoverPhoto}
              >
                <div
                  className={`h-10 w-10 bg-red-500 rounded-full flex items-center justify-center
                  hover:bg-red-600 transition-colors duration-300 shadow-lg border-3 border-white`}
                >
                  {deleting ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  ) : (
                    <Trash2 className="h-5 w-5 text-white" />
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h2 className="text-2xl font-bold text-gray-900">
                {user.firstName} {user.lastName}, {age}
              </h2>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                {user.gender}
              </span>
            </div>

            {user.bio && (
              <p className="text-gray-700 mb-4 italic border-l-4 border-blue-500 pl-4">
                "{user.bio}"
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              <InfoBadge
                icon={<MapPin className="h-4 w-4" />}
                label="Location"
                value={`${user.city || ''}${user.city && user.country ? ', ' : ''}${user.country || ''}`}
              />
              <InfoBadge
                icon={<Briefcase className="h-4 w-4" />}
                label="Profession"
                value={user.jobTitle || 'Not specified'}
              />
              <InfoBadge
                icon={<Heart className="h-4 w-4" />}
                label="Looking for"
                value={user.matchWith || 'Not specified'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
