"use client";

import { getImageUrl } from "@/utils/imageUtils";
import { MessageSquare, Users, Loader2, AlertCircle } from "lucide-react";

interface ChatUser {
  _id: string;
  firstName: string;
  lastName: string;
  coverPhoto: string;
  isOnline: boolean;
}

interface LastMessage {
  content: string;
  createdAt: string;
  senderId: string;
  messageType: string;
  mediaUrl: string | null;
  caption: string | null;
}

interface Chat {
  matchId: string;
  otherUser: ChatUser;
  lastMessage: LastMessage | null; // Nullable
  unreadCount: number;
  updatedAt: string;
}

interface ChatsListProps {
  chats: Chat[];
  loading: boolean;
  error: string | null;
  currentUserId: string;
  onChatSelect: (chat: Chat) => void;
}

export function ChatsList({ chats, loading, error, currentUserId, onChatSelect }: ChatsListProps) {
  
  const formatTime = (dateString: string | null | undefined) => {
    if (!dateString) return "Just now";
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
  };

  // Filter out chats with no messages
  const activeChats = chats.filter(chat => chat.lastMessage !== null);

  // Loading State
  if (loading) {
    return (
      <div className="py-12 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full mb-4">
          <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Chats</h3>
        <p className="text-gray-500">Fetching chat history...</p>
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
            <h3 className="text-lg font-medium text-red-800 mb-2">Unable to load chats</h3>
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
  if (activeChats.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-block p-6 bg-gray-50 rounded-2xl">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No Chats</h3>
          <p className="text-gray-500 max-w-md mx-auto">No active conversations found.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Chat Conversations</h3>
          <p className="text-sm text-gray-600 mt-1">
            Total conversations: <span className="font-semibold">{activeChats.length}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
          <MessageSquare className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-700">{activeChats.length} Conversations</span>
        </div>
      </div>

      {/* Chat List */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {activeChats.map((chat, index) => {
          const isUnread = chat.unreadCount > 0;
          const lastMessageTime = formatTime(chat.lastMessage?.createdAt);
          const isLastMessageFromUser = chat.lastMessage?.senderId === currentUserId;
          const senderName = isLastMessageFromUser ? chat.otherUser.firstName : "You";

          return (
            <div
              key={chat.matchId}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors cursor-pointer ${index !== activeChats.length - 1 ? "border-b border-gray-100" : ""}`}
              onClick={() => onChatSelect(chat)}
            >
              {/* Profile Picture */}
              <div className="relative flex-shrink-0">
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  {chat.otherUser.coverPhoto ? (
                    <img
                      src={getImageUrl(chat.otherUser.coverPhoto)}
                      alt={`${chat.otherUser.firstName} ${chat.otherUser.lastName}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/400x400/3b82f6/ffffff?text=${chat.otherUser.firstName.charAt(0)}${chat.otherUser.lastName.charAt(0)}`;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-gray-400" />
                    </div>
                  )}
                </div>
                {chat.otherUser.isOnline && (
                  <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 shadow-sm border-2 border-white">
                    <div className="h-2 w-2"></div>
                  </div>
                )}
              </div>

              {/* Chat Info */}
              <div className="flex-1 ml-4 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-900 truncate">
                      {chat.otherUser.firstName} {chat.otherUser.lastName}
                    </h4>
                  </div>
                  <span className="text-xs text-gray-500">{lastMessageTime}</span>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-600 truncate flex-1">
                    {chat.lastMessage?.content || "Media message"}
                  </p>
                  {isUnread && <div className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0"></div>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
