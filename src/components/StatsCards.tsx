"use client";

import { Phone, Clock, Cpu, Calendar } from "lucide-react";
import { DashboardStats } from "@/types";
import { formatDuration, formatDate } from "@/utils/formatDuration";

interface StatsCardsProps {
  stats: DashboardStats;
  loading: boolean;
}

const cardConfig = [
  {
    key: "totalSessions" as const,
    label: "Total Sessions",
    icon: Phone,
    color: "text-primary",
    bg: "bg-primary/10",
    format: (v: number) => v.toString(),
  },
  {
    key: "averageDuration" as const,
    label: "Avg. Duration",
    icon: Clock,
    color: "text-violet-600",
    bg: "bg-violet-50",
    format: (v: number) => formatDuration(v),
  },
  {
    key: "aiUsed" as const,
    label: "AI Used",
    icon: Cpu,
    color: "text-amber-600",
    bg: "bg-amber-50",
    format: (v: number) => v.toString(),
  },
  {
    key: "lastSession" as const,
    label: "Last Session",
    icon: Calendar,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    format: (_: number, raw: DashboardStats) => formatDate(raw.lastSession),
  },
];

function SkeletonCard() {
  return (
    <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="skeleton w-24 h-3.5 rounded" />
        <div className="skeleton w-9 h-9 rounded-lg" />
      </div>
      <div className="skeleton w-20 h-7 rounded" />
    </div>
  );
}

export default function StatsCards({ stats, loading }: StatsCardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cardConfig.map((card, index) => {
        const Icon = card.icon;
        const value = card.format(stats[card.key] as number, stats);

        return (
          <div
            key={card.key}
            className="group bg-card rounded-xl border border-border p-5
                       shadow-sm hover:shadow hover:border-border transition-all duration-200 animate-slide-up"
            style={{
              animationDelay: `${index * 80}ms`,
              animationFillMode: "backwards",
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-sm font-medium text-text-muted">
                {card.label}
              </span>
              <div
                className={`${card.bg} ${card.color} p-2 rounded-lg
                             group-hover:scale-110 transition-transform duration-200`}
              >
                <Icon size={18} />
              </div>
            </div>
            <p className="text-2xl font-bold text-text tracking-tight">
              {value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
