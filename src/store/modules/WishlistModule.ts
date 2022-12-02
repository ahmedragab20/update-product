import { Actions, Mutations } from "@/store/enums/StoreEnums";
import Api from "@/utils/ApiHelper";
import { Views } from '@/shared/enums/Views';
// import { Language } from "element-plus/es/locale";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Wishlist } from "@/types";
import { Pagination } from '@/types';
import Swal from "sweetalert2";
import i18n from "@/core/plugins/i18n";
import { reactive } from 'vue';

@Module
export default class ProductWishlists extends VuexModule {
  
  //? state
  activeView = Views.TABLE_VIEW;
  pagination: Pagination = {
      totalPages: 0,
      totalCount: 0,
      pageSize: 6,
      pageNumber: 1,
      hasPreviousPage: true,
      hasNextPage: true,
  }

  filterDto = reactive({
    ShopIds: [],
    deviceId: "",
    productCounts: "",
  });
  wishlistDetails = reactive({
    deviceId: "",
    shopId: "",
    products: [
      {
        id: "",
        thumbnail: "",
        name: "",
        price: 0,
        quantity: 0
      }
    ]
  })
  wishlists: Array<Wishlist> = [];
  total = null;

  shops = [];
  products: Array<any> = [];

  //* getters
  get getWishlists(): Array<Wishlist> {
    return this.wishlists;
  }
  get productWishlistDetails() {
    return this.wishlistDetails;
  }

  get getWishlistPagination() {
    return this.pagination;
  }

  //* Mutations
  @Mutation
  [Mutations.SET_PRODUCT_WISHLISTS](payload: Wishlist[]) {
    this.wishlists = payload;
  }
  @Mutation
    [Mutations.SET_PRODUCT_WISHLIST](payload) {
        this.wishlistDetails = { ...payload };
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
  @Action
    [Actions.GET_PRODUCT_WISHLISTS]({ 
      pageNumber, pageSize, ShopIds
    }){
        let params = `?`;
        params += `pageNumber=${pageNumber}`
        params += `&pageSize=${pageSize}`
        ShopIds.forEach(element => {
            params += `&ShopIds=${element}`
        });
        Api({ url: Actions.GET_PRODUCT_WISHLISTS + params, method: 'get' }).then(res => {
            this.context.commit(Mutations.SET_PRODUCT_WISHLISTS, res?.data.data.data)
            if (res?.status == 200 && res.data.statusCode == 200)
              this.context.commit(Mutations.UPDATE_PAGINATION, res?.data);
        })
    }

  @Action
    [Actions.GET_PRODUCT_WISHLIST](id: string) {
        Api({ url: Actions.GET_PRODUCT_WISHLIST + `?id=${id}`, method: 'get' }).then(res => {
            this.context.commit(Mutations.SET_PRODUCT_WISHLIST, res?.data.data)
        })
    }

}
