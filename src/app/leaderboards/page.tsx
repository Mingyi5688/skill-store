import { ListOrdered } from "lucide-react";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import { leaderboards } from "@/data/leaderboards";

export default function LeaderboardsPage() {
  return (
    <div className="bg-ink">
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="inline-flex items-center gap-2 text-sm text-signal">
            <ListOrdered className="h-4 w-4" aria-hidden="true" />
            Leaderboards · Mock
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-white">排行榜</h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-400">
            评分、运行次数、KOL 影响力、用户订阅、市场异动和 Agent 命中榜均为 mock 数据，用于展示 V2 信息架构。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {leaderboards.map((leaderboard) => (
            <LeaderboardTable key={leaderboard.id} leaderboard={leaderboard} />
          ))}
        </div>
      </section>

      <DisclaimerBox />
    </div>
  );
}
