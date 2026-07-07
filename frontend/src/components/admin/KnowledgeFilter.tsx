const categories = [
  "",
  "在留手续",
  "生活指南",
  "工作·打工",
  "奖学金",
  "医疗保险",
  "税金",
  "学校生活",
  "紧急支援"
];

type KnowledgeFilterProps = {
  category: string;
  keyword: string;
  onCategoryChange: (category: string) => void;
  onKeywordChange: (keyword: string) => void;
  onSearch: () => void;
};

export function KnowledgeFilter({
  category,
  keyword,
  onCategoryChange,
  onKeywordChange,
  onSearch
}: KnowledgeFilterProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="grid gap-4 md:grid-cols-[14rem_1fr_auto] md:items-end">
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          分类
          <select
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#0b3a6f] focus:ring-2 focus:ring-[#0b3a6f]/15"
          >
            {categories.map((item) => (
              <option key={item || "all"} value={item}>
                {item || "全部分类"}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          搜索标题或关键词
          <input
            value={keyword}
            onChange={(event) => onKeywordChange(event.target.value)}
            placeholder="例如：打工、在留资格、保险"
            className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#0b3a6f] focus:ring-2 focus:ring-[#0b3a6f]/15"
          />
        </label>

        <button
          type="button"
          onClick={onSearch}
          className="rounded-md bg-[#0b3a6f] px-5 py-2 text-sm font-semibold text-white hover:bg-[#082d58]"
        >
          筛选
        </button>
      </div>
    </section>
  );
}
