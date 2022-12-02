<template>
  <div class="card card-flush py-4">
    <div class="card-header border-0">
      <div class="card-title">
        <h2>TAX</h2>
      </div>
    </div>
    <div class="d-flex flex-wrap gap-5 card-flush card-header">
      <div class="row w-100">
        <!--begin:: tax class-->
        <div class="col-sm-6">
          <!--begin::Label-->
          <label class="required form-label">Tax Class</label>
          <!--end::Label-->
          <!--begin::Select2-->
          <Dropdown
            @selectedItem="taxClassSelectedItemHandler"
            :items="taxClassItems"
            headClasses="fw-bold p-3 rounded-3 shadow-sm text-capitalize btn-lg mb-2"
            bodyClasses="px-sm-5 py-sm-3 px-3 py-1 w-100 text-truncate text-capitalize"
          >
            <template #headerContent="{ item }">
              <div class="d-flex justify-content-between align-items-center">
                <span
                  v-text="
                    taxClassSelectedOption && taxClassSelectedOption.value
                      ? taxClassSelectedOption.value
                      : 'Select option'
                  "
                />
                <strong>
                  <i
                    :class="item.isOpened ? 'bi-arrow-up' : 'bi-arrow-down'"
                  ></i>
                </strong>
              </div>
            </template>
            <template #bodyContent="{ item }">
              <span>
                {{ item.value }}
              </span>
            </template>
          </Dropdown>
          <!--end::Select2-->
          <!--begin::Description-->
          <div class="text-muted fs-7">Set the product tax class.</div>
          <!--end::Description-->
          <div class="fv-plugins-message-container invalid-feedback"></div>
        </div>
        <div v-if="isTaxAmount" class="col-sm-6">
          <!--begin::Label-->
          <label class="form-label" for="#exampleFormControlInput1">
            Tax Amount (%)
          </label>
          <!--end::Label-->
          <!--begin::Select2-->
          <input
            v-model="taxAmount"
            type="number"
            id="exampleFormControlInput1"
            class="form-control form-control-solid"
            max="100"
            min="0"
            @input="taxStatus = true"
          />
          <!--end::Select2-->
          <!--begin::Description-->
          <div class="text-muted fs-7">Set the product tax amount.</div>
          <!--end::Description-->
          <div class="fv-plugins-message-container invalid-feedback"></div>
        </div>
        <!--end:: tax class-->
      </div>
      <div class="w-100">
        <SaveChangeBtn
          :btnReverseSubmit="reverseTaxChange"
          :btnSubmit="saveTax"
          :elChanged="taxStatus"
          :elLoading="isTaxStatusLoading"
          :fullWidth="true"
          :no-cancel="true"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Api from "@/utils/ApiHelper";
import Dropdown from "@/components/Reusable/Dropdown.vue";
import SaveChangeBtn from "./-SaveChangeBtn.vue";
import { onMounted, reactive, ref } from "vue";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

const props = defineProps(["product"]);

const store = useStore();

/* Tax class logic */
const taxClassItems = computed(
  (): any[] => store.state.LookupQueries.productTaxClasses
);

const taxClassSelectedOption = ref();

const taxClassSelectedItemHandler = (
  selectedItem: object,
  isGlobal?: boolean
) => {
  taxClassSelectedOption.value = selectedItem;
  if (!isGlobal) {
    taxStatus.value = true;
  }
};
/* tax amount logic */
const isTaxAmount = computed(
  (): boolean => taxClassSelectedOption.value?.code.toLowerCase() === "custom"
);
const taxAmount = ref<any>();

const taxStatus = ref<boolean | string>(false);
const isTaxStatusLoading = ref(false);

const saveTax = async () => {
  try {
    isTaxStatusLoading.value = true;
    const payload = {
      id: props.product.id,
      taxClassId: taxClassSelectedOption.value.id,
      taxAmountPercentage: isTaxAmount ? taxAmount.value : 0,
    };

    const reqData = {
      method: "post",
      url: "/ProductCommands/update-product-tax",
      payload,
    };

    const { data } = await Api(reqData);

    console.log({ data });

    if (data?.succeeded) taxStatus.value = "done";
  } catch (error) {
    console.error(error);
  } finally {
    isTaxStatusLoading.value = false;
  }
};
const reverseTaxChange = () => {
  taxAmount.value = "";
  taxStatus.value = false;
};

onMounted(() => {
  if (props.product?.taxClassId && taxClassItems.value?.length > 0) {
    const tax = taxClassItems.value.find(
      (item: any) => item.id === props.product.taxClassId
    );

    if (tax) {
      taxClassSelectedItemHandler(tax, true);
    }

    taxAmount.value = props.product?.taxAmounPercentage;
  }
});
</script>
