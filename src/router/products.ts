import { RouteRecordRaw } from "vue-router";

export const Products: Array<RouteRecordRaw> = [
  {
    path: "/products/modifier",
    name: "product-modifier",
    component: () =>
      import("@/views/products/product-modifier/pages/index.vue"),
  },
  {
    path: "/products/modifier/:id",
    name: "product-modifier-details",
    props: true,
    component: () =>
      import(
        "@/views/products/product-modifier/pages/product-modifiers-details.vue"
      ),
  },
  {
    path: "/products/categories",
    name: "product-categories",
    component: () =>
      import("@/views/products/product-categories/pages/index.vue"),
  },
  {
    path: "/products/brands",
    name: "product-brand",
    component: () => import("@/views/products/product-brands/pages/index.vue"),
  },
  {
    path: "/products/brands/:id",
    name: "product-brand-details",
    props: true,
    component: () =>
      import("@/views/products/product-brands/pages/brand-details-form.vue"),
  },

  {
    path: "/products/labels",
    name: "product-labels",
    component: () => import("@/views/products/product-labels/pages/index.vue"),
  },
  {
    path: "/products/labels/:id",
    name: "product-label-details",
    props: true,
    component: () =>
      import("@/views/products/product-labels/pages/label-details-form.vue"),
  },

  {
    path: "/products/tags",
    name: "product-tags",
    component: () => import("@/views/products/product-tags/pages/index.vue"),
  },
  {
    path: "/products/tags/:id",
    name: "tag-details-form",
    props: true,
    component: () =>
      import("@/views/products/product-tags/pages/tag-details-form.vue"),
  },
];
