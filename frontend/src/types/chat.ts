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

export type Reference = {
  title: string;
  source_name: string;
  source_url: string;
};

export type ChatSource = "knowledge";

export type ChatSession = {
  id: string;
  title: string;
  created_at: string;
  updated_at?: string;
};

export type ChatMessage = {
  id: string;
  session_id: string;
  role: ChatRole;
  content: string;
  category?: string;
  source?: ChatSource;
  created_at: string;
  references?: Reference[];
};

export type ChatSessionDetail = ChatSession & {
  messages: ChatMessage[];
};

export type SendChatMessageParams = {
  message: string;
  category: ChatCategory | null;
  language: "zh";
  session_id?: string | null;
};

export type ChatResponse = {
  session_id: string;
  message_id: string;
  reply: string;
  source: ChatSource;
  references: Reference[];
};

export type FeedbackRequest = {
  message_id: string;
  rating: "up" | "down";
  comment?: string;
};
