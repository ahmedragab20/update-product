import { ProductLabelResources } from "@/types";

export default interface ProductLabel {
    id?: string;
    code: string;
    icon: string;
    resources: Array<ProductLabelResources>
    name: string;
    order: number;
    numberOfConnectedProducts: number;
    numberOfConnectedShops: number;
    isPublishedOnJetOrderApp: boolean;
    isPublishedOnShopLink: boolean;
    shops?: Array<string>
}
