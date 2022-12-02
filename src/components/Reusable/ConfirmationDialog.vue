<template>
  <el-dialog :model-value="modalValue" :title="dialogTitle" :top="top">
    <template #default>
      <slot name="content"></slot>
    </template>
    <template #footer>
      <slot name="dialogFooter"></slot>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  value: {
    type: null,
  },
  dialogTitle: {
    type: String,
    required: false,
    default: "Are you sure?",
  },
  top: {
    type: String,
    required: false,
    default: "3vh",
  },
});

const modalValue = computed(() => props.value);
</script>
