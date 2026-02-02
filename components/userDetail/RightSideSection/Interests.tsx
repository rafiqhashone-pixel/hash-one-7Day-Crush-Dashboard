// components/userDetail/RightSideSection/Interests.tsx
"use client";

interface InterestsProps {
  interests: string[];
}

export function Interests({ interests }: InterestsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="font-semibold text-gray-800 mb-4">Interests ({interests.length})</h3>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest, index) => (
          <span 
            key={index} 
            className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-lg text-sm font-medium hover:from-blue-100 hover:to-indigo-100 transition"
          >
            {interest}
          </span>
        ))}
      </div>
    </div>
  );
}