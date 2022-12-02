<template>
  <div v-if="variationsData" class="card card-flush py-4 mb-5">
    <VariationType @addNewVariationType="variationTypeOptionsReciever" />
  </div>

  <div class="card card-flush py-4">
    <ProductVariation
      :options="productVariations"
      :variation-types="variationsData.productVariations"
      :fetchVariations="fetchVariations"
    />
  </div>
  <Loader v-model:value="pageLoading" />
</template>

<script lang="ts" setup>
import VariationType from "./-VariationType.vue";
import ProductVariation from "./-ProductVariation.vue";
import { computed, onBeforeMount, reactive, ref } from "vue";
import { useStore } from "vuex";
import { uuid } from "vue-uuid";
import Api from "@/utils/ApiHelper";
import Loader from "@/components/Reusable/Loader.vue";
const store = useStore();

const product = computed(() => store.state.UpdateProduct.product);
const variationsData = computed(() => store.state.UpdateProduct.variationData);

let variationTypeOptions = reactive<any>([]);
let typeId = ref<any>(0);
let productVariations = ref<any[]>([]);
const variationTypes = ref<any>([]);
const actionType = ref<any>("");
const pageLoading = ref<boolean>(false);

const variationTypeOptionsReciever = ([first, second]: object[]) => {
  actionType.value = first;
  variationTypes.value = second;

  if (first === "add") {
    variationTypeOptions = [];

    second.forEach((option) => {
      typeId.value = option.id;

      if (option && option?.options) {
        variationTypeOptions.push(option.options);
      }
    });

    centerFunction();
  } else if (first === "defaults") {
    variationTypeOptions = [];
    productVariations.value = [];

    second.forEach((option) => {
      typeId.value = option.id;

      if (option?.options) {
        variationTypeOptions.push(option.options);
      }
    });

    centerFunction();
  } else {
    variationTypeOptions = [];
    productVariations.value = [];

    second.forEach((option) => {
      typeId.value = option.id;

      if (option?.options) {
        variationTypeOptions.push(option.options);
      }
    });

    centerFunction();
  }
};

const centerFunction = async () => {
  // loop through the variationTypeOptions arrays
  await addProductVariation();

  if (actionType.value !== "defaults") {
    await submitVariationType();
  }
};

const addProductVariation = (): void => {
  if (variationTypeOptions.length > 1) {
    productVariations.value = setupMergeTwoArrays(
      variationTypeOptions[0],
      variationTypeOptions[1]
    );

    for (let i = 2; i < variationTypeOptions.length; i++) {
      productVariations.value = mergeTwoArrays(
        productVariations.value,
        variationTypeOptions[i]
      );
    }
  } else if (variationTypeOptions.length === 1) {
    productVariations.value = variationTypeOptions[0];
  }
};

const setupMergeTwoArrays = (array1: [], array2: []) => {
  let result = [];

  array1.forEach((item1) => {
    array2.forEach((item2) => {
      result.push({
        optionIds: [item1.connectionId, item2.connectionId],
        variationProductName: [item1.resources, item2.resources],
      });
    });
  });

  return result;
};

const mergeTwoArrays = (array1: [], array2: []) => {
  let result = [];

  array1.forEach((item1) => {
    array2.forEach((item2) => {
      const optionIds = [...item1.optionIds, item2.connectionId];
      const variationProductName = [
        ...item1.variationProductName,
        item2.resources,
      ];

      result.push({
        optionIds,
        variationProductName,
      });
    });
  });

  return result;
};

const submitVariationType = async () => {
  pageLoading.value = true;
  const variationTypesPayload = variationTypes.value.map((el, index, array) => {
    if (el.id) {
      return { ...el };
    } else {
      return {
        id: null,
        ...el,
      };
    }
  });

  const data = {
    id: product.value.id,
    productVariationTypes: variationTypesPayload,
  };

  const reqData = {
    method: "post",
    url: "/ProductCommands/update-product-variation-types",
    payload: data,
  };

  await Api(reqData).finally(() => {
    pageLoading.value = false;
  });
};

const log = () => {
  console.log(
    "%cProduct Variation Final Array",
    "color: #80ccc0; font-size: 20px; font-wright: 900",
    variationTypeOptions,
    productVariations.value
  );
};

const fetchVariations = async () => {
  pageLoading.value = true;
  await store.dispatch("getVariationData", product.value?.id).finally(() => {
    pageLoading.value = false;
  });
};
onBeforeMount(() => {
  fetchVariations();
});
</script>
