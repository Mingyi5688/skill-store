"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Eye, PlayCircle } from "lucide-react";
import { RiskBadge } from "@/components/RiskBadge";
import { getWatchlistItems } from "@/data/localStore";
import type { WatchlistItem } from "@/types/report";

export function WatchlistClient() {
  const [items, setItems] = useState<WatchlistItem[]>([]);

  useEffect(() => {
    setItems(getWatchlistItems());
  }, []);

  if (items.length === 0) {
    return (
      <section className="rounded-lg border border-line bg-panel p-8">
        <Eye className="h-6 w-6 text-zinc-500" aria-hidden="true" />
        <h2 className="mt-4 text-lg font-semibold text-white">观察池还是空的</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
          在报告详情页点击「加入 Watchlist」后，候选对象会出现在这里。第一版仅保存在当前浏览器。
        </p>
        <Link
          href="/skills"
          className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-signal px-4 text-sm font-semibold text-ink transition hover:bg-[#34d58c]"
        >
          <PlayCircle className="h-4 w-4" aria-hidden="true" />
          去运行 Skill
        </Link>
      </section>
    );
  }

  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <article key={item.id} className="rounded-lg border border-line bg-panel p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <RiskBadge level={item.riskLevel} />
                <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300">
                  {item.status}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-white">
                {item.assetName}
                {item.assetSymbol ? <span className="ml-2 text-sm text-zinc-500">{item.assetSymbol}</span> : null}
              </h2>
              <p className="mt-2 max-w-4xl text-sm leading-6 text-zinc-400">{item.thesis}</p>
              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-4">
                <div>
                  <p className="text-zinc-500">市场</p>
                  <p className="mt-1 text-zinc-200">{item.market}</p>
                </div>
                <div>
                  <p className="text-zinc-500">来源 Skill</p>
                  <p className="mt-1 text-zinc-200">{item.sourceSkill}</p>
                </div>
                <div>
                  <p className="text-zinc-500">证据强度</p>
                  <p className="mt-1 text-zinc-200">{Math.round(item.evidenceScore * 100)}%</p>
                </div>
                <div>
                  <p className="text-zinc-500">加入时间</p>
                  <p className="mt-1 text-zinc-200">{new Date(item.addedAt).toLocaleDateString("zh-CN")}</p>
                </div>
              </div>
            </div>
            <Link
              href={`/reports/${item.reportId}`}
              className="inline-flex h-9 shrink-0 items-center gap-2 rounded-md border border-white/15 px-3 text-sm text-white transition hover:border-white/30 hover:bg-white/5"
            >
              查看来源报告
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
