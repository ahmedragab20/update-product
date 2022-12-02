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
            placeholder="Search"
            v-model="search"
          />
        </div>
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
        <!--end::Input group-->
      </div>
      <!--end::Compact form-->
    </div>
    <!--end::Card body-->
  </div>
  <!-- Search End  -->

  <div class="d-flex justify-content-between align-items-center w-100">
    <h2>{{ $t("productModifiers") }}</h2>
    <!--begin::Filter-->

    <div
      class="d-flex align-items-center justify-content-end my-3"
      style="margin-left: auto"
    >
      <ul class="nav nav-pills me-6 mb-2 mb-sm-0">
        <li class="nav-item" style="margin-right: 15px; width: 80px">
          <!--begin::Label-->

          <!--end::Label-->

          <!--begin::Input-->
          <el-select
            @change="setItemsPerPage"
            v-model="pagination.pageSize"
            placeholder="Number Of Item"
          >
            <el-option value="10">10</el-option>
            <el-option value="4">4</el-option>
            <el-option value="2">2</el-option>
            <el-option value="100">100</el-option>
          </el-select>
          <!--end::Input-->
        </li>
        <li class="nav-item m-0">
          <a
            @click="setActiveView(views.GRID_VIEW)"
            class="btn btn-sm btn-icon btn-light btn-color-muted btn-active-primary me-3"
            :class="{ active: activeView === views.GRID_VIEW }"
          >
            <!--begin::Svg Icon | path: icons/duotune/general/gen024.svg-->
            <inline-svg
              src="/media/icons/duotune/general/gen024.svg"
            ></inline-svg>
            <!--end::Svg Icon-->
          </a>
        </li>
        <li class="nav-item m-0">
          <a
            @click="setActiveView(views.TABLE_VIEW)"
            :class="{ active: activeView === views.TABLE_VIEW }"
            class="btn btn-sm btn-icon btn-light btn-color-muted btn-active-primary"
          >
            <!--begin::Svg Icon | path: icons/duotune/abstract/abs015.svg-->
            <span class="svg-icon svg-icon-2">
              <inline-svg
                src="/media/icons/duotune/abstract/abs015.svg"
              ></inline-svg>
            </span>
            <!--end::Svg Icon-->
          </a>
        </li>
      </ul>
      <button
        type="button"
        class="btn btn-primary er fs-6 px-8 py-4"
        data-bs-toggle="modal"
        data-bs-target="#modalForm"
      >
        <span class="svg-icon svg-icon-3">
          <inline-svg src="media/icons/duotune/general/gen035.svg" />
        </span>
        {{ $t("addProductModifiers") }}
      </button>
    </div>

    <AddForm @modifier-added="fetchData"></AddForm>
  </div>

  <!--end::Filter-->

  <!--begin::Card body-->
  <component
    :items="ProductModifiers"
    :is="activeComponent"
    :pagination="pagination"
    @update-pagination="fetchData"
    @delete-product-modifiers="deleteProductModifiers"
  />
  <!--end::Card body-->
  <!--end::Card-->
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import AddForm from "../components/AddForm.vue";
import { ref, computed } from "vue";
import TableView from "../components/TableView.vue";
import GridView from "../components/GridView.vue";
import { Pagination } from "@/interfaces/pagination";

import { Actions } from "@/store/enums/StoreEnums";
import { proModifiers } from "@/api/data/ProductModifiers";

const store = useStore();
enum views {
  TABLE_VIEW = 1,
  GRID_VIEW = 2,
}
// REF
const activeView = ref(views.GRID_VIEW);
const search = ref("");
const pagination = computed(
  () => store.state.ProductModifiers.pagination as Pagination
);

// Computed
const ProductModifiers = computed(
  () => store.state.ProductModifiers.Modifiers as Array<proModifiers>
);
const activeComponent = computed(() => {
  return activeView.value == views.TABLE_VIEW ? TableView : GridView;
});
const setItemsPerPage = (event) => {
  pagination.value.pageSize = parseInt(event);

  fetchData();
};

// Methods
const deleteProductModifiers = (id) => {
  store.dispatch(Actions.DELETE_PRODUCT_MODIFIERS, id);
};
const setActiveView = (val: views) => {
  activeView.value = val;
};
const reset = () => {
  search.value = "";
  store.dispatch(Actions.GET_MODIFIERS, {
    query: "",
    pageSize: pagination.value.pageSize,
    pageNumber: pagination.value.pageNumber,
  });
};

const fetchData = () => {
  store.dispatch(Actions.GET_MODIFIERS, {
    query: search.value,
    pageSize: pagination.value.pageSize,
    pageNumber: pagination.value.pageNumber,
  });
};

fetchData();
</script>
<style scoped>
.select-trigger {
  margin-right: 15px !important;
}
</style>
