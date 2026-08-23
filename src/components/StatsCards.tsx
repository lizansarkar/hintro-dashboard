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
    sub: "All-time calls",
    icon: Phone,
    color: "text-primary",
    bg: "bg-primary/10",
    format: (v: number) => v.toLocaleString("en-US"),
  },
  {
    key: "averageDuration" as const,
    label: "Avg. Duration",
    sub: "Per session",
    icon: Clock,
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-500/10",
    format: (v: number) => formatDuration(v),
  },
  {
    key: "aiUsed" as const,
    label: "AI Used",
    sub: "Assist actions",
    icon: Cpu,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10",
    format: (v: number) => v.toLocaleString("en-US"),
  },
  {
    key: "lastSession" as const,
    label: "Last Session",
    sub: "Most recent call",
    icon: Calendar,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
    format: (_: number, raw: DashboardStats) => formatDate(raw.lastSession),
  },
];

function SkeletonCard() {
  return (
    <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-2">
          <div className="skeleton w-24 h-3.5 rounded" />
          <div className="skeleton w-16 h-3 rounded" />
        </div>
        <div className="skeleton w-9 h-9 rounded-lg" />
      </div>
      <div className="skeleton w-20 h-7 rounded" />
    </div>
  );
}

export default function StatsCards({ stats, loading }: StatsCardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
      {cardConfig.map((card, index) => {
        const Icon = card.icon;
        const value = card.format(stats[card.key] as number, stats);

        return (
          <div
            key={card.key}
            className="group relative bg-card rounded-xl border border-border p-5
                       shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-primary/25
                       transition-all duration-200 animate-slide-up overflow-hidden"
            style={{
              animationDelay: `${index * 80}ms`,
              animationFillMode: "backwards",
            }}
          >
            {/* Hover accent line */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-primary to-primary-light
                         opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />

            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="block text-sm font-medium text-text-muted">
                  {card.label}
                </span>
                <span className="mt-0.5 block text-xs text-ink-300">
                  {card.sub}
                </span>
              </div>
              <div
                className={`${card.bg} ${card.color} p-2 rounded-lg ring-1 ring-inset ring-black/5
                             group-hover:scale-110 transition-transform duration-200`}
              >
                <Icon size={18} />
              </div>
            </div>

            <p className="text-2xl sm:text-[1.7rem] leading-none font-bold text-text tracking-tight tabular-nums">
              {value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
