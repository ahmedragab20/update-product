
import {connectedRoles} from './connectedRoles'
export interface actionOrderTemplateType {
    id?: string,
    name: string
    order: number;
    orderStatusId: string;
    connectedRoles: Array<connectedRoles>;
   autoComplete: true;

 
}
