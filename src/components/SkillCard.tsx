import Link from "next/link";
import { ArrowRight, Bot, PlayCircle, Star, Zap } from "lucide-react";
import { formatCompactNumber } from "@/components/utils";
import { StatusBadge } from "@/components/StatusBadge";
import type { SkillDefinition } from "@/types/skill";

export function SkillCard({ skill }: { skill: SkillDefinition }) {
  return (
    <article className="rounded-lg border border-line bg-panel p-5 shadow-terminal">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <StatusBadge status={skill.status} />
        <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300">
          {skill.priceLabel}
        </span>
        {skill.supportsAgent ? (
          <span className="inline-flex items-center gap-1 rounded-md border border-signal/30 bg-signal/10 px-2.5 py-1 text-xs text-signal">
            <Bot className="h-3.5 w-3.5" aria-hidden="true" />
            Agent
          </span>
        ) : null}
      </div>

      <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
      <p className="mt-2 min-h-12 text-sm leading-6 text-zinc-300">{skill.subtitle}</p>

      <div className="mt-5 grid grid-cols-3 gap-3 border-y border-line py-4 text-sm">
        <div>
          <p className="text-zinc-500">市场</p>
          <p className="mt-1 text-zinc-200">{skill.market.split("/")[0].trim()}</p>
        </div>
        <div>
          <p className="text-zinc-500">运行</p>
          <p className="mt-1 text-zinc-200">{formatCompactNumber(skill.runCount)}</p>
        </div>
        <div>
          <p className="text-zinc-500">评分</p>
          <p className="mt-1 inline-flex items-center gap-1 text-zinc-200">
            <Star className="h-3.5 w-3.5 text-caution" aria-hidden="true" />
            {skill.ratingAvg.toFixed(1)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
        <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-1">
          <Zap className="h-3.5 w-3.5 text-caution" aria-hidden="true" />
          约 {skill.tokenEstimate} Token
        </span>
        <span>{skill.ratingCount} 条评价</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {skill.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-md bg-white/5 px-2 py-1 text-xs text-zinc-400">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href={`/skills/${skill.id}`}
          className="inline-flex h-9 items-center gap-2 rounded-md border border-white/15 px-3 text-sm text-zinc-100 transition hover:border-white/30 hover:bg-white/5"
        >
          查看详情
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link
          href={`/run/${skill.id}`}
          className="inline-flex h-9 items-center gap-2 rounded-md bg-signal px-3 text-sm font-medium text-ink transition hover:bg-[#34d58c]"
        >
          <PlayCircle className="h-4 w-4" aria-hidden="true" />
          运行 Skill
        </Link>
      </div>
    </article>
  );
}
