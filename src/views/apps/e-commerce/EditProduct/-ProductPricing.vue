<template>
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
          <template #label="{ item }: any">
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
</template>

<script setup lang="ts">
import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";
import SaveChangeBtn from "./-SaveChangeBtn.vue";

import { ref, watch, onMounted } from "vue";

import Api from "@/utils/ApiHelper";
import { Currency, Product } from "@/types";
interface Props {
  product: Product;
  currencies: Array<Currency>;
}

const props = defineProps<Props>();

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
  props.currencies?.forEach((currency) => {
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

onMounted(() => {
  if (props.currencies && props.currencies.length > 0) {
    setSelectedCurrency(props.currencies[0]);
  }
  if (props.product.prices && props.product.prices.length > 0) {
    props.product.prices.forEach((price: any) => {
      prices.value[`price-${price.currencyId}`] = price.price;
      prices.value[`costPrice-${price.currencyId}`] = price.costPrice;
    });
  }
});
watch(
  () => props.currencies,
  (newValue) => {
    if (newValue && newValue && newValue.length > 0) {
      setSelectedCurrency(newValue[0]);
    }
  }
);
watch(
  () => props.product,
  (newValue) => {
    if (newValue && props.product.prices && props.product.prices.length > 0) {
      props.product.prices.forEach((price: any) => {
        prices.value[`price-${price.currencyId}`] = price.price;
        prices.value[`costPrice-${price.currencyId}`] = price.costPrice;
      });
    }
  }
);
</script>
