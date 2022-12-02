import { RouteRecordRaw } from "vue-router";
export const OrderRoutes: Array<RouteRecordRaw> = [
  {
    path: "/order",
    name: "order",
    component: () => import("@/views/order/pages/index.vue"),
  },
  {
    path: "/order/update-order/:id",
    name: "update-order",
    props: true,
    component: () => import("@/views/order/pages/EditOrderAction.vue"),
  },
  {
    path: "/order/add-order-action",
    component: () => import("@/views/order/pages/AddOrderAction.vue"),
  },
];
