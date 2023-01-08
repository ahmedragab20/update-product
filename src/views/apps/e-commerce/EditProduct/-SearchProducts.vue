<template>
  <div v-if="currentProduct">
    <el-select
      class="w-100 form-control-solid border-0"
      v-model="selectedProducts"
      multiple
      filterable
      remote
      reserve-keyword
      :placeholder="'Search product'"
      value-key="id"
      :remote-method="getProducts"
    >
      <el-option
        v-for="item in products"
        :label="item.name"
        :value="item"
        :disabled="isItemIncluded(item.id)"
      >
        <div class="d-flex gap-2 py-2">
          <div
            class="rounded-circle border overflow-hidden d-flex justify-content-center align-items-center"
            style="height: 30px; width: 30px"
          >
            <img
              :src="item.thumbnail"
              style="object-fit: cover; height: 100%; width: 100%"
            />
          </div>
          <span class="mx-2">{{ item.name }}</span>
          <span
            v-if="isItemIncluded(item.id)"
            class="text-danger"
            style="font-size: 0.85rem"
          >
            Already added
          </span>
        </div>
      </el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import Api from "@/utils/ApiHelper";
import { Actions } from "@/store/enums/StoreEnums";
import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const emit = defineEmits(["selectedProducts"]);
const props = defineProps({
  selectedItems: {
    type: Array,
    default: []
  }
});
const currentProduct = computed(() => store.state.UpdateProduct.product);
const selectedProducts = ref([]);
const products = ref([]);
const query = ref("");

const isItemIncluded = (id: string): boolean => {
  return props.selectedItems?.map((item) => item.id).includes(id) === true;
};

const getProducts = async (param) => {
  try {
    const reqData = {
      method: "get",
      url: Actions.SEARCH_PRODUCTS,
      payload: {
        Value: param
      }
    };

    const response = await Api(reqData);
    const items: any[] = response?.data.data;

    const isCurrentProductIncluded = items?.find(i => i.id === currentProduct.value?.id);

    if (isCurrentProductIncluded) {
      products.value = items.filter(i => i.id !== currentProduct.value?.id);

      return;
    }

    products.value = items;
  } catch (error) {
    console.error(error);
  }
};

watchEffect(() => {
  if (selectedProducts.value.length > 0) {
    emit("selectedProducts", selectedProducts.value);
  }
});
</script>
