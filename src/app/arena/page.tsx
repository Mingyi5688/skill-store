import Link from "next/link";
import { ArrowRight, ShieldAlert, Swords } from "lucide-react";
import { ArenaCard } from "@/components/ArenaCard";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { arenaDisclaimer, arenas } from "@/data/arenas";

const arenaTypes = ["名人方法论 Arena", "美股 Arena", "加密 Arena", "宏观 / 期货 Arena"];

export default function ArenaPage() {
  return (
    <div className="bg-ink">
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-sm text-signal">
              <Swords className="h-4 w-4" aria-hidden="true" />
              Arena · AI 方法论虚拟盘
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Arena 对决</h1>
            <p className="mt-4 text-sm leading-6 text-zinc-400">
              以公开方法论为基础，模拟不同研究框架在股票、加密、宏观和期货环境下的虚拟表现。当前数据全部为 mock。
            </p>
          </div>
          <div className="mt-6 rounded-lg border border-danger/30 bg-danger/10 p-4 text-sm leading-6 text-danger">
            {arenaDisclaimer}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {arenaTypes.map((type) => (
            <span key={type} className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-300">
              {type}
            </span>
          ))}
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {arenas.map((arena) => (
            <ArenaCard key={arena.id} arena={arena} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-line bg-panel p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-caution" aria-hidden="true" />
                <h2 className="text-xl font-semibold text-white">Arena 输出边界</h2>
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
                Arena 只展示 AI 方法论模拟、虚拟资金和虚拟持仓，不声称相关人物真实操作，不提供自动交易、跟单交易或收益承诺。
              </p>
            </div>
            <Link
              href="/leaderboards"
              className="inline-flex h-10 items-center gap-2 rounded-md border border-white/15 px-4 text-sm text-zinc-100 transition hover:border-white/30 hover:bg-white/5"
            >
              查看排行榜
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <DisclaimerBox variant="arena" title="Arena 免责声明">
        {arenaDisclaimer}
      </DisclaimerBox>
    </div>
  );
}
