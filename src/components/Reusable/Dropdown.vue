<template>
  <div class="position-relative dropdown_holder">
    <div class="dropdown_header bg-white">
      <div
        class="text-truncate w-100"
        :class="[headClasses, !disabled ? '' : `${disabledClasses}`]"
        @click="!disabled ? dropdownHandler($event) : ''"
        :style="`cursor: ${disabled ? 'not-allowed' : 'pointer'};`"
      >
        <slot name="headerContent" :item="{ selectedItem, isOpened }" />
      </div>
    </div>
    <transition name="dropdown" appear>
      <div
        v-if="isOpened && !disabled"
        class="dropdown_body bg-white position-absolute w-100 overflow-hidden shadow py-3"
      >
        <div v-if="items && items.length > 0">
          <div class="overflow-auto" :style="`max-height: ${maxHeight}`">
            <template v-for="(item, $index) in items" :key="$index">
              <div
                class="dropdown_item"
                @click="
                  selectItem($event, item),
                    !multiSelect ? dropdownHandler($event, true) : ''
                "
                :class="bodyClasses"
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
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "@vue/reactivity";
import { onMounted, watchEffect } from "@vue/runtime-core";

const emit = defineEmits(["selectedItem"]);
const props = defineProps({
  items: Array,
  headClasses: String,
  bodyClasses: String,
  maxHeight: String,
  multiSelect: Boolean,
  disabled: Boolean,
  outterIds: Array,
  idKey: {
    type: String,
    default: "id",
  },
  disabledClasses: {
    type: String,
    default: "bg-light",
  },
});

const isOpened = ref(false);
const selectedItem = ref(0);
const selectedItemsIds = ref<any[]>([]);
const DropdownHeaderHtmlEl = ref(null);
const DropdownBodyHtmlEl = ref(null);

const dropdownHandler = (event: any, isGlobal) => {
  isOpened.value = !isOpened.value;
  if (!isGlobal) {
    DropdownHeaderHtmlEl.value = event.target;
  }
};

window.addEventListener("click", (e) => {
  if (!props.multiSelect && DropdownHeaderHtmlEl.value !== e.target) {
    if (isOpened.value) isOpened.value = false;
  } else if (
    props.multiSelect &&
    DropdownHeaderHtmlEl.value !== e.target &&
    DropdownBodyHtmlEl.value !== e.target
  ) {
    if (isOpened.value) isOpened.value = false;
  }
});

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
watchEffect(() => {
  if (props.multiSelect && props.outterIds) {
    selectedItemsIds.value = props.outterIds;
  }
});
</script>

<style lang="scss" scoped>
$radius: 10px;
.dropdown_holder {
  * {
    user-select: none;
  }
  .dropdown_header {
    border-radius: $radius;

    div {
      cursor: pointer;
    }
  }
  .dropdown_body {
    top: 104%;
    z-index: 999999999;
    border-radius: $radius;

    .dropdown_item {
      cursor: pointer;

      &:hover {
        background: #04c8c820;
      }
    }
  }
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-55%) scaleY(0);
}
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease-in-out;
}
</style>
