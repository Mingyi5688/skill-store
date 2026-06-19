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

  if (skill.id === "polymarket-15m-trader-filter") {
    return {
      id: commonId(),
      title: `${target} Polymarket 15min Crypto 交易员行为研究`,
      generatedAt: new Date().toISOString(),
      skillId: skill.id,
      skillName: skill.name,
      input,
      executiveSummary:
        `${target} 的 mock 筛选结果显示：当前更适合进入 selective_15m_review，而不是直接进入 watchlist。原因是 15min Crypto 子集需要单独验证，不能把全市场表现直接外推到短周期市场。`,
      thesis:
        "只有当 PnL 1D / 1W / 1M / 1Y 全部为正，且 15min Crypto 子集样本充足、ROI 稳定、追高风险可控时，才考虑进入观察池。",
      industryChain: [
        {
          layer: "账户表现层",
          description: "检查主页 PnL 周期、ROI、胜率和最大回撤。",
          keyPlayers: ["交易员账户", "公开交易历史"],
        },
        {
          layer: "市场子集层",
          description: "单独拆分 15min Crypto 交易，避免混合市场收益掩盖真实能力。",
          keyPlayers: ["15min Crypto 市场", "混合市场订单"],
        },
      ],
      bottlenecks: [
        {
          name: "PnL 周期一致性",
          whyItMatters: "任一周期为负时，账号稳定性不足，不应进入 watchlist。",
          evidence: ["需要核对 1D / 1W / 1M / 1Y", "需要核对 15min 子集样本数"],
          beneficiaries: ["复查流程", "观察池质量控制"],
          risk: "样本过小或只在少数行情中有效，容易误判交易员质量。",
        },
      ],
      candidates: [
        {
          name: target,
          reason: "可进入 selective_15m_review，等待 15-30 分钟后复查周期 PnL 与订单价格。",
          evidenceScore: 0.64,
          riskLevel: "medium",
          watchOrReject: "review",
        },
      ],
      counterEvidence: [
        "任一 PnL 周期转负。",
        "15min Crypto 样本不足。",
        "出现明显高价追单或极端赔率下注。",
        "收益主要来自非 Crypto 市场。",
      ],
      trackingSignals: ["PnL 1D", "PnL 1W", "PnL 1M", "PnL 1Y", "15min Crypto 占比", "高价追单比例"],
      riskWarnings: ["不提供跟单建议", "公开页面可能滞后", "交易员历史表现不代表未来结果"],
      finalStatus: "selective_15m_review",
      riskLevel: "medium",
      disclaimer: complianceDisclaimer,
    };
  }

  return {
    id: commonId(),
    title: `${target} 供应链卡点研究报告`,
    generatedAt: new Date().toISOString(),
    skillId: skill.id,
    skillName: skill.name,
    input,
    executiveSummary:
      `${target} 仍适合从产业链瓶颈角度继续研究。mock 报告认为，主线不应只看单一公司或单一产品，而要把需求来源、上游约束、关键材料/产能、二阶受益环节和反证条件拆开。`,
    thesis:
      "如果终端需求继续扩张，而关键产能、材料或基础设施供给无法同步释放，则靠近瓶颈的环节更值得进入研究候选池。",
    industryChain: [
      {
        layer: "上游",
        description: "核心材料、制造能力、先进封装、设备和能源基础设施。",
        keyPlayers: ["晶圆制造", "先进封装", "HBM", "电力设备", "散热"],
      },
      {
        layer: "中游",
        description: "芯片、服务器、网络互联、系统集成和产能调度。",
        keyPlayers: ["GPU", "服务器厂商", "光模块", "交换机"],
      },
      {
        layer: "下游",
        description: "云厂商、企业 AI 应用、训练和推理需求。",
        keyPlayers: ["云服务商", "AI 应用公司", "企业客户"],
      },
    ],
    bottlenecks: [
      {
        name: "先进封装 / 高带宽内存",
        whyItMatters:
          "高端 AI 算力扩张依赖封装、HBM 和供应链协同，任何环节扩产滞后都可能形成供给约束。",
        evidence: ["扩产周期较长", "高端产能集中", "客户需求仍在迁移到 AI 算力"],
        beneficiaries: ["先进封装供应链", "HBM 供应链", "设备材料公司"],
        risk: "如果产能快速释放或终端资本开支下调，瓶颈逻辑会削弱。",
      },
      {
        name: "数据中心电力与散热",
        whyItMatters:
          "AI 服务器功耗提升会把研究重点从芯片本身扩散到电力、散热和数据中心基础设施。",
        evidence: ["数据中心能耗上升", "高功率机柜渗透", "云厂商基础设施投入增加"],
        beneficiaries: ["电力设备", "散热方案", "数据中心基础设施"],
        risk: "若建设节奏放缓或利用率低于预期，二阶受益逻辑可能延后。",
      },
    ],
    candidates: [
      {
        name: `${target} 相关上游瓶颈环节`,
        reason: "更接近供给约束，适合作为研究候选方向，而不是直接交易信号。",
        evidenceScore: 0.72,
        riskLevel: "medium",
        watchOrReject: "watch",
      },
      {
        name: "纯概念热点标的",
        reason: "缺少订单、产能或客户验证，当前更像叙事扩散。",
        evidenceScore: 0.34,
        riskLevel: "high",
        watchOrReject: "reject",
      },
    ],
    counterEvidence: [
      "终端客户资本开支明显下调。",
      "关键产能快速释放，瓶颈不再稀缺。",
      "订单能见度下降或毛利率持续下滑。",
      "主题估值已经充分反映乐观预期。",
    ],
    trackingSignals: ["云厂商资本开支", "先进封装产能", "HBM 供需", "电力设备订单", "毛利率变化"],
    riskWarnings: ["不要把研究候选等同于买入建议", "mock 报告不含实时财务数据", "需要人工核对公开来源"],
    finalStatus: "research_candidate",
    riskLevel: "medium",
    disclaimer: complianceDisclaimer,
  };
}
