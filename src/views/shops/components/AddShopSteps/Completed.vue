<template>
  <!--begin::Wrapper-->
  <div class="w-100 text-center">
    <!--begin::Heading-->
    <h1 class="fw-bolder text-dark mb-3">{{ $t("youAreDone") }}</h1>
    <!--end::Heading-->

    <!--begin::Description-->
    <div class="text-muted fw-bold fs-3">
      {{ $t("submitYourInfoToCreateNewShop") }}
    </div>
    <!--end::Description-->

    <!--begin::Illustration-->
    <div class="text-center px-4 py-15">
      <img
        :src="getIllustrationsPath('9.png')"
        alt=""
        class="mw-100 mh-300px"
      />
    </div>
    <!--end::Illustration-->
  </div>
    
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getIllustrationsPath } from "@/core/helpers/assets";
export default defineComponent({
  name: "step-6",
  components: {},
  setup() {
    return {
      getIllustrationsPath
    }
  }
});
</script>
