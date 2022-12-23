<template>
  <!--begin::Modal - New Address-->
  <div
    class="modal fade"
    ref="newAddressModalRef"
    id="kt_modal_widhlist_product"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Form-->
        <div class="card pt-4">
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
           
<template v-slot:cell-productName="{ row: payment }">
                {{ payment.productName }}
              </template>
              <template v-slot:cell-productThumbnail="{ row: payment }">
                <img
                  :src="payment.productThumbnail"
                  style="object-fit: cover; height: 35px; width: 35px"
                  class="rounded"
                  alt=""
                />
              </template>
   <template v-slot:cell-produtcId="{ row: payment }">
                {{ payment.produtcId }}
              </template>
              
            </Datatable>
          </div>
          <!--end::Card body-->
        </div>
        <!--end::Form-->
      </div>
    </div>
  </div>
  <!--end::Modal - New Address-->
</template>

<script lang="ts">
import { defineComponent, ref, computed, defineProps } from "vue";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import { useStore } from "vuex";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { hideModal } from "@/core/helpers/dom";

export default defineComponent({
  name: "client-wishlist-product",

  components: {
    Datatable,
  },
  setup(props) {
    const store = useStore();
    const tableData = computed(
      () => store.state.Clients.ClientWhishlistsProducts
    );

    const fetchData = (id) => {
      console.log("id", id);

      store.dispatch(Actions.GET_CLIENT_WHISHLISTS_PRODUCTS, id).then((res) => {
        data.value = true;
        console.log("addd", res);
      });
    };

    const data = ref(false);
    const tableHeader = ref([
      {
        name: "Id",
        key: "produtcId",
        sortable: true,
      },
       {
        name: "Name",
        key: "productName",

        sortable: true,
      },
      {
        name: "Thumbnail",
        key: "productThumbnail",

        sortable: true,
      },
     
    ]);

    return { tableHeader, tableData, data, fetchData };
  },
});
</script>
