<template>
  <div class="card">
    <div class="card-body">
      <el-table
        :data="filterTableData"
        style="width: 100%"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <el-table-column prop="thumbnail" :label="$t('image')" width="80">
          <template #default="scope">
            <div>
              <img :src="scope.row.thumbnail" class="img-option" height="30" />
            </div>
          </template>
        </el-table-column>
        <el-table-column>
          <template #header>
            <el-input
              v-model="search"
              size="big"
              prop="name"
              :label="$t('name')"
              :placeholder="$t('searchByName')"
            />
          </template>
          <template #default="scope">
            <div>{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('actions')" width="80">
          <template #default="scope">
            <a
              @click="deleteProductFromCategory(scope.row.id)"
              class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
            >
              <span class="svg-icon svg-icon-danger svg-icon-3">
                <inline-svg src="/media/icons/duotune/general/gen027.svg" />
              </span>
            </a>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 12px !important">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          @current-change="setPage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import { defineProps, ref, defineEmits, computed } from "vue";
import { Pagination } from "@/interfaces/pagination";

import { Mutations, Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2";

const emit = defineEmits(["deleteProduct"]);
const store = useStore();
const perPage = ref(3);
const currentPage = ref(1);
const rows = ref(12);
let props = defineProps({
  id: {
    type: Number,
  },
  itemsConnectedProduct: {
    type: Array,
  },
});
// const Paginatio={
//  pageSize:5,
//     pageNumber:1,
//     total:12

// }
const search = ref("");
const pagination = computed(() => store.state.ProductCategories.pagination);
const setPage = (val) => {
  console.log(store.state.ProductCategories.products.length);

  store.commit(Mutations.UPDATE_PAGINATION, val);
  store.dispatch(Actions.GET_CATEGORY_PRODUCTS, props.id);
};

const total = computed(() => store.state.ProductCategories.products.length);
console.log("total", total);

function deleteProductFromCategory(id) {
  emit("deleteProduct", id);
}

const filterTableData = computed(() =>
  props?.itemsConnectedProduct?.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const tableHeader = ref([
  {
    key: "checkbox",
    sortable: false,
  },
  {
    name: "Name",
    key: "name",
    sortable: true,
  },
  {
    name: "id",
    key: "id",
    sortable: true,
  },
  {
    name: "Actions",
    key: "actions",
  },
]);
</script>

<style scoped></style>
