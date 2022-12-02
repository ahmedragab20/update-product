<template>
  <div class="card mb-7">
    <!--begin::Card body-->
    <div class="card-body">
      <div class="d-flex align-items-center">
        <!--begin::Input group-->
        <div class="position-relative w-md-400px me-md-2">
          <input
            type="text"
            class="form-control form-control-solid ps-10"
            name="search"
            placeholder="Search"
            v-model="search" />
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
      </div>
      <!--end::Action-->
    </div>
  </div>
  <!-- Page Title  -->

  <div class="d-flex justify-content-between align-items-center w-100">
    <h2>{{ $t("orderAction") }}</h2>

    <div
      class="d-flex align-items-center justify-content-end my-3"
      style="margin-left: auto">
      <ul class="nav nav-pills me-6 mb-2 mb-sm-0">
        <li class="nav-item" style="margin-right: 15px; width: 80px">
          <!--begin::Label-->

          <!--end::Label-->

          <!--begin::Input-->
          <el-select
            @change="setItemsPerPage"
            v-model="pagination.pageSize"
            placeholder="Number Of Item">
            <el-option value="4">4</el-option>
            <el-option value="6">6</el-option>
            <el-option value="10">10</el-option>
            <el-option value="100">100</el-option>
          </el-select>
          <!--end::Input-->
        </li>
        <li class="nav-item m-0">
          <a
            @click="setActiveView(views.GRID_VIEW)"
            class="btn btn-sm btn-icon btn-light btn-color-muted btn-active-primary me-3"
            :class="{ active: activeView === views.GRID_VIEW }">
            <!--begin::Svg Icon | path: icons/duotune/general/gen024.svg-->
            <inline-svg
              src="/media/icons/duotune/general/gen024.svg"></inline-svg>
            <!--end::Svg Icon-->
          </a>
        </li>
        <li class="nav-item m-0">
          <a
            @click="setActiveView(views.TABLE_VIEW)"
            :class="{ active: activeView === views.TABLE_VIEW }"
            class="btn btn-sm btn-icon btn-light btn-color-muted btn-active-primary">
            <!--begin::Svg Icon | path: icons/duotune/abstract/abs015.svg-->
            <span class="svg-icon svg-icon-2">
              <inline-svg
                src="/media/icons/duotune/abstract/abs015.svg"></inline-svg>
            </span>
            <!--end::Svg Icon-->
          </a>
        </li>
      </ul>
      <button
        type="button"
        class="btn btn-primary er fs-6 px-8 py-4"
        @click="$router.push('/order/add-order-action')">
        <span class="svg-icon svg-icon-3">
          <inline-svg src="media/icons/duotune/general/gen035.svg" />
        </span>
        {{ $t("addOrderAction") }}
      </button>
    </div>
  </div>

  <!--end::Filter-->

  <!--begin::Card body-->
  <component
    :items="OrderAction"
    :is="activeComponent"
    :pagination="pagination"
    @update-pagination="fetchData"
    @delete-order-action="deleteOrderAction" />
  <!--end::Card body-->
  <!--end::Card-->
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";
import TableView from "../components/TableView.vue";
import GridView from "../components/GridView.vue";
import { Pagination } from "@/interfaces/pagination";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";

import { Actions } from "@/store/enums/StoreEnums";

const store = useStore();
enum views {
  TABLE_VIEW = 1,
  GRID_VIEW = 2,
}
// REF
const activeView = ref(views.GRID_VIEW);
const search = ref("");
const pagination = computed(() => store.state.Order.pagination as Pagination);

// Computed
const OrderAction = computed(() => store.state.Order.OrderAction);
const activeComponent = computed(() => {
  return activeView.value == views.TABLE_VIEW ? TableView : GridView;
});
const setItemsPerPage = (event) => {
  pagination.value.pageSize = parseInt(event);

  fetchData();
};

// Methods
const deleteOrderAction = (id) => {
  store.dispatch(Actions.DELETE_ORDER_ACTION, id).then(() => {
    fetchData();
  });
};
const setActiveView = (val: views) => {
  activeView.value = val;
};
onMounted(async () => {
  setCurrentPageBreadcrumbs("Order Action", []);
});
const reset = () => {
  search.value = "";
  store.dispatch(Actions.GET_ORDER_ACTION_TEMPLATE, {
    query: "",
    pageSize: pagination.value.pageSize,
    pageNumber: pagination.value.pageNumber,
  });
};

const fetchData = () => {
  store.dispatch(Actions.GET_ORDER_ACTION_TEMPLATE, {
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
