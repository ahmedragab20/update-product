<template>
	<div
	  class="card card-flush pt-3 mb-5 mb-lg-10"
	  data-kt-subscriptions-form="pricing"
	>
	  <div class="card-header">
		<div class="card-title">
		  <h2 class="fw-bolder">{{ $t("withdrawAccount") }}</h2>
		</div>
  
		<div class="card-toolbar">
        <button
          type="button"
		  class="btn btn-primary er fs-6 px-8 py-4"
          data-bs-toggle="modal"
          :data-bs-target="`#account-modal`"
        >
          {{ $t("newAccount") }}
        </button>
      </div>
	  </div>

  
	  <div class="card-body pt-0" v-for="account in AccountsInWithdrawFromWallet ">
		<div id="kt_create_new_payment_method">
		 
		  <div class="py-1">
			<div class="py-3 d-flex flex-stack flex-wrap">
			  <div
				class="d-flex align-items-center collapsible toggle collapsed"
				data-bs-toggle="collapse"
				:data-bs-target="`#kt_account_details_${account.accountId}`"
				aria-expanded="false"
			  >
			  <div class="me-3 rotate-90">
				<span class="svg-icon svg-icon-3">
				  <inline-svg src="/media/icons/duotune/arrows/arr071.svg" />
				</span>
			  </div>
  
				<img
				  src="/media/svg/card-logos/mastercard.svg"
				  class="w-40px me-3"
				  alt=""
				/>
  
				<div class="me-3">
				  <div class="d-flex align-items-center fw-bolder">
					{{account.name}} {{account.accountId}}
					<div
                    class="badge badge-light-primary ms-5"
                    v-if="parseInt(account.accountId)==parseInt(Wallet.defaultWithdrawAccountId)"
                  >
                    {{ $t("default") }}
                  </div>
				  </div>
				  <div class="text-muted">{{account.accountSubType}}</div>
				</div>
			  </div>
	<!--begin::Toolbar-->
	<div class="d-flex my-3 ms-9">
			
			  <!--begin::More-->
			  <a
				href="#"
				class="btn btn-icon btn-active-light-primary w-30px h-30px"
				data-bs-toggle="tooltip"
				title=""
				data-kt-menu-trigger="click"
				data-kt-menu-placement="bottom-end"
				data-bs-original-title="More Options"
			  >
				<span class="svg-icon svg-icon-3">
				  <inline-svg src="/media/icons/duotune/general/gen019.svg" />
				</span>
			  </a>
			  <!--begin::Menu-->
			  <div
				class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold w-150px py-3"
				data-kt-menu="true"
			  >
				<!--begin::Menu item-->
				<div class="menu-item px-3">
				  <a
					href="#"
					role="button"
					@click="SetAsDefaultDeposite(account.accountId)"
					class="menu-link px-3"
					data-kt-payment-mehtod-action="set_as_primary"
					>{{ $t("setAsDefault") }}</a
				  >
				</div>
				<!--end::Menu item-->
			  </div>
			  <!--end::Menu-->
			  <!--end::More-->
			</div>
			<!--end::Toolbar-->
			
			</div>
  
			<div
			  :id="`kt_account_details_${account.accountId}`"
			  class="fs-6 ps-10 collapse"
			  style=""
			>
			  <div class="d-flex flex-wrap py-5">
				<div class="flex-equal me-5">
				  <table class="table table-flush fw-bold gy-1">
					<tbody>
					  <tr v-if="account.walletId">
						<td class="text-muted min-w-125px w-125px">{{ $t('walletId') }}</td>
						<td class="text-gray-800">{{ "********" + getLastNums(account.walletId) }}</td>
					  </tr>
					  <tr v-if="account.bankIBANNumber" >
						<td class="text-muted min-w-125px w-200px">{{ $t("bankIBANNumber") }}</td>
						<td class="text-gray-800">{{account.bankIBANNumber}}</td>
					  </tr>
					 
					  <tr v-if="account.bankCardUserName">
						<td class="text-muted min-w-125px w-125px">{{ $t("bankCardUserName") }}</td>
						<td class="text-gray-800">{{account.bankCardUserName}}</td>
					  </tr>
					  <tr v-if="account.bankCardNumber" >
						<td class="text-muted min-w-125px w-125px">{{ $t("bankCardNumber") }}</td>
						<td class="text-gray-800">{{ "********" + getLastNums(account.bankCardNumber) }}</td>
					  </tr>
					 
					  <tr v-if="account.bankCardSecurityNumber" >
						<td class="text-muted min-w-125px w-200px">{{ $t("bankCardSecurityNumber") }}</td>
						<td class="text-gray-800">{{account.bankCardSecurityNumber}}</td>
					  </tr>
					 
					  <tr v-if="account.bankCardExpiryMonth" >
						<td class="text-muted min-w-125px w-200px">{{ $t("bankCardExpiryMonth") }}</td>
						<td class="text-gray-800">{{account.bankCardExpiryMonth}}</td>
					  </tr>
					  <tr v-if="account.bankCardExpiryYear" >
						<td class="text-muted min-w-125px w-200px">{{ $t("bankCardExpiryYear") }}</td>
						<td class="text-gray-800">{{account.bankCardExpiryYear}}</td>
					  </tr>
					</tbody>
				  </table>
				</div>
  
			
			  </div>
			</div>
		  </div>
  
		  <div class="separator separator-dashed"></div>
  
		
  
		  
		</div>
	  </div>
	</div>
  </template>
  
  
  <script lang="ts" setup>
  import { useStore } from "vuex";
  import { ref, computed } from "vue";
  import { Actions } from "@/store/enums/StoreEnums";
 
  const store = useStore();
  const AccountsInWithdrawFromWallet = computed(() => store.state.AllAccounts.InWithdrawFromWallet);
  function getLastNums (info : string) {
	  return info.slice(-4);
	}
	const Wallet = computed(() => store.state.WalletModule.WalletDetails);
	const SetAsDefaultDeposite=(accountId)=>{
	  let payload={
		accountId,
		shopId:Wallet.value.shopId
	  }

	  store.dispatch(Actions.SET_DEFAULT_ACCOUNT_WITHDRAW,payload)
	}
  </script>
  