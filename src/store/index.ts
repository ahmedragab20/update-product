import AuthModule from "@/store/modules/AuthModule";
import BodyModule from "@/store/modules/BodyModule";
import BreadcrumbsModule from "@/store/modules/BreadcrumbsModule";
import ConfigModule from "@/store/modules/ConfigModule";
import LookupQueries from "@/store/modules/LookupQueries";
import MarketModule from "@/store/modules/MarketModule";
import SetupModule from "@/store/modules/SetupModule";
import ProductLabels from "@/store/modules/ProductLabels";
import ProductCategories from "@/store/modules/ProductCategories";
import ProductBrands from "@/store/modules/ProductBrands";
import ProductModifiers from "@/store/modules/ProductModifiers";
import UpdateProduct from "@/store/modules/UpdateProduct";
import ProductTags from "@/store/modules/ProductTags";
import Order from "@/store/modules/OrderModule";
import AbandonedCarts from "@/store/modules/AbandonedCarts";
import ProductWishlists from "@/store/modules/WishlistModule";
import AllAccounts from "@/store/modules/AccountsModule";
import WalletModule from "@/store/modules/Wallet";
import Shops from "@/store/modules/ShopsModule";
import PointSystems from "@/store/modules/PointSystems";
import ClientGroup from "@/store/modules/ClientGroup";
import Clients from "@/store/modules/Client";
import { createStore } from "vuex";
import { config } from "vuex-module-decorators";
import router from "@/router";

config.rawError = true;

const store = createStore({
  state: {
    Errors: null,
    ResponseHeaders: null,
    ModalStatus: false,
    websiteLanguage: "en-us", // init value
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
    },
    SET_WEBSITE_LANGUAGE(state, lang) {
      state.websiteLanguage = lang;
    },
  },
  actions: {
    async setResponseHandler({ commit, getters }, payload) {
      commit("SET_RESPONSE_HEADER", payload);

      const isMarketActive = payload["x-is-market-active"];
      const hasNoMarketActive = isMarketActive === "False" || !isMarketActive;
      const storedToken = localStorage.getItem("token");
      const isLoggedIn = getters.isUserAuthenticated || storedToken;
      const inSetupPage = router.currentRoute.value.name === "setup";

      if (hasNoMarketActive && isLoggedIn && !inSetupPage) {
        // await router.push("/setup").then(() => {
        //   store.commit("RERENDER_APP", { value: true, source: "setup" });
        // });
      } else {
        return;
      }
    },
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
    PointSystems,
    Shops,
    ClientGroup,
    Clients,
  },
});

export default store;
