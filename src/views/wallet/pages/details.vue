<template>
  <!--begin::Layout-->
  <div class="d-flex flex-column flex-lg-row">
    <!--begin::Content-->
    <div class="flex-lg-row-fluid me-lg-15 order-2 order-lg-1 mb-15 h-100">
      <!--begin::Form-->
      <form class="form" action="#" id="kt_subscriptions_create_new">
        <WalletDetails :id="id"></WalletDetails>
      </form>
      <!--end::Form-->
    </div>

    <div
      class="flex-column flex-lg-row-auto w-100 w-lg-250px w-xl-300px mb-15 order-1 order-lg-2"
    >
      <div
        class="card card-flush pt-3 mb-0"
        data-kt-sticky-name="add-subscription-summary"
        data-kt-sticky-offset="{default: false, lg: '200px'}"
        data-kt-sticky-width="{lg: '250px', xl: '300px'}"
        data-kt-sticky-left="auto"
        data-kt-sticky-top="150px"
        data-kt-sticky-animation="false"
        data-kt-sticky-zindex="95"
      >
        <!--begin::Card body-->
        <div class="card-body pt-0 fs-6">
          <!--end::Seperator-->

          <!--end::Section-->

          <!--begin::Actions-->

          <div class="mb-0">
            <button
              type="button"
              class="btn btn-danger er fs-6 px-8 py-4 w-100"
              data-bs-toggle="modal"
              data-bs-target="#kt_modal_deposite-1"
            >
              <span class="svg-icon svg-icon-3 svg-icon-success me-2">
                <inline-svg src="/media/icons/duotune/arrows/arr066.svg" />
              </span>
              <!--begin::Indicator-->
              <span class="indicator-label">{{ $t("Deposit") }}</span>
              <span class="indicator-progress"
                >{{ $t("pleaseWait") }}
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span
              ></span>
              <!--end::Indicator-->
            </button>
          </div>
          <!--end::Actions-->
        </div>
        <!--end::Card body-->
        <DepositeWithdawForm ref="DepositeWithdrawForm"></DepositeWithdawForm>
      </div>
      <div
        class="card card-flush pt-3 mb-0 mt-2"
        data-kt-sticky-name="add-subscription-summary"
        data-kt-sticky-offset="{default: false, lg: '200px'}"
        data-kt-sticky-width="{lg: '250px', xl: '300px'}"
        data-kt-sticky-left="auto"
        data-kt-sticky-top="150px"
        data-kt-sticky-animation="false"
      >
        <!--begin::Card header-->
        <!--end::Card header-->

        <!--begin::Card body-->
        <div class="card-body pt-0 fs-6">
          <!--end::Seperator-->

          <!--end::Section-->
          <WithdrawForm></WithdrawForm>
          <!--begin::Actions-->
          <div class="mb-2">
            <button
              type="submit"
              class="btn btn-primary w-100"
              data-bs-toggle="modal"
              data-bs-target="#kt_modal_withdraw"
            >
              <!--begin::Indicator-->
              <span class="svg-icon svg-icon-3 svg-icon-success me-2">
                <inline-svg src="/media/icons/duotune/arrows/arr065.svg" />
              </span>
              <span class="indicator-label">{{ $t("Withdraw") }}</span>
              <span class="indicator-progress"
                >{{ $t("pleaseWait") }}
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span
              ></span>
              <!--end::Indicator-->
            </button>
          </div>

          <!--end::Actions-->
        </div>
        <!--end::Card body-->
      </div>
    </div>
    <!--end::Sidebar-->
  </div>
  <!--end::Layout-->
  <div class="row gx-9 gy-6">
    <div class="col-xl-6">
      <DepositeAccount></DepositeAccount>
    </div>
    <div class="col-xl-6 h-100">
      <WithdrawAccounts></WithdrawAccounts>
    </div>
  </div>
  <TransactionTable :id="id"></TransactionTable>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue";
import DepositeWithdawForm from "../components/DepositeForm.vue";
import WithdrawForm from "../components/WithdrawForm.vue";
import DepositeAccount from "../components/DepositeAccount.vue";
import WithdrawAccounts from "../components/WithdrawAccounts.vue";
import WalletDetails from "../components/WalletDetails.vue";

import TransactionTable from "../components/TransactionTable.vue";

import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import i18n from "@/core/plugins/i18n";

onMounted(() => {
  setCurrentPageBreadcrumbs(i18n.global.t("walletDetails"), [
    i18n.global.t("Apps"),
    i18n.global.t("wallet"),
  ]);
});
const DepositeWithdrawForm = ref();

const props = defineProps({
  id: String,
});
</script>
<style>
.pt-3 {
  padding-top: 1.75rem !important;
}
</style>
