<template>
  <!-- Search Card  -->
  <div class="card mb-7">
    <!--begin::Card body-->
    <div class="card-body">
      <!--begin::Compact form-->
      <div class="d-flex align-items-center">
        <!--begin::Input group-->
        <div class="position-relative me-md-2">
          <input
            type="text"
            v-model="name"
            class="form-control form-control-solid w-250px ps-15"
            :placeholder="$t('search')"
          />
        </div>
        <!--end::Input group-->
        <!--begin:Action-->
        <div class="d-flex align-items-center">
          <button type="button" class="btn btn-primary me-5" @click="fetchData">
            {{ $t("search") }}
          </button>
          <button class="btn btn-light" type="button" @click="reset">
            {{ $t("reset") }}
          </button>
        </div>
        <!--end:Action-->
      </div>
      <!--end::Compact form-->
    </div>
    <!--end::Card body-->
  </div>
  <!-- Search End  -->

  <!-- Form-Modal -->
  <div
    class="modal fade"
    ref="modalRef"
    id="product-brand-modal"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_create_api_key_header">
          <!--begin::Modal title-->
          <h2>{{ $t("addBrand") }}</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
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
        <AddBrandModal @brand-added="onBrandAdded"></AddBrandModal>

        <!--end::Form-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!-- Form-Modal End -->
 
    <!--begin::Filter-->
    <div class="d-flex align-items-center justify-content-end my-3">
      <ul class="nav nav-pills me-6 mb-2 mb-sm-0 ">
        <li>
          <el-select
          style="width: 100px"
            @change="setItemsPerPage"
            v-model="pagination.pageSize"
            placeholder="Number Of Item"
            class="border-1 mx-4"
          >
            <el-option :value="6">6</el-option>
            <el-option :value="15">15</el-option>
            <el-option :value="30">30</el-option>
            <el-option :value="90">90</el-option>
          </el-select>
        </li>
        <li class="nav-item m-0">
          <a
            @click="setActiveView(views.TABLE_VIEW)"
            :class="{ active: activeView === views.TABLE_VIEW }"
            class="btn btn-sm btn-icon btn-light btn-color-muted btn-active-primary"
          >
            <!--begin::Svg Icon | path: icons/duotune/abstract/abs015.svg-->
            <span class="svg-icon svg-icon-2">
              <inline-svg src="/media/icons/duotune/abstract/abs015.svg"></inline-svg>
            </span>
            <!--end::Svg Icon-->
          </a>
        </li>
        <li class="nav-item m-0 mx-4">
          <a
            @click="setActiveView(views.GRID_VIEW)"
            class="btn btn-sm btn-icon btn-light btn-color-muted btn-active-primary me-3"
            :class="{ active: activeView === views.GRID_VIEW }"
          >
            <!--begin::Svg Icon | path: icons/duotune/general/gen024.svg-->
            <inline-svg src="/media/icons/duotune/general/gen024.svg"></inline-svg>
            <!--end::Svg Icon-->
          </a>
        </li>
      </ul>
      <button
        type="button"
        class="btn btn-primary er fs-6 px-8 py-4"
        data-bs-toggle="modal"
        :data-bs-target="`#product-brand-modal`"
      >
        {{ $t("addBrand") }}
      </button>
    </div>


  <!--end::Filter-->

  <!--begin::Card body-->

  <component  v-if="(Brands.length >0 )"  :items="Brands" :is="activeComponent" @delete-brand="deleteBrand"/>
  <div v-else>
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span>Loading...</span>
          </div>
        </div>
      </div>
  <div class="pagination-wrapper d-flex justify-content-end">
    <el-pagination
      v-model:current-page="pagination.pageNumber"
      @current-change="fetchData"
      :page-size="pagination.pageSize"
      layout="prev, pager, next"
      :total="pagination.totalCount"
      :hide-on-single-page="true"
      background
    >
    </el-pagination>
  </div>

  <!--end::Card body-->
  <!--end::Card-->
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, defineEmits, watch } from "vue";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { hideModal } from "@/core/helpers/dom";
import AddBrandModal from "../components/AddBrandModal.vue";
import GridBrand from "../components/GridBrand.vue";
import TableBrand from "../components/TableBrand.vue";
import i18n from "@/core/plugins/i18n";

import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
const pagination = computed(() => store.getters.getBrandPagination);
const name = ref("");
const modalRef = ref(null);
enum views {
  TABLE_VIEW = 1,
  GRID_VIEW = 2,
}
const store = useStore();
//GETTERS AND Data
const activeView = ref(views.TABLE_VIEW);
const activeComponent = computed(() => {
  return activeView.value == views.TABLE_VIEW ? TableBrand : GridBrand;
});
//                                                METHODS
const setActiveView = (val: views) => {
  activeView.value = val;
};
const fetchData = () => {
  store.dispatch(Actions.GET_PRODUCT_BRANDS, {
    name: name.value,
    pageSize: pagination.value.pageSize,
    pageNumber: pagination.value.pageNumber,
  });
};
const reset = () => {
  name.value = "";
  fetchData()
};
const setItemsPerPage = (e) => {
  store.commit(Mutations.UPDATE_PAGINATION, {
    ...pagination.value,
    pageSize: e,
  });
  fetchData();
};
const Brands = computed(() => store.getters.getBrands);
const onBrandAdded = () => {
  fetchData();
  hideModal(modalRef.value);
};
onMounted(async () => {
  setCurrentPageBreadcrumbs(i18n.global.t("brands"), []);
});

watch(name, (nv) => {
  if (!nv) fetchData();
});

const deleteBrand = (id) => {
  store.dispatch(Actions.DELETE_PRODUCT_BRANDS, id).then(() => {
    fetchData();
  });
};
//                                                ON PAGE CREATED
fetchData();
</script>
<style lang="scss">
.brands {
  .card-header {
    display: inline;
  }
}
</style>
