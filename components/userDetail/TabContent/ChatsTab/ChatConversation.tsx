"use client";

import { useRouter } from "next/navigation";
import { getImageUrl } from "@/utils/imageUtils";
import { 
  ChevronLeft, 
  Loader2, 
  Users,
  MoreVertical,
  MessageSquare
} from "lucide-react";

interface ChatUser {
  _id: string;
  firstName: string;
  lastName: string;
  coverPhoto: string;
  isOnline: boolean;
}

interface Message {
  _id: string;
  matchId: string;
  senderId: string;
  recipientId: string;
  content: string;
  messageType: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

interface Chat {
  matchId: string;
  otherUser: ChatUser;
  lastMessage: any;
  unreadCount: number;
  updatedAt: string;
}

interface Conversation {
  blockStatus: {
    isBlockedByYou: boolean;
    areYouBlockedByOther: boolean;
  };
  messages: Message[];
  totalMessages: number;
  currentPage: number;
  totalPages: number;
}

interface ChatConversationProps {
  chat: Chat;
  conversation: Conversation | null;
  loading: boolean;
  currentUserId: string;
  onBack: () => void;
}

export function ChatConversation({ 
  chat, 
  conversation, 
  loading, 
  currentUserId,
  onBack,
}: ChatConversationProps) {

  const router = useRouter();

  const getMessageSenderName = (message: Message) => {
    // If sender is the user we're monitoring, show their name
    if (message.senderId === currentUserId) {
      return `${chat.otherUser.firstName}:`;
    }
    return "";
  };

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-xl border border-gray-200 overflow-hidden">
      
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>

          {/* CLICKABLE AVATAR */}
          <div
            className="relative cursor-pointer"
            title="View user details"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/userList/${chat.otherUser._id}`);
            }}
          >
            <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow-sm hover:opacity-90 transition">
              {chat.otherUser.coverPhoto ? (
                <img
                  src={getImageUrl(chat.otherUser.coverPhoto)}
                  alt={`${chat.otherUser.firstName} ${chat.otherUser.lastName}`}
                  className="w-full h-full object-cover"
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

          <div>
            <h3 className="font-semibold text-gray-900">
              {chat.otherUser.firstName} {chat.otherUser.lastName}
            </h3>
            <p className="text-xs text-gray-500">
              {chat.otherUser.isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
          <MoreVertical className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
          </div>
        ) : conversation && conversation.messages.length > 0 ? (
          conversation.messages.map((message) => {
            const isFromUser = message.senderId === currentUserId;
            const messageTime = new Date(message.createdAt).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            });
            const senderName = getMessageSenderName(message);

            return (
              <div
                key={message._id}
                className={`flex ${isFromUser ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-xs md:max-w-md rounded-2xl px-4 py-2 ${
                    isFromUser
                      ? "bg-gray-100 text-gray-900 rounded-bl-none"
                      : "bg-blue-500 text-white rounded-br-none"
                  }`}
                >
                  <div className="text-xs font-medium mb-1 opacity-75">
                    {senderName}
                  </div>
                  <p className="text-sm">{message.content}</p>
                  <div
                    className={`flex items-center justify-end gap-1 mt-1 ${
                      isFromUser ? "text-gray-500" : "text-blue-200"
                    }`}
                  >
                    <span className="text-xs">{messageTime}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No messages yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Monitoring chat between users
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
