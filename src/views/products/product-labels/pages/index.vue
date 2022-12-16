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
    id="product-label-modal"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_create_api_key_header">
          <!--begin::Modal title-->
          <h2>{{ $t("addLabel") }}</h2>
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
        <ProductLabelForm @label-added="onLabelAdded"> </ProductLabelForm>
        <!--end::Form-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!-- Form-Modal End -->

  <div class="d-flex align-items-center justify-content-end my-3">
      <ul class="nav nav-pills me-6 mb-2 mb-sm-0">
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
        <li class="nav-item mx-3">
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
        :data-bs-target="`#product-label-modal`"
      >
        {{ $t("addLabel") }}
      </button>
    </div>

  <!--end::Filter-->

  <!--begin::Card body-->
  <component
  v-if="(productLabels.length >0 )"
    :pagination="pagination"
    @update-pagination="fetchData"
    :items="productLabels"
    :is="activeComponent"
    @delete-product-label="deleteProductLabel"
  />
 
  <div v-else>
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span>Loading...</span>
          </div>
        </div>
      </div>
  <!--end::Card body-->
  <!--end::Card-->
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { ref, computed } from "vue";
import TableView from "../components/TableView.vue";
import GridView from "../components/GridView.vue";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { ProductLabel } from "@/api/data/ProductLabels";
import ProductLabelForm from "../components/AddForm.vue";
import { hideModal } from "@/core/helpers/dom";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import i18n from "@/core/plugins/i18n";
const store = useStore();
enum views {
  TABLE_VIEW = 1,
  GRID_VIEW = 2,
}

// REF
const modalRef = ref(null);
const activeView = ref(views.TABLE_VIEW);
const search = ref("");
const pagination = computed(() => store.state.ProductLabels.pagination);
// Computed
const productLabels = computed(
  () => store.state.ProductLabels.ProductLabels as Array<ProductLabel>
);

const activeComponent = computed(() => {
  return activeView.value == views.TABLE_VIEW ? TableView : GridView;
});

// Methods
const setActiveView = (val: views) => {
  activeView.value = val;
};
const deleteProductLabel = (id) => {
  store.dispatch(Actions.DELETE_PRODUCT_LABEL, id);
};
const fetchData = () => {
  store.dispatch(Actions.GET_PRODUCT_LABELS, {
    query: search.value,
    pageSize: pagination.value.pageSize,
    pageNumber: pagination.value.pageNumber,
  });
};
const reset = () => {
  search.value = "";
  store.dispatch(Actions.GET_PRODUCT_LABELS, {
    query: "",
    pageSize: pagination.value.pageSize,
    pageNumber: pagination.value.pageNumber,
  });
};
const fetchIcons = () => {
  store.dispatch(Actions.FONTAWESOME_ICONS);
};
const setItemsPerPage = (e) => {
  store.commit(Mutations.UPDATE_PAGINATION, {
    ...pagination.value,
    pageSize: e,
  });
  fetchData();
};
const onLabelAdded = () => {
  fetchData();
  hideModal(modalRef.value);
};

fetchIcons();
fetchData();
setCurrentPageBreadcrumbs(i18n.global.t("productLabels") , []);

</script>
