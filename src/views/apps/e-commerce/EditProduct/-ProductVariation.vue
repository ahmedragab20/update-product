<template>
  <div class="card-header py-0 border-0">
    <div class="card-title">
      <h2>Product Variations</h2>
    </div>
  </div>
  <div v-if="options && options.length > 0" class="card-body py-0">
    <div class="my-3 table-responsive">
      <table class="table table-row-dashed table-row-gray-300 gy-7 w-100">
        <thead>
          <tr class="fw-bolder fs-5 text-gray-800">
            <th style="max-width: 160px">Name</th>
            <th>Type Id</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(option, $index) in options"
            :key="$index"
            class="product-details-box rounded-3"
            @click.prevent="updateRowIndex($index), (dialogShown = true)"
          >
            <td>
              <div v-html="getOptionName(option)" />
            </td>
            <td>
              <div>
                <div
                  v-if="returnTheRightType(option)"
                  v-text="returnTheRightType(option).id"
                />
                <div v-else v-text="`no data yet🙎🏻‍♂️`" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-for="(option, $index) in options" :key="$index">
      <el-dialog
        v-if="clickedRowIndex === $index"
        v-model="dialogShown"
        title="Product Variation"
        top="3vh"
        :width="dialogWidth"
      >
        <template #default>
          <div class="p-3 overflow-auto" style="height: 61.5vh">
            <ProductVariationsModalType
              :type="
                returnTheRightType(option) || generateEmptyTypeObject(option)
              "
              :dialog-width="dialogWidth"
              @modalData="updateProductVariationModalData"
              @isFormValid="isFormDataHandler"
            />
          </div>
        </template>
        <template #footer>
          <div class="my-3 text-start">
            <small
              v-if="updateProductVariationRequestMSG.success"
              class="fw-bold text-success"
            >
              {{ updateProductVariationRequestMSG.success }}
            </small>
            <small
              v-else-if="updateProductVariationRequestMSG.error"
              class="fw-bold text-danger"
            >
              {{ updateProductVariationRequestMSG.error }}
            </small>
          </div>
          <div class="dialog-footer d-flex gap-3">
            <button
              @click="dialogShown = false"
              type="button"
              class="btn btn-light"
            >
              cancel
            </button>
            <button
              v-if="!isUpdateProductVariationLoading"
              @click="updateProductVariation"
              type="button"
              class="btn btn-primary"
              :disabled="!isTypeFormValid"
            >
              Save
            </button>
            <button
              v-else
              class="btn btn-primary"
              data-kt-indicator="on"
              type="button"
              disabled
            >
              <span class="indicator-label"> Saving </span>
              <span class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
  <div v-else class="card-body py-0 fw-bold text-muted">
    !! No product variations found yet.
  </div>
</template>

<script lang="ts" setup>
import Api from "@/utils/ApiHelper";
import ProductVariationsModalType from "./-ProductVariationsModalType.vue";
import { isTheTwoArraysMatch, screenDimensions } from "@/utils/helpers";
import { ref } from "@vue/reactivity";
import { computed, onMounted, watch } from "vue";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  variationTypes: {
    type: Array,
    required: true,
  },
  fetchVariations: {
    type: Function,
    required: true,
  },
});

const screenWidth = computed(() => screenDimensions().availWidth);
const dialogWidth = computed(() => {
  if (screenWidth.value > 1025) {
    return "40%";
  } else if (screenWidth.value < 1025 && screenWidth.value > 769) {
    return "50%";
  } else if (screenWidth.value < 769 && screenWidth.value >= 550) {
    return "75%";
  } else {
    return "95%";
  }
});

const dialogShown = ref(false);
const clickedRowIndex = ref();
const typesSet = new Set();
const types = ref<any[]>([]);

const updateRowIndex = (index: number): void => {
  clickedRowIndex.value = index;
};

const getOptionName = (option: any) => {
  // check if the option contains multiple option or just one
  if (option.variationProductName) {
    const text = ref();

    option.variationProductName.forEach((element, index, array) => {
      if (index === 0) {
        text.value = element[0].label;
      } else {
        text.value += `<i class="bi bi-dot mx-1"></i> ${element[0].label}`;
      }
    });
    return `<p>${text.value}</p>`;
  } else {
    return `<p>${option.resources["0"].label}</p>`;
  }
};

const getTypeRelatedToOptions = (option: any) => {
  const optionConnectionIds: any[] = option.optionIds || [option.connectionId];

  const type = props.variationTypes?.find((type: any) =>
    /**
     * check if the couple of the arrays are matched🌸
     * @param {array}
     * @param {target}
     */
    isTheTwoArraysMatch(optionConnectionIds, type["connectionIds"])
  );

  if (type) {
    // used Set to make sure that I won't get any duplicates
    typesSet.add(type);
  }
};

const returnTheRightType = (option: any) => {
  return props.variationTypes?.find((type: any) =>
    isTheTwoArraysMatch(
      option.optionIds || [option.connectionId],
      type["connectionIds"]
    )
  );
};
const generateEmptyTypeObject = (optionIds) => {
  return {
    code: null,
    weightInKG: 0,
    widthInCM: 0,
    heightInCM: 0,
    lengthInCM: 0,
    prices: [],
    discounts: [],
    barcodes: [],
    skUs: [],
    connectionIds: optionIds,
    productShops: [],
  };
};
const productVariationModalData = ref();
const isUpdateProductVariationLoading = ref(false);
const updateProductVariationRequestMSG = ref({
  error: "",
  success: "",
});
const isTypeFormValid = ref(false);
const isFormDataHandler = (payload: boolean) => {
  isTypeFormValid.value = payload;
};
const updateProductVariationModalData = (payload) => {
  productVariationModalData.value = payload;
};

watch(
  () => dialogShown.value,
  (newValue) => {
    if (newValue) {
      updateProductVariationRequestMSG.value.error = "";
      updateProductVariationRequestMSG.value.success = "";
    }
  }
);

const updateProductVariation = () => {
  isUpdateProductVariationLoading.value = true;
  const reqData = {
    method: "post",
    url: "/ProductCommands/update-product-variations",
    payload: productVariationModalData.value,
  };

  Api(reqData)
    .then((response: any) => {
      console.log(response);
      if (!!response.data?.data) {
        updateProductVariationRequestMSG.value.success = `we're done🙌🥰`;
        updateProductVariationRequestMSG.value.error = "";
      } else {
        updateProductVariationRequestMSG.value.success = "";
        updateProductVariationRequestMSG.value.error = `😓 ${response.data?.message}`;
      }
      isTypeFormValid.value = false;
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      isUpdateProductVariationLoading.value = false;
      props.fetchVariations();
    });
};

onMounted(() => {
  if (props.options) {
    props.options.forEach((option) => {
      getTypeRelatedToOptions(option);
    });
    types.value = Array.from(typesSet);
  }
});
watch(
  () => props.options,
  (newVal, oldVal) => {
    if (newVal || oldVal) {
      props.options.forEach((option) => {
        getTypeRelatedToOptions(option);
      });
      types.value = Array.from(typesSet);
    }
  }
);
</script>

<style lang="scss" scoped>
.product-details-box {
  &:hover {
    background-color: rgba(238, 238, 238, 0.7);
  }

  cursor: pointer;
}

td div {
  display: flex;
  align-items: center;
}
</style>
