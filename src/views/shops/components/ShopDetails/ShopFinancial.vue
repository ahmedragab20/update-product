<template>
    <!--begin::Basic info-->
    <div class="card mb-5 mb-xl-10">
      <!--begin::Card header-->
      <div
        class="card-header border-0 cursor-pointer"
        role="button"
        data-bs-toggle="collapse"
        data-bs-target="#kt_account_profile_details"
        aria-expanded="true"
        aria-controls="kt_account_profile_details"
      >
        <!--begin::Card title-->
        <div class="card-title m-0">
          <h3 class="fw-bolder m-0">{{ $t("shopFinancial") }}</h3>
        </div>
 
        <!--end::Card title-->
      </div>
  
      <!--begin::Card header-->
      <div class="card-body p-9">
      <!--begin::Row-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-bold text-muted">{{ $t("walletName") }}</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bolder fs-6 text-dark">
            {{ form.name }}
          </span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->
      <!--begin::Row-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-bold text-muted">{{ $t("walletKey") }}</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bolder fs-6 text-dark">
            {{ form.key }}
          </span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->
      <!--begin::Row-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-bold text-muted">{{ $t("availableBalance") }}</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bolder fs-6 text-dark">
           {{ form.availableBalance }}
          </span>
        </div>
        <!--end::Col-->
      </div>
       <!--end::Row-->
      <!--begin::Row-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-bold text-muted">{{ $t("freezedBalance") }}</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bolder fs-6 text-dark">
           {{ form.freezedBalance }}
          </span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->
      <!--begin::Row-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-bold text-muted">{{ $t("currencies") }}</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
         
          <span
        
           
            class="fw-bolder fs-6 text-dark"
          >
          {{ currencies?.find((x) => x.id == form.currencyId)?.label}}
          </span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->
      <!--begin::Row-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-bold text-muted">{{ $t("description") }}</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bolder fs-6 text-dark">
            {{ form.description }}
          </span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->
    </div>
      <!--end::Content-->
    </div>
    <!--end::Basic info-->
  </template>
  
  <script lang="ts" setup>
  import { ref, computed, reactive, watch, onMounted, watchEffect } from "vue";
  import { Actions } from "@/store/enums/StoreEnums";
  import { useStore } from "vuex";

  
  // define interfaces
  interface Currency {
  id: string;
  label: string;
  code: string;
  icon: string;
}
  interface Wallet {
  id: string;
  name: string;
  key: string;
  currencyId: string;
  freezedBalance: string;
  description: string;
  availableBalance: string;
}
  const store = useStore();
  const currencies =ref<Currency[]>();

// define wallet
  const wallet = ref<Wallet>({
    id: '',
  name: '',
  key: '',
  currencyId: '',
  freezedBalance: '',
  description: '',
  availableBalance: '',
  });
  // get id as a prop
  let props = defineProps({
    id: String,
  });

  const form = reactive(wallet);


  onMounted(() => {
    // get Supported Currencies
    currencies.value = store.getters.getSupportedCurrencies;
    // get SHOP FINANCIAL
    store.dispatch(Actions.GET_SHOP_FINANCIAL, props.id).then((data) => {
      console.log("ShopFinancial", data);
      wallet.value=data.wallet
    
    });
  });
  </script>
  