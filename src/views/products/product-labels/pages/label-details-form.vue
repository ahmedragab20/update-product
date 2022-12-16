<template>
  <div class="product-label d-flex flex-column flex-column-fluid">
    <!--begin::Container-->
    <div class="container-xxl" id="kt_content_container">
      <Form
        :validation-schema="schema"
        ref="labelForm"
        class="form d-flex flex-column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework"
      >
        <!--begin::Aside column-->

        <div class="d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7 me-lg-10">
          <div class="card card-flush py-4">
            <div class="card-header">
              <div class="card-title">
                <h2>{{ $t("icon") }}</h2>
              </div>
            </div>

            <div class="card-body text-center pt-0">
              <!--begin::icon-->
              <i
                v-if="form.icon && icons.length"
                class="product-label-icon"
                :class="icons.find((el) => el.id == form.icon).code"
              ></i>

              <!--end::icon-->
              <div class="col-12 mt-5">
                <label class="required fs-5 fw-bold mb-2 d-inline"
                  >{{ $t("icon") }}
                </label>
                <Field
                  v-model="form.icon"
                  name="icon"
                  type="text"
                  v-slot="{ field, value }"
                >
                  <el-select
                    :model-value="value"
                    v-bind="field"
                    class="w-100 form-control-solid border-0"
                    v-model="form.icon"
                  >
                    <el-option
                      v-for="item in icons"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                      <div
                        class="d-flex w-100 justify-content-between align-items-center"
                      >
                        <span>{{ item.name }}</span> <i :class="item.code"></i>
                      </div>
                    </el-option>
                  </el-select>
                </Field>
                <ErrorMessage class="text-danger" name="icon"></ErrorMessage>
              </div>
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
            <div class="card-body">
              <!--begin::code-->
              <div class="col-12 my-3">
                <label class="required fs-5 fw-bold mb-2">{{ $t("code") }}</label>
                <div class="position-relative w-auto h-auto">
                  <Field
                    name="code"
                    type="text"
                    v-slot="{ field, meta }"
                    v-model="form.code"
                  >
                    <input
                      v-bind="field"
                      class="form-control form-control-solid form-control-lg"
                      :class="{
                        'is-valid': meta.valid && !isLoading,
                        'is-invalid': meta.validated && !meta.valid && !isLoading,
                      }"
                      @blur="validateCode($event)"
                    />
                  </Field>

                  <span
                    v-if="codeLoading"
                    class="indicator-progress d-block"
                    style="position: absolute; right: 15px; bottom: 15px"
                  >
                    <span class="spinner-border spinner-border-sm align-middle ms-2" />
                  </span>
                </div>
                <span v-if="!isValidCode" class="text-danger">
                  {{ $t("codeNotValidReq") }}
                </span>
                <ErrorMessage class="text-danger" name="code"></ErrorMessage>
              </div>
              <!--end::code -->
              <!--begin::order-->
              <div class="col-12 mb-5">
                <label class="required fs-5 fw-bold mb-2">{{ $t("order") }}</label>
                <Field
                  v-model="form.order"
                  name="order"
                  type="text"
                  v-slot="{ field, meta }"
                >
                  <input
                    v-bind="field"
                    class="form-control form-control-solid form-control-lg"
                    type="number"
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
              <div class="d-flex align-items-center mb-5">
                <input
                  v-model="form.isPublishedOnShopLink"
                  class="form-check-input widget-9-check"
                  id="is-publish-on-shoplink"
                  type="checkbox"
                />
                <label for="is-publish-on-shoplink" class="mx-2">{{
                  $t("isPublishedOnShopLink")
                }}</label>
              </div>
              <div class="d-flex align-items-center">
                <input
                  v-model="form.isPublishedOnJetOrderApp"
                  id="is-publish-on-jetorder"
                  class="form-check-input"
                  type="checkbox"
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

              <div class="col-12 mt-5">
                <tabs-duplicator :items="form.resources" @selectedItem="setSelectedItem">
                  <template #label="{ item }">
                    <span v-if="langs && langs.length">
                      {{ langs.find((el) => el.id == item.languageId)?.label }}
                    </span>
                  </template>
                </tabs-duplicator>
                <div class="fields">
                  <div>
                    <div class="inputs_fields mt-5">
                      <div v-for="(item, i) in form.resources" :key="i" class="my-2">
                        <div v-show="item.languageId == selectedItem?.languageId">
                          <label class="required fs-5 fw-bold mb-2 d-inline">{{
                            $t("name")
                          }}</label>
                          <Field
                            v-model="form.resources[i].name"
                            :name="`resources[${i}].name`"
                            type="text"
                            v-slot="{ field, meta }"
                            :label="$t('name')"
                          >
                            <input
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

          <div class="card card-flush py-4 mb-4">
            <!--begin::Card header-->
            <div class="card-header">
              <!--begin::Card title-->
              <div class="card-title">
                <h2>{{ $t("shops") }}</h2>
              </div>
              <!--end::Card title-->
            </div>

            <div class="card-body pt-0">
              <!--begin::Connected Products-->
              <!-- {{ connectedProducts }} -->
              <div class="col-12 my-3">
                <label class="required fs-5 fw-bold mb-2 d-inline"
                  >{{ $t("connectedShops") }}
                
                </label>
                <div class="d-flex">
                  <Field name="connectedShops" v-model="form.connectedShops" type="text" v-slot="{ field, value }">
                    <!-- :remote-method="getProducts" -->
                    <el-select
                      class="w-100 form-control-solid border-0"
                      v-model="form.connectedShops"
                      multiple
                      filterable
                      remote
                      reserve-keyword
                      :placeholder="$t('enterKeyword')"
                    >
                      <el-option
                        v-for="item in marketShops"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </Field>
                </div>

                <ErrorMessage class="text-danger" name="connectedShops"></ErrorMessage>
              </div>
              <!--end::Connected Products-->
            </div>
          </div>

          <div class="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
            <div class="card card-flush py-4 mb-4">
              <div class="card-header d-flex align-items-center">
                <div class="card-title">
                  <h2>{{ $t("products") }}</h2>
                </div>
                <el-select
                  v-model="localPagination.pageSize"
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
              </div>
              <div class="card-body pt-0">
                <label class="required fs-5 fw-bold mb-5 d-inline">
                  {{ $t("addProduct") }}
                </label>
                <div class="d-flex pb-5 mb-4">
                  <Field name="connectedProduct" type="text" v-slot="{ field, value }">
                    <!-- :remote-method="getProducts" -->
                    <el-select
                      class="w-100 form-control-solid border-0"
                      v-model="connectedProductsSelect"
                      multiple
                      :loading="isLoading"
                      filterable
                      remote
                      reserve-keyword
                      :placeholder="$t('enterKeyword')"
                      value-key="id"
                      :remote-method="getProducts"
                    >
                      <el-option
                        v-for="item in productsList"
                        :key="item.id"
                        class="overflow-visible py-3 d-flex align-items-center"
                        :label="item.name"
                        style="height: 60px"
                        :value="item"
                        :disabled="
                          connectedProductsResult.some(
                            (p) => p.id == item.id
                          )
                        "
                      >
                        <img
                          :src="item.thumbnail"
                          style="object-fit: cover; height: 35px; width: 35px"
                          class="rounded"
                          alt=""
                        />
                        <span class="mx-2">{{ item.name }}</span>
                        <span
                            class="mx-2 text-danger"
                            v-if="
                              connectedProductsResult.some(
                                (p) => p.id == item.id
                              )
                            "
                            >{{ $t("alreadySelected") }}</span
                          >
                      </el-option>
                    </el-select>
                  </Field>
                  <!-- <ErrorMessage
                      class="text-danger"
                      name="connectedProduct"
                    ></ErrorMessage> -->
                  <button
                    @click="saveProducts()"
                    :class="`btn mx-3 d-flex align-items-center ${
                      !!connectedProductsSelect.length
                        ? 'btn-primary'
                        : 'btn-light-primary'
                    }`"
                    :disabled="!connectedProductsSelect.length"
                    type="button"
                  >
                    <span v-if="isLoading" class="indicator-progress d-block">
                      <span class="spinner-border spinner-border-sm align-middle ms-2" />
                    </span>
                    <span v-if="!isLoading" class="indicator-label"
                      >{{ $t("save") }}
                    </span>
                  </button>
                </div>

                <label>{{ $t("connectedProducts") }}</label>
                <el-table :data="connectedProductsResult" class="tag-products w-100 pt-4">
                  >
                  <el-table-column width="70" :label="$t('Image')">
                    <template #default="scope">
                      <div class="d-flex align-items-center">
                        <img
                          :src="scope.row.thumbnail"
                          style="object-fit: cover; height: 35px; width: 35px"
                          class="rounded"
                          alt=""
                        />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('name')">
                    <template #default="scope">
                      {{ scope.row.name }}
                    </template>
                    <template #header>
                      <input
                        type="text"
                        :placeholder="$t('name')"
                        v-model="keyword"
                        class="form-control w-100 form-control-solid form-control-lg"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('actions')" align="right" width="70">
                    <template #default="scope">
                      <a
                        @click="removeProduct(scope.row.id)"
                        class="btn btn-icon btn-danger-light btn-active-color-primary btn-sm"
                      >
                        <span class="svg-icon svg-icon-danger svg-icon-1">
                          <inline-svg src="/media/icons/duotune/general/gen027.svg" />
                        </span>
                      </a>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="card-footer d-flex justify-content-center">
                <el-pagination
                  v-model:current-page="localPagination.pageNumber"
                  :page-size="localPagination.pageSize"
                  layout="prev, pager, next"
                  :total="connectedProducts.length"
                  :hide-on-single-page="true"
                  background
                >
                </el-pagination>
              </div>
            </div>
          </div>
          <div class="card card-flush py-4">
            <!--begin::Card header-->
            <div class="card-header">
              <!--begin::Card title-->
              <div class="card-title">
                <h2>{{ $t("labelStyle") }}</h2>
              </div>
              <!--end::Card title-->
            </div>

            <div class="card-body pt-0">
              <!--begin::text-color-->
              <div class="col-12 mt-5">
                <label class="required fs-5 fw-bold"> {{ $t("textColor") }}</label>
                <div
                  class="form-control form-control-solid form-control-lg d-flex align-items-center justify-content-between"
                >
                  <Field
                    name="textColor"
                    v-model="form.textColor"
                    value="#000000"
                    type="color"
                    v-slot="{ value, field }"
                  >
                    <input type="color" class="border-0 rounded w-25" v-bind="field" />
                    <input
                      type="text"
                      class="border-0 rounded"
                      style="width: 75px"
                      v-bind="field"
                    />
                  </Field>
                </div>
                <ErrorMessage class="text-danger" name="textColor"></ErrorMessage>
              </div>
              <!--end::text-color-->
              <!--begin::background-color-->
              <div class="col-12 mt-5">
                <label class="required fs-5 fw-bold"> {{ $t("backgroundColor") }}</label>
                <div
                  class="form-control form-control-solid form-control-lg d-flex align-items-center justify-content-between"
                >
                  <Field
                    name="backgroundColor"
                    v-model="form.backgroundColor"
                    value="#ffffff"
                    type="color"
                    v-slot="{ field }"
                  >
                    <input type="color" class="border-0 rounded w-25" v-bind="field" />
                    <input
                      type="text"
                      class="border-0 rounded"
                      style="width: 75px"
                      v-bind="field"
                    />
                  </Field>
                </div>
                <ErrorMessage class="text-danger" name="backgroundColor"></ErrorMessage>
              </div>
              <!--end::background-color-->
            </div>
          </div>

          <div class="d-flex w-100 justify-content-end">
            <button class="btn btn-light" type="button" @click="$router.go(-1)">
              {{ $t("goBack") }}
            </button>
            <button class="btn btn-primary" type="button" @click="validate">
              <span v-if="!isLoading">
                {{ $t("save") }} 
              </span>
              <span v-if="isLoading" class="indicator-progress d-block">
                {{ $t("wait") }}
                <span class="spinner-border spinner-border-sm align-middle ms-2" />
              </span>
            </button>
          </div>
        </div>
        <!--end::main column-->
      </Form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { ref, defineProps, computed, reactive, onMounted } from "vue";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { string } from "yup";
import { ProductLabel, ProductLabelResources } from "@/types";
import { Form, Field, ErrorMessage } from "vee-validate";
import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";
import * as yup from "yup";
import i18n from "@/core/plugins/i18n";
import api from "@/utils/ApiHelper";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
onMounted(async () => {
  setCurrentPageBreadcrumbs(i18n.global.t("labels"), []);
});
// import Swal from "sweetalert2";

//                                  Variables and Getters Init
const localPagination = reactive({ pageNumber: 1, pageSize: 5 });
const labelForm = ref(null);
const keyword = ref("");
const codeLoading = ref<boolean>(false);
const isValidCode = ref(true);
const store = useStore();
let props = defineProps({
  id: string,
});
let form = ref({
  code: "",
  icon: "",
  name: "",
  connectedShops: [],
  numberOfConnectedProducts: 0,
  numberOfConnectedShops: 0,
  textColor: "",
  backgroundColor: "",
  isPublishedOnJetOrderApp: false,
  isPublishedOnShopLink: false,
  order: 0,
  resources: [],
});
const isLoading = ref<boolean>(false);
const connectedProductsSelect = ref([]);
const selectedItem = ref<ProductLabelResources>();
const schema = yup.object({
  code: yup
    .string()
    .min(4, i18n.global.t("codeNotValid"))
    //.test("isValidCode", i18n.global.t("codeNotValid"), validateCode)
    .required(i18n.global.t("fieldRequired")),
  order: yup.number().required(i18n.global.t("fieldRequired")),
  textColor: yup
    .string()
    .matches("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$", i18n.global.t("invalidHex"))
    .required(i18n.global.t("fieldRequired")),
  backgroundColor: yup
    .string()
    .matches("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$", i18n.global.t("invalidHex"))
    .required(i18n.global.t("fieldRequired")),
  icon: yup.string().required(i18n.global.t("fieldRequired")),
  connectedShops: yup.array().of(yup.string()),
  resources: yup.array().of(
    yup.object().shape({
      name: yup.string().required(i18n.global.t("fieldRequired")),
      languageId: yup.string(),
    })
  ),
});
const langs = computed(() => {
  return store.getters.getSupportedLanguages;
});
function validateCode(e) {
  return new Promise<boolean>((resolve, reject) => {
    if (e.target.value.length >= 4 && codeCheck.value !== e.target.value) {
      codeLoading.value = true;
      api({
        url: "ProductLabelCommands/is-valid-code",
        method: "post",
        payload: { code: e.target.value },
      }).then((res) => {
        codeLoading.value = false;
        resolve(res?.data.data as boolean);
        console.log("code res",res?.data.data);
        isValidCode.value = res?.data.data;
      });
    }
  });
}
const connectedProductsResult = computed(() =>
  connectedProducts.value
    .slice(
      (localPagination.pageNumber - 1) * localPagination.pageSize,
      localPagination.pageSize * localPagination.pageNumber
    )
    .filter(
      (p) =>
        p.name.toLowerCase().indexOf(keyword.value.toLocaleLowerCase()) != -1 ||
        !keyword.value
    )
);
const marketShops = computed(() => store.getters.getMarketData.shops);
const connectedProducts = computed(() => store.state.ProductLabels.connectedProducts);
const icons = computed(() => store.getters.getIcons);
const productsList = computed(() => store.state.ProductLabels.products);
const codeCheck = ref("");
//                                              FUNCTIONS and ACTIONS DEFINETION
function getProductLabel(id) {
  store.dispatch(Actions.GET_PRODUCT_LABEL, { id }).then((data : any) => {
    console.log("gggggggg", data);
    
    form.value = data
    form.value.connectedShops=data?.shops
    selectedItem.value = form.value.resources[0];
  });
}
function getProducts(qury) {
  isLoading.value = true;
  store
    .dispatch(Actions.SEARCH_PRODUCTS, {
      query: qury,
    })
    .then(() => {
      isLoading.value = false;
    });
}
function validate() {
  labelForm.value.validate().then(({ valid }) => {
    if (valid) {
      onSubmit();
    }
  });
}
function getConnectedProducts() {
  store.dispatch(Actions.GET_LABEL_PRODUCTS, {
    id: props.id,
  });
}

function getIcons() {
  store.dispatch(Actions.FONTAWESOME_ICONS);
}
function setSelectedItem(payload: any) {
  selectedItem.value = payload;
}
// function goToProduct(e) {
//   console.log(e);
// }
// function showAlert() {
//   if (connectedProductsSelect.value.length > 0) {
//     setTimeout(() => {
//       Swal.fire({
//         title: "You Have unsaved Products!",
//         text: `You Have ${connectedProductsSelect.value.length} unSaved Products ! Do You Want To Save Them ?`,
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Save",
//         cancelButtonText: "Discard",
//       }).then((status) => {
//         if (status.isConfirmed) {
//           alert("Product Added Sucessfully");
//         }
//       });
//     }, 3000);
//   }
// }
function saveProducts() {
  isLoading.value = true;
  store
    .dispatch(Actions.ADD_PRODUCT_FOR_LABEL, {
      id: props.id,
      connectedProducts: connectedProductsSelect.value,
    })
    .then(() => {
      isLoading.value = false;
      connectedProductsSelect.value = [];
    });
}
function removeProduct(id) {
  store.dispatch(Actions.REMOVE_PRODUCT_FROM_LABEL, {
    id: props.id,
    connectedProducts: [id],
  });
}
function onSubmit(e) {
  console.log("form ", ...form)
  isLoading.value = true;
  store.dispatch(Actions.UPDATE_PRODUCT_LABEL, {
    ...e,
    ...form.value,
    id: props.id,
  }).then(() => {
      isLoading.value = false;
    });
  
}

// SETUP FUNCTIONS EXECUTION
setCurrentPageBreadcrumbs(i18n.global.t("labelDetails"), [i18n.global.t("labels")]);
getProductLabel(props.id);
getConnectedProducts();
getIcons();
</script>

<style lang="scss">
@import "@/assets/sass/components/variables.custom";

.product-label {
  &-icon {
    font-size: 56px;
  }
}

.el-table tr {
  cursor: pointe !important;
}

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
</style>
