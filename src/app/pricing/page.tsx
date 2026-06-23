import { BadgeDollarSign, ShieldAlert, Zap } from "lucide-react";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { PricingCard } from "@/components/PricingCard";
import { pricingPlans } from "@/data/pricing";

const tokenScenarios = ["单次运行 Skill", "生成深度报告", "批量扫描资产", "Agent 定时监控", "多 Skill 组合分析", "Telegram 推送前摘要生成"];

export default function PricingPage() {
  return (
    <div className="bg-ink">
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="inline-flex items-center gap-2 text-sm text-signal">
            <BadgeDollarSign className="h-4 w-4" aria-hidden="true" />
            Membership · Mock
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-white">会员订阅</h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-400">
            V2 展示 Free、Basic、Pro、Sector、Max 和 Agent Cloud 六档套餐。支付按钮当前为静态 UI，不接真实支付或扣费。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="rounded-lg border border-line bg-panel p-5">
          <div className="mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-caution" aria-hidden="true" />
            <h2 className="text-xl font-semibold text-white">Token 消耗场景</h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {tokenScenarios.map((scenario) => (
              <span key={scenario} className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-300">
                {scenario}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-caution/30 bg-caution/10 p-5 text-sm leading-6 text-caution">
          <div className="mb-2 flex items-center gap-2 font-medium">
            <ShieldAlert className="h-4 w-4" aria-hidden="true" />
            订阅与支付边界
          </div>
          当前页面不接真实支付，不创建订单，不扣费，不开通真实会员权限。会员、Token、Telegram 和 Agent Cloud 均为 mock 展示。
        </div>
      </section>

      <DisclaimerBox />
    </div>
  );
}
