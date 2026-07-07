import type { DashboardStats } from "../types/dashboard";

const DASHBOARD_API_URL = "http://127.0.0.1:8000/api/admin/dashboard";

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const response = await fetch(DASHBOARD_API_URL);

  if (!response.ok) {
    throw new Error("统计数据获取失败。");
  }

  return response.json() as Promise<DashboardStats>;
}
