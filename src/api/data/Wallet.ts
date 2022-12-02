
export default interface WalletType {
    id?: string;
    key: string;
    description: string;
    shopId:string,
    name: string;
    availableBalance: number;
    freezedBalance: number;
    currency: string;
    defaultWithdrawAccountId:boolean,
    defaultDepositeAccountId:boolean
   
}