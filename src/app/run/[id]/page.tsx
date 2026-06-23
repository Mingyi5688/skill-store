import { notFound } from "next/navigation";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { StatusBadge } from "@/components/StatusBadge";
import { RunSkillPanel } from "@/components/RunSkillPanel";
import { skills, getSkillById } from "@/data/skills";

export function generateStaticParams() {
  return skills.map((skill) => ({ id: skill.id }));
}

export default async function RunSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const skill = getSkillById(id);

  if (!skill) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-ink">
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <StatusBadge status={skill.status} />
            <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300">
              Mock Runner
            </span>
          </div>
          <h1 className="text-3xl font-semibold text-white">{skill.name}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">{skill.subtitle}</p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs text-zinc-400">
            <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1">Token 预估 {skill.tokenEstimate}</span>
            <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1">
              Agent 托管：{skill.supportsAgent ? "支持" : "不支持"}
            </span>
            <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1">不接真实 AI API</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <RunSkillPanel skill={skill} />
      </section>
      <DisclaimerBox />
    </div>
  );
}
