"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, FileText, PlayCircle } from "lucide-react";
import { getReports } from "@/data/localStore";
import { RiskBadge } from "@/components/RiskBadge";
import type { ResearchReport } from "@/types/report";

export function ReportHistoryClient() {
  const [reports, setReports] = useState<ResearchReport[]>([]);

  useEffect(() => {
    setReports(getReports());
  }, []);

  if (reports.length === 0) {
    return (
      <section className="rounded-lg border border-line bg-panel p-8">
        <FileText className="h-6 w-6 text-zinc-500" aria-hidden="true" />
        <h2 className="mt-4 text-lg font-semibold text-white">还没有报告</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
          运行任意 Skill 后，报告会自动保存到当前浏览器，并出现在这里。第一版使用 localStorage，换浏览器或清缓存后记录会消失。
        </p>
        <Link
          href="/skills"
          className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-signal px-4 text-sm font-semibold text-ink transition hover:bg-[#34d58c]"
        >
          <PlayCircle className="h-4 w-4" aria-hidden="true" />
          去运行 Skill
        </Link>
      </section>
    );
  }

  return (
    <div className="grid gap-4">
      {reports.map((report) => (
        <article key={report.id} className="rounded-lg border border-line bg-panel p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <RiskBadge level={report.riskLevel} />
                <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300">
                  {report.skillName}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-white">{report.title}</h2>
              <p className="mt-2 max-w-4xl text-sm leading-6 text-zinc-400">{report.executiveSummary}</p>
              <p className="mt-3 text-xs text-zinc-500">
                {new Date(report.generatedAt).toLocaleString("zh-CN")} · 状态：{report.finalStatus}
              </p>
            </div>
            <Link
              href={`/reports/${report.id}`}
              className="inline-flex h-9 shrink-0 items-center gap-2 rounded-md border border-white/15 px-3 text-sm text-white transition hover:border-white/30 hover:bg-white/5"
            >
              查看报告
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
