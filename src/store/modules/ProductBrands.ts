import { Actions, Mutations } from "@/store/enums/StoreEnums";
import Api from "@/utils/ApiHelper";
// import { Language } from "element-plus/es/locale";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Brand } from "@/types";
import { Pagination } from '@/types';
import Swal from "sweetalert2";
import i18n from "@/core/plugins/i18n";

@Module
export default class ProductBrands extends VuexModule {
  pagination: Pagination = {
    totalPages: 0,
    totalCount: 0,
    pageSize: 6,
    pageNumber: 1,
    hasPreviousPage: true,
    hasNextPage: true,
  }
  //? state
  brands = [] as Brand[];
  total = null;

  shops = [];
  searchConnectedProducts = [];
  products: Array<any> = [];
  connectedProducts: Array<any> = [];

  //* getters
  get getBrands(): Array<Brand> {
    return this.brands;
  }


  get getBrandPagination() {
    return this.pagination;
  }

  //* Mutations
  @Mutation
  [Mutations.SET_PRODUCT_BRANDS](payload: Brand[]) {
    this.brands = payload;
  }
  @Mutation
  [Mutations.UPDATE_CURRENT_PAGE](currentPage) {
    this.pagination.pageNumber = currentPage
  }
  @Mutation
  [Mutations.UPDATE_PAGINATION]({ totalPages,
    totalCount,
  }) {
    this.pagination.totalPages = totalPages;
    this.pagination.totalCount = totalCount;
  }

  @Mutation
  [Mutations.SET_DETAIL_PRODUCT_BRAND](payload) {
    this.connectedProducts = [...payload];

  }
  @Mutation
  [Mutations.SET_SEARCH_PRODUCTS](payload) {
    this.searchConnectedProducts = payload;
  }
  @Mutation
  [Mutations.UPDATE_TABLE_PRODUCT](payload) {
    payload.forEach(element => {
      this.connectedProducts.push({ id: element.id, name: element.name, thumbnail: element.thumbnail })
    });
  }
  @Mutation
  [Mutations.REMOVE_DETAIL_PRODUCT_BRANDS](payload) {
    this.connectedProducts = this.connectedProducts.filter(p => payload.indexOf(p.id) == -1)
  }

  //Actions
  @Action
  [Actions.DELETE_PRODUCT_BRANDS](id) {
    console.log(id);

    const data = {
      method: "post",
      url: Actions.DELETE_PRODUCT_BRANDS,
      payload: { id },
    };
    return new Promise((resolve) => {

      Swal.fire({
        title: i18n.global.t('alertTitle'),
        text: i18n.global.t('deleteBrandAlertText'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: i18n.global.t('deleteAlertConfirm'),
        cancelButtonText: i18n.global.t('cancel'),
      }).then(status => {


        Api(data).then((response) => {
          resolve(response?.data)
          if (status.isConfirmed)
            Swal.fire({
              text: i18n.global.t('deleteSuccess'),
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: i18n.global.t('ok'),
              customClass: {
                confirmButton: "btn fw-bold btn-light-primary",
              },
            })
        })
      })

    })
  }
  @Action
  [Actions.UPLOAD_FILE](data: any) {

    const payload = {
      method: "post",
      url: Actions.UPLOAD_FILE,
      payload: data,
    };

    return Api(payload)

  }
  @Action
  [Actions.GET_PRODUCT_BRANDS]({ name, pageSize, pageNumber }) {
    const payload = {
      method: "get",
      url:
        Actions.GET_PRODUCT_BRANDS + `?name=${name}&PageSize=${pageSize}&PageNumber=${pageNumber}`,
    };

    Api(payload).then((response) => {
      this.context.commit(Mutations.SET_PRODUCT_BRANDS, response?.data.data);
      if (response?.status == 200 && response.data.statusCode == 200)
        this.context.commit(Mutations.UPDATE_PAGINATION, response?.data);
    });
  }
  @Action
  [Actions.GET_PRODUCT_BRAND]({ id }) {
    return new Promise((resolve, reject) => {
      const payload = {
        method: "get",
        url: Actions.GET_PRODUCT_BRAND + `?id=${id}`,
      };
      Api(payload).then((res) => {
        // this.context.commit(Mutations.SET_PRODUCT_TAG, res?.data.data);
        resolve(res?.data.data)
        console.log(res?.data.data);

      });
    });
  }
  @Action
  [Actions.GET_DETAIL_PRODUCT_BRAND]({ id }) {
    return new Promise((resolve, reject) => {
      const payload = {
        method: "get",
        url: Actions.GET_DETAIL_PRODUCT_BRAND + `?id=${id}&pageSize=${100000}&pageNumber=${1}`,
      };
      Api(payload).then((res) => {
        this.context.commit(Mutations.SET_DETAIL_PRODUCT_BRAND, res?.data.data);
        resolve(res?.data.data)
      });
    });
  }
  @Action
  [Actions.DELETE_DETAIL_PRODUCT_BRANDS](payload) {
    Swal.fire({
      title: i18n.global.t('alertTitle'),
      text: i18n.global.t('deleteProductBrandAlertText'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: i18n.global.t('deleteAlertConfirm'),
      cancelButtonText: i18n.global.t('cancel'),
    }).then(status => {
      if (status.isConfirmed)
        Api({ method: 'post', url: Actions.DELETE_DETAIL_PRODUCT_BRANDS, payload: payload }).then(res => {
          if (res?.status == 200 && res.data.statusCode == 200) {

            this.context.commit(Mutations.REMOVE_DETAIL_PRODUCT_BRANDS, payload.connectedProducts)
            Swal.fire({
              text: `Product Deleted Successfully ! `,
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn fw-bold btn-light-primary",
              },
            })
          }
          else {
            Swal.fire({
              title: 'errro !',
              text: res?.data.message
            })
          }
        }).catch(er => {
          Swal.fire({
            title: er.data
          })
        })
    })
  }
  @Action
  [Actions.ADD_DETAIL_PRODUCT_BRANDS]({ id, connectedProducts }) {
    const payload = { id, connectedProducts: [...connectedProducts].map(ele => ele.id) }
    return new Promise((resolve) => {
      Api({ method: "post", url: Actions.ADD_DETAIL_PRODUCT_BRANDS, payload }).then((res) => {
        if (res?.data) {
          this.context.commit(Mutations.UPDATE_TABLE_PRODUCT, [...connectedProducts])
        }

        resolve(res?.data)

      });
    })

  }
  @Action
  [Actions.EDIT_PRODUCT_BRAND](payload) {
    console.log(payload);
    return new Promise((resolve) => {
      Api({ method: "post", url: Actions.EDIT_PRODUCT_BRAND, payload }).then((res) => {

        resolve(res?.data);

      })
    })
  }
  @Action
  [Actions.SEARCH_PRODUCTS]({ query, pageSize, pageNumber }) {
    return new Promise((resolve, reject) => {
      Api({ method: 'get', url: Actions.SEARCH_PRODUCTS + `?Value=${query}` }).then((res) => {
        this.context.commit(Mutations.SET_SEARCH_PRODUCTS, res?.data.data)
        resolve(res?.data)
      }).catch(er => reject(er))
    })
  }
  @Action
  [Actions.ADD_PRODUCT_BRANDS](payload) {
    return new Promise((resolve, reject) => {
      Api({ method: 'post', url: Actions.ADD_PRODUCT_BRANDS, payload }).then((res) => {
        if (res?.data.statusCode == 200 && res.status == 200)
          resolve(res?.data)
        else {
          Swal.fire({
            title: 'Error',
            text: res?.data.message,
            icon: "error",
          })
          
        }
      }).catch(er => {
        Swal.fire({
          title: 'Error',
          text: er.data,
          icon: "error",
        })
        reject(er)
      })
    })
  }
}
