import Link from "next/link";
import { Activity } from "lucide-react";
import { formatPercent } from "@/components/utils";
import type { Asset } from "@/types/asset";

export function MarketTickerBar({ assets }: { assets: Asset[] }) {
  return (
    <section className="border-y border-line bg-panel/80">
      <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="sticky left-0 z-10 inline-flex shrink-0 items-center gap-2 bg-panel/95 pr-3 text-xs font-medium text-zinc-400">
          <Activity className="h-4 w-4 text-signal" aria-hidden="true" />
          宏观行情
        </div>
        {assets.map((asset) => {
          const positive = asset.changePercent >= 0;
          return (
            <Link
              key={asset.id}
              href={`/markets/${asset.marketSlug}`}
              className="inline-flex min-w-max items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs transition hover:border-white/25 hover:bg-white/10"
            >
              <span className="font-medium text-white">{asset.symbol}</span>
              <span className="text-zinc-400">{asset.priceLabel ?? asset.price.toLocaleString("zh-CN")}</span>
              <span className={positive ? "text-signal" : "text-danger"}>{formatPercent(asset.changePercent)}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
