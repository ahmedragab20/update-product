import type { MarketResource, MarketSocialMedia, Shop } from "@/types";

export default interface MarketData {
  id: string;
  logo: string;
  subDomain: string;
  publicDomain: string;
  countryId: string;
  shops: Array<Shop>;
  currencies: Array<string>;
  languages: Array<string>;
  resources: Array<MarketResource>;
  socialMedia: Array<MarketSocialMedia>;
}
