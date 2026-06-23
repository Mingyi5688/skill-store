export interface LeaderboardEntry {
  rank: number;
  name: string;
  label: string;
  value: string;
  change: string;
}

export interface Leaderboard {
  id: string;
  title: string;
  description: string;
  entries: LeaderboardEntry[];
}

export const leaderboards: Leaderboard[] = [
  {
    id: "skill-rating",
    title: "Skill 评分榜",
    description: "按 mock 用户评分和评价数量排序。",
    entries: [
      { rank: 1, name: "AI 半导体供应链 Skill", label: "评分", value: "4.9", change: "+0.1" },
      { rank: 2, name: "Serenity 供应链卡点研究 Skill", label: "评分", value: "4.8", change: "稳定" },
      { rank: 3, name: "宏观流动性分析 Skill", label: "评分", value: "4.8", change: "+0.2" },
    ],
  },
  {
    id: "skill-runs",
    title: "Skill 运行次数榜",
    description: "按最近 mock 运行量排序。",
    entries: [
      { rank: 1, name: "AI 半导体供应链 Skill", label: "运行", value: "1.56 万", change: "+18%" },
      { rank: 2, name: "Serenity 供应链卡点研究 Skill", label: "运行", value: "1.28 万", change: "+12%" },
      { rank: 3, name: "宏观流动性分析 Skill", label: "运行", value: "1.19 万", change: "+9%" },
    ],
  },
  {
    id: "kol-impact",
    title: "KOL 影响力榜",
    description: "基于公开讨论热度和方法论被收藏次数的 mock 排名。",
    entries: [
      { rank: 1, name: "Serenity 供应链框架", label: "影响力", value: "96", change: "+5" },
      { rank: 2, name: "宏观流动性框架", label: "影响力", value: "91", change: "+3" },
      { rank: 3, name: "RWA 叙事模型", label: "影响力", value: "84", change: "+8" },
    ],
  },
  {
    id: "subscriptions",
    title: "用户订阅榜",
    description: "按 mock 订阅热度排序。",
    entries: [
      { rank: 1, name: "Pro 会员", label: "订阅", value: "38%", change: "+4%" },
      { rank: 2, name: "Sector 加密货币板块", label: "订阅", value: "24%", change: "+7%" },
      { rank: 3, name: "Agent Cloud", label: "订阅", value: "11%", change: "+3%" },
    ],
  },
  {
    id: "us-stock-gainers",
    title: "美股涨幅榜",
    description: "基于 mock 行情的热门美股涨幅。",
    entries: [
      { rank: 1, name: "AVGO 博通", label: "涨幅", value: "+3.1%", change: "AI 芯片" },
      { rank: 2, name: "NVDA 英伟达", label: "涨幅", value: "+2.4%", change: "算力需求" },
      { rank: 3, name: "MSFT 微软", label: "涨幅", value: "+1.1%", change: "云业务" },
    ],
  },
  {
    id: "us-stock-hot",
    title: "美股热门榜",
    description: "按 Skill 关注数量和 mock 成交额排序。",
    entries: [
      { rank: 1, name: "NVDA 英伟达", label: "关注 Skill", value: "6", change: "Agent 异动" },
      { rank: 2, name: "MSFT 微软", label: "关注 Skill", value: "5", change: "财报季" },
      { rank: 3, name: "AVGO 博通", label: "关注 Skill", value: "5", change: "半导体" },
    ],
  },
  {
    id: "crypto-meme",
    title: "加密妖币榜",
    description: "只展示加密市场短期异常活跃标的，不构成追高建议。",
    entries: [
      { rank: 1, name: "PEPE", label: "涨幅", value: "+9.8%", change: "高风险" },
      { rank: 2, name: "ONDO", label: "涨幅", value: "+6.3%", change: "RWA 热度" },
      { rank: 3, name: "SOL", label: "涨幅", value: "+4.7%", change: "链上活跃" },
    ],
  },
  {
    id: "crypto-volume",
    title: "加密成交额榜",
    description: "按 mock 成交额展示主流加密资产。",
    entries: [
      { rank: 1, name: "BTC 比特币", label: "成交额", value: "392 亿", change: "+1.6%" },
      { rank: 2, name: "ETH 以太坊", label: "成交额", value: "189 亿", change: "+2.2%" },
      { rank: 3, name: "SOL Solana", label: "成交额", value: "51 亿", change: "+4.7%" },
    ],
  },
  {
    id: "fx-strength",
    title: "外汇强弱榜",
    description: "基于 mock 外汇变动排序。",
    entries: [
      { rank: 1, name: "USD/JPY", label: "变化", value: "+0.5%", change: "美元偏强" },
      { rank: 2, name: "EUR/USD", label: "变化", value: "+0.3%", change: "欧元修复" },
      { rank: 3, name: "DXY 美元指数", label: "变化", value: "-0.2%", change: "小幅回落" },
    ],
  },
  {
    id: "futures-anomaly",
    title: "期货异动榜",
    description: "基于 mock 商品期货波动排序。",
    entries: [
      { rank: 1, name: "天然气", label: "变化", value: "+3.4%", change: "供需扰动" },
      { rank: 2, name: "黄金", label: "变化", value: "+1.2%", change: "避险需求" },
      { rank: 3, name: "原油", label: "变化", value: "-1.7%", change: "库存压力" },
    ],
  },
  {
    id: "agent-hit",
    title: "Agent 命中榜",
    description: "按 mock Agent 研究提醒命中次数排序。",
    entries: [
      { rank: 1, name: "AI 基建供应链 Agent", label: "提醒", value: "18", change: "命中 7 次" },
      { rank: 2, name: "宏观流动性 Agent", label: "提醒", value: "14", change: "命中 5 次" },
      { rank: 3, name: "加密异动 Agent", label: "提醒", value: "13", change: "命中 4 次" },
    ],
  },
  {
    id: "replay-performance",
    title: "复盘表现榜",
    description: "按 mock 复盘表现和用户标记有帮助次数排序。",
    entries: [
      { rank: 1, name: "宏观流动性分析 Skill", label: "复盘", value: "92", change: "+6" },
      { rank: 2, name: "Serenity 供应链卡点研究 Skill", label: "复盘", value: "89", change: "+4" },
      { rank: 3, name: "美股财报拆解 Skill", label: "复盘", value: "86", change: "+3" },
    ],
  },
];
