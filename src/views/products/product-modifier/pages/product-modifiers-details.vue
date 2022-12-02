<template>
  <div class="product-label d-flex flex-column flex-column-fluid">
    <!--begin::Container-->
    <div class="container-xxl" id="kt_content_container">
      <Form
        :schema="schema"
        @submit="submit"
        class="form d-flex flex-column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework">
        <!--begin::Aside column-->

        <div
          class="d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7 me-lg-10">
          <!--begin::Status-->

          <div class="card card-flush py-4">
            <div class="card-header">
              <div class="card-title">
                <h2>{{ $t("modifierProperties") }}</h2>
              </div>
            </div>
            <div class="card-body">
              <!--begin::code-->
              <div class="col-12 mt-5">
                <label class="required fs-5 fw-bold mb-2">{{
                  $t("code")
                }}</label>
                <div class="position-relative w-auto h-auto">
                  <Field
                    class="form-control form-control-lg form-control-solid"
                    type="text"
                    name="code"
                    autocomplete="off"
                    v-model="form.code"
                    v-slot="{ field, meta }">
                    <div class="inputcontainer">
                      <input
                        v-bind="field"
                        class="form-control form-control-solid form-control-lg"
                        :class="{
                          'is-invalid': meta.validated && !meta.valid,
                        }"
                        @blur="checkValueCode($event)" />
                      <div class="icon-container" v-if="codeLoading">
                        <i class="loader"></i>
                      </div>
                    </div>
                  </Field>

                  <span v-if="!isValidCodeUpdate" class="text-danger">{{
                    validMessageCode
                  }}</span>
                  <ErrorMessage class="text-danger" name="code"></ErrorMessage>
                </div>
              </div>
              <!--end::code -->
              <!--begin::order-->
              <div class="col-12 mt-5">
                <label class="required fs-5 fw-bold mb-2">{{
                  $t("order")
                }}</label>
                <Field
                  v-model="form.order"
                  name="order"
                  type="text"
                  v-slot="{ field, meta }">
                  <input
                    v-bind="field"
                    class="form-control form-control-solid form-control-lg"
                    type="number"
                    :class="{
                      'is-valid': meta.valid,
                      'is-invalid': meta.validated && !meta.valid,
                    }" />
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
              <div class="d-flex align-items-center">
                <input
                  class="form-check-input"
                  v-model="form.isPublishedOnShopLink"
                  type="checkbox"
                  checked=""
                  data-kt-check="false" />
                <label for="is-publish-on-shoplink" class="mx-2">{{
                  $t("isPublishedOnShopLink")
                }}</label>
              </div>
              <div class="d-flex align-items-center mt-5">
                <input
                  class="form-check-input"
                  v-model="form.isPublishedOnJetOrder"
                  type="checkbox"
                  checked=""
                  data-kt-check="false" />
                <label for="is-publish-on-jetorder" class="mx-2">{{
                  $t("isPublishedOnJetOrderApp")
                }}</label>
              </div>
            </div>
          </div>
          <div class="card card-flush py-4">
            <div class="card-header">
              <div class="card-title">
                <!-- <h2>Selection Value</h2> -->
              </div>
            </div>
            <div class="card-body">
              <!--begin::code-->
              <div class="col-12 mt-5">
                <label class="required fs-5 fw-bold mb-2">{{
                  $t("maximumSelectionValue")
                }}</label>
                <Field
                  class="form-control form-control-lg form-control-solid"
                  type="number"
                  name="maximumSelectionValue"
                  autocomplete="off"
                  v-model="form.maximumSelectionValue"
                  min="0" />
                <ErrorMessage name="maximumSelectionValue" />
              </div>
              <!--end::code -->
              <!--begin::order-->
              <div class="col-12 mt-5">
                <label class="required fs-5 fw-bold mb-2">{{
                  $t("minimumSelectionValue")
                }}</label>
                <Field
                  class="form-control form-control-lg form-control-solid"
                  type="number"
                  name="minimumSelectionValue"
                  autocomplete="off"
                  v-model="form.minimumSelectionValue"
                  min="0" />
                <!--end::Input-->

                <ErrorMessage name="minimumSelectionValue" />
              </div>
              <!--end::order -->
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
                <tabs-duplicator :items="langs" @selectedItem="setSelectedItem">
                  <template #label="{ item }">
                    {{ item.label }}
                  </template>
                </tabs-duplicator>
                <div class="fields">
                  <div>
                    <div class="inputs_fields my-3">
                      <div v-for="(item, i) in form.resources" :key="i">
                        <div v-show="item.languageId == selectedItem.id">
                          <Field
                            v-model="form.resources[i].name"
                            
                            :name="`form.resources[${i}].name`"
                            type="text"
                            v-slot="{ field, meta }">
                            <input
                              v-bind="field"
                              
                              type="text"
                              class="form-control form-control-solid form-control-lg"
                              :class="{
                                'is-valid': meta.valid,
                                'is-invalid': meta.validated && !meta.valid,
                              }" />
                          </Field>
                          <ErrorMessage
                            :name="`form.resources[${i}].name`"
                            class="text-danger">
                          </ErrorMessage>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card card-flush py-4">
            <div class="card-header">
              <!--begin::Card title-->
              <div class="card-title">
                <h2>{{ $t("shops") }}</h2>
              </div>
              <!--end::Card title-->
            </div>

            <div class="card-body pt-0">
              <!--begin::Connected Shops-->
              <div class="col-12 mt-5">
                <label class="required fs-5 fw-bold mb-2 d-inline">{{
                  $t("connectedShops")
                }}</label>
                <Field
                  name="connectedShops"
                  type="text"
                  v-slot="{ field, value }">
                  <el-select
                    v-model="form.connectedShops"
                    v-bind="field"
                    :mode-value="value"
                    class="w-100 form-control-solid border-0"
                    multiple>
                    <el-option
                      v-for="item in marketShops"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </Field>
                <ErrorMessage
                  class="text-danger"
                  name="connectedShops"></ErrorMessage>
              </div>
              <!--end::Connected Shops-->

              <!--begin::Connected Products-->
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
                      class="border-1 mx-4">
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
                      <Field
                        name="connectedProduct"
                        type="text"
                        v-slot="{ field, value }">
                        <!-- :remote-method="getProducts" -->
                        <el-select
                          class="w-100 form-control-solid border-0"
                          v-model="connectedProductsSelect"
                          multiple
                          filterable
                          remote
                          reserve-keyword
                          :placeholder="$t('enterKeyword')"
                          value-key="id"
                          :remote-method="getProducts">
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
                            ">
                            <img
                              :src="item.thumbnail"
                              style="
                                object-fit: cover;
                                height: 35px;
                                width: 35px;
                              "
                              class="rounded"
                              alt="" />
                            <span class="mx-2">{{ item.name }}</span>
                            <span
                              class="mx-2 text-danger"
                              v-if="
                                connectedProductsResult.some(
                                  (p) => p.id == item.id
                                )
                              "
                              >Already Selected</span
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
                        type="button">
                        <span class="indicator-label">{{ $t("save") }} </span>
                      </button>
                    </div>

                    <label>{{ $t("connectedProducts") }}</label>
                    <el-table
                      :data="connectedProductsResult"
                      class="tag-products w-100 pt-4">
                      >
                      <el-table-column width="100" :label="$t('thumbnail')">
                        <template #default="scope">
                          <div class="d-flex align-items-center">
                            <img
                              :src="scope.row.thumbnail"
                              style="
                                object-fit: cover;
                                height: 35px;
                                width: 35px;
                              "
                              class="rounded"
                              alt="" />
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
                            class="form-control w-100 form-control-solid form-control-lg" />
                        </template>
                      </el-table-column>
                      <el-table-column
                        :label="$t('actions')"
                        align="right"
                        width="70">
                        <template #default="scope">
                          <a
                            @click="removeProduct(scope.row.id)"
                            class="btn btn-icon btn-danger-light btn-active-color-danger btn-sm">
                            <span class="svg-icon svg-icon-1">
                              <inline-svg
                                src="/media/icons/duotune/general/gen027.svg" />
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
                      background>
                    </el-pagination>
                  </div>
                </div>
              </div>
              <!--end::Connected Products-->
            </div>
          </div>

          <div class="card card-flush py-4">
            <!--begin::Card header-->
            <div class="card-header">
              <!--begin::Card title-->
              <div class="card-title">
                <h2>{{ $t("modifierItem") }}</h2>
              </div>
              <!--end::Card title-->
            </div>

            <div class="card-body pt-0">
              <div class="col-12 mt-5">
                <div
                  v-for="(groupItem, index) in form.modifierGroupItems"
                  :key="index">
                  <!--begin:: Resources-->
                  <div class="col-12 my-3">
                    <tabs-duplicator
                      :items="langs"
                      @selectedItem="setselectedItemgroup">
                      <template #label="{ item }">
                        {{ item.label }}
                      </template>
                    </tabs-duplicator>
                    <div class="fields">
                      <div>
                        <div class="inputs_fields my-3">
                          <div
                            v-for="(item, i) in groupItem.resources"
                            :key="i">
                            <div
                              v-show="item.languageId == selectedItemgroup.id">
                              <Field
                                v-model="groupItem.resources[i].name"
                                :name="`form.modifierGroupItems[${index}].resources[${i}].name`"
                                type="text"
                                v-slot="{ field, meta }"
                                :label="`Product Modifier Name$`">
                                <input
                                  v-bind="field"
                                  :dir="selectedItemgroup.dir"
                                  type="text"
                                  class="form-control form-control-solid form-control-lg"
                                  :class="{
                                    'is-valid': meta.valid,
                                    'is-invalid': meta.validated && !meta.valid,
                                  }" />
                              </Field>
                              <ErrorMessage
                                :name="`form.modifierGroupItems[${index}].resources[${i}].name`"
                                class="text-danger">
                              </ErrorMessage>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--end::Input-->
                  <div class="fv-row mb-10">
                    <div class="form-check form-check-solid mx-5">
                      <input
                        :key="index"
                        class="form-check-input"
                        v-model="groupItem.selected"
                        type="checkbox"
                        @change="check($event, groupItem)"
                        checked=""
                        data-kt-check="false" /><label
                        class="form-check-label ps-2">
                        {{ $t("Selected") }}
                      </label>
                    </div>
                  </div>
                  <!--start::Price-->
                  <div class="row mb-10">
                    <div class="col-md-6 fv-row">
                      <tabs-duplicator
                        :items="Currency"
                        @selectedItem="setselectedItemgroupCurrency">
                        <template #label="{ item }">
                          {{ item.label }}
                        </template>
                      </tabs-duplicator>
                      <div class="fields">
                        <div>
                          <div class="inputs_fields my-3">
                            <div v-for="(item, i) in groupItem.prices" :key="i">
                              <div
                                v-show="
                                  item.currencyId ==
                                  selectedItemgroupCurrency.id
                                ">
                                <Field
                                  v-model="groupItem.prices[i].price"
                                  :name="`form.modifierGroupItems[${index}].prices[i].price`"
                                  type="text"
                                  v-slot="{ field, meta }"
                                  :label="`Product Modifier Name$`">
                                  <input
                                    v-bind="field"
                                    :dir="selectedItemgroupCurrency.dir"
                                    type="number"
                                    min="0"
                                    class="form-control form-control-solid form-control-lg"
                                    :class="{
                                      'is-valid': meta.valid,
                                      'is-invalid':
                                        meta.validated && !meta.valid,
                                    }" />
                                </Field>
                                <ErrorMessage
                                  :name="`form.modifierGroupItems[${index}].prices[i].price`"
                                  class="text-danger">
                                </ErrorMessage>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 fv-row order">
                      <label class="required fs-5 fw-bold mb-2 d-inline">{{
                        $t("order")
                      }}</label>

                      <Field
                        class="form-control form-control-lg form-control-solid"
                        type="number"
                        :name="`form.modifierGroupItems[${index}].order`"
                        autocomplete="off"
                        v-model="groupItem.order"
                        min="0" />
                      <!--end::Input-->
                      <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                          <ErrorMessage
                            :name="`form.modifierGroupItems[${index}].order`" />
                        </div>
                      </div>
                    </div>

                    <!--end::Input-->
                  </div>
                  <div class="fv-row mb-10">
                    <button
                      v-if="index != 0"
                      type="button"
                      class="btn btn-lg btn-secondary"
                      @click="removeItem(index)">
                      {{ $t("remove") }}
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn btn-lg btn-primary add-another-item"
                  @click="addnewItem()">
                  {{ $t("addAnotherItem") }}
                  <inline-svg src="/media/icons/duotune/arrows/arr075.svg" />
                </button>
              </div>
            </div>
          </div>

          <div class="d-flex w-100 justify-content-end">
            <button class="btn btn-light" type="button" @click="$router.go(-1)">
              {{ $t("goBack") }}
            </button>
            <button class="btn btn-primary" type="submit">
              {{ $t("save") }}
            </button>
          </div>
        </div>
        <!--end::main column-->

        <!--begin::group button-->

        <!--end::group button-->
      </Form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { ref, defineProps, computed, reactive, onMounted } from "vue";
import { Actions } from "@/store/enums/StoreEnums";
import { string } from "yup";
import { productModifiers, ModifiersItem } from "@/types";
import { Form, Field } from "vee-validate";
import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";
import * as yup from "yup";
import Swal from "sweetalert2";

import i18n from "@/core/plugins/i18n";

//                                             Variables and Getters Init
const store = useStore();
let props = defineProps({
  id: string,
});
const codeLoading = ref<boolean>(false);
const marketShops = computed(() => store.getters.getMarketData.shops);
const Currency = computed(() => store.getters.getSupportedCurrencies);
const langs = computed(() => store.getters.getSupportedLanguages);
const productsLoading = ref<boolean>(false);
const ProductModifiers = computed(
  () => store.state.ProductModifiers.productModifier
);
const connectedProductsSelect = ref([]);
const selectedItem = ref();
const selectedItemgroup = ref();
const selectedItemgroupCurrency = ref();

onMounted(() => {
  if (langs.value && langs.value.length > 0) {
    // initResources();
    selectedItem.value = langs.value[0];
    selectedItemgroup.value = langs.value[0];
    selectedItemgroupCurrency.value = Currency.value[0];
  }
});

// const modifierGroupItems = computed(
//   () => store.state.ProductModifiers.ProductModifiers.modifierGroupItems
// );
const keyword = ref("");
const productsList = computed(() => store.state.ProductModifiers.products);

const localPagination = reactive({ pageNumber: 1, pageSize: 5 });
const connectedProducts = computed(
  () => store.state.ProductModifiers.connectedProducts
);
//Validation Unique Code
const isValidCodeUpdate = computed(() => {
  return store.state.ProductModifiers.isValidCodeUpdate;
});
const validMessageCode = computed(() => {
  return store.state.ProductModifiers.messageIsValidCode;
});
function checkValueCode(e) {
  codeLoading.value = true;
  if (e.target.value.length > 3) {
    store
      .dispatch(Actions.IS_VALID_CODE_PRODUCT_MODIFIER, {
        id: 0,
        code: e.target.value,
      })
      .then(() => {
        codeLoading.value = false;
      });
  }
}
// Get Product Modifier By Id
const getData = (id) => {
  store
    .dispatch(Actions.GET_PRODUCT_Modifiers_BY_ID, id)
    .then((data: productModifiers) => {
      form.value = data;
    });
};
getData(props.id);

// get connectedProduct List

function saveProducts() {
  store
    .dispatch(Actions.ADD_PRODUCTS_TO_MODIFIER, {
      id: props.id,
      connectedProducts: connectedProductsSelect.value,
    })
    .then(() => {
      connectedProductsSelect.value = [];
    });
}
function removeProduct(id) {
  store.dispatch(Actions.REMOVE_PRODUCTS_FOMR_MODIFIER, {
    id: props.id,
    connectedProducts: [id],
  });
}
function getProducts(qury) {
  productsLoading.value = true;
  store
    .dispatch(Actions.SEARCH_PRODUCTS, {
      query: qury,
    })
    .then(() => {
      productsLoading.value = false;
    });
}
function getConnectedProducts() {
  store.dispatch(Actions.GET_MODIFIER_PRODUCTS, props.id);
  // .then((data: connectedProducts) => {

  //   // selectedItem.value = form.value.resources[0];
  // });
}
// local pagination
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

// initial lang and price
const getlang = () => {
  let resource: { name: string; languageId: string }[] = [];
  langs.value.forEach((el) => {
    resource.push({ languageId: el.id, name: "" });
  });
  return resource;
};
const getPrice = () => {
  let ArrayPrices: { currencyId: string; price: string }[] = [];
  Currency.value.forEach((el) => {
    ArrayPrices.push({
      currencyId: el.id,
      price: "",
    });
  });
  return ArrayPrices;
};
// initial form
let form = ref<productModifiers>({
  code: "",
  icon: "",
  id: "",
  name: "",
  shops: [],
  numberOfConnectedProducts: 0,
  numberOfConnectedShops: 0,
  order: 0,
  resources: [],
  modifierGroupItems: [],
});

// get selectedItem for tabsDuplicator

const setselectedItemgroup = (payload: any) => {
  selectedItemgroup.value = payload;
};
const setselectedItemgroupCurrency = (payload: any) => {
  selectedItemgroupCurrency.value = payload;
};
const setSelectedItem = (payload: any) => {
  selectedItem.value = payload;
};

const submitButton = ref<HTMLButtonElement | null>(null);

// Remove and Add new Item to ModifierGroup
const removeItem = (index) => {
  form.value.modifierGroupItems.splice(index, 1);
};
const addnewItem = (i) => {
  form.value.modifierGroupItems.push({
    order: 0,
    selected: true,

    resources: getlang(),
    prices: getPrice(),
  });
};

// check time selected item in modifierGroup
const check = (e, item) => {
  const currentDate = new Date();
  item.timeStamp = currentDate.getTime();
};

//Create form validation object
const schema = yup.object({
  code: yup
    .string()
    .min(4, i18n.global.t("codeNotValid"))
    .required(i18n.global.t("fieldRequired")),
  order: yup.number().required(i18n.global.t("fieldRequired")),
  connectedShops: yup
    .array()
    .of(yup.number())
    .required(i18n.global.t("fieldRequired")),
  resources: yup.array().of(
    yup.object().shape({
      name: yup.string().required(i18n.global.t("fieldRequired")),
      languageId: yup.string(),
    })
  ),
});

// Verify that the value specified in ProductModifiers.maximumSelectionValue has not been exceeded
const getSelectionNumber = () => {
  let countSelection = 0;
  console.log(ProductModifiers.value.maximumSelectionValue);
  ProductModifiers.value.modifierGroupItems.forEach((el) => {
    if (el.selected) {
      countSelection++;
    }
  });
  console.log("countSelection", countSelection);
  console.log(
    "ProductModifiers.value.maximumSelectionValue",
    ProductModifiers.value.maximumSelectionValue
  );
  if (countSelection > ProductModifiers.value.maximumSelectionValue) {
    let selectedItemArray = [];
    console.log("ohno");
    console.log(ProductModifiers.value.modifierGroupItems);
    console.log("countSelection", countSelection);
    ProductModifiers.value.modifierGroupItems.forEach((el) => {
      if (el.selected) {
        selectedItemArray.push(el);
      }
    });

    let min = selectedItemArray.reduce((prev, curr) =>
      prev.timeStamp < curr.timeStamp ? prev : curr
    );
    selectedItemArray = [];
    console.log("min", min);
    ProductModifiers.value.modifierGroupItems.forEach((el) => {
      if (el.id == min.id) {
        console.log("el", el);
        el.selected = false;
        return;
      }
    });
    getSelectionNumber();
  } else {
    return true;
  }
};

function submit() {
  if (getSelectionNumber()) {
    store.dispatch(Actions.UPDATE_MODIFIERS, form.value);
  } else {
    let name = [];
    ProductModifiers.value.modifierGroupItems.forEach((el) => {
      if (el.selected) {
        name.push(el.resources[0].name);
      }
    });

    Swal.fire({
      icon: "success",
      html: `You Have Selecetd  <span style='color:#04c8c8'> ${name}</span> .`,
      buttonsStyling: false,
      confirmButtonText: i18n.global.t("ok"),
      cancelButtonText: i18n.global.t("cancel"),
      customClass: {
        confirmButton: "btn fw-bold btn-light-primary",
      },
    }).then((status) => {
      if (status.isConfirmed) {
        store.dispatch(Actions.UPDATE_MODIFIERS, form.value);
      }
    });
  }
}

getConnectedProducts();
//                                              SETUP FUNCTIONS EXECUTION
</script>

<style lang="scss">
.el-input {
  border-radius: 0.625rem;
}

.el-input__inner {
  border-radius: 0.625rem;
  background-color: #f5f8fa;
  height: 45px;
  border: none;
}
.col-md-6.fv-row.order {
  margin-top: 30px;
}
</style>
