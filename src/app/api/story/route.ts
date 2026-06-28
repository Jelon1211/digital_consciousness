import { NextResponse } from "next/server";
import { contentManifest } from "@/domain/content/contentManifest";
import { loadStoryContent } from "@/domain/content/contentRepository";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const storyPath = searchParams.get("path") ?? contentManifest.stories.init;

  try {
    const data = await loadStoryContent(storyPath);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Story not found",
      },
      { status: 404 }
    );
  }
}
