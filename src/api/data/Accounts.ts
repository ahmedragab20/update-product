export default interface Accounts {
    accountId: string;
    accountType: string;
    accountTypeId: string,
    name: string,
    canDelete: boolean,
    canUpdate: boolean,
    isPaymentMethod: boolean,
    usedInDepositeToWallet:boolean,
    usedInWithdrawFromWallet:boolean,
    accountCoverage: string,
    commissionHolder: string,
    supportedCountries?: Array<{
        countryId: string,
        countryName: string,
    }>
}