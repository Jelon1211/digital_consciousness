import { JsonType } from "@/enums/JsonEnum";

export interface JsonInterface {
  id: number;
  text: string;
  delay: number;
  duration: number;
  group?: number;
  type?: JsonType;
  image?: string;
}
