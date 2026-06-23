export type AssetType = "stock" | "crypto" | "forex" | "future" | "macro";

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  market: string;
  marketSlug: "stocks" | "crypto" | "forex" | "futures" | "macro";
  assetType: AssetType;
  price: number;
  priceLabel?: string;
  changePercent: number;
  volume?: number;
  sparkline: number[];
  relatedSkillIds: string[];
  watchedBySkillCount: number;
  hasAgentAlert: boolean;
  updatedAt: string;
}
