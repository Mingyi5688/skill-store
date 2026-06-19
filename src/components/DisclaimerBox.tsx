import { ShieldAlert } from "lucide-react";
import { complianceDisclaimer } from "@/data/skills";

export function DisclaimerBox({ compact = false }: { compact?: boolean }) {
  return (
    <section className="border-y border-line bg-panel/80">
      <div className="mx-auto flex max-w-7xl gap-3 px-4 py-4 text-sm text-zinc-300 sm:px-6 lg:px-8">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-caution" aria-hidden="true" />
        <p className={compact ? "max-w-5xl" : "max-w-6xl"}>{complianceDisclaimer}</p>
      </div>
    </section>
  );
}
