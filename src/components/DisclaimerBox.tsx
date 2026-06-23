import { ShieldAlert } from "lucide-react";
import { complianceDisclaimer } from "@/data/skills";
import { cn } from "@/components/utils";

export function DisclaimerBox({
  compact = false,
  title = "风险提示",
  children,
  variant = "default",
}: {
  compact?: boolean;
  title?: string;
  children?: React.ReactNode;
  variant?: "default" | "arena" | "affiliate";
}) {
  const tone =
    variant === "affiliate"
      ? "border-caution/30 bg-caution/10 text-caution"
      : variant === "arena"
        ? "border-danger/30 bg-danger/10 text-danger"
        : "border-line bg-panel/80 text-zinc-300";

  return (
    <section className={cn("border-y", tone)}>
      <div className="mx-auto flex max-w-7xl gap-3 px-4 py-4 text-sm sm:px-6 lg:px-8">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <div className={compact ? "max-w-5xl" : "max-w-6xl"}>
          <p className="font-medium">{title}</p>
          <p className="mt-1 leading-6">{children ?? complianceDisclaimer}</p>
        </div>
      </div>
    </section>
  );
}
