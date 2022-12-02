<template>
  <div>
    <div class="product-tag-details d-flex flex-column flex-column-fluid">
      <!--begin::Container-->
      <!-- {{ tag }} -->
      <div class="container-xxl" id="kt_content_container">
        <Form
          ref="tagForm"
          :validation-schema="schema"
          class="form d-flex flex-column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework"
        >
          <!--begin::Aside column-->
          <div
            class="d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7 me-lg-10"
          >
            <div class="card card-flush py-4">
              <div class="card-body pt-0">
                <!--begin::slug-->
                <div class="col-12 my-3">
                  <label class="required fs-5 fw-bold mb-2">Slug</label>
                  <Field
                    name="slug"
                    type="text"
                    v-slot="{ field, meta }"
                    v-model="tagsDto.slug"
                  >
                    <input
                      v-bind="field"
                      class="form-control form-control-solid form-control-lg"
                      :class="{
                        'is-valid': meta.valid,
                        'is-invalid': meta.validated && !meta.valid,
                      }"
                    />
                  </Field>
                  <ErrorMessage class="text-danger" name="slug"></ErrorMessage>
                </div>

                <!--end::slug-->
              </div>
              <!--end::Card body-->
            </div>
            <!--end::Thumbnail settings-->
            <!--begin::Status-->

            <div class="card card-flush py-4">
              <div class="card-header">
                <div class="card-title">
                  <h2>{{ $t("labelProperties") }}</h2>
                </div>
              </div>
              <div class="card-body pt-1">
                <!--begin::code-->
                <div class="col-12 my-3">
                  <label class="required fs-5 fw-bold mb-2">{{
                    $t("code")
                  }}</label>
                  <Field
                    name="code"
                    type="text"
                    v-slot="{ field, meta }"
                    v-model="tagsDto.code"
                  >
                    <input
                      v-bind="field"
                      class="form-control form-control-solid form-control-lg"
                      :class="{
                        'is-valid': meta.valid,
                        'is-invalid': meta.validated && !meta.valid,
                      }"
                    />
                  </Field>
                  <ErrorMessage class="text-danger" name="code"></ErrorMessage>
                </div>
                <!--end::code -->
                <!--begin::order-->
                <div class="col-12 my-3">
                  <label class="required fs-5 fw-bold mb-2">{{
                    $t("order")
                  }}</label>
                  <Field
                    name="order"
                    type="text"
                    v-slot="{ field, meta }"
                    v-model="tagsDto.order"
                  >
                    <input
                      v-bind="field"
                      class="form-control form-control-solid form-control-lg"
                      type="number"
                      min="1"
                      :class="{
                        'is-valid': meta.valid,
                        'is-invalid': meta.validated && !meta.valid,
                      }"
                    />
                  </Field>
                  <ErrorMessage class="text-danger" name="order"></ErrorMessage>
                </div>
                <!--end::order -->
              </div>
            </div>

            <div class="card card-flush py-4">
              <div class="card-header">
                <div class="card-title">
                  <h2>{{ $t("publishOptions") }}</h2>
                </div>
              </div>
              <div class="card-body pt-0">
                <div class="d-flex align-items-center my-3">
                  <input
                    class="form-check-input widget-9-check"
                    id="is-publish-on-shoplink"
                    type="checkbox"
                    v-model="tagsDto.isPublishedOnShopLink"
                  />
                  <label for="is-publish-on-shoplink" class="mx-2">{{
                    $t("isPublishedOnShopLink")
                  }}</label>
                </div>
                <div class="d-flex align-items-center">
                  <input
                    id="is-publish-on-jetorder"
                    class="form-check-input"
                    type="checkbox"
                    v-model="tagsDto.isPublishedOnJetOrderApp"
                  />
                  <label for="is-publish-on-jetorder" class="mx-2">{{
                    $t("isPublishedOnJetOrderApp")
                  }}</label>
                </div>
              </div>
            </div>
          </div>
          <!--end::Aside column-->
          <!--begin::Main column-->

          <div class="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
            <div class="card card-flush py-4">
              <div class="card-header">
                <div class="card-title">
                  <h2>{{ $t("resources") }}</h2>
                </div>
              </div>
              <div class="card-body pt-0">
                <!--begin::Input group-->

                <div class="col-12 my-3">
                  <tabs-duplicator
                    :items="tagsDto.resources"
                    @selectedItem="setSelectedItem"
                  >
                    <template #label="{ item }">
                      {{ langs.find((el) => el.id == item.languageId)?.label }}
                    </template>
                  </tabs-duplicator>
                  <div class="fields">
                    <div>
                      <div class="inputs_fields my-3">
                        <div
                          v-for="(item, i) in tagsDto.resources"
                          :key="i"
                          class="my-2"
                        >
                          <div
                            v-show="item.languageId == selectedItem?.languageId"
                          >
                            <label
                              class="required fs-5 fw-bold mb-2 d-inline"
                              >{{ $t("name") }}</label
                            >
                            <Field
                              v-model="tagsDto.resources[i].name"
                              :name="`resources[${i}].name`"
                              type="text"
                              v-slot="{ field, meta }"
                              :label="$t('name')"
                            >
                              <input
                                :dir="selectedItem.dir"
                                v-bind="field"
                                type="text"
                                class="form-control form-control-solid form-control-lg"
                                :class="{
                                  'is-valid': meta.valid,
                                  'is-invalid': meta.validated && !meta.valid,
                                }"
                              />
                              <ErrorMessage
                                :name="`resources[${i}].name`"
                                class="text-danger"
                              >
                                <span class="text-danger" v-if="!meta.valid">
                                  {{ $t("resourcesValidation") }}
                                </span>
                              </ErrorMessage>
                            </Field>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card card-flush py-4">
              <!--begin::Card header-->
              <div class="card-header">
                <!--begin::Card title-->
                <div class="card-title">
                  <h2>{{ $t("productTag") }}</h2>
                </div>
                <!--end::Card title-->
              </div>

              <div class="card-body pt-0">
                <!--begin::Connected Shops-->
                <div class="col-12 my-3"></div>
                <!--end::Connected Shops-->

                <!--begin::Connected Products-->

                <div class="col-12 my-3">
                  <label class="required fs-5 fw-bold mb-2 d-inline"
                    >{{ $t("connectedShops") }}
                  </label>
                  <div class="d-flex">
                    <Field
                      name="connectedShops"
                      type="text"
                      v-slot="{ field, value }"
                    >
                      <el-select
                        v-model="tagsDto.connectedShops"
                        v-bind="field"
                        :mode-value="value"
                        class="w-100 form-control-solid border-0"
                        multiple
                      >
                        <el-option
                          v-for="item in marketShops"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                    </Field>
                  </div>

                  <!-- <ErrorMessage
                    class="text-danger"
                    name="connectedShops"
                  ></ErrorMessage> -->
                </div>
                <!--end::Connected Products-->
              </div>
            </div>
            <div class="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
              <div class="card card-flush">
                <div class="card-header">
                  <div class="card-title">
                    <h2>{{ $t("shopTag") }}</h2>
                  </div>
                  <div class="d-flex justify-content-center align-items-center">
                    <el-select
                      v-model="pageSize"
                      style="width: 100px"
                      placeholder="Number Of Item"
                      class="border-1 mx-4"
                    >
                      <el-option :value="5">5</el-option>
                      <el-option :value="10">10</el-option>
                      <el-option :value="25">25</el-option>
                      <el-option :value="50">50</el-option>
                      <el-option :value="100">100</el-option>
                    </el-select>
                    <div class="d-flex align-items-center my-1">
                      <span class="svg-icon svg-icon-1 position-absolute ms-6">
                        <!-- <inline-svg src="media/icons/duotune/general/gen021.svg" /> -->
                        <inline-svg
                          src="/media/icons/duotune/general/gen021.svg"
                        ></inline-svg>
                      </span>
                      <!-- @input="getData" -->

                      <input
                        type="text"
                        v-model="searchValue"
                        class="form-control form-control-solid w-250px ps-15"
                        :placeholder="$t('search')"
                      />
                    </div>
                  </div>
                </div>
                <div class="card-body py-0">
                  <label class="required fs-5 fw-bold mb-5 d-inline">
                    {{ $t("connectedProducts") }}
                  </label>

                  <div class="d-flex pb-5">
                    <Field
                      name="connectedProduct"
                      type="text"
                      v-slot="{ field, value }"
                    >
                      <!-- :remote-method="getProducts" -->

                      <!-- {{ connectedProductsList }} -->
                      <el-select
                        class="w-100 form-control-solid border-0"
                        v-model="connectedValue"
                        multiple
                        filterable
                        remote
                        reserve-keyword
                        :placeholder="$t('enterKeyWork')"
                        :remote-method="getSelectConnectedProducts"
                        :loading="productsLoading"
                        value-key="id"
                      >
                        <el-option
                          v-for="item in connectedProductsList"
                          :key="item.id"
                          :label="item.name"
                          :value="item"
                          :disabled="
                            connectedProducts.some((ele) => ele.id == item.id)
                          "
                        >
                          <img
                            style="
                              object-fit: cover;
                              margin-right: 10px;
                              border-radius: 5px;
                            "
                            height="30"
                            width="30"
                            :src="item.thumbnail"
                            :class="
                              connectedProducts.some((ele) => ele.id == item.id)
                                ? 'opacity'
                                : ''
                            "
                          />

                          <span>{{ item.name }}</span>
                          <span
                            style="
                              float: right;
                              color: #f1416c;
                              font-size: 13px;
                            "
                            v-if="
                              connectedProducts.some((ele) => ele.id == item.id)
                            "
                            >{{ $t("productIsSelected") }}</span
                          >
                        </el-option>
                      </el-select>
                    </Field>
                    <!-- {{ connectedValue }} -->
                    <div class="d-flex justify-content-end align-items-end">
                      <button
                        type="button"
                        @click="addProduct()"
                        class="product-connect btn btn-light-primary mx-3 d-flex align-items-center"
                        :class="
                          !!connectedValue.length
                            ? 'btn-primary'
                            : 'btn-light-primary'
                        "
                        :disabled="!connectedValue.length"
                      >
                        <span
                          v-if="productsLoading"
                          class="indicator-progress d-block"
                        >
                          <span
                            class="spinner-border spinner-border-sm align-middle ms-2"
                          />
                        </span>
                        <span v-else> {{ $t("save") }}</span>
                        <inline-svg
                          src="/media/icons/duotune/arrows/arr075.svg"
                        />
                      </button>
                    </div>
                  </div>

                  <el-table
                    :data="filterProduct"
                    class="tag-products w-100 pt-4"
                  >
                    <el-table-column :label="$t('image')" width="70">
                      <template #default="scope">
                        <img
                          style="
                            object-fit: cover;
                            height: 40px;
                            width: 40px;
                            border-radius: 5px;
                          "
                          :src="scope.row.thumbnail"
                          alt="image"
                        />
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('name')">
                      <template #default="scope">
                        <div>{{ scope.row.name }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('actions')" align="right">
                      <template #default="scope">
                        <a
                          @click="removeProduct(scope.row.id)"
                          class="btn btn-icon btn-danger-light btn-active-color-danger btn-sm"
                        >
                          <span class="svg-icon svg-icon-1">
                            <inline-svg
                              src="/media/icons/duotune/general/gen027.svg"
                            />
                          </span>
                        </a>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="card-footer d-flex justify-content-center">
                    <el-pagination
                      v-model:current-page="pageNumber"
                      :page-size="pageSize"
                      layout="prev, pager, next"
                      :total="connectedProducts.length"
                      background
                      v-if="connectedProducts.length"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <!--begin::Button-->
              <button
                type="button"
                @click="$router.push('/products/tags')"
                id="kt_ecommerce_add_product_cancel"
                class="btn btn-light me-5"
              >
                {{ $t("cancel") }}
              </button>
              <!--end::Button-->
              <!--begin::Button-->
              <button
                class="btn btn-primary"
                type="button"
                @click="submitAction"
              >
                <span v-if="!isLoading" class="indicator-label">
                  {{ $t("save") }}</span
                >

                <span v-if="isLoading" class="indicator-progress d-block">
                  {{ $t("wait") }}
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  />
                </span>
              </button>
              <!--end::Button-->
            </div>
          </div>
          <!--end::main column-->
        </Form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { ref, defineProps, computed, onBeforeUnmount } from "vue";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Form, Field, ErrorMessage } from "vee-validate";
import { string } from "yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import { Pagination } from "@/types";
import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";
import productTags from "@/store/modules/ProductTags";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import i18n from "@/core/plugins/i18n";
import api from "@/utils/ApiHelper";

const store = useStore();
let props = defineProps({
  id: string,
});
const searchValue = ref("");
const pagination = computed(
  () => store.state.ProductTags.pagination as Pagination
);
let pageNumber = ref(1);
let pageSize = ref(5);
const indexStart = computed(() => {
  return (pageNumber.value - 1) * pageSize.value;
});

const indexEnd = computed(() => {
  return pageSize.value * pageNumber.value;
});

const paginated = computed(() => {
  return connectedProducts.value.slice(indexStart.value, indexEnd.value);
});

const isLoading = ref(false);
let tagsDto = ref({
  id: "",
  code: "",
  slug: "",
  resources: [],
  connectedShops: [],
  order: 0,
  numberOfConnectedProducts: 0,
  numberOfConnectedShops: 0,
  isPublishedOnJetOrderApp: true,
  isPublishedOnShopLink: true,
});
const connectedValue = ref([]);

const tagForm = ref();
const langs = computed(() => {
  return store.getters.getSupportedLanguages;
});
// const langs = ref([
//   { id: "1", label: "العربية", code: "ar-JO" },
//   { id: "2", label: "English", code: "en-US" },
// ]);
const selectedItem = ref({});
const setSelectedItem = (payload: any) => {
  selectedItem.value = payload;
};
const filterProduct = computed(() => {
  if (!searchValue.value) {
    return paginated.value;
  } else {
    return paginated.value.filter((ele) =>
      ele.name.toLowerCase().includes(searchValue.value.toLowerCase())
    );
  }
});

const schema = yup.object({
  code: yup
    .string()
    .min(4)
    .test("isValidSlug", i18n.global.t("codeValidation"), validateCode)
    .required(i18n.global.t("codeIsRequire")),
  order: yup.number().required(i18n.global.t("codeIsRequire")),
  slug: yup
    .string()
    .min(4)
    .test("isValidSlug", i18n.global.t("slugValidation"), validateSlug)
    .required(i18n.global.t("slugIsRequire")),
  // connectedShops: yup.array().of(yup.string()).required(),
  resources: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
      languageId: yup.string(),
    })
  ),
});
const productsLoading = ref<boolean>(false);
const marketShops = computed(() => store.getters.getMarketData.shops);
const connectedProducts = computed(
  () => store.state.ProductTags.connectedProducts
);
const connectedProductsList = computed(
  () => store.state.ProductTags.searchConnectedProducts
);

function updatePagination() {
  store.dispatch(Actions.GET_TAG_PRODUCTS, {
    query: props.id,
  });
}
function getProductTag(id) {
  store.dispatch(Actions.GET_PRODUCT_TAG, { id }).then((data) => {
    tagsDto.value = data;
    selectedItem.value = tagsDto.value.resources[0];
  });
}
function getConnectedProducts() {
  store.dispatch(Actions.GET_TAG_PRODUCTS, {
    id: props.id,
  });
}
function getSelectConnectedProducts(query) {
  productsLoading.value = true;
  store.dispatch(Actions.SEARCH_PRODUCTS, { query: query }).then(() => {
    productsLoading.value = false;
  });
}
function addProduct() {
  productsLoading.value = true;
  store
    .dispatch(Actions.ADD_TAG_DETAILS_PRODUCT, {
      id: props.id,
      connectedProducts: connectedValue.value,
    })
    .then((res) => {
      productsLoading.value = false;
      connectedValue.value = [];
    });
  // updatePagination();
}
// const setItemsPerPage = (e) => {
//   store.commit(Mutations.UPDATE_PAGINATION, {
//     ...pagination.value,
//     pageSize: e,
//   });
//   getConnectedProducts();
// };
function removeProduct(id) {
  store.dispatch(Actions.REMOVE_PRODUCT_FROM_TAG, {
    id: props.id,
    connectedProducts: [id],
  });
}
function updateTags() {
  isLoading.value = true;
  store
    .dispatch(Actions.EDIT_PRODUCT_TAG, {
      ...tagsDto.value,
    })
    .then(() => {
      isLoading.value = false;
      Swal.fire({
        text: i18n.global.t("updateSuccess"),
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: i18n.global.t("ok"),
        cancelButtonText: i18n.global.t("cancel"),
        customClass: {
          confirmButton: "btn fw-bold btn-light-primary",
        },
      });
    });
}

function validateSlug(e) {
  return new Promise<boolean>((resolve) => {
    if (e && e.length >= 4) {
      api({
        url: "ProductTagCommands/is-valid-slug",
        method: "post",
        payload: { slug: e, id: props.id },
      }).then((res) => {
        resolve(res?.data.data as boolean);
      });
    } else resolve(false);
  });
}

function validateCode(e) {
  return new Promise<boolean>((resolve) => {
    if (e && e.length >= 4)
      api({
        url: "ProductTagCommands/is-valid-code",
        method: "post",
        payload: { code: e, id: props.id },
      }).then((res) => {
        resolve(res?.data.data as boolean);
      });
    else resolve(false);
  });
}
function submitAction() {
  tagForm.value.validate().then(({ valid }) => {
    if (valid) {
      updateTags();
    }
  });
}

updatePagination();
// getSelectConnectedProducts(connectedValue.value);
setCurrentPageBreadcrumbs(i18n.global.t("editTag"), [
  i18n.global.t("productTags"),
]);
getProductTag(props.id);
getConnectedProducts();

onBeforeUnmount(() => store.commit(Mutations.RESET_PAGINATION_TAGS));
</script>

<style lang="scss">
@import "@/assets/sass/components/variables.custom";
.product-tag-details {
  .el-input {
    border-radius: 0.625rem;
  }

  .el-input__inner {
    border-radius: 0.625rem;
    background-color: #f5f8fa;
    height: 45px;
    border: none;
  }
  .el-tag {
    background-color: $primary !important;
    color: #fff;

    svg {
      color: #fff;
    }
  }
  button.product-connect {
    height: 45px;
  }
  img.opacity {
    opacity: 0.5;
  }
}
</style>
