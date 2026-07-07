export type CategoryStat = {
  category: string;
  count: number;
};

export type RecentSession = {
  id: string;
  title: string;
  created_at: string;
  updated_at?: string;
};

export type DashboardStats = {
  total_sessions: number;
  total_messages: number;
  total_knowledge: number;
  total_documents: number;
  total_feedback: number;
  positive_feedback: number;
  negative_feedback: number;
  category_stats: CategoryStat[];
  recent_sessions: RecentSession[];
};
