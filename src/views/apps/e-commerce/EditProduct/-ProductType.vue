<template>
  <div class="card card-flush">
    <div v-if="productType" class="card-header py-5 flex-column">
      <p class="text-muted fw-bold">product type</p>
      <div class="h2 d-none d-md-block">#{{ productType.value }}</div>
      <div class="h3 d-block d-md-none">#{{ productType.value }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { computed, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
import { onMounted } from "vue";
const store = useStore();
const props = defineProps(["product"]);
const productTypes = computed(() => store.state.LookupQueries.productTypes);
const productType = ref();

onMounted(() => {
  if (props.product && productTypes.value) {
    const productTypeId = props.product.productTypeId;

    productType.value = productTypes.value?.find(
      (type) => type.id === productTypeId
    );
  }
});

watch(
  () => props.product,
  (newV) => {
    if (newV) {
      const productTypeId = props.product.productTypeId;

      productType.value = productTypes.value?.find(
        (type) => type.id === productTypeId
      );
    }
  }
);
</script>
