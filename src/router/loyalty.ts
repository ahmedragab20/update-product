import { RouteRecordRaw } from "vue-router";
export const LoyaltyRoutes: Array<RouteRecordRaw> = [
  {
    path: "abandoned-carts",
    component: () => import("@/views/loyalty/abandonedCarts/index.vue"),
    children: [
      {
        path: "",
        component: () =>
          import("@/views/loyalty/abandonedCarts/carts/index.vue"),
      },
      {
        path: "offers",
        component: () =>
          import("@/views/loyalty/abandonedCarts/offers/index.vue"),
      },
    ],
  },
  {
    path: "product-wishlists",
    component: () => import("@/views/loyalty/wishlist/index.vue"),
  },
  {
    path: "point-system",
    component: () =>
      import("@/views/loyalty/point/pointSystem/pages/index.vue"),
  },
];
