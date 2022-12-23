export default interface ShopData {
  id: string;
  name: string;
  numberOfSupportedCurrencies: number;
  numberOfSupportedLanguages: number;
  logoPath: string;
  address: string;
  isAvailableOnJetOrder: boolean;
  isBusyOnShopLink: boolean;
  isVisibleOnShopLink: boolean;
  isClosedOnShopLink: boolean;
  isBusyOnJetOrder: boolean;
  isVisibleOnJetOrder: boolean;
  isClosedOnJetOrder: boolean;
  logoKey: string;
}
