<template>
    <div>
        <div
            class="modal fade"
            ref="modalRef"
            id="wishlist-details"
            tabindex="-1"
            aria-hidden="true"
            >
            <!--begin::Modal dialog-->
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                <div class="modal-header" id="kt_modal_create_api_key_header">
                    <h2>{{ $t("ProductWishlistsDetails") }}</h2>

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

                <WishlistDetails></WishlistDetails>
                </div>
            </div>
            <!--End::Modal dialog-->
        </div>
      <div>
        <!--begin::Card-->
        <div class="card mb-7">
          <!--begin::Card body-->
          <div class="card-body">
            <!--begin::Compact form-->
            <div class="d-flex align-items-center justify-content-between gap-3">
              <!--begin::Input group-->
              <div class="position-relative me-md-2 flex-grow-1">
                <!--begin::Svg Icon | path: icons/duotune/general/gen021.svg-->
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
                <!--end::Svg Icon-->
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
              </div>

  
  
              <!--end::Input group-->
              <!--begin:Action-->
              <div class="d-flex align-items-center">
                <button
                  type="button"
                  class="btn btn-primary me-5"
                  style="margin-top: 28px"
                  @click="fetchData"
                >
                  {{ $t("search") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="d-flex justify-content-between align-items-center w-100">
        <h2>{{ $t("ProductWishlists") }}</h2>
        <!--begin::Filter-->
        <div class="d-flex align-items-center justify-content-end my-3">
          <ul class="nav nav-pills me-6 mb-2 mb-sm-0">
            <li>
              <el-select
                @change="setItemsPerPage"
                v-model="pagination.pageSize"
                placeholder="Number Of Item"
                class="mx-4"
              >
                <el-option :value="6">6</el-option>
                <el-option :value="15">15</el-option>
                <el-option :value="30">30</el-option>
                <el-option :value="90">90</el-option>
              </el-select>
            </li>
          </ul>
        </div>
      </div>
      <Component :items="productWishlists" :is="activeComponent" />
    </div>
  </template>
  
  <script lang="ts" setup>
  import { useStore } from "vuex";
  import { ref, computed, reactive, onMounted } from "vue";
  import TableView from "./components/TableView.vue";
  import { Actions, Mutations } from "@/store/enums/StoreEnums";
  import { Wishlist, Market } from "@/types";
  import { Views } from "@/shared/enums/Views";
  import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
  import WishlistDetails from "./components/WishlistDetails.vue";
  import i18n from "@/core/plugins/i18n";
  const { state, dispatch, getters, commit } = useStore();
  
  // REF
  const activeView = ref(Views.TABLE_VIEW);
  const pagination = computed(() => state.ProductWishlists.pagination);
  // GETTERS
  const productWishlists = computed(
    () => state.wishlists as Array<Wishlist>
  );
  const operations = computed(() => getters.getOperationTypes);
  const filterDto = computed(() => state.ProductWishlists.filterDto);
  const market = computed(() => getters.getMarketData as Market);
  const activeComponent = computed(() => {
    return activeView.value == Views.TABLE_VIEW ? TableView : "";
  });
  // Methods
  const setActiveView = (val: Views) => {
    activeView.value = val;
  };

  const fetchData = () => {
    dispatch(Actions.GET_PRODUCT_WISHLISTS, {
      ...filterDto.value,
      pageSize: pagination.value.pageSize,
      pageNumber: pagination.value.pageNumber,
    });
    console.log("search result",filterDto.value)
  };
  
  const setItemsPerPage = (e) => {
    commit(Mutations.UPDATE_PAGINATION, {
      ...pagination.value,
      pageSize: e,
    });
    fetchData();
  };
  setItemsPerPage(pagination.value.pageSize);
  onMounted(async () => {
    setCurrentPageBreadcrumbs(i18n.global.t("ProductWishlists"), []);
  });
  </script>
  
  <style>
  .el-input-group__prepend {
    border: none;
    border-right: 1px solid #ddd;
  }
  </style>
  