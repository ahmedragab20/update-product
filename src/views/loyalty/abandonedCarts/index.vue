<template>
  <RouterView> </RouterView>
  <div class="d-flex w-100 my-2 justify-content-end">
    <el-pagination
      v-model:current-page="pagination.pageNumber"
      :page-size="pagination.pageSize"
      layout="prev, pager, next"
      :total="pagination.totalCount"
      background
    >
    </el-pagination>
  </div>

  <div
    class="modal fade"
    ref="modalRef"
    id="abandoned-cart-modal"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_create_api_key_header">
          <h2>{{ $t("abandonedCartOffer") }}</h2>

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
        <!--end::Modal header-->
        <!--begin:: Add Product Label Form-->
        <OfferForm> </OfferForm>
        <!--end::Form-->
      </div>
    </div>
    <!--End::Modal dialog-->
  </div>
</template>

<script setup lang="ts">
import i18n from "@/core/plugins/i18n";
import { Actions } from "@/store/enums/StoreEnums";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import OfferForm from "./offers/components/OfferForm.vue";
const { getters, dispatch, commit, state } = useStore();
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";

// *?         GETTERS AND  REFS

const pagination = computed(() => state.AbandonedCarts.pagination);
const filterDto = computed(() => state.AbandonedCarts.filterDto);

// *?         Functions

async function fetchAbandonedCarts() {
  dispatch(Actions.GET_ABANDONED_CARTS, {
    pageSize: pagination.value.pageSize,
    pageNumber: pagination.value.pageNumber,
    ...filterDto.value,
  });
}
function fetchOpertationTypes() {
  dispatch(Actions.GET_OPERATION_TYPES);
}
const fetchTimeUnits = () => {
  dispatch(Actions.GET_TIME_UNITS);
};
onMounted(async () => {
  setCurrentPageBreadcrumbs(i18n.global.t("abandonedCarts"), []);
});

fetchAbandonedCarts();
fetchOpertationTypes();
fetchTimeUnits();
</script>
