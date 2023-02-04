<template>
  <div id="kt_content" class="content d-flex flex-column flex-column-fluid">
    <transition appear name="first_time_overlay">
      <div
        v-if="firstVisit"
        class="position-absolute top-0 start-0 w-100 h-100 blur"
        style="z-index: 99; background: rgba(0, 0, 0, 0.6)"
      ></div>
    </transition>
    <!--begin::Container-->
    <div id="kt_content_container" class="container-xxl">
      <!--begin::Form-->
      <form
        v-if="pageMounted"
        id="kt_ecommerce_add_product_form"
        class="form d-flex flex-column flex-lg-row"
        @submit.prevent
      >
        <div class="row">
          <!--begin::Aside column-->
          <div class="col-xl-4">
            <div class="d-flex flex-column gap-7 gap-lg-10 w-100 mb-7">
              <!--begin::Thumbnail settings-->
              <Thumbnail
                :thumbnail="product.thumbnailPath"
                :productId="product.id"
              />
              <!--end::Thumbnail settings-->
              <!-- Code -->
              <div
                class="card card-flush mb-4"
                :class="{
                  'gradient-border':
                    updateProductState.changedSections.includes('code'),
                }"
              >
                <div class="card-header pt-4">
                  <div class="card-title flex-column">
                    <h2>Code</h2>
                    <small>
                      it's optional but if you will add one. then it must be
                      unique
                    </small>
                  </div>
                </div>
                <div class="card-body">
                  <div class="mb-3">
                    <input
                      v-model="form.code"
                      class="form-control"
                      placeholder="unique code"
                      type="text"
                      @input="codeChanged = true"
                    />
                  </div>
                  <div v-if="codeErrorMessage" class="mb-3">
                    <span class="badge badge-sm badge-light-danger">
                      🙃 {{ codeErrorMessage }}
                    </span>
                  </div>
                  <SaveChangeBtn
                    :btnReverseSubmit="reverseCodeChanges"
                    :btnSubmit="saveCodeChange"
                    :elChanged="codeChanged"
                    :elLoading="codeLoading"
                    :payload="form.code"
                  />
                </div>
              </div>
              <!-- Slug -->
              <div
                class="card card-flush mb-4"
                :class="{
                  'gradient-border':
                    updateProductState.changedSections.includes('slug'),
                }"
              >
                <div class="card-header pt-4">
                  <div class="card-title flex-column">
                    <h2>Slug</h2>
                    <small>
                      it's optional but if you will add one. then it must be
                      unique
                    </small>
                  </div>
                </div>
                <div class="card-body">
                  <div class="mb-3">
                    <input
                      v-model="form.slug"
                      class="form-control"
                      placeholder="unique slug"
                      type="text"
                      @input="slugChanged = true"
                    />
                  </div>
                  <div v-if="slugErrorMessage" class="mb-3">
                    <span class="badge badge-sm badge-light-danger">
                      😕 {{ slugErrorMessage }}
                    </span>
                  </div>
                  <div>
                    <SaveChangeBtn
                      :btnReverseSubmit="reverseSlugChanges"
                      :btnSubmit="saveSlugChange"
                      :elChanged="slugChanged"
                      :elLoading="slugLoading"
                      :payload="form.slug"
                    />
                  </div>
                </div>
              </div>
              <!--begin::Category & tags-->
              <ProductDetails
                :product="product"
                :brands="brands"
                :categories="categories"
                :delivery-classes="deliveryClasses"
              />
              <!-- begin:: product types -->
              <ProductType :product="product" />
              <!-- end:: product types -->
            </div>
          </div>
          <!--end::Aside column-->
          <div class="col-xl-8">
            <!--begin::Main column-->
            <div class="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
              <div v-if="firstVisit" style="z-index: 100">
                <span
                  @click="setFirstLook"
                  class="badge badge-white white-shadow"
                  style="cursor: pointer"
                  >How to use?</span
                >
              </div>
              <!--begin:::Tabs-->
              <ul
                class="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-bold"
              >
                <!--begin:::Tab item-->
                <li @click="tabsHandler(1)" class="nav-item">
                  <button
                    type="button"
                    class="nav-link text-active-primary fw-bold pb-4"
                    :class="{ active: +currentTab === 1 }"
                  >
                    General
                  </button>
                </li>
                <!--end:::Tab item-->
                <!--begin:::Tab item-->
                <li @click="tabsHandler(2)" class="nav-item">
                  <button
                    type="button"
                    class="nav-link text-active-primary fw-bold pb-4"
                    :class="{ active: +currentTab === 2 }"
                  >
                    Advanced
                  </button>
                </li>
                <!--end:::Tab item-->
                <!--begin:::Tab item-->
                <li @click="tabsHandler(3)" class="nav-item">
                  <button
                    type="button"
                    class="nav-link text-active-primary fw-bold pb-4"
                    :class="{ active: +currentTab === 3 }"
                  >
                    Variations
                  </button>
                </li>
                <!--end:::Tab item-->
                <li @click="tabsHandler(4)" class="nav-item">
                  <button
                    type="button"
                    class="nav-link text-active-primary fw-bold pb-4"
                    :class="{ active: +currentTab === 4 }"
                  >
                    Ordering form
                  </button>
                </li>
              </ul>
              <!--end:::Tabs-->
              <!--begin::Tab content-->
              <div>
                <!--begin::Tab pane-->
                <general-tab
                  v-if="+currentTab === 1"
                  :product="product"
                  :current-tab="+currentTab"
                />
                <!--end::Tab pane-->

                <!--begin::Tab the advanced tab-->
                <advanced-tab
                  v-else-if="+currentTab === 2"
                  :product="product"
                  :current-tab="+currentTab"
                />
                <!--end::Tab pane-->
                <!--begin::Customer Reviews-->
                <variations-tab
                  v-else-if="+currentTab === 3"
                  :current-tab="+currentTab"
                />
                <!--end::Tab pane-->
                <ordering-form-tab
                  v-else-if="+currentTab === 4"
                  :current-tab="+currentTab"
                />
              </div>
              <!--end::Tab content-->
            </div>
            <!--end::Main column-->
          </div>
        </div>
      </form>
      <div v-else>
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span>Loading...</span>
          </div>
        </div>
      </div>
      <!--end::Form-->
    </div>
    <!--end::Container-->
  </div>

  <!-- confirmation dialog -->
  <ConfirmationDialog v-model="leaveConfirmationDialog" width="320px">
    <template #content>
      <div class="d-flex justify-content-center align-items-center flex-column">
        <div style="width: 220px; height: 220px">
          <img
            src="@/assets/cute-cat.webp"
            alt=""
            width="130"
            class="w-100 h-100"
            style="object-fit: contain"
          />
        </div>
        <p class="text-danger fw-bold">
          You have {{ updateProductState.changedSections.length }}
          {{
            updateProductState.changedSections.length > 1
              ? "sections"
              : "section"
          }}
          that need to be saved
        </p>
      </div>
    </template>
    <template #dialogFooter>
      <div class="d-flex flex-wrap">
        <button
          @click="
            onLeaveRouteHandler(nextRoute, true),
              toggleLeaveConfirmationDialog()
          "
          type="button"
          class="btn btn-text-danger w-50"
        >
          Discard
        </button>
        <button
          @click="toggleLeaveConfirmationDialog"
          type="button"
          class="btn btn-light-info w-50"
        >
          Back to save
        </button>
      </div>
    </template>
  </ConfirmationDialog>
  <!-- Add details modal -->
  <el-dialog v-model="firstVisitHelpDialog" title="How to use the page!">
    <template #default>
      <h3 class="text-center">we'll have some details right over here soon!</h3>
    </template>
    <template #footer> footer</template>
  </el-dialog>
</template>

<script lang="ts" setup>
import Api from "@/utils/ApiHelper";
import Thumbnail from "@/views/apps/e-commerce/EditProduct/-Thumbnail.vue";
import ProductDetails from "@/views/apps/e-commerce/EditProduct/-ProductDetails.vue";
import GeneralTab from "@/views/apps/e-commerce/EditProduct/-GeneralTab.vue";
import AdvancedTab from "@/views/apps/e-commerce/EditProduct/-AdvancedTab.vue";
import VariationsTab from "@/views/apps/e-commerce/EditProduct/-VariationsTab.vue";
import OrderingFormTab from "@/views/apps/e-commerce/EditProduct/-OrderingFormTab.vue";
import SaveChangeBtn from "@/views/apps/e-commerce/EditProduct/-SaveChangeBtn.vue";
import ProductType from "@/views/apps/e-commerce/EditProduct/-ProductType.vue";
import ConfirmationDialog from "@/components/Reusable/ConfirmationDialog.vue";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import { computed, onBeforeMount, onMounted, watch } from "vue";
import {
  NavigationGuardNext,
  onBeforeRouteLeave,
  onBeforeRouteUpdate,
  useRoute,
  useRouter,
} from "vue-router";

const store = useStore();
const router = useRouter();
const route = useRoute();

const pageMounted = ref(false);

const breadcrumb = {
  title: "Edit Product",
  pageBreadcrumbPath: ["eCommerce", "Catalog"],
};

const updateProductState = computed(() => store.state.UpdateProduct);

const product = computed(() => store.state.UpdateProduct.product);
const categories = computed(() => store.state.LookupQueries.categories);
const brands = computed(() => store.state.LookupQueries.brands);
const deliveryClasses = computed(
  () => store.state.LookupQueries.deliveryClasses
);

const tabsHandler = async (tabIndex: number) => {
  await router.push(`/apps/ecommerce/catalog/edit-product?tab=${tabIndex}`);
};
const currentTab = computed(() => route.query["tab"]);

const updateChangedSections = ({ sectionId, remove }) => {
  store.commit("ADD_CHANGED_SECTIONS", {
    sectionId,
    remove,
  });
};

const initializeComponentsData = ({ name, content }) => {
  store.commit("INITIALIZE_DATA", {
    name,
    content,
  });
};

const firstVisit = ref<boolean>(false);
const storedFirstLook = ref(
  JSON.parse(localStorage.getItem("first-look-update-product"))
);
const firstVisitHelpDialog = ref(false);
const firstVisitHandler = () => {
  if (storedFirstLook.value) {
    firstVisit.value = false;
  } else {
    firstVisit.value = true;
    document.body.style.overflow = "hidden";
  }
};

const setFirstLook = () => {
  toggleFirstVisitHelpDialog();
  localStorage.setItem("first-look-update-product", "true");
};

const toggleFirstVisitHelpDialog = () => {
  firstVisitHelpDialog.value = !firstVisitHelpDialog.value;
};

watch(
  () => firstVisitHelpDialog.value,
  (newValue, oldValue) => {
    if (!newValue) {
      firstVisit.value = false;
      document.body.style.removeProperty("overflow");
    }
  }
);

const form = ref({
  id: product.value.id,
  code: "",
  slug: "",
});

const codeChanged = ref<boolean | string>(false);
const codeLoading = ref<boolean>(false);
const codeErrorMessage = ref("");
const slugChanged = ref<boolean | string>(false);
const slugLoading = ref<boolean>(false);
const slugErrorMessage = ref("");

const reverseCodeChanges = () => {
  form.value.code = updateProductState.value.code;
  codeErrorMessage.value = "";
  codeChanged.value = false;
};

const saveCodeChange = async (code: string) => {
  const reqData = {
    method: "post",
    url: "/ProductCommands/update-product-code",
    payload: { id: product.value.id || null, code },
  };
  try {
    codeLoading.value = true;
    const { data }: any = await Api(reqData);

    if (data.data === true) {
      codeChanged.value = "done";
      initializeComponentsData({
        name: "code",
        content: code,
      });
      updateChangedSections({
        sectionId: "code",
        remove: true,
      });
      codeErrorMessage.value = "";
    } else {
      codeErrorMessage.value = data.message;
    }
  } catch (error) {
    console.error(error);
  } finally {
    codeLoading.value = false;
  }
};

const saveSlugChange = async (slug: string) => {
  const reqData = {
    method: "post",
    url: "/ProductCommands/update-product-slug",
    payload: { id: product.value.id || null, slug },
  };
  try {
    slugLoading.value = true;
    const { data }: any = await Api(reqData);

    if (data.data === true) {
      initializeComponentsData({
        name: "slug",
        content: slug,
      });
      updateChangedSections({
        sectionId: "slug",
        remove: true,
      });
      slugChanged.value = "done";
      slugErrorMessage.value = "";
    } else {
      slugErrorMessage.value = data.message;
    }
  } catch (error) {
    console.error(error);
  } finally {
    slugLoading.value = false;
  }
};

const reverseSlugChanges = () => {
  form.value.slug = updateProductState.value.slug;
  slugErrorMessage.value = "";
  slugChanged.value = false;
};

watch(
  () => codeChanged.value,
  (newV, oldValue) => {
    if ((newV && !oldValue) || (newV && oldValue === "done")) {
      updateChangedSections({
        sectionId: "code",
        remove: false,
      });
    } else {
      updateChangedSections({
        sectionId: "code",
        remove: true,
      });
    }
  }
);
watch(
  () => slugChanged.value,
  (newV, oldValue) => {
    if ((newV && !oldValue) || (newV && oldValue === "done")) {
      updateChangedSections({
        sectionId: "slug",
        remove: false,
      });
    } else {
      updateChangedSections({
        sectionId: "slug",
        remove: true,
      });
    }
  }
);

const fetchProduct = async (id) => {
  await store.dispatch("getProduct", id);
};
onBeforeMount(async () => {
  await fetchProduct(26);
});
watchEffect(() => {
  if (product.value && Object.keys(product.value).length > 0)
    pageMounted.value = true;
  if (
    product.value &&
    Object.keys(product.value).length > 0 &&
    !form.value.code &&
    !form.value.slug
  ) {
    form.value.code = product.value.code;
    form.value.slug = product.value.slug;
    initializeComponentsData({
      name: "code",
      content: product.value.code,
    });

    initializeComponentsData({
      name: "slug",
      content: product.value.slug,
    });
    firstVisitHandler();
  }
});
onMounted(() => {
  if (currentTab.value) {
    tabsHandler(+currentTab.value);
  } else {
    tabsHandler(1);
  }
  store.dispatch(Actions.SET_BREADCRUMB_ACTION, breadcrumb);
  if (product.value && Object.keys(product.value).length > 0) {
    pageMounted.value = true;
    form.value.code = product.value.code;
    form.value.slug = product.value.slug;
    initializeComponentsData({
      name: "code",
      content: product.value.code,
    });

    initializeComponentsData({
      name: "slug",
      content: product.value.slug,
    });
    firstVisitHandler();
  }
});

watch(currentTab, async (newV) => {
  await fetchProduct(26);
});

const leaveConfirmationDialog = ref<boolean>(false);

const toggleLeaveConfirmationDialog = () => {
  leaveConfirmationDialog.value = !leaveConfirmationDialog.value;
};

// we're going to have to separate functions to reset the changes one's going to be for the globals and another on for the other section
const reverseGlobals = () => {
  reverseCodeChanges();
  reverseSlugChanges();
};
const reverseChanges = (includingGlobals?: boolean) => {
  if (includingGlobals) {
    reverseGlobals();
  }
};

const leavingToUrl = ref<string>("");

const onLeaveRouteHandler = (next: NavigationGuardNext, hardNext?: boolean) => {
  const globalSections: string[] = updateProductState.value["globalSections"];
  const changedSections: string[] = updateProductState.value.changedSections;
  const sectionsWithoutGlobals: string[] = changedSections.filter(
    (el) => !globalSections.includes(el)
  );
  const sectionsContainGlobals =
    changedSections.filter((el) => globalSections.includes(el))?.length > 0;
  const onRouteLeave = leavingToUrl.value;
  const theresChangedSections =
    (!onRouteLeave &&
      sectionsWithoutGlobals &&
      sectionsWithoutGlobals.length > 0) ||
    (onRouteLeave && changedSections && changedSections.length > 0);
  const popupToggle = theresChangedSections && !hardNext;

  if (popupToggle) {
    toggleLeaveConfirmationDialog();
  } else {
    if (sectionsContainGlobals && !onRouteLeave) {
      sectionsWithoutGlobals.forEach((el) => {
        updateChangedSections({
          sectionId: el,
          remove: true,
        });
      });
    } else {
      updateChangedSections({ sectionId: undefined, remove: false });
      reverseChanges();
    }

    next();
  }
};

let nextRoute = () => {};

onBeforeRouteUpdate((to, from, next) => {
  leavingToUrl.value = "";
  onLeaveRouteHandler(next);
  nextRoute = next;
});
onBeforeRouteLeave((to, from, next) => {
  leavingToUrl.value = to.path;
  onLeaveRouteHandler(next);
  nextRoute = next;
});
</script>

<style scoped>
.first_time_overlay-enter-from,
.first_time_overlay-leave-to {
  opacity: 0;
}

.first_time_overlay-enter-active,
.first_time_overlay-leave-active {
  transition: opacity 0.8s ease-in-out;
}
</style>
