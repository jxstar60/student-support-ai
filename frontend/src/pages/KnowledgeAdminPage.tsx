import { useCallback, useEffect, useState } from "react";
import { KnowledgeFilter } from "../components/admin/KnowledgeFilter";
import { KnowledgeForm } from "../components/admin/KnowledgeForm";
import { KnowledgeTable } from "../components/admin/KnowledgeTable";
import {
  createKnowledge,
  deleteKnowledge,
  fetchKnowledgeList,
  updateKnowledge
} from "../services/knowledgeApi";
import type { KnowledgeItem, KnowledgePayload } from "../types/knowledge";

export function KnowledgeAdminPage() {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [editingItem, setEditingItem] = useState<KnowledgeItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const loadKnowledge = useCallback(async () => {
    setIsLoading(true);
    setMessage(null);
    try {
      const result = await fetchKnowledgeList({ category, keyword });
      setItems(result);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "知识库加载失败。");
    } finally {
      setIsLoading(false);
    }
  }, [category, keyword]);

  useEffect(() => {
    void loadKnowledge();
  }, [loadKnowledge]);

  async function handleSubmit(payload: KnowledgePayload) {
    setIsSaving(true);
    setMessage(null);
    try {
      if (editingItem) {
        await updateKnowledge(editingItem.id, payload);
        setMessage("知识已更新。");
      } else {
        await createKnowledge(payload);
        setMessage("知识已新增。");
      }
      setEditingItem(null);
      await loadKnowledge();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "保存失败。");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(item: KnowledgeItem) {
    if (!window.confirm(`确认删除「${item.title}」吗？`)) {
      return;
    }

    setMessage(null);
    try {
      await deleteKnowledge(item.id);
      setMessage("知识已删除。");
      await loadKnowledge();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "删除失败。");
    }
  }

  return (
    <section className="bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 border-b border-slate-200 pb-5">
          <p className="text-sm font-semibold text-[#0b3a6f]">
            Admin / Knowledge Base
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-normal text-slate-950">
            知识库管理
          </h1>
          <p className="mt-3 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            当前为开发演示版本，知识库管理功能暂未设置登录权限。
          </p>
        </div>

        <div className="grid gap-6">
          <KnowledgeFilter
            category={category}
            keyword={keyword}
            onCategoryChange={setCategory}
            onKeywordChange={setKeyword}
            onSearch={loadKnowledge}
          />

          {message ? (
            <div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {message}
            </div>
          ) : null}

          <div className="grid gap-6 xl:grid-cols-[1fr_26rem] xl:items-start">
            <KnowledgeTable
              items={items}
              isLoading={isLoading}
              onEdit={setEditingItem}
              onDelete={handleDelete}
            />
            <KnowledgeForm
              editingItem={editingItem}
              isSaving={isSaving}
              onSubmit={handleSubmit}
              onCancelEdit={() => setEditingItem(null)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
