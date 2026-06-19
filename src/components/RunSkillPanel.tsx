"use client";

import { FormEvent, useMemo, useState } from "react";
import { Database, FileText, PlayCircle, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { createMockReport } from "@/data/mockReports";
import { saveReport } from "@/data/localStore";
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextReport = createMockReport(skill, values);
    saveReport(nextReport);
    setNotice("已生成 mock 报告，正在打开报告详情页。");
    router.push(`/reports/${nextReport.id}`);
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
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-signal px-4 text-sm font-semibold text-ink transition hover:bg-[#34d58c]"
          >
            <Database className="h-4 w-4" aria-hidden="true" />
            生成 mock 研究报告
          </button>
        </form>

        <div className="mt-5 rounded-md border border-caution/30 bg-caution/10 p-4 text-sm leading-6 text-caution">
          当前版本不接真实数据库、支付、交易 API 或 AI API。结果来自本地 mock 逻辑，仅用于产品路径验证。
        </div>
      </section>

      <section className="min-w-0">
        {notice ? (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-signal/30 bg-signal/10 p-4 text-sm text-signal">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            {notice}
          </div>
        ) : null}

        <div className="rounded-lg border border-line bg-panel p-8">
          <FileText className="h-6 w-6 text-zinc-500" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-semibold text-white">生成后进入独立报告页</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            输入研究对象后，系统会保存一份本地 mock 报告，并跳转到报告详情页。你可以在那里查看完整结构、加入 Watchlist，之后也能从报告历史中找回。
          </p>
        </div>
      </section>
    </div>
  );
}
