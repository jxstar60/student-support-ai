import type {
  ChatResponse,
  ChatSession,
  ChatSessionDetail,
  FeedbackRequest,
  SendChatMessageParams
} from "../types/chat";

const CHAT_API_BASE_URL = "http://127.0.0.1:8000/api/chat";

export async function createChatSession(): Promise<ChatSession> {
  const response = await fetch(`${CHAT_API_BASE_URL}/sessions`, {
    method: "POST"
  });

  if (!response.ok) {
    throw new Error("新建咨询失败。");
  }

  return response.json() as Promise<ChatSession>;
}

export async function fetchChatSessions(): Promise<ChatSession[]> {
  const response = await fetch(`${CHAT_API_BASE_URL}/sessions`);

  if (!response.ok) {
    throw new Error("聊天历史获取失败。");
  }

  return response.json() as Promise<ChatSession[]>;
}

export async function fetchChatSession(
  sessionId: string
): Promise<ChatSessionDetail> {
  const response = await fetch(`${CHAT_API_BASE_URL}/sessions/${sessionId}`);

  if (!response.ok) {
    throw new Error("聊天记录获取失败。");
  }

  return response.json() as Promise<ChatSessionDetail>;
}

export async function deleteChatSession(sessionId: string): Promise<void> {
  const response = await fetch(`${CHAT_API_BASE_URL}/sessions/${sessionId}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("聊天会话删除失败。");
  }
}

export async function sendChatMessage(
  params: SendChatMessageParams
): Promise<ChatResponse> {
  const response = await fetch(CHAT_API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: params.message,
      category: params.category,
      language: params.language,
      session_id: params.session_id
    })
  });

  if (!response.ok) {
    throw new Error("聊天接口请求失败，请稍后再试。");
  }

  return response.json() as Promise<ChatResponse>;
}

export async function submitFeedback(
  payload: FeedbackRequest
): Promise<{ success: boolean }> {
  const response = await fetch(`${CHAT_API_BASE_URL}/feedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("反馈提交失败。");
  }

  return response.json() as Promise<{ success: boolean }>;
}
