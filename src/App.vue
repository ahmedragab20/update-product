<template>
  <div :key="componentKey">
    <template v-if="apiHeaders">
      <transition name="alert" appear>
        <div
          v-if="updatedDataAlert"
          class="position-fixed"
          style="top: 10px; right: 10px; z-index: 999"
        >
          <div
            class="alert alert-success d-flex align-items-center p-5 mb-10 shadow"
          >
            <span class="svg-icon svg-icon-2hx svg-icon-success me-4">
              <inline-svg src="/media/icons/duotune/general/gen048.svg" />
            </span>
            <div class="d-flex flex-column">
              <h4 class="mb-1 text-success">
                We refreshed the content of the page
              </h4>
              <span>
                It's a process we do to update your personal information for a
                better security service <br />
                and also to keep you logged-in without interruptions
              </span>
              <strong>if you got stuck then please reload the page.</strong>
            </div>
            <button
              type="button"
              class="position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto"
              data-bs-dismiss="alert"
            >
              <i class="bi bi-x fs-1 text-success"></i>
            </button>
          </div>
        </div>
      </transition>
      <router-view />
    </template>
    <template>
      <div class="text-center mt-5">Loading...</div>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted } from "vue";
import { useStore } from "vuex";
import { Mutations } from "@/store/enums/StoreEnums";
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

    const componentKey = computed<number>(
      () => store.state.AuthModule.componentKey
    );
    const updatedDataAlert = computed<boolean>(
      () => store.state.AuthModule.updatedDataAlert
    );
    const apiHeaders = computed(() => store.state.ResponseHeaders);

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

    return { componentKey, updatedDataAlert, apiHeaders };
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

html,
body {
  scrollbar-color: rgb(161, 161, 161) transparent;
  scrollbar-width: thin;
  overflow-x: hidden;
  padding-top: 8vh;
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

.rout-enter-from,
.rout-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.alert-enter-from,
.alert-leave-to {
  opacity: 0;
  transform: translateY(-250px);
}

.rout-enter-active,
.rout-leave-active,
.alert-enter-active,
.alert-leave-active {
  transition: all 0.3s ease-in-out;
}
</style>
