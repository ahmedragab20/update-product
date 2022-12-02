<template>
  <div class="row g-4">
    <div class="col-12 col-md-6" v-for="account in Accounts" :key="account.accountId">
      <div class="card">
        <!--begin::Card header-->
        <div class="card-header card-header-stretch pb-0 ">
          <!--begin::Title-->

          <!--end::Title-->
          <!--begin::Toolbar-->
          <div class="card-toolbar m-0">
            <!--begin::Tab nav-->
            <div class="d-flex align-items-center mb-2">
                  <a
                    class="text-gray-800 text-hover-primary fs-2 fw-bolder me-1 "
                    >{{account.name}}</a
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
        <div  class="card-body tab-content" >
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
                <div class="card card-dashed h-xl-100 flex-row flex-stack flex-wrap p-6">
                  <!--begin::Info-->
                  <div class="d-flex flex-column py-2">
                    <!--begin::Owner-->
                    <div class="d-flex align-items-center justify-content-between fs-4 fw-bold mb-5">
                      <span>{{ $t("accountSubType") }}</span>
                      <span class="badge badge-light-success fs-7 ms-2"
                        > {{ account.accountSubType }}</span
                      >
                    </div>
                    <!--end::Owner-->
                    <!--begin::bankCardNumber-->
                    <div v-if="account.bankCardNumber" class="d-flex align-items-center justify-content-between fs-4 fw-bold mb-5">
                        <span>{{ $t("bankCardNumber") }}</span>
                        <span class="badge badge-light-success fs-7 ms-2"
                          > {{ "********" + getLastNums(account.bankCardNumber) }}</span
                        >
                    </div>
                    <!--end:: bankCardNumber-->
                    <!--begin::walletId-->
                    <div v-if="account.walletId" class="d-flex align-items-center justify-content-between fs-4 fw-bold mb-5">
                        <span>{{ $t("walletId") }}</span>
                        <span class="badge badge-light-success fs-7 ms-2"
                          > {{ "********" + getLastNums(account.walletId) }}</span
                        >
                      </div>
                      <!--end::walletId-->
                      <!--begin::IBAN Number-->
                      <div v-if="account.bankIBANNumber" class="d-flex align-items-center justify-content-between fs-4 fw-bold mb-5">
                        <span>{{ $t("bankIBANNumber") }}</span>
                        <span class="badge badge-light-success fs-7 ms-2"
                          > {{ "********" + getLastNums(account.bankIBANNumber) }}</span
                        >
                      </div>
                      <!--end::IBAN Number-->
                  
                   <div :id="`kt_customer_view_details${account.accountId}`"
                      class="collapse hide"
                      >
                      <!--begin::UsedInDepositToWallet-->
                      <div class="d-flex align-items-center justify-content-between fs-4 fw-bold mb-5">
                        <span>{{ $t("UsedInDepositToWallet") }}</span>
                        <span class="badge badge-light-primary fs-7 ms-2" v-if="account.usedInDepositeToWallet"> 
                          <inline-svg  src="/media/svg/general/icons8-done.svg" /></span>
                      <span class="badge badge-light-danger fs-7 ms-2" v-else>
                          <inline-svg  src="/media/svg/general/icons8-cancel.svg" />
                      </span>
                      </div>
                      <!--end::UsedInDepositeToWallet-->
                      <!--begin::UsedInWithdrawFromWallet-->
                      <div class="d-flex align-items-center justify-content-between fs-4 fw-bold mb-5">
                        <span>{{ $t("UsedInWithdrawFromWallet") }}</span>
                        <span class="badge badge-light-primary fs-7 ms-2" v-if="account.usedInWithdrawFromWallet"> 
                          <inline-svg  src="/media/svg/general/icons8-done.svg" /></span>
                      <span class="badge badge-light-danger fs-7 ms-2" v-else>
                          <inline-svg  src="/media/svg/general/icons8-cancel.svg" />
                      </span>
                      </div>
                      <!--end::UsedInWithdrawFromWallet-->
                       <!--begin::isPaymentMethod-->
                      <div class="d-flex align-items-center justify-content-between fs-4 fw-bold mb-5">
                        <span>{{ $t("isPaymentMethod") }}</span>
                        <span class="badge badge-light-primary fs-7 ms-2" v-if="account.isPaymentMethod"> 
                          <inline-svg  src="/media/svg/general/icons8-done.svg" /></span>
                      <span class="badge badge-light-danger fs-7 ms-2" v-else>
                          <inline-svg  src="/media/svg/general/icons8-cancel.svg" />
                      </span>
                      </div>
                      <!--end::isPaymentMethod-->
                      
                      <!--begin::accountCoverage-->
                      <div class="d-flex align-items-center justify-content-between fs-4 fw-bold mb-5">
                        <span>{{ $t("accountCoverage") }}</span>
                        <span class="badge badge-light-success fs-7 ms-2"
                          > {{ account.accountCoverage }}</span
                        >
                      </div>
                      <!--end::accountCoverage-->
                      <!--begin::supportedCountries-->
                      <div class="d-flex align-items-center justify-content-between fs-4 fw-bold mb-5">
                        <span>{{ $t("supportedCountries") }}</span>
                        <span v-for="country in account.supportedCountries " :key="country.countryId" class="badge badge-light-success fs-7 ms-2"
                          > {{ country.countryName }}</span
                        >
                      </div>
                      <!--end::supportedCountries-->
                      
                      <!--begin::bankCardUserName-->
                      <div v-if="account.bankCardUserName" class="d-flex align-items-center justify-content-between fs-4 fw-bold mb-5">
                        <span>{{ $t("bankCardUserName") }}</span>
                        <span class="badge badge-light-success fs-7 ms-2"
                          > {{ account.bankCardUserName }}</span
                        >
                      </div>
                      <!--end:: bankCardUserName-->
                      
                      <!--begin::bankCardSecurityNumber-->
                      <div v-if="account.bankCardSecurityNumber" class="d-flex align-items-center justify-content-between fs-4 fw-bold mb-5">
                        <span>{{ $t("bankCardSecurityNumber") }}</span>
                        <span class="badge badge-light-success fs-7 ms-2"
                          > {{ account.bankCardSecurityNumber }}</span
                        >
                      </div>
                      <!--end:: bankCardSecurityNumber-->
                      <!--begin::bankCardExpiryMonth-->
                      <div v-if="account.bankCardExpiryMonth" class="d-flex align-items-center justify-content-between fs-4 fw-bold mb-5">
                        <span>{{ $t("bankCardExpiryMonth") }}</span>
                        <span class="badge badge-light-success fs-7 ms-2"
                          > {{ account.bankCardExpiryMonth }}</span
                        >
                      </div>
                      <!--end:: bankCardExpiryMonth-->
                      <!--begin::bankCardExpiryYear-->
                      <div v-if="account.bankCardExpiryYear" class="d-flex align-items-center justify-content-between fs-4 fw-bold mb-5">
                        <span>{{ $t("bankCardExpiryYear") }}</span>
                        <span class="badge badge-light-success fs-7 ms-2"
                          > {{ account.bankCardExpiryYear }}</span
                        >
                      </div>
                      <!--end:: bankCardExpiryYear-->
                   </div>
                    
                  </div>
                  <!--end::Info-->
                  <!--begin::Actions-->
                  <div class="d-flex align-items-center py-2">
                    <button
                      class="btn btn-sm btn-light btn-active-light-primary me-3"
                      data-kt-billing-action="card-delete"
                      @click="deleteAccount(account.accountId)"
                    >
                      <!--begin::Indicator wallet-->
                      <span class="indicator-wallet">{{ $t("delete") }}</span>
                      <!--end::Indicator wallet-->
                      <!--begin::Indicator progress-->
                      <span class="indicator-progress"
                        >{{ $t("pleaseWait") }}...
                        <span
                          class="spinner-border spinner-border-sm align-middle ms-2"
                        ></span
                      ></span>
                      <!--end::Indicator progress-->
                    </button>
                    <button
                      class="btn btn-sm btn-light btn-active-light-primary fw-bolder rotate collapsible"
                      data-bs-toggle="collapse"
                      :href="`#kt_customer_view_details${account.accountId}`"
                      role="button"
                      aria-expanded="false">
                      {{ $t("details") }}
                      <span class="ms-2 rotate-180">
                        <span class="svg-icon svg-icon-3">
                          <inline-svg
                            src="/media/icons/duotune/arrows/arr072.svg" />
                        </span>
                      </span>
                    </button> 
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
</template>

<script lang="ts" setup>
import { defineEmits, computed } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import i18n from "@/core/plugins/i18n";

const store = useStore();

let emit = defineEmits(["delete-account"]);
//get accounts from store
const Accounts = computed(() => store.state.AllAccounts.accounts);

//delete account
function deleteAccount(id) {
  Swal.fire({
    title: i18n.global.t("alertText"),
    text: i18n.global.t("deleteAccountAlertText"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: i18n.global.t("cancel"),
    confirmButtonText: i18n.global.t("yesSure"),
  }).then((status) => {
    if (status.isConfirmed) emit("delete-account", id);

    for (let i = 0; i < Accounts.value.length; i++) {
      if (Accounts.value[i].id === id) {
        Accounts.value.splice(i, 1);
      }
    }
    
  });
}

function getLastNums (info : string) {
  return info.slice(-4);
}
</script>