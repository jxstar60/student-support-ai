export type ChatCategory =
  | "在留手续"
  | "生活指南"
  | "工作·打工"
  | "奖学金"
  | "医疗保险"
  | "税金"
  | "学校生活"
  | "紧急支援";

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

export type SendChatMessageParams = {
  message: string;
  category: ChatCategory | null;
  language: "zh";
};

export type ChatApiResponse = {
  reply: string;
  source: "mock" | "openai" | string;
};
