import { RouteRecordRaw } from "vue-router";

export const Shops: Array<RouteRecordRaw> = [
  {
    path: "/shops",
    name: "Shops",
    component: () => import("@/views/shops/pages/index.vue"),
  },
  {
    path: "/shops/details/:id",
    name: "Shops-details",
    props: true,
    component: () => import("@/views/shops/pages/shop-details.vue"),
    children: [
            {
              path: "/shops/details/shops-base-setting/:id",
              name: "shop-basic",
              props: true,
              component: () => import("@/views/shops/components/ShopDetails/shopBaseSetting.vue"),
            },
            {
              path: "/shops/details/shop-delivery/:id",
              name: "shop-delivery",
              props: true,
              component: () => import("@/views/shops/components/ShopDetails/ShopDelivery.vue"),
            },
            {
              path: "/shops/details/shop-jetOrder-settings/:id",
              name: "shop-jetOrder-settings",
              props: true,
              component: () => import("@/views/shops/components/ShopDetails/ShopJetOrder.vue"),
            },
            {
              path: "/shops/details/shop-payment/:id",
              name: "shop-payment",
              props: true,
              component: () => import("@/views/shops/components/ShopDetails/ShopPayment.vue"),
            },
            {
              path: "/shops/details/shop-order-setting/:id",
              name: "shop-order",
              props: true,
              component: () => import("@/views/shops/components/ShopDetails/shopOrderSetting.vue"),
            },
            {
              path: "/shops/details/shop-categories/:id",
              name: "shop-categories",
              props: true,
              component: () => import("@/views/shops/components/ShopDetails/ShopCategories.vue"),
            },
            {
              path: "/shops/details/shop-users/:id",
              name: "shop-users",
              props: true,
              component: () => import("@/views/shops/components/ShopDetails/ShopUsers.vue"),
            },
            {
              path: "/shop-financial/:id",
              name: "shop-financial",
              props: true,
              component: () => import("@/views/shops/components/ShopDetails/ShopFinancial.vue"),
            },
           
    ]
  }
];


// export const ShopDetails: Array<RouteRecordRaw> = [
//   {
//     path: "",
//     name: "details",
//     component: () => import("@/views/market/shops/details/Details.vue"),
//     children: [
//       {
//         path: "basic",
//         name: "shop-basic",
//         component: () => import("@/views/shops/components/ShopDetails/shopBaseSetting.vue"),
//       },
//       // {
//       //   path: "order",
//       //   name: "shop-order",
//       //   component: () => import("@/views/shops/details/Order.vue"),
//       // },
//       // {
//       //   path: "delivery",
//       //   name: "shop-delivery",
//       //   component: () => import("@/views/shops/details/Delivery.vue"),
//       // },
//       // {
//       //   path: "jetorder",
//       //   name: "shop-jetorder",
//       //   component: () => import("@/views/shops/details/Jetorder.vue"),
//       // },
//       // {
//       //   path: "payment-options",
//       //   name: "shop-payment-options",
//       //   component: () => import("@/views/shops/details/PaymentOptions.vue"),
//       // },
//       // {
//       //   path: "financial-settings",
//       //   name: "shop-financial-settings",
//       //   component: () => import("@/views/shops/details/Financial.vue"),
//       // },
//       // {
//       //   path: "product-categories",
//       //   name: "shop-product-categories",
//       //   component: () => import("@/views/shops/details/ProductCategories.vue"),
//       // },
//     ],
//   },
// ];