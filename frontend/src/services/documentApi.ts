import type {
  DocumentUploadPayload,
  DocumentUploadResponse,
  UploadedDocument
} from "../types/document";

const DOCUMENT_API_URL = "http://127.0.0.1:8000/api/documents";

export async function uploadDocument(
  payload: DocumentUploadPayload
): Promise<DocumentUploadResponse> {
  const formData = new FormData();
  formData.append("file", payload.file);
  formData.append("category", payload.category);
  formData.append("source_name", payload.source_name);
  formData.append("source_url", payload.source_url);
  formData.append("keywords", payload.keywords);

  const response = await fetch(`${DOCUMENT_API_URL}/upload`, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    const detail =
      typeof error?.detail === "string" ? error.detail : "资料上传失败";
    throw new Error(`上传失败：${detail}`);
  }

  return response.json() as Promise<DocumentUploadResponse>;
}

export async function fetchDocuments(): Promise<UploadedDocument[]> {
  const response = await fetch(DOCUMENT_API_URL);

  if (!response.ok) {
    throw new Error("上传文件列表获取失败。");
  }

  return response.json() as Promise<UploadedDocument[]>;
}

export async function deleteDocument(filename: string): Promise<void> {
  const response = await fetch(
    `${DOCUMENT_API_URL}/${encodeURIComponent(filename)}`,
    {
      method: "DELETE"
    }
  );

  if (!response.ok) {
    throw new Error("上传文件删除失败。");
  }
}
