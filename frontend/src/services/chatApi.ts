import type { ChatResponse, SendChatMessageParams } from "../types/chat";

const CHAT_API_URL = "http://127.0.0.1:8000/api/chat";

export async function sendChatMessage(
  params: SendChatMessageParams
): Promise<ChatResponse> {
  const response = await fetch(CHAT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: params.message,
      category: params.category,
      language: params.language
    })
  });

  if (!response.ok) {
    throw new Error("聊天接口请求失败，请稍后再试。");
  }

  return response.json() as Promise<ChatResponse>;
}
