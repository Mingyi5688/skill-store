import { SkillCard } from "@/components/SkillCard";
import type { SkillDefinition } from "@/types/skill";

export function SkillRecommendation({
  title = "相关推荐 Skill",
  description,
  skills,
}: {
  title?: string;
  description?: string;
  skills: SkillDefinition[];
}) {
  if (skills.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {description ? <p className="mt-2 text-sm text-zinc-400">{description}</p> : null}
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </section>
  );
}
