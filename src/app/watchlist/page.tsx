import { WatchlistClient } from "@/components/WatchlistClient";

export default function WatchlistPage() {
  return (
    <div className="min-h-screen bg-ink">
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-white">Watchlist 观察池</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
            保存值得继续跟踪的研究对象。当前版本仅做本地 mock 保存，不做自动监控、交易提醒或买卖建议。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <WatchlistClient />
      </section>
    </div>
  );
}
