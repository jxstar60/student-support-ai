export type KnowledgeItem = {
  id: string;
  category: string;
  title: string;
  content: string;
  source_name: string;
  source_url: string;
  keywords: string[];
  document_filename?: string | null;
};

export type KnowledgePayload = {
  id?: string;
  category: string;
  title: string;
  content: string;
  source_name: string;
  source_url: string;
  keywords: string[];
  document_filename?: string | null;
};
