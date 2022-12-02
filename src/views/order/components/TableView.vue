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
              <th class="min-w-150px">{{ $t("name") }}</th>
              <th class="min-w-140px">{{ $t("canRevertAction") }}</th>
              <th class="min-w-120px">{{ $t("mustFollowTheOrder") }}</th>
              <th class="min-w-100px">{{ $t("isDefault") }}</th>
             
              <th class="min-w-100px">{{ $t("actions") }}</th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <template v-for="(item, index) in items" :key="index">
              <tr>
                <td>
                  <div class="d-flex align-items-center">
                    <span :class="item.icon" class="text-primary"> </span>
                    <span class="mx-3">
                      {{ item.name }}
                    </span>
                  </div>
                </td>

                <td>
                   
              <span class="svg-icon svg-icon-1 svg-icon-gray-600" v-if="item.canRevertAction">
                <inline-svg src="/media/svg/general/icons8-done.svg" />
              </span>
              <span class="svg-icon svg-icon-1 svg-icon-gray-600 text-end " v-else>
                <inline-svg  src="/media/svg/general/icons8-cancel.svg" />
              </span>
                </td>

                <td>
                     
              <span class="svg-icon svg-icon-1 svg-icon-gray-600" v-if="item.mustFollowTheOrder">
                <inline-svg src="/media/svg/general/icons8-done.svg" />
              </span>
              <span class="svg-icon svg-icon-1 svg-icon-gray-600 text-end " v-else>
                <inline-svg  src="/media/svg/general/icons8-cancel.svg" />
              </span>
                </td>
                <td>
                    
              <span class="svg-icon svg-icon-1 svg-icon-gray-600" v-if="item.isDefault">
                <inline-svg src="/media/svg/general/icons8-done.svg" />
              </span>
              <span class="svg-icon svg-icon-1 svg-icon-gray-600 text-end " v-else>
                <inline-svg  src="/media/svg/general/icons8-cancel.svg" />
              </span>
                </td>
                

                <td>
                  <router-link
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    :to="`/order/update-order/${item.id}`"
                  >
                    <span class="svg-icon svg-icon-3">
                      <inline-svg src="/media/icons/duotune/art/art005.svg" />
                    </span>
                  </router-link>

                  <a
                    @click="deleteOrderAction(item.id)"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                  >
                    <span class="svg-icon svg-icon-danger">
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
    <!--begin::Body-->
  </div>
  <div class="row my-4">
    <div class="col d-flex justify-content-end">

      <el-pagination v-model:current-page="pagination.pageNumber" @current-change="updatePagination"
        :page-size="pagination.pageSize" layout="prev, pager, next" :total="pagination.totalCount"
        :hide-on-single-page="true" background>
      </el-pagination>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";

import { defineProps, ref, defineEmits, computed } from "vue";
import { Pagination } from "@/types";
import { Mutations } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2";
import i18n from "@/core/plugins/i18n";

const store = useStore();

const items = computed( () => store.state.Order.OrderAction )


const pagination = computed(() => store.state.Order.pagination as Pagination);

let emit = defineEmits(["delete-order-action", "update-pagination"]);

function deleteOrderAction(id) {
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

    for (let i = 0; i < items.value.length; i++) {
      if (items.value[i].id === id) {
        items.value.splice(i, 1);
      }
    }

  });
}

function updatePagination(event) {
  store.commit(Mutations.UPDATE_CURRENT_PAGE_MODIFIER, event);
  
  emit("update-pagination", event);
}
</script>

<style scoped></style>
