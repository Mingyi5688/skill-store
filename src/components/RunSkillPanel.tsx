"use client";

import { FormEvent, useMemo, useState } from "react";
import { AlertTriangle, Database, FileText, PlayCircle, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { saveReport } from "@/data/localStore";
import type { ApiErrorResponse, RunSkillResponse } from "@/types/api";
import type { SkillDefinition } from "@/types/skill";

export function RunSkillPanel({ skill }: { skill: SkillDefinition }) {
  const router = useRouter();
  const initialValues = useMemo(() => {
    return Object.fromEntries(
      skill.inputFields.map((field) => [field.name, field.type === "select" ? field.options?.[0] ?? "" : ""]),
    );
  }, [skill.inputFields]);

  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("正在通过 Skill Runner API 生成 mock 报告...");
    setIsRunning(true);

    try {
      const response = await fetch(`/api/skills/${skill.id}/run`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: values }),
      });

      const payload = (await response.json()) as RunSkillResponse | ApiErrorResponse;

      if (!response.ok || "error" in payload) {
        const details = "details" in payload && payload.details?.length ? `：${payload.details.join("、")}` : "";
        throw new Error(`${"error" in payload ? payload.error : "Skill 运行失败"}${details}`);
      }

      saveReport(payload.report);
      setNotice("已通过 Skill Runner API 生成 mock 报告，正在打开报告详情页。");
      router.push(`/reports/${payload.reportId}`);
    } catch (runError) {
      setError(runError instanceof Error ? runError.message : "Skill 运行失败，请稍后重试。");
      setNotice("");
    } finally {
      setIsRunning(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
      <section className="rounded-lg border border-line bg-panel p-5">
        <div className="mb-5 flex items-center gap-2">
          <PlayCircle className="h-4 w-4 text-signal" aria-hidden="true" />
          <h2 className="text-base font-semibold text-white">运行参数</h2>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {skill.inputFields.map((field) => (
            <label key={field.name} className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-200">
                {field.label}
                {field.required ? <span className="text-caution"> *</span> : null}
              </span>
              {field.type === "textarea" ? (
                <textarea
                  required={field.required}
                  value={values[field.name] ?? ""}
                  onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
                  placeholder={field.placeholder}
                  className="min-h-28 w-full rounded-md border border-white/10 bg-ink px-3 py-2 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-signal"
                />
              ) : field.type === "select" ? (
                <select
                  required={field.required}
                  value={values[field.name] ?? ""}
                  onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
                  className="h-10 w-full rounded-md border border-white/10 bg-ink px-3 text-sm text-white outline-none transition focus:border-signal"
                >
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  required={field.required}
                  value={values[field.name] ?? ""}
                  onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
                  placeholder={field.placeholder}
                  className="h-10 w-full rounded-md border border-white/10 bg-ink px-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-signal"
                />
              )}
            </label>
          ))}

          <button
            type="submit"
            disabled={isRunning}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-signal px-4 text-sm font-semibold text-ink transition hover:bg-[#34d58c]"
          >
            <Database className="h-4 w-4" aria-hidden="true" />
            {isRunning ? "运行中..." : "生成 mock 研究报告"}
          </button>
        </form>

        <div className="mt-5 rounded-md border border-caution/30 bg-caution/10 p-4 text-sm leading-6 text-caution">
          当前版本不接真实数据库、支付、交易 API 或 AI API。前端会调用本地 Skill Runner API，后端暂时返回 mock 报告。
        </div>
      </section>

      <section className="min-w-0">
        {notice ? (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-signal/30 bg-signal/10 p-4 text-sm text-signal">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            {notice}
          </div>
        ) : null}

        {error ? (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-danger/30 bg-danger/10 p-4 text-sm text-danger">
            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            {error}
          </div>
        ) : null}

        <div className="rounded-lg border border-line bg-panel p-8">
          <FileText className="h-6 w-6 text-zinc-500" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-semibold text-white">生成后进入独立报告页</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            输入研究对象后，前端会调用 `/api/skills/[id]/run`。当前 API 返回 mock 报告，前端保存到本地并跳转到报告详情页。
          </p>
        </div>
      </section>
    </div>
  );
}
