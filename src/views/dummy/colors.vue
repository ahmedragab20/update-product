<template>
  <div class="d-flex justify-content-center align-items-center gap-3 flex-wrap mt-4">
    <div class="color-box card-border-radius bg-secondary rounded-4"></div>
    <div class="color-box card-border-radius rounded-4 h3 text-xl">
      Hello world
    </div>
  </div>
</template>

<script lang="ts" setup>
console.log('hello colors');

</script>

<style lang="scss" scoped>
@import url();
.color-box {
  width: 100px;
  height: 100px;
}
</style>