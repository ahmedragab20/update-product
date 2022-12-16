export default interface ProductData {
  id: string;
  code: string;
  thumbnail: string;
  thumbnailPath: string;
  slug: string;
  order: number;
  weightInKG: number;
  widthInCM: number;
  heightInCM: number;
  lengthInCM: number;
  marketId: number;
  preparingTimeInMinutes: number;
  deliveryTimeCategoryId: string;
  productTypeId: string;
  taxClassId: string;
  taxAmounPercentage: number;
  productBrandId: string;
  pointsClassId: string;
  pointsClassValue: number;
  prices: [
    {
      currencyId: string;
      costPrice: number;
      price: number;
    }
  ];
  resources: [
    {
      languageId: string;
      name: string;
      shortDescription: string;
      longDescription: string;
      purchaseNote: string;
    }
  ];
  media: [
    {
      id: string;
      pathKey: string;
      path: string;
      mediaType: string;
    }
  ];
  productCategories: string[];
  modifiers: string[];
  vehicleTypes: string[];
  vehicleSpecialRequirments: string[];
  tagProducts: string[];
  labelProducts: string[];
  barcodes: string[];
  skUs: string[];
  digitalProductDeliveryWays: string[];
  countableDigitalProducts: [
    {
      id: string;
      details: string;
      isSold: boolean;
      fileLastModifiedDate: string | Date;
    }
  ];
  downloadableDigitalProducts: [
    {
      id: string;
      location: string;
      fileKey: string;
      fileLoacation: string;
      fileSize: number;
      fileType: string;
      resources: [
        {
          title: string;
          description: string;
          languageId: string;
        }
      ];
      fileLastModifiedDate: string | Date;
    }
  ];
  upsellProducts: [
    {
      id: string;
      name: string;
      thumbnail: string;
    }
  ];
  crosssellProducts: [
    {
      id: string;
      name: string;
      thumbnail: string;
    }
  ];
  productMetaData: {
    title: string;
    description: string;
    keywords: string;
  };
}
