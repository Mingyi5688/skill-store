import { ReportDetailClient } from "@/components/ReportDetailClient";

export default async function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-ink">
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-white">报告详情</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
            结构化展示 Skill 运行结果，并支持把候选对象加入本地观察池。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ReportDetailClient reportId={id} />
      </section>
    </div>
  );
}
