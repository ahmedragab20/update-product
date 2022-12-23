<template>
  <div class="row g-4">
    <div v-for="group in items" :key="group.id" class="col-3 group-item">
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
                <!-- <a
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#kt_modal_update_client"
                  class="menu-link px-3 d-flex justify-content-between align-items-center"
                  @click="updateClientGroup(group.id)"
                >
                  <span>{{ $t("update") }}</span>
                  <span class="svg-icon svg-icon-3">
                    <inline-svg src="/media/icons/duotune/art/art005.svg" />
                  </span>
                </a> -->
              </div>
              <div class="menu-item px-3">
                <a
                  @click="deleteGroup(group.id)"
                  class="menu-link px-3 d-flex justify-content-between align-items-center btn-sm btn-light-danger"
                  style="color: red"
                >
                  <span>{{ $t("delete") }}</span>
                  <span class="svg-icon svg-icon-3 svg-icon-danger">
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

        <div class="card-body">
          <div
            :style="`background-color:${group.backgroundColorHeax};color:${group.textColorHexa} ;    border-radius: 10%;
           
    width:100%;
    text-align: center;
   

   

   `"
          >
            <span class="item-name">
              {{ group.name }}
            </span>
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
import { ClientGroup } from "@/api/data/ClientGroup";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { ref, defineProps, computed, defineEmits } from "vue";
import { Pagination } from "@/interfaces/pagination";
import Swal from "sweetalert2";
const store = useStore();

const pagination = computed(
  () => store.state.ClientGroup.pagination as Pagination
);
let props = defineProps({
  items: Array as ClientGroup[],
});
// const items = computed(() => store.state.ClientGroup.ClientGroups);
function updatePagination(event) {
  console.log("event", event);
  store.commit(Mutations.UPDATE_PAGINATION_CLIENT_GROUP, event);
  // emit("update-pagination", event);
}

let emit = defineEmits([
  "updateClientGroup",
  "update-pagination",
  "delete-client-group",
]);
function deleteGroup(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "Are you sure you want to delete Client Group !",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((status) => {
    if (status.isConfirmed) emit("delete-client-group", id);

    console.log(props.items.length);
    for (let i = 0; i < props.items.length; i++) {
      if (props.items[i].id === id) {
        props.items.splice(i, 1);
      }
    }
    console.log(props.items);
  });
}
const updateClientGroup = (id) => {
  emit("updateClientGroup", id);
};
function eventFire(n) {
  emit("update-pagination", n);
}
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
