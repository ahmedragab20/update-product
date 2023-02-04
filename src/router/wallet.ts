import { RouteRecordRaw } from "vue-router";
export const WalletRoutes: Array<RouteRecordRaw> = [
  {
    path: "/wallet",
    name: "wallet",
    component: () => import("@/views/wallet/pages/index.vue"),
  },
  {
    path: "/wallet/wallet-details/:id/:shopId",
    name: "wallet-details",
    props: true,
    component: () => import("@/views/wallet/pages/details.vue"),
  },
];
