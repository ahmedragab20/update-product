<template>
  <!--begin::Card-->
  <div class="product-tags">
    <div class="card">
      <div class="card-header border-0 py-4">
        <div class="card-title">
          <!-- <div class=""> -->
          <!--begin::Search-->
          <div class="d-flex align-items-center my-1">
            <span class="svg-icon svg-icon-1 position-absolute ms-6">
              <!-- <inline-svg src="media/icons/duotune/general/gen021.svg" /> -->
              <inline-svg
                src="/media/icons/duotune/general/gen021.svg"
              ></inline-svg>
            </span>
            <!-- @input="getData" -->
            <input
              type="text"
              v-model="searchValue"
              class="form-control form-control-solid w-400px ps-15"
              :placeholder="$t('search')"
            />
            <button
              type="button"
              class="btn btn-primary me-5 mx-2"
              @click="search"
            >
              {{ $t("search") }}
            </button>
            <button class="btn btn-light" type="button" @click="reset">
            {{ $t("reset") }}
          </button>
          </div>
          <!--end::Search-->
          <!-- </div> -->
        </div>
      </div>
    </div>
  
      <div class="d-flex justify-content-end align-items-center mx-5">
        <!-- {{ pagination.pageSize }} -->
        <el-select
          @change="setItemsPerPage"
          v-model="pagination.pageSize"
          style="width: 100px"
          placeholder="Number Of Item"
          class="border-1 mx-4"
        >
          <el-option :value="6">6</el-option>
          <el-option :value="10">10</el-option>
          <el-option :value="15">15</el-option>
          <el-option :value="30">30</el-option>
          <el-option :value="90">90</el-option>
        </el-select>
        <ul
          class="nav nav-pills me-6 mb-2 mb-sm-0 d-flex justify-content-center align-items-center"
        >
          <li class="nav-item m-0">
            <a
              :class="{ active: isGrid == true }"
              @click="setActive(true)"
              class="btn btn-sm btn-icon btn-light btn-color-muted btn-active-primary me-3"
            >
              <span class="svg-icon svg-icon-2">
                <inline-svg
                  src="/media/icons/duotune/abstract/abs015.svg"
                ></inline-svg>
              </span>
            </a>
          </li>
          <li class="nav-item m-0">
            <a
              :class="{ active: isGrid == false }"
              @click="setActive(false)"
              class="btn btn-sm btn-icon btn-light btn-color-muted btn-active-primary"
            >
              <inline-svg
                src="/media/icons/duotune/general/gen024.svg"
              ></inline-svg>
            </a>
          </li>
        </ul>
        <FormModal @add-tags="tagAdd"></FormModal>
        <button
          type="button"
          class="btn btn-primary er fs-6 px-8 py-4"
          data-bs-toggle="modal"
          data-bs-target="#modalForm"
        >
          <span class="svg-icon svg-icon-3">
            <inline-svg src="media/icons/duotune/general/gen035.svg" />
          </span>
          {{ $t("addTag") }}
        </button>
      </div>
 
    <div class="card-body pt-0 pb-5">
      <component
      v-if="(productTags.length >0 )"
        :pagination="pagination"
        :items="productTags"
        :is="activeComponent"
        @delete-product-tag="deleteProductTag"
        @update-pagination="search"
      />
  
  <div v-else>
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span>Loading...</span>
          </div>
        </div>
      </div>
    </div>
    <FormModal></FormModal>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { ref, computed } from "vue";
import TagTable from "@/views/products/product-tags/components/TableTags.vue";
import TagCard from "@/views/products/product-tags/components/GridTags.vue";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import FormModal from "@/views/products/product-tags/components/AddFormTags.vue";
import { Pagination } from "@/types";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import i18n from "@/core/plugins/i18n";
const store = useStore();
const isGrid = ref(true);
const searchValue = ref("");
const productTags = computed(() => {
  return store.state.ProductTags.tags;
});

const pagination = computed(
  () => store.state.ProductTags.pagination as Pagination
);

const activeComponent = computed(() => {
  return isGrid.value ? TagTable : TagCard;
});

const setActive = (val) => {
  isGrid.value = val;
};

const setItemsPerPage = (event) => {
  // console.log(event);
  // console.log(pagination.value);
  store.commit(Mutations.UPDATE_TAG_PAGINATION, {
    ...pagination.value,
    pageSize: event,
  });
  search();
};
const search = () => {
  // console.log(pagination.value);
  store.dispatch(Actions.GET_PRODUCT_TAGS, {
    query: searchValue.value,
    pageSize: pagination.value.pageSize,
    pageNumber: pagination.value.pageNumber,
  });
};
function tagAdd() {
  search();
}
const reset = () => {
  searchValue.value = "";
  store.dispatch(Actions.GET_PRODUCT_TAGS, {
    query: "",
    pageSize: pagination.value.pageSize,
    pageNumber: pagination.value.pageNumber,
  });
};
const deleteProductTag = (id) => {
  store.dispatch(Actions.DELETE_PRODUCT_TAGS, id);
};
setCurrentPageBreadcrumbs(i18n.global.t("productTags") , []);
search();
</script>
<style lang="scss">
.product-tags {
  .card-header {
    display: inline;
  }
}
</style>
