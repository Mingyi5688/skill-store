import type { SkillDefinition, SkillStatus } from "@/types/skill";

export const complianceDisclaimer =
  "本产品仅用于公开资料整理、投资研究辅助和学习，不构成投资建议、买卖建议、收益承诺或个性化资产配置建议。用户需自行判断并承担投资风险。";

export const skills: SkillDefinition[] = [
  {
    id: "serenity-supply-chain-bottleneck",
    name: "Serenity 供应链卡点研究 Skill",
    subtitle: "用供应链瓶颈方法拆解产业链中的关键约束和受益环节",
    category: "stocks",
    status: "public",
    creatorName: "Serenity / 公开方法论整理",
    sourceNote:
      "非官方 Public Skill，基于公开资料和公开讨论整理，不代表创作者本人观点，也不存在官方合作关系。",
    description:
      "适用于美股、A 股、港股、半导体、AI 基建、电力、光模块等方向的产业链研究。它不会给出买卖建议，而是把研究对象拆成需求来源、瓶颈环节、候选标的、证据强度、反证条件和跟踪指标。",
    market: "美股 / A 股 / 港股 / 产业链",
    priceLabel: "Free Preview",
    rating: 4.8,
    runCount: 12840,
    tags: ["供应链", "半导体", "AI 基建", "证据链"],
    methodology: [
      "先拆需求来源，再拆产业链层级，避免只追逐热门叙事。",
      "寻找最可能限制供给或放大需求的瓶颈环节。",
      "区分真正靠近瓶颈的公司和只是蹭热点的标的。",
      "用反证条件约束假设，避免把研究结论当成交易指令。",
    ],
    inputFields: [
      {
        name: "target",
        label: "分析对象",
        type: "text",
        required: true,
        placeholder: "例如：NVDA、AI 电力、CPO 光模块、半导体供应链",
      },
      {
        name: "market",
        label: "市场",
        type: "select",
        required: true,
        options: ["美股", "A 股", "港股", "加密货币", "其他"],
      },
      {
        name: "question",
        label: "补充问题",
        type: "textarea",
        required: false,
        placeholder: "例如：帮我找这个行业最可能卡脖子的环节和受益公司",
      },
    ],
    outputHighlights: [
      "行业需求来源",
      "产业链分层",
      "关键瓶颈",
      "候选观察标的",
      "证据强度",
      "反证条件",
      "风险提示",
      "后续跟踪指标",
    ],
    dataSources: ["公开财报", "公司公告", "行业报告摘要", "新闻与公开访谈", "用户补充材料"],
    sampleInputs: ["NVDA", "AI 电力", "CPO 光模块", "A 股国产替代"],
    complianceNotes: ["非官方", "基于公开资料", "不代表本人观点", "仅用于研究辅助"],
    disclaimer: complianceDisclaimer,
  },
  {
    id: "crypto-meme-radar",
    name: "Crypto 妖币雷达 Skill",
    subtitle: "识别加密市场中短期异常活跃币种的研究信号",
    category: "crypto",
    status: "public",
    creatorName: "平台公开数据方法论",
    sourceNote:
      "Public Skill，使用公开市场现象和通用风控框架整理，不代表任何交易所或项目方观点。",
    description:
      "用于观察短期异常活跃的币种，拆解交易量、社媒热度、上所催化、资金异动和风险等级。该 Skill 不提供追涨建议，只帮助用户判断是否值得进一步研究。",
    market: "加密货币 / 交易所异动 / 社媒热度",
    priceLabel: "Free Preview",
    rating: 4.6,
    runCount: 9360,
    tags: ["加密货币", "异动", "风险识别", "社媒热度"],
    methodology: [
      "先确认异动来自公告、上所、交易量还是社媒传播。",
      "把短期热度和可持续基本面分开处理。",
      "用流动性、集中度和追高风险过滤噪音。",
      "只输出观察等级，不输出买卖或仓位建议。",
    ],
    inputFields: [
      {
        name: "target",
        label: "币种 / 交易所 / 赛道",
        type: "text",
        required: true,
        placeholder: "例如：Binance 新币、OKX 异动币、LAB / UB / RAVE 类似妖币",
      },
      {
        name: "timeframe",
        label: "观察周期",
        type: "select",
        required: true,
        options: ["15 分钟", "1 小时", "4 小时", "24 小时", "7 天"],
      },
      {
        name: "question",
        label: "补充问题",
        type: "textarea",
        required: false,
        placeholder: "例如：判断这是不是短期炒作，并列出不能追高的条件",
      },
    ],
    outputHighlights: [
      "异动原因",
      "热度变化",
      "交易量变化",
      "上所或公告催化",
      "短期炒作判断",
      "风险等级",
      "观察池建议",
      "禁止追高提示",
    ],
    dataSources: ["交易所公告", "公开行情榜单", "社媒公开信息", "项目公告", "用户补充线索"],
    sampleInputs: ["Binance 新币", "OKX 异动币", "Bybit 涨幅榜", "LAB 类似妖币"],
    complianceNotes: ["不提供买卖建议", "不承诺收益", "高波动风险提示", "仅做研究筛选"],
    disclaimer: complianceDisclaimer,
  },
  {
    id: "polymarket-15m-trader-filter",
    name: "Polymarket 15min Crypto 交易员筛选 Skill",
    subtitle: "用 PnL 周期、ROI 和市场子集表现筛选交易员行为",
    category: "prediction_market",
    status: "public",
    creatorName: "Polymarket 公开行为研究规则",
    sourceNote:
      "Public Skill，基于公开交易员行为和用户规则整理，不代表 Polymarket 官方或任何交易员本人观点。",
    description:
      "用于研究 Polymarket 15 分钟加密市场中的交易员质量，包括胜率、ROI、PnL 周期、是否存在追高风险，以及是否仅适合进入 selective_15m_review。",
    market: "Polymarket / 预测市场 / Crypto 15min",
    priceLabel: "Free Preview",
    rating: 4.7,
    runCount: 6215,
    tags: ["Polymarket", "15min Crypto", "交易员筛选", "复查队列"],
    methodology: [
      "主页 PnL 1D / 1W / 1M / 1Y 必须全部为正才可进入 watchlist。",
      "任一周期为负时，不进入 watchlist，可进入 pending_recheck 或 quarantine。",
      "低 15min 占比账号不一刀切淘汰，要看 15min Crypto 子集样本。",
      "若进入 selective_15m_review，后续只研究 15min Crypto 子集。",
    ],
    inputFields: [
      {
        name: "target",
        label: "交易员地址 / 用户名",
        type: "text",
        required: true,
        placeholder: "例如：0x... 或 Polymarket trader handle",
      },
      {
        name: "market",
        label: "市场子集",
        type: "select",
        required: true,
        options: ["15min Crypto", "Crypto 全市场", "混合市场", "未知"],
      },
      {
        name: "question",
        label: "补充问题",
        type: "textarea",
        required: false,
        placeholder: "例如：判断是否可以进入 selective_15m_review，以及需要复查哪些指标",
      },
    ],
    outputHighlights: [
      "15min Crypto 占比",
      "胜率",
      "ROI",
      "PnL 周期全正检查",
      "高价追单风险",
      "watchlist / quarantine 判断",
      "selective_15m_review 判断",
      "后续复查指标",
    ],
    dataSources: ["Polymarket 公开页面", "公开交易记录", "用户补充截图", "手动复查记录"],
    sampleInputs: ["0x7a...c91", "Crypto 15min 高频账号", "混合市场交易员"],
    complianceNotes: ["不提供跟单建议", "不复制交易", "只研究公开行为", "需要人工复查"],
    disclaimer: complianceDisclaimer,
  },
];

export function getSkillById(id: string) {
  return skills.find((skill) => skill.id === id);
}

export function getStatusLabel(status: SkillStatus) {
  const labels: Record<SkillStatus, string> = {
    public: "Public Skill",
    verified: "Verified Skill",
    official: "Official Skill",
  };

  return labels[status];
}
