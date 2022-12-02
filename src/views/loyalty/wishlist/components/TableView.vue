<template>
    <div class="card">
      <div class="card-body">
        <!--begin::Body-->
        <!--begin::Table container-->
        <div class="table-responsive">
          <!--begin::Table-->
          <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
            <!--begin::Table head-->
            <thead>
              <tr>
                <!-- <th class="min-w-140px">Slug</th> -->
                <th class="min-w-150px">{{ $t("ShopName") }}</th>
                <th class="min-w-140px">{{ $t("Device") }}</th>
                <th class="min-w-120px">{{ $t("ProductCounts") }}</th>
                <th class="min-w-100px">{{ $t("actions") }}</th>
              </tr>
            </thead>
            <!--end::Table head-->
  
            <!--begin::Table body-->
            <tbody>
              
              <template v-for="(item, index) in items" :key="index">
                <tr>
                  <td>
                    <span class="fw-bold d-block fs-7">{{ shopName(item.shopId) }}</span>
                  </td>
                  <td>
                    <div class="d-flex flex-column w-100 me-2">
                      <span class="me-2 fs-7 fw-bold">
                        {{ item.deviceId }}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div class="d-flex flex-column w-100 me-2">
                      <span class="me-2 fs-7 fw-bold">
                        {{ item.productCounts }}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span>
                      <a href="#" 
                        data-bs-toggle="modal"
                        :data-bs-target="`#wishlist-details`"
                        @click="getWishlistDetails(item.id)"
                        class="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2 fs-7 fw-bold">
                        {{ $t("View") }}
                      </a>
                    </span>
                  </td>

                </tr>
              </template>
            </tbody>
            <!--end::Table body-->
          </table>
          <!--end::Table-->
        </div>
        <!--end::Table container-->
      </div>
      <!--begin::Body-->
    </div>
    <div class="row my-4">
      <div class="col d-flex justify-content-end">
        <!-- <el-pagination
          background
          :page-size="pagination.pageSize"
          layout="prev, pager, next"
          :total="pagination.totalCount"
          v-model:current-page="pagination.pageNumber"
          @current-change="eventFire"
        /> -->
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, defineEmits, computed } from "vue";
  import { useStore } from "vuex";
  import { Market } from "@/types";
  import { Actions } from "@/store/enums/StoreEnums";
  const { state, dispatch, getters, commit } = useStore();
  const market = computed(() => getters.getMarketData as Market);
  let emit = defineEmits(["update-pagination"]);
  
  const items = computed(() => state.ProductWishlists.wishlists);
  console.log("test", items)
  const image = (path) => {
    return `https://mfproductimages.s3.amazonaws.com` + path;
  };
  function shopName(id) {
    return market.value?.shops?.find((m) => m.id === id)?.name
  }
  function getWishlistDetails(id: string) {
    const xx = dispatch(Actions.GET_PRODUCT_WISHLIST, id);
    console.log("getWishlistDetails", xx)
  }
  </script>
  