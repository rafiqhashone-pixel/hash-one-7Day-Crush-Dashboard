// components/userDetail/TabContent/PersonalityQuizTab.tsx
"use client";

import { UserData } from "@/types/user";

interface PersonalityQuizTabProps {
  user: UserData;
}

export function PersonalityQuizTab({ user }: PersonalityQuizTabProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Personality Quiz Questions ({user.personalityQuizQuestions?.length || 0})</h3>
      {user.personalityQuizQuestions && user.personalityQuizQuestions.length > 0 ? (
        <div className="space-y-3">
          {user.personalityQuizQuestions.map((q) => (
            <div key={q.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 h-8 w-8 bg-blue-100 text-blue-800 rounded-lg flex items-center justify-center font-semibold">
                  {q.id}
                </div>
                <p className="text-gray-800">{q.question}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">No personality quiz questions available</p>
      )}
    </div>
  );
}