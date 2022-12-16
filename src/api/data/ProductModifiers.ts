import type { ModifiersItem } from "@/types";
export default interface productModifiersType {
    id: string;
 
    resources :Array<any>;
    connectedShops :Array<any>;
    order: string;
    code: string;
    minimumSelectionValue:number,
    maximumSelectionValue:number
    numberOfConnectedProducts: number;
    numberOfConnectedShops: number;
    modifierGroupItems:Array<ModifiersItem>;
}