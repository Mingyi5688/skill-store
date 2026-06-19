import { createMockReport } from "@/data/mockReports";
import { getSkillById } from "@/data/skills";
import type { RunSkillResponse } from "@/types/api";
import type { SkillDefinition } from "@/types/skill";

export class SkillRunnerError extends Error {
  status: number;
  details?: string[];

  constructor(message: string, status = 400, details?: string[]) {
    super(message);
    this.name = "SkillRunnerError";
    this.status = status;
    this.details = details;
  }
}

function normalizeInput(input: unknown): Record<string, string> {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new SkillRunnerError("请求体需要包含 input 对象。", 400);
  }

  return Object.fromEntries(
    Object.entries(input).map(([key, value]) => [key, typeof value === "string" ? value : String(value ?? "")]),
  );
}

function validateRequiredFields(skill: SkillDefinition, input: Record<string, string>) {
  const missing = skill.inputFields
    .filter((field) => field.required)
    .filter((field) => !input[field.name]?.trim())
    .map((field) => field.label);

  if (missing.length > 0) {
    throw new SkillRunnerError("缺少必填输入项。", 400, missing);
  }
}

function createRunId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `run-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function runMockSkill(skillId: string, rawInput: unknown): Promise<RunSkillResponse> {
  const skill = getSkillById(skillId);

  if (!skill) {
    throw new SkillRunnerError("Skill 不存在。", 404);
  }

  const input = normalizeInput(rawInput);
  validateRequiredFields(skill, input);

  const report = createMockReport(skill, input);

  return {
    runId: createRunId(),
    reportId: report.id,
    mode: "mock",
    report,
  };
}
