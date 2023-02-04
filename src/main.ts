// import Api from "@/utils/ApiHelper";
import startupCalls from "@/api/startupCalls";
import { initApexCharts } from "@/core/plugins/apexcharts";
import i18n from "@/core/plugins/i18n";
import { initInlineSvg } from "@/core/plugins/inline-svg";
import "@/core/plugins/prismjs";
import { initVeeValidate } from "@/core/plugins/vee-validate";
//imports for app initialization
import ApiService from "@/core/services/ApiService";
import VueGoogleMaps from "@fawmi/vue-google-maps";
import "bootstrap";
import ElementPlus from "element-plus";
import { createApp } from "vue";
import Tabs from "vue3-tabs";
import App from "./App.vue";
import "./assets/sass/plugins.scss";
import "./assets/sass/style.scss";
/*
TIP: To get started with clean router change path to @/router/clean.ts.
*/
import router from "./router";
import store from "./store";

const state = store?.state;

const app = createApp(App);
ApiService.init(app);
initApexCharts(app);
initInlineSvg(app);
initVeeValidate();

app
  .use(store)
  .use(router)
  .use(ElementPlus, null)
  .use(i18n)
  .use(startupCalls)
  .use(VueGoogleMaps, {
    load: {
      key: "AIzaSyDHRei4VNBBM-5yB-3Iu5MFT-ZNCy1fUXY",
      // language: "ar",
    },
    autobindAllEvents: true,
  })
  .use(Tabs);

  app.mount("#app");
