<template>
  <!--begin::Navbar-->
  <div class="card mb-5 mb-xl-10">
    <div class="card-body pt-9 pb-0">
      <!--begin::Details-->

      <div class="d-flex flex-wrap flex-sm-nowrap mb-3">
        <!--begin: Pic-->

        <div class="me-7 mb-4">
          <div
            class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative"
          >
            <img :src="shopData.logoPath" alt="image" />
            <div
              class="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px"
            ></div>
          </div>
        </div>
        <!--end::Pic-->

        <!--begin::Info-->
        <div class="flex-grow-1">
          <!--begin::Title-->
          <div
            class="d-flex justify-content-between align-items-start flex-wrap mb-2"
          >
            <!--begin::User-->
            <div class="d-flex flex-column">
              <!--begin::Name-->
              <div class="d-flex align-items-center mb-2">
                <a href="#">
                  <span class="svg-icon svg-icon-1 svg-icon-primary">
                    <inline-svg src="/media/icons/duotune/general/gen026.svg" />
                  </span>
                </a>

                <a @click="contactUsPopup" role="button">
                  <span
                    class="btn btn-sm btn-light-success fw-bolder ms-2 fs-8 py-1 px-3"
                    v-if="shopData?.isAvailableOnJetOrder"
                  >
                    {{ $t("isAvailableOnJetOrder") }}
                  </span>
                  <span
                    class="btn btn-sm btn-light-danger fw-bolder ms-2 fs-8 py-1 px-3"
                    v-else
                  >
                    {{ $t("isAvailableOnJetOrder") }}
                  </span>
                </a>
              </div>
            </div>
          </div>
          <!--end::Title-->

          <!--begin::Stats-->
          <div class="d-flex flex-wrap flex-stack">
            <!--begin::Wrapper-->
            <div class="d-flex flex-column flex-grow-1 pe-8">
              <!--begin::Stats-->
              <div class="d-flex flex-wrap">
                <!--begin::Stat-->
                <div
                  class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3"
                >
                  <!--begin::Number-->
                  <div class="d-flex align-items-center">
                    <span class="svg-icon svg-icon-success me-2">
                      <inline-svg
                        src="/media/icons/duotune/arrows/arr066.svg"
                      />
                    </span>
                    <div
                      class="fs-2 fw-bolder"
                      data-kt-countup="true"
                      data-kt-countup-value="4500"
                      data-kt-countup-prefix="$"
                    >
                      4500$
                    </div>
                  </div>
                  <!--end::Number-->

                  <!--begin::Label-->
                  <div class="fw-bold fs-6 text-gray-400">
                    {{ $t("earnings") }}
                  </div>
                  <!--end::Label-->
                </div>
                <!--end::Stat-->

                <!--begin::Stat-->
                <div
                  class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3"
                >
                  <!--begin::Number-->
                  <div class="d-flex align-items-center">
                    <span class="svg-icon svg-icon-3 svg-icon-danger me-2">
                      <inline-svg
                        src="/media/icons/duotune/arrows/arr065.svg"
                      />
                    </span>
                    <div
                      class="fs-2 fw-bolder"
                      data-kt-countup="true"
                      data-kt-countup-value="75"
                    >
                      75
                    </div>
                  </div>
                  <!--end::Number-->

                  <!--begin::Label-->
                  <div class="fw-bold fs-6 text-gray-400">
                    {{ $t("projects") }}
                  </div>
                  <!--end::Label-->
                </div>
                <!--end::Stat-->

                <!--begin::Stat-->
                <div
                  class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3"
                >
                  <!--begin::Number-->
                  <div class="d-flex align-items-center">
                    <span class="svg-icon svg-icon-3 svg-icon-success me-2">
                      <inline-svg
                        src="/media/icons/duotune/arrows/arr066.svg"
                      />
                    </span>
                    <div
                      class="fs-2 fw-bolder"
                      data-kt-countup="true"
                      data-kt-countup-value="60"
                      data-kt-countup-prefix="%"
                    >
                      60%
                    </div>
                  </div>
                  <!--end::Number-->

                  <!--begin::Label-->
                  <div class="fw-bold fs-6 text-gray-400">
                    {{ $t("successRate") }}
                  </div>
                  <!--end::Label-->
                </div>
                <!--end::Stat-->
              </div>
              <!--end::Stats-->
            </div>
            <!--end::Wrapper-->
          </div>
          <!--end::Stats-->
        </div>
        <!--end::Info-->
      </div>
      <!--end::Details-->

      <!--begin::Navs-->
      <div class="d-flex overflow-auto h-55px">
        <ul
          class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap"
        >
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              :to="`/shops/details/shops-base-setting/${shopData.id}`"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              {{ $t("shopSettings") }}
            </router-link>
          </li>
          <!--end::Nav item-->

          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              :to="`/shops/details/shop-order-setting/${shopData.id}`"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              {{ $t("orderSetting") }}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="`/shops/details/shop-delivery/${shopData.id}`"
              active-class="active"
              class="nav-link text-active-primary me-6"
            >
              {{ $t("deliverySetting") }}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="`/shops/details/shop-jetOrder-settings/${shopData.id}`"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              {{ $t("jetOrderSetting") }}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              active-class="active"
              :to="`/shops/details/shop-payment/${shopData.id}`"
              class="nav-link text-active-primary me-6"
            >
              {{ $t("shopPayment") }}
            </router-link>
          </li>
          <!--end::Nav item-->

          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              active-class="active"
              :to="`/shops/details/shop-categories/${shopData.id}`"
              class="nav-link text-active-primary me-6"
            >
              {{ $t("shopCategories") }}
            </router-link>
          </li>
          <!--end::Nav item-->
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              active-class="active"
              :to="`/shops/details/shop-users/${shopData.id}`"
              class="nav-link text-active-primary me-6"
            >
              {{ $t("shopUsers") }}
            </router-link>
          </li>
          <li class="nav-item">
            <span class="nav-link text-active-primary me-6">
              {{ $t("shopFinancial") }}
            </span>
          </li>
          <!--end::Nav item-->
        </ul>
      </div>
      <!--begin::Navs-->
    </div>
  </div>

  <!--end::Navbar-->

  <router-view v-slot="{ Component, route }">
    <ShopPayment
      v-if="route.name === 'shop-payment'"
      :countryId="shopData.countryId"
      :id="shopData.id"
    />
    <ShopDelivery
      v-if="route.name === 'shop-delivery'"
      :languages="shopData.languages"
      :id="shopData.id"
    />
    <router-view v-else>
      <component :is="Component" />
    </router-view>
  </router-view>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import store from "@/store";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { Actions } from "@/store/enums/StoreEnums";

import ShopPayment from "../components/ShopDetails/ShopPayment.vue";
import i18n from "@/core/plugins/i18n";
import ShopDelivery from "../components/ShopDetails/ShopDelivery.vue";
interface languagesType {
  language: string;

  name: string;
}
interface shopData {
  logoPath: string;
  isAvailableOnJetOrder: boolean;
  id: string;
  countryId: string;
  languages: Array<languagesType>;
}

const shopData = ref<shopData>({
  logoPath: "",
  isAvailableOnJetOrder: false,
  id: "",
  countryId: "",
  languages: [],
});
// contactUsPopup
const contactUsPopup = () => {
  Swal.fire({
    text: i18n.global.t("toUpdateOnJetOrder"),
    icon: "info",
    buttonsStyling: false,
    confirmButtonText: i18n.global.t("ok"),
    customClass: {
      confirmButton: "btn fw-bold btn-light-primary",
    },
  });
};
let props = defineProps({
  id: String,
});

// GET_SHOPS_BASE_SETTINGS
onMounted(() => {
  store.dispatch(Actions.GET_SHOPS_BASE_SETTINGS, props.id).then((data) => {
    console.log(data);
    shopData.value = data;
  });
  setCurrentPageBreadcrumbs("Shop", ["Deatils"]);
});
</script>
