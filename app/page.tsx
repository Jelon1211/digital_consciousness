import Terminal from "@/components/terminal/Terminal";
import { GetStory } from "@/lib/GetStory";
import { JsonInterface } from "@/types/JsonInterface";

export default async function Home() {
  const story = await GetStory.loadJson<JsonInterface[]>("/story.json");
  if (!story) {
    return null;
  }
  return (
    <main>
      <Terminal story={story} />
    </main>
  );
}
