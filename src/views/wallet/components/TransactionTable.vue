<template>
  <div class="card">
    <div class="card-header card-header-stretch border-bottom border-gray-200">
      <!--begin::Title-->
      <div class="card-title">
        <h3 class="fw-bold m-0">Transaction Table</h3>
      </div>
      <!--end::Title-->
      <!--begin::Toolbar-->
      <div class="card-toolbar m-0">
        <ul
          class="nav nav-stretch nav-line-tabs border-transparent mt-2"
          role="tablist"
        >
          <!--begin::Pagination-->
          <li class="nav-item">
            <el-select
              @change="setItemsPerPage"
              v-model="pagination.pageSize"
              placeholder="Number Of Item"
            >
              <el-option value="6">6</el-option>
              <el-option value="10">10</el-option>

              <el-option value="50">50</el-option>
              <el-option value="100">100</el-option>
            </el-select>
          </li>

          <!--end::Pagination -->
        </ul>
      </div>
      <!--end::Toolbar-->
    </div>
    <div class="card-body">
      <!--begin::Body-->

      <!--begin::Table container-->
      <div class="table-responsive">
        <!--begin::Table-->
        <table class="table table-row-bordered align-middle gy-4 gs-9">
          <!--begin::Table head-->
          <thead
            class="border-bottom border-gray-200 fs-6 text-gray-600 fw-bold bg-light bg-opacity-75"
          >
            <tr>
              <th class="min-w-140px">{{ $t("referenceNumber") }}</th>
              <th class="min-w-120px">{{ $t("sourceWallet") }}</th>
              <th class="min-w-100px">{{ $t("destinationWallet") }}</th>
              <th class="min-w-100px">{{ $t("transactionType") }}</th>
              <th class="min-w-100px">{{ $t("status") }}</th>
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
                      {{ item.referenceNumber }}
                    </span>
                  </div>
                </td>

                <td>
                  <span class="fw-bold d-block fs-7">{{
                    item.sourceWallet
                  }}</span>
                </td>

                <td>
                  <div class="d-flex flex-column w-100 me-2">
                    <span class="me-2 fs-7 fw-bold">
                      {{ item.destinationWallet }}
                    </span>
                  </div>
                </td>
                <td>
                  <div class="d-flex flex-column w-100 me-2">
                    <span class="me-2 fs-7 fw-bold">
                      {{ item.transactionType }}
                    </span>
                  </div>
                </td>
                <td>
                  <div class="d-flex flex-column w-100 me-2">
                    <a href="#" class="text-gray-600 text-hover-primary mb-1">
                      <div
                        :class="`badge badge-light-primary`"
                        v-if="item.status == 'Succeeded'"
                      >
                        {{ item.status }}
                      </div>
                      <div :class="`badge badge-light-danger`" v-else>
                        {{ item.status }}
                      </div>
                    </a>
                  </div>
                </td>

                <td></td>
              </tr>
            </template>
          </tbody>
          <!--end::Table body-->
        </table>
        <!--end::Table-->
      </div>
      <!--end::Table container-->
      <div class="row my-4">
        <div class="col d-flex justify-content-end">
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
    </div>
    <!--begin::Body-->
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";

import { ref, computed, defineProps } from "vue";
import { Pagination } from "@/types";
import { Mutations, Actions } from "@/store/enums/StoreEnums";
const store = useStore();
const pagination = computed(
  () => store.state.WalletModule.pagination as Pagination
);

const props = defineProps({
  id: String,
});

function updatePagination(event) {
  store.commit(Mutations.UPDATE_CURRENT_PAGE_TRANSACTION_TABLE, event);
  getData(props.id);
}
const setItemsPerPage = (event) => {
  pagination.value.pageSize = parseInt(event);

  getData(props.id);
};

const items = computed(() => store.state.WalletModule.WalletTransactionTable);
const getData = (id: any) => {
  store
    .dispatch(Actions.GET_WALLET_TRANSACTIONS_BY_ID, {
      id,

      pageSize: pagination.value.pageSize,
      pageNumber: pagination.value.pageNumber,
    })
    .then((data) => {
      console.log("Da", data);
    });
};
getData(props.id);
</script>

<style scoped></style>
