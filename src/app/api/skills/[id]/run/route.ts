import { NextResponse } from "next/server";
import { runMockSkill, SkillRunnerError } from "@/data/skillRunner";

export const dynamic = "force-dynamic";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const body = (await request.json()) as { input?: unknown };
    const result = await runMockSkill(id, body.input);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "请求 JSON 格式不正确。" }, { status: 400 });
    }

    if (error instanceof SkillRunnerError) {
      return NextResponse.json({ error: error.message, details: error.details }, { status: error.status });
    }

    return NextResponse.json({ error: "Skill 运行失败，请稍后重试。" }, { status: 500 });
  }
}
