import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import type { JwtHeader, JwtPayload, User } from "@/types";
import Api from "@/utils/ApiHelper";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store";

interface userInfo {
  first_name: string;
  last_name: string;
  email: string;
  countryId: string;
  phone: string;
  password: string;
  password_confirmation: string;
  phoneCountryCode: string;
  otp: string;
  deviceId: string;
}

interface RerenderApp {
  value: boolean;
  source?: string;
}

@Module
export default class AuthModule extends VuexModule {
  errors: any;
  token: string;
  refreshToken = localStorage.getItem("refreshToken");
  deviceId = localStorage.getItem("deviceId");
  tokenExpiresIn = 0;
  user = {} as User;
  isAuthenticated = false;
  componentKey: number = 0;
  updatedDataAlert: boolean = false;

  /**
   * Get current user object
   * @returns User
   */
  get currentUser(): User {
    return this.user;
  }

  /**
   * Verify user authentication
   * @returns boolean
   */
  get isUserAuthenticated(): boolean {
    const falsieValues = [undefined, "undefined", null];
    const tokenUndefined =
      (!!this.token && falsieValues.includes(this.token)) || !this.token;
    const userUnDefined = !this.user || (this.user && !this.user.id);

    return !tokenUndefined && !userUnDefined;
  }

  @Mutation
  [Mutations.SET_ERROR](error) {
    this.errors = { ...error };
  }

  @Mutation
  [Mutations.SET_AUTH]({ deviceId, refreshToken, token }) {
    this.deviceId = deviceId;
    this.refreshToken = refreshToken;
    this.token = token;
    this.isAuthenticated = true;
  }

  @Mutation
  [Mutations.SET_PASSWORD](password) {
    this.user.password = password;
  }

  @Mutation
  [Mutations.PURGE_AUTH]() {
    this.isAuthenticated = false;
    this.user = {} as User;
    this.errors = [];
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    // JwtService.destroyToken();
  }

  // User Data Info set to store
  @Mutation
  [Mutations.SET_USER](user) {
    this.user = user;
  }

  @Mutation
  ["SET_TOKEN"](token: string) {
    ApiService.vueInstance.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
    this.token = token;
  }

  @Mutation
  ["RERENDER_APP"](payload: RerenderApp) {
    let updateCount = 0;
    if (payload.value && !updateCount) {
      updateCount++;
      this.componentKey++;

      if (!payload.source || (payload.source && payload.source === "auth")) {
        this.updatedDataAlert = true;

        return;
      }
    }

    setTimeout(() => {
      this.updatedDataAlert = false;
    }, 10000);
  }

  @Action
  async [Actions.USER]() {
    const payload = {
      method: "get",
      url: Actions.USER,
    };
    // customsHeaders: { Authorization: `Bearer ${cookies.get("token")}` },
    return await Api(payload)
      .then((res) => {
        this.context.commit(Mutations.SET_USER, res?.data.data);

        return res;
      })
      .catch((e) => {
        console.error(e);
        return false;
      });
  }

  @Action({ rawError: true })
  async [Actions.REGISTER](userInfo: userInfo) {
    const data = {
      method: "post",
      url: Actions.REGISTER,
      payload: userInfo,
    };

    return await new Promise((resolve, reject) => {
      Api(data)
        .then((res) => {
          const info = res?.data.data;
          this.context.commit("SET_TOKEN", info.token);
          localStorage.setItem("token", info.token);
          localStorage.setItem("refreshToken", info.refreshToken);
          localStorage.setItem("deviceId", userInfo.deviceId);

          const loginInfo = {
            deviceId: userInfo.deviceId,
            refreshToken: info.refreshToken,
            token: info.token,
          };
          ApiService.setHeader();
          this.context.commit(Mutations.SET_AUTH, loginInfo);
          resolve(info);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  @Action
  async [Actions.LOGIN](credentials: any) {
    try {
      const reqData = {
        method: "post",
        url: Actions.LOGIN,
        payload: credentials,
      };

      const response = await Api(reqData);
      const info = response.data.data;
      const loginInfo = {
        deviceId: credentials.deviceId,
        refreshToken: info.refreshToken,
        token: info.token,
      };
      this.context.commit("SET_TOKEN", info.token);
      localStorage.setItem("token", info.token);
      localStorage.setItem("refreshToken", info.refreshToken);
      localStorage.setItem("deviceId", credentials.deviceId);
      ApiService.setHeader();
      this.context.commit(Mutations.SET_AUTH, loginInfo);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  @Action
  [Actions.LOGOUT]() {
    this.context.commit(Mutations.PURGE_AUTH);
  }

  @Action
  async [Actions.FORGOT_PASSWORD](payload) {
    return await ApiService.post("forgot_password", payload)
      .then(() => {
        this.context.commit(Mutations.SET_ERROR, {});
      })
      .catch(({ response }) => {
        this.context.commit("ERRORS", response.data.errors, { root: true });
      });
  }

  @Action
  async [Actions.VERIFY_AUTH](payload) {
    if (JwtService.getToken()) {
      await ApiService.setHeader();
      await ApiService.post("verify_token", payload)
        .then(({ data }) => {
          this.context.commit(Mutations.SET_AUTH, data);
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR, response.data.errors);
          this.context.commit(Mutations.PURGE_AUTH);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  @Action
  async ["AUTH_REQUESTS"]() {
    await store.dispatch(Actions.USER).then((res) => {
      if (res) {
        store.dispatch(Actions.SETTINGS);
        store.dispatch(Actions.MARKET);
        store.dispatch(Actions.GET_SHOPS);
        store.dispatch(Actions.CATEGORIES);
        store.dispatch(Actions.GET_PRODUCT_BRANDS);
      }
    });
  }
}
