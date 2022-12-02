<template>
  <div
    v-if="value"
    class="loader-holder position-fixed start-0 end-0 top-0 bottom-0 w-100 h-100 d-flex justify-content-center align-items-center"
  >
    <transition appear name="spinner">
      <div class="lds-hourglass"></div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { watch } from "@vue/runtime-core";

const props = defineProps(["value"]);

watch(
  () => props.value,
  (newValue) => {
    if (!!newValue) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.removeProperty("overflow");
    }
  }
);
</script>
<style scoped>
.loader-holder {
  z-index: 99999999;
  background: rgba(255, 255, 255, 0.2);
  -webkit-backdrop-filter: blur(2px);
  -moz-backdrop-filter: blur(2px);
  -ms-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
}
.lds-hourglass {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-hourglass:after {
  content: " ";
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 8px;
  box-sizing: border-box;
  border: 32px solid #107373;
  border-color: #107373 transparent #107373 transparent;
  animation: lds-hourglass 1.2s infinite;
}
@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}

.spinner-enter-from,
.spinner-leave-to {
  transform: scale(0.3);
}
.spinner-enter-active,
.spinner-leave-active {
  transition: all 0.3s ease-in-out;
}
</style>
