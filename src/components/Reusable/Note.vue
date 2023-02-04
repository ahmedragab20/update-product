<template>
  <div>
    <div
      :class="bodyClasses"
      class="alert alert-dismissible fade show"
      role="alert"
      :style="`max-width: ${maxWidth}px !important`"
    >
      <span :class="textClasses">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi
        consectetur consequuntur cumque debitis doloremque eaque eius laborum
        laudantium, magni maxime nulla numquam quam reiciendis saepe sed sequi
        suscipit temporibus vel.
      </span>
      <button
        type="button"
        class="btn-close btn-sm"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  bodyClasses?: string;
  textClasses?: string;
  maxWidth?: number;
}

const props = withDefaults(defineProps<Props>(), {
  bodyClasses: "blue-5",
  maxWidth: 300,
});
</script>
