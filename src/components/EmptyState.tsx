"use client";

import { PhoneOff } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export default function EmptyState({
  title = "No recent calls",
  message = "Your call history will appear here once you start having conversations.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-border flex items-center justify-center mb-5">
        <PhoneOff size={28} className="text-text-muted" />
      </div>
      <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
      <p className="text-sm text-text-muted max-w-sm">{message}</p>
    </div>
  );
}
