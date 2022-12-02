<template>
  <!--begin::details View-->
  <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Market Details</h3>
      </div>
      <!--end::Card title-->

      <!--begin::Action-->
      <router-link
        to="/crafted/account/settings"
        class="btn btn-primary align-self-center"
        >Edit Market</router-link
      >
      <!--end::Action-->
    </div>
    <!--begin::Card header-->

    <!--begin::Card body-->
    <div class="card-body p-9">
      <!--begin::Row-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-bold text-muted">Sub Domain</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bolder fs-6 text-dark">
            {{ marketData.subDomain }}
          </span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->
      <!--begin::Row-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-bold text-muted">Description</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bolder fs-6 text-dark">
            {{ marketData.description }}
          </span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->
      <!--begin::Row-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-bold text-muted">Country</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bolder fs-6 text-dark">
            {{ country }}
          </span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->
      <!--begin::Row-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-bold text-muted">Currencies</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span
            v-for="currency in currencies"
            :key="currency.id"
            class="fw-bolder fs-6 text-dark"
          >
            {{ currency.label }}
          </span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->
      <!--begin::Row-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-bold text-muted">Languages</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span
            v-for="lang in languages"
            :key="lang.id"
            class="fw-bolder fs-6 text-dark"
          >
            {{ lang.label }}
          </span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->
    </div>
    <!--end::Card body-->
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref, toRaw } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import store from "@/store";
import { Market } from "@/types";

const lookupQueries = store.state.LookupQueries;
const marketData = ref<Market>(store.getters.getMarketData);
const country = ref("");
const currencies = ref([]);
const languages = ref([]);
currencies.value = store.getters.getSupportedCurrencies;
languages.value = store.getters.getSupportedLanguages;

country.value = lookupQueries.countries?.data?.find(
  (x) => x.id === marketData.value.countryId
).name;

onMounted(() => {
  console.log("marketData", marketData.value);
  setCurrentPageBreadcrumbs("Overview", ["Account"]);
});
</script>
