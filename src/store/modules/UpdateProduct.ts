import { Actions, Mutations } from "@/store/enums/StoreEnums";
// import {} from "@/types";
import Api from "@/utils/ApiHelper";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

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
