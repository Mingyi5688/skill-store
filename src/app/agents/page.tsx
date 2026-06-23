import Link from "next/link";
import { ArrowRight, Bot, ShieldAlert } from "lucide-react";
import { AgentMonitorCard } from "@/components/AgentMonitorCard";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { agentMonitors } from "@/data/agents";

const scopes = ["股票市场", "加密货币", "外汇", "期货", "宏观行情"];
const channels = ["站内通知", "Email", "Telegram", "Discord", "Webhook"];

export default function AgentsPage() {
  return (
    <div className="bg-ink">
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="inline-flex items-center gap-2 text-sm text-signal">
            <Bot className="h-4 w-4" aria-hidden="true" />
            Agent Monitor · Mock
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Agent 监控</h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-400">
            P0 阶段展示 24 小时云端托管监控雏形。Agent 只输出研究提醒，不做自动交易、不做跟单、不连接交易账户。
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {scopes.map((scope) => (
              <span key={scope} className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-300">
                {scope}
              </span>
            ))}
          </div>
          <Link
            href="/agents/new"
            className="mt-8 inline-flex h-10 items-center gap-2 rounded-md bg-white px-4 text-sm font-semibold text-ink transition hover:bg-zinc-200"
          >
            创建 Agent 监控
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white">监控示例</h2>
          <p className="mt-2 text-sm text-zinc-400">以下 Agent 均为 mock 数据，展示频率、Token 预算、推送渠道和最近扫描结果。</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {agentMonitors.map((monitor) => (
            <AgentMonitorCard key={monitor.id} monitor={monitor} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-10 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="rounded-lg border border-line bg-panel p-5">
          <h2 className="text-xl font-semibold text-white">推送渠道 UI</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {channels.map((channel) => (
              <span key={channel} className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-300">
                {channel}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-caution/30 bg-caution/10 p-5 text-sm leading-6 text-caution">
          <div className="mb-2 flex items-center gap-2 font-medium">
            <ShieldAlert className="h-4 w-4" aria-hidden="true" />
            Agent 边界
          </div>
          Agent 输出只做研究提醒，不做自动交易，不做跟单，不给具体买卖点，不连接用户交易账户，不承诺收益。
        </div>
      </section>

      <DisclaimerBox />
    </div>
  );
}
