export type CategoryStat = {
  category: string;
  count: number;
};

export type DashboardStats = {
  total_sessions: number;
  total_messages: number;
  total_feedback: number;
  positive_feedback: number;
  negative_feedback: number;
  category_stats: CategoryStat[];
};
