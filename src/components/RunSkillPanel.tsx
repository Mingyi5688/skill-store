"use client";

import { FormEvent, useMemo, useState } from "react";
import { Database, PlayCircle, Save, ShieldCheck } from "lucide-react";
import { createMockReport } from "@/data/mockReports";
import { ReportView } from "@/components/ReportView";
import type { ResearchReport, WatchlistItem } from "@/types/report";
import type { SkillDefinition } from "@/types/skill";

const reportsKey = "invest-skill-store:reports";
const watchlistKey = "invest-skill-store:watchlist";

function readList<T>(key: string): T[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function writeList<T extends { id: string }>(key: string, item: T) {
  const next = [item, ...readList<T>(key).filter((existing) => existing.id !== item.id)];
  window.localStorage.setItem(key, JSON.stringify(next.slice(0, 20)));
}

export function RunSkillPanel({ skill }: { skill: SkillDefinition }) {
  const initialValues = useMemo(() => {
    return Object.fromEntries(
      skill.inputFields.map((field) => [field.name, field.type === "select" ? field.options?.[0] ?? "" : ""]),
    );
  }, [skill.inputFields]);

  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [report, setReport] = useState<ResearchReport | null>(null);
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextReport = createMockReport(skill, values);
    writeList(reportsKey, nextReport);
    setReport(nextReport);
    setNotice("已生成 mock 报告，并保存到当前浏览器。");
  }

  function addPrimaryCandidateToWatchlist() {
    if (!report || report.candidates.length === 0) return;
    const candidate = report.candidates[0];
    const item: WatchlistItem = {
      id: `${report.id}:${candidate.name}`,
      reportId: report.id,
      assetName: candidate.name,
      assetSymbol: candidate.symbol,
      market: values.market || values.timeframe || "公开市场",
      sourceSkill: skill.name,
      thesis: report.thesis,
      evidenceScore: candidate.evidenceScore,
      riskLevel: candidate.riskLevel,
      status: candidate.watchOrReject === "reject" ? "不进入观察池" : "研究观察中",
      addedAt: new Date().toISOString(),
    };

    writeList(watchlistKey, item);
    setNotice("已把首个候选对象加入本地 Watchlist。");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
      <section className="rounded-lg border border-line bg-panel p-5">
        <div className="mb-5 flex items-center gap-2">
          <PlayCircle className="h-4 w-4 text-signal" aria-hidden="true" />
          <h2 className="text-base font-semibold text-white">运行参数</h2>
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

          <button
            type="submit"
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-signal px-4 text-sm font-semibold text-ink transition hover:bg-[#34d58c]"
          >
            <Database className="h-4 w-4" aria-hidden="true" />
            生成 mock 研究报告
          </button>
        </form>

        <div className="mt-5 rounded-md border border-caution/30 bg-caution/10 p-4 text-sm leading-6 text-caution">
          当前版本不接真实数据库、支付、交易 API 或 AI API。结果来自本地 mock 逻辑，仅用于产品路径验证。
        </div>
      </section>

      <section className="min-w-0">
        {notice ? (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-signal/30 bg-signal/10 p-4 text-sm text-signal">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            {notice}
          </div>
        ) : null}

        {report ? (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addPrimaryCandidateToWatchlist}
                className="inline-flex h-10 items-center gap-2 rounded-md border border-white/15 px-4 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5"
              >
                <Save className="h-4 w-4" aria-hidden="true" />
                加入 Watchlist
              </button>
            </div>
            <ReportView report={report} />
          </div>
        ) : (
          <div className="rounded-lg border border-line bg-panel p-8">
            <p className="text-sm text-zinc-400">报告将在这里生成。输入研究对象后，会展示摘要、证据链、反证条件、候选观察对象和风险提示。</p>
          </div>
        )}
      </section>
    </div>
  );
}
