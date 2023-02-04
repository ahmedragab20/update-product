<template>
  <div v-if="type">
    <div class="row my-5">
      <!-- Code & Order -->
      <div class="col-12 mb-3">
        <div class="row">
          <div class="col-12 col-sm">
            <label for="product_code" class="form-label">Code</label>
            <input
              id="product_code"
              class="form-control"
              type="text"
              placeholder="xxxx"
              v-model="code"
            />
          </div>
          <div class="col-12 col-sm">
            <label for="product_order" class="form-label">Order</label>
            <input
              id="product_order"
              class="form-control"
              type="number"
              placeholder="xxxx"
              v-model.number="order"
            />
          </div>
        </div>
      </div>
      <!-- Prices -->
      <div class="col-12 mb-3">
        <tabs-duplicator
          class="mb-3"
          :items="currencies"
          @selectedItem="setSelectedPriceCurrency"
        >
          <template #label="{ item }">
            <span class="text-nowrap">
              {{ item.label }}
            </span>
          </template>
        </tabs-duplicator>
        <div v-if="selectedPriceCurrency">
          <!-- Price -->
          <div>
            <label
              :for="`price-target-${selectedPriceCurrency.id}`"
              class="form-label"
            >
              {{ selectedPriceCurrency.label }} Price
            </label>
            <input
              :id="`price-target-${selectedPriceCurrency.id}`"
              class="form-control"
              type="number"
              placeholder="0000"
              v-model.number="prices[selectedPriceCurrency.id]"
            />
          </div>
          <!-- Cost Price -->
          <div>
            <label
              :for="`cost-price-target-${selectedPriceCurrency.id}`"
              class="form-label"
            >
              {{ selectedPriceCurrency.label }} Cost Price
            </label>
            <input
              :id="`cost-price-target-${selectedPriceCurrency.id}`"
              class="form-control"
              type="number"
              placeholder="0000"
              v-model.number="costPrices[selectedPriceCurrency.id]"
            />
          </div>
        </div>
      </div>
      <!-- SKUs -->
      <div class="col-12 mb-3">
        <Tags
          id-target="skus-tags"
          label="SKUs"
          placeholder="xx...x"
          :array="skUs"
          @tags="getSkuTags"
        />
      </div>
      <!-- Barcodes -->
      <div class="col-12 mb-3">
        <Tags
          id-target="barcodes-tags"
          label="Barcodes"
          placeholder="xx...x"
          :array="barcodes"
          @tags="getBarcodes"
        />
      </div>

      <div class="col-12 mb-3">
        <div class="row">
          <!-- Physicals -->
          <div
            v-for="item in physicalKeys"
            :key="item.key"
            class="col-12 col-sm-3 mb-3"
          >
            <label :for="item.key" class="form-label">{{ item.label }}</label>
            <input
              :id="item.key"
              class="form-control"
              type="number"
              placeholder="0000"
              v-model.number="physicalValues[item.key]"
            />
          </div>
        </div>

        <!-- Add shop modal button and table -->
        <div class="mt-3 col-12">
          <div v-if="!!shopsTable.length">
            <table class="table gs-3 gy-3 gx-5">
              <thead>
                <tr
                  class="fw-bold fs-5 text-gray-800 border-bottom border-gray-200 text-capitalize"
                >
                  <th class="text-truncate">#</th>
                  <th class="text-truncate">Shop Name</th>
                  <th class="text-truncate">actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, $index) in shopsTable" :key="item.shopId">
                  <td>
                    <div class="td-holder">
                      {{ $index + 1 }}
                    </div>
                  </td>
                  <td>
                    <div class="td-holder">
                      <img
                        :src="item.imagePath"
                        alt=""
                        width="25"
                        class="me-1"
                      />
                      <p
                        v-text="item.shopName"
                        style="max-width: 220px"
                        class="text-truncate mb-0"
                      />
                    </div>
                  </td>
                  <td class="text-truncate">
                    <div class="td-holder gap-2">
                      <button
                        type="button"
                        @click="setEditModalValues(item)"
                        class="btn btn-text-warning btn-sm"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        class="btn btn-text-danger btn-sm"
                        @click="removeShopsAlert(item)"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button
            @click="openShopModal"
            type="button"
            class="btn btn-light-primary w-100"
          >
            + Add Shops
          </button>
        </div>
        <!-- Discounts -->
        <div class="mt-3" v-if="!!discountsTableItems.length">
          <table class="table gs-3 gy-3 gx-5">
            <thead>
              <tr
                class="fw-bold fs-5 text-gray-800 border-bottom border-gray-200 text-capitalize"
              >
                <th class="text-truncate">#</th>
                <th class="text-truncate">from</th>
                <th class="text-truncate">to</th>
                <th class="text-truncate">base amount</th>
                <th class="text-truncate">status</th>
                <th class="text-truncate">action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, $index) in discountsTableItems"
                :key="$index"
                @click="setTargetedDiscount(item)"
              >
                <td @click="openDiscountEditModal" class="text-truncate">
                  <div class="td-holder">
                    {{ $index + 1 }}
                  </div>
                </td>
                <td @click="openDiscountEditModal" class="text-truncate">
                  <div class="td-holder">
                    {{ dateFormat(item.startDateTime) }}
                  </div>
                </td>
                <td @click="openDiscountEditModal" class="text-truncate">
                  <div class="td-holder">
                    {{ dateFormat(item.endDateTime) }}
                  </div>
                </td>
                <td @click="openDiscountEditModal" class="text-truncate">
                  <div
                    class="td-holder overflow-auto gap-3"
                    style="max-width: 120px"
                  >
                    <div
                      v-for="(price, i) in getCurrentDiscounts(
                        item.discountPrices || item.prices
                      )"
                      :key="i"
                      class="d-flex gap-2"
                    >
                      <strong v-text="price.discountPrice" />
                      <span
                        v-text="
                          item.discountTypeId === '1' ? '%' : price.currencyCode
                        "
                        class="badge badge-secondary px-1"
                      />
                    </div>
                  </div>
                </td>
                <td
                  @click="openDiscountEditModal"
                  class="text-truncate text-success"
                >
                  <div class="td-holder">
                    <span class="badge badge-success">Active</span>
                  </div>
                </td>
                <td class="text-truncate">
                  <div class="td-holder">
                    <button
                      @click="toggleDeactivateDiscountModal()"
                      type="button"
                      class="btn btn-text-danger btn-sm"
                    >
                      Deactivate
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-3">
          <button
            @click="toggleDiscountsModal()"
            type="button"
            class="btn btn-light-primary w-100"
          >
            + Add Discounts
          </button>
        </div>
      </div>
    </div>

    <!-- Add Shop Modal -->
    <el-dialog
      v-model="addShopModalVisible"
      title="Add New Shop"
      top="3vh"
      :width="dialogWidth"
    >
      <template #default>
        <div class="p-3 overflow-auto" style="height: 61.5vh">
          <div v-if="shops" class="mb-3">
            <h4>Choose a shop</h4>
            <div class="py-1 px-0">
              <Dropdown
                @selectedItem="setSelectedShop"
                :items="shops"
                headClasses="fw-bold p-3 rounded-3 shadow-sm text-capitalize btn-lg mb-8"
                bodyClasses="w-100 text-truncate text-capitalize"
                max-height="320px"
                :disabled="editingShopMode"
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
                        :class="item.isOpened ? 'bi-arrow-up' : 'bi-arrow-down'"
                      ></i>
                    </strong>
                  </div>
                </template>
                <template #bodyContent="{ item }">
                  <div
                    v-if="item"
                    class="d-flex gap-2 align-items-center px-sm-5 py-sm-3 px-3 py-1"
                    :class="{
                      'bg-light-primary':
                        selectedShop && item && selectedShop.id === item.id,
                    }"
                  >
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
                  <label for="2available-quantities" class="form-label">
                    Available Quantities
                  </label>
                  <input
                    type="number"
                    class="form-control form-control-white"
                    id="2available-quantities"
                    v-model.number="shopForm.availableQuantity"
                  />
                </div>
                <div class="form-group my-1 w-50 p-2">
                  <label for="2maxQuantityPerOrder" class="form-label"
                    >Max Quantity Per Order</label
                  >
                  <input
                    type="number"
                    class="form-control form-control-white"
                    id="2maxQuantityPerOrder"
                    v-model.number="shopForm.maxQuantityPerOrder"
                  />
                </div>
              </div>
              <div class="d-flex flex-wrap">
                <div class="form-group my-1 w-50 p-2">
                  <label
                    for="2quantityNotificationCountLimit"
                    class="form-label"
                  >
                    Quantity Notification Count Limit
                  </label>
                  <input
                    type="number"
                    class="form-control form-control-white"
                    id="2quantityNotificationCountLimit"
                    v-model.number="shopForm.quantityNotificationCountLimit"
                  />
                </div>
                <div class="form-group my-1 w-50 p-2">
                  <label
                    for="2maxQuantityPerClientAllThetime"
                    class="form-label"
                  >
                    Max Quantity Per Client All Time
                  </label>
                  <input
                    type="number"
                    class="form-control form-control-white"
                    id="2maxQuantityPerClientAllThetime"
                    v-model.number="shopForm.maxQuantityPerClientAllThetime"
                  />
                </div>
                <div class="form-group my-1 p-2 w-50">
                  <label for="2preparingTimeInMinutes" class="form-label">
                    Preparing Time In Minutes
                  </label>
                  <input
                    type="number"
                    class="form-control form-control-white"
                    id="2preparingTimeInMinutes"
                    v-model.number="shopForm.preparingTimeInMinutes"
                  />
                </div>
              </div>
              <div class="form-group my-1 d-flex gap-2 fw-bold">
                <input
                  class="form-check-input form-control-white"
                  type="checkbox"
                  id="2isSoldOutOnShopLink"
                  v-model="shopForm.isSoldOutOnShopLink"
                />
                <label for="2isSoldOutOnShopLink">
                  Is Sold Out On Shop Link
                </label>
              </div>
              <div class="form-group my-1 d-flex gap-2 fw-bold">
                <input
                  class="form-check-input form-control-white"
                  type="checkbox"
                  id="2isSoldOutOnJetOrder"
                  v-model="shopForm.isSoldOutOnJetOrder"
                />
                <label for="2isSoldOutOnJetOrder">
                  Is Sold Out On JetOrder
                </label>
              </div>
              <div class="form-group my-1 d-flex gap-2 fw-bold">
                <input
                  class="form-check-input form-control-white"
                  type="checkbox"
                  id="2isPublishedOnShopLink"
                  v-model="shopForm.isPublishedOnShopLink"
                />
                <label for="2isPublishedOnShopLink">
                  Is Published On Shop Link
                </label>
              </div>
              <div class="form-group my-1 d-flex gap-2 fw-bold">
                <input
                  class="form-check-input form-control-white"
                  type="checkbox"
                  id="2isPublishedOnJetOrderApplication"
                  v-model="shopForm.isPublishedOnJetOrderApplication"
                />
                <label for="2isPublishedOnJetOrderApplication">
                  Is Published On JetOrder Application
                </label>
              </div>
            </form>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="dialog-footer d-flex gap-3 flex-column">
          <div v-if="!!addShopErrorMessage" v-html="addShopErrorMessage" />
          <div class="d-flex gap-3">
            <button @click="closeShopModal" type="button" class="btn btn-light">
              Cancel
            </button>
            <button
              @click="submitNewShop"
              type="button"
              class="btn btn-primary"
              :disabled="!isShopDataValid"
            >
              Save
            </button>
          </div>
        </div>
      </template>
    </el-dialog>

    <!-- Add Discounts Modal -->
    <el-dialog
      v-model="addNewDiscountModalVisible"
      title="Add New Discount"
      top="3vh"
      :width="dialogWidth"
    >
      <template #default>
        <div
          v-if="shops && shops.length && !!discountTypes.length"
          class="p-3 overflow-auto"
          style="height: 61.5vh"
        >
          <label class="form-label">Select one shop or more</label>
          <div>
            <Dropdown
              :items="shopsTable"
              :multiSelect="true"
              :outter-ids="selectedDiscountShops"
              bodyClasses="w-100 text-truncate text-capitalize"
              headClasses="fw-bold p-3 rounded-3 shadow-sm text-capitalize btn-lg mb-3"
              max-height="200px"
              @selectedItem="dropdownSelectedDiscountShops"
              id-key="shopId"
              :disabled="discountEditMode"
            >
              <template #headerContent="{ item }">
                <span class="d-flex justify-content-between align-items-center">
                  <span class="w-100 text-truncate">
                    select Shop
                    <small
                      class="text-muted"
                      v-if="!!selectedDiscountShops.length"
                    >
                      ({{ selectedDiscountShops.length }})
                    </small>
                  </span>
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
                    selectedDiscountShops.includes(item.shopId)
                      ? 'background-color: #1bc5bd; color: #fff;'
                      : '',
                  ]"
                  class="px-sm-5 py-sm-3 px-3 py-1 w-100 d-flex gap-2 align-items-center"
                >
                  <img
                    :src="item.imagePath"
                    alt=""
                    width="27"
                    class="rounded-circle"
                  />
                  <span>
                    {{ item.shopName }}
                  </span>
                  <i
                    v-if="selectedDiscountShops.includes(item.shopId)"
                    class="bi bi-check text-white ms-auto"
                    style="font-size: large"
                  ></i>
                </div>
              </template>
            </Dropdown>
            <!-- Tags -->
            <div class="d-flex gap-3 flex-wrap my-4">
              <span
                v-for="(item, $index) in selectedProductDiscountShops"
                :key="$index"
                class="badge badge-secondary gap-2 align-items-center"
              >
                <img
                  :src="item.imagePath"
                  alt=""
                  width="20"
                  class="rounded-circle"
                />
                {{ item.shopName }}
              </span>
            </div>
          </div>
          <label class="form-label">Select Discount Type</label>
          <div>
            <Dropdown
              @selectedItem="setSelectedDiscountType"
              :items="discountTypes"
              class="w-100"
              headClasses="fw-bold py-3 px-5 rounded-3 text-capitalize shadow-sm"
              bodyClasses=" w-100 text-truncate text-capitalize"
              :disabled="discountEditMode"
            >
              <template #headerContent="{ item }">
                <span v-if="!selectedDiscountType">Select Discount Type</span>
                <span v-else v-text="selectedDiscountType.value" />
              </template>
              <template #bodyContent="{ item }">
                <div
                  v-if="item"
                  v-text="item.value"
                  class="px-sm-5 py-sm-3 px-3 py-1"
                  :class="{
                    'bg-primary text-white':
                      selectedDiscountType &&
                      selectedDiscountType.id === item.id,
                  }"
                />
              </template>
            </Dropdown>
          </div>
          <div v-if="!!selectedDiscountType" class="mt-3">
            <div class="card-body px-0 py-1">
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
                v-if="
                  selectedDiscountCurrency && selectedDiscountType.id === '1'
                "
                v-model="discounts[selectedDiscountCurrency.id]"
                class="form-control"
                placeholder="input a percentage discount (%)"
                type="number"
                :readonly="discountEditMode"
              />
              <input
                v-if="
                  selectedDiscountCurrency && selectedDiscountType.id === '2'
                "
                v-model.number="discounts[selectedDiscountCurrency.id]"
                class="form-control"
                placeholder="input an Amount discount"
                type="number"
                :readonly="discountEditMode"
              />
              <small class="text-muted fw-bold px-1"
                >* the discount must be more than the base price!</small
              >
            </div>
          </div>
          <!-- Select Period -->
          <div class="card-body py-1 px-0 mx-auto mt-5">
            <h4 class="form-label">Discount Period</h4>
            <div class="my-5">
              <div class="d-flex gap-5 flex-wrap">
                <div class="block w-100">
                  <el-date-picker
                    v-model="discountStartDate"
                    class="w-100"
                    placeholder="Discount From"
                    size="large"
                    :readonly="discountEditMode"
                  />
                </div>
                <div class="block w-100">
                  <el-date-picker
                    v-model="discountEndDate"
                    class="w-100"
                    placeholder="Discount to"
                    size="large"
                    :readonly="discountEditMode"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="dialog-footer d-flex gap-3">
          <button
            v-if="!discountEditMode"
            @click="submitDiscountData"
            type="button"
            class="btn btn-primary"
            :disabled="!isDiscountsValid"
          >
            Save
          </button>
          <button
            v-else
            @click="toggleDiscountsModal"
            type="button"
            class="btn btn-light"
          >
            Close
          </button>
        </div>
      </template>
    </el-dialog>

    <!-- Confirmation Dialogs -->

    <!-- deactivate discount -->
    <ConfirmationDialog v-model="deactivateDiscountModal">
      <template #content>
        <div
          class="d-flex justify-content-center align-items-center flex-column gap-3"
        >
          <div style="width: 230px">
            <img
              src="@/assets/deactivate-discount.jpg"
              alt=""
              width="50"
              class="w-100"
              style="object-fit: contain"
            />
          </div>
          <div>
            <p>
              You will Deactivate this discount. you can't revert that again!
            </p>
          </div>
        </div>
      </template>
      <template #dialogFooter>
        <div class="p-1 d-flex justify-content-center align-items-center gap-2">
          <el-button
            @click="deactivateDiscountModal = false"
            type="text"
            color="secondary"
            class="w-100"
            :disabled="deactivatingDiscount"
          >
            No, cancel!
          </el-button>
          <el-button
            class="w-100 shadow"
            type="danger"
            :loading="deactivatingDiscount"
            @click="deactivateDiscount"
          >
            Yes, Delete
          </el-button>
        </div>
      </template>
    </ConfirmationDialog>
    <!-- delete shop -->
    <ConfirmationDialog v-model="deleteShopModal">
      <template #content>
        <div
          class="d-flex justify-content-center align-items-center flex-column gap-3"
        >
          <div style="width: 230px">
            <img
              src="@/assets/stunned-face.webp"
              alt=""
              width="50"
              class="w-100"
              style="object-fit: contain"
            />
          </div>
          <div>
            <p>
              You will remove
              <strong v-text="targetedShop.shopName || 'this'" /> shop!
            </p>
          </div>
        </div>
      </template>
      <template #dialogFooter>
        <div class="p-1 d-flex justify-content-center align-items-center gap-2">
          <el-button
            @click="deleteShopModal = false"
            type="text"
            color="secondary"
            class="w-100"
            :disabled="removingShopFromTable"
          >
            No, cancel!
          </el-button>
          <el-button
            class="w-100 shadow"
            type="danger"
            :loading="removingShopFromTable"
            @click="removeShop"
          >
            Yes, Delete
          </el-button>
        </div>
      </template>
    </ConfirmationDialog>
  </div>
</template>

<script lang="ts" setup>
import Tags from "@/components/Reusable/Tags.vue";
import ConfirmationDialog from "@/components/Reusable/ConfirmationDialog.vue";
import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";
import Dropdown from "@/components/Reusable/Dropdown.vue";
import { computed, onMounted, watch } from "vue";
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { onUpdated, watchEffect } from "@vue/runtime-core";
import Api from "@/utils/ApiHelper";
import { compareTwoDates, dateFormat } from "@/utils/helpers";

const store = useStore();

const props = defineProps({
  type: {
    type: Object,
    required: true,
  },
  dialogWidth: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["modal-data", "is-form-valid"]);

const product = computed(() => store.state.UpdateProduct.product);

// shop
const shops = computed(() => store.state.MarketModule.market?.shops);
const deleteShopModal = ref(false);
const shopsTable = ref<any[]>([]);
const editingShopMode = ref(false);
const removingShopFromTable = ref(false);
const shopForm = ref({
  shopId: "",
  availableQuantity: "",
  maxQuantityPerOrder: "",
  quantityNotificationCountLimit: "",
  maxQuantityPerClientAllThetime: "",
  preparingTimeInMinutes: "",
  isSoldOutOnShopLink: false,
  isSoldOutOnJetOrder: false,
  isPublishedOnShopLink: false,
  isPublishedOnJetOrderApplication: false,
});
const addShopModalVisible = ref(false);
const selectedShop = ref();
const targetedShop = ref();
const setSelectedShop = (selectedItem: any) => {
  selectedShop.value = selectedItem;
};
const addShopErrorMessage = ref("");
const isShopDataValid = computed((): boolean => {
  let state: boolean = false;

  state =
    !!selectedShop.value &&
    !!shopForm.value.availableQuantity &&
    !!shopForm.value.maxQuantityPerOrder &&
    !!shopForm.value.quantityNotificationCountLimit &&
    !!shopForm.value.maxQuantityPerClientAllThetime &&
    !!shopForm.value.preparingTimeInMinutes;

  return state;
});

const submitNewShop = () => {
  let data: any = null;

  data = {
    shopId: selectedShop.value?.id || null,
    shopName: selectedShop.value?.name || null,
    imagePath: selectedShop.value?.logoPath,
    availableQuantity: shopForm.value.availableQuantity,
    maxQuantityPerOrder: shopForm.value.maxQuantityPerOrder,
    quantityNotificationCountLimit:
      shopForm.value.quantityNotificationCountLimit,
    maxQuantityPerClientAllThetime:
      shopForm.value.maxQuantityPerClientAllThetime,
    isSoldOutOnShopLink: shopForm.value.isSoldOutOnShopLink,
    isSoldOutOnJetOrder: shopForm.value.isSoldOutOnJetOrder,
    isPublishedOnShopLink: shopForm.value.isPublishedOnShopLink,
    isPublishedOnJetOrderApplication:
      shopForm.value.isPublishedOnJetOrderApplication,
    preparingTimeInMinutes: shopForm.value.preparingTimeInMinutes,
  };

  let item = shopsTable.value.find((i) => i.shopId === data.shopId);
  if (!item && !editingShopMode.value) {
    shopsTable.value.push(data);
    addShopErrorMessage.value = "";
    addShopModalVisible.value = false;
  } else if (item && editingShopMode.value) {
    item = data;
    closeShopModal();
  } else {
    addShopErrorMessage.value = `<p class="text-danger" style="text-align: justify">🤡 This shop is already exist!</p>`;
  }
};
const removeShopsAlert = (shop: any) => {
  targetedShop.value = shop;
  deleteShopModal.value = true;
};
const removeShop = (): any => {
  removingShopFromTable.value = true;
  const shop = targetedShop.value;

  setTimeout(() => {
    shopsTable.value = shopsTable.value.filter((i) => i.shopId !== shop.shopId);
    removingShopFromTable.value = false;
    deleteShopModal.value = false;
  }, 100);
};
const setEditModalValues = (shop) => {
  editingShopMode.value = true;
  addShopModalVisible.value = true;
  targetedShop.value = shop;
  shopForm.value = shop;
  const wantedShop = shops.value.find((i) => i.id === shop.shopId);
  setSelectedShop(wantedShop);
};
const openShopModal = () => {
  if (!editingShopMode.value) {
    shopForm.value = {
      shopId: "",
      availableQuantity: "",
      maxQuantityPerOrder: "",
      quantityNotificationCountLimit: "",
      maxQuantityPerClientAllThetime: "",
      preparingTimeInMinutes: "",
      isSoldOutOnShopLink: false,
      isSoldOutOnJetOrder: false,
      isPublishedOnShopLink: false,
      isPublishedOnJetOrderApplication: false,
    };
    setSelectedShop(null);
  }
  addShopModalVisible.value = true;
};
const closeShopModal = () => {
  editingShopMode.value = false;
  addShopModalVisible.value = false;
};
watch(addShopModalVisible, (newVal) => {
  if (!!editingShopMode.value && !newVal) {
    shopForm.value = {
      shopId: "",
      availableQuantity: "",
      maxQuantityPerOrder: "",
      quantityNotificationCountLimit: "",
      maxQuantityPerClientAllThetime: "",
      preparingTimeInMinutes: "",
      isSoldOutOnShopLink: false,
      isSoldOutOnJetOrder: false,
      isPublishedOnShopLink: false,
      isPublishedOnJetOrderApplication: false,
    };
    setSelectedShop(null);
    closeShopModal();
  }
});
// code
const code = ref("");
// order
const order = ref();
// physical attributes
const physicalKeys = ref([
  {
    key: "weightInKG",
    label: "Weight in KG",
  },
  {
    key: "widthInCM",
    label: "Width in CM",
  },
  {
    key: "lengthInCM",
    label: "Length in CM",
  },
  {
    key: "heightInCM",
    label: "Height in CM",
  },
]);
const physicalValues = ref({});

const isPhysicalValuesValid = computed((): boolean => {
  let state = false;
  Object.keys(physicalValues.value).forEach(
    (el: any, index: number, array: any[]): void => {
      state =
        array.length === physicalKeys.value.length &&
        !!physicalValues.value[el];
    }
  );

  return state;
});

// skus
const skUs = ref<any[]>([]);
const getSkuTags = (array: any[]) => {
  skUs.value = array;
};
// barcode
const barcodes = ref<any[]>([]);
const getBarcodes = (array: any[]) => {
  barcodes.value = array;
};
// currencies
const currencies = computed(() => {
  const allCurrencies = store.state.LookupQueries.currencies?.data;
  const marketCurrencies = store.state.MarketModule.market?.currencies;

  return allCurrencies?.filter((currency) =>
    marketCurrencies?.find(
      (marketCurrencyId) => marketCurrencyId === currency.id
    )
  );
});
// discount

//* <MultiSelect "dropdown"> local store
const selectedDiscountShops = ref<any[]>([]); //-> the selected items' IDs
const selectedProductDiscountShops = ref(); //-> the final result of the selected items (what you're going to use in the template)

const findSelectedDiscountShops = (ids: Array<any> = []) => {
  selectedProductDiscountShops.value = shopsTable.value?.filter((item) =>
    ids.includes(item.shopId)
  );
};
// where you receive the data from the dropdown component
const dropdownSelectedDiscountShops = (
  selectedItemsCallback: any,
  isGlobal?: boolean
) => {
  if (!isGlobal) {
  }
  selectedDiscountShops.value = selectedItemsCallback;
  findSelectedDiscountShops(selectedItemsCallback);
};
const discountTypes = ref([]);
const selectedDiscountType = ref();
const setSelectedDiscountType = (payload: any) => {
  selectedDiscountType.value = payload;
};

const getDiscountTypes = async () => {
  const reqData = {
    method: "get",
    url: "/LookupQueries/get-product-discount-types",
  };
  try {
    const { data }: any = await Api(reqData);
    if (data?.succeeded) {
      discountTypes.value = data.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const discountsTableItems = ref<any[]>([]);
const discounts = ref({});
const discountStartDate = ref();
const discountEndDate = ref();
const addNewDiscountModalVisible = ref(false);
const selectedDiscountCurrency = ref();
const targetedDiscount = ref();
const deactivateDiscountModal = ref(false);
const deactivatingDiscount = ref(false);
const discountEditMode = ref(true);
const toggleDiscountsModal = () => {
  addNewDiscountModalVisible.value = !addNewDiscountModalVisible.value;
  discountEditMode.value = false;
};

const openDiscountEditModal = () => {
  discountEditMode.value = true;
  addNewDiscountModalVisible.value = true;
};
const toggleDeactivateDiscountModal = () => {
  deactivateDiscountModal.value = !deactivateDiscountModal.value;
};
const setSelectedDiscountCurrency = (payload: any) => {
  selectedDiscountCurrency.value = payload;
};
const getCurrentDiscounts = (prices: any[]) => {
  const allCurrencies: any[] = currencies.value;
  const marketCurrencies: any[] = store.state.MarketModule.market?.currencies;
  const availableCurrencies: any[] = allCurrencies.filter((i) =>
    marketCurrencies?.includes(i.id)
  );
  const finalCurrenciesArray: any[] = [];

  if (!!availableCurrencies?.length) {
    availableCurrencies.forEach((currency) => {
      const price = prices?.find((p) => p.currencyId === currency.id);

      if (price) {
        finalCurrenciesArray.push({
          discountPrice: price.discountPrice,
          currencyId: currency.id,
          currencyCode: currency.code,
          currencyName: currency.label,
        });
      }
    });
  }

  return finalCurrenciesArray;
};

const isDiscountDatesValid = (date1: string, date2: string) => {
  const compare = compareTwoDates(date1, date2);

  return compare.isValidForDiscount;
};
const isDiscountsValid = computed((): boolean => {
  let state: boolean = false;
  let discountDataIsValid: boolean = false;
  Object.keys(discounts.value).forEach(
    (el: any, i: number, array: any[]): void => {
      discountDataIsValid = array.length >= 1 && !!discounts.value[el];
    }
  );

  if (
    selectedDiscountType.value?.id &&
    selectedProductDiscountShops.value?.length > 0 &&
    discountDataIsValid &&
    discountStartDate.value &&
    discountEndDate.value &&
    isDiscountDatesValid(
      dateFormat(discountStartDate.value, true),
      dateFormat(discountEndDate.value, true)
    )
  ) {
    state = true;
  }
  return state;
});

const submitDiscountData = () => {
  let discountData = {};
  const discountPrices: any[] = [];

  Object.keys(discounts.value).forEach((el) => {
    discountPrices.push({
      currencyId: el,
      discountPrice: discounts.value[el],
    });
  });

  discountData = {
    id: null,
    isActive: true,
    discountTypeId: selectedDiscountType.value.id,
    shops: selectedProductDiscountShops.value,
    startDateTime: discountStartDate.value,
    endDateTime: discountEndDate.value,
    discountPrices,
  };

  const targetedStartDate = dateFormat(discountData["startDateTime"]);
  const targetedEndDate = dateFormat(discountData["endDateTime"]);

  const item = discountsTableItems.value.find(
    (i) =>
      dateFormat(i.startDateTime) === targetedStartDate &&
      dateFormat(i.endDateTime) === targetedEndDate
  );

  if (!item) {
    discountsTableItems.value.push(discountData);
    addNewDiscountModalVisible.value = false;
    setSelectedDiscountType(discountTypes.value[0]);
    setSelectedDiscountCurrency(currencies.value[0]);
    dropdownSelectedDiscountShops([], true);
    discounts.value = {};
    discountStartDate.value = null;
    discountEndDate.value = null;
  }
};
const setTargetedDiscount = (target: any) => {
  targetedDiscount.value = target;
  dropdownSelectedDiscountShops(target.shops || [], true);
  target.discountPrices.forEach((discount) => {
    discounts.value[discount.currencyId] = discount.discountPrice;
  });
  discountStartDate.value = target.startDateTime;
  discountEndDate.value = target.endDateTime;
  const selectedTargetedDiscountType = discountTypes.value.find(
    (i: any) => i.id === target.discountTypeId
  );
  setSelectedDiscountType(selectedTargetedDiscountType);
};
const deactivateDiscount = () => {
  deactivatingDiscount.value = true;
  const targetedStartDate = dateFormat(targetedDiscount.value?.startDateTime);
  const targetedEndDate = dateFormat(targetedDiscount.value?.endDateTime);
  const discount = discountsTableItems.value.find(
    (i) =>
      dateFormat(i.startDateTime) === targetedStartDate &&
      dateFormat(i.endDateTime) === targetedEndDate
  );
  const discountIndex = discountsTableItems.value.indexOf(discount);
  setTimeout(() => {
    discountsTableItems.value = discountsTableItems.value.filter(
      (item, i, array) => i !== discountIndex
    );
    deactivatingDiscount.value = false;
    toggleDeactivateDiscountModal();
  }, 100);
};
const isDiscountValid = (date1: string, date2: string) => {
  const compare = compareTwoDates(date1, date2);

  return compare.isValidForDiscount;
};

watch(discountEditMode, (newValue) => {
  if (!newValue) {
    setSelectedDiscountType(discountTypes.value[0]);
    setSelectedDiscountCurrency(currencies.value[0]);
    dropdownSelectedDiscountShops([], true);
    discounts.value = {};
    discountStartDate.value = null;
    discountEndDate.value = null;
  }
});
// price and cost price
const prices = ref({});
const costPrices = ref({});
const selectedPriceCurrency = ref();
const setSelectedPriceCurrency = (payload: any) => {
  selectedPriceCurrency.value = payload;
};

const isPricesValid = computed((): boolean => {
  let state1: boolean = false;
  let state2: boolean = false;

  Object.keys(prices.value).forEach(
    (priceEl: any, index: number, pricesArray: any[]): void => {
      state1 =
        currencies.value.length === pricesArray.length &&
        !!prices.value[priceEl];
    }
  );
  Object.keys(costPrices.value).forEach(
    (priceEl: any, index: number, pricesArray: any[]): void => {
      state2 =
        currencies.value.length === pricesArray.length &&
        !!costPrices.value[priceEl];
    }
  );

  return state1 && state2;
});

const isFormValid = computed((): boolean => {
  return (
    !!code.value &&
    !!order.value &&
    isPhysicalValuesValid.value &&
    isPricesValid.value &&
    skUs.value.length > 0 &&
    barcodes.value.length > 0 &&
    shopsTable.value.length > 0 &&
    discountsTableItems.value.length > 0
  );
});

const updateProductVariationData = () => {
  let payload: any = {
    id: product.value?.id,
    productVariation: {
      ...physicalValues.value,
      tallInCM: 0,
      code: code.value,
      order: order.value,
      prices: [
        {
          currencyId: "",
          price: 0,
          costPrice: 0,
        },
      ],
      discountData: [
        {
          id: "",
          discountTypeId: "",
          shops: [""],
          discountPrices: [
            {
              currencyId: "",
              discountPrice: 0,
            },
          ],
          startDateTime: "",
          endDateTime: "",
        },
      ],
      barcodes: barcodes.value,
      skUs: skUs.value,
      optionIds: props.type["connectionIds"],
      connectedShops: [...shopsTable.value],
    },
  };

  let finalPrices: any = new Map();
  currencies.value?.forEach((currency) => {
    Object.keys(prices.value).forEach((key) => {
      if (key.includes(currency.id.toString())) {
        finalPrices.set(currency.id, {
          currencyId: currency.id,
          price: prices.value[currency.id],
          costPrice: costPrices.value[currency.id],
        });
      }
    });
  });
  payload.productVariation.prices = Array.from(finalPrices, ([key, value]) => {
    return value;
  });

  let finalDiscountsArray: any = [];

  finalDiscountsArray = discountsTableItems.value.map((el) => {
    if (!!el.shops?.length)
      el.shops = el.shops?.map((i) => {
        return i?.id || i?.shopId || i;
      });
    return el;
  });

  payload.productVariation.discountData = finalDiscountsArray;

  emit("modal-data", payload);
};
const initProductData = () => {
  const type = props.type;
  if (type) {
    code.value = type.code;
    order.value = type.order || null;
    barcodes.value = type.barcodes;
    skUs.value = type.skUs;
    physicalValues.value["weightInKG"] = type.weightInKG;
    physicalValues.value["widthInCM"] = type.widthInCM;
    physicalValues.value["heightInCM"] = type.heightInCM;
    physicalValues.value["lengthInCM"] = type.lengthInCM;
    discountsTableItems.value = type.discounts;

    type.prices?.forEach((el: any) => {
      prices.value[el.currencyId] = el.price;
      costPrices.value[el.currencyId] = el.costPrice;
    });

    type.productShops?.forEach((el) => {
      const shop = shops.value?.find((i) => i.id === el.shopId);
      if (shop) {
        el["shopName"] = shop.name;
        el["imagePath"] = shop.logoPath;
        shopsTable.value.push(el);
      }
    });
  }
};

onMounted(() => {
  if (currencies.value) {
    setSelectedDiscountCurrency(currencies.value[0]);
    setSelectedPriceCurrency(currencies.value[0]);
    setSelectedDiscountType(discountTypes.value[0] || null);
    initProductData();
    getDiscountTypes();
  }
});
watch(currencies.value, (newVal) => {
  if (newVal) {
    setSelectedDiscountCurrency(currencies.value[0]);
    setSelectedPriceCurrency(currencies.value[0]);
    initProductData();
    getDiscountTypes();
  }
});
watchEffect(() => {
  updateProductVariationData();
  if (!selectedDiscountType.value) {
    setSelectedDiscountType(discountTypes.value[0] || null);
  }
});
onUpdated(() => {
  emit("is-form-valid", isFormValid.value);
});
</script>
<style>
.td-holder {
  display: flex;
  align-items: center;
  height: 50px;
}
</style>
