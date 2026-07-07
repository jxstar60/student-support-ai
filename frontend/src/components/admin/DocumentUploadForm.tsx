import { useState } from "react";
import type { DocumentUploadPayload } from "../../types/document";

const categories = [
  "在留手续",
  "生活指南",
  "工作·打工",
  "奖学金",
  "医疗保险",
  "税金",
  "学校生活",
  "紧急支援"
];

type DocumentUploadFormProps = {
  isUploading: boolean;
  onSubmit: (payload: DocumentUploadPayload) => void;
};

export function DocumentUploadForm({
  isUploading,
  onSubmit
}: DocumentUploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("生活指南");
  const [sourceName, setSourceName] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [keywords, setKeywords] = useState("");

  function handleSubmit() {
    if (!file) {
      return;
    }

    onSubmit({
      file,
      category,
      source_name: sourceName,
      source_url: sourceUrl,
      keywords
    });
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="mb-4 border-b border-slate-200 pb-3">
        <h2 className="text-base font-semibold text-slate-950">
          上传并导入知识库
        </h2>
      </div>

      <div className="grid gap-4">
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          文件选择（PDF / TXT，最大 10MB）
          <input
            type="file"
            accept=".pdf,.txt,application/pdf,text/plain"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          分类
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#0b3a6f] focus:ring-2 focus:ring-[#0b3a6f]/15"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            来源机构
            <input
              value={sourceName}
              onChange={(event) => setSourceName(event.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#0b3a6f] focus:ring-2 focus:ring-[#0b3a6f]/15"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            来源链接
            <input
              value={sourceUrl}
              onChange={(event) => setSourceUrl(event.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#0b3a6f] focus:ring-2 focus:ring-[#0b3a6f]/15"
            />
          </label>
        </div>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          关键词
          <input
            value={keywords}
            onChange={(event) => setKeywords(event.target.value)}
            placeholder="可选，使用逗号或顿号分隔"
            className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#0b3a6f] focus:ring-2 focus:ring-[#0b3a6f]/15"
          />
        </label>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!file || !sourceName || !sourceUrl || isUploading}
          className="w-fit rounded-md bg-[#0b3a6f] px-5 py-2 text-sm font-semibold text-white hover:bg-[#082d58] disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isUploading ? "导入中..." : "上传并导入知识库"}
        </button>
      </div>
    </section>
  );
}
