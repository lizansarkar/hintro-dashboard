/**
 * Formats seconds into a human-readable duration string.
 *
 * Examples:
 *   3600  -> "1h 0m"
 *   4800  -> "1h 20m"
 *   2700  -> "45m"
 *   90    -> "1m 30s"
 *   45    -> "45s"
 *   0     -> "0s"
 */
export function formatDuration(totalSeconds: number): string {
  if (totalSeconds <= 0) return "0s";

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const parts: string[] = [];

  if (hours > 0) {
    parts.push(`${hours}h`);
    parts.push(`${minutes}m`);
  } else if (minutes > 0) {
    parts.push(`${minutes}m`);
    if (seconds > 0 && minutes < 5) {
      parts.push(`${seconds}s`);
    }
  } else {
    parts.push(`${seconds}s`);
  }

  return parts.join(" ");
}

/**
 * Formats an ISO date string into a relative or absolute short date.
 */
export function formatDate(iso: string | null): string {
  if (!iso) return "Never";

  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

/**
 * Formats an ISO date string for display in call records.
 */
export function formatCallDate(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}