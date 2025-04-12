import { JsonType } from "@/enums/JsonEnum";

export interface JsonInterface {
  id: number;
  text: string;
  delay: number;
  duration: number;
  showInput?: boolean;
  group?: number;
  type?: JsonType;
}
