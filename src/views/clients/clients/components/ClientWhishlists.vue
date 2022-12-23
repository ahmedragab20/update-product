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
        <template v-slot:cell-deviceId="{ row: payment }">
          {{ payment.deviceId }}
        </template>
       
        <template v-slot:cell-shopName="{ row: payment }">
          {{ payment.shopName }}
         
                 
        </template>
        
        <template v-slot:cell-productCount="{ row: payment }" width="20px">
          {{ payment.productCount }}
         
                 
        </template>
 
      
        <template v-slot:cell-actions="{ row: payment }">
          <a
            href="#"
            class="btn btn-sm btn-light btn-active-light-primary"
            type="button"
            @click="getProduct( payment.id )"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_widhlist_product"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
            >
            <span class="svg-icon svg-icon-5 m-0">
              <inline-svg src="/media/icons/duotune/art/art011.svg" />
            </span>
          </a>
          <!--begin::Menu-->
       
          <!--end::Menu-->
        </template>
      </Datatable>
    </div>
    <!--end::Card body-->
    <WhishlistsProduct ref="child"></WhishlistsProduct>
  </div>
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
  import { defineComponent, ref,computed,defineProps } from "vue";
  import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import { useStore } from "vuex";
import { Actions,Mutations } from "@/store/enums/StoreEnums";
import WhishlistsProduct from "./WhishlistsProduct.vue"
import { Children } from "preact/compat";
export default defineComponent({
    name: "client-address",
    props: {
       
  id:String
    },
    components: {
      Datatable,
      WhishlistsProduct
    },
    setup(props) {

    const store = useStore();
    const tableData =
        computed(() => store.state.Clients.ClientWhishlists);
    

  
    const fetchData = () => {
        console.log("props",props)
   
    store.dispatch(Actions.GET_CLIENT_WHISHLISTS,props).then(res=>{
    data.value=true
  console.log("addd",res)

  })
};

const child=ref()
const getProduct=(id)=>{
child.value.fetchData(id)
}
const data=ref(false)
      const tableHeader = ref([
        {
          name: "device Id",
          key: "deviceId",
          sortable: true,
        },
        {
          name: "detailed Address",
          key: "shopName",
        
          sortable: true,
        },
        {
          name: "product Count",
          key: "productCount",
        
          sortable: true,
        },
        
        
        
        {
          name: "Actions",
          key: "actions",
          sortable: false,
        },
      ]);
      
  return { tableHeader, tableData, data,fetchData,child,getProduct };
    },
  });
      

   

    
</script>
<style>

.card-toolbar {
    margin: 12px;
}
</style>
