import { Actions, Mutations } from "@/store/enums/StoreEnums";

import { ClientGroupType } from "@/types";

import { Pagination } from "@/interfaces/pagination";
import Api from "@/utils/ApiHelper";
import Swal from "sweetalert2";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import i18n from "@/core/plugins/i18n";
@Module
export default class ClientGroup extends VuexModule {
  //? sate

  ClientGroups: Array<ClientGroupType> = [];

  AllData: Array<ClientGroupType> = [];
  ClientGroup: {} | undefined;
  GroupUpdatePayload: any | undefined;

  pagination: Pagination = {
    totalPages: 100,
    totalCount: 100,
    pageSize: 8,
    pageNumber: 1,
    hasPreviousPage: true,
    hasNextPage: true,
  };

  //* Mutations

  @Mutation
  [Mutations.SET_CLIENT_GROUP](CLIENTGROUP: Array<ClientGroupType>) {
    // this.ClientGroups = CLIENTGROUP;
    this.AllData = CLIENTGROUP;
    this.pagination.totalCount = CLIENTGROUP.length;
    this.ClientGroups = CLIENTGROUP.slice(
      (this.pagination.pageNumber - 1) * this.pagination.pageSize,
      this.pagination.pageSize * this.pagination.pageNumber
    );
    this.pagination.totalCount = CLIENTGROUP.length;
  }

  @Mutation
  [Mutations.UPDATE_PAGINATION_CLIENT_GROUP](value) {
    this.pagination = {
      pageSize: this.pagination.pageSize,
      pageNumber: this.pagination.pageNumber,
      totalCount: this.pagination.totalCount,
      hasPreviousPage: true,
      hasNextPage: true,
      totalPages: 100,
    };
    this.ClientGroups = this.AllData.slice(
      (this.pagination.pageNumber - 1) * this.pagination.pageSize,
      this.pagination.pageSize * this.pagination.pageNumber
    );
    this.pagination.totalCount = this.AllData.length;
  }

  @Mutation
  [Mutations.SET_CLIENT_GROUP_BY_ID](item) {
    this.ClientGroup = item;

    console.log("single", this.ClientGroup);
  }
  @Mutation
  [Mutations.FILTER_GROUP](id) {
    this.ClientGroups = this.AllData.filter((el) => {
      return el.conditions.some((f) => {
        return f.condition.id === id;
      });
    });
  }
  @Mutation
  [Mutations.SEARCH_GROUP](name) {
    this.ClientGroups = this.AllData.filter(
      (p) =>
        p.name.toLowerCase().indexOf(name.value.toLocaleLowerCase()) != -1 ||
        !name.value
    );
  }

  //! Actions

  @Action
  [Actions.GET_CLIENT_GROUP_BY_ID](id) {
    let item = {} as ClientGroupType;
    this.ClientGroups.forEach((el) => {
      if (parseInt(el.id) == parseInt(id)) {
        item = el;
      }
    });
    return new Promise((resolve, reject) => {

      resolve(item);
    });
  }

  @Action
  [Actions.DELETE_CLIENT_GROUP](payload) {
    return new Promise((resolve, reject) => {
      Api({
        method: "post",
        url: Actions.DELETE_CLIENT_GROUP,
        payload: { id: payload },
      })
        .then((res) => {
          if (res?.data.statusCode == 200) {
            Swal.fire({
              text: i18n.global.t("ClientGroupRemoved"),
              icon: "success",
              showCancelButton: false,
              confirmButtonColor: "#04c8c8",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
            }).then(() => {
              resolve(res?.data);
            });
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
  }

  @Action
  [Actions.GET_CLIENT_GROUP]({ query, pageSize, pageNumber }) {
    const payload = {
      method: "get",
      url:
        Actions.GET_CLIENT_GROUP +
        `?name=${query}&pageSize=1000000000&pageNumber=${pageNumber}`,
    };

    Api(payload).then((response) => {
      this.context.commit(
        Mutations.SET_CLIENT_GROUP,
        response?.data.data as Array<ClientGroupType>
      );

      console.log({ kawthar: response?.data });
    });
  }

  @Action
  [Actions.UPDATE_CLIENT_GROUP](payload: any) {
    return new Promise((resolve, reject) => {
      Api({ method: "post", url: Actions.UPDATE_CLIENT_GROUP, payload })
        .then((res) => {
          if (res?.data.statusCode == 200) {
            Swal.fire({
              text: i18n.global.t("ClientGroupUpdated"),
              icon: "success",
              showCancelButton: false,
              confirmButtonColor: "#04c8c8",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
            }).then(() => {
              resolve(res?.data);
            });
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
  }

  @Action
  [Actions.ADD_CLIENT_GROUP](payload) {
    return new Promise((resolve, reject) => {
      Api({ method: "post", url: Actions.ADD_CLIENT_GROUP, payload })
        .then((res) => {
          if (res?.data.statusCode == 200) {
            Swal.fire({
              icon: "success",
              showCancelButton: false,
              confirmButtonColor: "#04c8c8",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
              title: i18n.global.t("ClientGroupAdded"),
              showConfirmButton: true,
            }).then(() => {
              resolve(res?.data);
            });
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
  }
}
