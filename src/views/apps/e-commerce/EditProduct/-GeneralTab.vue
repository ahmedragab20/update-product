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
        <product-resources :langs="langs" :product="props.product" />
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
      <product-pricing :currencies="currencies" :product="props.product" />
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
            <add-discount-modal
              :currencies="currencies"
              :product-id="props.product.id"
              @newDiscount="addNewDiscount"
            />
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
              <template #label="{ item }: any">
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
import ProductResources from "./-ProductResources.vue";
import ProductPricing from "./-ProductPricing.vue";
import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";
import { ref } from "@vue/reactivity";
import { computed, watch } from "@vue/runtime-core";
import { onBeforeMount, onMounted } from "vue";
import DiscountTable from "./-DiscountTable.vue";
import Tax from "./-Tax.vue";
import Inventory from "./-Inventory.vue";
import AddDiscountModal from "./-AddDiscountModal.vue";
import { dateFormat, swalAlert } from "@/utils/helpers";
import Media from "./-Media.vue";
import { useStore } from "vuex";
import CountableProduct from "@/views/apps/e-commerce/EditProduct/-CountableProduct.vue";
import DownloadableProduct from "@/views/apps/e-commerce/EditProduct/-DownloadableProduct.vue";
import { Language } from "@/types";

const store = useStore();
const props = defineProps(["product", "currentTab"]);

/*THE BEGAN OF:: THE EDITOR LOGIC */

const langs = computed(() => {
  const allLanguages = store.state.LookupQueries?.languages?.data;
  const marketLanguages = store.state.MarketModule?.market?.languages;

  return allLanguages?.filter((lang: Language) =>
    marketLanguages?.find((marketLangId: string) => marketLangId === lang.id)
  );
});

const currencies = computed(() => {
  const allCurrencies = store.state.LookupQueries.currencies?.data;
  const marketCurrencies = store.state.MarketModule.market?.currencies;

  return allCurrencies?.filter((currency) =>
    marketCurrencies?.find(
      (marketCurrencyId) => marketCurrencyId === currency.id
    )
  );
});

/* DISCOUNT LOGIC */
// const productDiscounts = ref<any[]>([]);

const activeDiscounts = ref<any[]>([]);
const deactivatedDiscounts = ref<any[]>([]);
const discountTable = ref([
  { id: "active-discount", label: "Active" },
  { id: "deactivated-discount", label: "Deactivated" }
]);
const selectedDiscountTableType = ref();
const setSelectedDiscountTable = (discount: any) => {
  selectedDiscountTableType.value = discount;
};

const getActiveDiscounts = async (productId: string | number) => {
  const reqData = {
    method: "get",
    url: `/ProductQueries/get-product-active-discounts`,
    payload: {
      productId,
      pageSize: 0,
      pageNumber: 0
    }
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
      pageNumber: 0
    }
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
    payload: discount
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
    const targetedDiscountIndex =
      activeDiscounts.value.indexOf(targetedDiscount);

    targetedDiscount.isActive = false;
    deactivatedDiscounts.value = [
      targetedDiscount,
      ...deactivatedDiscounts.value
    ];

    activeDiscounts.value = activeDiscounts.value.filter(
      (el, index, array) => array.indexOf(el) !== targetedDiscountIndex
    );
  };
  if (!!discount.id) {
    const payload = {
      id: props.product.id,
      discountId: discount["id"]
    };
    const reqData = {
      method: "post",
      url: "/ProductCommands/deactivate-product-discount",
      payload
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

const addNewDiscount = (discount: object) => {
  console.log({ discount });

  activeDiscounts.value = [discount, ...activeDiscounts.value];
};

onBeforeMount(() => {
  getActiveDiscounts(props.product?.id);
  getDeactivatedDiscounts(props.product?.id);
});
onMounted(() => {
  if (props.product) {
    if (activeDiscounts.value && activeDiscounts.value.length >= 0) {
      const activeItem = discountTable.value.find(
        (i) => i.id === "active-discount"
      );

      setSelectedDiscountTable(activeItem);
    }
  }
});
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
