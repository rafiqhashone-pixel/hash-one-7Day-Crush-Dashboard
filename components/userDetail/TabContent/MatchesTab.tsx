"use client";

import { useState, useEffect } from "react";
import { MapPin, Calendar, Heart, Users, Loader2, AlertCircle } from "lucide-react";
import { UserData } from "@/types/user";
import { apiFetch } from "@/lib/apiFetch";
import { getImageUrl } from "@/utils/imageUtils";

interface Match {
  matchId: string;
  _id: string;
  firstName: string;
  lastName: string;
  coverPhoto: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  age: number;
  bio?: string;
  interests?: string[];
  relationshipGoal?: string;
  matchedAt: string;
}

interface MatchesTabProps {
  user: UserData;
}

export function MatchesTab({ user }: MatchesTabProps) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalMatches, setTotalMatches] = useState(0);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const res = await apiFetch(`/swipe/admin/matches/${user._id}`);
        
        if (!res.ok) {
          throw new Error("Failed to fetch matches");
        }
        
        const data = await res.json();
        setMatches(data.items || []);
        setTotalMatches(data.total || 0);
      } catch (err: any) {
        console.error("Error fetching matches:", err);
        setError(err.message || "Failed to load matches");
      } finally {
        setLoading(false);
      }
    };

    if (user._id) fetchMatches();
  }, [user._id]);

  // Loading State
  if (loading) {
    return (
      <div className="py-12 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full mb-4">
          <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Matches</h3>
        <p className="text-gray-500">Fetching active matches for {user.firstName}...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-medium text-red-800 mb-2">
              Unable to load matches
            </h3>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty State
  if (matches.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-block p-6 bg-gray-50 rounded-2xl">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No Active Matches</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {user.firstName} doesn't have any active matches at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Active Matches</h3>
          <p className="text-sm text-gray-600 mt-1">
            Total matches: <span className="font-semibold">{totalMatches}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
          <Heart className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-700">
            {totalMatches} Matches
          </span>
        </div>
      </div>

      {/* Matches List */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {matches.map((match, index) => {
          const matchDate = new Date(match.matchedAt);
          const formattedDate = matchDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });
          const formattedTime = matchDate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div 
              key={match.matchId} 
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${index !== matches.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              {/* Profile Picture */}
              <div className="relative flex-shrink-0">
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  {match.coverPhoto ? (
                    <img
                      src={getImageUrl(match.coverPhoto)}
                      alt={`${match.firstName} ${match.lastName}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/400x400/3b82f6/ffffff?text=${match.firstName.charAt(0)}${match.lastName.charAt(0)}`;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>

              {/* Match Info */}
              <div className="flex-1 ml-4">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-medium text-gray-900">
                    {match.firstName} {match.lastName}, {match.age}
                  </h4>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                    Matched
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-1">
                  {/* Location */}
                  {(match.city || match.country) && (
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="text-xs">
                        {match.city || ""}
                        {match.city && match.country ? ", " : ""}
                        {match.country || ""}
                      </span>
                    </div>
                  )}

                  {/* Match Date */}
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="h-3.5 w-3.5" />
                    <span className="text-xs">{formattedDate}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
