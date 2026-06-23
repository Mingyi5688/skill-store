import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Bot, Database, FileText, ShieldCheck, Star, Zap } from "lucide-react";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { SkillRecommendation } from "@/components/SkillRecommendation";
import { SkillReviewCard } from "@/components/SkillReviewCard";
import { StatusBadge } from "@/components/StatusBadge";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { assets } from "@/data/assets";
import { getReviewsBySkillId } from "@/data/reviews";
import { getRelatedSkills, getSkillById, skills } from "@/data/skills";

export function generateStaticParams() {
  return skills.map((skill) => ({ id: skill.id }));
}

function ScoreRow({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs text-zinc-400">
        <span>{label}</span>
        <span>{value.toFixed(1)}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-signal" style={{ width: `${Math.min(value / 5, 1) * 100}%` }} />
      </div>
    </div>
  );
}

export default async function SkillDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const skill = getSkillById(id);

  if (!skill) {
    notFound();
  }

  const skillReviews = getReviewsBySkillId(skill.id);
  const recommendations = getRelatedSkills(skill, 3);
  const sameMarketRecommendations = skills
    .filter((item) => item.id !== skill.id && item.markets.some((market) => skill.markets.includes(market)))
    .slice(0, 3);
  const assetNames = skill.relatedAssetSymbols
    .map((symbol) => assets.find((asset) => asset.symbol === symbol))
    .filter((asset): asset is (typeof assets)[number] => Boolean(asset));

  return (
    <div className="bg-ink">
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <StatusBadge status={skill.status} />
            <VerifiedBadge status={skill.status} showDescription />
            <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300">
              {skill.priceLabel}
            </span>
            {skill.purchasedMock ? (
              <span className="rounded-md border border-signal/30 bg-signal/10 px-2.5 py-1 text-xs text-signal">
                Mock 已购买
              </span>
            ) : null}
            {skill.hasRunMock ? (
              <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300">
                Mock 已运行
              </span>
            ) : null}
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div>
              <h1 className="text-3xl font-semibold text-white">{skill.name}</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300">{skill.description}</p>
              <p className="mt-5 rounded-lg border border-caution/30 bg-caution/10 p-4 text-sm leading-6 text-caution">
                {skill.sourceNote}
              </p>
            </div>
            <aside className="rounded-lg border border-line bg-panel p-5">
              <div className="flex items-center gap-3">
                <Star className="h-8 w-8 fill-caution text-caution" aria-hidden="true" />
                <div>
                  <p className="text-3xl font-semibold text-white">{skill.ratingAvg.toFixed(1)}</p>
                  <p className="text-xs text-zinc-500">{skill.ratingCount} 条 mock 评价</p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                <ScoreRow label="输出质量" value={skill.scoreBreakdown?.outputQuality ?? skill.ratingAvg} />
                <ScoreRow label="证据强度" value={skill.scoreBreakdown?.evidenceQuality ?? skill.ratingAvg} />
                <ScoreRow label="易用性" value={skill.scoreBreakdown?.easeOfUse ?? skill.ratingAvg} />
                <ScoreRow label="风险提示" value={skill.scoreBreakdown?.riskWarning ?? skill.ratingAvg} />
                <ScoreRow label="复盘表现" value={skill.scoreBreakdown?.replayValue ?? skill.ratingAvg} />
              </div>
              <div className="mt-6 grid gap-3 text-sm">
                <div className="flex items-center justify-between border-t border-line pt-3">
                  <span className="text-zinc-500">Token 预估</span>
                  <span className="inline-flex items-center gap-1 text-caution">
                    <Zap className="h-4 w-4" aria-hidden="true" />
                    {skill.tokenEstimate}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-line pt-3">
                  <span className="text-zinc-500">Agent 托管</span>
                  <span className={skill.supportsAgent ? "text-signal" : "text-zinc-400"}>
                    {skill.supportsAgent ? "支持" : "不支持"}
                  </span>
                </div>
              </div>
              <Link
                href={`/run/${skill.id}`}
                className="mt-6 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-signal px-4 text-sm font-semibold text-ink transition hover:bg-[#34d58c]"
              >
                运行 Skill
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="rounded-lg border border-line bg-panel p-5">
          <div className="mb-4 flex items-center gap-2">
            <FileText className="h-4 w-4 text-signal" aria-hidden="true" />
            <h2 className="text-base font-semibold text-white">方法论</h2>
          </div>
          <ul className="space-y-3 text-sm leading-6 text-zinc-300">
            {skill.methodology.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-line bg-panel p-5">
          <div className="mb-4 flex items-center gap-2">
            <Database className="h-4 w-4 text-signal" aria-hidden="true" />
            <h2 className="text-base font-semibold text-white">输入与输出</h2>
          </div>
          <p className="text-sm text-zinc-500">输入示例</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {skill.sampleInputs.map((item) => (
              <span key={item} className="rounded-md bg-white/5 px-2 py-1 text-xs text-zinc-300">
                {item}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm text-zinc-500">输出结构</p>
          <ul className="mt-2 space-y-2 text-sm leading-6 text-zinc-300">
            {skill.outputHighlights.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-line bg-panel p-5">
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-signal" aria-hidden="true" />
            <h2 className="text-base font-semibold text-white">数据与合规</h2>
          </div>
          <p className="text-sm text-zinc-500">相关资产</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {assetNames.map((asset) => (
              <span key={asset.id} className="rounded-md bg-white/5 px-2 py-1 text-xs text-zinc-300">
                {asset.symbol} · {asset.name}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm text-zinc-500">边界提示</p>
          <ul className="mt-2 space-y-2 text-sm leading-6 text-zinc-300">
            {skill.complianceNotes.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
        </div>
      </section>

      {skill.supportsAgent ? (
        <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-signal/30 bg-signal/10 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-signal" aria-hidden="true" />
                  <h2 className="text-lg font-semibold text-white">支持 Agent 托管</h2>
                </div>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-300">{skill.agentUseCase}</p>
              </div>
              <Link
                href="/agents/new"
                className="inline-flex h-10 items-center rounded-md bg-white px-4 text-sm font-semibold text-ink transition hover:bg-zinc-200"
              >
                创建监控
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-white">用户评论</h2>
          <p className="mt-2 text-sm text-zinc-400">P0 阶段为 mock 评论，不开放真实提交。</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {(skillReviews.length ? skillReviews : getReviewsBySkillId("serenity-supply-chain-bottleneck")).map((review) => (
            <SkillReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-10 px-4 pb-12 sm:px-6 lg:px-8">
        <SkillRecommendation
          title="相关推荐 Skill"
          description="同类型、配套方法论和高评分 Skill 推荐，当前全部基于 mock 数据。"
          skills={recommendations}
        />
        <SkillRecommendation title="同市场 Skill 推荐" skills={sameMarketRecommendations} />
      </section>

      <DisclaimerBox />
    </div>
  );
}
