import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
import { formatMoney, formatPercent } from "@/components/utils";
import type { Arena } from "@/types/arena";

export function ArenaCard({ arena }: { arena: Arena }) {
  const topContestant = [...arena.contestants].sort((a, b) => b.returnPercent - a.returnPercent)[0];

  return (
    <article className="rounded-lg border border-line bg-panel p-5 shadow-terminal">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs text-zinc-500">{arena.market}</p>
          <h3 className="mt-2 text-lg font-semibold text-white">{arena.name}</h3>
        </div>
        <span className="inline-flex items-center gap-1 rounded-md border border-signal/30 bg-signal/10 px-2.5 py-1 text-xs text-signal">
          <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
          虚拟盘
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-zinc-300">{arena.description}</p>

      <div className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
        <div className="rounded-md border border-white/10 bg-white/5 p-3">
          <p className="text-zinc-500">选手</p>
          <p className="mt-1 text-white">{arena.contestants.length} 组</p>
        </div>
        <div className="rounded-md border border-white/10 bg-white/5 p-3">
          <p className="text-zinc-500">初始资金</p>
          <p className="mt-1 text-white">{formatMoney(arena.initialCapital, { compact: true })}</p>
        </div>
        <div className="rounded-md border border-white/10 bg-white/5 p-3">
          <p className="text-zinc-500">当前领先</p>
          <p className="mt-1 text-signal">{topContestant ? formatPercent(topContestant.returnPercent) : "-"}</p>
        </div>
      </div>

      {topContestant ? (
        <p className="mt-4 text-sm text-zinc-400">
          领先方法论：<span className="text-white">{topContestant.name}</span> · {topContestant.methodTag}
        </p>
      ) : null}

      <Link
        href={`/arena/${arena.id}`}
        className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-white/10 text-sm text-zinc-100 transition hover:border-white/25 hover:bg-white/5"
      >
        查看对决详情
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}
