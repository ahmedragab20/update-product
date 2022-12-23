import { Actions, Mutations } from "@/store/enums/StoreEnums";

import { ClientType } from "@/api/data/clients";

import { Pagination } from "@/interfaces/pagination";
import Api from "@/utils/ApiHelper";
import Swal from "sweetalert2";
import i18n from '@/core/plugins/i18n'
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module
export default class Clients extends VuexModule {
  //? sate

  Clients: Array<ClientType> = [];
  AllData: Array<ClientType> = [];
  ClientOrders: [] | undefined;
  ClientAddress: [] | undefined;
  ClientWhishlists: [] | undefined;
  ClientWhishlistsProducts: [] | undefined;
  AbandonedCartsProduct:[] | undefined;

  AbandonedCarts: [] | undefined;
  ClientDevices: [] | undefined;
  ClientGroup: {} | undefined;
  GroupUpdatePayload: any | undefined;

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
  [Mutations.SET_CLIENTS](CLIENT: Array<ClientType>) {
  
    this.Clients = CLIENT
   
  }

  @Mutation
  [Mutations.UPDATE_PAGINATION_CLIENT]({ totalPages,
    totalCount,
    pageSize,
    currentPage,
    hasPreviousPage,
    hasNextPage }) {
    this.pagination = {
        totalPages,
        totalCount,
        pageSize,
        pageNumber: currentPage,
        hasPreviousPage,
        hasNextPage
    }
    console.log(this.pagination)
  }
  @Mutation
  [Mutations.UPDATE_CURRENT_PAGE_CLIENTS](currentPage) {
      this.pagination.pageNumber = currentPage
  }
 
  
  @Mutation
  [Mutations.SET_ORDERS](ORDERS) {
    this.ClientOrders = ORDERS;
    console.log("ClientOrders", this.ClientOrders);
  }
  @Mutation
  [Mutations.SET_CLIENT_ADDRESS](ADDRESS) {
    this.ClientAddress = ADDRESS;
    console.log("ClientAddress", this.ClientAddress);
  }

  @Mutation
  [Mutations.SET_CLIENT_WHISHLISTS](WHISHLISTS) {
    this.ClientWhishlists = WHISHLISTS;
    console.log("ClientWhishlists", this.ClientWhishlists);
  }
  @Mutation
  [Mutations.SET_CLIENT_WHISHLISTS_PRODUCTS](WHISHLISTS_PRODUCTS) {
    this.ClientWhishlistsProducts = WHISHLISTS_PRODUCTS;
    console.log("ClientWhishlistsProducts", this.ClientWhishlistsProducts);
  }
  @Mutation
  [Mutations.SET_CLIENT_ABANDONED_CARTS](ABANDONED_CARTS) {
    this.AbandonedCarts = ABANDONED_CARTS;
    console.log("AbandonedCarts", this.AbandonedCarts);
  }
  @Mutation
  [Mutations.SET_CLIENT_ABANDONED_CARTS_PRODUCTS](ABANDONED_CARTS_PRODUCTS) {
    this.AbandonedCartsProduct = ABANDONED_CARTS_PRODUCTS;
    console.log("AbandonedCartsProduct", this.AbandonedCartsProduct);
  }
  @Mutation
  [Mutations.SET_CLIENT_DEVICES](DEVICES) {
    this.ClientDevices = DEVICES;
    console.log("ClientDevices", this.ClientDevices);
  }

  //! Actions
  @Action
  [Actions.GET_JETORDER_ORDERS](phoneNumber) {
    return new Promise((resolve, reject) => {
      const payload = {
        method: "get",
        url: Actions.GET_JETORDER_ORDERS + `?ClientPhone=${phoneNumber}`,
      };
      Api(payload).then((res) => {
        this.context.commit(Mutations.SET_ORDERS, res?.data.data);
        console.log("from jet", res);
        resolve(res?.data);
      });
    });
  }
  @Action
  [Actions.GET_SHOPLINKS_ORDERS](data) {
    return new Promise((resolve, reject) => {
      const payload = {
        method: "get",
        url:
          Actions.GET_SHOPLINKS_ORDERS +
          `?ClientId=${data.id}` +
          `&ClientPhone=${data.PhoneNumber}`,
      };
      Api(payload).then((res) => {
        this.context.commit(Mutations.SET_ORDERS, res?.data.data);
        resolve(res?.data.data);
      });
    });
  }
  @Action
  [Actions.GET_CLIENT_ADDRESS](data) {
    return new Promise((resolve, reject) => {
      const payload = {
        method: "get",
        url: Actions.GET_CLIENT_ADDRESS + `?ClientId=${data.id}`,
      };
      Api(payload).then((res) => {
        console.log("Ee", res);
        this.context.commit(Mutations.SET_CLIENT_ADDRESS, res?.data.data);
        resolve(res?.data.data);
      });
    });
  }
  @Action
  [Actions.GET_CLIENT_WHISHLISTS](data) {
    return new Promise((resolve, reject) => {
      const payload = {
        method: "get",
        url: Actions.GET_CLIENT_WHISHLISTS + `?ClientId=${data.id}`,
      };
      Api(payload).then((res) => {
        console.log("Ee", res);
        this.context.commit(Mutations.SET_CLIENT_WHISHLISTS, res?.data.data);
        resolve(res?.data.data);
      });
    });
  }
  @Action
  [Actions.GET_CLIENT_WHISHLISTS_PRODUCTS](id) {
    return new Promise((resolve, reject) => {
      const payload = {
        method: "get",
        url: Actions.GET_CLIENT_WHISHLISTS_PRODUCTS + `?wishListId=${id}`,
      };
      Api(payload).then((res) => {
        console.log("Ee", res);
        this.context.commit(
          Mutations.SET_CLIENT_WHISHLISTS_PRODUCTS,
          res?.data.data
        );
        resolve(res?.data.data);
      });
    });
  } 

  @Action
  [Actions.GET_CLIENT_ABANDONED_CARTS_PRODUCTS](id) {
    return new Promise((resolve, reject) => {
      const payload = {
        method: "get",
        url: Actions.GET_CLIENT_ABANDONED_CARTS_PRODUCTS + `?id=${id}`,
      };
      Api(payload).then((res) => {
        console.log("Ee", res);
        this.context.commit(
          Mutations.SET_CLIENT_ABANDONED_CARTS_PRODUCTS,
          res?.data.data.products
        );
        resolve(res?.data.data.products);
      });
    });
  }
  @Action
  [Actions.GET_CLIENT_ABANDONED_CARTS](data) {
    return new Promise((resolve, reject) => {
      const payload = {
        method: "get",
        url: Actions.GET_CLIENT_ABANDONED_CARTS + `?clientId=${data.id}`,
      };
      Api(payload).then((res) => {
        console.log("Ee", res);
        this.context.commit(
          Mutations.SET_CLIENT_ABANDONED_CARTS,
          res?.data.data
        );
        resolve(res?.data.data);
      });
    });
  } 
  @Action
  [Actions.GET_CLIENT_DEVICES](data) {
    return new Promise((resolve, reject) => {
      const payload = {
        method: "get",
        url: Actions.GET_CLIENT_DEVICES + `?clientId=${data.id}`,
      };
      Api(payload).then((res) => {
        console.log("Ee", res);
        this.context.commit(
          Mutations.SET_CLIENT_DEVICES,
          res?.data.data
        );
        resolve(res?.data.data);
      });
    });
  }
  @Action
  [Actions.GET_CLIENT_BY_ID](id) {
    console.log("id", id);
    return new Promise((resolve, reject) => {
      const payload = {
        method: "get",
        url: Actions.GET_CLIENT_BY_ID + `?ClientId=${id}`,
      };
      Api(payload).then((res) => {
        resolve(res?.data.data);
      });
    });
  }
  @Action
  [Actions.DELETE_CLIENT_GROUP](payload) {
    Api({
      method: "post",
      url: Actions.DELETE_CLIENT_GROUP,
      payload: { id: payload },
    }).then((res) => {
      Swal.fire({
        text: " Client Group has been Removed !",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#04c8c8",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok",
      });
    });
  }

  @Action
  [Actions.GET_CLIENTS]({ query, pageSize, pageNumber }) {
    const payload = {
      method: "get",
      url:
        Actions.GET_CLIENTS +
        `?name=${query}&pageSize=${pageSize}&pageNumber=${pageNumber}`
    };

    Api(payload).then((response) => {
      this.context.commit(
        Mutations.SET_CLIENTS,
        response?.data.data as Array<ClientType>
      );

      this.context.commit(Mutations.UPDATE_PAGINATION_CLIENT, response?.data)
      console.log({ client: response?.data });
    });
  }

  @Action
  [Actions.UPDATE_CLIENT_GROUP](payload: any) {
    let conditions = [];
    console.log(payload);
    this.GroupUpdatePayload = {
      id: payload.id,
      name: payload.name,
      conditionsOperatorId: payload?.conditionsOperator?.id,
      icon: payload.icon,
      backgroundColorHeax: payload.backgroundColorHeax,
      textColorHexa: payload.textColorHexa,
      conditions: [] as any,
    };
    payload.conditions.forEach((el) => {
      this.GroupUpdatePayload?.conditions.push({
        id: el.id,
        conditionId: el.condition?.id,
        value: el.value,
        minValue: el.minValue,
        maxValue: el.maxValue,
        operationTypeId: el.operationType.id,
      });
    });
    console.log("   this.GroupUpdatePayload", this.GroupUpdatePayload);
    payload = this.GroupUpdatePayload;

    Api({ method: "post", url: Actions.UPDATE_CLIENT_GROUP, payload }).then(
      (res) => {
        Swal.fire({
          text: " Client Group has been Updated !",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#04c8c8",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok",
        });
      }
    );
  }

  @Action
  [Actions.ADD_CLIENT_GROUP](payload) {
  
    return new Promise((resolve, reject) => {
    
    Api({ method: "post", url: Actions.ADD_CLIENT_GROUP, payload }).then(
      (res) => {
        if (res?.data.statusCode == 200) {
          Swal.fire({
            text: i18n.global.t("clientGroupAdded"),
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn fw-bold btn-light-primary",
            },
          }).then(() => {
            resolve(res?.data);
          })
        } else {
          resolve(res?.data);
          Swal.fire({
            text: res?.data.message,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn fw-bold btn-light-primary",
            },
          });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
        // let returnedTarget = {} as productModifiersType;
      }
   
}
