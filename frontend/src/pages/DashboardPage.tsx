import { useEffect, useState } from "react";
import { fetchDashboardStats } from "../services/dashboardApi";
import type { DashboardStats } from "../types/dashboard";

const emptyStats: DashboardStats = {
  total_sessions: 0,
  total_messages: 0,
  total_feedback: 0,
  positive_feedback: 0,
  negative_feedback: 0,
  category_stats: []
};

export function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>(emptyStats);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const result = await fetchDashboardStats();
        setStats(result);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "统计数据加载失败。"
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadStats();
  }, []);

  const cards = [
    { label: "总咨询数", value: stats.total_sessions },
    { label: "总消息数", value: stats.total_messages },
    { label: "反馈数", value: stats.total_feedback },
    { label: "好评数", value: stats.positive_feedback },
    { label: "差评数", value: stats.negative_feedback }
  ];

  return (
    <section className="bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 border-b border-slate-200 pb-5">
          <p className="text-sm font-semibold text-[#0b3a6f]">
            Admin / Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-normal text-slate-950">
            数据统计
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            展示本地演示环境中的咨询会话、消息和反馈情况。
          </p>
        </div>

        {errorMessage ? (
          <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {cards.map((card) => (
            <article
              key={card.label}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-medium text-slate-600">{card.label}</p>
              <p className="mt-3 text-3xl font-bold text-[#0b3a6f]">
                {isLoading ? "-" : card.value}
              </p>
            </article>
          ))}
        </div>

        <section className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-4 py-3">
            <h2 className="text-base font-semibold text-slate-950">
              分类咨询统计
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-600">
                <tr>
                  <th className="px-4 py-3">分类</th>
                  <th className="px-4 py-3">咨询次数</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stats.category_stats.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6 text-slate-500" colSpan={2}>
                      暂无分类统计。
                    </td>
                  </tr>
                ) : null}
                {stats.category_stats.map((item) => (
                  <tr key={item.category}>
                    <td className="px-4 py-4 font-semibold text-slate-950">
                      {item.category}
                    </td>
                    <td className="px-4 py-4 text-slate-700">{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </section>
  );
}
