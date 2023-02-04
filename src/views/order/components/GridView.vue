<template>
  <div class="row g-4">
    <div v-for="order in items" :key="order.id" class="col-12 col-md-4">
      <div class="card shadow-sm h-100">
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
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
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
                  {{ $t("quickAction") }}
                </div>
              </div>
              <!--end::Menu item-->
              <!--begin::Menu separator-->
              <div class="separator mb-3 opacity-75"></div>
              <!--end::Menu separator-->

              <!--begin::Menu item-->
              <div class="menu-item px-3">
                <router-link
                  class="menu-link px-3 d-flex justify-content-between align-items-center"
                  :to="`/order/update-order/${order.id}`"
                >
                  <span>{{ $t("updateOrder") }}</span>
                  <span class="svg-icon svg-icon-3">
                    <inline-svg src="/media/icons/duotune/art/art005.svg" />
                  </span>
                </router-link>
              </div>
              <div class="menu-item px-3">
                <a
                  @click="deleteOrderAction(order.id)"
                  class="menu-link px-3 d-flex justify-content-between align-items-center"
                >
                  <span>{{ $t("delete") }}</span>
                  <span class="svg-icon svg-icon-danger">
                    <inline-svg src="/media/icons/duotune/general/gen027.svg" />
                  </span>
                </a>
              </div>
              <!--end::Menu item-->

              <!--begin::Menu item-->

              <!--end::Menu item-->
            </div>
          </div>
        </div>
        <div
          class="card-body pt-0 d-flex flex-column align-items-center justify-content-center"
        >
          <h2>
            {{ order.name }}
          </h2>

          <!-- <div class="d-flex mt-5">
            <div
              class="border text-center border-gray-300 border-dashed rounded min-w-80px py-3 px-4 mx-2 mb-3"
            >
              <div class="fs-6 fw-bolder text-gray-700">
              
                {{ order.minimumSelectionValue }}
              </div>
              <div class="fw-bold text-gray-400">{{ $t("minimumSelectionValue") }}</div>
            </div>

            <div
              class="border text-center border-gray-300 border-dashed rounded min-w-80px py-3 px-4 mx-2 mb-3"
            >
              <div class="fs-6 fw-bolder text-gray-700">
              
                {{ order.maximumSelectionValue }}
              </div>
              <div class="fw-bold text-gray-400"> {{ $t("maximumSelectionValue") }}</div>
            </div>
          </div> -->
          <div class="d-flex mt-5 row">
            <div
              class="border border-gray-300 border-dashed rounded py-3 px-4 mx-2 mb-3 col-12 row"
            >
              <span class="fw-bold text-start text-gray-400">
                {{ $t("Must Follow The Order") }}
              </span>

              <span
                class="svg-icon svg-icon-1 svg-icon-gray-600"
                v-if="order.mustFollowTheOrder"
              >
                <inline-svg src="/media/svg/general/icons8-done.svg" />
              </span>
              <span class="svg-icon svg-icon-1 svg-icon-gray-600" v-else>
                <inline-svg src="/media/svg/general/icons8-cancel.svg" />
              </span>
            </div>

            <div
              class="border text-start border-gray-300 border-dashed rounded py-3 px-4 mx-2 mb-3 col-12 row"
            >
              <span class="fw-bold text-gray-400"
                >{{ $t("Can Revert Action") }}
              </span>
              <span
                class="svg-icon svg-icon-1 svg-icon-gray-600 text-end"
                v-if="order.canRevertAction"
              >
                <inline-svg src="/media/svg/general/icons8-done.svg" />
              </span>
              <span
                class="svg-icon svg-icon-1 svg-icon-gray-600 text-end"
                v-else
              >
                <inline-svg src="/media/svg/general/icons8-cancel.svg" />
              </span>
            </div>

            <!-- <div
              class="border text-start border-gray-300 border-dashed rounded  py-3 px-4 mx-2 mb-3 col-12 row"
            >
             
              <span class="fw-bold text-gray-400">{{ $t("Can Revert Action After Completion") }}
                
                
             
              </span>
              <span class="svg-icon svg-icon-1 svg-icon-gray-600 text-end " v-if="order.canRevertActionAfterCompletion">
                <inline-svg src="/media/svg/general/icons8-done.svg" />
              </span>
              <span class="svg-icon svg-icon-1 svg-icon-gray-600 text-end " v-else>
                <inline-svg src="/media/svg/general/icons8-done.svg" />
              </span>
            </div>
            <div
            class="border text-start border-gray-300 border-dashed rounded  py-3 px-4 mx-2 mb-3 col-12 row"
          >
           
            <div class="fw-bold text-gray-400">{{ $t("Update Skipped Actions With Last Action Information") }}
              
              <span class="svg-icon svg-icon-1 svg-icon-gray-600 text-end " v-if="order.updateSkippedActionsWithLastActionInformation">
                <inline-svg src="/media/svg/general/icons8-done.svg" />
              </span>
              <span class="svg-icon svg-icon-1 svg-icon-gray-600 text-end " v-else>
                <inline-svg src="/media/svg/general/icons8-done.svg" />
              </span>
           
            </div>
          </div> -->
            <div
              class="border text-start border-gray-300 border-dashed rounded py-3 px-4 mx-2 mb-3 col-12 row"
            >
              <span class="fw-bold text-gray-400">{{ $t("isDefault") }} </span>

              <span
                class="svg-icon svg-icon-1 svg-icon-gray-600 text-end"
                v-if="order.isDefault"
              >
                <inline-svg src="/media/svg/general/icons8-done.svg" />
              </span>
              <span
                class="svg-icon svg-icon-1 svg-icon-gray-600 text-end"
                v-else
              >
                <inline-svg src="/media/svg/general/icons8-cancel.svg" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 pagination">
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

import { Pagination } from "@/types";
import { computed, defineEmits } from "vue";
import Swal from "sweetalert2";
import i18n from "@/core/plugins/i18n";

const store = useStore();
const items = computed(() => store.state.Order.OrderAction);
const emit = defineEmits(["delete-order-action", "update-pagination"]);
function deleteOrderAction(id: string) {
  console.log(id);
  Swal.fire({
    title: i18n.global.t("alertText"),
    text: i18n.global.t("deleteOrderActionAlertText"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: i18n.global.t("cancel"),
    confirmButtonText: i18n.global.t("yesSure"),
  }).then((status) => {
    if (status.isConfirmed) emit("delete-order-action", id);
    else return null;
    for (let i = 0; i < items.value.length; i++) {
      if (items.value[i].id === id) {
        items.value.splice(i, 1);
      }
    }
  });
}
const pagination = computed(() => store.state.Order.pagination as Pagination);

function eventFire(n) {
  emit("update-pagination", n);
}
</script>
<style scoped>
.col-12.pagination {
  justify-content: flex-end !important;
  margin-top: 12px;
}
.dropdown-menu {
  inset: 0px auto auto -12.5rem !important;
}
.card-toolbar {
  justify-content: flex-end !important;
}
.card-header.border-0.pt-5 {
  margin-left: auto !important;
}

span.fw-bold.text-start.text-gray-400 {
  width: 80%;
}
span.fw-bold.text-gray-400 {
  width: 80%;
}
span.svg-icon.svg-icon-1.svg-icon-gray-600 {
  width: fit-content;
}

.btn.btn-icon {
  /* display: inline-flex; */
  /* align-items: center; */
  /* justify-content: center; */
  padding: 12px !important;
  margin-left: 13px;

  width: 78% !important;
}
</style>
