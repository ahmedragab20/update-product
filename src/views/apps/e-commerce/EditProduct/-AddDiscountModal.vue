<template>
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
            <template #headerContent="{ item }: Shop">
              <span class="d-flex justify-content-between align-items-center">
                <span class="w-100 text-truncate"> select shop </span>
                <strong>
                  <i
                    :class="item.isOpened ? 'bi-arrow-up' : 'bi-arrow-down'"
                  ></i>
                </strong>
              </span>
            </template>
            <template #bodyContent="{ item }: Shop">
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
                    alt=""
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
                  v-if="item && item.id && selectedShopsIds.includes(item.id)"
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
                alt=""
                width="20"
                height="20"
                style="object-fit: cover"
                class="rounded-circle"
              />
              <span>{{ item.name || "unknown" }}</span>
            </div>
          </div>
        </div>
        <div v-if="selectedDiscountType" class="card-body p-0 px-sm-10 py-1">
          <div class="h4 fw-bold mb-5 required">Discount Type</div>
          <Dropdown
            :items="discountTypes"
            bodyClasses="px-sm-5 py-sm-3 px-3 py-1 w-100 text-truncate text-capitalize"
            headClasses="fw-bold p-3 rounded-3 shadow-sm text-capitalize btn-lg mb-8"
            maxHeight="200px"
            @selectedItem="setSelectedDiscountType"
          >
            <template #headerContent="{ item }: any">
              <span class="d-flex justify-content-between align-items-center">
                {{ selectedDiscountType.value }}
                <strong>
                  <i
                    :class="item.isOpened ? 'bi-arrow-up' : 'bi-arrow-down'"
                  ></i>
                </strong>
              </span>
            </template>
            <template #bodyContent="{ item }: any">
              <span>
                {{ item.value }}
              </span>
            </template>
          </Dropdown>
        </div>
        <div>
          <div v-if="selectedDiscountType" class="card-body p-0 px-sm-10 py-1">
            <tabs-duplicator
              class="mb-3"
              :items="currencies"
              @selectedItem="setSelectedDiscountCurrency"
            >
              <template #label="{ item }: any">
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
              v-model.number="discountPrices[selectedDiscountCurrency.id]"
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
          v-else-if="discountErrorMsg && discountErrorMsg !== 'nothing'"
          class="card-body p-0 px-sm-10 py-1 text-danger"
        >
          {{ discountErrorMsg }}🙊
        </div>
      </div>
    </template>
  </BootstrapModal>
</template>

<script lang="ts" setup>
import BootstrapModal from "@/components/Reusable/BootstrapModal.vue";
import Dropdown from "@/components/Reusable/Dropdown.vue";
import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";

import { ref, computed, onBeforeMount, watch, onMounted } from "vue";
import { useStore } from "vuex";

import Api from "@/utils/ApiHelper";
import { dateFormat, compareTwoDates } from "@/utils/helpers";
import { Currency, Shop } from "@/types";

interface Props {
  productId: string;
  currencies: Array<Currency>;
}

const props = defineProps<Props>();

const emit = defineEmits(["new-discount"]);

const store = useStore();

const dateFrom = ref<any>();
const dateTo = ref<any>();
const shops = computed(() => store.state.MarketModule.market?.shops);
const discountPrices = ref({});
const selectedDiscountType = ref<any>();
const selectedDiscountCurrency = ref();
const discountReqData = ref<any>({
  id: props.productId,
  discount: {
    discountTypeId: "",
    discountPrices: [],
    startDateTime: "",
    endDateTime: "",
    shopIds: []
  }
});

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
  finalShopsArray.value = Array.from(selectedShopsMap, ([key, value]) => {
    return value;
  });
};

// where you receive the data from the dropdown component
const shopsDropdownSelectedItems = (selectedItemsCallback: any) => {
  selectedShopsIds.value = selectedItemsCallback;

  findSelectedShops(selectedItemsCallback);
};
const discountTypes = ref();
//* GET DISCOUNT TYPES *//
const getDiscountTypes = async () => {
  const reqData = {
    method: "get",
    url: "/LookupQueries/get-product-discount-types"
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

watch(dateFrom, (newVal) => {
  if (!!newVal) {
    discountReqData.value.discount.startDateTime = newVal;
  }
});
watch(dateTo, (newVal) => {
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
      array.length === props.currencies.length && !!discountPrices.value[el];
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
  props.currencies?.forEach((currency) => {
    Object.keys(discountPrices.value).forEach((key: string) => {
      if (key === currency.id) {
        finalArray.set(currency.id, {
          currencyId: currency.id,
          discountValue: discountPrices.value[key]
        });
      }
    });
  });
  discountReqData.value.discount.discountPrices = Array.from(finalArray, ([key, value]) => {
    return value;
  });

  discountReqData.value.discount.shopIds = finalShopsArray.value.map(
    (shop) => shop.id
  );

  const payload = discountReqData.value;

  const reqData = {
    method: "post",
    url: "/ProductCommands/create-product-discount",
    payload
  };

  try {
    const { data }: any = await Api(reqData);

    if (data?.succeeded) {
      discountErrorMsg.value = "nothing";
      const newDiscount = {
        id: data.data,
        discountTypeId: selectedDiscountType.value.id,
        startDateTime: dateFrom.value,
        endDateTime: dateTo.value,
        prices: payload.discount.discountPrices,
        isActive: true
      };

      emit("new-discount", newDiscount);

      // empty form
      selectedShop.value = null;
      selectedShopsIds.value = [];
      selectedShopsMap.clear();
      finalShopsArray.value = [];
      discountPrices.value = {};
      setSelectedDiscountType(discountTypes.value[0]);
      setSelectedDiscountCurrency(props.currencies[0]);
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
watch(
  () => props.currencies,
  () => {
    if (props.currencies && props.currencies.length > 0) {
      setSelectedDiscountCurrency(props.currencies[0]);
    }
  }
);
onBeforeMount(() => {
  getDiscountTypes();
});
onMounted(() => {
  if (props.currencies && props.currencies.length > 0) {
    setSelectedDiscountCurrency(props.currencies[0]);
  }
});
</script>
