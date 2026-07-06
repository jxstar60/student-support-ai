import type { ChatCategory } from "../../types/chat";

const categories: ChatCategory[] = [
  "在留手续",
  "生活指南",
  "工作·打工",
  "奖学金",
  "医疗保险",
  "税金",
  "学校生活",
  "紧急支援"
];

type CategorySelectorProps = {
  selectedCategory: ChatCategory | null;
  onSelectCategory: (category: ChatCategory) => void;
};

export function CategorySelector({
  selectedCategory,
  onSelectCategory
}: CategorySelectorProps) {
  return (
    <aside className="rounded-lg border border-slate-200 bg-white p-4">
      <h2 className="text-base font-semibold text-slate-950">咨询分类</h2>
      <div className="mt-4 grid gap-2">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
              className={`rounded-md border px-3 py-2 text-left text-sm font-medium ${
                isSelected
                  ? "border-[#0b3a6f] bg-[#0b3a6f] text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-[#0b3a6f] hover:text-[#0b3a6f]"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
