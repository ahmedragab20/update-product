import type { ModifiersItem } from "@/types";
export interface productModifiersType {
    id: string;
 
    name: string;
    order: number;
    minimumSelectionValue:number,
    maximumSelectionValue:number
    numberOfConnectedProducts: number;
    numberOfConnectedShops: number;
    modifierGroupItems:Array<ModifiersItem>;
}