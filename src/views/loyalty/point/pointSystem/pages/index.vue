<template>
  <!-- Start Filter Card  -->
  <div>
    <div class="card mb-7">
      <!-- Start Card Body -->
      <div class="card-body">
        <div class="d-flex align-items-center gap-3">
          <div class="position-relative me-md-2">
            <span
              class="svg-icon svg-icon-3 svg-icon-gray-500 position-absolute top-50 translate-middle ms-6"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  opacity="0.5"
                  x="17.0365"
                  y="15.1223"
                  width="8.15546"
                  height="2"
                  rx="1"
                  transform="rotate(45 17.0365 15.1223)"
                  fill="currentColor"
                ></rect>
                <path
                  d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
            <label for="" class="mb-2">{{ $t("shops") }}</label>
            <!-- Start Shops Select Box -->
            <ElSelect
              class="w-100"
              multiple
              :placeholder="$t('shop')"
              v-model="filterDto.ShopIds"
            >
              <ElOption
                v-for="item in market.shops"
                :value="item.id"
                :label="item.name"
                :key="item.id"
              ></ElOption>
            </ElSelect>
            <!-- End Shops Select Box -->
          </div>

          <!--  Start Action -->
          <div class="d-flex align-items-center">
            <button
              type="button"
              class="btn btn-primary me-5"
              style="margin-top: 28px"
              @click="fetchData"
            >
              {{ $t("search") }}
            </button>
            <button
              type="button"
              class="btn btn-light me-5"
              style="margin-top: 28px"
              @click="resetShopsFilter"
            >
              {{ $t("reset") }}
            </button>
          </div>
          <!-- End Action -->
        </div>
      </div>
      <!-- End Card Body -->
    </div>
  </div>
  <!-- End Filter Card -->

  <!-- Start Delete Modal  -->
  <div
    class="modal fade"
    ref="deletePointSystemRef"
    id="delete-point-system-modal"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered mw-500px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_create_api_key_header">
          <h2>{{ $t("deletePointSystemTitle") }}</h2>
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="/media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
        </div>
        <!-- Start Check Box  -->
        <div class="p-5">
          <div class="fs-5 fw-bold">
            <span> {{ $t("pointSystemType") }}</span>
          </div>
          <div class="form-check form-check-solid mt-4">
            <input
              class="form-check-input"
              v-model="deleteData.removeClientShopLinkPoints"
              type="checkbox"
              checked=""
              data-kt-check="false"
            /><label class="form-check-label ps-2">
              {{ $t("removeClientShop") }}
            </label>
          </div>
          <div class="form-check form-check-solid mt-4">
            <input
              class="form-check-input"
              v-model="deleteData.removeClientJetOrderPoints"
              type="checkbox"
              checked=""
              data-kt-check="false"
            /><label class="form-check-label ps-2">
              {{ $t("removeClientJetOrder") }}
            </label>
          </div>
        </div>
        <div class="p-5">
          <div class="d-flex justify-content-end">
            <button @click="deletePointSystemHandler" class="btn btn-primary">
              {{ $t("Confirm") }}
            </button>
          </div>
        </div>
        <!-- End Check Box  -->
      </div>
    </div>
  </div>
  <!-- End Delete Modal  -->

  <!-- Start Table Header And Filter -->
  <div class="d-flex justify-content-between align-items-center w-100">
    <h2>{{ $t("pointSystem") }}</h2>
    <!--Start Filter-->
    <div class="d-flex align-items-center justify-content-end my-3">
      <ul class="nav nav-pills me-6 mb-2 mb-sm-0">
        <!--Start Table Items Pagination-->
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
        <!-- End Table Items Pagination-->

        <!-- Start Switching Between Grid And Table  -->
        <!--Switch To Table -->
        <li class="nav-item m-0">
          <a
            @click="setActiveView(views.TABLE_VIEW)"
            :class="{ active: activeView === views.TABLE_VIEW }"
            class="btn btn-sm btn-icon btn-light btn-color-muted btn-active-primary"
          >
            <span class="svg-icon svg-icon-2">
              <inline-svg
                src="/media/icons/duotune/abstract/abs015.svg"
              ></inline-svg>
            </span>
          </a>
        </li>
        <!--Switch To Grid-->
        <li class="nav-item m-0 mx-4 d-none">
          <a
            @click="setActiveView(views.GRID_VIEW)"
            class="btn btn-sm btn-icon btn-light btn-color-muted btn-active-primary me-3"
            :class="{ active: activeView === views.GRID_VIEW }"
          >
            <inline-svg
              src="/media/icons/duotune/general/gen024.svg"
            ></inline-svg>
          </a>
        </li>
        <!-- End Switching Between Grid And Table  -->
      </ul>
      <!-- Open Add Modal Button Depend on data-target And ID For Modal -->
      <button
        type="button"
        class="btn btn-primary er fs-6 px-8 py-4"
        data-bs-toggle="modal"
        :data-bs-target="`#product-brand-modal`"
      >
        {{ $t("addPointSystem") }}
      </button>
    </div>
  </div>
  <!-- End Table Header And Filter -->
  <AddPointSystem @add-point-system="onPointSystemAdded"></AddPointSystem>
  <EditPointSystem
    :id="setPointSystemId"
    @update-point-system="onPointSystemAdded"
  ></EditPointSystem>

  <!-- Start Active Component And Pagination -->
  <component
    :is="activeComponent"
    :pagination="pagination"
    @update-pagination="fetchData"
    @delete-point-system="deletePointSystem"
    @edit-point-system="editPointSystem"
  ></component>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { hideModal } from "@/core/helpers/dom";
import TablePointSystem from "../components/TablePointSystem.vue";
import GridPointSystem from "../components/GridPointSystem.vue";
import AddPointSystem from "../components/AddPointSystem.vue";
import EditPointSystem from "../components/EditPointSystem.vue";
import i18n from "@/core/plugins/i18n";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { Pagination } from "@/interfaces/pagination";
import Swal from "sweetalert2";
import { Market } from "@/types";
const { state, dispatch, getters } = useStore();
const pagination = computed(() => state.PointSystems.pagination as Pagination);
// Get Market And Filters Data From Store
const market = computed(() => getters.getMarketData as Market);
const filterDto = computed(() => state.PointSystems.filterDto);

// Start Set Active Component
enum views {
  TABLE_VIEW = 1,
  GRID_VIEW = 2,
}
const activeView = ref(views.TABLE_VIEW);
const activeComponent = computed(() => {
  return activeView.value == views.TABLE_VIEW
    ? TablePointSystem
    : GridPointSystem;
});
const setActiveView = (val: views) => {
  activeView.value = val;
};
// End Set Active Component

// Get Point System Data
const fetchData = () => {
  dispatch(Actions.GET_POINT_SYSTEMS, {
    ...filterDto.value,
    pageSize: pagination.value.pageSize,
    pageNumber: pagination.value.pageNumber,
  });
};
// Handler Showing Data In Table
const setItemsPerPage = (event) => {
  pagination.value.pageSize = parseInt(event);
  fetchData();
};

// Refresh Data After Added Point System
const onPointSystemAdded = () => {
  fetchData();
};

// Start Delete Point System
const deletePointSystemRef = ref<null | HTMLElement>(null);
const deleteData = ref({
  id: null,
  removeClientShopLinkPoints: false,
  removeClientJetOrderPoints: false,
});

const deletePointSystem = (id) => {
  deleteData.value.id = id;
};
const deletePointSystemHandler = (id) => {
  Swal.fire({
    title: i18n.global.t("alertTitle"),
    text: i18n.global.t("deletePointSystem"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: i18n.global.t("deleteAlertConfirm"),
    cancelButtonText: i18n.global.t("cancel"),
  }).then((data) => {
    if (data.isConfirmed) {
      hideModal(deletePointSystemRef.value);
      dispatch(Actions.DELETE_POINT_SYSTEM, deleteData.value).then(() => {
        fetchData();
        deleteData.value = {
          id: null,
          removeClientShopLinkPoints: false,
          removeClientJetOrderPoints: false,
        };
        Swal.fire({
          text: i18n.global.t("confirmDeletePointSystem"),
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: i18n.global.t("ok"),
          cancelButtonText: i18n.global.t("cancel"),
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary",
          },
        });
      });
    }
  });
};
// End Delete Point System

// Get Point System ID Then Send It To Edit Component
const setPointSystemId = ref("");
const editPointSystem = (id) => {
  setPointSystemId.value = id;
};

// Set Page Title When Render it
onMounted(() => {
  setCurrentPageBreadcrumbs(i18n.global.t("pointSystem"), []);
});
// Get Point System Data
fetchData();
// Reset Filter
const resetShopsFilter = () => {
  filterDto.value.ShopIds = [];
  fetchData();
};
</script>

<style lang="scss">
// Global swl Style
.swal2-cancel {
  margin-top: 0 !important;
}
</style>
