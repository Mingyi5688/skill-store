"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { AlertTriangle, Bot, Database, Eye, FileText, PlayCircle, ShieldCheck, Zap } from "lucide-react";
import { RiskBadge } from "@/components/RiskBadge";
import { saveReport } from "@/data/localStore";
import type { ApiErrorResponse, RunSkillResponse } from "@/types/api";
import type { ResearchReport } from "@/types/report";
import type { SkillDefinition } from "@/types/skill";

type RunMode = "single" | "deep" | "watchlist" | "agent";

const runModes: Array<{
  id: RunMode;
  title: string;
  description: string;
  multiplier: number;
  icon: typeof PlayCircle;
}> = [
  {
    id: "single",
    title: "单次运行",
    description: "生成一份基础 mock 研究报告。",
    multiplier: 1,
    icon: PlayCircle,
  },
  {
    id: "deep",
    title: "深度报告",
    description: "更完整的证据链和反证条件展示。",
    multiplier: 2,
    icon: FileText,
  },
  {
    id: "watchlist",
    title: "加入 Watchlist",
    description: "运行后从报告页保存候选对象。",
    multiplier: 1.2,
    icon: Eye,
  },
  {
    id: "agent",
    title: "加入 Agent 监控",
    description: "生成监控配置草案，不启动真实任务。",
    multiplier: 3,
    icon: Bot,
  },
];

function modeLabel(mode: RunMode) {
  return runModes.find((item) => item.id === mode)?.title ?? "单次运行";
}

export function RunSkillPanel({ skill }: { skill: SkillDefinition }) {
  const initialValues = useMemo(() => {
    return Object.fromEntries(
      skill.inputFields.map((field) => [field.name, field.type === "select" ? field.options?.[0] ?? "" : ""]),
    );
  }, [skill.inputFields]);

  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [runMode, setRunMode] = useState<RunMode>("single");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<ResearchReport | null>(null);

  const tokenEstimate = Math.round(
    skill.tokenEstimate * (runModes.find((item) => item.id === runMode)?.multiplier ?? 1),
  );
  const target = values.target?.trim() || values.market?.trim() || "待输入研究对象";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("正在通过 Skill Runner API 生成 mock 报告...");
    setIsRunning(true);
    setGeneratedReport(null);

    try {
      const response = await fetch(`/api/skills/${skill.id}/run`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: { ...values, runMode: modeLabel(runMode) } }),
      });

      const payload = (await response.json()) as RunSkillResponse | ApiErrorResponse;

      if (!response.ok || "error" in payload) {
        const details = "details" in payload && payload.details?.length ? `：${payload.details.join("、")}` : "";
        throw new Error(`${"error" in payload ? payload.error : "Skill 运行失败"}${details}`);
      }

      saveReport(payload.report);
      setGeneratedReport(payload.report);
      setNotice("已通过本地 Skill Runner API 生成 mock 报告，并保存到当前浏览器。");
    } catch (runError) {
      setError(runError instanceof Error ? runError.message : "Skill 运行失败，请稍后重试。");
      setNotice("");
    } finally {
      setIsRunning(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[440px_1fr]">
      <section className="rounded-lg border border-line bg-panel p-5">
        <div className="mb-5 flex items-center gap-2">
          <PlayCircle className="h-4 w-4 text-signal" aria-hidden="true" />
          <h2 className="text-base font-semibold text-white">运行参数</h2>
        </div>

        <div className="mb-5 grid gap-2 sm:grid-cols-2">
          {runModes.map((mode) => {
            const Icon = mode.icon;
            const active = runMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setRunMode(mode.id)}
                className={
                  active
                    ? "rounded-md border border-signal/40 bg-signal/10 p-3 text-left"
                    : "rounded-md border border-white/10 bg-white/5 p-3 text-left transition hover:border-white/25"
                }
              >
                <span className="inline-flex items-center gap-2 text-sm font-medium text-white">
                  <Icon className={active ? "h-4 w-4 text-signal" : "h-4 w-4 text-zinc-500"} aria-hidden="true" />
                  {mode.title}
                </span>
                <span className="mt-1 block text-xs leading-5 text-zinc-400">{mode.description}</span>
              </button>
            );
          })}
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {skill.inputFields.map((field) => (
            <label key={field.name} className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-200">
                {field.label}
                {field.required ? <span className="text-caution"> *</span> : null}
              </span>
              {field.type === "textarea" ? (
                <textarea
                  required={field.required}
                  value={values[field.name] ?? ""}
                  onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
                  placeholder={field.placeholder}
                  className="min-h-28 w-full rounded-md border border-white/10 bg-ink px-3 py-2 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-signal"
                />
              ) : field.type === "select" ? (
                <select
                  required={field.required}
                  value={values[field.name] ?? ""}
                  onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
                  className="h-10 w-full rounded-md border border-white/10 bg-ink px-3 text-sm text-white outline-none transition focus:border-signal"
                >
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  required={field.required}
                  value={values[field.name] ?? ""}
                  onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
                  placeholder={field.placeholder}
                  className="h-10 w-full rounded-md border border-white/10 bg-ink px-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-signal"
                />
              )}
            </label>
          ))}

          <div className="rounded-md border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2">
                <Zap className="h-4 w-4 text-caution" aria-hidden="true" />
                Token 消耗预估
              </span>
              <span className="font-semibold text-caution">{tokenEstimate}</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-zinc-500">P0 阶段仅展示，不扣费，不接支付，不调用真实 AI。</p>
          </div>

          <button
            type="submit"
            disabled={isRunning}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-signal px-4 text-sm font-semibold text-ink transition hover:bg-[#34d58c] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Database className="h-4 w-4" aria-hidden="true" />
            {isRunning ? "运行中..." : "生成 mock 研究结果"}
          </button>
        </form>

        <div className="mt-5 rounded-md border border-caution/30 bg-caution/10 p-4 text-sm leading-6 text-caution">
          当前版本不接真实数据库、支付、交易 API、行情 API 或 AI API。Agent 模式只生成研究提醒雏形，不做自动交易或跟单。
        </div>
      </section>

      <section className="min-w-0">
        {notice ? (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-signal/30 bg-signal/10 p-4 text-sm text-signal">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            {notice}
          </div>
        ) : null}

        {error ? (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-danger/30 bg-danger/10 p-4 text-sm text-danger">
            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            {error}
          </div>
        ) : null}

        <div className="rounded-lg border border-line bg-panel p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs text-zinc-500">运行模式 · {modeLabel(runMode)}</p>
              <h2 className="mt-2 text-lg font-semibold text-white">{generatedReport ? "Mock 运行结果" : "Mock 输出预览"}</h2>
            </div>
            <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300">
              API backed mock
            </span>
          </div>

          {generatedReport ? (
            <div className="mt-5 space-y-5">
              <div className="rounded-md border border-white/10 bg-white/5 p-4">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <RiskBadge level={generatedReport.riskLevel} />
                  <span className="rounded-md border border-white/10 px-2 py-1 text-xs text-zinc-400">
                    {generatedReport.finalStatus}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white">{generatedReport.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-300">{generatedReport.executiveSummary}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-md border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-medium text-white">研究对象</p>
                  <p className="mt-2 text-sm text-zinc-300">{target}</p>
                </div>
                <div className="rounded-md border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-medium text-white">相关资产</p>
                  <p className="mt-2 text-sm text-zinc-300">
                    {generatedReport.candidates.map((candidate) => candidate.symbol ?? candidate.name).join(" / ")}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                <div className="rounded-md border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-medium text-white">证据链</p>
                  <ul className="mt-2 space-y-2 text-sm leading-6 text-zinc-300">
                    {generatedReport.bottlenecks.flatMap((item) => item.evidence).slice(0, 4).map((item) => (
                      <li key={item}>· {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-md border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-medium text-white">反证条件</p>
                  <ul className="mt-2 space-y-2 text-sm leading-6 text-zinc-300">
                    {generatedReport.counterEvidence.slice(0, 4).map((item) => (
                      <li key={item}>· {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-md border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-medium text-white">后续观察指标</p>
                  <ul className="mt-2 space-y-2 text-sm leading-6 text-zinc-300">
                    {generatedReport.trackingSignals.slice(0, 4).map((item) => (
                      <li key={item}>· {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/reports/${generatedReport.id}`}
                  className="inline-flex h-10 items-center rounded-md bg-white px-4 text-sm font-semibold text-ink transition hover:bg-zinc-200"
                >
                  打开完整报告
                </Link>
                <Link
                  href="/agents/new"
                  className="inline-flex h-10 items-center rounded-md border border-white/15 px-4 text-sm text-zinc-100 transition hover:border-white/30 hover:bg-white/5"
                >
                  创建 Agent 监控
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <div className="rounded-md border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-medium text-white">研究对象</p>
                <p className="mt-2 text-sm text-zinc-300">{target}</p>
              </div>
              <div className="rounded-md border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-medium text-white">核心结论</p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  运行后将生成结构化 mock 结论，包含证据链、风险等级和反证条件，不输出确定性交易指令。
                </p>
              </div>
              <div className="rounded-md border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-medium text-white">证据链</p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  将从 {skill.dataSources.slice(0, 3).join("、")} 等公开来源维度模拟整理。
                </p>
              </div>
              <div className="rounded-md border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-medium text-white">风险等级与反证</p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  默认展示风险等级、反证条件、相关资产和后续观察指标，所有结果仅用于研究辅助。
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
