import { RouteRecordRaw } from "vue-router";
export const AccountsRoutes: Array<RouteRecordRaw> = [
  {
    path: "accounts",
    component: () => import("@/views/Account/index.vue"),
  },
];
