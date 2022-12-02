<template>
  <div
    v-if="asideSecondaryDisplay"
    class="aside-secondary d-flex flex-row-fluid"
  >
    <div class="aside-workspace my-5 p-5" id="kt_aside_wordspace">
      <div class="d-flex h-100 flex-column">
        <div
          class="flex-column-fluid hover-scroll-y"
          data-kt-scroll="true"
          data-kt-scroll-activate="true"
          data-kt-scroll-height="auto"
          data-kt-scroll-wrappers="#kt_aside_wordspace"
          data-kt-scroll-dependencies="#kt_aside_secondary_footer"
          data-kt-scroll-offset="0px"
        >
          <div class="tab-content">
            <div
              class="tab-pane fade active show"
              id="dashboard"
              role="tabpanel"
            >
              <AsideMenu :items="dashboardItems" :title="`dashboard`" />
            </div>
            <div class="tab-pane fade" id="market" role="tabpanel">
              <AsideMenu :items="marketItems" :title="`market`" />
            </div>
            <div class="tab-pane fade" id="products" role="tabpanel">
              <AsideMenu :items="productsItems" :title="`products`" />
            </div>

            <div class="tab-pane fade" id="order" role="tabpanel">
              <AsideMenu :items="orderItems" :title="`Setting`" />
            </div>
            <div class="tab-pane fade" id="wallet" role="tabpanel">
              <AsideMenu :items="walletItems" :title="`wallet`" />
            </div>
            <div class="tab-pane fade" id="loyalty" role="tabpanel">
              <AsideMenu :items="loyaltyItems" :title="`loyalty`" />
            </div>
            <div
              class="tab-pane fade"
              id="kt_aside_nav_tab_menu"
              role="tabpanel"
            >
              <KTMenu></KTMenu>
            </div>
          </div>
        </div>

        <div class="flex-column-auto pt-10 px-5" id="kt_aside_secondary_footer">
          <a
            href="https://preview.keenthemes.com/metronic8/vue/docs/#/doc-overview"
            class="btn btn-bg-light btn-color-gray-600 btn-flex btn-active-color-primary flex-center w-100"
            data-bs-toggle="tooltip"
            data-bs-custom-class="tooltip-dark"
            data-bs-trigger="hover"
            data-bs-offset="0,5"
            data-bs-dismiss-="click"
          >
            <span class="btn-label">{{ t("docsAndComponents") }}</span>
            <span class="svg-icon btn-icon svg-icon-4 ms-2">
              <inline-svg src="/media/icons/duotune/general/gen005.svg" />
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>

  <button
    v-if="asideSecondaryDisplay && minimizationEnabled"
    :class="{ active: minimizedAsideSecondary }"
    class="btn btn-sm btn-icon btn-white btn-active-primary position-absolute translate-middle start-100 end-0 bottom-0 shadow-sm d-none d-lg-flex"
    data-kt-toggle="true"
    data-kt-toggle-state="active"
    data-kt-toggle-target="body"
    data-kt-toggle-name="aside-minimize"
    style="margin-bottom: 1.35rem"
  >
    <span class="svg-icon svg-icon-2 rotate-180">
      <inline-svg src="/media/icons/duotune/arrows/arr063.svg" />
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n/index";
import KTMenu from "@/layout/aside/Menu.vue";
import AsideMenu from "@/layout/aside/AsideMenu.vue";
import Dropdown1 from "@/components/dropdown/Dropdown1.vue";
import KTTasksOverview from "@/layout/aside/tabs/TasksOverview.vue";
import KTAuthors from "@/layout/aside/tabs/Authors.vue";
import KTNotifications from "@/layout/aside/tabs/Notifications.vue";
import {
  minimizedAsideSecondary,
  asideSecondaryDisplay,
  minimizationEnabled,
} from "@/core/helpers/config";
import { getIllustrationsPath } from "@/core/helpers/assets";

export default defineComponent({
  name: "kt-aside-secondary",
  components: {
    KTMenu,
    AsideMenu,
    Dropdown1,
    KTTasksOverview,
    KTAuthors,
    KTNotifications,
  },
  setup() {
    const { t } = useI18n();
    const dashboardItems = ref([
      {
        name: "sales",
        link: "/dashboard/sales",
        icon: "bi-cart",
      },
      {
        name: "clients",
        link: "/dashboard/clients",
        icon: "bi-people",
      },
    ]);

    const marketItems = ref([
      {
        name: "settings",
        link: "/crafted/account/overview",
        icon: "bi-gear",
      },
      {
        name: "shops",
        link: "/market/shops",
        icon: "bi-building",
      },
    ]);
    const orderItems = ref([
      {
        name: "order",
        link: "/order",
        icon: "bi-bricks",
      },
    ]);
    const walletItems = ref([
      {
        name: "wallet",
        link: "/wallet",
        icon: "bi-bricks",
      },
      {
        name: "accounts",
        link: "/accounts",
        icon: "bi-bricks",
      },
    ]);
    const productsItems = ref([
      {
        name: "list",
        link: "/products/list",
        icon: "bi-view-list",
      },
      {
        name: "categories",
        link: "/products/categories",
        icon: "bi-radioactive",
      },
      {
        name: "labels",
        link: "/products/labels",
        icon: "bi-card-heading",
      },
      {
        name: "tags",
        link: "/products/tags",
        icon: "bi-tags",
      },
      {
        name: "brands",
        link: "/products/brands",
        icon: "bi-bricks",
      },
      {
        name: "modifiers",
        link: "/products/modifier",
        icon: "bi-pencil-square",
      },
    ]);

    const loyaltyItems = ref([
      {
        name: "Abandoned Carts",
        sectionTitle: "Abandoned Carts",
        link: "/loyalty/abandoned-carts",
        icon: "bi-gear",
        sub: [
          {
            heading: "Abandoned Carts",
            route: "/loyalty/abandoned-carts",
          },
          {
            heading: "Abandoned Carts Offers",
            route: "/loyalty/abandoned-carts/offers",
          },
        ],
      },
      {
        name: "Product Wishlists",
        sectionTitle: "",
        link: "/loyalty/product-wishlists",
        icon: "bi-bookmark-heart",
        sub: [
          {
            heading: "Product Wishlists",
            route: "/loyalty/product-wishlists",
          },
        ],
      },
      {
        name: "Point System",
        sectionTitle: "",
        link: "/loyalty/point-system",
        icon: "bi-gear",
        sub: [
          {
            heading: "Point System",
            route: "/loyalty/point-system",
          },
        ],
      },
    ]);
    return {
      minimizedAsideSecondary,
      asideSecondaryDisplay,
      minimizationEnabled,
      getIllustrationsPath,
      t,
      dashboardItems,
      productsItems,
      marketItems,
      loyaltyItems,
      orderItems,
      walletItems,
    };
  },
});
</script>
