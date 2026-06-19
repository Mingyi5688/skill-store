import { AlertTriangle, CheckCircle2, CircleSlash2 } from "lucide-react";

const doList = ["公开资料整理", "证据链研究", "风险反证", "候选观察池", "复盘字段", "方法论学习"];
const avoidList = ["自动下单", "收益承诺", "个性化荐股", "复制交易", "代客理财", "官方代理暗示"];

export default function AboutPage() {
  return (
    <div className="bg-ink">
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-white">关于 Invest Skill Store</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300">
            这是一个投资研究 Skill 应用商店的第一版 MVP。目标是把优秀投资者、研究员、交易员和链上分析师的公开方法论，转成可运行、可验证、可复盘的研究流程。
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <article className="rounded-lg border border-line bg-panel p-6 lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-signal" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-white">产品定位</h2>
          </div>
          <p className="text-sm leading-6 text-zinc-300">
            正确定位是投资研究 Skill 平台、公开资料分析工具、证据链研究助手和风险反证系统。它帮助用户把复杂信息整理成结构化研究报告，而不是替用户做投资决策。
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {doList.map((item) => (
              <span key={item} className="rounded-md border border-signal/30 bg-signal/10 px-2.5 py-1 text-sm text-signal">
                {item}
              </span>
            ))}
          </div>
        </article>

        <article className="rounded-lg border border-danger/30 bg-danger/10 p-6">
          <div className="mb-4 flex items-center gap-2">
            <CircleSlash2 className="h-5 w-5 text-danger" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-danger">不做什么</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {avoidList.map((item) => (
              <span key={item} className="rounded-md border border-danger/30 bg-danger/10 px-2.5 py-1 text-sm text-danger">
                {item}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-caution/30 bg-caution/10 p-6">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-caution" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-caution">合规边界</h2>
          </div>
          <p className="text-sm leading-6 text-caution">
            所有 Public Skill 都必须说明非官方、基于公开资料、不代表本人观点、不存在合作关系。报告必须包含证据强度、反证条件、风险提示和免责声明。缺少数据时不能编造来源。
          </p>
        </div>
      </section>
    </div>
  );
}
