<template>
  <div>
    <SearchProducts
      @selectedProducts="selectedItems"
      :selectedItems="items"
    />
  </div>
</template>

<script lang="ts" setup>
import SearchProducts from "./-SearchProducts.vue";
import { watchEffect } from "@vue/runtime-core";
const emit = defineEmits(["values"]);
const props = defineProps({
  items: {
    type: Array,
    default: [],
  },
});
const selectedItems = (items) => {
  emit("values", items);
};
</script>
