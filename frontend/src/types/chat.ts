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

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  source?: ChatSource;
  references?: Reference[];
};

export type SendChatMessageParams = {
  message: string;
  category: ChatCategory | null;
  language: "zh";
};

export type ChatResponse = {
  reply: string;
  source: ChatSource;
  references: Reference[];
};
