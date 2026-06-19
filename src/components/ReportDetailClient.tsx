"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Save, ShieldCheck } from "lucide-react";
import { ReportView } from "@/components/ReportView";
import {
  createWatchlistItemFromReport,
  getReportById,
  saveWatchlistItem,
} from "@/data/localStore";
import type { ResearchReport } from "@/types/report";

export function ReportDetailClient({ reportId }: { reportId: string }) {
  const [report, setReport] = useState<ResearchReport | null | undefined>(undefined);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setReport(getReportById(reportId) ?? null);
  }, [reportId]);

  function addToWatchlist() {
    if (!report) return;

    const item = createWatchlistItemFromReport(report);
    if (!item) {
      setNotice("这份报告没有可加入观察池的候选对象。");
      return;
    }

    saveWatchlistItem(item);
    setNotice("已把首个候选对象加入本地 Watchlist。");
  }

  if (report === undefined) {
    return <div className="rounded-lg border border-line bg-panel p-8 text-sm text-zinc-400">正在读取本地报告...</div>;
  }

  if (report === null) {
    return (
      <section className="rounded-lg border border-line bg-panel p-8">
        <h2 className="text-lg font-semibold text-white">没有找到这份报告</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
          第一版报告保存在当前浏览器 localStorage 中。如果你换了浏览器、清理了缓存，或复制了别人的报告链接，就可能看不到内容。
        </p>
        <Link
          href="/reports"
          className="mt-5 inline-flex h-10 items-center gap-2 rounded-md border border-white/15 px-4 text-sm text-white transition hover:border-white/30 hover:bg-white/5"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          返回报告历史
        </Link>
      </section>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/reports"
          className="inline-flex h-10 items-center gap-2 rounded-md border border-white/15 px-4 text-sm text-white transition hover:border-white/30 hover:bg-white/5"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          报告历史
        </Link>
        <button
          type="button"
          onClick={addToWatchlist}
          className="inline-flex h-10 items-center gap-2 rounded-md bg-signal px-4 text-sm font-semibold text-ink transition hover:bg-[#34d58c]"
        >
          <Save className="h-4 w-4" aria-hidden="true" />
          加入 Watchlist
        </button>
      </div>

      {notice ? (
        <div className="flex items-center gap-2 rounded-lg border border-signal/30 bg-signal/10 p-4 text-sm text-signal">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          {notice}
        </div>
      ) : null}

      <ReportView report={report} />
    </div>
  );
}
