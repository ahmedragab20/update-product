import { Pagination } from '@/types';
import Api from "@/utils/ApiHelper";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Shop } from "@/types";
import Swal from "sweetalert2";
import i18n from '@/core/plugins/i18n'

@Module
export default class Shops extends VuexModule {
    shops: Array<Shop> = [];
    users=[];

    pagination: Pagination = {
        totalPages: 0,
        totalCount: 0,
        pageSize: 6,
        pageNumber: 1,
        hasPreviousPage: true,
        hasNextPage: true,
    }

    // getters
    get getShopsPagination(): Pagination {
        return this.pagination
    }
    @Mutation
    [Mutations.UPDATE_CURRENT_PAGE](currentPage) {
        this.pagination.pageNumber = currentPage
    }
    @Mutation
    [Mutations.UPDATE_PAGINATION]({ totalPages,
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
    [Mutations.SET_SHOPS](payload: Shop[]) {
        this.shops = payload;
    }
    @Mutation
    [Mutations.SET_USERS](payload) {
        this.users = payload;
    }
    @Mutation
    [Mutations.SET_SHOPS_RESOURCES](obj) {
      console.log('obj',obj)
      this.initResources = obj;
      console.log('    this.initResources',this.initResources)
    }
  
    @Mutation
    [Mutations.SET_SHOPS_LOGO](logoKey) {
      console.log('obj',logoKey)
      this.logoKey = logoKey;
      console.log(' this.logoKey ', this.logoKey )
    }
    @Mutation
  [Mutations.DELETE_SHOP](id) {
    Swal.fire({
      text: i18n.global.t("shopDeleted"),
      icon: "success",
      buttonsStyling: false,
      confirmButtonText: i18n.global.t("ok"),
      customClass: {
        confirmButton: "btn fw-bold btn-light-primary",
      },
    })
  }
    currentSetupLangs = [];
    initSetupData = {};
    initResources = {};
    logoKey = "";


    @Action({ rawError: true })
    [Actions.CREATE_SHOP](shopsdata) {
     let longitude=shopsdata.location.lng
     let latitude=shopsdata.location.lat
     delete shopsdata.location;
      const data = JSON.parse(
        JSON.stringify({
          ...shopsdata,
          logoKey: this.logoKey,
          resources: this.initResources,
          longitude,
          latitude
          
        })
      );
      const payload = {
        method: "post",
        url: Actions.CREATE_SHOP,
        payload: data,
      };
  
      return new Promise((resolve, reject) => {
        Api(payload)
          .then((res) => {
            resolve(res)
            if (res?.data.succeeded) {
              resolve(res);
            } else {
              reject(res?.data);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
    
    @Action
    [Actions.GET_PAYMENT_METHODS](countryId) {
      const payload = {
        method: "get",
        url: Actions.GET_PAYMENT_METHODS+ "?countryId=" + countryId,
      };
  
      return new Promise((resolve, reject) => {
        Api(payload)
          .then((res) => {
            resolve(res?.data)
            
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
    @Action
    [Actions.GET_SHOPS]({ query, pageSize, pageNumber }) {
        const payload = {
        method: "get",
        url:
            Actions.GET_SHOPS +
            `?name=${query}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
        };

        Api(payload).then((response) => {
        this.context.commit(
            Mutations.SET_SHOPS,
            response?.data.data as Array<Shop>
        );
        this.context.commit(Mutations.UPDATE_PAGINATION, response?.data);

        });
    }
    @Action
    [Actions.GET_USERS]() {
        const payload = {
        method: "get",
        url:
            Actions.GET_USERS 
         
        };

        Api(payload).then((response) => {
        this.context.commit(
            Mutations.SET_USERS,
            response?.data.data
        );
     

        });
    }
    
    @Action({ rawError: true })
    [Actions.UPDATE_SHOP_BASE_SETTINGS](shopsdata) {
     console.log('shopsdata',shopsdata)
     delete shopsdata.logoPath;
      const payload = {
        method: "post",
        url: Actions.UPDATE_SHOP_BASE_SETTINGS,
        payload: shopsdata,
      };
  
      return new Promise((resolve, reject) => {
        Api(payload)
          .then((res) => {
            if (res?.data.statusCode == 200) {
              Swal.fire({
                text: i18n.global.t("shopBaseUpdated"),
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
    }
    
    @Action({ rawError: true })
    [Actions.UPDATE_SHOPS_DELIVERY_SETTINGS](shopsdata) {
     console.log('shopsdata',shopsdata)
      const payload = {
        method: "post",
        url: Actions.UPDATE_SHOPS_DELIVERY_SETTINGS,
        payload: shopsdata,
      };
  
      return new Promise((resolve, reject) => {
        Api(payload)
          .then((res) => {
            if (res?.data.statusCode == 200) {
              Swal.fire({
                text: i18n.global.t("shopDeliveryUpdated"),
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
    }
    @Action({ rawError: true })
    [Actions.UPDATE_SHOPS_JETORDER_SETTINGS](shopsdata) {
     console.log('shopsdata',shopsdata)
      const payload = {
        method: "post",
        url: Actions.UPDATE_SHOPS_JETORDER_SETTINGS,
        payload: shopsdata,
      };
  
      return new Promise((resolve, reject) => {
        Api(payload)
          .then((res) => {
            if (res?.data.succeeded) {
              resolve(res);
            } else {
              reject(res?.data);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
    @Action({ rawError: true })
    [Actions.UPDATE_SHOPS_PAYEMENT](shopsdata) {
     console.log('shopsdata',shopsdata)
      const payload = {
        method: "post",
        url: Actions.UPDATE_SHOPS_PAYEMENT,
        payload: shopsdata,
      };
  
      return new Promise((resolve, reject) => {
        Api(payload)
          .then((res) => {
            if (res?.data.statusCode == 200) {
              Swal.fire({
                text: i18n.global.t("shopPaymentUpdated"),
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
    }
    @Action({ rawError: true })
    [Actions.UPDATE_SHOP_USERS](shopsdata) {
      const data = JSON.parse(
        JSON.stringify({
         
          id: shopsdata.id,
          userIds: shopsdata.userIds,
          
        })
      );
      const payload = {
        method: "post",
        url: Actions.UPDATE_SHOP_USERS,
        payload: data,
      };
  
      return new Promise((resolve, reject) => {
        Api(payload)
          .then((res) => {
            if (res?.data.statusCode == 200) {
              Swal.fire({
                text: i18n.global.t("shopUsersUpdated"),
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
    }
    @Action({ rawError: true })
    [Actions.UPDATE_SHOP_CATEGORIES](shopsdata) {
      const data = JSON.parse(
        JSON.stringify({
         
          id: shopsdata.id,
          itemCategories: shopsdata.productCategories,
          
        })
      );
      const payload = {
        method: "post",
        url: Actions.UPDATE_SHOP_CATEGORIES,
        payload: data,
      };
  
      return new Promise((resolve, reject) => {
        Api(payload)
          .then((res) => {
            if (res?.data.statusCode == 200) {
              Swal.fire({
                text: i18n.global.t("shopCategoriesUpdated"),
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
    }

    @Action({ rawError: true })
    [Actions.UPDATE_SHOP_ORDER_SETTINGS](shopsdata) {
     console.log('shopsdata',shopsdata)
      const payload = {
        method: "post",
        url: Actions.UPDATE_SHOP_ORDER_SETTINGS,
        payload: shopsdata,
      };
  
      return new Promise((resolve, reject) => {
        Api(payload)
          .then((res) => {
            if (res?.data.succeeded) {
              resolve(res);
            } else {
              reject(res?.data);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
    
    @Action
    [Actions.GET_SHOPS_BASE_SETTINGS](id) {
      return new Promise((resolve, reject) => {
        const payload = {
          method: "get",
          url: Actions.GET_SHOPS_BASE_SETTINGS + `?id=${id}`,
        };
  
        Api(payload).then((response) => {
          resolve(response?.data.data);
         
          console.log({ GET_SHOPS_BASE_SETTINGS: response?.data });
        });
      });
    }
    @Action
    [Actions.GET_SHOPS_PAYEMENT](id) {
      return new Promise((resolve, reject) => {
        const payload = {
          method: "get",
          url: Actions.GET_SHOPS_PAYEMENT + `?id=${id}`,
        };
  
        Api(payload).then((response) => {
          resolve(response?.data.data);
         
       
        });
      });
    }
    @Action
    [Actions.GET_SHOPS_JETORDER_SETTINGS](id) {
      return new Promise((resolve, reject) => {
        const payload = {
          method: "get",
          url: Actions.GET_SHOPS_JETORDER_SETTINGS + `?id=${id}`,
        };
  
        Api(payload).then((response) => {
          resolve(response?.data.data);
         
          console.log({ GET_SHOPS_BASE_SETTINGS: response?.data });
        });
      });
    }
    @Action
    [Actions.GET_SHOPS_DELIVERY_SETTINGS](id) {
      return new Promise((resolve, reject) => {
        const payload = {
          method: "get",
          url: Actions.GET_SHOPS_DELIVERY_SETTINGS + `?id=${id}`,
        };
  
        Api(payload).then((response) => {
          resolve(response?.data.data);
         
          console.log({ GET_SHOPS_DELIVERY_SETTINGS: response?.data });
        });
      });
    }

    @Action
    [Actions.GET_SHOPS_ORDER_SETTINGS](id) {
      return new Promise((resolve, reject) => {
        const payload = {
          method: "get",
          url: Actions.GET_SHOPS_ORDER_SETTINGS + `?id=${id}`,
        };
  
        Api(payload).then((response) => {
          resolve(response?.data.data);
         
          console.log({ GET_SHOPS_BASE_SETTINGS: response?.data });
        });
      });
    }
    @Action
    [Actions.GET_SHOP_CATEGORIES](id) {
      return new Promise((resolve, reject) => {
        const payload = {
          method: "get",
          url: Actions.GET_SHOP_CATEGORIES + `?id=${id}`,
        };
  
        Api(payload).then((response) => {
          resolve(response?.data);
         
          console.log({ GET_SHOP_CATEGORIES: response });
        });
      });
    }
    @Action
    [Actions.GET_SHOP_USERS](id) {
      return new Promise((resolve, reject) => {
        const payload = {
          method: "get",
          url: Actions.GET_SHOP_USERS + `?id=${id}`,
        };
  
        Api(payload).then((response) => {
          resolve(response?.data.data);
         
          console.log({ GET_SHOPS_BASE_SETTINGS: response?.data });
        });
      });
    }
    
    @Action
    [Actions.GET_SHOP_FINANCIAL](id) {
      return new Promise((resolve, reject) => {
        const payload = {
          method: "get",
          url: Actions.GET_SHOP_FINANCIAL + `?id=${id}`,
        };
  
        Api(payload).then((response) => {
          resolve(response?.data.data);
         
          console.log({ GET_SHOP_FINANCIAL: response?.data });
        });
      });
    }
    @Action
  [Actions.DELETE_SHOP](payload) {
    Api({
      method: "post",
      url: Actions.DELETE_SHOP,
      payload: { id: payload },
    }).then((res) => {
      this.context.commit(Mutations.DELETE_SHOP, payload);
    });
  }
}
