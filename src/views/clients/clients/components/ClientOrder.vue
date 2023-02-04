<template>
  <!--begin::Card-->
  <div v-if="tableData">
    <div class="card pt-4">
      <!--begin::Card header-->
      <div class="card-toolbar">
        <!--begin::Filter-->

        <el-select
          @change="fetchData(DataFrom)"
          v-model="DataFrom"
          class="btn btn-sm btn-flex btn-light"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <!--end::Filter-->
      </div>

      <!--end::Card header-->

      <!--begin::Card body-->
      <div class="card-body pt-0 pb-5">
        <Datatable
          v-if="data"
          :table-header="tableHeader"
          :table-data="tableData()"
          :rows-per-page="5"
          :enable-items-per-page-dropdown="false"
        >
          <template v-slot:cell-clientAddress="{ row: payment }">
            {{ payment.clientAddress }}
          </template>
          <template v-slot:cell-status="{ row: payment }">
            <span :class="`badge badge-light-primary`">{{
              payment.status
            }}</span>
          </template>
          <template v-slot:cell-referenceNumber="{ row: payment }">
            <router-link :to="`/clients/`">
              {{ payment.referenceNumber }}
            </router-link>
          </template>
          <template v-slot:cell-amountAfterFees="{ row: payment }">
            {{ payment.amountAfterFees }}
          </template>
          <template v-slot:cell-actions="{ row: payment }">
            <router-link
              class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
              :to="`/orders/${payment.referenceNumber}`"
            >
              <span class="svg-icon svg-icon-3">
                <inline-svg src="/media/icons/duotune/art/art011.svg" />
              </span>
            </router-link>

            <!--end::Menu-->
          </template>
        </Datatable>
      </div>
      <!--end::Card body-->
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
import { defineComponent, ref, computed, defineProps } from "vue";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import { string } from "yup";
export default defineComponent({
  name: "client-order",
  props: {
    PhoneNumber: String,
    id: String,
  },
  components: {
    Datatable,
  },
  setup(props) {
    const store = useStore();
    const tableData = () => {
      return computed(() => store.state.Clients.ClientOrders);
    };

    const DataFrom = ref(1);
    const fetchData = (id) => {
      if (id == 1) {
        store
          .dispatch(Actions.GET_JETORDER_ORDERS, props.PhoneNumber)
          .then((res) => {
            data.value = true;
          });
      } else {
        store.dispatch(Actions.GET_SHOPLINKS_ORDERS, props).then((res) => {
          data.value = true;
        });
      }
    };

    const options = ref([
      {
        id: 1,
        label: "Jet Order",
      },
      { id: 2, label: "Shop Links" },
    ]);
    const data = ref(false);
    const tableHeader = ref([
      {
        name: "referenceNumber",
        key: "referenceNumber",
        sortable: true,
      },

      {
        name: "Status",
        key: "status",

        sortable: true,
      },

      // {
      //   name: "After Fees",
      //   key: "amountAfterFees",
      //   sortable: true,
      // },
      {
        name: "client Address.",
        key: "clientAddress",
        sortable: true,
      },
      {
        name: "Actions",
        key: "actions",
        sortable: false,
      },
    ]);

    return { tableHeader, tableData, data, fetchData, options, DataFrom };
  },
});
</script>
<style>
.card-toolbar {
  margin: 12px;
}
</style>
