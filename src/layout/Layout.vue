<template>
  <KTLoader v-if="loaderEnabled" :logo="loaderLogo" />
  <Header />
  <!-- begin:: Body -->
  <div class="row">
    <!-- begin:: Aside Left -->
    <aside class="d-none d-xl-block col-xl-2 position-relative">
      <Aside />
    </aside>
    <main class="col-xl-10">
      <div class="container-fluid pt-10vh">
        <!-- begin:: Content Body -->
        <router-view />
        <!-- end:: Content Body -->
      </div>
    </main>
    <KTFooter />
  </div>
  <!-- end:: Body -->
  <KTScrollTop />
  <KTMessengerDrawer />
  <KTUserMenu />
  <KTCreateApp />
  <KTInviteFriendsModal />
  <KTUpgradePlanModal />

  <KTToolbarButtons />
  <KTDemosDrawer />
  <KTHelpDrawer />
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch, nextTick } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import KTAside from "@/layout/aside/Aside.vue";
import KTHeader from "@/layout/header/Header.vue";
import KTFooter from "@/layout/footer/Footer.vue";
import HtmlClass from "@/core/services/LayoutService";
import KTScrollTop from "@/layout/extras/ScrollTop.vue";
import KTUserMenu from "@/layout/header/partials/ActivityDrawer.vue";
import KTLoader from "@/components/Loader.vue";
import KTCreateApp from "@/components/modals/wizards/CreateAppModal.vue";
import KTInviteFriendsModal from "@/components/modals/general/InviteFriendsModal.vue";
import KTUpgradePlanModal from "@/components/modals/general/UpgradePlanModal.vue";
import KTToolbarButtons from "@/layout/extras/ToolbarButtons.vue";
import KTDemosDrawer from "@/layout/extras/DemosDrawer.vue";
import KTHelpDrawer from "@/layout/extras/HelpDrawer.vue";
import KTMessengerDrawer from "@/layout/extras/MessengerDrawer.vue";
import { Actions } from "@/store/enums/StoreEnums";
import { MenuComponent } from "@/assets/ts/components";
import { reinitializeComponents } from "@/core/plugins/keenthemes";
import { removeModalBackdrop } from "@/core/helpers/dom";
import {
  toolbarDisplay,
  loaderEnabled,
  contentWidthFluid,
  loaderLogo,
  asideEnabled,
  subheaderDisplay,
  themeLightLogo,
  themeDarkLogo,
} from "@/core/helpers/config";
import Aside from "@/components/App/Aside.vue";
import Header from "@/components/App/Header.vue";

export default defineComponent({
  name: "master-layout",
  components: {
    Header,
    Aside,
    KTAside,
    KTHeader,
    KTFooter,
    KTScrollTop,
    KTCreateApp,
    KTInviteFriendsModal,
    KTUpgradePlanModal,
    KTUserMenu,
    KTToolbarButtons,
    KTDemosDrawer,
    KTHelpDrawer,
    KTMessengerDrawer,
    KTLoader,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    // show page loading
    store.dispatch(Actions.ADD_BODY_CLASSNAME, "page-loading");

    // initialize html element classes
    HtmlClass.init();

    const pageTitle = computed(() => {
      return store.getters.pageTitle;
    });

    const breadcrumbs = computed(() => {
      return store.getters.pageBreadcrumbPath;
    });

    onMounted(() => {
      //check if current user is authenticated
      if (!store.getters.isUserAuthenticated) {
        // router.push({ name: "sign-in" });
      }

      nextTick(() => {
        reinitializeComponents();
      });

      // Simulate the delay page loading
      setTimeout(() => {
        // Remove page loader after some time
        store.dispatch(Actions.REMOVE_BODY_CLASSNAME, "page-loading");
      }, 500);
    });

    watch(
      () => route.path,
      () => {
        MenuComponent.hideDropdowns(undefined);

        // check if current user is authenticated
        if (!store.getters.isUserAuthenticated) {
          // router.push({ name: "sign-in" });
        }

        nextTick(() => {
          reinitializeComponents();
        });
        removeModalBackdrop();
      }
    );

    return {
      toolbarDisplay,
      loaderEnabled,
      contentWidthFluid,
      loaderLogo,
      asideEnabled,
      subheaderDisplay,
      pageTitle,
      breadcrumbs,
      themeLightLogo,
      themeDarkLogo,
    };
  },
});
</script>
