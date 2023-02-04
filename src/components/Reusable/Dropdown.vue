<template>
  <div class="position-relative dropdown_holder">
    <div class="dropdown_header">
      <div
        class="text-truncate w-100"
        :class="[headClasses, !disabled ? '' : `${disabledClasses}`]"
        @click="!disabled ? dropdownHandler($event, false) : ''"
        :style="`cursor: ${disabled ? 'not-allowed' : 'pointer'};`"
      >
        <slot name="headerContent" :item="{ selectedItem, isOpened }" />
      </div>
    </div>
    <transition name="dropdown" appear>
      <div
        v-if="isOpened && !disabled"
        class="dropdown_body position-absolute overflow-hidden"
        :class="bodyHolderClasses"
        :style="`width: ${width}; ${position}: 0px;`"
      >
        <div v-if="searchable || remoteSearch">
          <input
            type="text"
            class="form-control-plaintext border-bottom text-center"
            id="dropdown-search-field"
            placeholder="Search by key word..."
            v-model="searchTerm"
            @input="emit('input', $event.target.value)"
          />
        </div>
        <template v-if="!loading">
          <div v-if="filteredItems && filteredItems.length > 0">
            <div class="overflow-auto" :style="`max-height: ${maxHeight}`">
              <template v-for="(item, $index) in filteredItems" :key="$index">
                <div
                  class="dropdown_item"
                  @click="
                    selectItem($event, item),
                      !multiSelect ? dropdownHandler($event, true) : ''
                  "
                  :class="[bodyClasses]"
                >
                  <slot name="bodyContent" :item="item" />
                </div>
              </template>
            </div>
          </div>
          <div v-else>
            <div
              class="px-sm-5 py-sm-3 px-3 py-1 d-flex justify-content-between align-center"
            >
              <span class="text-muted">No items to select</span>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="d-flex justify-content-center align-items-center py-5">
            <span
              class="spinner-border spinner-border-sm mx-auto text-secondary"
            ></span>
          </div>
        </template>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { computed, unref, watch } from "vue";

const emit = defineEmits(["selectedItem", "input"]);
// type position = "left" | "right";
const props = defineProps({
  items: Array,
  headClasses: {
    type: String,
    default: "bg-white",
  },
  bodyClasses: String,
  maxHeight: String,
  multiSelect: Boolean,
  disabled: Boolean,
  outterIds: Array,
  bodyHolderClasses: {
    type: String,
    default: "bg-white shadow py-3",
  },
  width: {
    type: String,
    default: "100%",
  },
  position: {
    type: String,
    default: "left",
    validator(value: string) {
      // The value must match one of these strings
      return ["left", "right"].includes(value);
    },
  },
  idKey: {
    type: String,
    default: "id",
  },
  searchTarget: {
    type: String,
    default: "name",
  },
  disabledClasses: {
    type: String,
    default: "bg-light",
  },
  searchable: {
    type: Boolean,
    default: false,
  },
  remoteSearch: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const isOpened = ref(false);
const selectedItem = ref(0);
const selectedItemsIds = ref<any[]>([]);
const DropdownHeaderHtmlEl = ref(null);
const DropdownBodyHtmlEl = ref(null);
const searchTerm = ref("");

const dropdownHandler = (event: any, isGlobal) => {
  isOpened.value = !isOpened.value;
  if (!isGlobal) {
    DropdownHeaderHtmlEl.value = event.target;
  }
};

const selectItem = ($event: any, item: any) => {
  DropdownBodyHtmlEl.value = $event.target;

  if (props.multiSelect) {
    if (!selectedItemsIds.value.includes(item[props.idKey])) {
      selectedItemsIds.value.push(item[props.idKey]);
    } else {
      selectedItemsIds.value = selectedItemsIds.value.filter(
        (el_id) => el_id !== item[props.idKey]
      );
    }

    emit("selectedItem", selectedItemsIds.value);
  } else {
    selectedItem.value = item;
    emit("selectedItem", selectedItem.value);
  }
};

const filteredItems = computed(() => {
  const items = unref(props.items);
  if (searchTerm.value && items && items.length > 0 && !props.remoteSearch) {
    if (typeof items[0] === "string") {
      return items.filter((el: string, i, array) =>
        el?.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    } else if (typeof items[0] === "number") {
      return items.filter((el: string, i, array) =>
        el?.toString().includes(searchTerm.value.toString())
      );
    } else {
      return items.filter((el, i, array) =>
        el[props.searchTarget]
          ?.toLowerCase()
          ?.includes(searchTerm.value?.toLowerCase())
      );
    }
  } else {
    return items;
  }
});

onMounted(() => {
  window.addEventListener("click", (e) => {
    if (
      !props.multiSelect &&
      DropdownHeaderHtmlEl.value !== e.target &&
      e.target["id"] !== "dropdown-search-field"
    ) {
      isOpened.value = false;
    } else if (
      props.multiSelect &&
      DropdownHeaderHtmlEl.value !== e.target &&
      DropdownBodyHtmlEl.value !== e.target &&
      e.target["id"] !== "dropdown-search-field"
    ) {
      isOpened.value = false;
    }
  });

  if (props.multiSelect && props.outterIds) {
    selectedItemsIds.value = props.outterIds;
  }
});

watch(
  () => props.outterIds,
  (newIds) => {
    if (props.multiSelect && newIds) {
      selectedItemsIds.value = newIds;
    }
  }
);
</script>

<style lang="scss" scoped>
@import "@/assets/sass/components/_variables.custom.scss";

.dropdown_holder {
  * {
    user-select: none;
  }

  .dropdown_header {
    border-radius: $rounded-sm;

    div {
      cursor: pointer;
    }
  }

  .dropdown_body {
    top: 104%;
    z-index: 99;
    border-radius: $rounded-sm;

    .dropdown_item {
      cursor: pointer;
    }
  }
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-50%) scaleY(0);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease-in-out;
}
</style>
