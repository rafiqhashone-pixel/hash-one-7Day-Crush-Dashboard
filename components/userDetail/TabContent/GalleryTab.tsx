// components/userDetail/TabContent/GalleryTab.tsx
"use client";

import { ImageIcon } from "lucide-react";
import { UserData } from "@/types/user";
import { getImageUrl } from "@/utils/imageUtils";

interface GalleryTabProps {
  user: UserData;
  onImageClick: (url: string) => void;
  modalImage: string | null;
  onCloseModal: () => void;
}

export function GalleryTab({ user, onImageClick, modalImage, onCloseModal }: GalleryTabProps) {
  
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Gallery Images ({user.galleryImages?.length || 0})</h3>
      {user.galleryImages && user.galleryImages.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {user.galleryImages.map((img, index) => {
              const imageUrl = getImageUrl(img);
              return (
                <div
                  key={index}
                  className="group relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
                  onClick={() => onImageClick(imageUrl)}
                >
                  <img
                    src={imageUrl}
                    alt={`Gallery Image ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      console.error(`Failed to load gallery image: ${imageUrl}`);
                      e.currentTarget.src = `https://placehold.co/400x400/3b82f6/ffffff?text=Image+${index + 1}`;
                      e.currentTarget.className = "w-full h-full object-cover bg-gray-100";
                    }}
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-medium">Image {index + 1}</p>
                  </div>
                  <div className="absolute inset-0 border-2 border-gray-100 rounded-xl pointer-events-none" />
                </div>
              );
            })}
          </div>
          
          {/* Image Modal */}
          {modalImage && (
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
              onClick={onCloseModal}
            >
              <div className="relative max-w-full max-h-full p-4" onClick={e => e.stopPropagation()}>
                <button
                  className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-3 transition"
                  onClick={onCloseModal}
                  aria-label="Close image modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="bg-white p-2 rounded-xl">
                  <img
                    src={modalImage}
                    alt="Full Image"
                    className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-2xl"
                    onError={(e) => {
                      console.error(`Failed to load modal image: ${modalImage}`);
                      e.currentTarget.src = "https://placehold.co/800x600/3b82f6/ffffff?text=Image+Failed+to+Load";
                    }}
                  />
                </div>
                <p className="text-center text-white mt-4 text-sm">Click anywhere to close</p>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="inline-block p-6 bg-gray-50 rounded-2xl">
            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No gallery images available</p>
          </div>
        </div>
      )}
    </div>
  );
}