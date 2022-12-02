import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { productModifiersType } from "@/api/data/ProductModifiers";
import { ConnectedProduct } from "@/api/data/ConnectedProduct";
import { Pagination } from "@/interfaces/pagination";
import Api from "@/utils/ApiHelper";
import Swal from "sweetalert2";
import i18n from "@/core/plugins/i18n";

import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module
export default class ProductModifiers extends VuexModule {
  //? sate
  Modifiers: Array<productModifiersType> = [];
  productModifier!: productModifiersType;
  products: Array<any> = [];
  modifierGroupItems: Array<productModifiersType> = [];

  connectedProducts: Array<ConnectedProduct> = [];

  messageIsValidCode = "code Must be Unique";

  isValidCode = false;
  isValidCodeUpdate = true;
  pagination: Pagination = {
    totalPages: 100,
    totalCount: 100,
    pageSize: 6,
    pageNumber: 1,
    hasPreviousPage: true,
    hasNextPage: true,
  };

  //* Mutations

  @Mutation
  [Mutations.UPDATE_CURRENT_PAGE_MODIFIER](currentPage) {
    this.pagination.pageNumber = currentPage;
  }
  @Mutation
  [Mutations.GET_MODIFIERS](MODIFIERS: Array<productModifiersType>) {
    this.Modifiers = MODIFIERS;
  }
  @Mutation
  [Mutations.GET_PRODUCT_Modifiers_BY_ID](MODIFIERS) {
    const currentDate = new Date();
    this.productModifier = MODIFIERS;

    this.productModifier.modifierGroupItems =
      this.productModifier.modifierGroupItems?.map((p) => ({
        ...p,
        timeStamp: currentDate.getTime(),
      }));
  }
  @Mutation
  [Mutations.UPDATE_PAGINATION_MODIFIER]({
    totalPages,
    totalCount,
    pageSize,
    currentPage,
    hasPreviousPage,
    hasNextPage,
  }) {
    this.pagination = {
      totalPages,
      totalCount,
      pageSize,
      pageNumber: currentPage,
      hasPreviousPage,
      hasNextPage,
    };
  }

  @Mutation
  [Mutations.FILTER_MODIFIER_PRODUCTS](payload) {
    this.connectedProducts = this.connectedProducts.filter(
      (p) => payload.indexOf(p.id) == -1
    );
  }

  @Mutation
  [Mutations.ADD_MODIFIERS](payload) {
    let productModifier = {} as productModifiersType;

    productModifier = payload;
    this.Modifiers.push(productModifier);
  }
  @Mutation
  [Mutations.DELETE_PRODUCT_MODIFIERS](id) {
    Swal.fire({
      text: i18n.global.t("deleteSuccess"),
      icon: "success",
      buttonsStyling: false,
      confirmButtonText: i18n.global.t("ok"),
      customClass: {
        confirmButton: "btn fw-bold btn-light-primary",
      },
    });

    // this.Modifiers = this.Modifiers.filter(ele => ele.id != id)
  }
  @Mutation
  [Mutations.GET_MODIFIER_PRODUCTS](products) {
    this.connectedProducts = products;
  }
  @Mutation
  [Mutations.SET_PRODUCTS_LIST](payload) {
    this.products = payload.data;
  }
  @Mutation
  [Mutations.UPDATE_MODIFIER_PRODUCTS](payload) {
    payload.forEach((element) => {
      return this.connectedProducts.push({
        id: element.id,
        name: element.name,
        thumbnail: element.thumbnail,
      });
    });
  }

  @Mutation
  [Mutations.SET_MESSAGE_ISVALIDCODE_MODIFIER](payload) {
    this.messageIsValidCode = payload;
  }
  @Mutation
  [Mutations.ISVALID_CODE_MODIFIER](payload) {
    this.isValidCode = payload;
    this.isValidCodeUpdate = payload;
  }
  //! Actions

  @Action
  [Actions.GET_MODIFIERS]({ query, pageSize, pageNumber }) {
    const payload = {
      method: "get",
      url:
        Actions.GET_MODIFIERS +
        `?name=${query}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
    };

    Api(payload).then((response) => {
      this.context.commit(
        Mutations.GET_MODIFIERS,
        response?.data.data as Array<productModifiersType>
      );
      this.context.commit(Mutations.UPDATE_PAGINATION_MODIFIER, response?.data);

      console.log({ modifier: response?.data });
    });
  }
  @Action
  [Actions.GET_MODIFIER_PRODUCTS](id) {
    return new Promise((resolve, reject) => {
      Api({
        method: "get",
        url:
          Actions.GET_MODIFIER_PRODUCTS +
          `?id=${id}&pageSize=${100000}&pageNumber=${1}&pageSize=${100000}&pageNumber=${1}`,
      })
        .then((res) => {
          this.context.commit(Mutations.GET_MODIFIER_PRODUCTS, res?.data.data);
          resolve(res?.data.data);
        })
        .catch((er) => {
          reject(er);
        });
    });
  }
  @Action
  [Actions.SEARCH_PRODUCTS]({ query, pageSize, pageNumber }) {
    return new Promise((resolve, reject) => {
      Api({ url: Actions.SEARCH_PRODUCTS + `?value=${query}`, method: "get" })
        .then((res) => {
          this.context.commit(Mutations.SET_PRODUCTS_LIST, res?.data);
          resolve(res?.data);
        })
        .catch((er) => {
          reject(er);
        });
    });
  }

  @Action
  [Actions.UPDATE_MODIFIERS](payload: object) {
    Api({ method: "post", url: Actions.UPDATE_MODIFIERS, payload }).then(
      (res) => {
        Swal.fire({
          text: i18n.global.t("updateSuccessModifier"),
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: i18n.global.t("ok"),
          cancelButtonText: i18n.global.t("cancel"),
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary",
          },
        });
      }
    );
  }
  @Action
  [Actions.GET_PRODUCT_Modifiers_BY_ID](id) {
    return new Promise((resolve, reject) => {
      const payload = {
        method: "get",
        url: Actions.GET_PRODUCT_Modifiers_BY_ID + `?&id=${id}`,
      };

      Api(payload).then((response) => {
        resolve(response?.data.data);
        this.context.commit(
          Mutations.GET_PRODUCT_Modifiers_BY_ID,
          response?.data.data
        );
        console.log({ product: response?.data });
      });
    });
  }
  @Action
  [Actions.ADD_MODIFIERS](payload) {
   
    return new Promise((resolve, reject) => {
    Api({ method: "post", url: Actions.ADD_MODIFIERS, payload }).then((res) => {
  
      resolve(res?.data.data);
      Swal.fire({
        text: i18n.global.t("addSuccess"),
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: i18n.global.t("ok"),
        cancelButtonText: i18n.global.t("cancel"),
        customClass: {
          confirmButton: "btn fw-bold btn-light-primary",
        },
      });
      // let newItem: Object = {};
      // newItem = {
      //   id: res?.data.data.id,
      //   name: payload.resources[0].name,
      // };

      // const returnedTarget: productModifiersType = Object.assign(
      //   payload,
      //   newItem
      // );

      // let newModifier = Object.assign({}, returnedTarget);

      // this.context.commit(Mutations.ADD_MODIFIERS, newModifier);
    }) .catch((er) => {
      reject(er);
    })
  })
  }
  @Action
  [Actions.ADD_PRODUCTS_TO_MODIFIER]({ id, connectedProducts }) {
    const payload = {
      id,
      connectedProducts: [...connectedProducts].map((el) => el.id),
    };

    Swal.fire({
      icon: "success",
      showCancelButton: false,
      confirmButtonColor: "#04c8c8",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
      title: i18n.global.t("savedWork"),

      showConfirmButton: true,
    });
    Api({
      method: "post",
      url: Actions.ADD_PRODUCTS_TO_MODIFIER,
      payload,
    }).then((res) => {
      this.context.commit(Mutations.UPDATE_MODIFIER_PRODUCTS, [
        ...connectedProducts,
      ]);
    });
  }

  @Action
  [Actions.DELETE_PRODUCT_MODIFIERS](payload) {
    Api({
      method: "post",
      url: Actions.DELETE_PRODUCT_MODIFIERS,
      payload: { id: payload },
    }).then((res) => {
      this.context.commit(Mutations.DELETE_PRODUCT_MODIFIERS, payload);
    });
  }
  @Action
  [Actions.IS_VALID_CODE_PRODUCT_MODIFIER](payload) {
    return new Promise((resolve) => {
      Api({
        method: "post",
        url: Actions.IS_VALID_CODE_PRODUCT_MODIFIER,
        payload,
      }).then((res) => {
        this.context.commit(Mutations.ISVALID_CODE_MODIFIER, res?.data.data);
        resolve(res?.data.data);
      });
    });
  }
  @Action
  [Actions.REMOVE_PRODUCTS_FOMR_MODIFIER](payload) {
    Swal.fire({
      title: i18n.global.t("alertTitle"),
      text: i18n.global.t("deleteProductAlertText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: i18n.global.t("deleteAlertConfirm"),
      cancelButtonText: i18n.global.t("cancel"),
    }).then((status) => {
      if (status.isConfirmed)
        Api({
          method: "post",
          url: Actions.REMOVE_PRODUCTS_FOMR_MODIFIER,
          payload,
        }).then((res) => {
          this.context.commit(
            Mutations.FILTER_MODIFIER_PRODUCTS,
            payload.connectedProducts
          );
        });
    });
  }
}
