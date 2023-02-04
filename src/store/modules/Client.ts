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
    
  }

  @Mutation
  [Mutations.SET_CLIENT_WHISHLISTS](WHISHLISTS) {
    this.ClientWhishlists = WHISHLISTS;
   
  }
  @Mutation
  [Mutations.SET_CLIENT_WHISHLISTS_PRODUCTS](WHISHLISTS_PRODUCTS) {
    this.ClientWhishlistsProducts = WHISHLISTS_PRODUCTS;
 
  }
  @Mutation
  [Mutations.SET_CLIENT_ABANDONED_CARTS](ABANDONED_CARTS) {
    this.AbandonedCarts = ABANDONED_CARTS;

  }
  @Mutation
  [Mutations.SET_CLIENT_ABANDONED_CARTS_PRODUCTS](ABANDONED_CARTS_PRODUCTS) {
    this.AbandonedCartsProduct = ABANDONED_CARTS_PRODUCTS;

  }
  @Mutation
  [Mutations.SET_CLIENT_DEVICES](DEVICES) {
    this.ClientDevices = DEVICES;

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

  


   
}
