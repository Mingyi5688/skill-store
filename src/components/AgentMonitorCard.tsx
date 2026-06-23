import { BellRing, Clock, Zap } from "lucide-react";
import { formatCompactNumber } from "@/components/utils";
import type { AgentMonitor } from "@/types/agent";

const frequencyLabel: Record<AgentMonitor["frequency"], string> = {
  manual: "手动运行",
  "15m": "每 15 分钟",
  "1h": "每 1 小时",
  "4h": "每 4 小时",
  "1d": "每天一次",
};

const channelLabel: Record<AgentMonitor["notificationChannel"], string> = {
  in_app: "站内通知",
  email: "Email",
  telegram: "Telegram",
  discord: "Discord",
  webhook: "Webhook",
};

export function AgentMonitorCard({ monitor }: { monitor: AgentMonitor }) {
  const latest = monitor.recentResults[0];

  return (
    <article className="rounded-lg border border-line bg-panel p-5 shadow-terminal">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs text-zinc-500">{monitor.markets.join(" / ")}</p>
          <h3 className="mt-2 text-lg font-semibold text-white">{monitor.name}</h3>
        </div>
        <span
          className={
            monitor.isActive
              ? "rounded-md border border-signal/30 bg-signal/10 px-2.5 py-1 text-xs text-signal"
              : "rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-400"
          }
        >
          {monitor.isActive ? "运行中" : "已暂停"}
        </span>
      </div>

      <div className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
        <div className="rounded-md border border-white/10 bg-white/5 p-3">
          <Clock className="h-4 w-4 text-signal" aria-hidden="true" />
          <p className="mt-2 text-zinc-500">频率</p>
          <p className="text-white">{frequencyLabel[monitor.frequency]}</p>
        </div>
        <div className="rounded-md border border-white/10 bg-white/5 p-3">
          <Zap className="h-4 w-4 text-caution" aria-hidden="true" />
          <p className="mt-2 text-zinc-500">Token</p>
          <p className="text-white">
            {formatCompactNumber(monitor.usedTokens)} / {formatCompactNumber(monitor.tokenBudget)}
          </p>
        </div>
        <div className="rounded-md border border-white/10 bg-white/5 p-3">
          <BellRing className="h-4 w-4 text-signal" aria-hidden="true" />
          <p className="mt-2 text-zinc-500">推送</p>
          <p className="text-white">{channelLabel[monitor.notificationChannel]}</p>
        </div>
      </div>

      {latest ? (
        <div className="mt-5 rounded-md border border-white/10 bg-white/5 p-4 text-sm leading-6 text-zinc-300">
          <p className="font-medium text-white">
            最近扫描：{latest.assetName} ({latest.assetSymbol})
          </p>
          <p className="mt-2">{latest.summary}</p>
          <p className="mt-2 text-xs text-caution">风险等级：{latest.riskLevel}</p>
        </div>
      ) : null}
    </article>
  );
}
