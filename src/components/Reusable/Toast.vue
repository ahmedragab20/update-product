<template>
  <transition name="fade_into" appear>
    <div
      v-if="showToast"
      class="d-flex gap-2"
      :class="[typeStyle, customClasses]"
      :style="`max-width: ${width}`"
    >
      <div>
        <template v-if="hasSlot('icon')">
          <slot name="icon"></slot>
        </template>
        <template v-else>
          <i
            class="bi bi-bell pt-3"
            :class="[
              !iconClasses && type === 'dark' ? 'text-white' : 'text-dark',
              iconClasses,
            ]"
            style="font-size: 1.3rem"
          ></i>
        </template>
      </div>
      <div>
        <template v-if="hasSlot('content')">
          <slot name="content"></slot>
        </template>
        <template v-else>
          <div :class="contentClasses" v-text="content" />
        </template>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useSlots, watch } from "vue";

interface Props {
  value?: boolean;
  type?: string;
  duration?: number;
  sticky?: boolean;
  width?: string;
  customClasses?: string;
  iconClasses?: string;
  contentClasses?: string;
  content?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "dark",
  duration: 3000,
  sticky: false,
  width: "250px",
  customClasses: "p-3 rounded-3 shadow-lg",
  content: "Hey, You got a new update!",
  value: undefined,
});

const slots = useSlots();

const types = {
  dark: "bg-dark text-white",
};

const typeStyle = ref(types[props.type]);

const hasSlot = (slotName) => {
  return !!slots[slotName];
};

const localValue = ref(false);

const showToast = computed<boolean>(() =>
  [true, false].includes(props.value) ? props.value : localValue.value
);

onMounted(() => {
  console.log(props.value);
  if (!props.sticky) {
    localValue.value = true;

    setTimeout(() => {
      localValue.value = false;
    }, props.duration);
  } else {
    localValue.value = true;
  }
});
</script>

<style scoped>
.fade_into-enter-from,
.fade_into-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.5);
}

.fade_into-enter-active,
.fade_into-leave-active {
  transition: all 0.3s ease-in-out;
}
</style>
