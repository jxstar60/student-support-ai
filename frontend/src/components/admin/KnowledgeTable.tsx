import type { KnowledgeItem } from "../../types/knowledge";

type KnowledgeTableProps = {
  items: KnowledgeItem[];
  isLoading: boolean;
  onEdit: (item: KnowledgeItem) => void;
  onDelete: (item: KnowledgeItem) => void;
};

export function KnowledgeTable({
  items,
  isLoading,
  onEdit,
  onDelete
}: KnowledgeTableProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-base font-semibold text-slate-950">知识库列表</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-600">
            <tr>
              <th className="px-4 py-3">分类</th>
              <th className="px-4 py-3">标题</th>
              <th className="px-4 py-3">来源</th>
              <th className="px-4 py-3">关键词</th>
              <th className="px-4 py-3">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {isLoading ? (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan={5}>
                  正在加载知识库...
                </td>
              </tr>
            ) : null}

            {!isLoading && items.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan={5}>
                  暂无匹配知识。
                </td>
              </tr>
            ) : null}

            {!isLoading
              ? items.map((item) => (
                  <tr key={item.id} className="align-top">
                    <td className="whitespace-nowrap px-4 py-4 font-medium text-[#0b3a6f]">
                      {item.category}
                    </td>
                    <td className="min-w-64 px-4 py-4">
                      <p className="font-semibold text-slate-950">
                        {item.title}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-600">
                        {item.content}
                      </p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-slate-700">
                      {item.source_name}
                    </td>
                    <td className="min-w-56 px-4 py-4 text-xs text-slate-600">
                      {item.keywords.join("、")}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => onEdit(item)}
                          className="rounded-md border border-[#0b3a6f] px-3 py-1.5 text-xs font-semibold text-[#0b3a6f] hover:bg-slate-50"
                        >
                          编辑
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(item)}
                          className="rounded-md border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
