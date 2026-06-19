import Link from "next/link";
import { ArrowRight, Database, FileSearch, ListChecks, Store } from "lucide-react";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { SkillCard } from "@/components/SkillCard";
import { skills } from "@/data/skills";

const workflow = [
  {
    title: "选择 Skill",
    description: "从供应链、加密异动、预测市场交易员等研究流程中选择一个方法论。",
    icon: Store,
  },
  {
    title: "输入问题",
    description: "填写股票、行业、币种、地址或补充问题，让 Skill 固定研究边界。",
    icon: FileSearch,
  },
  {
    title: "生成报告",
    description: "输出结构化摘要、证据链、反证条件、候选观察对象和风险提示。",
    icon: Database,
  },
  {
    title: "加入观察池",
    description: "把值得继续研究的对象加入 Watchlist，后续再做复查和复盘。",
    icon: ListChecks,
  },
];

export default function HomePage() {
  return (
    <>
      <section className="border-b border-line bg-ink">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <div className="mb-5 inline-flex rounded-md border border-signal/30 bg-signal/10 px-3 py-1 text-sm text-signal">
              投资研究 Skill 应用商店 · MVP
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white">
              把优秀投资者的公开研究方法，变成可运行的 AI Skill。
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300">
              这是一个面向投研工作流的 Skill 商店雏形：选择方法论，输入研究对象，生成带证据链、反证条件和风险边界的结构化报告。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/skills"
                className="inline-flex h-10 items-center gap-2 rounded-md bg-white px-4 text-sm font-semibold text-ink transition hover:bg-zinc-200"
              >
                浏览 Skill
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/about"
                className="inline-flex h-10 items-center gap-2 rounded-md border border-white/15 px-4 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5"
              >
                了解边界
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-line bg-panel p-5 shadow-terminal">
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Skill 数量", "3"],
                ["真实交易 API", "未接入"],
                ["真实支付", "未接入"],
                ["报告模式", "Mock"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-md border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-zinc-500">{label}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-md border border-caution/30 bg-caution/10 p-4 text-sm leading-6 text-caution">
              当前版本只验证产品路径。Skill 运行结果来自本地 mock，不包含实时行情、真实 AI 推理或个性化建议。
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-ink/90">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-white">核心 Skill</h2>
              <p className="mt-2 text-sm text-zinc-400">第一版先覆盖三个高频研究入口。</p>
            </div>
            <Link href="/skills" className="hidden text-sm text-signal hover:text-[#34d58c] sm:inline">
              查看全部
            </Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {skills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink/95">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-white">工作流程</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {workflow.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-lg border border-line bg-panel p-5">
                  <Icon className="h-5 w-5 text-signal" aria-hidden="true" />
                  <h3 className="mt-4 text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <DisclaimerBox />
    </>
  );
}
