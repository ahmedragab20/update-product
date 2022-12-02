<template>
  <transition name="modal" appear>
    <div v-if="value" @click.self="handler('')" class="background">
      <div class="image shadow-lg">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { watch } from "vue";

const props = defineProps({
  value: {
    type: null,
    required: true,
  },
  handler: {
    type: Function,
    required: true,
  },
});
watch(
  () => props.value,
  (newValue, oldValue) => {
    if (!!newValue) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.removeProperty("overflow");
    }
  }
);
</script>
<style scoped lang="scss">
.background {
  z-index: 999999999;
  position: fixed;
  inset: 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: rgba(224, 223, 223, 0.3);
  -webkit-backdrop-filter: blur(3px);
  -moz-backdrop-filter: blur(3px);
  -ms-backdrop-filter: blur(3px);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;

  .image {
    max-width: 90vw;
    max-height: 90vh;
    border-radius: 10px;
    overflow: hidden;

    img {
      object-fit: contain;
    }
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease-in-out;
}
</style>
