import type { RiskLevel } from "@/types/report";

const label: Record<RiskLevel, string> = {
  low: "低风险观察",
  medium: "中等风险",
  high: "高风险",
  reject: "排除",
};

const tone: Record<RiskLevel, string> = {
  low: "border-signal/40 bg-signal/10 text-signal",
  medium: "border-caution/40 bg-caution/10 text-caution",
  high: "border-danger/40 bg-danger/10 text-danger",
  reject: "border-zinc-500/40 bg-zinc-500/10 text-zinc-300",
};

export function RiskBadge({ level }: { level: RiskLevel }) {
  return (
    <span className={`inline-flex h-7 items-center rounded-md border px-2.5 text-xs font-medium ${tone[level]}`}>
      {label[level]}
    </span>
  );
}
