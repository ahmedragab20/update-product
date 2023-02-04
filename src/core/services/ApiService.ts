import { useCookies } from "@vueuse/integrations/useCookies";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { App } from "vue";
import VueAxios from "vue-axios";
import * as enums from "@/store/enums/StoreEnums";

const cookies = useCookies(["token"]);
import store from "@/store";
import { Mutations } from "@/store/enums/StoreEnums";

/**
 * @description service to call HTTP request via Axios
 */
const enumsActions = Object.keys(enums.Actions);

class ApiService {
  /**
   * @description property to share vue instance
   */
  public static vueInstance: App;

  /**
   * @description initialize vue axios
   */
  public static init(app: App<Element>) {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
    ApiService.vueInstance.axios.defaults.baseURL =
      "http://54.217.194.128:6644/api/v1";
    ApiService.setHeader();
  }

  /**
   * @description set the default HTTP request headers
   */
  public static setHeader(): void {
    const storedLang = JSON.parse(localStorage.getItem("website-lang"));

    ApiService.vueInstance.axios.defaults.headers.common["Accept"] =
      "application/json";
    /** JETORDER APP ID  */
    ApiService.vueInstance.axios.defaults.headers.common[
      "x-applicationid"
    ] = `Jet Order App API N/A`;

    ApiService.vueInstance.axios.defaults.headers.common["x-countryid"] = 1;
    ApiService.vueInstance.axios.defaults.headers.common["x-language"] =
      storedLang && storedLang.id ? storedLang.id.toLowerCase() : "en-us";
    ApiService.vueInstance.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${
      store.state.AuthModule.token || localStorage.getItem("token")
    }`;
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static query(
    resource: string,
    params: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(resource, params);
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param slug: string
   * @returns Promise<AxiosResponse>
   */
  public static get(
    resource: string,
    slug = "" as string
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(`${resource}/${slug}`);
  }

  /**
   * @description set the POST HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static post(
    resource: string,
    params: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.post(`${resource}`, params);
  }

  /**
   * @description send the UPDATE HTTP request
   * @param resource: string
   * @param slug: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static update(
    resource: string,
    slug: string,
    params: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}/${slug}`, params);
  }

  /**
   * @description Send the PUT HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static put(
    resource: string,
    params: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}`, params);
  }

  /**
   * @description Send the DELETE HTTP request
   * @param resource: string
   * @returns Promise<AxiosResponse>
   */
  public static delete(resource: string): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.delete(resource);
  }
}

const downApis = new Map();
const resolvedApis = new Map();
let lastRefresh: number;
let localToken: string;
let is401 = false;
// ApiService.vueInstance.axios.defaults.headers.common["x-language"] =
//   storeLang.toLowerCase();
axios.interceptors.request.use(async (config) => {
  // if (!ApiService.vueInstance.axios.defaults.headers.common["x-language"]) {
  //   const storedLang = JSON.parse(localStorage.getItem("website-lang"));
  //
  //   ApiService.vueInstance.axios.defaults.headers.common["x-language"] =
  //     storedLang && storedLang.id ? storedLang.id.toLowerCase() : "en-us";
  //
  //   if (storedLang) {
  //     store.commit("RERENDER_APP", { value: true, source: "auth-lng" });
  //   } else {
  //     console.log("elese");
  //     return config;
  //   }
  //   // await store.dispatch("AUTH_REQUESTS");
  // }

  // Refresh token conditions
  if (config.url.includes("/Autentication/refresh-token") && !lastRefresh) {
    lastRefresh = new Date().getTime();
  } else if (
    config.url.includes("/Autentication/refresh-token") &&
    new Date().getTime() - lastRefresh < 50636
  ) {
    return;
  } else if (is401 && !localToken) {
    return;
  } else if (downApis.size > 0 && is401) {
    return;
  } else if (is401) {
    return;
  }

  return config;
});
axios.interceptors.response.use(
  (response) => {
    resolvedApis.set(response.config.url, response.config);
    return response;
  },
  async (error) => {
    if (error.config?.url) {
      downApis.set(error.config?.url, error.config);
    }
    if (error.response.status === 401 && !localToken) {
      is401 = true;
      await refreshToken().then((res) => {
        if (res) {
          Array.from(downApis, ([key, value]) => {
            return value;
          }).forEach((api) => {
            if (!resolvedApis.has(api.url)) {
              const ActionName = enumsActions.find(
                (el) => enums.Actions[el] === api.url
              );
              api.headers.Authorization = `Bearer ${
                localToken ||
                store.state.AuthModule.token ||
                localStorage.getItem("token˝")
              }`;

              if (ActionName && ActionName === "USER") {
                store.dispatch("AUTH_REQUESTS");
              } else if (api.method !== "get") {
                axios(api);
              }
            }
          });
        }
      });
    }
    return Promise.reject(error);
  }
);
const refreshToken = async function () {
  try {
    const info = {
      token: localStorage.getItem("refreshToken"),
      deviceId: localStorage.getItem("deviceId"),
    };

    return await axios
      .post("/Autentication/refresh-token", info)
      .then((res) => {
        const { data } = res;
        if (!data.succeeded) {
          store.commit(Mutations.PURGE_AUTH);
          location.reload();
          return false;
        } else {
          if (!localToken) localToken = data.data.token;
          store.commit("SET_TOKEN", data.data.token);
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("refreshToken", data.data.refreshToken);
          store.commit("RERENDER_APP", { value: true, source: "auth" });
          is401 = false;
          return true;
        }
      });
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default ApiService;
