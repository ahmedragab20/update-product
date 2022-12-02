<template>
  <div class="w-100 h-100 map-holder position-relative">
    <GMapMap
      :center="center"
      :zoom="zoom"
      :style="`width: 100%; height: ${props.height}`"
      @center_changed="centerChanged"
      @zoom_changed="zoomChanged"
      @bounds_changed="boundsChanged"
    >
    </GMapMap>
    <div class="image">
      <img
        src="/media/location-pin.png"
        width="50"
        class="pin-image img-fluid"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { onMounted, watch, defineEmits } from "@vue/runtime-core";
import geoLocation from "@/composables/geoLocation";
const props = defineProps({ height: String });

const emit = defineEmits(["currentLocation"]);

const center = ref({ lat: 0, lng: 0 });

const { coords } = geoLocation();

watch(coords, (newVal, oldVal) => {
  center.value.lat = newVal.latitude;
  center.value.lng = newVal.longitude;
});

const zoom = 12;

const centerChanged = (payload: any): void => {
  const callback = { lat: payload.lat(), lng: payload.lng() };
  emit("currentLocation", callback);
};
const zoomChanged = (payload: any): void => {
  // console.log({ zoomChanged: payload });
};
const boundsChanged = (payload: any): void => {
  // console.log({ boundsChanged: payload });
};
</script>

<style lang="scss" scoped>
.map-holder {
  .image {
    position: absolute;
    width: 50px;
    left: 50%;
    right: 50%;
    top: 50%;
    bottom: 50%;
    transform: translate(-50%, -50%) rotateX(55deg);
    z-index: 999999999999999999;
    user-select: none;
    pointer-events: none;
    filter: drop-shadow(0 35px 9px rgba(0, 0, 0, 1));
  }
}
</style>
