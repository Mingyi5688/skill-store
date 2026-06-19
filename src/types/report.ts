export type RiskLevel = "low" | "medium" | "high" | "reject";

export interface IndustryChainLayer {
  layer: string;
  description: string;
  keyPlayers: string[];
}

export interface BottleneckInsight {
  name: string;
  whyItMatters: string;
  evidence: string[];
  beneficiaries: string[];
  risk: string;
}

export interface CandidateAsset {
  name: string;
  symbol?: string;
  reason: string;
  evidenceScore: number;
  riskLevel: RiskLevel;
  watchOrReject: "watch" | "review" | "reject";
}

export interface ResearchReport {
  id: string;
  title: string;
  generatedAt: string;
  skillId: string;
  skillName: string;
  input: Record<string, string>;
  executiveSummary: string;
  thesis: string;
  industryChain: IndustryChainLayer[];
  bottlenecks: BottleneckInsight[];
  candidates: CandidateAsset[];
  counterEvidence: string[];
  trackingSignals: string[];
  riskWarnings: string[];
  finalStatus: string;
  riskLevel: RiskLevel;
  disclaimer: string;
}

export interface WatchlistItem {
  id: string;
  reportId: string;
  assetName: string;
  assetSymbol?: string;
  market: string;
  sourceSkill: string;
  thesis: string;
  evidenceScore: number;
  riskLevel: RiskLevel;
  status: string;
  addedAt: string;
}
