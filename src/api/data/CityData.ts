import type { Area } from "@/types";

export default interface CountryData {
  id: string;
  name: string;
  longitude: number;
  latitude: number;
  areas: Array<Area>;
}
