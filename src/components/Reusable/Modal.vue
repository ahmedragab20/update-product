<template>
  <transition appear name="dialog">
    <div
      v-if="modalValue"
      class="modal-background position-fixed top-0 w-100 h-100 vh-100 vw-100 overflow-hidden p-5 start-0 bg-dark-lite blur d-flex justify-content-center align-items-center"
      style="z-index: 1000"
      @click.self="close"
    >
      <div :class="[boxClasses, boxWidthClass]">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
interface Props {
  boxClasses?: string;
  boxWidthClass?: string;
  modalValue: any;
  close?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  boxClasses: "bg-light p-3 rounded-3 shadow",
  boxWidthClass: "modal-width",
  modalValue: false,
  close: () => {},
});
</script>

<style lang="scss" scoped>
.modal-width {
  width: 95%;

  @media (min-width: 481px) {
    width: 420px;
  }
  @media (min-width: 769px) {
    width: 550px;
  }
}
</style>
<style scoped>
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(100px);
}

.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.3s ease;
}
</style>
