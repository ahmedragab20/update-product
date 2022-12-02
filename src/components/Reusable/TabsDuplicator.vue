<template>
  <div class="mt-3 tabs_holder overflow-auto">
    <div
      class="tab_container"
      v-for="(item, $index) in props.items"
      :key="$index"
    >
      <button
        @click="setItem({ item: item, index: $index })"
        :class="[activeTab === $index ? activeTabDesign : '', tabBtnClasses]"
        class="btn btn-sm text-uppercase rounded-2"
        type="button"
      >
        <slot name="label" :item="item" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

const props = defineProps({
  items: Array,
  tabBtnClasses: String,
  activeTabDesign: {
    type: String,
    default: "btn-primary",
  },
});
const emit = defineEmits(["selectedItem"]);
const activeTab = ref(0);

const setItem = (payload: any) => {
  activeTab.value = payload.index;

  emit("selectedItem", payload.item);
};
</script>

<style lang="scss" scoped>
.tabs_holder {
  display: flex;
  gap: 5px;

  .tab_container {
    display: flex;

    button {
      width: 100%;
    }
  }
}
</style>
