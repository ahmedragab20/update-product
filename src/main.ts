import startupCalls from "@/api/startupCalls";
import { initApexCharts } from "@/core/plugins/apexcharts";
import i18n from "@/core/plugins/i18n";
import { initInlineSvg } from "@/core/plugins/inline-svg";
import "@/core/plugins/prismjs";
import { initVeeValidate } from "@/core/plugins/vee-validate";
//imports for app initialization
import { createApp } from "vue";
import { installAos, AosOptions } from "maz-ui";
import ApiService from "@/core/services/ApiService";
import VueGoogleMaps from "@fawmi/vue-google-maps";
import "bootstrap";
import "maz-ui/css/main.css";
import "maz-ui/css/aos.css";
import ElementPlus from "element-plus";
import Tabs from "vue3-tabs";
import App from "./App.vue";
import "./assets/sass/plugins.scss";
import "./assets/sass/style.scss";
import router from "./router";
import store from "./store";
import { installToaster, ToasterOptions } from "maz-ui";
import {
  Chrome,
  Sketch,
  Compact,
  Grayscale,
  Material,
  Photoshop,
  Slider,
  Swatches,
  Twitter,
  create,
} from "@ckpack/vue-color";

const app = createApp(App);
ApiService.init(app);
initApexCharts(app);
initInlineSvg(app);
initVeeValidate();

const aosOptions: AosOptions = {
  router,
  animation: {
    duration: 1000,
    once: false,
  },
};

// DEFAULT OPTIONS
const toasterOptions: ToasterOptions = {
  position: "bottom-right",
  timeout: 10_000,
  persistent: false,
};

app
  .use(store)
  .use(router)
  .use(ElementPlus, null)
  .use(i18n)
  .use(startupCalls)
  .use(installAos, aosOptions)
  .use(VueGoogleMaps, {
    load: {
      key: "AIzaSyDHRei4VNBBM-5yB-3Iu5MFT-ZNCy1fUXY",
      // language: "ar",
    },
    autobindAllEvents: true,
  })
  .use(Tabs)
  .use(
    create({
      components: [
        Sketch,
        Chrome,
        Compact,
        Grayscale,
        Material,
        Photoshop,
        Slider,
        Swatches,
        Twitter,
      ],
    })
  )
  .use(installToaster, toasterOptions)
  .provide("mazIconPath", "/icons")
  .mount("#app");
