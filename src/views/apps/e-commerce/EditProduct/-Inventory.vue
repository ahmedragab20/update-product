<template>
  <div class="card card-flush py-4">
    <div class="card-header py-0 border-0">
      <div class="card-title">
        <h2>Inventory</h2>
      </div>
    </div>
    <div class="card-body">
      <section>
        <div class="card-content">
          <form @submit.prevent="inventorySkusPushTagHandler(inventory.sku)">
            <input
              type="text"
              class="form-control form-control-white"
              placeholder="Product SKU"
              v-model="inventory.sku"
              @keyup.enter="
                inventorySkusPushTagHandler(inventory.sku),
                  (inventoryChanged = true)
              "
            />
          </form>
          <div class="tags mt-3">
            <div
              v-if="inventorySkusTags && inventorySkusTags.length > 0"
              class="d-flex flex-wrap gap-5"
            >
              <span
                class="badge badge-light position-relative d-flex gap-3"
                v-for="(tag, $index) in inventorySkusTags"
                :key="$index"
              >
                {{ tag }}
                <span
                  @click="inventoryRemoveSkusTagHandler(tag)"
                  title="remove tag"
                >
                  <i class="bi-x" style="font-size: large; cursor: pointer"></i>
                </span>
              </span>
            </div>
            <div v-else>
              <span class="p-1 h6 text-muted">No SKUs. add one?!</span>
            </div>
          </div>
        </div>
        <div class="card-content mt-3">
          <form
            @submit.prevent="
              inventoryBarcodePushTagHandler(inventory.barcode),
                (inventoryChanged = true)
            "
          >
            <input
              type="text"
              class="form-control form-control-white"
              placeholder="Product Barcode"
              v-model="inventory.barcode"
              @keyup.enter="inventoryBarcodePushTagHandler(inventory.barcode)"
            />
          </form>
          <div class="tags mt-3">
            <div
              v-if="inventoryBarcodeTags && inventoryBarcodeTags.length > 0"
              class="d-flex flex-wrap gap-5"
            >
              <span
                class="badge badge-light position-relative d-flex gap-3"
                v-for="(tag, $index) in inventoryBarcodeTags"
                :key="$index"
              >
                {{ tag }}
                <span
                  @click="inventoryRemoveBarcodeTagHandler(tag)"
                  title="remove tag"
                >
                  <i class="bi-x" style="font-size: large; cursor: pointer"></i>
                </span>
              </span>
            </div>
            <div v-else>
              <span class="p-1 h6 text-muted">No Barcodes. add one?!</span>
            </div>
          </div>
        </div>
        <div class="my-3">
          <span
            v-if="successMessage"
            class="text-success"
            v-text="successMessage"
          />
          <span
            v-if="reqErrorMessage && !successMessage"
            class="text-danger"
            v-text="reqErrorMessage"
          />
        </div>
        <SaveChangeBtn
          class="mt-4"
          :btnSubmit="submitSkusAndBarcodes"
          :elChanged="inventoryChanged"
          :elLoading="inventoryLoading"
          :no-cancel="true"
          :fullWidth="true"
        />
      </section>
      <div class="card-content mt-6">
        <div>
          <div id="add-shop" class="d-flex justify-content-end">
            <a
              href="#add-shop"
              class="btn btn-light-primary btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#add-shop-inventory-modal"
              >+ Add to shop</a
            >
          </div>
        </div>
        <BootstrapModal
          headline="Add New Shop"
          target="add-shop-inventory-modal"
          btnText="Save Changes"
          size="modal-lg"
          :has-actions="true"
          :btn-submit="submitShopForm"
          :is-loading="shopLoading"
          :btn-disabled="!isShopFormValid"
        >
          <template #content>
            <div v-if="shops" class="mb-3">
              <h4>Choose a shop</h4>
              <div class="py-1 px-0">
                <Dropdown
                  @selectedItem="dropdownSelectedShop"
                  :items="shops"
                  headClasses="fw-bold p-3 rounded-3 shadow-sm text-capitalize btn-lg mb-8"
                  bodyClasses="px-sm-5 py-sm-3 px-3 py-1 w-100 text-truncate text-capitalize"
                  max-height="300px"
                >
                  <template #headerContent="{ item }">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div
                        v-if="selectedShop && selectedShop.name"
                        class="d-flex gap-2 align-items-center"
                      >
                        <div style="width: 25px; height: 25px">
                          <img
                            :src="selectedShop.logoPath"
                            class="rounded-circle w-100 h-100"
                            style="object-fit: cover"
                          />
                        </div>
                        <span class="text-capitalize">
                          {{ selectedShop.name }}
                        </span>
                      </div>
                      <span v-else v-text="'Select Shop'" />

                      <strong>
                        <i
                          :class="
                            item.isOpened ? 'bi-arrow-up' : 'bi-arrow-down'
                          "
                        ></i>
                      </strong>
                    </div>
                  </template>
                  <template #bodyContent="{ item }">
                    <div v-if="item" class="d-flex gap-2 align-items-center">
                      <div style="width: 25px; height: 25px">
                        <img
                          :src="item.logoPath"
                          class="rounded-circle w-100 h-100"
                          style="object-fit: cover"
                        />
                      </div>
                      <span class="text-capitalize">
                        {{ item.name }}
                      </span>
                    </div>
                  </template>
                </Dropdown>
              </div>
            </div>
            <div>
              <form @submit.prevent class="d-flex flex-column">
                <div class="d-flex flex-wrap">
                  <div class="form-group my-1 w-50 p-2">
                    <label for="available-quantities" class="h4">
                      Available Quantities
                    </label>
                    <input
                      type="number"
                      class="form-control form-control-white"
                      id="available-quantities"
                      v-model.number="shopForm.availableQuantity"
                    />
                  </div>
                  <div class="form-group my-1 w-50 p-2">
                    <label for="maxQuantityPerOrder" class="h4"
                      >Max Quantity Per Order</label
                    >
                    <input
                      type="number"
                      class="form-control form-control-white"
                      id="maxQuantityPerOrder"
                      v-model.number="shopForm.maxQuantityPerOrder"
                    />
                  </div>
                </div>
                <div class="d-flex flex-wrap">
                  <div class="form-group my-1 w-50 p-2">
                    <label for="quantityNotificationCountLimit" class="h4">
                      Quantity Notification Count Limit
                    </label>
                    <input
                      type="number"
                      class="form-control form-control-white"
                      id="quantityNotificationCountLimit"
                      v-model.number="shopForm.quantityNotificationCountLimit"
                    />
                  </div>
                  <div class="form-group my-1 w-50 p-2">
                    <label for="maxQuantityPerClientAllThetime" class="h4">
                      Max Quantity Per Client All The Time
                    </label>
                    <input
                      type="number"
                      class="form-control form-control-white"
                      id="maxQuantityPerClientAllThetime"
                      v-model.number="shopForm.maxQuantityPerClientAllThetime"
                    />
                  </div>
                  <div class="form-group my-1 p-2 w-50">
                    <label for="preparingTimeInMinutes" class="h4">
                      Preparing Time In Minutes
                    </label>
                    <input
                      type="number"
                      class="form-control form-control-white"
                      id="preparingTimeInMinutes"
                      v-model.number="shopForm.preparingTimeInMinutes"
                    />
                  </div>
                </div>
                <div class="form-group my-1 d-flex gap-2 fw-bold">
                  <input
                    class="form-check-input form-control-white"
                    type="checkbox"
                    id="isSoldOutOnShopLink"
                    v-model="shopForm.isSoldOutOnShopLink"
                  />
                  <label for="isSoldOutOnShopLink">
                    Is Sold Out On Shop Link
                  </label>
                </div>
                <div class="form-group my-1 d-flex gap-2 fw-bold">
                  <input
                    class="form-check-input form-control-white"
                    type="checkbox"
                    id="isSoldOutOnJetOrder"
                    v-model="shopForm.isSoldOutOnJetOrder"
                  />
                  <label for="isSoldOutOnJetOrder">
                    Is Sold Out On JetOrder
                  </label>
                </div>
                <div class="form-group my-1 d-flex gap-2 fw-bold">
                  <input
                    class="form-check-input form-control-white"
                    type="checkbox"
                    id="isPublishedOnShopLink"
                    v-model="shopForm.isPublishedOnShopLink"
                  />
                  <label for="isPublishedOnShopLink">
                    Is Published On Shop Link
                  </label>
                </div>
                <div class="form-group my-1 d-flex gap-2 fw-bold">
                  <input
                    class="form-check-input form-control-white"
                    type="checkbox"
                    id="isPublishedOnJetOrderApplication"
                    v-model="shopForm.isPublishedOnJetOrderApplication"
                  />
                  <label for="isPublishedOnJetOrderApplication">
                    Is Published On JetOrder Application
                  </label>
                </div>
              </form>
              <div class="mt-4">
                <span
                  :class="
                    addingShopMessage !== 'Shop Added Successfully 😄🙌'
                      ? 'text-danger'
                      : 'text-primary'
                  "
                  v-text="addingShopMessage"
                />
              </div>
            </div>
          </template>
        </BootstrapModal>
        <InventoryTable :shops="productShops" :fetchShops="fetchShops" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Api from "@/utils/ApiHelper";

import BootstrapModal from "@/components/Reusable/BootstrapModal.vue";
import InventoryTable from "./-InventoryTable.vue";
import Dropdown from "@/components/Reusable/Dropdown.vue";
import SaveChangeBtn from "./-SaveChangeBtn";
import { reactive, ref } from "@vue/reactivity";
import { onMounted } from "vue";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

const props = defineProps(["product"]);
const store = useStore();
const inventoryChanged = ref<boolean | string>(false);
const inventoryLoading = ref(false);
const shops = computed(() => store.state.MarketModule.market?.shops);
const productShops = ref<any[]>([]);
const inventory = reactive<any>({
  sku: "",
  barcode: "",
});
let inventorySkusTags = ref<any[]>([]);
let inventoryBarcodeTags = ref<any[]>([]);
const inventorySkusPushTagHandler = (text: string) => {
  if (inventory.sku && !inventorySkusTags.value.includes(text))
    inventorySkusTags.value.push(text);
  inventory.sku = "";
  inventoryChanged.value = true;
};
const inventoryRemoveSkusTagHandler = (text: string) => {
  inventorySkusTags.value = inventorySkusTags.value.filter(
    (item) => item !== text
  );
  inventoryChanged.value = true;
};

const inventoryBarcodePushTagHandler = (text: string) => {
  if (inventory.barcode && !inventoryBarcodeTags.value.includes(text))
    inventoryBarcodeTags.value.push(text);
  inventory.barcode = "";
  inventoryChanged.value = true;
};
const inventoryRemoveBarcodeTagHandler = (text: string) => {
  inventoryBarcodeTags.value = inventoryBarcodeTags.value.filter(
    (item) => item !== text
  );
  inventoryChanged.value = true;
};
const shopForm = ref({
  shopId: "",
  availableQuantity: "",
  maxQuantityPerOrder: "",
  quantityNotificationCountLimit: "",
  maxQuantityPerClientAllThetime: "",
  isSoldOutOnShopLink: false,
  isSoldOutOnJetOrder: false,
  isPublishedOnShopLink: false,
  isPublishedOnJetOrderApplication: false,
  preparingTimeInMinutes: "",
});
const shopLoading = ref(false);
const addingShopMessage = ref("");
const selectedShop = ref(null);

const dropdownSelectedShop = (selectedItem: any) => {
  selectedShop.value = selectedItem;
  shopForm.value.shopId = selectedItem.id;
};

const isShopFormValid = computed(() => {
  return (
    shopForm.value.shopId &&
    shopForm.value.availableQuantity &&
    shopForm.value.maxQuantityPerOrder &&
    shopForm.value.quantityNotificationCountLimit &&
    shopForm.value.maxQuantityPerClientAllThetime &&
    shopForm.value.preparingTimeInMinutes
  );
});

const submitShopForm = async () => {
  try {
    shopLoading.value = true;
    const payload = {
      id: props.product.id,
      productShopOrderingDataDTO: shopForm.value,
    };
    const reqData = {
      method: "post",
      url: "/ProductCommands/add-shop-to-product",
      payload,
    };

    const { data } = await Api(reqData);
    if (data?.succeeded) {
      fetchShops();
      addingShopMessage.value = "Shop Added Successfully 😄🙌";
    } else {
      addingShopMessage.value = `${data.message} 🤕`;
    }
  } catch (error) {
    console.error(error);
  } finally {
    shopLoading.value = false;
  }
};

const reqErrorMessage = ref("");
const successMessage = ref("");

const submitSkusAndBarcodes = async () => {
  inventoryLoading.value = true;
  const payload = {
    id: props.product?.id,
    skus: inventorySkusTags.value,
    barcodes: inventoryBarcodeTags.value,
  };

  const reqData = {
    method: "post",
    url: "/ProductCommands/update-product-inventory-SKU-Barcode",
    payload,
  };

  try {
    const { data } = await Api(reqData);
    if (data?.succeeded) {
      inventoryChanged.value = "done";
      reqErrorMessage.value = "";
      successMessage.value = "Inventory Updated Successfully 😄🙌";
    } else {
      successMessage.value = "";
      reqErrorMessage.value = `${data?.message} 🤕`;
    }
  } catch (error) {
    console.error(error);
  } finally {
    inventoryLoading.value = false;
  }
};

const fetchShops = () => {
  const reqData = {
    method: "get",
    url: "/ProductQueries/get-product-shops-data",
    payload: {
      id: props.product?.id,
    },
  };

  Api(reqData)
    .then((res) => {
      const { data } = res;
      if (data?.succeeded) {
        productShops.value = data.data?.reverse();
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

onMounted(() => {
  fetchShops();

  if (props.product) {
    inventorySkusTags.value = props.product.skUs;
    inventoryBarcodeTags.value = props.product.barcodes;
  }
});
</script>
