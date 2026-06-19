import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Database, FileText, ShieldCheck } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { skills, getSkillById } from "@/data/skills";

export function generateStaticParams() {
  return skills.map((skill) => ({ id: skill.id }));
}

export default async function SkillDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const skill = getSkillById(id);

  if (!skill) {
    notFound();
  }

  return (
    <div className="bg-ink">
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <StatusBadge status={skill.status} />
            <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300">
              {skill.priceLabel}
            </span>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <h1 className="text-3xl font-semibold text-white">{skill.name}</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300">{skill.description}</p>
              <p className="mt-5 rounded-lg border border-caution/30 bg-caution/10 p-4 text-sm leading-6 text-caution">
                {skill.sourceNote}
              </p>
            </div>
            <aside className="rounded-lg border border-line bg-panel p-5">
              <p className="text-sm text-zinc-500">适用市场</p>
              <p className="mt-2 text-white">{skill.market}</p>
              <p className="mt-5 text-sm text-zinc-500">创建者 / 来源</p>
              <p className="mt-2 text-white">{skill.creatorName}</p>
              <Link
                href={`/run/${skill.id}`}
                className="mt-6 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-signal px-4 text-sm font-semibold text-ink transition hover:bg-[#34d58c]"
              >
                运行 Skill
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="rounded-lg border border-line bg-panel p-5">
          <div className="mb-4 flex items-center gap-2">
            <FileText className="h-4 w-4 text-signal" aria-hidden="true" />
            <h2 className="text-base font-semibold text-white">方法论</h2>
          </div>
          <ul className="space-y-3 text-sm leading-6 text-zinc-300">
            {skill.methodology.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-line bg-panel p-5">
          <div className="mb-4 flex items-center gap-2">
            <Database className="h-4 w-4 text-signal" aria-hidden="true" />
            <h2 className="text-base font-semibold text-white">输入与输出</h2>
          </div>
          <p className="text-sm text-zinc-500">输入示例</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {skill.sampleInputs.map((item) => (
              <span key={item} className="rounded-md bg-white/5 px-2 py-1 text-xs text-zinc-300">
                {item}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm text-zinc-500">输出结构</p>
          <ul className="mt-2 space-y-2 text-sm leading-6 text-zinc-300">
            {skill.outputHighlights.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-line bg-panel p-5">
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-signal" aria-hidden="true" />
            <h2 className="text-base font-semibold text-white">数据与合规</h2>
          </div>
          <p className="text-sm text-zinc-500">数据源说明</p>
          <ul className="mt-2 space-y-2 text-sm leading-6 text-zinc-300">
            {skill.dataSources.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-zinc-500">边界提示</p>
          <ul className="mt-2 space-y-2 text-sm leading-6 text-zinc-300">
            {skill.complianceNotes.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
