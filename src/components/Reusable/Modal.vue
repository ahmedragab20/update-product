<template>
  <div @click.self="modalHandler" class="modal-background">
    <div class="modal-content-holder">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, onDeactivated, computed } from "@vue/runtime-core";
  import { useStore } from "vuex";

  const store = useStore();

  const modalHandler = computed(() => store.commit("MODAL_HANDLER"));
</script>

<style lang="scss" scoped>
  .modal-background {
    position: fixed;
    inset: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
