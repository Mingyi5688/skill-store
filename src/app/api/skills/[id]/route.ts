import { NextResponse } from "next/server";
import { getSkillById } from "@/data/skills";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const skill = getSkillById(id);

  if (!skill) {
    return NextResponse.json({ error: "Skill 不存在。" }, { status: 404 });
  }

  return NextResponse.json({ skill });
}
