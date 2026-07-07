import type { KnowledgeItem, KnowledgePayload } from "../types/knowledge";

const KNOWLEDGE_API_URL = "http://127.0.0.1:8000/api/knowledge";

type FetchKnowledgeListParams = {
  category?: string;
  keyword?: string;
};

export async function fetchKnowledgeList(
  params: FetchKnowledgeListParams = {}
): Promise<KnowledgeItem[]> {
  const searchParams = new URLSearchParams();

  if (params.category) {
    searchParams.set("category", params.category);
  }

  if (params.keyword) {
    searchParams.set("keyword", params.keyword);
  }

  const url = searchParams.toString()
    ? `${KNOWLEDGE_API_URL}?${searchParams.toString()}`
    : KNOWLEDGE_API_URL;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("知识库列表获取失败。");
  }

  return response.json() as Promise<KnowledgeItem[]>;
}

export async function createKnowledge(
  payload: KnowledgePayload
): Promise<KnowledgeItem> {
  const response = await fetch(KNOWLEDGE_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("知识新增失败。");
  }

  return response.json() as Promise<KnowledgeItem>;
}

export async function updateKnowledge(
  knowledgeId: string,
  payload: KnowledgePayload
): Promise<KnowledgeItem> {
  const response = await fetch(`${KNOWLEDGE_API_URL}/${knowledgeId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("知识编辑失败。");
  }

  return response.json() as Promise<KnowledgeItem>;
}

export async function deleteKnowledge(knowledgeId: string): Promise<void> {
  const response = await fetch(`${KNOWLEDGE_API_URL}/${knowledgeId}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("知识删除失败。");
  }
}
