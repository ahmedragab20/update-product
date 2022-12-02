<template>
  <div :class="styles" class="w-100" dir="rtl">
    <label v-if="label" for="exampleFormControlInput1" class="form-label">
      {{ label }}<span :class="{ 'text-danger': isRequired }">*</span>
    </label>
    <QuillEditor
      dir="rtl"
      :options="textEditorOptions"
      v-model:content="editorContent"
      contentType="html"
      @input="$emit('editorTextContent', editorContent)"
    />
  </div>
</template>

<script lang="ts" setup>
  import "@vueup/vue-quill/dist/vue-quill.snow.css";
  import "@vueup/vue-quill/dist/vue-quill.bubble.css";
  import { QuillEditor } from "@vueup/vue-quill";
  import { ref } from "@vue/reactivity";
  import { nextTick, onMounted, watchEffect } from "@vue/runtime-core";
  const props = defineProps({
    label: String,
    styles: String,
    isRequired: Boolean,
  });
  const textEditorOptions = {
    toolbar: "essential",
    placeholder: "اكتب وصف ملفت",
    readOnly: false,
    theme: "snow",
  };
  const editorContent = ref("<p></p>");

  const styleEditorDirection = () => {
    const editorEl = document.querySelector(".ql-blank")!;
    editorEl.style.textAlign = "right";
  };

  // Hooks
  onMounted(() => {
    styleEditorDirection();
  });
</script>
