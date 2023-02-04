import { Actions, Mutations } from "@/store/enums/StoreEnums";
// import {} from "@/types";
import Api from "@/utils/ApiHelper";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { computed } from "vue";

interface updateChangedSectionsPayload {
  sectionId: string;
  remove?: boolean;
}

interface initializeData {
  name: string;
  content: any;
}

interface ProductDetails {
  productBrandId: string;
  deliveryTimeCategoryId: string;
  productCategories: string[];
}

interface Tax {
  taxClassId: string | number;
  taxAmount: number | string;
}

@Module
export default class UpdateProduct extends VuexModule {
  product: any = {};
  VariationFromData: any = {};
  isReadonly = true;
  newOptionData: any = {
    label: "",
    type: "",
  };
  variationData: any[] = [];
  globalSections: string[] = ["code", "slug", "product-details", "thumbnail"];
  changedSections: string[] = [];

  code: string = null;
  slug: string = null;
  productDetails: ProductDetails;
  resources: any[] = null;
  prices: any[] = null;
  tax: Tax = null;
  shippingData: any = null;
  inventory: any = null;
  appearanceData: any = null;
  pointsSystem: any = null;
  metaOptions: any = null;

  @Mutation
  ["SET_VARIATION_FROM_DATA"](payload: any) {
    this.VariationFromData = payload;
  }

  @Mutation
  ["SET_IS_READONLY"](payload: boolean) {
    this.isReadonly = payload;
  }

  @Mutation
  ["SET_NEW_OPTION_DATA"](payload: { key: string; value: any }) {
    this.newOptionData[payload.key] = payload.value;
  }

  @Mutation
  ["SET_PRODUCT"](payload: any) {
    this.product = payload;
  }

  @Mutation
  ["SET_VARIATION_DATA"](payload: any) {
    this.variationData = payload;
  }

  @Mutation
  ["ADD_CHANGED_SECTIONS"](payload: updateChangedSectionsPayload) {
    if (!payload.sectionId && !payload.remove) {
      this.changedSections = [];
      return;
    }

    const isSectionExisted: boolean = this.changedSections.includes(
      payload.sectionId
    );
    if (!isSectionExisted && !payload.remove) {
      this.changedSections.push(payload.sectionId);
    } else if (isSectionExisted && payload.remove) {
      this.changedSections = this.changedSections.filter(
        (i) => i !== payload.sectionId
      );
    }
  }

  @Mutation
  ["INITIALIZE_DATA"](payload: initializeData) {
    this[payload?.name] = payload.content;
  }

  @Action
  async getProduct(id: number) {
    try {
      const reqData = {
        method: "get",
        url: "ProductQueries/get-product",
        payload: { id },
      };
      await Api(reqData).then((res: any) => {
        this.context.commit("SET_PRODUCT", res.data?.data);
      });
    } catch (error) {
      console.error(error);
    }
  }

  @Action
  async getVariationData(id: number) {
    try {
      const reqData = {
        method: "get",
        url: "/ProductQueries/get-product-variation-data",
        payload: { id },
      };
      await Api(reqData).then((res: any) => {
        this.context.commit("SET_VARIATION_DATA", res.data.data);
      });
    } catch (error) {
      console.error(error);
    }
  }
}
