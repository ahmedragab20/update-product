import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Pagination } from "@/interfaces/pagination";
import Api from "@/utils/ApiHelper";
import Swal from "sweetalert2";
import i18n from "@/core/plugins/i18n";

import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module
export default class Order extends VuexModule {
  //? sate

  order: Array<any> = [];
  roles: Array<any> = [];
  OrderAction: Array<any> = [];
  pagination: Pagination = {
    totalPages: 100,
    totalCount: 100,
    pageSize: 6,
    pageNumber: 1,
    hasPreviousPage: true,
    hasNextPage: true,
  };
  get getOrder() {
    return this.order;
  }
  get getRoles() {
    return this.roles;
  }
  //* Mutations
  @Mutation
  [Mutations.SET_ROLES](payload) {
    this.roles = payload;
  }

  @Mutation
  [Mutations.SET_ORDER_STATUS](payload) {
    payload.forEach((e) => {
      this.order.push({
        name: e.name,
        order: e.order,
        orderStatusId: e.id,
        autoComplete: false,

        connectedRoles: [
          {
            roleId: "",
            sendEmail: false,
            sendSMS: false,
            sendMobileNotification: false,
          },
        ],
      });
    });

 
  }
  @Mutation
  [Mutations.UPDATE_PAGINATION_ORDER]({
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
    console.log(this.pagination);
  }
  @Mutation
  [Mutations.SET_ORDER_ACTION_TEMPLATE](ORDERS) {
    this.OrderAction = [...ORDERS];
  }

  //! Actions
  @Action
  [Actions.GET_ORDER_STATUS]() {
    return new Promise((resolve, reject) => {
      const payload = {
        method: "get",
        url: Actions.GET_ORDER_STATUS,
      };

      Api(payload).then((response) => {
        resolve(response?.data.data);
  
        this.context.commit(Mutations.SET_ORDER_STATUS, response?.data.data);
        console.log({ product: response?.data });
      });
    });
  }
  
  @Action
  [Actions.GET_ORDER_ACTION_TEMPLATE]({ query, pageSize, pageNumber }) {
    return new Promise((resolve, reject) => {
      const payload = {
        method: "get",
        url:
          Actions.GET_ORDER_ACTION_TEMPLATE +
          `?name=${query}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
      };
      Api(payload).then((res) => {
        console.log({ order: res?.data.data });
        this.context.commit(
          Mutations.SET_ORDER_ACTION_TEMPLATE,
          res?.data.data
        );
        this.context.commit(Mutations.UPDATE_PAGINATION_ORDER, res?.data);
      });
    });
  }
  @Action
  [Actions.GET_ORDER_ACTION_TEMPLATE_BY_ID](id) {
    return new Promise((resolve, reject) => {
      const payload = {
        method: "get",
        url: Actions.GET_ORDER_ACTION_TEMPLATE_BY_ID + `?id=${id}`,
      };
      Api(payload).then((res) => {
        resolve(res?.data.data);
      });
    });
  }
  @Action
  [Actions.DELETE_ORDER_ACTION](payload) {
    return new Promise((resolve, reject) => {
    Api({
      method: "post",
      url: Actions.DELETE_ORDER_ACTION,
      payload: { id: payload },
    }).then((res) => {
      resolve(res?.data.data);
      Swal.fire({
        text: i18n.global.t('deleteSuccess'),
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: i18n.global.t('ok'),
        customClass: {
            confirmButton: "btn fw-bold btn-light-primary",
        },
    })
    });
  });
}
  @Action
  [Actions.UPDATE_ORDER_ACTION_TEMPLATE](payload) {
    return new Promise((resolve, reject) => {
    Api({
      url: Actions.UPDATE_ORDER_ACTION_TEMPLATE,
      payload,
      method: "post",
    }).then((res) => {
      console.log("update",res?.data.statusCode)
      if(res?.data.statusCode==200){
        resolve(res?.data.data);
      Swal.fire({
        text: i18n.global.t("Updated Successfully"),
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: i18n.global.t("ok"),
        cancelButtonText: i18n.global.t("cancel"),
        customClass: {
          confirmButton: "btn fw-bold btn-light-primary",
        },
      });}
      else{
        Swal.fire({
          text: `${res?.data.message}`,
          icon: "warning",
          buttonsStyling: false,
          confirmButtonText: i18n.global.t("ok"),
          cancelButtonText: i18n.global.t("cancel"),
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary",
          },
        })

      }
    }).catch((er) => {
      reject(er);
    });
  })
  }
  @Action
  [Actions.GET_ROLES]() {
    return new Promise((resolve, reject) => {
      const payload = {
        method: "get",
        url: Actions.GET_ROLES,
      };

      Api(payload).then((response) => {
        resolve(response?.data.data);
        console.log("res", response?.data);
        this.context.commit(Mutations.SET_ROLES, response?.data.data);
        console.log({ product: response?.data });
      });
    });
  }
  @Action
  [Actions.ADD_ORDER_ACTION](payload) {
    console.log(payload);

    return new Promise((resolve, reject) => {
      Api({ url: Actions.ADD_ORDER_ACTION, method: "post", payload })
        .then((res) => {
          console.log(res);

          resolve(res?.data.data);
          Swal.fire({
            text: `${payload.name} has added Successfully ! `,
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn fw-bold btn-light-primary",
            },
          });
          
        })
        .catch((er) => {
          reject(er);
        });
    });
  }
}
