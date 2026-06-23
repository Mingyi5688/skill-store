import { BadgeCheck, Globe2, ShieldCheck } from "lucide-react";
import type { SkillStatus } from "@/types/skill";

const copy: Record<SkillStatus, { label: string; description: string; icon: typeof Globe2; className: string }> = {
  public: {
    label: "Public",
    description: "公开资料整理",
    icon: Globe2,
    className: "border-caution/40 bg-caution/10 text-caution",
  },
  verified: {
    label: "Verified",
    description: "平台复核方法论",
    icon: BadgeCheck,
    className: "border-signal/40 bg-signal/10 text-signal",
  },
  official: {
    label: "Official",
    description: "官方授权合作",
    icon: ShieldCheck,
    className: "border-white/30 bg-white/10 text-white",
  },
};

export function VerifiedBadge({ status, showDescription = false }: { status: SkillStatus; showDescription?: boolean }) {
  const item = copy[status];
  const Icon = item.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs ${item.className}`}>
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {item.label}
      {showDescription ? <span className="hidden text-current/80 sm:inline">· {item.description}</span> : null}
    </span>
  );
}
