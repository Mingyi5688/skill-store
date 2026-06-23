export type ArenaType = "celebrity" | "stocks" | "crypto" | "macro_future";

export interface ArenaHolding {
  id: string;
  assetSymbol: string;
  assetName: string;
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  pnlPercent: number;
  thesis: string;
  invalidation: string;
  openedAt: string;
}

export interface ArenaContestant {
  id: string;
  name: string;
  methodTag: string;
  skillId: string;
  initialCapital: number;
  currentEquity: number;
  cash: number;
  returnPercent: number;
  maxDrawdown: number;
  winRate: number;
  lastRebalanceAt: string;
  aiVerdict: string;
  holdings: ArenaHolding[];
}

export interface Arena {
  id: string;
  name: string;
  type: ArenaType;
  market: string;
  description: string;
  initialCapital: number;
  contestants: ArenaContestant[];
  updatedAt: string;
}
