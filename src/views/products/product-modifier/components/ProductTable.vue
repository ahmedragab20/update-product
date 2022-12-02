<template>
  <div class="card">
    <div class="card-body">
      <el-table :data="connectedProductsResult" style="width: 100%">
       <el-table-column prop="thumbnail" label="Img">
          <template #default="scope">
            <div>  <img :src=" scope.row.thumbnail" class="img-option"
                  height="30"></div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="Name" width="200">
          <template #default="scope">
            <div>{{ scope.row.name }}</div>
          </template>
        </el-table-column>

      
     
        <el-table-column prop="action" label="Action">
          <template #default="scope">
            <a
              @click="deleteProductFromModifier(scope.row.id)"
              class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
            >
              <span class="svg-icon svg-icon-danger">
                <inline-svg src="/media/icons/duotune/general/gen027.svg" />
              </span>
            </a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    {{localPagination}}
     <div class="card-footer d-flex justify-content-center">
                <el-pagination
                v-model:current-page="pagination.pageNumber"
                @current-change="getConnectedProducts"
                :page-size="pagination.pageSize"
                layout="prev, pager, next"
                :total="pagination.totalCount"
                :hide-on-single-page="true"
                background>
                </el-pagination>
              </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";

import { defineProps, ref, reactive, computed,defineEmits } from "vue";
import { Pagination } from "@/interfaces/pagination";

import { Mutations, Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2";
import i18n from '@/core/plugins/i18n'
const store = useStore();
const localPagination = reactive({ pageNumber: 1, pageSize: 5 });
const emit = defineEmits(["getConnectedProducts"]);
const pagination = computed(() => store.state.ProductModifiers.pagination as Pagination);
const connectedProducts = computed(() => store.state.ProductModifiers.connectedProducts);

function deleteProductFromModifier(id) {
  let payload = {
    id: props.id,
    connectedProducts: [id],
  };
  
  Swal.fire({
    title: i18n.global.t("alertText"),
    text: i18n.global.t("deleteProductModifierAlertText"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText:  i18n.global.t("cancel"),
    confirmButtonText:  i18n.global.t("yesSure"),
  }).then((status) => {
    if (status.isConfirmed) console.log("ppayloads", payload);

    store.dispatch(Actions.REMOVE_PRODUCTS_FOMR_MODIFIER, payload);
    for (let i = 0; i < props?.itemsConnectedProduct?.value.length; i++) {
      if (props?.itemsConnectedProduct?.value[i].id === id) {
        props?.itemsConnectedProduct?.value.splice(i, 1);
      }
    }
  });
  
}
const getConnectedProducts=()=>{
  emit('getConnectedProducts')
}
let props = defineProps({
  id: {
    type: Number,
  },
  itemsConnectedProduct:{
    type:Array
  }
});
const connectedProductsResult = computed(() =>
  props?.itemsConnectedProduct?.slice(
      (localPagination.pageNumber - 1) * localPagination.pageSize,
      localPagination.pageSize * localPagination.pageNumber
    )
    .filter(
      (p) =>
        p.name.toLowerCase().indexOf(keyword.value.toLocaleLowerCase()) != -1 ||
        !keyword.value
    )
)


function eventFire(event) {
  store.commit(Mutations.UPDATE_CURRENT_PAGE, event);
  console.log(pagination);
  emit("update-pagination", event);
}



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

<style scoped>
img.img-option {
    margin-left: 15px;
    margin-right: 12px;
    width: 37px;
}</style>
