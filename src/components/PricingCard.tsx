import { CheckCircle2 } from "lucide-react";
import type { PricingPlan } from "@/types/pricing";

export function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <article
      className={
        plan.highlighted
          ? "rounded-lg border border-signal/50 bg-signal/10 p-5 shadow-terminal"
          : "rounded-lg border border-line bg-panel p-5 shadow-terminal"
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white">{plan.name}</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">{plan.subtitle}</p>
        </div>
        {plan.badge ? (
          <span className="rounded-md border border-white/15 bg-white/10 px-2.5 py-1 text-xs text-white">{plan.badge}</span>
        ) : null}
      </div>

      <div className="mt-6">
        <span className="text-3xl font-semibold text-white">${plan.priceMonthly}</span>
        <span className="text-sm text-zinc-500"> / 月</span>
      </div>

      <div className="mt-5 grid gap-2 text-sm text-zinc-300">
        <p>Token 额度：{plan.tokenAllowance.toLocaleString("zh-CN")}</p>
        <p>Skill 运行：{plan.skillRuns}</p>
        <p>Agent 监控：{plan.supportsAgent ? "支持" : "不支持"}</p>
        <p>Telegram 推送：{plan.supportsTelegram ? "支持 UI 占位" : "不支持"}</p>
        <p>深度报告：{plan.supportsDeepReport ? "支持" : "不支持"}</p>
      </div>

      {plan.sectorOptions ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {plan.sectorOptions.map((option) => (
            <span key={option} className="rounded-md bg-white/5 px-2 py-1 text-xs text-zinc-300">
              {option}
            </span>
          ))}
        </div>
      ) : null}

      <ul className="mt-5 space-y-2 text-sm leading-6 text-zinc-300">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-signal" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>

      <button className="mt-6 h-10 w-full rounded-md bg-white text-sm font-semibold text-ink transition hover:bg-zinc-200">
        静态订阅按钮
      </button>
    </article>
  );
}
