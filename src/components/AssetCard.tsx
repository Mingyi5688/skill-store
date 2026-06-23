import Link from "next/link";
import { BellRing, Eye } from "lucide-react";
import { formatCompactNumber, formatPercent } from "@/components/utils";
import { SparklineChart } from "@/components/SparklineChart";
import type { Asset } from "@/types/asset";

export function AssetCard({ asset }: { asset: Asset }) {
  const positive = asset.changePercent >= 0;

  return (
    <article className="rounded-lg border border-line bg-panel p-4 shadow-terminal">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-zinc-500">{asset.market}</p>
          <h3 className="mt-1 text-base font-semibold text-white">{asset.name}</h3>
          <p className="mt-1 font-mono text-xs text-zinc-500">{asset.symbol}</p>
        </div>
        {asset.hasAgentAlert ? (
          <span className="inline-flex items-center gap-1 rounded-md border border-caution/30 bg-caution/10 px-2 py-1 text-xs text-caution">
            <BellRing className="h-3.5 w-3.5" aria-hidden="true" />
            异动
          </span>
        ) : null}
      </div>

      <div className="mt-4">
        <SparklineChart values={asset.sparkline} positive={positive} />
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-white">{asset.priceLabel ?? asset.price.toLocaleString("zh-CN")}</p>
          <p className={positive ? "text-sm text-signal" : "text-sm text-danger"}>{formatPercent(asset.changePercent)}</p>
        </div>
        <div className="text-right text-xs text-zinc-500">
          {asset.volume ? <p>成交额 {formatCompactNumber(asset.volume)}</p> : null}
          <p className="mt-1 inline-flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
            {asset.watchedBySkillCount} 个 Skill 关注
          </p>
        </div>
      </div>

      <Link
        href={`/markets/${asset.marketSlug}`}
        className="mt-4 inline-flex h-9 w-full items-center justify-center rounded-md border border-white/10 text-sm text-zinc-200 transition hover:border-white/25 hover:bg-white/5"
      >
        查看市场
      </Link>
    </article>
  );
}
