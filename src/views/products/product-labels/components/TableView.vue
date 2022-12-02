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
              <th class="min-w-150px">{{ $t('name') }}</th>
              <th class="min-w-140px">{{ $t('code') }}</th>
              <th class="min-w-120px">{{ $t('order') }}</th>
              <th class="min-w-100px">{{ $t('connectedProductsCount') }}</th>
              <th class="min-w-100px">{{ $t('connectedShopsCount') }}</th>
              <th class="min-w-100px">{{ $t('actions') }}</th>
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
                  <span class="fw-bold d-block fs-7">{{ item.code }}</span>
                </td>

                <td>
                  <div class="d-flex flex-column w-100 me-2">
                    <span class="me-2 fs-7 fw-bold">
                      {{ item.numberOfConnectedProducts }}
                    </span>
                  </div>
                </td>
                <td>
                  <div class="d-flex flex-column w-100 me-2">
                    <span class="me-2 fs-7 fw-bold">
                      {{ item.numberOfConnectedShops }}
                    </span>
                  </div>
                </td>
                <td>
                  <div class="d-flex flex-column w-100 me-2">
                    <span class="me-2 fs-7 fw-bold">
                      {{ item.order }}
                    </span>
                  </div>
                </td>

                <td>
                  <router-link class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    :to="`/products/labels/${item.id}`">
                    <span class="svg-icon svg-icon-3">
                      <inline-svg src="/media/icons/duotune/art/art005.svg" />
                    </span>
                  </router-link>

                  <a @click="deleteLabel(item.id)" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
                    <span class="svg-icon svg-icon-3">
                      <inline-svg src="/media/icons/duotune/general/gen027.svg" />
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
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import { ref, defineEmits, computed } from "vue";
import { Pagination } from "@/types";
import { Mutations } from "@/store/enums/StoreEnums";
const store = useStore();
const pagination = computed(() => store.state.ProductLabels.pagination as Pagination);
let emit = defineEmits(["delete-product-label", "update-pagination"]);

function deleteLabel(id) {
  emit("delete-product-label", id);
}
function updatePagination(event) {
  store.commit(Mutations.UPDATE_CURRENT_PAGE, event);
  emit("update-pagination", event);
}


const items = computed(() => store.state.ProductLabels.ProductLabels);

const tableHeader = ref([
  {
    name: "Name",
    key: "name",
    sortingField: "name",
    sortable: true,
  },
  {
    name: "Code",
    key: "code",
    sortable: false,
  },
  {
    name: "Order",
    key: "order",
    sortable: true,
  },
  {
    name: "Connected Shops Count",
    key: "numberOfConnectedShops",
    sortable: false,
  },
  {
    name: "Connected Products Count",
    key: "numberOfConnectedProducts",
    sortable: false,
  },
  {
    name: "Actions",
    key: "actions",
    sortable: false,
  },
]);
</script>

<style scoped>
</style>
