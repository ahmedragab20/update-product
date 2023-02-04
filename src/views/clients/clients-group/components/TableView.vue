<template>
  <div class="card">
    <div class="card-body">
      <!--begin::Body-->
      <!--begin::Table container-->
      <div class="table-responsive">
        <!--begin::Table-->
        <table
          class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4"
        >
          <!--begin::Table head-->
          <thead>
            <tr>
              <th class="name" style="width: 85%">{{ $t("name") }}</th>
              <th class="name">{{ $t("actions") }}</th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            
            <template v-for="(item, index) in items" :key="index">
              <tr>
                <td>
                  <div
                    class="d-flex align-items-center"
                    :style="`background-color:${item.backgroundColorHeax};color:${item.textColorHexa} ;    border-radius: 10%;
      width:20%;
    text-align: center;

   `"
                  >
                    <span class="item-name">
                      {{ item.name }}
                    </span>
                  </div>
                </td>

                <td>
                  <a
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_update_client"
                    class="btn btn-icon btn-light-primary btn-active-color-primary btn-sm"
                    style="margin-right: 12px"
                    @click="updateClientGroup(item.id)"
                  >
                    <span class="svg-icon svg-icon-3">
                      <inline-svg src="/media/icons/duotune/art/art005.svg" />
                    </span>
                  </a>

                  <a
                    @click="deleteGroup(item.id)"
                    class="btn btn-icon btn-light-danger btn-active-color-primary btn-sm"
                  >
                    <span class="svg-icon-3 svg-icon-danger">
                      <inline-svg
                        src="/media/icons/duotune/general/gen027.svg"
                      />
                    </span>
                  </a>
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
    <!--begin::Body-->
  </div>
</template>

<script setup lang="ts">
import {  computed } from "vue";
import { Actions, Mutations } from "@/store/enums/StoreEnums";

import { useStore } from "vuex";
import { Pagination } from "@/types";
import Swal from "sweetalert2";
import { ClientGroupType } from "@/types";
let emit = defineEmits([
  "updateClientGroup",
  "update-pagination",
  "delete-client-group",
]);
function deleteGroup(id: string) {
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

    for (let i = 0; i < tableData.value.length; i++) {
      if (tableData.value[i].id === id) {
        tableData.value.splice(i, 1);
      }
    }
    console.log(tableData);
  });
}
const updateClientGroup = (id: string) => {
  emit("updateClientGroup", id);
};
const pagination = computed(
  () => store.state.ClientGroup.pagination as Pagination
);
interface Props {
  items: Array<ClientGroup>;
}

const store = useStore();
const props = defineProps<Props>();
const tableData = computed(() => store.state.ClientGroup.ClientGroups);

function updatePagination(event) {
  console.log("event", event);
  store.commit(Mutations.UPDATE_PAGINATION_CLIENT_GROUP, event);
  // emit("update-pagination", event);
}
</script>
<style>
span.item-name {
  font-size: 1.2rem;
}
th.name {
  /* border-color: darkgray; */
  /* border-width: 0px; */
  /* border-style: initial; */
  /* text-transform: inherit; */
  font-weight: bold;
  font-size: 15px;
  color: #f5f8fa;
  /* background-color: #F5F8FA; */
  /* border-color: #F5F8FA; */
  color: #b5b5c3;
  /* height: inherit; */
  /* min-height: inherit; */
}
</style>
