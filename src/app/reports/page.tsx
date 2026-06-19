import { ReportHistoryClient } from "@/components/ReportHistoryClient";

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-ink">
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-white">报告历史</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
            查看当前浏览器保存过的 mock 研究报告。下一阶段接入数据库后，这里会变成用户自己的云端报告库。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ReportHistoryClient />
      </section>
    </div>
  );
}
