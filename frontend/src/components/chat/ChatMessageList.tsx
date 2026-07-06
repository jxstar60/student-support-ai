import { useEffect, useRef } from "react";
import type { ChatMessage } from "../../types/chat";
import { ChatMessageBubble } from "./ChatMessageBubble";

type ChatMessageListProps = {
  messages: ChatMessage[];
  isLoading: boolean;
};

export function ChatMessageList({ messages, isLoading }: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="h-[28rem] overflow-y-auto border-y border-slate-200 bg-slate-50 px-4 py-5">
      <div className="space-y-4">
        {messages.map((message) => (
          <ChatMessageBubble key={message.id} message={message} />
        ))}
        {isLoading ? (
          <div className="flex justify-start">
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
              正在生成回复...
            </div>
          </div>
        ) : null}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
