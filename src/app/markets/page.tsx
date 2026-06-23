import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { AssetCard } from "@/components/AssetCard";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { SkillCard } from "@/components/SkillCard";
import { assets, getAssetsByMarket, marketGroups } from "@/data/assets";
import { skills } from "@/data/skills";

const groupSkillMap: Record<string, string[]> = {
  stocks: ["serenity-supply-chain-bottleneck", "us-earnings-breakdown", "ai-semiconductor-supply-chain"],
  crypto: ["crypto-meme-radar", "onchain-smart-money-watch", "rwa-narrative-tracker"],
  forex: ["forex-strength-analysis", "macro-liquidity-analysis"],
  futures: ["gold-oil-futures-anomaly", "macro-liquidity-analysis"],
  macro: ["macro-liquidity-analysis", "forex-strength-analysis", "gold-oil-futures-anomaly"],
};

export default function MarketsPage() {
  return (
    <div className="bg-ink">
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm text-signal">Markets Terminal · Mock</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">市场</h1>
            <p className="mt-4 text-sm leading-6 text-zinc-400">
              V2 只聚焦股票、加密货币、外汇、期货和宏观行情。所有行情、榜单和入口均为 mock 展示，不接真实行情 API。
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {marketGroups.map((group) => {
            const groupAssets = getAssetsByMarket(group.slug).slice(0, 3);
            return (
              <Link
                key={group.slug}
                href={`/markets/${group.slug}`}
                className="rounded-lg border border-line bg-panel p-5 shadow-terminal transition hover:border-white/25 hover:bg-white/[0.06]"
              >
                <p className="text-xs text-zinc-500">{group.assetType}</p>
                <h2 className="mt-2 text-xl font-semibold text-white">{group.name}</h2>
                <p className="mt-3 min-h-24 text-sm leading-6 text-zinc-400">{group.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {groupAssets.map((asset) => (
                    <span key={asset.id} className="rounded-md bg-white/5 px-2 py-1 text-xs text-zinc-300">
                      {asset.symbol}
                    </span>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-sm text-signal">
                  查看市场
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white">全局热门资产</h2>
          <p className="mt-2 text-sm text-zinc-400">按 mock 关注度和 Agent 异动展示跨市场资产。</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {assets
            .filter((asset) => asset.hasAgentAlert)
            .slice(0, 10)
            .map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white">市场相关 Skill</h2>
          <p className="mt-2 text-sm text-zinc-400">每个市场都绑定一组可运行的研究方法论。</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {Object.values(groupSkillMap)
            .flat()
            .filter((id, index, array) => array.indexOf(id) === index)
            .slice(0, 6)
            .map((id) => skills.find((skill) => skill.id === id))
            .filter((skill): skill is (typeof skills)[number] => Boolean(skill))
            .map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-caution/30 bg-caution/10 p-5 text-sm leading-6 text-caution">
          <div className="mb-2 flex items-center gap-2 font-medium">
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            邀请平台开户入口占位
          </div>
          页面可能包含邀请链接，平台可能获得返佣。用户需要自行确认所在地区合规性。本平台不构成任何交易平台开户建议或投资建议。
        </div>
      </section>

      <DisclaimerBox />
    </div>
  );
}
