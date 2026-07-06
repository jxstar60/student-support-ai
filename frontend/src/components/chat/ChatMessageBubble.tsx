import type { ChatMessage } from "../../types/chat";

type ChatMessageBubbleProps = {
  message: ChatMessage;
};

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-lg px-4 py-3 text-sm leading-6 sm:max-w-[75%] ${
          isUser
            ? "bg-[#0b3a6f] text-white"
            : "border border-slate-200 bg-white text-slate-800"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
