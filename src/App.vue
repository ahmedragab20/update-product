<template>
  <router-view />
</template>

<script lang="ts">
  import { defineComponent, nextTick, onMounted } from "vue";
  import { useStore } from "vuex";
  import { Mutations, Actions } from "@/store/enums/StoreEnums";
  import { useI18n } from "vue-i18n";
  import { initializeComponents } from "@/core/plugins/keenthemes";

  export default defineComponent({
    name: "app",
    setup() {
      const store = useStore();
      const i18n = useI18n();
      i18n.locale.value = localStorage.getItem("lang")
        ? (localStorage.getItem("lang") as string)
        : "en";

      onMounted(() => {
        /**
         * this is to override the layout config using saved data from localStorage
         * remove this to use config only from static config (@/core/config/DefaultLayoutConfig.ts)
         */
        store.commit(Mutations.OVERRIDE_LAYOUT_CONFIG);

        nextTick(() => {
          initializeComponents();
        });
      });
    },
  });
</script>

<style lang="scss">
  @import "~bootstrap-icons/font/bootstrap-icons.css";
  @import "~apexcharts/dist/apexcharts.css";
  @import "~quill/dist/quill.snow.css";
  @import "~animate.css";
  @import "~sweetalert2/dist/sweetalert2.css";
  @import "~nouislider/distribute/nouislider.css";
  @import "~@fortawesome/fontawesome-free/css/all.min.css";
  @import "~socicon/css/socicon.css";
  @import "~line-awesome/dist/line-awesome/css/line-awesome.css";
  @import "~dropzone/dist/dropzone.css";
  @import "~@vueform/multiselect/themes/default.css";
  @import "~prism-themes/themes/prism-shades-of-purple.css";
  @import "~element-plus/dist/index.css";

  // Main demo style scss
  @import "./assets/sass/plugins.scss";
  @import "./assets/sass/style.scss";

  html,
  body {
    scrollbar-color: rgb(161, 161, 161) transparent;
    scrollbar-width: thin;
  }

  body::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: transparent;
    border-radius: 8px;
  }

  body::-webkit-scrollbar-thumb {
    background: rgb(161, 161, 161);
    border-radius: 8px;
  }
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0 !important;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield !important;
  }
</style>
