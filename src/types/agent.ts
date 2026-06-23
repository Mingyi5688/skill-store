export type AgentFrequency = "manual" | "15m" | "1h" | "4h" | "1d";
export type NotificationChannel = "in_app" | "email" | "telegram" | "discord" | "webhook";

export interface AgentScanResult {
  id: string;
  assetSymbol: string;
  assetName: string;
  triggeredBy: string;
  riskLevel: "低" | "中" | "高";
  summary: string;
  nextSignals: string[];
  scannedAt: string;
}

export interface AgentMonitor {
  id: string;
  userId: string;
  name: string;
  skillIds: string[];
  markets: string[];
  assetSymbols: string[];
  frequency: AgentFrequency;
  tokenBudget: number;
  usedTokens: number;
  estimatedDailyTokens: number;
  notificationChannel: NotificationChannel;
  notificationChannels?: NotificationChannel[];
  isActive: boolean;
  createdAt: string;
  recentResults: AgentScanResult[];
}
