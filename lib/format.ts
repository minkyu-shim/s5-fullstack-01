import type { AscentStyle } from "@/lib/data";

// Dates are stored as "YYYY-MM-DD", read as UTC so the day never shifts
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export const STYLE_LABELS: Record<AscentStyle, string> = {
  FLASH: "Flash",
  REDPOINT: "Redpoint",
  ATTEMPT: "Attempt",
};
