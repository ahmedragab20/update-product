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
              <th class="name " style="">{{ $t("name") }}</th>
               <th class="name " style="">{{ $t("email") }}</th>
               
                 <th class="name " style="">{{ $t("phone") }}</th>
               
              <th class="name " >{{ $t("actions") }}</th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
         
            <template v-for="(item, index) in tableData" :key="index">
              <tr>
                <td>
                  <div
                    class="d-flex align-items-center"
     
                  >
                    <span class="item-name">
                      {{ item.name }}
                    </span>
                  </div>
                </td>
                  <td>
                  <div
                    class="d-flex align-items-center"
     
                  >
                    <span class="item-name">
                      {{ item.email }}
                        <span class="badge badge-light-primary" v-if="item.emailConfirmed"> 
                     <inline-svg  src="/media/svg/general/icons8-done.svg" /></span>
                     <span class="badge badge-light-danger" v-else>
                     
                        <inline-svg  src="/media/svg/general/icons8-cancel.svg" />
                     </span>
                    </span>
                  </div>
                </td>
                 
                 
                   <td>
                  <div
                    class="d-flex align-items-center"
     
                  >
                    <span class="item-name">
                      {{ item.phoneNumber }}
                       <span class="badge badge-light-primary" v-if="item.phoneNumberConfirmed">
                    
                    
                     <inline-svg  src="/media/svg/general/icons8-done.svg" />
                     </span>
                     <span class="badge badge-light-danger" v-else>
                      <inline-svg  src="/media/svg/general/icons8-cancel.svg" />
                   </span>
                    </span>
                  </div>
                </td>
              

                <td>
                 <router-link :to="`/clients/client-details/${item.id}`"  class="menu-link px-3 d-flex justify-content-between align-items-center">
                  
                  <span class="svg-icon svg-icon-3">
                         <inline-svg src="/media/icons/duotune/art/art011.svg" />
                  </span>
                  </router-link>

                 
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
import { defineComponent, ref, onMounted, computed } from "vue";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { ICustomer } from "@/core/data/customers";
import { useStore } from "vuex";
import { Pagination } from "@/types";
import Swal from "sweetalert2";

let emit = defineEmits(["updateClientGroup", "update-pagination","delete-client-group"]);


const pagination = computed(
  () => store.state.Clients.pagination as Pagination
);
console.log("pagination", pagination);
const store = useStore();
const tableData = computed(() => store.state.Clients.Clients);
const checkedCustomers = ref([]);

function updatePagination(event) {
  console.log("event", event);
  store.commit(Mutations.  UPDATE_CURRENT_PAGE_CLIENTS, event);
  emit("update-pagination", event);
}
const initCustomers = ref<Array<ICustomer>>([]);




const search = ref<string>("");



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
