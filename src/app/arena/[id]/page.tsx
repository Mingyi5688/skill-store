import Link from "next/link";
import { notFound } from "next/navigation";
import { Bot, CalendarClock, ShieldAlert, Trophy } from "lucide-react";
import { ArenaHoldingTable } from "@/components/ArenaHoldingTable";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { formatMoney, formatPercent } from "@/components/utils";
import { arenaDisclaimer, arenas, getArenaById } from "@/data/arenas";
import { getSkillById } from "@/data/skills";

export function generateStaticParams() {
  return arenas.map((arena) => ({ id: arena.id }));
}

export default async function ArenaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const arena = getArenaById(id);

  if (!arena) {
    notFound();
  }

  return (
    <div className="bg-ink">
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm text-signal">{arena.market} · 虚拟盘</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">{arena.name}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-400">{arena.description}</p>
          <div className="mt-6 rounded-lg border border-danger/30 bg-danger/10 p-4 text-sm leading-6 text-danger">
            {arenaDisclaimer}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          {arena.contestants.map((contestant) => {
            const skill = getSkillById(contestant.skillId);
            return (
              <article key={contestant.id} className="rounded-lg border border-line bg-panel p-5 shadow-terminal">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-zinc-500">{contestant.methodTag}</p>
                    <h2 className="mt-2 text-xl font-semibold text-white">{contestant.name}</h2>
                    {skill ? (
                      <Link href={`/skills/${skill.id}`} className="mt-2 inline-flex text-sm text-signal hover:text-[#34d58c]">
                        {skill.name}
                      </Link>
                    ) : null}
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-md border border-signal/30 bg-signal/10 px-2.5 py-1 text-xs text-signal">
                    <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
                    {formatPercent(contestant.returnPercent)}
                  </span>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-md border border-white/10 bg-white/5 p-3">
                    <p className="text-xs text-zinc-500">初始虚拟资金</p>
                    <p className="mt-1 text-sm text-white">{formatMoney(contestant.initialCapital, { compact: true })}</p>
                  </div>
                  <div className="rounded-md border border-white/10 bg-white/5 p-3">
                    <p className="text-xs text-zinc-500">当前虚拟资金</p>
                    <p className="mt-1 text-sm text-white">{formatMoney(contestant.currentEquity, { compact: true })}</p>
                  </div>
                  <div className="rounded-md border border-white/10 bg-white/5 p-3">
                    <p className="text-xs text-zinc-500">现金</p>
                    <p className="mt-1 text-sm text-white">{formatMoney(contestant.cash, { compact: true })}</p>
                  </div>
                  <div className="rounded-md border border-white/10 bg-white/5 p-3">
                    <p className="text-xs text-zinc-500">持仓数量</p>
                    <p className="mt-1 text-sm text-white">{contestant.holdings.length}</p>
                  </div>
                  <div className="rounded-md border border-white/10 bg-white/5 p-3">
                    <p className="text-xs text-zinc-500">最大回撤</p>
                    <p className="mt-1 text-sm text-danger">-{contestant.maxDrawdown.toFixed(1)}%</p>
                  </div>
                  <div className="rounded-md border border-white/10 bg-white/5 p-3">
                    <p className="text-xs text-zinc-500">胜率</p>
                    <p className="mt-1 text-sm text-white">{contestant.winRate.toFixed(0)}%</p>
                  </div>
                </div>

                <div className="mt-5 rounded-md border border-white/10 bg-white/5 p-4 text-sm leading-6 text-zinc-300">
                  <div className="mb-2 flex items-center gap-2 text-white">
                    <Bot className="h-4 w-4 text-signal" aria-hidden="true" />
                    AI 判词
                  </div>
                  {contestant.aiVerdict}
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
                  <CalendarClock className="h-4 w-4" aria-hidden="true" />
                  最近调仓时间：{contestant.lastRebalanceAt}
                </div>

                <div className="mt-6">
                  <h3 className="mb-3 text-base font-semibold text-white">持仓明细</h3>
                  <ArenaHoldingTable holdings={contestant.holdings} />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-caution/30 bg-caution/10 p-5 text-sm leading-6 text-caution">
          <div className="mb-2 flex items-center gap-2 font-medium">
            <ShieldAlert className="h-4 w-4" aria-hidden="true" />
            虚拟盘边界
          </div>
          持仓明细中的虚拟建仓价、当前价、浮动盈亏、买入逻辑和反证条件均为 mock 模拟，不代表任何真实人物、机构或策略的真实操作。
        </div>
      </section>

      <DisclaimerBox variant="arena" title="Arena 免责声明">
        {arenaDisclaimer}
      </DisclaimerBox>
    </div>
  );
}
