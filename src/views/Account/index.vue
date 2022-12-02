<template>
  <div
    class="modal fade"
    ref="modalRef"
    id="account-modal"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_create_api_key_header">
          <h2>{{ $t("addAccount") }}</h2>

          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="/media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>

        <add-account-modal @account-added="onAccountAdded"></add-account-modal>
      </div>
    </div>
    <!--End::Modal dialog-->
  </div>
  <!-- Search Card  -->
  <div class="card mb-7">
    <!--begin::Card body-->
    <div class="card-body">
      <!--begin::Compact form-->
      <div class="d-flex align-items-center">
        <!--begin::Input group-->
        <div class="position-relative me-md-2">
          <input
            class="form-check-input mx-2"
            @change="fetchData"
            id="check2"
            true-value="true"
            false-value=""
            type="checkbox"
            v-model="filterDto.UsedAsPaymentMethod"
          />
          <label class="form-check-label mx-2" for="check2">
            {{ $t("UsedAsPaymentMethod") }}</label
          >
          <input
            class="form-check-input mx-2"
            true-value="true"
            false-value=""
            @change="fetchData"
            id="check3"
            type="checkbox"
            v-model="filterDto.UsedInDepositeToWallet"
          />
          <label class="form-check-label mx-2" for="check3">
            {{ $t("UsedInDepositToWallet") }}</label
          >
          <input
            class="form-check-input mx-2"
            true-value="true"
            false-value=""
            @change="fetchData"
            id="check4"
            type="checkbox"
            v-model="filterDto.UsedInWithdrawFromWallet"
          />
          <label class="form-check-label mx-2" for="check4">
            {{ $t("UsedInWithdrawFromWallet") }}</label
          >
        </div>
        <!--end::Input group-->
      </div>
      <!--end::Compact form-->
    </div>
    <!--end::Card body-->
  </div>
  <!-- Search End  -->
  <div class="d-flex justify-content-between align-items-center w-100">
    <h2>{{ $t("accounts") }}</h2>
    <!--begin::Filter-->
    <div class="d-flex align-items-center justify-content-end my-3">
      <button
        type="button"
        class="btn btn-primary er fs-6 px-8 py-4"
        data-bs-toggle="modal"
        :data-bs-target="`#account-modal`"
      >
        {{ $t("addAccount") }}
      </button>
    </div>
  </div>

  <!--end::Filter-->

  <!--begin::Card body-->

  <component
    :items="AllAccounts"
    :is="activeComponent"
    @delete-account="deleteAccount"
  ></component>

  <!--end::Card body-->
  <!--end::Card-->
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, defineEmits, watch } from "vue";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { Accounts, Market } from "@/types";
import { hideModal } from "@/core/helpers/dom";
import AddAccountModal from "./components/AddAccountModal.vue";
import GridAccount from "./components/GridAccount.vue";
import TableAccount from "./components/TableAccount.vue";
import i18n from "@/core/plugins/i18n";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";

const store = useStore();

const filterDto = computed(() => store.state.AllAccounts.filterDto);

const AllAccounts = computed(() => store.state.accounts as Array<Accounts>);
const modalRef = ref(null);

enum views {
  TABLE_VIEW = 1,
  GRID_VIEW = 2,
}

//GETTERS AND Data
const activeView = ref(views.GRID_VIEW);
const activeComponent = computed(() => {
  return activeView.value == views.GRID_VIEW ? GridAccount : "";
});
// METHODS
const setActiveView = (val: views) => {
  activeView.value = val;
};
// fetch data
const fetchData = () => {
  store.dispatch(Actions.GET_ACCOUNTS, {
    ...filterDto.value,
  });
};
fetchData();

const onAccountAdded = () => {
  fetchData();
  hideModal(modalRef.value);
};
onMounted(async () => {
  setCurrentPageBreadcrumbs(i18n.global.t("accounts"), []);
});

// get account types
const getAccountTypes = () => {
  store.dispatch(Actions.GET_ACCOUNT_TYPES);
};
getAccountTypes();
// delete account
const deleteAccount = (id) => {
  store.dispatch(Actions.DELETE_ACCOUNT, id).then(() => {
    fetchData();
  });
};
</script>
<style lang="scss">
.brands {
  .card-header {
    display: inline;
  }
}
</style>
