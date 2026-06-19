import { getStatusLabel } from "@/data/skills";
import type { SkillStatus } from "@/types/skill";

const statusClass: Record<SkillStatus, string> = {
  public: "border-caution/40 bg-caution/10 text-caution",
  verified: "border-signal/40 bg-signal/10 text-signal",
  official: "border-white/30 bg-white/10 text-white",
};

export function StatusBadge({ status }: { status: SkillStatus }) {
  return (
    <span
      className={`inline-flex h-7 items-center rounded-md border px-2.5 text-xs font-medium ${statusClass[status]}`}
    >
      {getStatusLabel(status)}
    </span>
  );
}
