<template>
  <div class="row g-4">
    <div v-for="client in items" :key="client.id" class="col-4">
      <div class="card card-grid shadow-sm">
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
              aria-groupledby="dropdownMenuButton1"
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
                  :to="`/clients/client-details/${client.id}`"
                  class="menu-link px-3 d-flex justify-content-between align-items-center"
                >
                  <span>{{ $t("View") }}</span>
                  <span class="svg-icon svg-icon-3">
                    <inline-svg src="/media/icons/duotune/art/art011.svg" />
                  </span>
                </router-link>
              </div>

              <!--end::Menu item-->

              <!--begin::Menu item-->

              <!--end::Menu item-->
            </div>
          </div>
        </div>

        <div class="card-body">
          <div
            class="card-body d-flex flex-column align-items-center justify-content-center"
          >
            <router-link :to="`/clients/client-details/${client.id}`">
              <h3>
                {{ client.name }}
              </h3>
            </router-link>

            <div class="mt-5">
              <div class="fs-6 fw-bolder text-gray-700 row">
                <!-- <f-icon icon="box" class="mx-2 text-primary"></f-icon> -->

                <div class="col-10">
                  <span style="font-size: 1.02rem"> {{ client.email }}</span>
                </div>
                <div class="col-2">
                  <span
                    class="badge badge-light-primary"
                    v-if="client.emailConfirmed"
                  >
                    <inline-svg src="/media/svg/general/icons8-done.svg"
                  /></span>
                  <span class="badge badge-light-danger" v-else>
                    <inline-svg src="/media/svg/general/icons8-cancel.svg" />
                  </span>
                </div>
              </div>
              <div class="fs-6 fw-bolder text-gray-700 row">
                <!-- <f-icon icon="store" class="mx-2 text-primary"></f-icon> -->
                <div class="col-10">
                  <span style="font-size: 1.02rem">
                    {{ client.phoneNumber }}</span
                  >
                </div>
                <div class="col-2">
                  <span
                    class="badge badge-light-primary"
                    v-if="client.phoneNumberConfirmed"
                  >
                    <inline-svg src="/media/svg/general/icons8-done.svg" />
                  </span>
                  <span class="badge badge-light-danger" v-else>
                    <inline-svg src="/media/svg/general/icons8-cancel.svg" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row my-4">
    <div class="col d-flex justify-content-end">
      <el-pagination
        v-model:current-page="pagination.pageNumber"
        @current-change="updatePagination"
        :page-size="pagination.pageSize"
        layout="prev, pager, next"
        :total="pagination.totalCount"
        :hide-on-single-page="false"
        background
      >
      </el-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";

import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { ref, defineProps, computed, defineEmits } from "vue";
import { Pagination } from "@/interfaces/pagination";
import Swal from "sweetalert2";
const store = useStore();

const pagination = computed(
  () => store.state.ClientGroup.pagination as Pagination
);

const items = computed(() => store.state.Clients.Clients);
// const items = computed(() => store.state.ClientGroup.ClientGroups);
function updatePagination(event) {

  store.commit(Mutations.UPDATE_CURRENT_PAGE_CLIENTS, event);
  emit("update-pagination", event);

}

let emit = defineEmits([

  "update-pagination",

]);



</script>

<style>
.group-icon {
  font-size: 2rem;
  margin: 1rem 0;
  width: 200px !important;
}
.menu-gray-800 .menu-item .menu-link {
  color: #04c8c8;
}
span.item-name {
  font-size: 1.2rem;
}
.card-grid {
  height: 100%;
}
</style>
