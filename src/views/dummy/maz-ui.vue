<template>
  <div
    class="container d-flex align-items-center flex-column pt-4 max-auto"
    :class="{
      '--has-dark-theme': hasDarkTheme,
      '--has-light-theme': hasLightTheme,
    }"
    style="max-width: 400px"
  >
    <div class="h3 my-4">Themes</div>
    <div class="d-flex gap-5 flex-wrap">
      <!-- Theme switching -->
      <MazBtn
        :left-icon="hasDarkTheme ? 'moon' : 'sun'"
        @click="toggleTheme"
        color="info"
      >
        Click to toggle mode
      </MazBtn>

      <MazBtn left-icon="moon" @click="setDarkTheme" color="warning">
        Click to set dark mode
      </MazBtn>

      <MazBtn left-icon="sun" @click="setLightTheme" color="primary">
        Click to set light mode
      </MazBtn>
    </div>
    <div class="h3 my-4">Toggles</div>
    <div>
      <MazSwitch
        class="my-3"
        v-for="color in colors"
        v-model="switchValue"
        :key="color"
        :color="color"
        :name="color"
      />
    </div>
    <div class="h3 my-4">Currencies</div>
    <div>
      <div class="d-flex">
        <MazInputPrice
          v-model="priceValue"
          currency="EGP"
          :min="5"
          :max="1000"
          no-icon
          @formatted="formattedPrice = $event"
        />
      </div>
      <MazInputPrice
        v-model="priceValue"
        currency="USD"
        :min="5"
        :max="1000"
        no-icon
        @formatted="formattedPrice = $event"
      />
    </div>
    <div class="h3 my-4">Phone number</div>
    <div>
      <MazPhoneNumberInput
        v-model="phoneNumber"
        show-code-on-list
        custom-countries-list=""
        :preferred-countries="['EG', 'JO', 'SA', 'US']"
        :ignored-countries="['AC']"
        @update="results = $event"
        :success="results?.isValid"
      />
      <div>
        <pre>
        <code>
          {{ results }}
        </code>
      </pre>
      </div>
    </div>
    <div class="h3 my-4">Images Gallery</div>
    <div>
      <MazGallery :images="images" :height="400" :width="300" />
    </div>
    <div
      class="min-vh-100 d-flex justify-content-center align-items-center flex-column"
    >
      <div class="h3 my-4">Images scale in</div>
      <div>
        <img
          width="300"
          data-maz-aos="scale-in"
          data-maz-aos-duration="400"
          src="https://cdn.dribbble.com/userupload/4096725/file/original-e3c123b792d9527820ca52f62269a10d.jpg?compress=1&resize=1504x1128"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import MazSwitch from "maz-ui/components/MazSwitch";
import MazInputPrice from "maz-ui/components/MazInputPrice";
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import MazBtn from "maz-ui/components/MazBtn";
import MazGallery from "maz-ui/components/MazGallery";

import { useThemeHandler } from "maz-ui";
import type { ThemeHandlerOptions } from "maz-ui";

// optional
const options: ThemeHandlerOptions = {
  /* should be "dark" to works with maz-ui */
  darkClass: "dark",
  /* local storage preferences */
  storageThemeKey: "theme",
  storageThemeValueDark: "dark",
  storageThemeValueLight: "light",
};

const {
  autoSetTheme,
  toggleTheme,
  setDarkTheme,
  setLightTheme,
  theme,
  hasDarkTheme,
  hasLightTheme,
} = useThemeHandler(options);

const switchValue = ref(false);

const colors = ["primary", "secondary", "info", "success", "warning", "danger"];
const priceValue = ref(2);
const formattedPrice = ref();

const phoneNumber = ref();
const results = ref();

const images = reactive([
  "https://cdn.dribbble.com/userupload/4358625/file/original-3a75c8417b0f53400433885b5de2763b.png?compress=1&resize=752x",
  {
    src: "https://cdn.dribbble.com/userupload/4358626/file/original-39bfadbf1a81a559ec5c17196523c34e.png?compress=1&resize=1504x1128&vertical=center",
    alt: "image description",
  },
  {
    src: "https://cdn.dribbble.com/userupload/4358627/file/original-9c91f2bfc5e698ac8ffa99a8ac7e8cba.png?compress=1&resize=1504x1128&vertical=center",
    alt: "image description",
  },
  "https://cdn.dribbble.com/userupload/4096725/file/original-e3c123b792d9527820ca52f62269a10d.jpg?compress=1&resize=1504x1128",
  "https://placekitten.com/640/800",
  "https://placekitten.com/640/1000",
  "https://placekitten.com/800/800",
]);

onMounted(() => {
  autoSetTheme();
});
</script>

<style scoped>
.--has-dark-theme {
  background: #181c32 !important;
}
</style>
