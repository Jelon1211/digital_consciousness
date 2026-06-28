import { JsonType } from "@/domain/content/jsonTypes";

export interface JsonInterface {
  id: number;
  text: string;
  delay: number;
  duration: number;
  group?: number;
  type?: JsonType;
  image?: string;
}
