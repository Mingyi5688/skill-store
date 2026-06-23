export type PricingPlanName = "Free" | "Basic" | "Pro" | "Sector" | "Max" | "Agent Cloud";

export interface PricingPlan {
  id: string;
  name: PricingPlanName;
  subtitle: string;
  priceMonthly: number;
  tokenAllowance: number;
  skillRuns: string;
  supportsAgent: boolean;
  supportsTelegram: boolean;
  supportsDeepReport: boolean;
  sectorOptions?: string[];
  features: string[];
  highlighted?: boolean;
  badge?: string;
}
