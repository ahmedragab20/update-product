import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import type { JwtHeader, JwtPayload, User } from "@/types";
import Api from "@/utils/ApiHelper";
import { useCookies } from "@vueuse/integrations/useCookies";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
const cookies = useCookies(["token"]);

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
@Module
export default class AuthModule extends VuexModule {
  errors: any;
  token = cookies.get<string>("token");
  refreshToken = cookies.get<string>("refreshToken");
  deviceId = cookies.get<string>("deviceId");
  tokenExpiresIn = 0;
  user = {} as User;
  isAuthenticated = false;
  jwtHeader = {} as JwtHeader;
  jwtPayload = {} as JwtPayload;
  RegisterResponse = null;

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
    return !!(this.user && this.token);
  }

  /**
   * Get authentification errors
   * @returns array
   */
  get getErrors() {
    return this.errors;
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
    console.log(this);
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
    cookies.remove("token");
    cookies.remove("refreshToken");
    // JwtService.destroyToken();
  }

  // User Data Info set to store
  @Mutation
  [Mutations.SET_USER](user) {
    this.user = user;
  }
  @Action
  [Actions.USER]() {
    const payload = {
      method: "get",
      url: Actions.USER,
    };
    // customsHeaders: { Authorization: `Bearer ${cookies.get("token")}` },
    Api(payload).then((res) => {
      console.log({ user: res });

      this.context.commit(Mutations.SET_USER, res?.data.data);
    });
  }

  @Action({ rawError: true })
  [Actions.REGISTER](userInfo: userInfo) {
    const data = {
      method: "post",
      url: Actions.REGISTER,
      payload: userInfo,
    };

    return new Promise((resolve, reject) => {
      Api(data)
        .then((res) => {
          const info = res?.data.data;
          const cookiesOptions = {
            expires: new Date(Date.now() + info.tokenExpiresIn),
            maxAge: info.tokenExpiresIn,
          };
          cookies.set("token", info.token, cookiesOptions);
          cookies.set("refreshToken", info.refreshToken, cookiesOptions);
          cookies.set("deviceId", userInfo.deviceId, cookiesOptions);

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
  [Actions.LOGIN](credentials: any) {
    const payload = {
      method: "post",
      url: Actions.LOGIN,
      payload: credentials,
    };
    return new Promise((resolve, reject) => {
      Api(payload)
        .then((res) => {
          const info = res?.data.data;
          const cookiesOptions = {
            expires: new Date(Date.now() + info.tokenExpiresIn),
            maxAge: info.tokenExpiresIn,
          };
          cookies.set("token", info.token, cookiesOptions);
          cookies.set("refreshToken", info.refreshToken, cookiesOptions);
          cookies.set("deviceId", credentials.deviceId, cookiesOptions);

          const loginInfo = {
            deviceId: credentials.deviceId,
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
  [Actions.LOGOUT]() {
    this.context.commit(Mutations.PURGE_AUTH);
  }

  @Action
  [Actions.FORGOT_PASSWORD](payload) {
    return ApiService.post("forgot_password", payload)
      .then(() => {
        this.context.commit(Mutations.SET_ERROR, {});
      })
      .catch(({ response }) => {
        this.context.commit("ERRORS", response.data.errors, { root: true });
      });
  }

  @Action
  [Actions.VERIFY_AUTH](payload) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("verify_token", payload)
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
}
