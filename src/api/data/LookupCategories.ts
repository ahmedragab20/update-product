export default interface LookupCategories {
  id: string;
  code: string;
  name: string;
  parentId: string;
  thumbnailPath: string;
  thumbnail: string;
  order: number;
  connectedShops: string[];
  resources: [
    {
      languageId: string;
      name: string;
    }
  ];
  slug: string;
  isPublishedOnJetOrderApp: true;
  isPublishedOnShopLink: true;
}
