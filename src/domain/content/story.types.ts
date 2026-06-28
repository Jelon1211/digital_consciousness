import { JsonType } from "@/domain/content/jsonTypes";

export interface JsonInterface {
  text: string;
  delay: number;
  duration: number;
  group?: number;
  type?: JsonType;
  image?: string;
}

export interface PreparedStoryI extends JsonInterface {
  id: number;
}
