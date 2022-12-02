<template>
  <div>
    <!--begin::Card-->
    <div class="card mb-7">
      <!--begin::Card body-->
      <div class="card-body">
        <!--begin::Compact form-->
        <div class="d-flex align-items-center justify-content-between gap-3">
          <!--begin::Input group-->
          <div class="position-relative me-md-2 flex-grow-1">
            <!--begin::Svg Icon | path: icons/duotune/general/gen021.svg-->
            <span
              class="svg-icon svg-icon-3 svg-icon-gray-500 position-absolute top-50 translate-middle ms-6"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  opacity="0.5"
                  x="17.0365"
                  y="15.1223"
                  width="8.15546"
                  height="2"
                  rx="1"
                  transform="rotate(45 17.0365 15.1223)"
                  fill="currentColor"
                ></rect>
                <path
                  d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
            <!--end::Svg Icon-->
            <ElSelect class="w-100" :placeholder="$t('shop')" v-model="filterDto.shopId">
              <ElOption
                v-for="item in market.shops"
                :value="item.id"
                :label="item.name"
              ></ElOption>
            </ElSelect>
          </div>
          <div class="flex-grow-1">
            <ElDatePicker
              class="w-100"
              :placeholder="$t('startDate')"
              v-model="filterDto.startDateimTime"
            >
            </ElDatePicker>
          </div>
          <div class="flex-grow-1">
            <ElDatePicker
              :placeholder="$t('endDate')"
              class="w-100"
              v-model="filterDto.endDateTime"
            ></ElDatePicker>
          </div>
          <!--end::Input group-->
          <!--begin:Action-->
          <div class="d-flex align-items-center">
            <button type="button" class="btn btn-primary me-5" @click="fetchData">
              {{ $t("search") }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-between align-items-center w-100">
      <h2>{{ $t("abandonedCartsOffers") }}</h2>
      <!--begin::Filter-->
      <div class="d-flex align-items-center justify-content-end my-3">
        <ul class="nav nav-pills me-6 mb-2 mb-sm-0">
          <li>
            <el-select
              v-model="pagination.pageSize"
              @change="fetchData()"
              placeholder="Number Of Item"
              class="mx-4"
            >
              <el-option :value="6">6</el-option>
              <el-option :value="15">15</el-option>
              <el-option :value="30">30</el-option>
              <el-option :value="90">90</el-option>
            </el-select>
          </li>
          <!-- <li class="nav-item m-0">
            <a
              @click="setActiveView(Views.TABLE_VIEW)"
              :class="{ active: activeView === Views.TABLE_VIEW }"
              class="btn btn-sm btn-icon btn-light btn-color-muted btn-active-primary"
            >
              <span class="svg-icon svg-icon-2">
                <inline-svg src="/media/icons/duotune/abstract/abs015.svg"></inline-svg>
              </span>
            </a>
          </li>
          <li class="nav-item mx-3">
            <a
              @click="setActiveView(Views.GRID_VIEW)"
              class="btn btn-sm btn-icon btn-light btn-color-muted btn-active-primary me-3"
              :class="{ active: activeView === Views.GRID_VIEW }"
            >
              <inline-svg src="/media/icons/duotune/general/gen024.svg"></inline-svg>
            </a>
          </li> -->
        </ul>
        <button
          type="button"
          @click="resetForm"
          class="btn btn-primary er fs-6 px-8 py-4"
          data-bs-toggle="modal"
          :data-bs-target="`#abandoned-cart-modal`"
        >
          {{ $t("addAbandonedCartOffer") }}
        </button>
      </div>
    </div>

    <TableView @delete-item="deleteOffer" :items="offers"></TableView>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import { Market } from "@/types";
import { Views } from "@/shared/enums/Views";
import { AbandonedCartOffer } from "@/api/data/AbandonedCart";
import TableView from "./components/TableView.vue";
const { state, dispatch, getters, commit } = useStore();
const filterDto = reactive({
  shopId: "",
  startDateimTime: "",
  endDateTime: "",
});

const activeView = ref(Views.TABLE_VIEW);
const offers = computed(
  (): Array<AbandonedCartOffer> => state.AbandonedCarts.abandonedCartsOffers
);
const pagination = computed(() => state.AbandonedCarts.pagination);
const pageNumber = computed(() => pagination.value.pageNumber);
const pageSize = computed(() => pagination.value.pageSize);
const langs = computed(() => getters.getSupportedLanguages);
const currencies = computed(() => getters.getSupportedCurrencies);
const OfferForm = computed((): AbandonedCartOffer => state.AbandonedCarts.offerDto);
const fetchData = () => {
  dispatch(Actions.GET_ABANDONED_CARTS_OFFERS, {
    ...filterDto,
    pageSize: pagination.value.pageSize,
    pageNumber: pagination.value.pageNumber,
  });
};
const market = computed(() => getters.getMarketData as Market);

function deleteOffer(id) {
  dispatch(Actions.REMOVE_ABANDONED_OFFER, id);
}
function initResources() {
  if (OfferForm.value.resources.length === 0)
    langs.value.forEach((element) => {
      OfferForm.value.resources.push({
        languageId: element.id,
        emailHeader: "",
        body: "",
      });
    });
}

function initPrices() {
  if (OfferForm.value.prices.length === 0)
    currencies.value.forEach((cur) => {
      OfferForm.value.prices.push({
        currencyId: cur.id,
        cartTotal: 0,
        discount: 0,
      });
    });
}
function resetForm() {
  commit("SET_OFFER_DTO");
  initResources();
  initPrices();
}

const setActiveView = (val: Views) => {
  activeView.value = val;
};

watch(pageNumber, (nv, old) => {
  if (nv) fetchData();
  console.log(nv, old);
});

fetchData();
</script>
