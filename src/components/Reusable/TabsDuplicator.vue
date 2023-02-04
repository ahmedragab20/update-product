<template>
  <div
    v-if="items && items.length > 0"
    class="tabs_holder overflow-auto d-flex"
    :class="{ 'mt-3': whiteSpaces }"
  >
    <div
      class="tab_container"
      :class="[
        { 'rounded-t': isolated },
        activeTab === $index ? activeTabDesign : '',
        tabBtnClasses,
        color,
      ]"
      :style="`${
        activeTab === $index && isolated
          ? `border-top: 1px solid currentColor;
    border-inline: 1px solid currentColor;`
          : ''
      }`"
      v-for="(item, $index) in items"
      :key="$index"
    >
      <button
        @click="setItem({ item: item, index: $index })"
        :class="[activeTab === $index ? activeBtnClasses : '', btnClasses]"
        type="button"
      >
        <slot name="label" :item="item" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  items: Array,
  activeBtnClasses: String,
  whiteSpaces: {
    type: Boolean,
    default: true,
  },
  isolated: {
    type: Boolean,
    default: true,
  },
  divId: {
    type: String,
    default: "",
    required: false,
  },
  btnClasses: {
    type: String,
    default: "text-black text-uppercase",
  },
  tabBtnClasses: {
    type: String,
    default: "py-2 px-4",
  },
  bodyClasses: {
    type: String,
    default: "bg-white",
  },
  color: {
    type: String,
    default: "natural-1",
  },
  activeTabDesign: {
    type: String,
    default: "bg-white",
  },
});
const store = useStore();
const emit = defineEmits(["selectedItem"]);
const activeTab = ref<number>(0);
const div = ref<HTMLElement>();
const setItem = (payload: any) => {
  activeTab.value = payload.index;

  emit("selectedItem", payload.item);
};
const websiteLang = computed((): string => store.state.websiteLanguage);
const isArabic = (lng: string) => lng?.toLowerCase().includes("ar");
onMounted(() => {
  if (props.divId) {
    div.value = document.getElementById(props.divId)!;

    if (props.isolated) {
      div.value.classList.add(
        `${
          activeTab.value
            ? "rounded-3"
            : isArabic(websiteLang.value)
            ? "rounded-start-down"
            : "rounded-end-down"
        }`
      );
      div.value.className += ` ${props.color} ${props.bodyClasses} `;
      div.value.style.border = "1px solid currentcolor";
    }
  }
});
watch(activeTab, (newV: number) => {
  if (props.isolated)
    if (newV) {
      div.value?.classList.add("rounded-3");
      div.value?.classList.remove(
        isArabic(websiteLang.value) ? "rounded-start-down" : "rounded-end-down"
      );
    } else {
      div.value?.classList.add(
        isArabic(websiteLang.value) ? "rounded-start-down" : "rounded-end-down"
      );
      div.value?.classList.remove("rounded-3");
    }
});
</script>

<style lang="scss" scoped>
.tabs_holder {
  margin-bottom: -1.5px;

  .tab_container {
    display: flex;

    button {
      all: unset;
      width: 100%;
      cursor: pointer;
    }
  }
}
</style>
