<template>
  <div
    class="card card-flush py-4"
    :class="{'gradient-border' : updateProductState.changedSections.includes('tax')}"
  >
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
            @input="taxChanged = true"
          />
          <!--end::Select2-->
          <!--begin::Description-->
          <div class="text-muted fs-7">Set the product tax amount.</div>
          <!--end::Description-->
          <div class="fv-plugins-message-container invalid-feedback"></div>
        </div>
        <!--end:: tax class-->
      </div>
      <div>
        <small v-if="errorMessage" class="fw-bold badge badge-light-danger">
          😧 {{ errorMessage }}
        </small>
      </div>
      <div class="w-100">
        <SaveChangeBtn
          :btnReverseSubmit="reverseTaxChange"
          :btnSubmit="saveTax"
          :elChanged="taxChanged"
          :elLoading="isTaxStatusLoading"
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
import { onMounted, reactive, ref, watch } from "vue";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import { Product } from "@/types";

const props = defineProps(["product"]);

const store = useStore();

const updateProductState = computed(() => store.state.UpdateProduct);
const updateChangedSections = ({ sectionId, remove }) => {
  store.commit("ADD_CHANGED_SECTIONS", {
    sectionId,
    remove
  });
};

const initializeComponentsData = ({ name, content }) => {
  store.commit("INITIALIZE_DATA", {
    name,
    content
  });
};
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
    taxChanged.value = true;
  }
};
/* tax amount logic */
const isTaxAmount = computed(
  (): boolean => taxClassSelectedOption.value?.code.toLowerCase() === "custom"
);
const taxAmount = ref<any>();

const taxChanged = ref<boolean | string>(false);
const isTaxStatusLoading = ref(false);
const errorMessage = ref("");
const saveTax = async () => {
  try {
    isTaxStatusLoading.value = true;
    const payload = {
      id: props.product.id,
      taxClassId: taxClassSelectedOption.value.id,
      taxAmountPercentage: isTaxAmount ? taxAmount.value : 0
    };

    const reqData = {
      method: "post",
      url: "/ProductCommands/update-product-tax",
      payload
    };

    const { data } = await Api(reqData);

    if (data.succeeded) {
      taxChanged.value = "done";
      initializeComponentsData({
        name: "tax",
        content: {
          taxClassId: payload.taxClassId,
          taxAmount: payload.taxAmountPercentage
        }
      });
      errorMessage.value = "";
    } else {
      errorMessage.value = data?.message;
    }
  } catch (error) {
    console.error(error);
  } finally {
    isTaxStatusLoading.value = false;
  }
};
const reverseTaxChange = () => {
  const source = updateProductState.value.tax;
  initData(source);
  taxChanged.value = false;
  errorMessage.value = "";
};

const initData = (source: Product) => {
  const tax = taxClassItems.value.find(
    (item: any) => item.id === source.taxClassId
  );

  if (tax) {
    taxClassSelectedItemHandler(tax, true);
  }

  if (source.taxAmounPercentage) {
    taxAmount.value = source.taxAmounPercentage;
  }

  initializeComponentsData({
    name: "tax",
    content: {
      taxClassId: source.taxClassId,
      taxAmount: source.taxAmounPercentage
    }
  });
};

onMounted(() => {
  if (props.product?.taxClassId && taxClassItems.value?.length > 0) {
    initData(props.product);
  }
});

watch(() => props.product, newV => {
  if (taxClassItems.value?.length > 0) {
    initData(newV);
  }
});

watch(() => taxChanged.value, (newV, oldValue) => {
  if (newV && !oldValue || newV && oldValue === "done") {
    updateChangedSections({
      sectionId: "tax",
      remove: false
    });
  } else {
    updateChangedSections({
      sectionId: "tax",
      remove: true
    });
  }
});
</script>
