"use client";

import { Clock, ArrowUpRight, ArrowDownRight, Minus, ChevronRight } from "lucide-react";
import { CallRecord } from "@/types";
import { formatDuration, formatCallDate } from "@/utils/formatDuration";
import EmptyState from "./EmptyState";

interface RecentCallsProps {
  calls: CallRecord[];
  loading: boolean;
}

const sentimentConfig = {
  positive: {
    icon: ArrowUpRight,
    color: "text-success",
    bg: "bg-success/10",
    label: "Positive",
  },
  neutral: {
    icon: Minus,
    color: "text-ink-500",
    bg: "bg-surface-100",
    label: "Neutral",
  },
  negative: {
    icon: ArrowDownRight,
    color: "text-danger",
    bg: "bg-danger/10",
    label: "Negative",
  },
};

function SkeletonRow() {
  return (
    <div className="flex items-start gap-4 p-4">
      <div className="skeleton w-10 h-10 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="skeleton w-40 h-4 rounded" />
        <div className="skeleton w-full h-3 rounded" />
      </div>
      <div className="skeleton w-16 h-4 rounded" />
    </div>
  );
}

export default function RecentCalls({ calls, loading }: RecentCallsProps) {
  if (loading) {
    return (
      <div className="bg-card rounded-xl border border-border shadow-sm">
        <div className="px-5 py-4 border-b border-border">
          <div className="skeleton w-28 h-5 rounded" />
        </div>
        <div className="divide-y divide-border">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (calls.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border shadow-sm">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-text">Recent Calls</h2>
        </div>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="text-base font-semibold text-text">Recent Calls</h2>
        <button className="flex items-center gap-1 text-sm font-medium text-primary
                           hover:gap-1.5 hover:text-primary/80 transition-all duration-200">
          View all
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="divide-y divide-border">
        {calls.map((call, index) => {
          const sentiment = sentimentConfig[call.sentiment];
          const SentimentIcon = sentiment.icon;

          return (
            <div
              key={call.id}
              className="relative flex items-start gap-4 p-4 sm:p-5
                         hover:bg-surface-50 transition-colors duration-150 cursor-pointer group
                         animate-slide-up"
              style={{
                animationDelay: `${index * 60}ms`,
                animationFillMode: "backwards",
              }}
            >
              {/* Avatar */}
              <div
                className={`w-10 h-10 rounded-full ${sentiment.bg} ${sentiment.color}
                            flex items-center justify-center text-sm font-semibold shrink-0
                            ring-1 ring-inset ring-black/5 select-none`}
              >
                {call.contactName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-semibold text-text truncate group-hover:text-primary transition-colors">
                    {call.contactName}
                  </span>
                  <span className="hidden sm:inline text-xs text-ink-300 shrink-0">
                    ·&nbsp;{call.contactRole}
                  </span>
                </div>
                <p className="text-sm text-text-muted line-clamp-1 mb-2">
                  {call.summary}
                </p>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {call.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[11px] font-medium bg-surface-100 ring-1 ring-inset ring-border
                                 text-text-muted rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Meta */}
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <div className="flex items-center gap-1 text-xs font-medium text-text-muted tabular-nums">
                  <Clock size={12} />
                  <span>{formatDuration(call.duration)}</span>
                </div>
                <span className="text-xs text-ink-300">
                  {formatCallDate(call.date)}
                </span>
                <div
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${sentiment.bg} ${sentiment.color}`}
                >
                  <SentimentIcon size={12} />
                  {sentiment.label}
                </div>
              </div>

              {/* Hover affordance */}
              <ChevronRight
                size={16}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-300
                           opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0
                           transition-all duration-200 hidden sm:block"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
