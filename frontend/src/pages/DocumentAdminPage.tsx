import { useCallback, useEffect, useState } from "react";
import { DocumentList } from "../components/admin/DocumentList";
import { DocumentUploadForm } from "../components/admin/DocumentUploadForm";
import {
  deleteDocument,
  fetchDocuments,
  uploadDocument
} from "../services/documentApi";
import type {
  DocumentUploadPayload,
  DocumentUploadResponse,
  UploadedDocument
} from "../types/document";

export function DocumentAdminPage() {
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [uploadResult, setUploadResult] =
    useState<DocumentUploadResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const loadDocuments = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await fetchDocuments();
      setDocuments(result);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "文件列表加载失败。");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDocuments();
  }, [loadDocuments]);

  async function handleUpload(payload: DocumentUploadPayload) {
    setIsUploading(true);
    setMessage(null);
    setUploadResult(null);

    try {
      const result = await uploadDocument(payload);
      setUploadResult(result);
      setMessage("资料已导入知识库。");
      await loadDocuments();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "上传失败：资料上传失败"
      );
    } finally {
      setIsUploading(false);
    }
  }

  async function handleDelete(filename: string) {
    if (!window.confirm(`确认删除“${filename}”吗？`)) {
      return;
    }

    try {
      await deleteDocument(filename);
      setMessage("上传文件已删除。已导入知识库的内容不会自动删除。");
      await loadDocuments();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "文件删除失败。");
    }
  }

  return (
    <section className="bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 border-b border-slate-200 pb-5">
          <p className="text-sm font-semibold text-[#0b3a6f]">
            Admin / Documents
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-normal text-slate-950">
            官方资料导入
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            上传 PDF 或 TXT 格式的官方资料，系统会将文本内容转换为本地知识库，用于 AI 咨询检索。
          </p>
        </div>

        <div className="mb-6 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800">
          当前为开发演示版本。请只上传公开资料或自己有权使用的资料。上传内容会被解析并写入本地知识库。
        </div>

        {message ? (
          <div className="mb-6 rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            {message}
          </div>
        ) : null}

        {uploadResult ? (
          <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            <p className="font-semibold">上传结果</p>
            <p className="mt-2">文件名：{uploadResult.filename}</p>
            <p>分类：{uploadResult.category}</p>
            <p>成功导入：{uploadResult.chunks_created} 条知识</p>
          </div>
        ) : null}

        <div className="grid gap-6">
          <DocumentUploadForm
            isUploading={isUploading}
            onSubmit={handleUpload}
          />
          <DocumentList
            documents={documents}
            isLoading={isLoading}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </section>
  );
}
