<template>
  <!--begin::Card-->
  <div>
 
  <div class="card pt-4 ">
    <!--begin::Card header-->

         

    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="card-body pt-0 pb-5">
      <Datatable
      v-if="data"
    
        :table-header="tableHeader"
        :table-data="tableData"
        :rows-per-page="5"
        :enable-items-per-page-dropdown="false"
      >
        <template v-slot:cell-areaName="{ row: payment }">
          {{ payment.areaName }}
        </template>
       
        <template v-slot:cell-detailedAddress="{ row: payment }">
          {{ payment.detailedAddress }}
         
                         <span class="badge badge-light-primary" v-if="payment.isSelected ">
default</span>
                    
        </template>
 
      
        <template v-slot:cell-actions="{ row: payment }">
          <a
            href="#"
            class="btn btn-sm btn-light btn-active-light-primary"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
            >Actions
            <span class="svg-icon svg-icon-5 m-0">
              <inline-svg src="/media/icons/duotune/arrows/arr072.svg" />
            </span>
          </a>
          <!--begin::Menu-->
       
          <!--end::Menu-->
        </template>
      </Datatable>
    </div>
    <!--end::Card body-->
  </div>
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
  import { defineComponent, ref,computed,defineProps } from "vue";
  import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import { useStore } from "vuex";
import { Actions,Mutations } from "@/store/enums/StoreEnums";
export default defineComponent({
    name: "client-address",
    props: {
       
  id:String
    },
    components: {
      Datatable,
    },
    setup(props) {

    const store = useStore();
    const tableData =
        computed(() => store.state.Clients.ClientAddress);
    

  
    const fetchData = () => {
        console.log("props",props)
   
    store.dispatch(Actions.GET_CLIENT_ADDRESS,props).then(res=>{
    data.value=true
  console.log("addd",res)

  })
};
fetchData()

const options=ref([{
  id:1,label:"Jet Order"
},
{id:2,label:"Shop Links"}
])
const data=ref(false)
      const tableHeader = ref([
        {
          name: "area Name.",
          key: "areaName",
          sortable: true,
        },
        {
          name: "detailed Address",
          key: "detailedAddress",
        
          sortable: true,
        },
        
        
        {
          name: "Actions",
          key: "actions",
          sortable: false,
        },
      ]);
      
  return { tableHeader, tableData, data,fetchData,options };
    },
  });
      

   

    
</script>
<style>

.card-toolbar {
    margin: 12px;
}
</style>
