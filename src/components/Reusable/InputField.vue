<template>
  <div :class="styles" class="w-100">
    <label v-if="label" for="exampleFormControlInput1" class="form-label">
      {{ label }}<span :class="{ 'text-danger': isRequired }">*</span>
    </label>
    <input
      :style="`${textIndent ? `text-indent: ${textIndent}px` : ''}`"
      :type="inputType"
      class="form-control form-control-white"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script lang="ts" setup>
  // eslint-disable-next-line no-undef
  const props = defineProps({
    label: String,
    modelValue: String || Number,
    styles: String,
    isRequired: Boolean,
    placeholder: String,
    textIndent: String,
    inputType: {
      type: String,
      default: "text",
    },
  });
</script>

<style lang="scss" scoped></style>
