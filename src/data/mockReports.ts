import { complianceDisclaimer } from "@/data/skills";
import type { SkillDefinition } from "@/types/skill";
import type { ResearchReport } from "@/types/report";

function value(input: Record<string, string>, key: string, fallback: string) {
  const raw = input[key]?.trim();
  return raw && raw.length > 0 ? raw : fallback;
}

function commonId() {
  return `mock-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createMockReport(
  skill: SkillDefinition,
  input: Record<string, string>,
): ResearchReport {
  const target = value(input, "target", "未命名研究对象");

  if (skill.id === "crypto-meme-radar") {
    return {
      id: commonId(),
      title: `${target} 异动信号研究报告`,
      generatedAt: new Date().toISOString(),
      skillId: skill.id,
      skillName: skill.name,
      input,
      executiveSummary:
        `${target} 当前更适合被视为高波动观察对象，而不是直接行动信号。mock 结果显示，短期热度可能来自公告、榜单曝光或社媒扩散，需要继续验证交易量持续性和流动性质量。`,
      thesis:
        "如果交易量放大能够持续，同时社媒热度没有快速衰减，该标的可进入短周期研究候选池；如果异动只来自单一渠道，风险等级应保持偏高。",
      industryChain: [
        {
          layer: "催化层",
          description: "上所公告、交易所活动、KOL 提及或榜单曝光可能带来第一波流量。",
          keyPlayers: ["交易所", "项目方", "社媒传播节点"],
        },
        {
          layer: "流动性层",
          description: "观察成交量、盘口深度、换手率和资金集中度，判断热度是否可持续。",
          keyPlayers: ["做市方", "短线资金", "交易用户"],
        },
      ],
      bottlenecks: [
        {
          name: "流动性持续性",
          whyItMatters: "妖币行情常见问题是成交量来得快、退得也快，流动性不足时追高风险会迅速放大。",
          evidence: ["成交量短时放大", "社媒讨论上升", "榜单曝光增加"],
          beneficiaries: ["研究型观察者", "风控流程"],
          risk: "若成交量回落或大户集中卖出，短期逻辑可能失效。",
        },
      ],
      candidates: [
        {
          name: target,
          symbol: target.toUpperCase().slice(0, 8),
          reason: "存在异常热度，但仍需验证交易量和社媒热度是否持续。",
          evidenceScore: 0.58,
          riskLevel: "high",
          watchOrReject: "review",
        },
      ],
      counterEvidence: [
        "成交量在 1-4 小时内快速回落。",
        "热度主要来自少数账号集中传播。",
        "项目方公告缺少实质进展。",
        "流动性深度不足，价格容易被小额资金推动。",
      ],
      trackingSignals: ["成交量持续性", "盘口深度", "交易所公告", "社媒热度衰减速度", "大额地址异动"],
      riskWarnings: ["高波动资产不适合追高", "mock 报告不包含实时行情", "缺少数据时不能编造来源"],
      finalStatus: "进入短周期研究候选池，但风险偏高",
      riskLevel: "high",
      disclaimer: complianceDisclaimer,
    };
  }

  return {
    id: commonId(),
    title: `${target} ${skill.name} mock 研究报告`,
    generatedAt: new Date().toISOString(),
    skillId: skill.id,
    skillName: skill.name,
    input,
    executiveSummary:
      `${target} 仍适合进入结构化研究流程。mock 报告认为，当前不能把单一异动直接等同为行动信号，需要把驱动因素、证据强度、相关资产、风险等级和反证条件拆开。`,
    thesis:
      "如果核心驱动能够被多条公开证据交叉验证，且反证条件暂未触发，该对象可进入研究候选池；若证据只来自单一渠道，应保持谨慎观察。",
    industryChain: [
      {
        layer: "核心驱动",
        description: "拆解当前研究对象的主要催化、需求来源、资金关注度或宏观背景。",
        keyPlayers: ["公开公告", "财报线索", "宏观指标", "市场异动"],
      },
      {
        layer: "证据层",
        description: "用公开资料、用户补充材料和市场表现交叉验证，不把单一叙事当成结论。",
        keyPlayers: ["公司披露", "行业新闻", "成交变化", "公开研究摘要"],
      },
      {
        layer: "风险层",
        description: "列出可能推翻当前研究假设的反证条件，避免把报告当作确定性指令。",
        keyPlayers: ["估值消化", "政策变化", "流动性变化", "基本面转弱"],
      },
    ],
    bottlenecks: [
      {
        name: "证据强度不足",
        whyItMatters:
          "如果研究结论只来自单一新闻、短期价格波动或社媒讨论，后续复盘容易出现方向性误判。",
        evidence: ["出现公开催化", "市场关注度上升", "相关资产被多个 Skill 关注"],
        beneficiaries: ["研究清单", "Watchlist", "Agent 监控"],
        risk: "若公开证据无法延续，当前研究假设需要降级。",
      },
      {
        name: "风险边界需要持续更新",
        whyItMatters: "股票、加密、外汇、期货和宏观资产都可能受突发事件影响，研究结论需要动态复查。",
        evidence: ["波动率变化", "成交量变化", "相关宏观指标变化"],
        beneficiaries: ["风险提示", "反证条件", "后续观察指标"],
        risk: "如果风险事件触发，原有候选方向应转入复查而非继续强化。",
      },
    ],
    candidates: [
      {
        name: `${target} 相关研究对象`,
        reason: "存在可整理的公开信号，适合作为研究候选方向，而不是直接交易信号。",
        evidenceScore: 0.72,
        riskLevel: "medium",
        watchOrReject: "watch",
      },
      {
        name: "单一叙事驱动对象",
        reason: "缺少多来源验证，当前更像短期叙事扩散。",
        evidenceScore: 0.34,
        riskLevel: "high",
        watchOrReject: "reject",
      },
    ],
    counterEvidence: [
      "核心公开证据无法延续。",
      "相关资产成交量或关注度快速回落。",
      "财报、公告或宏观数据与原假设相反。",
      "风险事件改变市场定价逻辑。",
    ],
    trackingSignals: ["公开公告", "成交量变化", "相关资产联动", "宏观指标变化", "用户手动复盘"],
    riskWarnings: ["不要把研究候选等同于买卖建议", "mock 报告不含实时行情或真实财务数据", "需要人工核对公开来源"],
    finalStatus: "research_candidate",
    riskLevel: "medium",
    disclaimer: complianceDisclaimer,
  };
}
