<template>
  <div>
    <div class="d-flex flex-column gap-7 gap-xl-10">
      <!--begin::General resources-->
      <div class="card card-flush py-4">
        <!--begin::Card header-->
        <div class="card-header">
          <div class="card-title">
            <h2>General</h2>
          </div>
        </div>
        <!--end::Card header-->
        <!--begin::Card body-->
        <div v-if="!editorMounting" class="card-body pt-0">
          <Editor v-if="langs">
            <template #upper>
              <tabs-duplicator :items="langs" @selectedItem="setSelectedLang">
                <template #label="{ item }">
                  <span>
                    {{ item.label }}
                  </span>
                </template>
              </tabs-duplicator>
            </template>
            <template #fields>
              <keep-alive>
                <div
                  v-for="(field, $fieldIndex) in langs"
                  :key="$fieldIndex"
                  dir="auto"
                >
                  <div :dir="field.label === 'العربية' ? 'rtl' : 'auto'">
                    <InputField
                      v-if="selectedLang && field.id === selectedLang.id"
                      v-model="product[`name-${selectedLang.id}`]"
                      :isRequired="true"
                      :label="
                        field.label === 'العربية'
                          ? 'أسم المنتج'
                          : 'Product name'
                      "
                      styles="text-capitalize my-8"
                      @input="editor_info"
                    />
                    <div v-for="(n, $index) in 3" :key="$index" class="my-3">
                      <QuillEditor
                        v-if="selectedLang && field.id === selectedLang.id"
                        v-model:content="product[activeResourceEditor(n)]"
                        :placeholder="editors[$index]"
                        :toolbar="editorOptions.toolbar"
                        contentType="html"
                        @input="editor_info(n)"
                      />
                    </div>
                  </div>
                </div>
              </keep-alive>
            </template>
          </Editor>
          <div v-if="editorErrorMsg" class="my-4">
            <span class="fw-bold text-danger">
              <i class="bi bi-cone text-danger"></i>
              {{ editorErrorMsg }}
            </span>
          </div>
          <SaveChangeBtn
            :btn-reverse-submit="reverseEditorChanges"
            :btnSubmit="saveEditorChange"
            :elChanged="editorChanged"
            :elLoading="editorLoading"
            :fullWidth="true"
            :no-cancel="true"
            :payload="product"
          />
        </div>
        <div
          v-else
          class="p-5 d-flex justify-content-center align-items-center"
        >
          <img src="@/assets/content-loading.gif" width="300" />
        </div>
        <!--end::Card header-->
      </div>
      <!--end::General resources-->
      <!--begin::Media-->
      <div class="card card-flush py-4">
        <!--begin::Card header-->
        <Media
          v-if="props.product"
          :media="props.product.media"
          :productId="props.product.id"
        />
        <!--end::Card header-->
      </div>
      <!--end::Media-->
      <!--begin::Pricing-->
      <div class="card card-flush py-4">
        <!--begin::Card header-->
        <div class="card-header">
          <div class="card-title">
            <h2>Pricing</h2>
          </div>
        </div>

        <!--end::Card header-->
        <!--begin::Card body-->
        <div class="card-body pt-0">
          <div class="mb-3">
            <tabs-duplicator
              :items="currencies"
              @selectedItem="setSelectedCurrency"
            >
              <template #label="{ item }">
                <span class="text-nowrap">
                  {{ item.label }}
                </span>
              </template>
            </tabs-duplicator>
          </div>
          <!--begin::Input group-->
          <div
            v-if="selectedCurrency"
            class="mb-10 fv-row fv-plugins-icon-container"
          >
            <div>
              <!--begin::Label-->
              <label class="required form-label">Base Price</label>
              <!--end::Label-->
              <!--begin::Input-->
              <input
                v-model.number="prices[`price-${selectedCurrency.id}`]"
                class="form-control mb-2"
                name="price"
                placeholder="Product base price"
                type="number"
                @input="pricingStatus = true"
              />
              <!--end::Input-->
              <!--begin::Description-->
              <div class="text-muted fs-7">Set the product price.</div>
              <!--end::Description-->
              <div class="fv-plugins-message-container invalid-feedback"></div>
            </div>
            <div>
              <!--begin::Label-->
              <label class="required form-label">Cost Price</label>
              <!--end::Label-->
              <!--begin::Input-->
              <input
                v-model.number="prices[`costPrice-${selectedCurrency.id}`]"
                class="form-control mb-2"
                name="price"
                placeholder="Product cost price"
                type="number"
                @input="pricingStatus = true"
              />
              <!--end::Input-->
              <!--begin::Description-->
              <div class="text-muted fs-7">Set the product price.</div>
              <!--end::Description-->
              <div class="fv-plugins-message-container invalid-feedback"></div>
            </div>
          </div>
          <div
            v-if="pricingErrorMsg"
            class="card-body text-danger px-0 d-flex align-items-center gap-2"
          >
            <i class="bi bi-cone text-danger"></i>
            {{ pricingErrorMsg }}
          </div>
          <SaveChangeBtn
            :btn-reverse-submit="reversePricingChanges"
            :btnSubmit="pricingSaveChangesHandler"
            :elChanged="pricingStatus"
            :elLoading="isPricingLoading"
            :fullWidth="true"
          />
        </div>
        <!--end::Input group-->
      </div>
      <!--begin:: DISCOUNT-->
      <div class="card card-flush py-4">
        <div class="fv-row mb-10">
          <!--begin::Label-->
          <div class="card-title">
            <div class="card-header border-0">
              <div class="card-title">
                <h2>Discount</h2>
              </div>
            </div>
          </div>
          <!--end::Label-->

          <div class="card-body mt-0 py-0">
            <div class="d-flex justify-content-end gap-2">
              <a
                class="btn btn-light-primary btn-sm rounded"
                data-bs-target="#add-discount-modal"
                data-bs-toggle="modal"
                href="#"
              >
                + Add new discount
              </a>
            </div>
            <BootstrapModal
              :btnSubmit="discountSaveChangesHandler"
              btnText="Save Changes"
              headline="Add Discount"
              target="add-discount-modal"
              :is-loading="isDiscountLoading"
              :btn-disabled="!isDiscountFormValid"
            >
              <template #content>
                <div v-if="selectedDiscountCurrency">
                  <div class="card-body p-0 px-sm-10 py-1">
                    <Dropdown
                      :items="shops"
                      :multiSelect="true"
                      :outter-ids="selectedShopsIds"
                      bodyClasses="w-100 text-truncate text-capitalize"
                      headClasses="fw-bold p-3 rounded-3 shadow-sm text-capitalize btn-lg mb-3"
                      maxHeight="200px"
                      @selectedItem="shopsDropdownSelectedItems"
                    >
                      <template #headerContent="{ item }">
                        <span
                          class="d-flex justify-content-between align-items-center"
                        >
                          <span class="w-100 text-truncate"> select shop </span>
                          <strong>
                            <i
                              :class="
                                item.isOpened ? 'bi-arrow-up' : 'bi-arrow-down'
                              "
                            ></i>
                          </strong>
                        </span>
                      </template>
                      <template #bodyContent="{ item }">
                        <div
                          :style="[
                            selectedShopsIds.includes(item.id)
                              ? 'background-color: #1bc5bd; color: #fff;'
                              : '',
                          ]"
                          class="px-sm-5 py-sm-3 px-3 py-1 w-100 d-flex justify-content-between align-items-center"
                          @click="selectedShops(item)"
                        >
                          <div class="d-flex gap-2 align-items-center">
                            <img
                              :src="item.logoPath"
                              width="23"
                              height="23"
                              style="object-fit: cover"
                              class="rounded-circle"
                            />
                            <span>
                              {{ item.name || "unknown" }}
                            </span>
                          </div>
                          <i
                            v-if="selectedShopsIds.includes(item.id)"
                            class="bi bi-check text-white"
                            style="font-size: large"
                          ></i>
                        </div>
                      </template>
                    </Dropdown>
                    <!-- Tags -->
                    <div class="d-flex gap-3 flex-wrap">
                      <div
                        v-for="(item, $index) in finalShopsArray"
                        :key="$index"
                        class="badge badge-secondary"
                      >
                        <img
                          :src="item.logoPath"
                          width="20"
                          height="20"
                          style="object-fit: cover"
                          class="rounded-circle"
                        />
                        <span>{{ item.name || "unknown" }}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="selectedDiscountType"
                    class="card-body p-0 px-sm-10 py-1"
                  >
                    <div class="h4 fw-bold mb-5 required">Discount Type</div>
                    <Dropdown
                      :items="discountTypes"
                      bodyClasses="px-sm-5 py-sm-3 px-3 py-1 w-100 text-truncate text-capitalize"
                      headClasses="fw-bold p-3 rounded-3 shadow-sm text-capitalize btn-lg mb-8"
                      maxHeight="200px"
                      @selectedItem="setSelectedDiscountType"
                    >
                      <template #headerContent="{ item }">
                        <span
                          class="d-flex justify-content-between align-items-center"
                        >
                          {{ selectedDiscountType.value }}
                          <strong>
                            <i
                              :class="
                                item.isOpened ? 'bi-arrow-up' : 'bi-arrow-down'
                              "
                            ></i>
                          </strong>
                        </span>
                      </template>
                      <template #bodyContent="{ item }">
                        <span>
                          {{ item.value }}
                        </span>
                      </template>
                    </Dropdown>
                  </div>
                  <div>
                    <div
                      v-if="selectedDiscountType"
                      class="card-body p-0 px-sm-10 py-1"
                    >
                      <tabs-duplicator
                        class="mb-3"
                        :items="currencies"
                        @selectedItem="setSelectedDiscountCurrency"
                      >
                        <template #label="{ item }">
                          <span class="text-nowrap">
                            {{ item.label }}
                          </span>
                        </template>
                      </tabs-duplicator>

                      <input
                        v-if="selectedDiscountType.id === '1'"
                        v-model="discountPrices[selectedDiscountCurrency.id]"
                        class="form-control"
                        placeholder="input a percentage discount (%)"
                        type="number"
                      />
                      <input
                        v-if="selectedDiscountType.id === '2'"
                        v-model.number="
                          discountPrices[selectedDiscountCurrency.id]
                        "
                        class="form-control"
                        placeholder="input an Amount discount"
                        type="number"
                      />
                      <small class="text-muted fw-bold px-1"
                        >* the discount must be more than the base price!</small
                      >
                    </div>
                  </div>
                  <!-- Select Period -->
                  <div class="card-body p-0 py-1 px-0 px-sm-10 mx-auto mt-5">
                    <h4 class="fw-bold required">Discount Period</h4>
                    <div class="my-5">
                      <div class="d-flex gap-5 flex-wrap">
                        <div class="block w-100">
                          <el-date-picker
                            v-model="dateFrom"
                            class="w-100"
                            placeholder="Discount From"
                            size="large"
                          />
                        </div>
                        <div class="block w-100">
                          <el-date-picker
                            v-model="dateTo"
                            class="w-100"
                            placeholder="Discount to"
                            size="large"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- success message -->
                  <div
                    v-if="discountErrorMsg === 'nothing'"
                    class="card-body p-0 px-sm-10 py-1 text-success"
                  >
                    Done, you can close the modal now!😊
                  </div>
                  <!-- error message -->
                  <div
                    v-else-if="
                      discountErrorMsg && discountErrorMsg !== 'nothing'
                    "
                    class="card-body p-0 px-sm-10 py-1 text-danger"
                  >
                    {{ discountErrorMsg }}🙊
                  </div>
                </div>
              </template>
            </BootstrapModal>

            <!-- discount table -->
            <tabs-duplicator
              :items="discountTable"
              @selectedItem="setSelectedDiscountTable"
              :activeTabDesign="
                selectedDiscountTableType &&
                selectedDiscountTableType.id === 'deactivated-discount'
                  ? 'btn-danger'
                  : 'btn-primary'
              "
              class="mb-3 py-3"
            >
              <template #label="{ item }">
                <span v-text="item.label" />
              </template>
            </tabs-duplicator>

            <discount-table
              v-if="selectedDiscountTableType && !!selectedDiscountTableType.id"
              :productId="props.product.id"
              :items="
                selectedDiscountTableType &&
                selectedDiscountTableType.id === 'active-discount'
                  ? activeDiscounts
                  : deactivatedDiscounts
              "
              :table-type="
                selectedDiscountTableType.id === 'active-discount'
                  ? 'active'
                  : 'inactive'
              "
              :deactivate-discount="deactivateDiscountAlert"
            />
            <!-- end discount table -->
          </div>
        </div>
        <!--end::Row-->
      </div>
      <!--begin::Countable product-->
      <CountableProduct :product="props.product" />
      <!--end::Countable product-->
      <!--begin::Downloadable product-->
      <DownloadableProduct :product="props.product" />
      <!--end::Downloadable product-->
      <!--begin::Input group-->
      <div
        id="kt_ecommerce_add_product_discount_fixed"
        class="d-none mb-10 fv-row"
      >
        <!--begin::Label-->
        <label class="form-label">Fixed Discounted Price</label>
        <!--end::Label-->
        <!--begin::Input-->
        <input
          class="form-control mb-2"
          name="dicsounted_price"
          placeholder="Discounted price"
          type="text"
        />
        <!--end::Input-->
        <!--begin::Description-->
        <div class="text-muted fs-7">
          Set the discounted product price. The product will be reduced at the
          determined fixed price
        </div>
        <!--end::Description-->
      </div>
      <!--end::Input group-->
      <!--begin::Tax-->
      <Tax :product="props.product" />
      <!--end:Tax-->
      <Inventory :product="props.product" />
      <!--end::Card header-->
    </div>
    <!--end::Pricing-->
  </div>
  <!--end::Card-->
</template>
<script lang="ts" setup>
import Api from "@/utils/ApiHelper";

import Editor from "@/components/Reusable/Editor.vue";
import InputField from "@/components/Reusable/InputField.vue";
import SaveChangeBtn from "./-SaveChangeBtn.vue";
import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";
import { reactive, ref } from "@vue/reactivity";
import Dropdown from "@/components/Reusable/Dropdown.vue";
import { computed, watch, watchEffect } from "@vue/runtime-core";
import { onBeforeMount, onMounted, unref } from "vue";
import DiscountTable from "./-DiscountTable.vue";
import Tax from "./-Tax.vue";
import Inventory from "./-Inventory.vue";
import { QuillEditor } from "@vueup/vue-quill";
import BootstrapModal from "@/components/Reusable/BootstrapModal.vue";
import { dateFormat, compareTwoDates, swalAlert } from "@/utils/helpers";
import Media from "./-Media.vue";
import { useStore } from "vuex";
import CountableProduct from "@/views/apps/e-commerce/EditProduct/-CountableProduct.vue";
import DownloadableProduct from "@/views/apps/e-commerce/EditProduct/-DownloadableProduct.vue";

const store = useStore();
const props = defineProps(["product", "currentTab"]);

/*THE BEGAN OF:: THE EDITOR LOGIC */

const langs = computed(() => {
  const allLanguages = store.state.LookupQueries?.languages?.data;
  const marketLanguages = store.state.MarketModule?.market?.languages;

  return allLanguages?.filter((lang) =>
    marketLanguages?.find((marketLangId) => marketLangId === lang.id)
  );
});
const editorMounting = ref(false);
const product = ref({});
const productData = ref({});

let selectedLang = ref();
const editorChanged = ref<any>(false);
const editorLoading = ref(false);
const editors = reactive([
  "short description",
  "long description",
  "purchase note",
]);
const editor_info = (length: number): void => {
  editorChanged.value = true;
};

const editorOptions = ref({
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ],
});

const setSelectedLang = (payload: any): void => {
  selectedLang.value = payload;
};

const activeResourceEditor = (index: number) => {
  langs.value?.forEach((lang): any => {
    product[`name-${lang.id}`] = productData.value[`name-${lang.id}`];
    if (index === 1) {
      editorChanged.value
        ? product.value[`shortDescription-${lang.id}`]
        : (product.value[`shortDescription-${lang.id}`] =
            productData.value[`shortDescription-${lang.id}`]);
    } else if (index === 2) {
      editorChanged.value
        ? product.value[`longDescription-${lang.id}`]
        : (product.value[`longDescription-${lang.id}`] =
            productData.value[`longDescription-${lang.id}`]);
    } else if (index === 3) {
      editorChanged.value
        ? product.value[`purchaseNote-${lang.id}`]
        : (product.value[`purchaseNote-${lang.id}`] =
            productData.value[`purchaseNote-${lang.id}`]);
    }
  });
  if (index === 1) return `shortDescription-${selectedLang.value.id}`;
  else if (index === 2) return `longDescription-${selectedLang.value.id}`;
  else if (index === 3) return `purchaseNote-${selectedLang.value.id}`;
};
const editorErrorMsg = ref("");

const saveEditorChange = async (content: any) => {
  editorLoading.value = true;

  let resourcesArr: any[] = [];

  langs.value.forEach((lang: any) => {
    resourcesArr.push({
      languageId: lang.id,
      name: product.value[`name-${lang.id}`],
      longDescription: content[`longDescription-${lang.id}`],
      purchaseNote: content[`purchaseNote-${lang.id}`],
      shortDescription: content[`shortDescription-${lang.id}`],
    });
  });

  const payload = {
    id: props.product.id,
    resources: resourcesArr,
  };
  const reqData = {
    method: "post",
    url: "/ProductCommands/update-product-resources",
    payload,
  };
  try {
    const { data }: any = await Api(reqData);

    if (!data.succeeded) editorErrorMsg.value = data.message;
    else editorChanged.value = "done";
  } catch (error) {
    console.error(error);
  } finally {
    editorLoading.value = false;
  }
};

const reverseEditorChanges = () => {
  product.value = {};
  const editorContext = document.querySelectorAll(".ql-editor");

  editorContext.forEach((el) => {
    el.textContent = "";
  });

  editorChanged.value = false;
};

const setEditorContent = () => {
  props.product?.resources?.forEach((resource: any) => {
    if (resource.name) {
      product.value[`name-${resource.languageId}`] = resource.name;
    }
    if (resource.longDescription) {
      productData.value[`longDescription-${resource.languageId}`] =
        resource.longDescription;
    }
    if (resource.purchaseNote) {
      productData.value[`purchaseNote-${resource.languageId}`] =
        resource.purchaseNote;
    }
    if (resource.shortDescription) {
      productData.value[`shortDescription-${resource.languageId}`] =
        resource.shortDescription;
    }
  });
  if (Object.keys(productData.value).length > 0) {
    product.value = {
      ...product.value,
      ...productData.value,
    };
  }
};
const currencies = computed(() => {
  const allCurrencies = store.state.LookupQueries.currencies?.data;
  const marketCurrencies = store.state.MarketModule.market?.currencies;

  return allCurrencies?.filter((currency) =>
    marketCurrencies?.find(
      (marketCurrencyId) => marketCurrencyId === currency.id
    )
  );
});
const selectedCurrency = ref();
const prices = ref({});
const setSelectedCurrency = (payload) => {
  selectedCurrency.value = payload;
};
const isPricingLoading = ref(false);
const pricingStatus = ref<boolean | string>(false);
const pricingErrorMsg = ref("");

const pricingSaveChangesHandler = async () => {
  isPricingLoading.value = true;

  let finalPrices: any = new Map();
  let finalPricesArr: any[] = [];
  currencies.value?.forEach((currency) => {
    Object.keys(prices.value).forEach((key) => {
      if (key.includes(currency.id.toString())) {
        finalPrices.set(currency.id, {
          currencyId: currency.id,
          price: prices.value[`price-${currency.id}`],
          costPrice: prices.value[`costPrice-${currency.id}`],
        });
      }
    });
  });
  const arr = Array.from(finalPrices, ([key, value]) => {
    return value;
  });
  finalPricesArr = arr;

  const payload = {
    id: props.product.id,
    prices: finalPricesArr,
  };

  const reqData = {
    method: "post",
    url: "/ProductCommands/update-product-pricing",
    payload,
  };

  try {
    const { data }: any = await Api(reqData);

    if (data?.succeeded) pricingStatus.value = "done";
    else pricingErrorMsg.value = data.message;
  } catch (error) {
    console.error(error);
  } finally {
    setTimeout(() => {
      isPricingLoading.value = false;
    }, 1000);
  }
};

const reversePricingChanges = () => {
  prices.value = {
    currencyId: "",
    price: "",
    costPrice: "",
  };

  pricingStatus.value = false;
};
/* THE END OF:: PRICING SECTIONS LOGIC */
/* DISCOUNT LOGIC */
const productDiscounts = ref<any[]>([]);
const dateFrom = ref<any>();
const dateTo = ref<any>();
const discountTypes = ref<any[]>([]);
const shops = computed(() => store.state.MarketModule.market?.shops);
const discountPrices = ref({});
const selectedDiscountType = ref<any>();
const selectedDiscountCurrency = ref();
const discountReqData = ref<any>({
  id: props.product.id,
  discount: {
    discountTypeId: "",
    discountPrices: [],
    startDateTime: "",
    endDateTime: "",
    shopIds: [],
  },
});
const activeDiscounts = ref<any[]>([]);
const deactivatedDiscounts = ref<any[]>([]);
const discountTable = ref([
  { id: "active-discount", label: "Active" },
  { id: "deactivated-discount", label: "Deactivated" },
]);
const selectedDiscountTableType = ref();
const setSelectedDiscountTable = (discount: any) => {
  selectedDiscountTableType.value = discount;
};

// discount shops multiselect
//* <MultiSelect "dropdown"> Logic
const selectedShop = ref<any>(); //-> the item you clicked on
const selectedShopsIds = ref([]); //-> the selected items' IDs
const selectedShopsMap = new Map(); //-> place to store the actual selected items to modify and use it later
const finalShopsArray = ref<any[]>([]); //-> the final result of the selected items (what you gonna use in the template)

const selectedShops = (item: any): void => {
  // set the item that you clicked on
  selectedShop.value = item;
};

const findSelectedShops = (ids: Array<any> = []) => {
  if (ids.length > 0) {
    if (!selectedShopsMap.has(selectedShop.value)) {
      selectedShopsMap.set(selectedShop.value, selectedShop.value);
    } else {
      selectedShopsMap.delete(selectedShop.value);
    }
  } else {
    selectedShopsMap.clear();
  }
  // convert the map object into array so i can easily use it in the template
  const arr = Array.from(selectedShopsMap, ([key, value]) => {
    return value;
  });
  finalShopsArray.value = arr;
};

// where you receive the data from the dropdown component
const shopsDropdownSelectedItems = (selectedItemsCallback: any) => {
  selectedShopsIds.value = selectedItemsCallback;

  findSelectedShops(selectedItemsCallback);
};

//* GET DISCOUNT TYPES *//
const getDiscountTypes = async () => {
  const reqData = {
    method: "get",
    url: "/LookupQueries/get-product-discount-types",
  };
  try {
    const { data }: any = await Api(reqData);
    if (data?.succeeded) {
      discountTypes.value = data.data;
      setSelectedDiscountType(discountTypes.value[0]);
    }
  } catch (error) {
    console.error(error);
  }
};
const getActiveDiscounts = async (productId: string | number) => {
  const reqData = {
    method: "get",
    url: `/ProductQueries/get-product-active-discounts`,
    payload: {
      productId,
      pageSize: 0,
      pageNumber: 0,
    },
  };
  try {
    const { data }: any = await Api(reqData);
    activeDiscounts.value = data?.data;
  } catch (error) {
    console.error(error);
  }
};
const getDeactivatedDiscounts = async (productId: string | number) => {
  const reqData = {
    method: "get",
    url: `/ProductQueries/get-product-inactive-discounts`,
    payload: {
      productId,
      pageSize: 0,
      pageNumber: 0,
    },
  };
  try {
    const { data }: any = await Api(reqData);
    deactivatedDiscounts.value = data?.data;
  } catch (error) {
    console.error(error);
  }
};
const deactivateDiscountAlert = (discount) => {
  swalAlert({
    title: "We're Done!",
    text: "The Data has been saved!",
    handler: deactivateDiscount,
    payload: discount,
  });
};
const deactivateDiscount = async (discount) => {
  const updateDiscounts = () => {
    const targetedDiscount = activeDiscounts.value.find((i) => {
      return (
        dateFormat(i.startDateTime) === dateFormat(discount.startDateTime) &&
        dateFormat(i.endDateTime) === dateFormat(discount.endDateTime)
      );
    });

    console.log({ targetedDiscount });

    const targetedDiscountIndex =
      activeDiscounts.value.indexOf(targetedDiscount);

    targetedDiscount.isActive = false;
    deactivatedDiscounts.value = [
      targetedDiscount,
      ...deactivatedDiscounts.value,
    ];

    activeDiscounts.value = activeDiscounts.value.filter(
      (el, index, array) => array.indexOf(el) !== targetedDiscountIndex
    );
  };
  if (!!discount.id) {
    const payload = {
      id: props.product.id,
      discountId: discount["id"],
    };
    const reqData = {
      method: "post",
      url: "/ProductCommands/deactivate-product-discount",
      payload,
    };

    try {
      const { data }: any = await Api(reqData);
      if (!!data.data) {
        updateDiscounts();
      }
    } catch (error) {
      console.error(error);
    }
  } else updateDiscounts();
};
watch(dateFrom, (newVal, oldVal) => {
  if (!!newVal) {
    discountReqData.value.discount.startDateTime = newVal;
  }
});
watch(dateTo, (newVal, oldVal) => {
  if (!!newVal) {
    discountReqData.value.discount.endDateTime = newVal;
  }
});

const setSelectedDiscountType = (type: any): void => {
  selectedDiscountType.value = type;
  discountReqData.value.discount.discountTypeId = type.id.toString();
};

const setSelectedDiscountCurrency = (currency) => {
  selectedDiscountCurrency.value = currency;
};
const isDiscountFormValid = computed(() => {
  const compareDateFromAndTo = compareTwoDates(
    dateFormat(dateFrom.value, true),
    dateFormat(dateTo.value, true)
  );

  let isValidPrices = false;
  Object.keys(discountPrices.value).forEach((el, i, array) => {
    isValidPrices =
      array.length === currencies.value.length && !!discountPrices.value[el];
  });

  return (
    selectedShopsIds.value.length > 0 &&
    compareDateFromAndTo.isValidForDiscount &&
    isValidPrices
  );
});
const isDiscountLoading = ref(false);
const discountErrorMsg = ref("");
const discountSaveChangesHandler = async () => {
  isDiscountLoading.value = true;

  let finalArray: any = new Map();
  currencies.value?.forEach((currency) => {
    Object.keys(discountPrices.value).forEach((key: string) => {
      if (key === currency.id) {
        finalArray.set(currency.id, {
          currencyId: currency.id,
          discountValue: discountPrices.value[key],
        });
      }
    });
  });
  const arr = Array.from(finalArray, ([key, value]) => {
    return value;
  });

  discountReqData.value.discount.discountPrices = arr;

  discountReqData.value.discount.shopIds = finalShopsArray.value.map(
    (shop) => shop.id
  );

  const payload = discountReqData.value;

  const reqData = {
    method: "post",
    url: "/ProductCommands/create-product-discount",
    payload,
  };

  try {
    const { data }: any = await Api(reqData);

    if (data?.succeeded) {
      discountErrorMsg.value = "nothing";
      activeDiscounts.value = [
        {
          id: data.data,
          discountTypeId: selectedDiscountType.value.id,
          startDateTime: dateFrom.value,
          endDateTime: dateTo.value,
          prices: payload.discount.discountPrices,
          isActive: true,
        },
        ...activeDiscounts.value,
      ];
      // empty form
      selectedShop.value = null;
      selectedShopsIds.value = [];
      selectedShopsMap.clear();
      finalShopsArray.value = [];
      discountPrices.value = {};
      setSelectedDiscountType(discountTypes.value[0]);
      setSelectedDiscountCurrency(currencies.value[0]);
      dateTo.value = "";
      dateFrom.value = "";
      setTimeout(() => {
        discountErrorMsg.value = "";
      }, 20000);
    } else discountErrorMsg.value = data.message;
  } catch (error) {
    console.error(error);
  } finally {
    isDiscountLoading.value = false;
  }
};

onBeforeMount(() => {
  getDiscountTypes();
  getActiveDiscounts(props.product?.id);
  getDeactivatedDiscounts(props.product?.id);
});
onMounted(() => {
  editorMounting.value = true;
  if (props.product) {
    const editorTargets = [
      "shortDescription",
      "longDescription",
      "purchaseNote",
    ];
    props.product?.resources.forEach((el: any) => {
      editorTargets.forEach((target) => {
        if ([null, undefined].includes(el[target])) {
          el[target] = "<p><br/><br/></p>";
        }
      });
    });

    if (langs.value && langs.value.length > 0) {
      selectedLang.value = langs.value[0];
      setEditorContent();
      editorMounting.value = false;
    }
    if (currencies.value && currencies.value.length > 0) {
      setSelectedCurrency(currencies.value[0]);
      setSelectedDiscountCurrency(currencies.value[0]);
    }
    if (props.product.prices && props.product.prices.length > 0) {
      props.product.prices.forEach((price: any) => {
        prices.value[`price-${price.currencyId}`] = price.price;
        prices.value[`costPrice-${price.currencyId}`] = price.costPrice;
      });
    }
    if (activeDiscounts.value && activeDiscounts.value.length >= 0) {
      const activeItem = discountTable.value.find(
        (i) => i.id === "active-discount"
      );

      setSelectedDiscountTable(activeItem);
    }
  }
});
watch(selectedLang, (newValue) => {
  if (
    newValue &&
    langs.value &&
    langs.value.length > 0 &&
    !selectedLang.value
  ) {
    selectedLang.value = langs.value[0];
    setEditorContent();
    editorMounting.value = false;
  }
});
watch(currencies, (newValue) => {
  if (newValue && currencies.value && currencies.value.length > 0) {
    setSelectedCurrency(currencies.value[0]);
    setSelectedDiscountCurrency(currencies.value[0]);
  }
});
watch(
  () => props.product,
  (newValue) => {
    if (newValue) {
      const editorTargets = [
        "shortDescription",
        "longDescription",
        "purchaseNote",
      ];
      newValue?.resources.forEach((el: any) => {
        editorTargets.forEach((target) => {
          if ([null, undefined].includes(el[target])) {
            el[target] = "<p><br/><br/></p>";
          }
        });
      });
      if (newValue && props.product.prices && props.product.prices.length > 0) {
        props.product.prices.forEach((price: any) => {
          prices.value[`price-${price.currencyId}`] = price.price;
          prices.value[`costPrice-${price.currencyId}`] = price.costPrice;
        });
      }
    }
  }
);
watch(activeDiscounts, (newValue) => {
  if (newValue && activeDiscounts.value && activeDiscounts.value.length >= 0) {
    const activeItem = discountTable.value.find(
      (i) => i.id === "active-discount"
    );

    setSelectedDiscountTable(activeItem);
  }
});
</script>
<style lang="scss">
.el-upload {
  width: 100%;
  max-height: 100% !important;

  .el-upload-dragger {
    width: 100%;
    height: auto;
    border: none;
  }
}
</style>
