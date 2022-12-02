import {ModifiersResourse} from "@/types";
import {ModifiersCurrency} from "@/types";
export default interface ModifiersItemData {
    id: string;
    selected:boolean,
    order:number,
 
    resource:Array<ModifiersResourse>
    price:Array<ModifiersCurrency>
    
}