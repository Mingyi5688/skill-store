import { BarChart3, CheckCircle2, FileText, ListChecks } from "lucide-react";
import { RiskBadge } from "@/components/RiskBadge";
import type { ResearchReport } from "@/types/report";

function Section({
  title,
  children,
  icon: Icon,
}: {
  title: string;
  children: React.ReactNode;
  icon: typeof FileText;
}) {
  return (
    <section className="rounded-lg border border-line bg-panel p-5">
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-4 w-4 text-signal" aria-hidden="true" />
        <h3 className="text-base font-semibold text-white">{title}</h3>
      </div>
      {children}
    </section>
  );
}

export function ReportView({ report }: { report: ResearchReport }) {
  return (
    <div className="space-y-5">
      <section className="rounded-lg border border-line bg-panel p-5">
        <div className="flex flex-wrap items-center gap-3">
          <RiskBadge level={report.riskLevel} />
          <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300">
            {report.finalStatus}
          </span>
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-white">{report.title}</h2>
        <p className="mt-3 text-sm leading-6 text-zinc-300">{report.executiveSummary}</p>
        <p className="mt-4 text-xs text-zinc-500">
          生成时间：{new Date(report.generatedAt).toLocaleString("zh-CN")} · 使用 Skill：{report.skillName}
        </p>
      </section>

      <Section title="核心研究假设" icon={FileText}>
        <p className="text-sm leading-6 text-zinc-300">{report.thesis}</p>
      </Section>

      <Section title="产业链拆解" icon={BarChart3}>
        <div className="grid gap-3 md:grid-cols-3">
          {report.industryChain.map((layer) => (
            <div key={layer.layer} className="rounded-md border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white">{layer.layer}</h4>
              <p className="mt-2 text-sm leading-6 text-zinc-300">{layer.description}</p>
              <p className="mt-3 text-xs text-zinc-500">{layer.keyPlayers.join(" / ")}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="关键卡点" icon={ListChecks}>
        <div className="space-y-4">
          {report.bottlenecks.map((item) => (
            <div key={item.name} className="border-b border-line pb-4 last:border-0 last:pb-0">
              <h4 className="text-sm font-semibold text-white">{item.name}</h4>
              <p className="mt-2 text-sm leading-6 text-zinc-300">{item.whyItMatters}</p>
              <p className="mt-2 text-sm text-zinc-400">可能受益环节：{item.beneficiaries.join(" / ")}</p>
              <p className="mt-2 text-sm text-danger">风险：{item.risk}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="候选观察对象" icon={CheckCircle2}>
        <div className="space-y-3">
          {report.candidates.map((candidate) => (
            <div
              key={`${candidate.name}-${candidate.symbol ?? "na"}`}
              className="flex flex-col gap-3 rounded-md border border-white/10 bg-white/5 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h4 className="text-sm font-semibold text-white">{candidate.name}</h4>
                <p className="mt-2 text-sm leading-6 text-zinc-300">{candidate.reason}</p>
                <p className="mt-2 text-xs text-zinc-500">证据强度：{Math.round(candidate.evidenceScore * 100)}%</p>
              </div>
              <RiskBadge level={candidate.riskLevel} />
            </div>
          ))}
        </div>
      </Section>

      <div className="grid gap-5 md:grid-cols-3">
        <Section title="反证条件" icon={FileText}>
          <ul className="space-y-2 text-sm leading-6 text-zinc-300">
            {report.counterEvidence.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
        </Section>
        <Section title="跟踪指标" icon={BarChart3}>
          <ul className="space-y-2 text-sm leading-6 text-zinc-300">
            {report.trackingSignals.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
        </Section>
        <Section title="风险提示" icon={ListChecks}>
          <ul className="space-y-2 text-sm leading-6 text-zinc-300">
            {report.riskWarnings.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
        </Section>
      </div>

      <section className="rounded-lg border border-caution/30 bg-caution/10 p-5 text-sm leading-6 text-caution">
        {report.disclaimer}
      </section>
    </div>
  );
}
