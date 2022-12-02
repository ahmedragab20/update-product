<template>
  <div :class="styles" class="w-100">
    <label v-if="label" for="exampleFormControlInput1" class="form-label">
      {{ label }}<span :class="{ 'text-danger': isRequired }">*</span>
    </label>
    <slot name="textEditor"></slot>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "@vue/reactivity";
  import { nextTick, onMounted, watchEffect } from "@vue/runtime-core";
  const props = defineProps({
    label: String,
    styles: String,
    isRequired: Boolean,
  });
</script>
