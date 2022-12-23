import Dummy from "@/views/dummy/index.vue";
import { useCookies } from "@vueuse/integrations/useCookies";
import { createRouter, createWebHistory, RouteRecordRaw,RouterView } from "vue-router";
import { h } from 'vue';
import { Products } from "./products";
import { LoyaltyRoutes } from './loyalty'
import {OrderRoutes} from './order'
import { AccountsRoutes } from "./accounts"
import {Shops} from "./shops"
import {WalletRoutes} from './wallet'
const cookies = useCookies(["token"]);

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layout/Layout.vue"),
    children: [
      {
        path: "/dashboard/clients-group",
        name: "clients-group",
        component: () =>
          import("@/views/clients/clients-group/pages/index.vue"),
      },
     
      {
        path: "/dashboard/clients",
        name: "clients",
        component: () =>
          import("@/views/clients/clients/pages/index.vue"),
      },
      {
        path: "/clients/client-details/:id",
        name: "client-details",
        props: true,
        component: () =>
          import("@/views/clients/clients/pages/client-details-page.vue"),
      },
      {
        path: "/dashboard/clients",
        name: "clients",
        component: () =>
          import("@/views/clients/clients/pages/index.vue"),
      },
      {
        path: "/products",
        component: () =>
          import("@/views/products/product-modifier/pages/index.vue"),
        children: Products,
      },

      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: { requireAuth: true },
      },

      {
        path: "/products",
        component: () => import("@/views/products/index.vue"),
        children: Products,
      },

      {
        path: "/loyalty",
        name: "Loyalty",
        component: { render: () => h(RouterView) },
        children: LoyaltyRoutes,
        meta: { requireAuth: true },
      },
      {
        path: "",
        name: "accounts",
        component: { render: () => h(RouterView) },
        children: AccountsRoutes,
        meta: { requireAuth: true },
      },
      {
        path: "/wallet",
        name: "wallet",
        component: { render: () => h(RouterView) },
        children: WalletRoutes,
        meta: { requireAuth: true },
      },
      {
        path: "/order",
        name: "order",
        component: { render: () => h(RouterView) },
        children: OrderRoutes,
        meta: { requireAuth: true },
      },

      {
        path: "/builder",
        name: "builder",
        component: () => import("@/views/Builder.vue"),
      },
      {
        path: "/shops",
        name: "shops",
        component: { render: () => h(RouterView) },
        children: Shops,
        meta: { requireAuth: true },
      },
      // {
      //   path: "/market/shops",
      //   name: "shops",
      //   component: () => import("@/views/shops/index.vue"),
      //   children: Shops,
      // },
      {
        path: "/crafted/pages/profile",
        name: "profile",
        component: () => import("@/components/page-layouts/Profile.vue"),
        children: [
          {
            path: "overview",
            name: "profile-overview",
            component: () =>
              import("@/views/crafted/pages/profile/Overview.vue"),
          },
          {
            path: "projects",
            name: "profile-projects",
            component: () =>
              import("@/views/crafted/pages/profile/Projects.vue"),
          },
          {
            path: "campaigns",
            name: "profile-campaigns",
            component: () =>
              import("@/views/crafted/pages/profile/Campaigns.vue"),
          },
          {
            path: "documents",
            name: "profile-documents",
            component: () =>
              import("@/views/crafted/pages/profile/Documents.vue"),
          },
          {
            path: "connections",
            name: "profile-connections",
            component: () =>
              import("@/views/crafted/pages/profile/Connections.vue"),
          },
          {
            path: "activity",
            name: "profile-activity",
            component: () =>
              import("@/views/crafted/pages/profile/Activity.vue"),
          },
        ],
      },
      {
        path: "/crafted/pages/wizards/horizontal",
        name: "horizontal-wizard",
        component: () => import("@/views/crafted/pages/wizards/Horizontal.vue"),
      },
      {
        path: "/crafted/pages/wizards/vertical",
        name: "vertical-wizard",
        component: () => import("@/views/crafted/pages/wizards/Vertical.vue"),
      },
      {
        path: "/crafted/account",
        name: "account",
        component: () => import("@/views/crafted/account/Account.vue"),
        children: [
          {
            path: "overview",
            name: "account-overview",
            component: () => import("@/views/crafted/account/Overview.vue"),
          },
          {
            path: "settings",
            name: "account-settings",
            component: () => import("@/views/crafted/account/Settings.vue"),
          },
        ],
      },
      {
        path: "/apps/ecommerce/catalog/edit-product",
        name: "apps-ecommerce-catalog-edit-product",
        component: () =>
          import("@/views/apps/e-commerce/EditProduct/index.vue"),
      },
      {
        path: "/apps/ecommerce/catalog/listing-products",
        name: "apps-ecommerce-catalog-listing-products",
        component: () =>
          import("@/views/apps/e-commerce/ListingProducts/index.vue"),
      },
      {
        path: "/apps/customers/getting-started",
        name: "apps-customers-getting-started",
        component: () => import("@/views/apps/customers/GettingStarted.vue"),
      },
      {
        path: "/apps/customers/customers-listing",
        name: "apps-customers-listing",
        component: () => import("@/views/apps/customers/CustomersListing.vue"),
      },
      {
        path: "/apps/customers/customer-details",
        name: "apps-customers-details",
        component: () => import("@/views/apps/customers/CustomerDetails.vue"),
      },
      {
        path: "/apps/subscriptions/getting-started",
        name: "apps-subscriptions-getting-started",
        component: () =>
          import("@/views/apps/subscriptions/GettingStarted.vue"),
      },
      {
        path: "/apps/subscriptions/subscription-list",
        name: "apps-subscriptions-subscription-list",
        component: () =>
          import("@/views/apps/subscriptions/SubscriptionList.vue"),
      },
      {
        path: "/apps/subscriptions/add-subscription",
        name: "apps-subscriptions-add-subscription",
        component: () =>
          import("@/views/apps/subscriptions/AddSubscription.vue"),
      },
      {
        path: "/apps/subscriptions/view-subscription",
        name: "apps-subscriptions-view-subscription",
        component: () =>
          import("@/views/apps/subscriptions/ViewSubscription.vue"),
      },
      {
        path: "/apps/calendar",
        name: "apps-calendar",
        component: () => import("@/views/apps/Calendar.vue"),
      },
      {
        path: "/apps/chat/private-chat",
        name: "apps-private-chat",
        component: () => import("@/views/apps/chat/Chat.vue"),
      },
      {
        path: "/apps/chat/group-chat",
        name: "apps-group-chat",
        component: () => import("@/views/apps/chat/Chat.vue"),
      },
      {
        path: "/apps/chat/drawer-chat",
        name: "apps-drawer-chat",
        component: () => import("@/views/apps/chat/DrawerChat.vue"),
      },
      {
        path: "/crafted/modals/general/invite-friends",
        name: "modals-general-invite-friends",
        component: () =>
          import("@/views/crafted/modals/general/InviteFriends.vue"),
      },
      {
        path: "/crafted/modals/general/view-user",
        name: "modals-general-view-user",
        component: () => import("@/views/crafted/modals/general/ViewUsers.vue"),
      },
      {
        path: "/crafted/modals/general/upgrade-plan",
        name: "modals-general-upgrade-plan",
        component: () =>
          import("@/views/crafted/modals/general/UpgradePlan.vue"),
      },
      {
        path: "/crafted/modals/general/share-and-earn",
        name: "modals-general-share-and-earn",
        component: () =>
          import("@/views/crafted/modals/general/ShareAndEarn.vue"),
      },
      {
        path: "/crafted/modals/forms/new-target",
        name: "modals-forms-new-target",
        component: () => import("@/views/crafted/modals/forms/NewTarget.vue"),
      },
      {
        path: "/crafted/modals/forms/new-card",
        name: "modals-forms-new-card",
        component: () => import("@/views/crafted/modals/forms/NewCard.vue"),
      },
      {
        path: "/crafted/modals/forms/new-address",
        name: "modals-forms-new-address",
        component: () => import("@/views/crafted/modals/forms/NewAddress.vue"),
      },
      {
        path: "/crafted/modals/forms/create-api-key",
        name: "modals-forms-create-api-key",
        component: () =>
          import("@/views/crafted/modals/forms/CreateApiKey.vue"),
      },
      {
        path: "/crafted/modals/wizards/two-factor-auth",
        name: "modals-wizards-two-factor-auth",
        component: () =>
          import("@/views/crafted/modals/wizards/TwoFactorAuth.vue"),
      },
      {
        path: "/crafted/modals/wizards/create-app",
        name: "modals-wizards-create-app",
        component: () => import("@/views/crafted/modals/wizards/CreateApp.vue"),
      },
      {
        path: "/crafted/modals/wizards/create-account",
        name: "modals-wizards-create-account",
        component: () =>
          import("@/views/crafted/modals/wizards/CreateAccount.vue"),
      },
      {
        path: "/crafted/widgets/lists",
        name: "widgets-list",
        component: () => import("@/views/crafted/widgets/Lists.vue"),
      },
      {
        path: "/crafted/widgets/statistics",
        name: "widgets-statistics",
        component: () => import("@/views/crafted/widgets/Statistics.vue"),
      },
      {
        path: "/crafted/widgets/charts",
        name: "widgets-charts",
        component: () => import("@/views/crafted/widgets/Charts.vue"),
      },
      {
        path: "/crafted/widgets/mixed",
        name: "widgets-mixed",
        component: () => import("@/views/crafted/widgets/Mixed.vue"),
      },
      {
        path: "/crafted/widgets/tables",
        name: "widgets-tables",
        component: () => import("@/views/crafted/widgets/Tables.vue"),
      },
      {
        path: "/crafted/widgets/feeds",
        name: "widgets-feeds",
        component: () => import("@/views/crafted/widgets/Feeds.vue"),
      },
    ],
  },
  
  {
    path: "/",
    component: () => import("@/components/page-layouts/Auth.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
      },
      {
        path: "/password-reset",
        name: "password-reset",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
      },
    ],
  },

  {
    path: "/dummy",
    name: "dummy",
    component: () => Dummy,
  },
  {
    path: "/setup",
    name: "setup",
    component: () => import("@/views/crafted/authentication/Setup.vue"),
  },
  {
    // the 404 route, when none of the above matches
    path: "/404",
    name: "404",
    component: () => import("@/views/crafted/authentication/Error404.vue"),
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/views/crafted/authentication/Error500.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  // const isLoggedIn = cookies.get<string>("token");
  // let isMarketActive;
  // setTimeout(async () => {
  //   const store = await import("@/store"); // get data from store
  //   if (store.default.state.ResponseHeaders["x-is-market-active"] === "False") {
  //     isMarketActive = false;
  //   } else {
  //     isMarketActive = true;
  //   }
  // });
  // if (
  //   (to.name === "sign-in" ||
  //     to.name === "sign-up" ||
  //     (to.name === "setup" && isMarketActive)) &&
  //   isLoggedIn
  // )
  //   return "/";
  //
  // if (to.name !== "sign-in" && to.name !== "sign-up" && !isLoggedIn)
  //   return { name: "sign-in" };
  //
  // if (to.name !== "setup" && !isMarketActive && isLoggedIn)
  //   return { name: "setup" };
  const isLoggedIn = cookies.get<string>("token");
  let isMarketActive =true;
  // setTimeout(async () => {
  //   const store = await import("@/store"); // get data from store
  //   if (store.default.state.ResponseHeaders["x-is-market-active"] === "False") {
  //     isMarketActive = false;
  //   } else {
  //     isMarketActive = true;
  //   }
  // });
  if (
    (to.name === "sign-in" ||
      to.name === "sign-up" ||
      (to.name === "setup" && isMarketActive)) &&
    isLoggedIn
  )
    return "/";

  if (to.name !== "sign-in" && to.name !== "sign-up" && !isLoggedIn)
    return { name: "sign-in" };

  if (to.name !== "setup" && !isMarketActive && isLoggedIn)
    return { name: "setup" };
});

export default router;
