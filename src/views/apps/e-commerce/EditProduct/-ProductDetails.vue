<template>
  <div class="card card-flush py-4"
       :class="{'gradient-border' : updateProductState.changedSections.includes('product-details')}">
    <!--begin::Card header-->
    <div class="card-header">
      <!--begin::Card title-->
      <div class="card-title">
        <h2>Product Details</h2>
      </div>
      <!--end::Card title-->
    </div>
    <!--end::Card header-->
    <!--begin::Card body-->
    <div class="card-body pt-0">
      <!--begin::Input group-->
      <div class="mb-4">
        <!--begin::Label-->
        <label class="form-label">Categories</label>
        <!--end::Label-->
        <!--begin::Select2-->
        <div>
          <Dropdown
            :items="categories"
            :multiSelect="true"
            :outter-ids="outterCategoriesIds"
            bodyClasses="w-100 text-truncate text-capitalize"
            headClasses="fw-bold p-3 rounded-3 shadow-sm text-capitalize btn-lg mb-3"
            maxHeight="200px"
            @selectedItem="dropdownSelectedItems"
          >
            <template #headerContent="{ item }">
              <span class="d-flex justify-content-between align-items-center">
                <span class="w-100 text-truncate"> select categories </span>
                <strong>
                  <i
                    :class="item.isOpened ? 'bi-arrow-up' : 'bi-arrow-down'"
                  ></i>
                </strong>
              </span>
            </template>
            <template #bodyContent="{ item }">
              <div
                :style="[
                  selectedItemsIds.includes(item.id)
                    ? 'background-color: #1bc5bd; color: #fff;'
                    : '',
                ]"
                class="px-sm-5 py-sm-3 px-3 py-1 w-100 d-flex justify-content-between align-items-center"
                @click="setSelectedItem(item)"
              >
                <span>
                  {{ item.name || "unknown" }}
                </span>
                <i
                  v-if="selectedItemsIds.includes(item.id)"
                  class="bi bi-check text-white"
                  style="font-size: large"
                ></i>
              </div>
            </template>
          </Dropdown>
          <!-- Tags -->
          <div v-if="selectedCategories" class="d-flex gap-3 flex-wrap">
            <span
              v-for="(item, $index) in selectedCategories"
              :key="$index"
              class="badge badge-secondary"
            >
              <span v-if="item && item.name">
                {{ item.name }}
              </span>
              <span v-else>unknown</span>
            </span>
          </div>
        </div>
        <!--end::Select2-->
      </div>
      <div class="mb-4">
        <!--begin::Label-->
        <label class="form-label">Brands</label>
        <!--end::Label-->
        <!--begin::Select2-->
        <div>
          <Dropdown
            :items="brands"
            bodyClasses="w-100 text-truncate text-capitalize"
            headClasses="fw-bold p-3 rounded-3 shadow-sm text-capitalize btn-lg mb-8"
            maxHeight="200px"
            @selectedItem="setBrandsDropdownSelectedItem"
          >
            <template #headerContent="{ item }">
              <span class="d-flex justify-content-between align-items-center">
                <div
                  v-if="brandsDropdownSelectedItem"
                  class="d-flex gap-2 align-items-center"
                >
                  <div
                    class="rounded-circle overflow-hidden d-flex justify-content-center align-items-center border bg-white"
                    style="width: 25px; height: 25px"
                  >
                    <el-image
                      :src="brandsDropdownSelectedItem.thumbnailPath"
                      fit="cover"
                      lazy
                    >
                      <template #error>
                        <div class="image-slot d-flex">
                          <i class="bi bi-image"></i>
                        </div>
                      </template>
                    </el-image>
                  </div>
                  <span
                    v-text="brandsDropdownSelectedItem.name || 'Select Brand'"
                  />
                </div>
                <div v-else class="d-flex gap-2 align-items-center">
                  <div
                    class="rounded-circle overflow-hidden d-flex justify-content-center align-items-center border bg-white"
                    style="width: 25px; height: 25px"
                  >
                    <el-image :src="item.thumbnailPath" fit="cover" lazy>
                      <template #error>
                        <div class="image-slot d-flex">
                          <i class="bi bi-image"></i>
                        </div>
                      </template>
                    </el-image>
                  </div>
                  <span v-text="'Select Brand'" />
                </div>
                <strong>
                  <i
                    :class="item.isOpened ? 'bi-arrow-up' : 'bi-arrow-down'"
                  ></i>
                </strong>
              </span>
            </template>
            <template #bodyContent="{ item }">
              <div
                :class="{
                  'bg-primary text-white':
                    brandsDropdownSelectedItem &&
                    item.id === brandsDropdownSelectedItem.id,
                }"
                class="px-sm-5 py-sm-3 px-3 py-1 d-flex justify-content-between align-center"
              >
                <div class="d-flex gap-2 align-items-center">
                  <div
                    class="rounded-circle overflow-hidden d-flex justify-content-center align-items-center border bg-white"
                    style="width: 25px; height: 25px"
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
                  v-if="
                    brandsDropdownSelectedItem &&
                    item.id === brandsDropdownSelectedItem.id
                  "
                  class="bi bi-check text-white"
                  style="font-size: large"
                ></i>
              </div>
            </template>
          </Dropdown>
        </div>
        <!--end::Select2-->
      </div>
      <div class="mb-4">
        <!--begin::Label-->
        <label class="form-label">Delivery class</label>
        <!--end::Label-->
        <!--begin::Select2-->
        <div>
          <Dropdown
            :items="deliveryClasses"
            bodyClasses="`w-100 text-truncate text-capitalize`"
            headClasses="fw-bold p-3 rounded-3 shadow-sm text-capitalize btn-lg mb-8"
            maxHeight="200px"
            @selectedItem="setDeliveryClassesDropdownSelectedItem"
          >
            <template #headerContent="{ item }">
              <span class="d-flex justify-content-between align-items-center">
                <div v-if="deliveryClassesDropdownSelectedItem">
                  {{ deliveryClassesDropdownSelectedItem.value || "unknown" }}
                  <i class="bi bi-dot mx-2" style="font-size: larger"></i>
                  {{ deliveryClassesDropdownSelectedItem.code || "unknown" }}
                </div>
                <div v-else>Select class</div>
                <strong>
                  <i
                    :class="item.isOpened ? 'bi-arrow-up' : 'bi-arrow-down'"
                  ></i>
                </strong>
              </span>
            </template>
            <template #bodyContent="{ item }">
              <div
                :class="{
                  'bg-primary text-white':
                    deliveryClassesDropdownSelectedItem &&
                    item.id === deliveryClassesDropdownSelectedItem.id,
                }"
                class="px-sm-5 py-sm-3 px-3 py-1 d-flex justify-content-between align-center"
              >
                <div>
                  {{ item.value || "unknown" }}
                  <i class="bi bi-dot mx-2" style="font-size: larger"></i>
                  {{ item.code }}
                </div>
                <i
                  v-if="
                    deliveryClassesDropdownSelectedItem &&
                    item.id === deliveryClassesDropdownSelectedItem.id
                  "
                  class="bi bi-check text-white"
                  style="font-size: large"
                ></i>
              </div>
            </template>
          </Dropdown>
        </div>
        <!--end::Select2-->
      </div>
      <div v-if="errorMessage" class="mb-4">
        <span class="fw-bold text-danger">
          <i class="bi bi-cone text-danger"></i>
          {{ errorMessage }}
        </span>
      </div>
      <div class="mb-4">
        <SaveChangeBtn
          :btnSubmit="sendProductDetails"
          :elChanged="dataChange"
          :elLoading="isLoading"
          :btn-reverse-submit="reverseProductDetails"
        />
      </div>
    </div>
    <!--end::Card body-->
  </div>
</template>

<script lang="ts" setup>
import Api from "@/utils/ApiHelper";
import SaveChangeBtn from "@/views/apps/e-commerce/EditProduct/-SaveChangeBtn.vue";
import Dropdown from "@/components/Reusable/Dropdown.vue";
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed, onMounted, watch } from "vue";
import { Product, Categories } from "@/types";

interface Props {
  product: Product;
  categories: Categories[];
  brands: any[];
  deliveryClasses: any[];
}

const props = defineProps<Props>();

const store = useStore();

const isLoading = ref(false);
const dataChange = ref<string | boolean>(false);
const product = computed(() => store.state.UpdateProduct.product);
const updateProductState = computed(() => store.state.UpdateProduct);
const updateChangedSections = ({ sectionId, remove }) => {
  store.commit("ADD_CHANGED_SECTIONS", {
    sectionId,
    remove
  });
};

const initializeComponentsData = ({ name, content }) => {
  store.commit("INITIALIZE_DATA", {
    name,
    content
  });
};


// Brands logic
const brandsDropdownSelectedItem = ref();
const setBrandsDropdownSelectedItem = (
  selectedItem: any,
  isGeneral?: boolean
) => {
  brandsDropdownSelectedItem.value = selectedItem;
  if (!isGeneral) {
    dataChange.value = true;
  }
};

// Delivery class
const deliveryClassesDropdownSelectedItem = ref();
const setDeliveryClassesDropdownSelectedItem = (
  selectedItem: any,
  isGeneral?: boolean
) => {
  deliveryClassesDropdownSelectedItem.value = selectedItem;
  if (!isGeneral) {
    dataChange.value = true;
  }
};

//* <MultiSelect "dropdown"> local store
const outterCategoriesIds = ref<any[]>([]);
const selectedOption = ref(); //-> the item you clicked on
const selectedItemsIds = ref<any[]>([]); //-> the selected items' IDs
const selectedCategories = ref<any[]>([]); //-> the final result of the selected items (what you gonna use in the template)
//* <MultiSelect "dropdown"> Logic
const setSelectedItem = (item: any) => {
  // set the item that you clicked on
  selectedOption.value = item;

  dataChange.value = true;
};

const findSelectedItems = (ids: Array<any> = []) => {
  const items = props.categories.filter((category) =>
    ids.includes(category.id)
  );
  selectedCategories.value = items;
};

// where you receive the data from the dropdown component
const dropdownSelectedItems = (selectedItemsCallback: any) => {
  selectedItemsIds.value = [...selectedItemsCallback];

  findSelectedItems(selectedItemsCallback);
};

// HANDLE APIs CALLS
const errorMessage = ref("");

const sendProductDetails = async () => {
  const payload = {
    id: props.product.id || null,
    brandId: brandsDropdownSelectedItem.value?.id,
    connectedProductCategories: selectedItemsIds.value,
    deliveryTimeCategoryId: deliveryClassesDropdownSelectedItem.value
      ? deliveryClassesDropdownSelectedItem.value?.id
      : (errorMessage.value = "can't send empty data")
  };

  const reqData = {
    method: "post",
    url: "/ProductCommands/update-product-basicdetails",
    payload
  };

  try {
    isLoading.value = true;
    const { data } = await Api(reqData);
    if (data.succeeded) {
      dataChange.value = "done";
      errorMessage.value = "";
      initializeComponentsData({
        name: "productDetails",
        content: {
          productBrandId: payload.brandId,
          deliveryTimeCategoryId: payload.deliveryTimeCategoryId,
          productCategories: payload.connectedProductCategories
        }
      });
    } else {
      errorMessage.value = data.message;
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
const reverseProductDetails = () => {
  const { productDetails } = updateProductState.value;

  initProductBrands(productDetails.productBrandId, true);
  initDeliveryClasses(productDetails.deliveryTimeCategoryId, true);
  initProductCategories(productDetails.productCategories);

  dataChange.value = false;
  errorMessage.value = "";
};
const initProductBrands = (productBrandId: string, isGlobal?: boolean) => {
  if (props.brands) {
    const brand = props.brands.find((brand) => brand.id === productBrandId);
    setBrandsDropdownSelectedItem(brand, isGlobal);
  }
};
const initDeliveryClasses = (deliveryTimeCategoryId: string, isGlobal?: boolean) => {
  if (props.deliveryClasses) {
    const deliveryClass = props.deliveryClasses.find(
      (deliveryClass) => deliveryClass.id === deliveryTimeCategoryId
    );
    setDeliveryClassesDropdownSelectedItem(deliveryClass, isGlobal);
  }
};

const initProductCategories = (productCategories: string[]) => {
  if (props.categories) {
    const categoriesIds: any[] = [];
    props.categories.forEach((category) => {
      if (productCategories.includes(category.id)) {
        categoriesIds.push(category.id);
      }
    });
    outterCategoriesIds.value = categoriesIds;
    selectedItemsIds.value = categoriesIds;
    findSelectedItems(categoriesIds);
    const items = props.categories.filter((category) =>
      productCategories.includes(category.id)
    );
    selectedCategories.value = items;
  }
};

onMounted(() => {
  if (product.value) {
    initProductBrands(product.value?.productBrandId, true);
    initDeliveryClasses(product.value.deliveryTimeCategoryId, true);
    initProductCategories(product.value.productCategories);
    initializeComponentsData({
      name: "productDetails",
      content: {
        productBrandId: product.value.productBrandId,
        deliveryTimeCategoryId: product.value.deliveryTimeCategoryId,
        productCategories: product.value.productCategories
      }
    });
  }
});

watch(() => product.value, (newValue, oldValue) => {
  if (newValue) {
    initProductBrands(newValue?.productBrandId, true);
    initDeliveryClasses(newValue?.deliveryTimeCategoryId, true);
    initProductCategories(newValue?.productCategories);
    initializeComponentsData({
      name: "productDetails",
      content: {
        productBrandId: newValue.productBrandId,
        deliveryTimeCategoryId: newValue.deliveryTimeCategoryId,
        productCategories: newValue.productCategories
      }
    });
  }
});

watch(() => dataChange.value, (newV, oldValue) => {
  if (newV && !oldValue || newV && oldValue === "done") {
    updateChangedSections({
      sectionId: "product-details",
      remove: false
    });
  } else {
    updateChangedSections({
      sectionId: "product-details",
      remove: true
    });
  }
});
</script>
