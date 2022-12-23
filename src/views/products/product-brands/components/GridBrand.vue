<template>
  <!--begin::Col-->
  <!--begin::Content-->
  <div class="content d-flex flex-column flex-column-fluid mt-5" id="kt_content">
    <!--begin::Container-->
    <div class="container-xxl" id="kt_content_container">
      <!--begin::Form-->
      <!--begin::Tab Content-->
      <div class="tab-content">
        <!--begin::Tab pane-->
        <div id="kt_project_users_card_pane" class="tab-pane fade show active">
          <!--begin::Row-->
          <div class="row g-6 g-xl-9">
            <!--begin::Col-->
            <div v-for="brand in Brands" :key="brand.id" class="col-12 col-md-4">
              <div class="card shadow-sm">
                <div
                  class="card-toolbar mx-4 my-2 d-flex justify-content-end align-items-center"
                >
                  <div class="dropdown">
                    <button
                      type="button"
                      class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <!--begin::Svg Icon | path: icons/duotune/general/gen024.svg-->
                      <span class="svg-icon svg-icon-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30px"
                          height="30px"
                          viewBox="0 0 20 20"
                        >
                          <g
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                          >
                            <rect
                              x="5"
                              y="5"
                              width="5"
                              height="5"
                              rx="1"
                              fill="currentColor"
                            ></rect>
                            <rect
                              x="14"
                              y="5"
                              width="5"
                              height="5"
                              rx="1"
                              fill="currentColor"
                              opacity="0.3"
                            ></rect>
                            <rect
                              x="5"
                              y="14"
                              width="5"
                              height="5"
                              rx="1"
                              fill="currentColor"
                              opacity="0.3"
                            ></rect>
                            <rect
                              x="14"
                              y="14"
                              width="5"
                              height="5"
                              rx="1"
                              fill="currentColor"
                              opacity="0.3"
                            ></rect>
                          </g>
                        </svg>
                      </span>
                      <!--end::Svg Icon-->
                    </button>
                    <div
                      aria-labelledby="dropdownMenuButton1"
                      class="dropdown-menu menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold w-200px pb-2"
                    >
                      <!--begin::Menu item-->
                      <div class="menu-item px-3">
                        <div class="menu-content fs-6 text-dark fw-bolder px-3 py-4">
                          {{ $t("actions") }}
                        </div>
                      </div>
                      <!--end::Menu item-->
                      <!--begin::Menu separator-->
                      <div class="separator mb-3 opacity-75"></div>
                      <!--end::Menu separator-->

                      <!--begin::Menu item-->
                      <div class="menu-item px-3">
                        <a 
                        role="button"
                          @click="emit(deleteBrand(brand.id))"
                          class=" px-3 d-flex btn btn-sm btn-light-danger justify-content-between btn-light-danger align-items-center"
                        >
                          <span>{{ $t("delete") }}</span>
                          <span class="svg-icon svg-icon-3 svg-icon-danger">
                            <inline-svg src="/media/icons/duotune/general/gen027.svg" />
                          </span>
                        </a>
                      </div>
                      <!--end::Menu item-->

                      <!--begin::Menu item-->
                      <div class="menu-item px-3">
                        <router-link
                          :to="`/products/brands/${brand.id}`"
                          class="menu-link px-3 d-flex justify-content-between align-items-center"
                        >
                          <span>{{ $t("update") }}</span>
                          <span class="svg-icon svg-icon-3">
                            <inline-svg src="/media/icons/duotune/art/art005.svg" />
                          </span>
                        </router-link>
                      </div>
                      <!--end::Menu item-->
                    </div>
                  </div>
                </div>
                <div
                  class="card-body pt-0 d-flex flex-column align-items-center justify-content-center"
                >
                  <img :src="brand.thumbnailPath" height="65" />

                  <h2 class="my-4">
                    <router-link :to="`/products/brands/${brand.id}`">
                      {{ brand.name }}
                    </router-link>
                  </h2>
                  <small class="text-gray-400">{{ brand.code }}</small>

                  <div class="d-flex mt-5">
                    <div
                      class="border text-center border-gray-300 border-dashed rounded min-w-80px py-3 px-4 mx-2 mb-3"
                    >
                      <div class="fs-6 fw-bolder text-gray-700">
                        <!-- <f-icon icon="box" class="mx-2 text-primary"></f-icon> -->
                        {{ brand.numberOfConnectedProducts }}
                      </div>
                      <div class="fw-bold text-gray-400">
                        {{ $t("connectedProductsCount") }}
                      </div>
                    </div>

                    <div
                      class="border text-center border-gray-300 border-dashed rounded min-w-80px py-3 px-4 mx-2 mb-3"
                    >
                      <div class="fs-6 fw-bolder text-gray-700">
                        <!-- <f-icon icon="store" class="mx-2 text-primary"></f-icon> -->
                        {{ brand.numberOfConnectedShops }}
                      </div>
                      <div class="fw-bold text-gray-400">
                        {{ $t("connectedShopsCount") }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12">
              <!-- 
                            <el-pagination v-model:current-page="pagination.pageNumber" @current-change="eventFire"
                                :page-size="pagination.pageSize" layout="prev, pager, next"
                                :total="pagination.totalCount" :hide-on-single-page="true" background>
                            </el-pagination> -->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Card body-->
          <!--end::Card-->
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->
      <!--end::Tab pane-->
      <!--begin::Pagination-->

      <!--begin::Pagination-->
      <div class="row mt-10">
        <div
          class="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end"
        >
          <el-pagination
            v-model:current-page="pagination.pageNumber"
            @current-change="fetchData"
            :page-size="pagination.pageSize"
            layout="prev, pager, next"
            :total="getTotalCount"
            :hide-on-single-page="true"
            background
          >
          </el-pagination>
        </div>
      </div>
      <!--end::Pagination-->
      <!--end::Pagination-->
    </div>
    <!--end::Tab Content-->
  </div>
  <!--end::Col-->

  <!--end::Row-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed, defineEmits } from "vue";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { Brand } from "@/types";
import Api from "@/utils/ApiHelper";

export default defineComponent({
  components: {},

  setup() {
    const pagination = computed(() => store.getters.getPagination);
    const Brands = computed(() => store.getters.getBrands);
    const store = useStore();
    const getTotalCount = computed(() => store.getters.getTotalCount);
    const total = ref("");

    const fetchData = async () => {
      const data = {
        pageSize: pagination.value.pageSize,
        pageNumber: pagination.value.pageNumber,
      };
      await store.dispatch(Actions.GET_PRODUCT_BRANDS, data);
    };

    const domain = computed(() => store.getters.getMediaHost);

    const image = (path) => {
      return `https://mfproductimages.s3.amazonaws.com` + path;
    };
    const deleteBrand = (id) => {
      const brandId = {
        id,
      };

      store.dispatch(Actions.DELETE_PRODUCT_BRANDS, brandId);
    };
    defineEmits(["delete-brand"]);

    return {
      deleteBrand,
      total,
      getTotalCount,
      Brands,
      image,
      fetchData,
      pagination,
      domain,
    };
  },
});
</script>
