<template>
  <div class="row g-4">
    <div v-for="label in items" :key="label.id" class="col-12 col-md-4">
      <div class="card shadow-sm">
        <div class="card-toolbar mx-4 my-2 d-flex justify-content-end align-items-center">
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
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
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
                  @click="emit('delete-product-label')"
                  class="menu-link px-3 d-flex justify-content-between align-items-center"
                >
                  <span>{{ $t("delete") }}</span>
                  <span class="svg-icon svg-icon-3">
                    <inline-svg src="/media/icons/duotune/general/gen027.svg" />
                  </span>
                </a>
              </div>
              <!--end::Menu item-->

              <!--begin::Menu item-->
              <div class="menu-item px-3">
                <router-link
                  :to="`/products/labels/${label.id}`"
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
          class="card-body d-flex flex-column align-items-center justify-content-center"
        >
          <span :class="label.icon" class="label-icon"></span>

          <h2>
            <router-link :to="`/products/labels/${label.id}`">
              {{ label.name }}
            </router-link>
          </h2>
          <small class="text-gray-400">{{ label.code }}</small>

          <div class="d-flex mt-5">
            <div
              class="border text-center border-gray-300 border-dashed rounded min-w-80px py-3 px-4 mx-2 mb-3"
            >
              <div class="fs-6 fw-bolder text-gray-700">
                <!-- <f-icon icon="box" class="mx-2 text-primary"></f-icon> -->
                {{ label.numberOfConnectedProducts }}
              </div>
              <div class="fw-bold text-gray-400">{{ $t("connectedProducts") }}</div>
            </div>

            <div
              class="border text-center border-gray-300 border-dashed rounded min-w-80px py-3 px-4 mx-2 mb-3"
            >
              <div class="fs-6 fw-bolder text-gray-700">
                <!-- <f-icon icon="store" class="mx-2 text-primary"></f-icon> -->
                {{ label.numberOfConnectedShops }}
              </div>
              <div class="fw-bold text-gray-400">{{ $t("connectedShops") }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 d-flex justify-content-end">
      <el-pagination
        v-model:current-page="pagination.pageNumber"
        @current-change="eventFire"
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
import { ProductLabel } from "@/api/data/ProductLabels";
import { ref, defineProps, computed, defineEmits } from "vue";
import { Pagination } from "@/interfaces/pagination";

const store = useStore();

const pagination = computed(() => store.state.ProductLabels.pagination as Pagination);
let props = defineProps({
  items: Array as ProductLabel[],
});
let emit = defineEmits(["delete-product-label", "update-pagination"]);

function eventFire(n) {
  emit("update-pagination", n);
}
</script>

<style>
.label-icon {
  font-size: 2rem;
  margin: 1rem 0;
}
</style>
