"use client";

import { useState } from "react";
import { ImageIcon, Trash2 } from "lucide-react";
import { UserData } from "@/types/user";
import { getImageUrl } from "@/utils/imageUtils";
import { apiFetch } from "@/lib/apiFetch";
import { confirmDanger } from "@/lib/confirm";
import { notify } from "@/lib/toast";

interface GalleryTabProps {
  user: UserData;
  onImageClick: (url: string) => void;
  modalImage: string | null;
  onCloseModal: () => void;
}

export function GalleryTab({ user, onImageClick }: GalleryTabProps) {
  const [galleryImages, setGalleryImages] = useState<string[]>(
    user.galleryImages || []
  );
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

  const handleDeleteImage = async (
    e: React.MouseEvent,
    imageUrl: string,
    index: number
  ) => {
    e.stopPropagation();
    if (!user._id || deletingIndex !== null) return;

    // 🔥 SweetAlert confirmation
    const ok = await confirmDanger({
      title: "Delete gallery image?",
      text: "This image will be permanently removed.",
      confirmText: "Yes, delete",
    });

    if (!ok) return;

    try {
      setDeletingIndex(index);

      const res = await apiFetch(`/users/admin/${user._id}/gallery`, {
        method: "DELETE",
        body: JSON.stringify({
          urls: [imageUrl],
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to delete gallery image");
      }

      // ✅ Update UI
      setGalleryImages((prev) => prev.filter((_, i) => i !== index));

      // ✅ Success toast
      notify.success("Gallery image deleted");
    } catch (err: any) {
      console.error(err);
      notify.error(err.message || "Failed to delete image");
    } finally {
      setDeletingIndex(null);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Gallery Images ({galleryImages.length})
      </h3>

      {galleryImages.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((img, index) => {
            const imageUrl = getImageUrl(img);

            return (
              <div
                key={index}
                className="group relative aspect-square rounded-xl overflow-visible shadow-md hover:shadow-xl transition-all duration-300 bg-white"
              >
                {/* IMAGE */}
                <div
                  className="w-full h-full cursor-pointer rounded-xl overflow-hidden"
                  onClick={() => onImageClick(imageUrl)}
                >
                  <img
                    src={imageUrl}
                    alt={`Gallery Image ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/400x400/3b82f6/ffffff?text=Image";
                    }}
                  />
                </div>

                {/* DELETE BUTTON */}
                <div
                  className="absolute bottom-1 right-1 z-10"
                  onClick={(e) => handleDeleteImage(e, img, index)}
                >
                  <div
                    className="h-9 w-9 bg-red-500 rounded-full flex items-center justify-center
                    hover:bg-red-600 transition-all duration-200 shadow-lg border-2 border-white"
                  >
                    {deletingIndex === index ? (
                      <svg
                        className="animate-spin h-4 w-4 text-white"
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
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                    ) : (
                      <Trash2 className="h-4 w-4 text-white" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-block p-6 bg-gray-50 rounded-2xl">
            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              No gallery images available
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
