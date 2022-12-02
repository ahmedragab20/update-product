<template>
  <div>
    <div>
      <Dropdown
        @selectedItem="selectProductType"
        :items="productTypes"
        class="w-100"
        headClasses="fw-bold py-3 px-5 rounded-3 text-capitalize btn-lg btn-primary"
        bodyClasses=""
      >
        <template #headerContent="{ item }">
          <span
            class="d-flex justify-content-center align-items-center gap-2 text-white"
          >
            <i
              class="bi bi-plus-circle text-white"
              style="font-size: 1.1rem"
            ></i>
            <span>Add Product</span>
          </span>
        </template>
        <template #bodyContent="{ item }">
          <div
            data-bs-toggle="modal"
            data-bs-target="#add-product-modal"
            class="px-sm-5 py-sm-3 px-3 py-1 w-100 text-truncate text-capitalize"
            @click="commitData"
          >
            {{ item.label }}
          </div>
        </template>
      </Dropdown>
    </div>
    <BootstrapModal
      headline="Add New Product"
      target="add-product-modal"
      :hasActions="true"
      :btnSubmit="addProduct"
      :btnDisabled="false"
      :isLoading="addingProduct"
      btnText="Add Product"
      size="modal-xl"
      max-height="80vh"
    >
      <template #content>
        <div v-if="selectedLanguage && selectedCurrency" class="row">
          <div class="col-md-6 col-lg-4 col-12">
            <div
              class="image-input image-input-empty image-input-outline mb-3 w-100"
              data-kt-image-input="true"
            >
              <div
                style="max-height: 400px"
                class="d-flex justify-content-center align-items-center position-relative"
              >
                <img
                  :src="url || placeholderImage"
                  class="img-thumbnail"
                  style="max-height: 400px"
                />
                <div
                  v-if="uploadMediaLoading"
                  class="img-loader position-absolute start-0 top-0 w-100 h-100 d-flex justify-content-center align-items-center rounded overflow-hidden"
                >
                  <div class="d-flex justify-content-center align-items-center">
                    <img src="@/assets/loading-state.gif" width="150" />
                  </div>
                </div>
              </div>
              <label
                class="btn btn-sm d-flex justify-content-center align-items-center rounded-pill btn-active-color-primary bg-body shadow"
                data-kt-image-input-action="change"
                data-bs-toggle="tooltip"
                title=""
                data-bs-original-title="Change avatar"
                style="transform: translateX(-100px) translateY(-50%)"
              >
                <i class="bi bi-pencil-fill fs-7"></i>
                <span class="text-nowrap">Add Image</span>
                <input
                  @change="onFileSelected"
                  type="file"
                  name="avatar"
                  accept=".png, .jpg, .jpeg"
                />
                <input type="hidden" name="avatar_remove" />
                <!--end::Inputs-->
              </label>
            </div>
          </div>
          <div class="col-md-6 col-lg-8 col-12">
            <form @submit.prevent>
              <!-- Resources -->
              <div class="mb-3">
                <tabs-duplicator
                  :items="availableLanguages"
                  @selectedItem="setSelectedLanguage"
                >
                  <template #label="{ item }">
                    <span>
                      {{ item.label }}
                    </span>
                  </template>
                </tabs-duplicator>
                <label for="product-name" class="form-label mt-3">
                  Product Name ( <span>{{ selectedLanguage.label }}</span> )
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="product-name"
                  v-model="productNames[selectedLanguage.id]"
                />
              </div>
              <!-- Prices -->
              <div class="mb-3">
                <tabs-duplicator
                  class="py-1"
                  :items="availableCurrencies"
                  @selectedItem="setSelectedCurrency"
                >
                  <template #label="{ item }">
                    <span class="text-nowrap">
                      {{ item.label }}
                    </span>
                  </template>
                </tabs-duplicator>
                <label for="product-price" class="form-label mt-3">
                  {{ selectedCurrency.label }} Price
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="product-price"
                  v-model.number="productPrices[selectedCurrency.id]"
                />
              </div>
              <!-- Quantity -->
              <div class="mb-3">
                <label for="product-quantity" class="form-label mt-3">
                  Available Quantities:
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="product-quantity"
                  v-model.number="quantity"
                />
              </div>
              <!-- Slug -->
              <div class="mb-3">
                <label for="product-slug" class="form-label mt-3">
                  Product Slug:
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="product-slug"
                  v-model="slug"
                />
              </div>
              <!-- Code -->
              <div class="mb-3">
                <label for="product-code" class="form-label mt-3">
                  Product Code:
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="product-code"
                  v-model="code"
                />
              </div>
              <!-- Categories -->
              <div class="mb-3">
                <label class="mb-3 form-label"> Product Categories: </label>
                <Dropdown
                  :items="categories"
                  :multiSelect="true"
                  bodyClasses="w-100 text-truncate text-capitalize"
                  headClasses="fw-bold p-3 rounded-3 border text-capitalize btn-lg mb-3"
                  maxHeight="200px"
                  @selectedItem="setSelectedCategories"
                >
                  <template #headerContent="{ item }">
                    <span
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div class="w-100 text-truncate d-flex gap-2">
                        <span v-text="'Select Categories'" />
                        <span class="badge badge-circle badge-light-dark">
                          {{ selectedCategories.length }}
                        </span>
                      </div>
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
                        selectedCategoriesIds.includes(item.id)
                          ? 'background-color: #1bc5bd; color: #fff;'
                          : '',
                      ]"
                      class="px-sm-5 py-sm-3 px-3 py-1 w-100 d-flex justify-content-between align-items-center"
                      @click="setSelectedCategory(item)"
                    >
                      <div class="d-flex gap-2 align-items-center">
                        <div
                          style="width: 25px; height: 25px"
                          class="rounded-circle overflow-hidden d-flex justify-content-center align-items-center border bg-white"
                        >
                          <el-image :src="item.thumbnailPath" fit="cover" lazy>
                            <template #error>
                              <div class="image-slot d-flex">
                                <i class="bi bi-image"></i>
                              </div>
                            </template>
                          </el-image>
                        </div>
                        <span v-text="item.name" />
                      </div>
                      <i
                        v-if="selectedCategoriesIds.includes(item.id)"
                        class="bi bi-check text-white"
                        style="font-size: large"
                      ></i>
                    </div>
                  </template>
                </Dropdown>
                <!-- Selected Categories -->
                <div class="d-flex gap-2 overflow-scroll">
                  <div
                    v-for="(item, $index) in selectedCategories"
                    class="badge badge-light-dark my-1"
                  >
                    <div class="d-flex gap-2 align-items-center">
                      <div
                        style="width: 20px; height: 20px"
                        class="rounded-circle overflow-hidden d-flex justify-content-center align-items-center border bg-white"
                      >
                        <el-image :src="item.thumbnailPath" fit="cover" lazy>
                          <template #error>
                            <div class="image-slot d-flex">
                              <i class="bi bi-image"></i>
                            </div>
                          </template>
                        </el-image>
                      </div>
                      <span v-text="item.name" />
                    </div>
                  </div>
                </div>
              </div>
              <!-- Connected Shops -->
              <div class="mb-3">
                <label class="form-label mt-3"> Connected Shops: </label>
                <Dropdown
                  :items="shops"
                  :multiSelect="true"
                  bodyClasses="w-100 text-truncate text-capitalize"
                  headClasses="fw-bold p-3 rounded-3 border text-capitalize btn-lg mb-3"
                  maxHeight="200px"
                  @selectedItem="setSelectedShops"
                >
                  <template #headerContent="{ item }">
                    <span
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div class="w-100 text-truncate d-flex gap-2">
                        <span v-text="'Select Shop'" />
                        <span class="badge badge-circle badge-light-dark">
                          {{ selectedShops.length }}
                        </span>
                      </div>
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
                      @click="setSelectedItem(item)"
                    >
                      <div class="d-flex gap-2 align-items-center">
                        <div
                          style="width: 25px; height: 25px"
                          class="rounded-circle overflow-hidden d-flex justify-content-center align-items-center border bg-white"
                        >
                          <el-image :src="item.logoPath" fit="cover" lazy>
                            <template #error>
                              <div class="image-slot d-flex">
                                <i class="bi bi-image"></i>
                              </div>
                            </template>
                          </el-image>
                        </div>
                        <span v-text="item.name" />
                      </div>
                      <i
                        v-if="selectedShopsIds.includes(item.id)"
                        class="bi bi-check text-white"
                        style="font-size: large"
                      ></i>
                    </div>
                  </template>
                </Dropdown>
                <!-- Selected Shops -->
                <div class="d-flex gap-2 overflow-scroll">
                  <div
                    v-for="(item, $index) in selectedShops"
                    class="badge badge-light-dark my-1"
                  >
                    <div class="d-flex gap-2 align-items-center">
                      <div
                        style="width: 20px; height: 20px"
                        class="rounded-circle overflow-hidden d-flex justify-content-center align-items-center border bg-white"
                      >
                        <el-image :src="item.logoPath" fit="cover" lazy>
                          <template #error>
                            <div class="image-slot d-flex">
                              <i class="bi bi-image"></i>
                            </div>
                          </template>
                        </el-image>
                      </div>
                      <span v-text="item.name" />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div
          v-else
          class="d-flex justify-content-center flex-column align-items-center w-100"
        >
          <div>
            <button @click="commitData" class="btn btn-warning text-black">
              <i class="bi bi-arrow-clockwise"></i>
              Try again
            </button>
          </div>
          <img
            src="@/assets/green-spinner.gif"
            width="100"
            class="mx-auto"
            style="margin-bottom: -15px"
          />
          <h4>loading...</h4>
        </div>
      </template>
    </BootstrapModal>
  </div>
</template>
<script lang="ts" setup>
import Api from "@/utils/ApiHelper";
import Dropdown from "@/components/Reusable/Dropdown.vue";
import BootstrapModal from "@/components/Reusable/BootstrapModal.vue";
import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";
import { ref } from "@vue/reactivity";
import { computed, onMounted, reactive } from "vue";
import { useStore } from "vuex";

const props = defineProps(["availableLanguages", "availableCurrencies"]);
const store = useStore();
const productTypes = reactive([
  { id: 1, label: "Physical" },
  { id: 2, label: "Digital" },
]);

const selectedProductType = ref();

const selectProductType = (selectedItem: any) => {
  selectedProductType.value = selectedItem;
};

const placeholderImage =
  "https://cdn.dribbble.com/userupload/3253023/file/original-bdfe84d477856b5379bab09cf1a262b6.png?compress=1&resize=1200x900";
const selectedLanguage = ref();
const selectedCurrency = ref();

const setSelectedLanguage = (language) => {
  selectedLanguage.value = language;
};
const setSelectedCurrency = (currency) => {
  selectedCurrency.value = currency;
};

const productNames = ref({});
const productPrices = ref({});
/* Categories */
const multiselectCategoriesValue = ref([]);
const categories = computed(() => store.state.LookupQueries?.categories);
const selectedCategory = ref(); //-> the item you clicked on
const selectedCategoriesIds = ref([]); //-> the selected items' IDs
const selectedCategoriesMap = new Map(); //-> place to store the actual selected items to modify and use it later
const selectedCategories = ref<any[]>([]); //-> the final result of the selected items (what you gonna use in the template)
//* <MultiSelect "dropdown"> Logic
const setSelectedCategory = (item: any) => {
  // set the item that you clicked on
  selectedCategory.value = item;
};

const findSelectedCategories = (ids: Array<any> = []) => {
  if (ids.length > 0) {
    if (!selectedCategoriesMap.has(selectedCategory.value)) {
      selectedCategoriesMap.set(selectedCategory.value, selectedCategory.value);
    } else {
      selectedCategoriesMap.delete(selectedCategory.value);
    }
  } else {
    selectedCategoriesMap.clear();
  }
  // convert the map object into array so I can easily use it in the template
  const arr = Array.from(selectedCategoriesMap, ([key, value]) => {
    return value;
  });
  selectedCategories.value = arr;
};

// where you receive the data from the dropdown component
const setSelectedCategories = (selectedItemsCallback: any) => {
  selectedCategoriesIds.value = selectedItemsCallback;

  findSelectedCategories(selectedItemsCallback);
};

const slug = ref("");
const code = ref("");

/* Upload Image */
const photo = ref<File | any>();
const url = ref();
const uploadMediaDone = ref<any>(false);
const uploadMediaLoading = ref<any>(false);
let key = ref<string>("");

const onFileSelected = async (event) => {
  uploadMediaDone.value = false;
  photo.value = event.target.files[0];
  url.value = URL.createObjectURL(photo.value);

  onUpload();
};

const onUpload = async () => {
  try {
    uploadMediaLoading.value = true;
    const fd = new FormData();
    fd.append("file", photo.value);

    const reqData = {
      method: "post",
      url: "/ManageCommands/upload-file",
      payload: fd,
    };

    const response = await Api(reqData);
    if (response?.data?.succeeded) {
      uploadMediaDone.value = true;
      key.value = response?.data.data;
    } else uploadMediaDone.value = "failed";
  } catch (error) {
    console.error(error);
  } finally {
    uploadMediaLoading.value = false;
  }
};

const cancel = () => {
  url.value = null;
};

/* Shops */
const shops = computed(() => store.state.LookupQueries?.shops?.data);
const selectedShop = ref(); //-> the item you clicked on
const selectedShopsIds = ref([]); //-> the selected items' IDs
const selectedShopsMap = new Map(); //-> place to store the actual selected items to modify and use it later
const selectedShops = ref<any[]>([]); //-> the final result of the selected items (what you gonna use in the template)
//* <MultiSelect "dropdown"> Logic
const setSelectedItem = (item: any) => {
  // set the item that you clicked on
  selectedShop.value = item;
};

const findSelectedItems = (ids: Array<any> = []) => {
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
  selectedShops.value = arr;
};

// where you receive the data from the dropdown component
const setSelectedShops = (selectedItemsCallback: any) => {
  selectedShopsIds.value = selectedItemsCallback;

  findSelectedItems(selectedItemsCallback);
};

const quantity = ref(0);
const languagesValidation = computed(() => {
  const itemsFiltered = Object.keys(productNames.value).filter(
    (key) => productNames.value[key] !== ""
  );
  return itemsFiltered.length !== props.availableLanguages?.length;
});

const currenciesValidation = computed(() => {
  const itemsFiltered = Object.keys(productPrices.value).filter(
    (key) => productPrices.value[key] !== ""
  );
  return itemsFiltered.length !== props.availableCurrencies?.length;
});

const categoriesValidation = computed(() => {
  return (
    multiselectCategoriesValue.value &&
    multiselectCategoriesValue.value.length === 0
  );
});

const notValid = computed((): boolean => {
  return (
    !languagesValidation.value ||
    !currenciesValidation.value ||
    !categoriesValidation.value ||
    !key.value
  );
});

const commitData = () => {
  if (props.availableLanguages && props.availableCurrencies) {
    selectedLanguage.value = props.availableLanguages[0];
    selectedCurrency.value = props.availableCurrencies[0];
  }
};

const log = () => {
  console.log(
    "%cCategories + multiselectCategoriesValue: ",
    "color: pink; font-weight: bold; font-size: 1.1rem",
    categories.value,
    multiselectCategoriesValue.value
  );
};
const addingProduct = ref(false);
const addProduct = async () => {
  addingProduct.value = true;
  let productPayload: any = {
    code: "",
    productTypeId: "",
    resources: [],
    prices: [],
    thumbnail: "",
    slug: "",
    order: 0,
    connectedShops: [],
    connectedProductCategories: [],
    availableQuantity: 1,
  };

  const namesFiltered = Object.keys(productNames.value).filter(
    (key) => productNames.value[key] !== ""
  );
  const pricesFiltered = Object.keys(productPrices.value).filter(
    (key) => productPrices.value[key] !== ""
  );

  namesFiltered.forEach((el) => {
    productPayload.resources.push({
      languageId: el,
      name: productNames.value[el],
    });
  });
  pricesFiltered.forEach((el) => {
    productPayload.prices.push({
      currencyId: el,
      price: productPrices.value[el],
    });
  });

  productPayload.productTypeId = selectedProductType.value.id;
  productPayload.thumbnail = key.value;
  productPayload.availableQuantity = quantity.value;
  productPayload.code = code.value;
  productPayload.slug = slug.value;
  productPayload.connectedShops = selectedShops.value;
  productPayload.connectedProductCategories = selectedCategories.value;

  console.log(
    "%cProduct Form Data",
    "color: #48C9B0; font-weight: bold; font-size: 1.1rem",
    productPayload
  );
  try {
    const reqData = {
      method: "post",
      url: "/ProductCommands/create-product",
      payload: productPayload,
    };

    const response = await Api(reqData);
    if (response?.data?.succeeded) {
      console.log(
        "%cProduct Added",
        "color: #48C9B0; font-weight: bold; font-size: 1.1rem",
        response?.data.data
      );
    } else {
      console.log(
        "%cError",
        "color: #ff0000; font-weight: bold; font-size: 1.1rem",
        response?.data?.message
      );
    }
  } catch (error) {
    console.error(error);
  } finally {
    addingProduct.value = false;
  }
};

onMounted(() => {
  commitData();
});
</script>
