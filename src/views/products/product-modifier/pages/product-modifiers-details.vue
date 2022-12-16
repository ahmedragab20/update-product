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
               <!--begin::Array Modifier Group Items-->
               <div
                  v-if="form.modifierGroupItems && form.modifierGroupItems.length > 0"
                  class="mt-5"
                >
                  <section>
                    <div
                      class="d-flex justify-content-between gap-1 align-items-center flex-wrap"
                    >
                      <label class="form-label">Modifiers Group items</label>
                      <div>
                        <button
                          @click="toggleAddGroupItemDialog"
                          type="button"
                          class="btn btn-sm bg-light-primary text-primary btn-hover-rise rounded-pill"
                        >
                          + Add new modifier group item
                        </button>
                      </div>
                    </div>
             
                    <table class="table gs-3 gy-3 gx-5">
                      <thead>
                        <tr
                          class="fw-bold fs-5 text-gray-800 border-bottom border-gray-200 text-capitalize"
                        >
                          <th class="text-truncate">#</th>
                          <th class="text-truncate">name</th>
                          <th class="text-truncate">price</th>
                          <th class="text-truncate">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item, index) in form.modifierGroupItems"
                          :key="item.id"
                        >
                          <td class="text-truncate">
                            <div class="td-holder" v-text="index + 1" />
                          </td>
                          <td class="text-truncate">
                            <div
                              class="td-holder"
                              v-text="item.resources[0].name"
                              :title="item.resources[0].name"
                            />
                          </td>
                          <td class="text-truncate">
                            <div
                              class="td-holder"
                              v-text="item.prices[0].price"
                            />
                          </td>
                          <td>
                            <div class="td-holder gap-2">
                              <button
                                type="button"
                                class="btn btn-sm btn-bg-light rounded-pill btn-text-info me-2"
                                title="edit"
                                @click="
                                  setClickedModifier(item),
                                    toggleAddGroupItemDialog()
                                "
                              >
                                <i
                                  class="bi bi-pencil-square text-info"
                                  style="font-size: 1rem"
                                ></i>
                              </button>
                              <button
                                type="button"
                                class="btn btn-sm btn-bg-light rounded-pill btn-text-danger"
                                title="remove"
                                @click="removeModifier(item.id)"
                              >
                                <i
                                  class="bi bi-trash3 text-danger"
                                  style="font-size: 1rem"
                                ></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </section>
                </div>
                <div v-else class="mt-5">
                  <button
                    @click="toggleAddGroupItemDialog"
                    type="button"
                    class="btn bg-light-success text-primary btn-hover-rise btn-sm mb-5"
                  >
                    + Add modifier group item
                  </button>
                  <span class="text-danger row">
                    {{ $t("modifires must have one option at least") }}
                  </span>
                </div>
                <el-dialog
                  class="modal fade"
                  v-model="groupItemDialog"
                  :title="
                    !clickedModifier
                      ? 'Add Group Item Modifier'
                      : clickedModifier.resources[0].name
                  "
                  :width="screenDimensions().availWidth > 480 ? '480px' : '95%'"
                  top="5vh"
                >
                  <template #default>
                    <section
                      style="
                        max-height: 70vh;
                        overflow: auto;
                        overflow-x: hidden;
                      "
                    >
                      <div>
                        <div>
                          <div>
                            <label
                              for="modifierItem1Name"
                              class="form-label mb-0 mt-3"
                            >
                              Name
                            </label>
                            <tabs-duplicator
                              v-if="langs && langs.length > 0"
                              :items="langs"
                              @selectedItem="setselectedItemgroup"
                            >
                              <template #label="{ item }">
                                {{ item.label }}
                              </template>
                            </tabs-duplicator>
                            <input
                              type="text"
                              id="modifierItem1Name"
                              class="form-control mt-2"
                              placeholder="Modifier Name"
                              v-model="
                                itemInstance.resources[selectedItemgroup.id]
                              "
                            />
                          </div>

                          <div>
                            <label
                              for="modifierItem1Price"
                              class="form-label mb-0 mt-3"
                            >
                              Price
                            </label>
                            <tabs-duplicator
                              v-if="Currency && Currency.length > 0"
                              :items="Currency"
                              @selectedItem="setselectedItemgroupCurrency"
                              class="mb-3"
                            >
                              <template #label="{ item }">
                                <span>
                                  {{ item.label }}
                                </span>
                              </template>
                            </tabs-duplicator>
                            <input
                              type="number"
                              id="modifierItem1Price"
                              class="form-control"
                              placeholder="Modifier Price"
                              v-model="
                                itemInstance.prices[
                                  selectedItemgroupCurrency.id
                                ]
                              "
                            />
                          </div>

                          <div>
                            <label
                              for="modifierItem1Order"
                              class="form-label mb-0 mt-3"
                            >
                              Order
                            </label>
                            <input
                              type="number"
                              id="modifierItem1Order"
                              class="form-control"
                              placeholder="Modifier Order"
                              v-model="itemInstance.order"
                            />
                          </div>

                          <div class="separator my-5 border-3 rounded-pill" />

                          <div>
                            <div class="form-check form-check-solid">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                @change="check($event, itemInstance)"
                                value=""
                                id="isSelectedModifier"
                                v-model="itemInstance.selected"
                              />
                              <label class="form-check-label ps-2">
                                Selected
                              </label>
                            </div>
                          </div>
                        </div>
                        <div class="mt-7">
                          <button
                            v-if="!clickedModifier"
                            type="button"
                            class="btn btn-primary btn-text-white btn-hover-rise shadow-sm"
                            :disabled="!isAddModifierGroupFormValid"
                            @click="pushNewModifierGroupItems"
                          >
                            Submit Data
                          </button>
                          <button
                            v-else
                            type="button"
                            class="btn btn-primary btn-text-white btn-hover-rise shadow-sm"
                            :disabled="!isAddModifierGroupFormValid"
                            @click="editModifierGroupItem"
                          >
                            Edit Data
                          </button>
                        </div>
                      </div>
                    </section>
                  </template>
                </el-dialog>
            </div>
          </div>

          <div class="d-flex w-100 justify-content-end">
            <button class="btn btn-light" type="button" @click="$router.go(-1)">
              {{ $t("goBack") }}
            </button>
            <button
                      :disabled="!isSubmitAllValid"
                      type="submit"
                      ref="submitButton"
                      class="btn btn-lg btn-primary addproduct"
                    >
                      <span v-if="!isLoading">
                        {{ $t("update") }}
                        <span class="fas fa-plus"></span>
                      </span>
                      <span v-if="isLoading" class="indicator-progress d-block">
                        {{ $t("wait") }}
                        <span
                          class="spinner-border spinner-border-sm align-middle ms-2"
                        />
                      </span>
                    </button>
          </div>
        </div>
     
        <!--end::group button-->
      </Form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { ref, defineProps, computed, reactive, onMounted,unref } from "vue";
import { Actions } from "@/store/enums/StoreEnums";
import { string } from "yup";
import { productModifiers, ModifiersItem } from "@/types";
import { Form, Field } from "vee-validate";
import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";
import * as yup from "yup";
import Swal from "sweetalert2";
import { uuid } from "vue-uuid";
import i18n from "@/core/plugins/i18n";

//     
interface screenDimensionsObject {
  availHeight: number;
  availWidth: number;
}
const screenDimensions = (): screenDimensionsObject => {
  const availWidth = window.innerWidth;
  const availHeight = window.innerHeight;

  return { availWidth, availHeight };
};
const store = useStore();
let props = defineProps({
  id: string,
});
// initial form
let form = ref<productModifiers>({
  code: "",
  icon: "",
  id: "",
  name: "",
  connectedShops: [],
  numberOfConnectedProducts: 0,
  numberOfConnectedShops: 0,
  order: 0,
  resources: [],
  modifierGroupItems: [],
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

const isLoading = ref(false);
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
const pushNewModifierGroupItems = () => {
  const item = unref(itemInstance.value);
  let resources: any[] = [];
  let prices: any[] = [];

  Object.keys(item.resources).forEach((langId: any) => {
    resources.push({
      languageId: langId,
      name: item.resources[langId],
    });
  });
  Object.keys(item.prices).forEach((currencyId: any) => {
    prices.push({
      currencyId: currencyId,
      price: item.prices[currencyId],
    });
  });

  form.value.modifierGroupItems.push({
    id: uuid.v4(),
    selected: item.selected,
    order: item.order,
    prices,
    resources,
    timeStamp: item.timeStamp,
  });

  toggleAddGroupItemDialog();
  itemInstance.value = {
    resources: {},
    prices: {},
    order: null,
    timeStamp: 0,
    selected: false,
    image: "",
  };
};
const removeModifier = async (id) => {
  try {
    Swal.fire({
      title: i18n.global.t("alertText"),
      text: i18n.global.t("deleteModifierAlertText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: i18n.global.t("cancel"),
      confirmButtonText: i18n.global.t("yesSure"),
    }).then((status) => {
      if (status.isConfirmed) {
        
        form.value.modifierGroupItems =   form.value.modifierGroupItems.filter(
          (i) => i.id !== id
        );
        
        toggleConfirmationDialog({ id: null, array: "" });
      }
    });
  } catch (error) {
 
    console.error(error);
  } 
};
const editModifierGroupItem = () => {
  if (clickedModifier.value) {
    const item = unref(itemInstance);
    let resources: any[] = [];
    let prices: any[] = [];

    let targeted = form.value.modifierGroupItems.find(
      (el: any) => el.id === clickedModifier.value.id
    );

    Object.keys(item.resources).forEach((langId: any) => {
      resources.push({
        languageId: langId,
        name: item.resources[langId],
      });
    });
    Object.keys(item.prices).forEach((currencyId: any) => {
      prices.push({
        currencyId: currencyId,
        price: item.prices[currencyId],
      });
    });

    targeted.order = item.order;
    targeted.selected = item.selected;
    targeted.resources = resources;
    targeted.prices = prices;

    toggleAddGroupItemDialog();
  }
};
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


const groupItemDialog = ref(false);
const confirmationDialog = ref(false);
const clickedModifier = ref();
const setClickedModifier = (item) => {
  clickedModifier.value = item;

  itemInstance.value.timeStamp = item.timeStamp;
  itemInstance.value.order = item.order;
  itemInstance.value.selected = item.selected;

  item.resources?.forEach((el) => {
    itemInstance.value.resources[el.languageId] = el.name;
  });
  item.prices?.forEach((el) => {
    itemInstance.value.prices[el.currencyId] = el.price;
  });
};
const targetRemovedDetails = ref({
  id: null,
  array: "",
});
const toggleConfirmationDialog = (info) => {

targetRemovedDetails.value = info;

confirmationDialog.value = !confirmationDialog.value;
};
const toggleAddGroupItemDialog = () => {
  groupItemDialog.value = !groupItemDialog.value;
};

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
const isAddModifierGroupFormValid = computed(() => {
  const item = unref(itemInstance.value);
  const langValid = Object.keys(item.resources).length === langs.value?.length;
  const priceValid = Object.keys(item.prices).length === Currency.value?.length;
  const isOrderValid = !!item.order && typeof +item.order === "number";

  return langValid && priceValid && isOrderValid;
});

const submitButton = ref<HTMLButtonElement | null>(null);



// check time selected item in modifierGroup
const check = (e, item) => {
  item.timeStamp = e.timeStamp;
};

const itemInstance = ref({
  resources: {},
  prices: {},
  order: null,
  selected: false,
  image: "",
  timeStamp: 0,
});
const isSubmitAllValid = computed(() => {
  const langValid =
    Object.keys(form.value.resources).length === langs.value?.length;
  const selectedShops = form.value.connectedShops.length > 0;
  const code = form.value.code;
  const order = form.value.order;
console.log('langValid',langValid)
  const groupItems = form.value.modifierGroupItems.length > 0;

  return langValid && selectedShops && code && order && groupItems;
});

// Verify that the value specified in ProductModifiers.maximumSelectionValue has not been exceeded
const getSelectionNumber = () => {
  let countSelection = 0;
 
  ProductModifiers.value.modifierGroupItems.forEach((el) => {
    if (el.selected) {
      countSelection++;
    }
  });
 
  if (countSelection > ProductModifiers.value.maximumSelectionValue) {
    let selectedItemArray =[] as any;
    ProductModifiers.value.modifierGroupItems.forEach((el) => {
      if (el.selected) {
        selectedItemArray.push(el);
      }
    });

    let min = selectedItemArray.reduce((prev, curr) =>
      prev.timeStamp < curr.timeStamp ? prev : curr
    );
 
    ProductModifiers.value.modifierGroupItems.forEach((el) => {
      if (el.id == min.id) {
     
        el.selected = false;
       
      }
    });
    getSelectionNumber();
  } else {
    return true;
  }
};

function submit() {
  isLoading.value = true;
  if (getSelectionNumber()) {
    isLoading.value = true;
    store.dispatch(Actions.UPDATE_MODIFIERS, form.value).then(() => {
          isLoading.value = false;
    })
  } else {
    let name = [] as any;
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
        isLoading.value = true;
        store.dispatch(Actions.UPDATE_MODIFIERS, form.value).then(() => {
          isLoading.value = false;
    })
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
