<template>
  <div
    v-if="items && !!items.length"
    class="overflow-auto position-relative"
    style="max-height: 250px"
  >
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
      <tbody style="max-height: 200px; overflow: hidden">
        <tr v-for="(item, $index) in listData()" :key="$index">
          <td class="text-truncate">
            <div class="td-holder">
              {{ $index + 1 }}
            </div>
          </td>
          <td class="text-truncate">
            <div class="td-holder">
              {{ dateFormat(item.startDateTime) }}
            </div>
          </td>
          <td class="text-truncate">
            <div class="td-holder">
              {{ dateFormat(item.endDateTime) }}
            </div>
          </td>
          <td class="text-truncate">
            <div class="td-holder overflow-auto gap-3" style="max-width: 120px">
              <div
                v-for="(price, i) in getCurrentDiscounts(item.prices)"
                :key="i"
                class="d-flex gap-1"
              >
                <strong v-text="price.discountPrice" />
                <span
                  v-text="
                    item.discountTypeId === '1' ? '%' : price.currencyCode
                  "
                  class="badge badge-secondary"
                />
              </div>
            </div>
          </td>
          <td class="text-truncate text-success">
            <div class="td-holder">
              <span v-if="tableType === 'active'" class="badge badge-success">
                Active
              </span>
              <span v-else class="badge badge-danger">Deactivated</span>
            </div>
          </td>
          <td class="text-truncate">
            <div class="td-holder">
              <button
                v-if="tableType === 'active'"
                class="btn btn-text-danger btn-sm"
                @click="deactivateDiscount(item)"
                type="button"
              >
                Deactivate
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div
    v-else
    class="d-flex justify-content-center align-items-center flex-column"
  >
    <img
      src="@/assets/no-discounts.webp"
      alt=""
      width="1000"
      style="
        width: 220px;
        object-fit: contain;
        border-radius: 20px;
        pointer-events: none;
        user-select: none;
      "
    />
    <h5 class="mt-3 text-muted">No discounts yet</h5>
  </div>
  <div v-if="items && items.length > 2" class="d-flex gap-3 pt-3">
    <button
      v-if="itemsNumber < items.length"
      class="btn btn-light-warning btn-sm rounded-3"
      @click="loadMore"
    >
      +{{ items.length - itemsNumber }} item
    </button>
    <button
      v-if="itemsNumber > 2"
      class="btn btn-text-danger btn-sm rounded-3 border"
      @click="loadLess"
      type="button"
    >
      -2
    </button>
  </div>
</template>

<script lang="ts" setup>
import { compareTwoDates, dateFormat } from "@/utils/helpers";
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  productId: {
    type: String || Number,
    required: true,
  },
  deactivateDiscount: {
    type: Function,
    required: true,
  },
  tableType: {
    type: String,
    required: true,
    default: "active",
  },
});

const getCurrentDiscounts = (prices: any[]) => {
  const allCurrencies: any[] = store.state.LookupQueries.currencies?.data;
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
          discountPrice: price.discountPrice || price.discountValue,
          currencyId: currency.id,
          currencyCode: currency.code,
          currencyName: currency.label,
        });
      }
    });
  }

  return finalCurrenciesArray;
};

const itemsNumber = ref(2);
const listData = () => {
  if (props.items) {
    if (props.items.length > itemsNumber.value) {
      return props.items.slice(0, itemsNumber.value);
    } else {
      return props.items;
    }
  }
};
const loadMore = () => {
  itemsNumber.value += 2;
};
const loadLess = () => {
  itemsNumber.value -= 2;
};
</script>
<style scoped>
.td-holder {
  display: flex;
  align-items: center;
  height: 50px;
}
</style>
