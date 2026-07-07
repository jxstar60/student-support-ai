import type { UploadedDocument } from "../../types/document";

type DocumentListProps = {
  documents: UploadedDocument[];
  isLoading: boolean;
  onDelete: (filename: string) => void;
};

export function DocumentList({
  documents,
  isLoading,
  onDelete
}: DocumentListProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-base font-semibold text-slate-950">
          已上传文件列表
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-600">
            <tr>
              <th className="px-4 py-3">文件名</th>
              <th className="px-4 py-3">分类</th>
              <th className="px-4 py-3">来源机构</th>
              <th className="px-4 py-3">导入条数</th>
              <th className="px-4 py-3">上传时间</th>
              <th className="px-4 py-3">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {isLoading ? (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan={6}>
                  正在加载文件列表...
                </td>
              </tr>
            ) : null}
            {!isLoading && documents.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan={6}>
                  暂无上传文件。
                </td>
              </tr>
            ) : null}
            {!isLoading
              ? documents.map((document) => (
                  <tr key={document.filename}>
                    <td className="px-4 py-4 font-semibold text-slate-950">
                      {document.filename}
                    </td>
                    <td className="px-4 py-4 text-[#0b3a6f]">
                      {document.category}
                    </td>
                    <td className="px-4 py-4 text-slate-700">
                      {document.source_name}
                    </td>
                    <td className="px-4 py-4 text-slate-700">
                      {document.chunks_created}
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      {new Date(document.uploaded_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => onDelete(document.filename)}
                        className="rounded-md border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
                      >
                        删除
                      </button>
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
