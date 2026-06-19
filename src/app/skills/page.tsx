import { Search } from "lucide-react";
import { SkillCard } from "@/components/SkillCard";
import { skills } from "@/data/skills";

export default function SkillsPage() {
  return (
    <div className="bg-ink">
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-white">Skill 商店</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
                选择一个投研方法论，用结构化流程生成研究报告。所有 Public Skill 都基于公开资料整理，不代表创作者本人观点。
              </p>
            </div>
            <div className="flex h-10 min-w-72 items-center gap-2 rounded-md border border-white/10 bg-panel px-3 text-sm text-zinc-500">
              <Search className="h-4 w-4" aria-hidden="true" />
              <span>搜索将在后续版本开放</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </section>
    </div>
  );
}
