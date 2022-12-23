<template>
  <div class="card">
    <div class="card-header border-0 ">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <span class="svg-icon svg-icon-1 position-absolute ms-6">
            <inline-svg src="/media/icons/duotune/general/gen021.svg" />
          </span>
          <input
            type="text"
            v-model="search"
            @keyup="searchItem"
           
            class="form-control form-control-solid w-250px ps-15"
            placeholder="Search Clients"
          />
        </div>
     
      </div>
      <!--begin::Card title-->
      <!--begin::Card toolbar-->
     
      <!--end::Card toolbar-->
    </div>
   
     </div>
      <div class="d-flex justify-content-between align-items-center w-100">
    <h2>Clients </h2>
    <!--begin::Filter-->
    <div class="d-flex align-items-center justify-content-end my-3">
      <ul class="nav nav-pills me-6 mb-2 mb-sm-0">
      <li>
      
    
      </li>
        <li style="width:100px">
          <el-select
            @change="setItemsPerPage"
            v-model="pagination.pageSize"
            placeholder="Number Of Item"
            class="border-1 mx-4"
          >
            <el-option :value="6">6</el-option>
            <el-option :value="15">15</el-option>
            <el-option :value="30">30</el-option>
            <el-option :value="90">90</el-option>
          </el-select>
        </li>
        <li class="nav-item m-0">
          <a
            @click="setActiveView(views.TABLE_VIEW)"
            :class="{ active: activeView === views.TABLE_VIEW }"
            class="btn btn-sm btn-icon btn-light btn-color-muted btn-active-primary"
          >
            <!--begin::Svg Icon | path: icons/duotune/abstract/abs015.svg-->
            <span class="svg-icon svg-icon-2">
              <inline-svg src="/media/icons/duotune/abstract/abs015.svg"></inline-svg>
            </span>
            <!--end::Svg Icon-->
          </a>
        </li>
        <li class="nav-item mx-3">
          <a
            @click="setActiveView(views.GRID_VIEW)"
            class="btn btn-sm btn-icon btn-light btn-color-muted btn-active-primary me-3"
            :class="{ active: activeView === views.GRID_VIEW }"
          >
            <!--begin::Svg Icon | path: icons/duotune/general/gen024.svg-->
            <inline-svg src="/media/icons/duotune/general/gen024.svg"></inline-svg>
            <!--end::Svg Icon-->
          </a>
        </li>
      </ul>
      
    </div>
  </div>
  
      <component
        @update-pagination="fetchData"
        :items="Clients"
        :is="activeComponent"
        
        :pagination="pagination"
        @delete-client-group="deleteGroup"
        @updateClientGroup="updateClientGroup"
      />
    

</template>

<script  lang="ts">
import { computed, ref, defineComponent } from "vue";


import UpdateClientGroupModal from "../components/UpdateClientGroupModal.vue";

import TableView from "../components/TableView.vue";

import GridView from "../components/GridView.vue";
import { useStore } from "vuex";
import { Actions,Mutations } from "@/store/enums/StoreEnums";
import { Pagination } from "@/interfaces/pagination";
import { showModal } from "@/core/helpers/dom";
export default defineComponent({
  name: "client-group-list",
  components: {

    UpdateClientGroupModal,
    TableView,

    GridView,
  },

   setup(props) {
  //              
  const filter=ref('')
const store = useStore();
const pagination = computed(
  () => store.state.Clients.pagination as Pagination
);
const clientCondition = computed(() => store.getters.getclientsCondition);
const search = ref("");
let Clients = computed(() => store.state.Clients.Clients);
let all=ref(Clients)

const fetchData = () => {
  console.log("pagination.value.pageNumber",pagination.value.pageNumber)
  store.dispatch(Actions.GET_CLIENTS, {
    query: search.value,
    pageSize: pagination.value.pageSize,
    pageNumber: pagination.value.pageNumber,
  });
};
fetchData()

enum views {
  TABLE_VIEW = 1,
  GRID_VIEW = 2,
}
const update = ref();
const updateClientGroupModalRef = ref<null | HTMLElement>(null);
const deleteGroup=(id)=>{
    store.dispatch(Actions.DELETE_CLIENT_GROUP, id);
}
showModal(updateClientGroupModalRef.value);
const activeView = ref(views.GRID_VIEW );
const updateClientGroup = (id: any): void => {
  console.log("here");
  // showModal(updateClientGroupModalRef.value);
 console.log("Clients",Clients)
  update.value.fetchData(id);
};


// const pagination = computed(() => store.state.ProductModifiers.pagination as Pagination);
const activeComponent = computed(() => {
  return activeView.value == views.TABLE_VIEW ? TableView : GridView;
});

const setActiveView = (val: views) => {
  console.log("activeView",activeView)
    console.log("val",val)
  activeView.value = val;
    console.log("activeView",activeView)
};
const setItemsPerPage = (e) => {
  store.commit(Mutations.UPDATE_PAGINATION_CLIENT, {
    ...pagination.value,
    pageSize: e,
  });
 
};
// fetchData();
const filterMember=(evt)=>{
  console.log("evt",evt)
  if(evt<1){
 console.log("nooo",evt)
 fetchData()
  }
  else{
 store.commit(Mutations.FILTER_GROUP,evt)
  }
 
        }   
        const searchItem=()=>{
          console.log(search)
  store.commit(Mutations.SEARCH_GROUP,search)
        }  

 return {
      updateClientGroupModalRef,
      views,
      showModal,
      setActiveView,
      activeView,
      clientCondition,
      filter,
      activeComponent,
      updateClientGroup,
      Clients,
      pagination,
      update,
      search,
      fetchData,
      setItemsPerPage,
      filterMember,
      searchItem,
      deleteGroup


     
    };
  },
});
</script>
