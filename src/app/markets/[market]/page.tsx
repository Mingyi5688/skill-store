import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { AgentMonitorCard } from "@/components/AgentMonitorCard";
import { AssetCard } from "@/components/AssetCard";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { SkillCard } from "@/components/SkillCard";
import { agentMonitors } from "@/data/agents";
import { getAssetsByMarket, marketGroups } from "@/data/assets";
import { skills } from "@/data/skills";

const methodologyMap: Record<string, string[]> = {
  stocks: ["Serenity 供应链框架", "财报质量拆解", "AI 半导体供应链"],
  crypto: ["加密妖币雷达", "链上聪明钱观察", "RWA 叙事追踪"],
  forex: ["美元强弱框架", "央行预期观察", "利差与风险偏好"],
  futures: ["黄金 / 原油宏观框架", "库存与供需冲击", "商品风险事件复盘"],
  macro: ["宏观流动性框架", "美元 / 美债 / VIX 联动", "跨资产风险偏好"],
};

export function generateStaticParams() {
  return marketGroups.map((group) => ({ market: group.slug }));
}

function topAssets(assets: ReturnType<typeof getAssetsByMarket>, direction: "up" | "down" | "volume") {
  if (direction === "volume") {
    return [...assets].sort((a, b) => (b.volume ?? 0) - (a.volume ?? 0)).slice(0, 5);
  }

  return [...assets]
    .sort((a, b) => (direction === "up" ? b.changePercent - a.changePercent : a.changePercent - b.changePercent))
    .slice(0, 5);
}

export default async function MarketDetailPage({ params }: { params: Promise<{ market: string }> }) {
  const { market } = await params;
  const group = marketGroups.find((item) => item.slug === market);

  if (!group) {
    notFound();
  }

  const groupAssets = getAssetsByMarket(group.slug);
  const relatedSkills = skills.filter((skill) => skill.markets.includes(group.name)).slice(0, 4);
  const relatedAgents = agentMonitors.filter((agent) => agent.markets.includes(group.name)).slice(0, 3);

  return (
    <div className="bg-ink">
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm text-signal">Market · {group.assetType}</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">{group.name}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-400">{group.description}</p>
          <div className="mt-5 rounded-lg border border-caution/30 bg-caution/10 p-4 text-sm leading-6 text-caution">
            本页行情、榜单和异动均为 mock 数据。页面仅用于研究辅助和信息整理，不构成交易平台开户建议或投资建议。
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white">市场概览</h2>
          <p className="mt-2 text-sm text-zinc-400">
            覆盖 {groupAssets.length} 个 mock 资产，{relatedSkills.length} 个相关 Skill，{relatedAgents.length} 个 Agent 模板。
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {groupAssets.slice(0, 8).map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        {[
          ["涨幅榜", topAssets(groupAssets, "up")],
          ["跌幅榜", topAssets(groupAssets, "down")],
          ["成交额榜", topAssets(groupAssets, "volume")],
        ].map(([title, list]) => (
          <div key={title as string} className="rounded-lg border border-line bg-panel p-5">
            <h2 className="text-lg font-semibold text-white">{title as string}</h2>
            <div className="mt-4 space-y-3">
              {(list as typeof groupAssets).map((asset, index) => (
                <div key={asset.id} className="flex items-center justify-between gap-3 border-b border-line pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-white">
                      #{index + 1} {asset.name}
                    </p>
                    <p className="mt-1 font-mono text-xs text-zinc-500">{asset.symbol}</p>
                  </div>
                  <p className={asset.changePercent >= 0 ? "text-sm text-signal" : "text-sm text-danger"}>
                    {asset.changePercent >= 0 ? "+" : ""}
                    {asset.changePercent.toFixed(1)}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white">相关 Skill</h2>
          <p className="mt-2 text-sm text-zinc-400">用于该市场的结构化研究方法论。</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {relatedSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-10 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="rounded-lg border border-line bg-panel p-5">
          <h2 className="text-xl font-semibold text-white">相关 KOL / 方法论</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {(methodologyMap[group.slug] ?? []).map((item) => (
              <span key={item} className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-300">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">相关 Agent</h2>
          <div className="mt-4 grid gap-5">
            {relatedAgents.length ? (
              relatedAgents.map((agent) => <AgentMonitorCard key={agent.id} monitor={agent} />)
            ) : (
              <div className="rounded-lg border border-line bg-panel p-5 text-sm text-zinc-400">
                当前市场暂无 mock Agent，可在 Agent 监控页创建草案。
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-caution/30 bg-caution/10 p-5 text-sm leading-6 text-caution">
          <div className="mb-2 flex items-center gap-2 font-medium">
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            邀请平台开户入口占位
          </div>
          页面可能包含邀请链接，平台可能获得返佣。用户需要自行确认所在地区合规性。本平台不构成任何交易平台开户建议或投资建议。
          <div className="mt-4">
            <Link
              href="/pricing"
              className="inline-flex h-9 items-center rounded-md bg-white px-3 text-sm font-semibold text-ink transition hover:bg-zinc-200"
            >
              查看会员方案
            </Link>
          </div>
        </div>
      </section>

      <DisclaimerBox />
    </div>
  );
}
