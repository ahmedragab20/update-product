<template>
  <form @submit.prevent>
    <div :id="editorId || 'editor-container'" class="w-100"></div>
  </form>
</template>

<script setup lang="ts">
  import Quill from "quill/dist/quill.js";
  import {
    computed,
    watchEffect,
    onMounted,
    watch,
    nextTick,
    ref,
  } from "@vue/runtime-core";

  const props = defineProps({
    editorId: String,
  });
  const emit = defineEmits(["editorContext"]);
  onMounted(() => {
    const toolbarOptions = [
      ["bold"], // toggled buttons
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ direction: "rtl" }], // text direction

      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    ];

    const quill = new Quill(`#${props.editorId || "editor-container"}`, {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: "snow",
    });

    const toolbar = document.querySelectorAll(".ql-toolbar");
    const qlEditor = ref<HTMLElement>(
      document.querySelector(
        `#${props.editorId || "editor-container"} .ql-editor`
      )
    );

    toolbar.forEach((el) => {
      if (el) {
        el.style.display = "flex";
        el.style.flexWrap = "wrap";
        el.style.maxWidth = "100%";
      }
    });
    qlEditor.value.onkeyup = () => {
      emit("editorContext", qlEditor.value.innerHTML);
    };
  });
</script>
<style lang="scss" scoped></style>
