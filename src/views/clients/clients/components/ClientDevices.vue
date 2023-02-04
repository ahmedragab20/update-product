<template>
  <!--begin::Card-->
  <div v-if="tableData">
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
          <template v-slot:cell-deviceId="{ row: payment }">
            {{ payment.deviceId }}
          </template>

          <template v-slot:cell-type="{ row: payment }">
            {{ payment.type }}
          </template>

          <template v-slot:cell-brand="{ row: payment }" width="20px">
            {{ payment.brand }}
          </template>
          <template
            v-slot:cell-model="{ row: payment }"
            style="margin-right: 24px !important"
          >
            {{ payment.model }}
          </template>
        </Datatable>
      </div>
      <!--end::Card body-->
      <WhishlistsProduct ref="child"></WhishlistsProduct>
    </div>
  </div>
  <div v-else>
    <div class="text-center">
      <div class="spinner-border" role="status">
        <span>Loading...</span>
      </div>
    </div>
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import WhishlistsProduct from "./WhishlistsProduct.vue";

export default defineComponent({
  name: "client-devices",
  props: {
    id: String,
  },
  components: {
    Datatable,
  },
  setup(props) {
    const store = useStore();
    const tableData = computed(() => store.state.Clients.ClientDevices);

    const fetchData = () => {

      store.dispatch(Actions.GET_CLIENT_DEVICES, props).then((res) => {
        data.value = true;
      });
    };

    const data = ref(false);
    const tableHeader = ref([
      {
        name: "device Id",
        key: "deviceId",
        sortable: true,
      },
      {
        name: "type",
        key: "type",

        sortable: true,
      },
      {
        name: "brand",
        key: "brand",

        sortable: true,
      },
      {
        name: "model",
        key: "model",

        sortable: true,
      },
    ]);

    return { tableHeader, tableData, data, fetchData };
  },
});
</script>
<style>
.card-toolbar {
  margin: 12px;
}
th.model.sorting.text-end {
  text-align: start !important;
}
</style>
