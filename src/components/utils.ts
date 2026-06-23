import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("zh-CN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatPercent(value: number) {
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
}

export function formatMoney(value: number, options?: { currency?: string; compact?: boolean }) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: options?.currency ?? "USD",
    notation: options?.compact ? "compact" : "standard",
    maximumFractionDigits: value > 1000 ? 0 : 2,
  }).format(value);
}
