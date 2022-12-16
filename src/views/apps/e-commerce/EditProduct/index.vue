<template>
  <div id="kt_content" class="content d-flex flex-column flex-column-fluid">
    <!--begin::Container-->
    <div id="kt_content_container" class="container-xxl">
      <!--begin::Form-->
      <form
        v-if="pageMounted"
        id="kt_ecommerce_add_product_form"
        class="form d-flex flex-column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework"
        data-kt-redirect="/metronic8/demo7/../demo7/apps/ecommerce/catalog/products.html"
        @submit.prevent
      >
        <div class="row w-100">
          <!--begin::Aside column-->
          <div class="col-xl-4">
            <div class="d-flex flex-column gap-7 gap-lg-10 w-100 mb-7 me-lg-10">
              <!--begin::Thumbnail settings-->
              <Thumbnail
                :thumbnail="product.thumbnailPath"
                :productId="product.id"
              />
              <!--end::Thumbnail settings-->
              <!-- Code -->
              <div class="card card-flush mb-4">
                <div class="card-header pt-4">
                  <div class="card-title flex-column">
                    <h2>Code</h2>
                    <small
                      >it's optional but if you will add one. then it must be
                      unique</small
                    >
                  </div>
                </div>
                <div class="card-body">
                  <input
                    v-model="form.code"
                    class="form-control"
                    placeholder="unique code"
                    type="text"
                    @input="codeChanged = true"
                  />
                </div>
                <SaveChangeBtn
                  :btnReverseSubmit="reverseCodeChanges"
                  :btnSubmit="saveCodeChange"
                  :elChanged="codeChanged"
                  :elLoading="codeLoading"
                  :payload="form.code"
                />
              </div>
              <!-- Slug -->
              <div class="card card-flush mb-4">
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
                  <input
                    v-model="form.slug"
                    class="form-control"
                    placeholder="unique slug"
                    type="text"
                    @input="slugChanged = true"
                  />
                </div>
                <SaveChangeBtn
                  :btnReverseSubmit="reverseSlugChanges"
                  :btnSubmit="saveSlugChange"
                  :elChanged="slugChanged"
                  :elLoading="slugLoading"
                  :payload="form.slug"
                />
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
              <!--begin:::Tabs-->
              <ul
                class="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-bold mb-n2"
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
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import { computed, onBeforeMount, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const route = useRoute();

const pageMounted = ref(false);

const breadcrumb = {
  title: "Edit Product",
  pageBreadcrumbPath: ["eCommerce", "Catalog"],
};

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

const form = ref({
  id: product.value.id,
  code: "",
  slug: "",
});

const codeBaseData = ref();
const slugBaseData = ref();
const codeChanged = ref<boolean | string>(false);
const codeLoading = ref<boolean | string>(false);

const slugChanged = ref<boolean | string>(false);
const slugLoading = ref<boolean | string>(false);

const reverseCodeChanges = () => {
  form.value.code = codeBaseData.value;
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

    if (data.data === true) codeChanged.value = "done";
  } catch (error) {
    console.error(error);
  } finally {
    codeLoading.value = false;
  }
};

const reverseSlugChanges = () => {
  form.value.slug = slugBaseData.value;
  slugChanged.value = false;
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

    if (data.data === true) slugChanged.value = "done";
  } catch (error) {
    console.error(error);
  } finally {
    slugLoading.value = false;
  }
};

const fetchProduct = async (id) => {
  await store.dispatch("getProduct", id);
};
onBeforeMount(() => {
  fetchProduct(27);
});
watchEffect(() => {
  if (product.value && Object.keys(product.value).length > 0)
    pageMounted.value = true;
  if (
    product.value &&
    Object.keys(product.value).length > 0 &&
    !form.value.code &&
    !codeBaseData.value &&
    !form.value.slug &&
    !slugBaseData.value
  ) {
    codeBaseData.value = product.value.code;
    form.value.code = product.value.code;
    slugBaseData.value = product.value.slug;
    form.value.slug = product.value.slug;
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
    codeBaseData.value = product.value.code;
    form.value.code = product.value.code;
    slugBaseData.value = product.value.slug;
    form.value.slug = product.value.slug;
    console.log("mounted");
  }
});
</script>

<style scoped></style>
