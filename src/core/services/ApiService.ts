import { useCookies } from "@vueuse/integrations/useCookies";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { App } from "vue";
import VueAxios from "vue-axios";
import { useStore } from "vuex";
const cookies = useCookies(["token"]);
const store = useStore();

/**
 * @description service to call HTTP request via Axios
 */

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
    ApiService.vueInstance.axios.defaults.headers.common["Accept"] =
      "application/json";
    /** JETORDER APP ID  */
    ApiService.vueInstance.axios.defaults.headers.common[
      "x-applicationid"
    ] = `Jet Order App API N/A`;
    /** APP LANGUAGE */
    ApiService.vueInstance.axios.defaults.headers.common[
      "x-language"
    ] = `en-us`;

    ApiService.vueInstance.axios.defaults.headers.common["x-countryid"] = 1;
    ApiService.vueInstance.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${cookies.get("token") || ""}`;
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

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status == 401) {
      try {
        const info = {
          token: cookies?.get<string>("refreshToken"),
          deviceId: cookies?.get<string>("deviceId"),
        };
        if (cookies?.get<string>("refreshToken").length > 0) {
          await axios.post("/Autentication/refresh-token", info).then((res) => {
            const { data } = res;
            if (data.succeeded) {
              cookies.set("token", data.token);
              window.location.href = "/";
            } else {
              cookies.remove("token");
              cookies.remove("isMarketActive");
              window.location.href = "/sign-in";
            }
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Session Expired",
          text: "You have to login again",
          icon: "error",
          buttonsStyling: false,
          allowOutsideClick: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        }).then(() => {
          cookies.remove("token");
          window.location.href = "/sign-in";
        });
      }
    }
    return Promise.reject(error);
  }
);

export default ApiService;
