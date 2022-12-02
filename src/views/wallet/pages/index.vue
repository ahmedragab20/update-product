<template>
  <!-- Search Card  -->
  <div class="card mb-7">
    <!--begin::Card body-->
    <div class="card-body">
      <!--begin::Compact form-->
      <div class="d-flex align-items-center">
        <!--begin::Input group-->
        <div class="position-relative w-md-400px me-md-2">
          <input
            type="text"
            class="form-control form-control-solid ps-10"
            name="search"
            :placeholder="$t('search')"
            v-model="search"
          />
        </div>
        <!--end::Input group-->
        <!--begin:Action-->
        <div class="d-flex align-items-center">
          <button type="button" class="btn btn-primary me-5" @click="fetchData">
            {{ $t("search") }}
          </button>
        </div>
        <!--end:Action-->
      </div>
      <!--end::Compact form-->
    </div>
    <!--end::Card body-->
  </div>
  <!-- Search End  -->

  <!-- Page Title-->
  <div class="d-flex justify-content-between align-items-center w-100">
    <h2>{{ $t("walletPage") }}</h2>
  </div>

  <!--begin::Card body-->
  <div class="row g-4">
    <div class="col-12 col-md-6" v-for="wallet in WalletList" :key="wallet.id">
      <div class="card">
        <!--begin::Card header-->
        <div class="card-header card-header-stretch pb-0">
          <!--begin::Toolbar-->
          <div class="card-toolbar m-0">
            <!--begin::Tab nav-->
            <div class="d-flex align-items-center mb-2">
              <a
                href="#"
                class="text-gray-800 text-hover-primary fs-2 fw-bolder me-1"
                >{{ wallet.name }}</a
              >
              <a href="#">
                <span class="svg-icon svg-icon-1 svg-icon-primary">
                  <inline-svg src="/media/icons/duotune/general/gen026.svg" />
                </span>
              </a>
            </div>
            <!--end::Tab nav-->
          </div>
          <!--end::Toolbar-->
        </div>
        <!--end::Card header-->
        <!--begin::Tab content-->
        <div id="kt_billing_payment_tab_content" class="card-body tab-content">
          <!--begin::Tab panel-->
          <div
            id="kt_billing_creditcard"
            class="tab-pane fade show active"
            role="tabpanel"
          >
            <!--begin::Title-->

            <!--end::Title-->
            <!--begin::Row-->
            <div class="row gx-9 gy-6">
              <!--begin::Col-->
              <div class="col-xl-12" data-kt-billing-element="card">
                <!--begin::Card-->
                <div
                  class="card card-dashed h-xl-100 flex-row flex-stack flex-wrap p-6"
                >
                  <!--begin::Info-->
                  <div class="d-flex flex-column py-2">
                    <!--begin::Owner-->
                    <div class="d-flex align-items-center fs-4 fw-bold mb-5">
                      {{ wallet.key }}
                      <span class="badge badge-light-success fs-7 ms-2">
                        {{ wallet.currency }}</span
                      >
                    </div>
                    <!--end::Owner-->
                    <!--begin::Wrapper-->
                    <div class="d-flex align-items-center">
                      <!--begin::Icon-->
                      <img
                        src="/metronic8/demo7/assets/media/svg/card-logos/visa.svg"
                        alt=""
                        class="me-4"
                      />
                      <!--end::Icon-->
                      <!--begin::Details-->
                      <div>
                        <div class="d-flex align-items-center">
                          <div
                            class="fs-6 fw-semibold text-gray-400 w-100 me-2"
                          >
                            {{ $t("availableBalance") }}
                          </div>
                          <div class="fs-4 fw-bold me-2">
                            {{ wallet.availableBalance }}
                          </div>
                        </div>
                        <div class="d-flex align-items-center">
                          <div
                            class="fs-6 fw-semibold text-gray-400 w-100 me-2"
                          >
                            {{ $t("freezedBalance") }}
                          </div>
                          <div class="fs-4 fw-bold me-2 w-100">
                            {{ wallet.freezedBalance }}
                          </div>
                        </div>
                      </div>
                      <!--end::Details-->
                    </div>
                    <!--end::Wrapper-->
                  </div>
                  <!--end::Info-->
                  <!--begin::Actions-->
                  <div class="d-flex align-items-center py-2">
                    <a role="button" @click="ShareDate(wallet)">
                      <router-link
                        class="menu-link px-3 d-flex justify-content-between align-items-center btn btn-sm btn-light btn-light-primary"
                        :to="`/wallet/wallet-details/${wallet.id}`"
                      >
                        {{ $t("details") }}
                      </router-link>
                    </a>
                  </div>
                  <!--end::Actions-->
                </div>
                <!--end::Card-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Row-->
          </div>
          <!--end::Tab panel-->
        </div>
        <!--end::Tab content-->
      </div>
    </div>
  </div>
  <!--end::Card body-->
  <!--end::Card-->
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { ref, computed } from "vue";

import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Wallet } from "@/types";

const store = useStore();
const filterDto = computed(() => store.state.AllAccounts.filterDto);
// REF

const search = ref("");

// Computed
const WalletList = computed(
  () => store.state.WalletModule.WalletList as Array<Wallet>
);

const ShareDate = (item) => {
  store.commit(Mutations.SET_WALLET_DETAILS, item);
};

const fetchData = () => {
  store.dispatch(Actions.GET_WALLET_LIST, {
    query: search.value,
  });
};
store.dispatch(Actions.GET_ACCOUNTS, {
  ...filterDto.value,
});

fetchData();
</script>
