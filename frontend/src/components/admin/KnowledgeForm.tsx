import { useEffect, useState } from "react";
import type { KnowledgeItem, KnowledgePayload } from "../../types/knowledge";

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

const emptyForm: KnowledgePayload = {
  category: "生活指南",
  title: "",
  content: "",
  source_name: "",
  source_url: "",
  keywords: [],
  document_filename: null
};

type KnowledgeFormProps = {
  editingItem: KnowledgeItem | null;
  isSaving: boolean;
  onSubmit: (payload: KnowledgePayload) => void;
  onCancelEdit: () => void;
};

export function KnowledgeForm({
  editingItem,
  isSaving,
  onSubmit,
  onCancelEdit
}: KnowledgeFormProps) {
  const [formValue, setFormValue] = useState<KnowledgePayload>(emptyForm);
  const [keywordsText, setKeywordsText] = useState("");

  useEffect(() => {
    if (editingItem) {
      setFormValue(editingItem);
      setKeywordsText(editingItem.keywords.join("、"));
    } else {
      setFormValue(emptyForm);
      setKeywordsText("");
    }
  }, [editingItem]);

  function updateField(
    field: Exclude<keyof KnowledgePayload, "keywords">,
    value: string
  ) {
    setFormValue((currentValue) => ({
      ...currentValue,
      [field]: value
    }));
  }

  function handleSubmit() {
    onSubmit({
      ...formValue,
      keywords: keywordsText
        .split(/[,，、\n]/)
        .map((keyword) => keyword.trim())
        .filter(Boolean)
    });
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="mb-4 border-b border-slate-200 pb-3">
        <h2 className="text-base font-semibold text-slate-950">
          {editingItem ? "编辑知识" : "新增知识"}
        </h2>
      </div>

      <div className="grid gap-4">
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          分类
          <select
            value={formValue.category}
            onChange={(event) => updateField("category", event.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#0b3a6f] focus:ring-2 focus:ring-[#0b3a6f]/15"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          标题
          <input
            value={formValue.title}
            onChange={(event) => updateField("title", event.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#0b3a6f] focus:ring-2 focus:ring-[#0b3a6f]/15"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          内容
          <textarea
            value={formValue.content}
            rows={5}
            onChange={(event) => updateField("content", event.target.value)}
            className="resize-none rounded-md border border-slate-300 px-3 py-2 text-sm leading-6 outline-none focus:border-[#0b3a6f] focus:ring-2 focus:ring-[#0b3a6f]/15"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            来源机构
            <input
              value={formValue.source_name}
              onChange={(event) =>
                updateField("source_name", event.target.value)
              }
              className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#0b3a6f] focus:ring-2 focus:ring-[#0b3a6f]/15"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            来源链接
            <input
              value={formValue.source_url}
              onChange={(event) => updateField("source_url", event.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#0b3a6f] focus:ring-2 focus:ring-[#0b3a6f]/15"
            />
          </label>
        </div>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          关键词
          <input
            value={keywordsText}
            onChange={(event) => setKeywordsText(event.target.value)}
            placeholder="使用逗号或顿号分隔"
            className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#0b3a6f] focus:ring-2 focus:ring-[#0b3a6f]/15"
          />
        </label>

        {formValue.document_filename ? (
          <p className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
            来源文件：{formValue.document_filename}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSaving}
            className="rounded-md bg-[#0b3a6f] px-5 py-2 text-sm font-semibold text-white hover:bg-[#082d58] disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isSaving ? "保存中" : editingItem ? "保存修改" : "新增知识"}
          </button>
          {editingItem ? (
            <button
              type="button"
              onClick={onCancelEdit}
              className="rounded-md border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              取消编辑
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
