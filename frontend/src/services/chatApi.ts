import API_BASE_URL from "../config/api";
import type {
  ChatResponse,
  ChatSession,
  ChatSessionDetail,
  FeedbackRequest,
  SendChatMessageParams
} from "../types/chat";

const CHAT_API_BASE_URL = `${API_BASE_URL}/api/chat`;
const SERVICE_UNAVAILABLE_MESSAGE =
  "当前服务暂时不可用，请确认后端服务是否已启动。";

async function getErrorMessage(
  response: Response,
  fallback: string
): Promise<string> {
  const error = await response.json().catch(() => null);
  return typeof error?.detail === "string" ? error.detail : fallback;
}

export async function createChatSession(): Promise<ChatSession> {
  const response = await fetch(`${CHAT_API_BASE_URL}/sessions`, {
    method: "POST"
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, "新建咨询失败。"));
  }

  return response.json() as Promise<ChatSession>;
}

export async function fetchChatSessions(): Promise<ChatSession[]> {
  const response = await fetch(`${CHAT_API_BASE_URL}/sessions`);

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, "聊天历史获取失败。"));
  }

  return response.json() as Promise<ChatSession[]>;
}

export async function fetchChatSession(
  sessionId: string
): Promise<ChatSessionDetail> {
  const response = await fetch(`${CHAT_API_BASE_URL}/sessions/${sessionId}`);

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, "聊天记录获取失败。"));
  }

  return response.json() as Promise<ChatSessionDetail>;
}

export async function deleteChatSession(sessionId: string): Promise<void> {
  const response = await fetch(`${CHAT_API_BASE_URL}/sessions/${sessionId}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, "聊天会话删除失败。"));
  }
}

export async function sendChatMessage(
  params: SendChatMessageParams
): Promise<ChatResponse> {
  try {
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
      throw new Error(await getErrorMessage(response, SERVICE_UNAVAILABLE_MESSAGE));
    }

    return response.json() as Promise<ChatResponse>;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(SERVICE_UNAVAILABLE_MESSAGE);
  }
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
    throw new Error(await getErrorMessage(response, "反馈提交失败。"));
  }

  return response.json() as Promise<{ success: boolean }>;
}
