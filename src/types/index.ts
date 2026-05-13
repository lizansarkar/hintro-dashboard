export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface DashboardStats {
  totalSessions: number;
  averageDuration: number; // in seconds
  aiUsed: number;
  lastSession: string | null; // ISO date string
}

export interface CallRecord {
  id: string;
  contactName: string;
  contactRole: string;
  duration: number; // in seconds
  date: string; // ISO date string
  summary: string;
  sentiment: "positive" | "neutral" | "negative";
  tags: string[];
}

export interface FeedbackPayload {
  rating: number;
  comment: string;
  submittedAt: string;
}

export interface DashboardData {
  user: User;
  stats: DashboardStats;
  recentCalls: CallRecord[];
}

export type UserState = "empty" | "active";

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}