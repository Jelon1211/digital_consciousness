import { NextResponse } from "next/server";
import path from "path";
import { readFile } from "fs/promises";

export async function GET() {
  const filePath = path.resolve(process.cwd(), "data/story.json");
  const json = await readFile(filePath, "utf-8");
  const data = JSON.parse(json);

  return NextResponse.json(data);
}
