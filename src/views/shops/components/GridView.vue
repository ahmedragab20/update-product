<template>
  <div class="row g-4">
    <div v-for="shop in items" :key="shop.id" class="col-12 col-md-4">
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
                <router-link
                  :to="`/shops/details/shops-base-setting/${shop.id}`"
                  class="menu-link px-3 d-flex justify-content-between align-items-center"
                >
                  <span>{{ $t("update") }}</span>
                  <span class="svg-icon svg-icon-3">
                    <inline-svg src="/media/icons/duotune/art/art005.svg" />
                  </span>
                </router-link>
              </div>
              <!--end::Menu item-->
              <!--begin::Menu item-->
              <div class="menu-item px-3">
                <a
                  @click="deleteShop(shop.id)"
                  class="menu-link px-3 d-flex justify-content-between align-items-center"
                >
                  <span>{{ $t("delete") }}</span>
                  <span class="svg-icon svg-icon-danger">
                    <inline-svg src="/media/icons/duotune/general/gen027.svg" />
                  </span>
                </a>
              </div>
              <!--end::Menu item-->
            </div>
          </div>
        </div>
        <div
          class="pt-0 card-body d-flex flex-column align-items-center justify-content-center"
        >
          <img style="height: 50px" :src="shop.logoPath" alt="logo" />

          <h2 class="mt-3">
            <!-- <router-link :to="`/market/shops/details/basic?id=${item.id}`"> -->
            {{ shop.name }}
            <!-- </router-link> -->
          </h2>
          <small>{{ shop.address }}</small>
        </div>
      </div>
    </div>
    <div class="col-12 d-flex justify-content-end">
      <el-pagination
        v-model:current-page="pagination.pageNumber"
        @current-change="updatePagination"
        :page-size="pagination.pageSize"
        layout="prev, pager, next"
        :total="pagination.totalCount"
        :hide-on-single-page="true"
        background
      >
      </el-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed, defineEmits } from "vue";
import { Pagination } from "@/types";
import { Mutations } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2";
import i18n from "@/core/plugins/i18n";

const store = useStore();
// get pagination from store
const pagination = computed(() => store.state.Shops.pagination as Pagination);
// get shops from store
const items = computed(() => store.state.Shops.shops);

let emit = defineEmits(["delete-shop", "update-pagination"]);


//delete account
function deleteShop(id) {
  Swal.fire({
    title: i18n.global.t("alertText"),
    text: i18n.global.t("deleteShopAlertText"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: i18n.global.t("cancel"),
    confirmButtonText: i18n.global.t("yesSure"),
  }).then((status) => {
    if (status.isConfirmed) {
      emit("delete-shop", id);
      for (let i = 0; i < items.value.length; i++) {
        if (items.value[i].id === id) {
          items.value.splice(i, 1);
        }
      }
    } else {
      return null;
    }
  });
}
// update pagination function
function updatePagination(event) {
  store.commit(Mutations.UPDATE_CURRENT_PAGE, event);
  emit("update-pagination", event);
}


</script>
