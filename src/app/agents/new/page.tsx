import { Bot, Calculator, ShieldAlert } from "lucide-react";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { assets, marketGroups } from "@/data/assets";
import { skills } from "@/data/skills";

const frequencies = ["手动运行", "每 4 小时", "每 1 小时", "每 15 分钟", "每天一次"];
const channels = ["站内通知", "Email", "Telegram", "Discord", "Webhook"];

export default function NewAgentPage() {
  return (
    <div className="bg-ink">
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="inline-flex items-center gap-2 text-sm text-signal">
            <Bot className="h-4 w-4" aria-hidden="true" />
            New Agent · UI Mock
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-white">创建 Agent 监控</h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-400">
            选择监控市场、Skill、资产池、扫描频率、Token 上限和推送渠道。当前仅生成 UI 草案，不创建真实定时任务。
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
        <form className="rounded-lg border border-line bg-panel p-5">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-200">监控市场</span>
              <select className="h-10 w-full rounded-md border border-white/10 bg-ink px-3 text-sm text-white outline-none focus:border-signal">
                {marketGroups.map((group) => (
                  <option key={group.slug}>{group.name}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-200">使用 Skill</span>
              <select className="h-10 w-full rounded-md border border-white/10 bg-ink px-3 text-sm text-white outline-none focus:border-signal">
                {skills
                  .filter((skill) => skill.supportsAgent)
                  .map((skill) => (
                    <option key={skill.id}>{skill.name}</option>
                  ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-200">资产池</span>
              <select className="h-10 w-full rounded-md border border-white/10 bg-ink px-3 text-sm text-white outline-none focus:border-signal">
                {assets.slice(0, 12).map((asset) => (
                  <option key={asset.id}>
                    {asset.symbol} · {asset.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-200">扫描频率</span>
              <select className="h-10 w-full rounded-md border border-white/10 bg-ink px-3 text-sm text-white outline-none focus:border-signal">
                {frequencies.map((frequency) => (
                  <option key={frequency}>{frequency}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-200">Token 上限</span>
              <input
                defaultValue="12000"
                className="h-10 w-full rounded-md border border-white/10 bg-ink px-3 text-sm text-white outline-none focus:border-signal"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-200">推送渠道</span>
              <select className="h-10 w-full rounded-md border border-white/10 bg-ink px-3 text-sm text-white outline-none focus:border-signal">
                {channels.map((channel) => (
                  <option key={channel}>{channel}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-medium text-zinc-200">提醒条件</span>
            <textarea
              defaultValue="出现 AI 基建、电力、稀土、光模块、RWA 或宏观风险偏好相关异动时生成研究提醒。"
              className="min-h-28 w-full rounded-md border border-white/10 bg-ink px-3 py-2 text-sm text-white outline-none focus:border-signal"
            />
          </label>

          <button
            type="button"
            className="mt-6 h-10 w-full rounded-md bg-signal text-sm font-semibold text-ink transition hover:bg-[#34d58c]"
          >
            保存 mock 监控草案
          </button>
        </form>

        <aside className="space-y-5">
          <div className="rounded-lg border border-line bg-panel p-5">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-caution" aria-hidden="true" />
              <h2 className="text-lg font-semibold text-white">预计 Token 消耗</h2>
            </div>
            <div className="mt-5 space-y-3 text-sm text-zinc-300">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <span>单次扫描</span>
                <span className="text-caution">约 420</span>
              </div>
              <div className="flex items-center justify-between border-b border-line pb-3">
                <span>每日扫描</span>
                <span className="text-caution">约 2,520</span>
              </div>
              <div className="flex items-center justify-between">
                <span>月度预估</span>
                <span className="text-caution">约 75,600</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-line bg-panel p-5">
            <h2 className="text-lg font-semibold text-white">最近扫描结果预览</h2>
            <div className="mt-4 rounded-md border border-white/10 bg-white/5 p-4 text-sm leading-6 text-zinc-300">
              mock 扫描发现 NVDA 与 AI 电力链条讨论热度同步上升，需继续核对云厂商资本开支、订单能见度和估值消化。
              <p className="mt-2 text-xs text-caution">风险等级：中 · 输出仅为研究提醒</p>
            </div>
          </div>

          <div className="rounded-lg border border-caution/30 bg-caution/10 p-5 text-sm leading-6 text-caution">
            <div className="mb-2 flex items-center gap-2 font-medium">
              <ShieldAlert className="h-4 w-4" aria-hidden="true" />
              禁止功能
            </div>
            不自动下单，不连接用户交易账户，不给明确买卖点，不承诺收益，不做跟单复制。
          </div>
        </aside>
      </section>

      <DisclaimerBox />
    </div>
  );
}
