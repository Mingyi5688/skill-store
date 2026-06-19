import type { ResearchReport } from "@/types/report";

export interface RunSkillRequest {
  input: Record<string, string>;
}

export interface RunSkillResponse {
  runId: string;
  reportId: string;
  mode: "mock";
  report: ResearchReport;
}

export interface ApiErrorResponse {
  error: string;
  details?: string[];
}
