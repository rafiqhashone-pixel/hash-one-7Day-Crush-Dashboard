"use client";

import { useState, useEffect } from "react";
import { UserData } from "@/types/user";
import { apiFetch } from "@/lib/apiFetch";
import { ChatsList } from "./ChatsTab/ChatsList";
import { ChatConversation } from "./ChatsTab/ChatConversation";

export interface ChatUser {
  _id: string;
  firstName: string;
  lastName: string;
  coverPhoto: string;
  isOnline: boolean;
}

export interface LastMessage {
  content: string;
  createdAt: string;
  senderId: string;
  messageType: string;
  mediaUrl: string | null;
  caption: string | null;
}

export interface Chat {
  matchId: string;
  otherUser: ChatUser;
  lastMessage: LastMessage | null; // Made nullable
  unreadCount: number;
  updatedAt: string;
}

export interface Message {
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

export interface Conversation {
  blockStatus: {
    isBlockedByYou: boolean;
    areYouBlockedByOther: boolean;
  };
  messages: Message[];
  totalMessages: number;
  currentPage: number;
  totalPages: number;
}

interface ChatsTabProps {
  user: UserData;
}

export function ChatsTab({ user }: ChatsTabProps) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingConversation, setLoadingConversation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch chat list
  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);
        const res = await apiFetch(`/chats/admin/${user._id}`);
        
        if (!res.ok) {
          throw new Error("Failed to fetch chats");
        }
        
        const data = await res.json();
        setChats(data || []);
      } catch (err: any) {
        console.error("Error fetching chats:", err);
        setError(err.message || "Failed to load chats");
      } finally {
        setLoading(false);
      }
    };

    if (user._id) {
      fetchChats();
    }
  }, [user._id]);

  // Fetch conversation when a chat is selected
  const fetchConversation = async (recipientId: string) => {
    try {
      setLoadingConversation(true);
      const res = await apiFetch(
        `/chats/admin/${user._id}/conversations/${recipientId}/messages?limit=50`
      );
      
      if (!res.ok) {
        throw new Error("Failed to fetch conversation");
      }
      
      const data = await res.json();
      setConversation(data);
    } catch (err: any) {
      console.error("Error fetching conversation:", err);
      setError(err.message || "Failed to load conversation");
    } finally {
      setLoadingConversation(false);
    }
  };

  const handleChatSelect = async (chat: Chat) => {
    setSelectedChat(chat);
    await fetchConversation(chat.otherUser._id);
  };

  const handleBackToList = () => {
    setSelectedChat(null);
    setConversation(null);
  };

  return (
    <div>
      {selectedChat ? (
        <ChatConversation
          chat={selectedChat}
          conversation={conversation}
          loading={loadingConversation}
          currentUserId={user._id}
          onBack={handleBackToList}
        />
      ) : (
        <ChatsList
          chats={chats}
          loading={loading}
          error={error}
          currentUserId={user._id}
          onChatSelect={handleChatSelect}
        />
      )}
    </div>
  );
}