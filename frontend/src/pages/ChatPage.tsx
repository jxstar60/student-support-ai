import { useCallback, useEffect, useState } from "react";
import { CategorySelector } from "../components/chat/CategorySelector";
import { ChatHistorySidebar } from "../components/chat/ChatHistorySidebar";
import { ChatInput } from "../components/chat/ChatInput";
import { ChatMessageList } from "../components/chat/ChatMessageList";
import { ChatPageHeader } from "../components/chat/ChatPageHeader";
import { NoticePanel } from "../components/chat/NoticePanel";
import {
  createChatSession,
  deleteChatSession,
  fetchChatSession,
  fetchChatSessions,
  sendChatMessage,
  submitFeedback
} from "../services/chatApi";
import type {
  ChatCategory,
  ChatMessage,
  ChatSession,
  ChatSource,
  Reference
} from "../types/chat";

const initialMessage: ChatMessage = {
  id: "initial-assistant-message",
  session_id: "",
  role: "assistant",
  content:
    "您好，我是 Student Support AI。\n我可以帮助您查询在日留学生生活相关信息。\n请选择咨询分类，或直接输入您的问题。",
  created_at: new Date().toISOString()
};

function createLocalMessage(
  role: ChatMessage["role"],
  content: string,
  options?: {
    sessionId?: string | null;
    source?: ChatSource;
    references?: Reference[];
    messageId?: string;
    category?: string | null;
  }
): ChatMessage {
  return {
    id:
      options?.messageId ??
      `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    session_id: options?.sessionId ?? "",
    role,
    content,
    category: options?.category ?? undefined,
    source: options?.source,
    references: options?.references,
    created_at: new Date().toISOString()
  };
}

export function ChatPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<ChatCategory | null>(null);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState<Record<string, string>>(
    {}
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadSessions = useCallback(async () => {
    setIsHistoryLoading(true);
    try {
      const result = await fetchChatSessions();
      setSessions(result);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "聊天历史加载失败。"
      );
    } finally {
      setIsHistoryLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadSessions();
  }, [loadSessions]);

  async function handleCreateSession() {
    setErrorMessage(null);
    try {
      const session = await createChatSession();
      setCurrentSessionId(session.id);
      setMessages([{ ...initialMessage, created_at: new Date().toISOString() }]);
      setFeedbackStatus({});
      await loadSessions();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "新建咨询失败。");
    }
  }

  async function handleSelectSession(sessionId: string) {
    setErrorMessage(null);
    try {
      const session = await fetchChatSession(sessionId);
      setCurrentSessionId(session.id);
      setMessages(
        session.messages.length > 0
          ? session.messages
          : [{ ...initialMessage, session_id: session.id }]
      );
      setFeedbackStatus({});
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "聊天记录获取失败。");
    }
  }

  async function handleDeleteSession(sessionId: string) {
    if (!window.confirm("确认删除这个咨询记录吗？")) {
      return;
    }

    setErrorMessage(null);
    try {
      await deleteChatSession(sessionId);

      if (currentSessionId === sessionId) {
        setCurrentSessionId(null);
        setMessages([{ ...initialMessage, created_at: new Date().toISOString() }]);
        setFeedbackStatus({});
      }

      await loadSessions();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "聊天会话删除失败。");
    }
  }

  async function handleSubmit() {
    const messageText = inputValue.trim();

    if (!messageText || isLoading) {
      return;
    }

    setErrorMessage(null);
    setInputValue("");
    setMessages((currentMessages) => [
      ...currentMessages,
      createLocalMessage("user", messageText, {
        sessionId: currentSessionId,
        category: selectedCategory
      })
    ]);
    setIsLoading(true);

    try {
      const response = await sendChatMessage({
        message: messageText,
        category: selectedCategory,
        language: "zh",
        session_id: currentSessionId
      });

      setCurrentSessionId(response.session_id);
      setMessages((currentMessages) => [
        ...currentMessages,
        createLocalMessage("assistant", response.reply, {
          sessionId: response.session_id,
          messageId: response.message_id,
          source: response.source,
          references: response.references,
          category: selectedCategory
        })
      ]);
      await loadSessions();
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

  async function handleFeedback(messageId: string, rating: "up" | "down") {
    try {
      await submitFeedback({ message_id: messageId, rating, comment: "" });
      setFeedbackStatus((currentStatus) => ({
        ...currentStatus,
        [messageId]: rating
      }));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "反馈提交失败。");
    }
  }

  return (
    <>
      <ChatPageHeader />

      <section className="bg-white py-8 sm:py-10">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[18rem_1fr_18rem] lg:px-8">
          <div className="grid content-start gap-4">
            <ChatHistorySidebar
              sessions={sessions}
              activeSessionId={currentSessionId}
              isLoading={isHistoryLoading}
              onCreateSession={handleCreateSession}
              onSelectSession={handleSelectSession}
              onDeleteSession={handleDeleteSession}
            />
            <CategorySelector
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <div className="border-b border-slate-200 bg-white px-4 py-3">
              <p className="text-sm font-semibold text-slate-950">
                当前咨询分类：
                <span className="text-[#0b3a6f]">
                  {selectedCategory ?? "未选择"}
                </span>
              </p>
            </div>

            <ChatMessageList
              messages={messages}
              isLoading={isLoading}
              feedbackStatus={feedbackStatus}
              onFeedback={handleFeedback}
            />

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
