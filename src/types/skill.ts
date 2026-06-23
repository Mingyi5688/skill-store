export type SkillStatus = "public" | "verified" | "official";

export type SkillSourceType = "Public" | "Verified" | "Official";
export type SkillPricingType = "Free" | "Pro" | "Official";

export type SkillCategory =
  | "stocks"
  | "crypto"
  | "macro"
  | "forex"
  | "future"
  | "a_share"
  | "hong_kong_stock"
  | "supply_chain"
  | "financials"
  | "onchain"
  | "rwa";

export type SkillInputType = "text" | "textarea" | "select";

export interface SkillInputField {
  name: string;
  label: string;
  type: SkillInputType;
  required: boolean;
  placeholder?: string;
  options?: string[];
}

export interface SkillDefinition {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  category: SkillCategory;
  status: SkillStatus;
  sourceType: SkillSourceType;
  pricingType: SkillPricingType;
  creatorName?: string;
  creatorId?: string;
  sourceNote: string;
  description: string;
  market: string;
  markets: string[];
  priceLabel: string;
  rating: number;
  ratingAvg: number;
  ratingCount: number;
  runCount: number;
  supportsAgent: boolean;
  tokenEstimate: number;
  agentUseCase?: string;
  relatedAssetSymbols: string[];
  relatedSkillIds: string[];
  tags: string[];
  methodology: string[];
  inputFields: SkillInputField[];
  outputHighlights: string[];
  dataSources: string[];
  sampleInputs: string[];
  complianceNotes: string[];
  disclaimer: string;
  createdAt: string;
  updatedAt: string;
  version: string;
  purchasedMock?: boolean;
  hasRunMock?: boolean;
  scoreBreakdown?: {
    outputQuality: number;
    evidenceQuality: number;
    easeOfUse: number;
    riskWarning: number;
    replayValue: number;
  };
}
