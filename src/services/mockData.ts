import { DashboardData, UserState } from "@/types";

const emptyUser: DashboardData = {
  user: {
    id: "usr_001",
    name: "Alex",
    email: "alex@example.com",
  },
  stats: {
    totalSessions: 0,
    averageDuration: 0,
    aiUsed: 0,
    lastSession: null,
  },
  recentCalls: [],
};

const activeUser: DashboardData = {
  user: {
    id: "usr_002",
    name: "Alex",
    email: "alex@example.com",
    avatarUrl: "",
  },
  stats: {
    totalSessions: 47,
    averageDuration: 1920, // 32m
    aiUsed: 38,
    lastSession: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2h ago
  },
  recentCalls: [
    {
      id: "call_001",
      contactName: "Sarah Chen",
      contactRole: "VP of Engineering",
      duration: 2700, // 45m
      date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      summary:
        "Discussed migration timeline for Q2. Sarah confirmed team allocation and raised concerns about the legacy API compatibility layer.",
      sentiment: "positive",
      tags: ["migration", "engineering", "Q2"],
    },
    {
      id: "call_002",
      contactName: "Marcus Rivera",
      contactRole: "Head of Product",
      duration: 1800, // 30m
      date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      summary:
        "Reviewed feature prioritization for next sprint. Agreed to push onboarding revamp to top of backlog.",
      sentiment: "positive",
      tags: ["product", "sprint", "onboarding"],
    },
    {
      id: "call_003",
      contactName: "Elena Kowalski",
      contactRole: "Customer Success Lead",
      duration: 1200, // 20m
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      summary:
        "Escalation from Acme Corp regarding response SLAs. Needs resolution by Friday to prevent churn risk.",
      sentiment: "negative",
      tags: ["escalation", "SLA", "churn"],
    },
    {
      id: "call_004",
      contactName: "David Park",
      contactRole: "CTO",
      duration: 3600, // 1h
      date: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
      summary:
        "Deep-dive into infrastructure costs. Identified three areas for potential 20% savings through reserved instances.",
      sentiment: "neutral",
      tags: ["infrastructure", "costs", "optimization"],
    },
    {
      id: "call_005",
      contactName: "Priya Sharma",
      contactRole: "Design Director",
      duration: 1500, // 25m
      date: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      summary:
        "Walked through updated design system tokens. Priya will share Figma library link by EOD Wednesday.",
      sentiment: "positive",
      tags: ["design", "tokens", "figma"],
    },
    {
      id: "call_006",
      contactName: "James O'Brien",
      contactRole: "Sales Director",
      duration: 900, // 15m
      date: new Date(Date.now() - 52 * 60 * 60 * 1000).toISOString(),
      summary:
        "Quick sync on pipeline velocity. Three enterprise deals expected to close this month.",
      sentiment: "positive",
      tags: ["sales", "pipeline", "enterprise"],
    },
  ],
};

export function getMockDashboardData(state: UserState): DashboardData {
  return state === "u1" ? emptyUser : activeUser;
}