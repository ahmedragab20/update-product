<script setup lang="ts">
import { computed, PropType, ref, watch } from "vue";
import { defineEmits, defineProps } from "@vue/runtime-core";
import type { Coordinates } from "@/types";

const props = defineProps({
  center: {
    type: Object as PropType<Coordinates>,
    requred: true,
  },
});

const emit = defineEmits(["update:modelValue", "update:center"]);

const location = ref<Coordinates | undefined>();

const model = computed({
  get(): Coordinates | undefined {
    return location.value;
  },

  set(value: Coordinates | undefined) {
    if (value) {
      location.value = {
        lat: value.lat,
        lng: value.lng,
      };

      return emit("update:modelValue", value);
    }
  },
});

const center = computed({
  get(): Coordinates | undefined {
    return props.center;
  },

  set(value: Coordinates | undefined) {
    if (value) {
      model.value = {
        lat: value.lat,
        lng: value.lng,
      };

      emit("update:modelValue", model.value);
    }
    return emit("update:center", value);
  },
});

const onMapCenterChange = (e) => {
  model.value = {
    lat: e.lat(),
    lng: e.lng(),
  };

  emit("update:modelValue", model.value);
};

watch(
  () => props.center,
  (newCenter: Coordinates | undefined) => {
    if (newCenter) {
      model.value = {
        lat: newCenter.lat,
        lng: newCenter.lng,
      };

      emit("update:modelValue", model.value);
    }
  }
);
</script>

<template>
  <div>
    <GMapMap
      :center="center"
      :zoom="12"
      class="vue-google-maps"
      style="width: 100%"
      :center_changed="true"
      @center_changed="onMapCenterChange"
    >
      <GMapMarker :position="model" />
    </GMapMap>
  </div>
</template>

<style lang="scss">
.vue-google-maps {
  width: 100%;
}
</style>
