import { Actions, Mutations } from "@/store/enums/StoreEnums";
import Api from "@/utils/ApiHelper";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Point } from "@/types";
import { Pagination } from "@/types";
import { reactive } from "vue";
@Module
export default class PointSystem extends VuexModule {
  pagination: Pagination = {
    totalPages: 0,
    totalCount: 0,
    pageSize: 6,
    pageNumber: 1,
    hasPreviousPage: true,
    hasNextPage: true,
  };
  filterDto = reactive({
    ShopIds: [],
  });

  //// Start State
  pointSystems: Array<Point> = [];
  pointSystemDetails: Array<Point> = [];
  //// End State

  //// Start getters
  get getPointSystems(): Array<Point> {
    return this.pointSystems;
  }
  get getPointSystemsPagination() {
    return this.pagination;
  }
  get pointSystem(): Array<Point> {
    return this.pointSystemDetails;
  }
  //// End getters

  //// Start Mutations
  @Mutation
  [Mutations.SET_POINT_SYSTEMS](payload: Point[]) {
    this.pointSystems = payload;
  }
  @Mutation
  [Mutations.SET_POINT_SYSTEM](payload: Point[]) {
    this.pointSystemDetails = payload;
  }
  @Mutation
  [Mutations.UPDATE_CURRENT_PAGE](currentPage) {
    this.pagination.pageNumber = currentPage;
  }
  @Mutation
  [Mutations.UPDATE_PAGINATION]({ totalPages, totalCount }) {
    this.pagination.totalPages = totalPages;
    this.pagination.totalCount = totalCount;
  }
  //// End Mutations

  //// Start Actions
  // Get Points Systems
  @Action
  [Actions.GET_POINT_SYSTEMS]({ pageNumber, pageSize, ShopIds }) {
    let params = `?`;
    params += `pageNumber=${pageNumber}`;
    params += `&pageSize=${pageSize}`;
    ShopIds.forEach((element) => {
      params += `&ShopIds=${element}`;
    });
    Api({ url: Actions.GET_POINT_SYSTEMS + params, method: "get" }).then(
      (res) => {
        this.context.commit(Mutations.SET_POINT_SYSTEMS, res?.data.data);
        if (res?.status == 200 && res.data.statusCode == 200)
          this.context.commit(Mutations.UPDATE_PAGINATION, res?.data);
      }
    );
  }
  // Get Point System Details
  @Action
  [Actions.GET_POINT_SYSTEM](id) {
    return new Promise((resolve, reject) => {
      const payload = {
        method: "get",
        url: Actions.GET_POINT_SYSTEM + `?id=${id}`,
      };
      Api(payload).then((res) => {
        this.context.commit(Mutations.SET_POINT_SYSTEM, res?.data.data);
        resolve(res?.data.data);
      });
    });
  }
  // Add Point System
  @Action
  [Actions.ADD_POINT_SYSTEMS](payload) {
    return new Promise((resolve, reject) => {
      Api({ method: "post", url: Actions.ADD_POINT_SYSTEMS, payload })
        .then((res) => {
          resolve(res);
        })
        .catch((er) => {
          reject(er);
        });
    });
  }
  // Update Point System
  @Action
  [Actions.UPDATE_POINT_SYSTEMS](payload: object) {
    return new Promise((resolve, reject) => {
      Api({ method: "post", url: Actions.UPDATE_POINT_SYSTEMS, payload })
        .then((res) => {
          resolve(res);
        })
        .catch((er) => {
          reject(er);
        });
    });
  }
  // Delete Point System
  @Action
  [Actions.DELETE_POINT_SYSTEM](payload: object) {
    return new Promise((resolve, reject) => {
      Api({ method: "post", url: Actions.DELETE_POINT_SYSTEM, payload })
        .then((res) => {
          resolve(res);
        })
        .catch((er) => {
          reject(er);
        });
    });
  }
  //// End Actions
}
