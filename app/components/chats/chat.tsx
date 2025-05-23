"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type Message = {
  id: string;
  conversation_id: string;
  senders_id: string;
  content: string;
  created_at: string;
  profiles?: {
    id: string;
    username?: string;
    avatar_url?: string;
  };
};


export default function Chat({ conversationId }: { conversationId: string }) {
  const { data: session } = useSession();
  const myId = (session?.user as any)?.id as string | undefined;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const supabase = createClientComponentClient();

  // Fetch messages + subscribe for realtime updates
  useEffect(() => {
    if (!conversationId) return;

    let ignore = false;

    async function fetchMessages() {
      const { data, error } = await supabase
        .from("realtimemessages")
        .select("*, profiles(id, username, avatar_url)")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (!ignore && data) setMessages(data);

      if (error) {
        console.error("Error fetching messages:", JSON.stringify(error, null, 2));
      }
    }

    fetchMessages();

    const channel = supabase
      .channel(`chat:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "realtimemessages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        async (payload) => {
          // Fetch new message with sender profile
          const messageId = payload.new.id;
          const { data, error } = await supabase
            .from("realtimemessages")
            .select("*, profiles(id, username, avatar_url)")
            .eq("id", messageId)
            .single();

          if (error) {
            console.error("Error fetching new message:", error);
            return;
          }

          if (data) {
            setMessages((prev) => [...prev, data]);
          }
        }
      )
      .subscribe();

    return () => {
      ignore = true;
      supabase.removeChannel(channel);
    };
  }, [conversationId, supabase]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const updateConversationLastMessage = async (content: string) => {
    const { error } = await supabase
      .from("conversations")
      .update({
        last_message: content,
        last_message_time: new Date().toISOString(),
      })
      .eq("id", conversationId);

    if (error) {
      console.error("Failed to update conversation last message:", error);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !myId || sending) return;
    setSending(true);

    const { error } = await supabase
      .from("realtimemessages")
      .insert([{ conversation_id: conversationId, senders_id: myId, content: input }]);

    if (error) {
      alert("Error sending message: " + (error.message || JSON.stringify(error)));
      console.error("Supabase error:", error);
    } else {
      setInput("");
      await updateConversationLastMessage(input);
    }

    setSending(false);
  };

  return (
    <div className="flex flex-col h-screen bg-[#f0f2f5]">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 && (
          <div className="text-center text-gray-400">No messages yet. Say hi!</div>
        )}
        {messages.map((msg) => {
          const isMe = msg.senders_id === myId;
          return (
            <div
              key={msg.id}
              className={`flex items-end ${isMe ? "justify-end" : "justify-start"}`}
            >
              {!isMe && (
                <img
                  src={msg.profiles?.avatar_url || "/default-avatar.png"}
                  alt={msg.profiles?.username || "User"}
                  className="w-8 h-8 rounded-full mr-2 border"
                />
              )}
              <div
                className={`relative max-w-xs px-4 py-1 rounded-2xl shadow
                  ${isMe
                    ? "bg-green-500 text-white rounded-br-none"
                    : "bg-white text-gray-900 rounded-bl-none border"
                  }`}
              >
                {!isMe && (
                  <div className="text-xs font-semibold text-green-700 mb-1">
                    {msg.profiles?.username || "Unknown"}
                  </div>
                )}
                <div>{msg.content}</div>
                <div className="text-[10px] text-gray-400 text-right mt-1">
                  {new Date(msg.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <span
                  className={`absolute bottom-0 ${
                    isMe
                      ? "right-0 w-2 h-2 bg-green-500 rounded-br"
                      : "left-0 w-2 h-2 bg-white border-l border-b"
                  }`}
                  style={{
                    clipPath: isMe
                      ? "polygon(100% 0, 0 100%, 100% 100%)"
                      : "polygon(0 0, 100% 100%, 0 100%)",
                  }}
                />
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t bg-white flex gap-2 sticky bottom-0">
        <input
          className="flex-1 text-black focus:outline-none border rounded-full px-4 py-2 bg-gray-100"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message"
          disabled={sending}
        />
        <button
          onClick={handleSend}
          className="bg-green-500 hover:bg-green-600 transition text-white px-6 py-2 rounded-full font-semibold shadow"
          disabled={sending || !input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}
