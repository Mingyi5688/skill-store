import type { ResearchReport, WatchlistItem } from "@/types/report";

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

function writeList<T>(key: string, items: T[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(items));
}

export function getReports() {
  return readList<ResearchReport>(reportsKey);
}

export function getReportById(id: string) {
  return getReports().find((report) => report.id === id);
}

export function saveReport(report: ResearchReport) {
  const next = [report, ...getReports().filter((item) => item.id !== report.id)];
  writeList(reportsKey, next.slice(0, 30));
}

export function getWatchlistItems() {
  return readList<WatchlistItem>(watchlistKey);
}

export function saveWatchlistItem(item: WatchlistItem) {
  const next = [item, ...getWatchlistItems().filter((existing) => existing.id !== item.id)];
  writeList(watchlistKey, next.slice(0, 50));
}

export function createWatchlistItemFromReport(report: ResearchReport): WatchlistItem | null {
  const candidate = report.candidates[0];
  if (!candidate) return null;

  return {
    id: `${report.id}:${candidate.name}`,
    reportId: report.id,
    assetName: candidate.name,
    assetSymbol: candidate.symbol,
    market: report.input.market || report.input.timeframe || "公开市场",
    sourceSkill: report.skillName,
    thesis: report.thesis,
    evidenceScore: candidate.evidenceScore,
    riskLevel: candidate.riskLevel,
    status: candidate.watchOrReject === "reject" ? "不进入观察池" : "研究观察中",
    addedAt: new Date().toISOString(),
  };
}
