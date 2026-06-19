import { BadgeDollarSign, ChartNoAxesCombined, FileCheck2, UploadCloud } from "lucide-react";

const steps = [
  {
    title: "Public Skill 数据验证",
    description: "平台先用公开资料做方法论蒸馏，观察运行次数、收藏率和报告质量。",
    icon: ChartNoAxesCombined,
  },
  {
    title: "创作者确认",
    description: "创作者可以审核方法论、修正边界、补充独家框架，把 Skill 升级为 Verified。",
    icon: FileCheck2,
  },
  {
    title: "Official Skill 合作",
    description: "深度合作后提供独家内容、课程、更新节奏和订阅权益。",
    icon: UploadCloud,
  },
  {
    title: "订阅分润",
    description: "后续版本接入付费订阅后，创作者可获得透明的订阅分润。",
    icon: BadgeDollarSign,
  },
];

export default function CreatorPage() {
  return (
    <div className="bg-ink">
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-md border border-signal/30 bg-signal/10 px-3 py-1 text-sm text-signal">
              Creator Program
            </p>
            <h1 className="text-3xl font-semibold text-white">让投资方法论变成可运行、可验证、可复盘的 Skill。</h1>
            <p className="mt-4 text-base leading-7 text-zinc-300">
              创作者入驻不是把观点包装成荐股工具，而是把公开研究流程标准化：输入、证据、反证、风险、复盘字段都清晰可见。
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className="rounded-lg border border-line bg-panel p-5">
                <Icon className="h-5 w-5 text-signal" aria-hidden="true" />
                <h2 className="mt-4 text-base font-semibold text-white">{step.title}</h2>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{step.description}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <section className="rounded-lg border border-line bg-panel p-6">
            <h2 className="text-lg font-semibold text-white">创作者可获得什么</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-300">
              <li>· 把文章、公开框架或研究清单转成结构化 Skill。</li>
              <li>· 在 Skill 页面展示方法论、适用市场、数据来源和边界说明。</li>
              <li>· 后续支持 Verified / Official 标识、订阅分润和推广链接。</li>
              <li>· 用户看到的是研究流程，不是不可验证的结论或喊单。</li>
            </ul>
          </section>

          <section className="rounded-lg border border-caution/30 bg-caution/10 p-6">
            <h2 className="text-lg font-semibold text-caution">第一版暂不开放后台</h2>
            <p className="mt-4 text-sm leading-6 text-caution">
              MVP 阶段先验证 Skill 商店、详情页、运行器和 mock 报告路径。创作者后台、上传、定价、分润、Stripe 支付和合同流程会在后续版本开发。
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
