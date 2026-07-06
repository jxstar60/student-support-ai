import { useState } from "react";
import { CategorySelector } from "../components/chat/CategorySelector";
import { ChatInput } from "../components/chat/ChatInput";
import { ChatMessageList } from "../components/chat/ChatMessageList";
import { ChatPageHeader } from "../components/chat/ChatPageHeader";
import { NoticePanel } from "../components/chat/NoticePanel";
import { sendChatMessage } from "../services/chatApi";
import type { ChatCategory, ChatMessage } from "../types/chat";

const initialMessage: ChatMessage = {
  id: "initial-assistant-message",
  role: "assistant",
  content:
    "您好，我是 Student Support AI。\n我可以帮助您查询在日留学生生活相关信息。\n请选择咨询分类，或直接输入您的问题。"
};

function createMessage(role: ChatMessage["role"], content: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    content
  };
}

export function ChatPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<ChatCategory | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit() {
    const messageText = inputValue.trim();

    if (!messageText || isLoading) {
      return;
    }

    setErrorMessage(null);
    setInputValue("");
    setMessages((currentMessages) => [
      ...currentMessages,
      createMessage("user", messageText)
    ]);
    setIsLoading(true);

    try {
      const response = await sendChatMessage({
        message: messageText,
        category: selectedCategory,
        language: "zh"
      });

      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage("assistant", response.reply)
      ]);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "请求失败，请确认后端服务是否正在运行。";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <ChatPageHeader />

      <section className="bg-white py-8 sm:py-10">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[15rem_1fr_18rem] lg:px-8">
          <CategorySelector
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <div className="border-b border-slate-200 bg-white px-4 py-3">
              <p className="text-sm font-semibold text-slate-950">
                当前咨询分类：
                <span className="text-[#0b3a6f]">
                  {selectedCategory ?? "未选择"}
                </span>
              </p>
            </div>

            <ChatMessageList messages={messages} isLoading={isLoading} />

            {errorMessage ? (
              <div className="border-t border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </div>
            ) : null}

            <ChatInput
              value={inputValue}
              isLoading={isLoading}
              onChange={setInputValue}
              onSubmit={handleSubmit}
            />
          </section>

          <NoticePanel />
        </div>
      </section>
    </>
  );
}
