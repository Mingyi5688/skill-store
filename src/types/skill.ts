export type SkillStatus = "public" | "verified" | "official";

export type SkillCategory =
  | "stocks"
  | "crypto"
  | "prediction_market"
  | "macro"
  | "a_share"
  | "hong_kong_stock";

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
  subtitle: string;
  category: SkillCategory;
  status: SkillStatus;
  creatorName?: string;
  sourceNote: string;
  description: string;
  market: string;
  priceLabel: string;
  rating: number;
  runCount: number;
  tags: string[];
  methodology: string[];
  inputFields: SkillInputField[];
  outputHighlights: string[];
  dataSources: string[];
  sampleInputs: string[];
  complianceNotes: string[];
  disclaimer: string;
}
