import AuthModule from "@/store/modules/AuthModule";
import BodyModule from "@/store/modules/BodyModule";
import BreadcrumbsModule from "@/store/modules/BreadcrumbsModule";
import ConfigModule from "@/store/modules/ConfigModule";
import LookupQueries from "@/store/modules/LookupQueries";
import MarketModule from "@/store/modules/MarketModule";
import SetupModule from "@/store/modules/SetupModule";
import ProductLabels from "@/store/modules/ProductLabels";
import ProductCategories from "@/store/modules/ProductCategories"
import ProductBrands from "@/store/modules/ProductBrands";
import ProductModifiers from "@/store/modules/ProductModifiers";
import UpdateProduct from "@/store/modules/UpdateProduct";
import ProductTags from "@/store/modules/ProductTags"
import Order from "@/store/modules/OrderModule";
import AbandonedCarts from '@/store/modules/AbandonedCarts';
import ProductWishlists from '@/store/modules/WishlistModule';
import AllAccounts from "@/store/modules/AccountsModule";
import WalletModule from "@/store/modules/Wallet"
import PointSystems from "@/store/modules/PointSystems";
import { createStore } from "vuex";
import { config } from "vuex-module-decorators";

config.rawError = true;

const store = createStore({
  state: {
    Errors: null,
    ResponseHeaders: null,
    ModalStatus: false
  },
  mutations: {
    ERRORS(state, payload) {
      state.Errors = payload;
    },
    SET_RESPONSE_HEADER(state, payload) {
      state.ResponseHeaders = payload;
    },
    MODAL_HANDLER(state) {
      state.ModalStatus = !state.ModalStatus;
    }
  },
  modules: {
    AuthModule,
    LookupQueries,
    MarketModule,
    BodyModule,
    BreadcrumbsModule,
    ConfigModule,
    ProductModifiers,
    SetupModule,
    ProductBrands,
    ProductLabels,
    ProductCategories,
    ProductTags,
    AbandonedCarts,
    Order,
    ProductWishlists,
    AllAccounts,
    WalletModule,
    UpdateProduct,
    PointSystems
  },
});

export default store;
