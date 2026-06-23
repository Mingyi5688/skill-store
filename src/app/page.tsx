import Link from "next/link";
import { ArrowRight, Bot, Search, ShieldAlert, Sparkles, TrendingUp } from "lucide-react";
import { ArenaCard } from "@/components/ArenaCard";
import { AssetCard } from "@/components/AssetCard";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { MarketTickerBar } from "@/components/MarketTickerBar";
import { PricingCard } from "@/components/PricingCard";
import { SkillCard } from "@/components/SkillCard";
import { SkillReviewCard } from "@/components/SkillReviewCard";
import { arenas } from "@/data/arenas";
import { assets } from "@/data/assets";
import { pricingPlans } from "@/data/pricing";
import { reviews } from "@/data/reviews";
import { skills } from "@/data/skills";

const macroTickerSymbols = ["US10Y", "DXY", "SPX", "NDX", "VIX", "GC", "CL", "BTC", "ETH"];
const stockSymbols = ["NVDA", "TSLA", "AAPL", "MSFT", "AVGO"];
const cryptoSymbols = ["BTC", "ETH", "SOL", "BNB", "ONDO", "PEPE"];
const fxFutureSymbols = ["DXY", "EURUSD", "USDJPY", "USDCNH", "GC", "CL", "NG", "HG"];

const todaySignals = [
  {
    title: "AI 基建链条热度同步上升",
    market: "美股 / 半导体",
    detail: "NVDA、AVGO 与电力散热链条被多个 Skill 同时关注，需继续核对订单和资本开支。",
    risk: "中",
  },
  {
    title: "RWA 叙事与链上资金共振",
    market: "加密货币",
    detail: "ONDO 与主流链上资金热度上升，但短期成交扩散过快，风险等级偏高。",
    risk: "高",
  },
  {
    title: "美元指数回落但美债仍偏高",
    market: "宏观 / 外汇",
    detail: "跨资产信号出现分歧，宏观流动性 Skill 建议等待下一轮数据验证。",
    risk: "中",
  },
];

function pickAssets(symbols: string[]) {
  return symbols
    .map((symbol) => assets.find((asset) => asset.symbol === symbol))
    .filter((asset): asset is (typeof assets)[number] => Boolean(asset));
}

export default function HomePage() {
  const macroAssets = pickAssets(macroTickerSymbols);
  const stockAssets = pickAssets(stockSymbols);
  const cryptoAssets = pickAssets(cryptoSymbols);
  const fxFutureAssets = pickAssets(fxFutureSymbols);
  const featuredSkills = skills.slice(0, 6);
  const latestReviews = reviews.slice(0, 3);
  const featuredPlan = pricingPlans.find((plan) => plan.highlighted) ?? pricingPlans[2];

  return (
    <>
      <section className="border-b border-line bg-ink">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <div className="mb-5 inline-flex rounded-md border border-signal/30 bg-signal/10 px-3 py-1 text-sm text-signal">
              V2 · 投资 Skill + 金融行情终端
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white">
              用可运行 Skill，把股票、加密、外汇、期货和宏观研究串成一张终端。
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300">
              选择方法论、扫描市场、查看虚拟 Arena，对每个结论保留证据链、反证条件和风险边界。当前版本所有行情和运行结果均为 mock 数据。
            </p>

            <div className="mt-8 flex h-12 max-w-2xl items-center gap-3 rounded-lg border border-white/10 bg-panel px-4 shadow-terminal">
              <Search className="h-5 w-5 text-zinc-500" aria-hidden="true" />
              <input
                aria-label="全局搜索"
                className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
                placeholder="搜索股票、币种、宏观指标、KOL 方法论或 Skill"
              />
              <span className="hidden rounded-md border border-white/10 px-2 py-1 text-xs text-zinc-500 sm:inline">Mock</span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/markets"
                className="inline-flex h-10 items-center gap-2 rounded-md bg-white px-4 text-sm font-semibold text-ink transition hover:bg-zinc-200"
              >
                打开市场终端
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/arena"
                className="inline-flex h-10 items-center gap-2 rounded-md border border-white/15 px-4 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5"
              >
                查看 Arena 对决
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Skill 数量", `${skills.length}`],
              ["资产覆盖", `${assets.length}`],
              ["Agent 状态", "Mock"],
              ["真实 API", "未接入"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-line bg-panel p-5">
                <p className="text-sm text-zinc-500">{label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
              </div>
            ))}
            <div className="sm:col-span-2 rounded-lg border border-caution/30 bg-caution/10 p-5 text-sm leading-6 text-caution">
              当前版本不接真实数据库、支付、行情 API 或 AI API。所有市场、评价、Arena、Agent 运行均为本地 mock 展示。
            </div>
          </div>
        </div>
      </section>

      <MarketTickerBar assets={macroAssets} />

      <section className="border-b border-line bg-ink/95">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">热门股票 K 线缩略图</h2>
              <p className="mt-2 text-sm text-zinc-400">mock 行情卡片展示价格、涨跌幅、关注 Skill 和 Agent 异动。</p>
            </div>
            <Link href="/markets/stocks" className="text-sm text-signal hover:text-[#34d58c]">
              查看股票市场
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {stockAssets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-ink">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">热门加密货币 K 线缩略图</h2>
              <p className="mt-2 text-sm text-zinc-400">高波动资产只作为研究线索，不构成追高或交易建议。</p>
            </div>
            <Link href="/markets/crypto" className="text-sm text-signal hover:text-[#34d58c]">
              查看加密市场
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-6">
            {cryptoAssets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-ink/95">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white">外汇 / 期货行情卡片</h2>
            <p className="mt-2 text-sm text-zinc-400">美元指数、主要货币对和商品期货用于宏观联动观察。</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {fxFutureAssets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-ink">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
          <div>
            <div className="mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-signal" aria-hidden="true" />
              <h2 className="text-2xl font-semibold text-white">今日异动机会</h2>
            </div>
            <div className="grid gap-4">
              {todaySignals.map((signal) => (
                <article key={signal.title} className="rounded-lg border border-line bg-panel p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-zinc-500">{signal.market}</p>
                      <h3 className="mt-2 text-lg font-semibold text-white">{signal.title}</h3>
                    </div>
                    <span className="rounded-md border border-caution/30 bg-caution/10 px-2.5 py-1 text-xs text-caution">
                      风险 {signal.risk}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">{signal.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <Sparkles className="h-5 w-5 text-signal" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-semibold text-white">会员转化区</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Pro 会员解锁深度报告、更多 Token 和跨市场推荐。支付按钮当前为静态 UI，不接真实支付。
            </p>
            <div className="mt-5">
              <PricingCard plan={featuredPlan} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-ink/95">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">热门 Skill</h2>
              <p className="mt-2 text-sm text-zinc-400">覆盖股票、加密、外汇、期货和宏观行情的 V2 mock Skill。</p>
            </div>
            <Link href="/skills" className="text-sm text-signal hover:text-[#34d58c]">
              查看全部
            </Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {featuredSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-ink">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <div className="mb-6 flex items-center gap-2">
              <Bot className="h-5 w-5 text-signal" aria-hidden="true" />
              <h2 className="text-2xl font-semibold text-white">名人 / 策略 Arena 对决</h2>
            </div>
            <div className="grid gap-5">
              {arenas.slice(0, 2).map((arena) => (
                <ArenaCard key={arena.id} arena={arena} />
              ))}
            </div>
          </div>
          <div>
            <div className="mb-6 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-caution" aria-hidden="true" />
              <h2 className="text-2xl font-semibold text-white">最新 Skill 用户评价</h2>
            </div>
            <div className="grid gap-5">
              {latestReviews.map((review) => (
                <SkillReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <DisclaimerBox />
    </>
  );
}
