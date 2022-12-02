import { onUnmounted, onMounted, ref } from "@vue/runtime-core";

export default () => {
  const coords = ref({ latitude: 0, longitude: 0 });
  const isMounted = ref(false);
  const isSupported = "navigator" in window && "geolocation" in navigator;

  let watcher = null;

  onMounted(() => {
    if (isSupported)
      watcher = navigator.geolocation.watchPosition(
        (position) => (coords.value = position.coords)
      );
  });
  onUnmounted(() => {
    if (watcher) navigator.geolocation.clearWatch(watcher);
  });

  return { isMounted, coords, isSupported };
};
