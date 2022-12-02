<template>
  <div class="row flex-wrap">
    <div class="w-75">
      <tabs-duplicator
        :items="langs"
        @selectedItem="setSelectedOptionLabelLang"
      >
        <template #label="{ item }">
          <span>
            {{ item.label }}
          </span>
        </template>
      </tabs-duplicator>
      <keep-alive>
        <div v-for="(lang, $index) in langs" :key="$index">
          <input-field
            v-if="lang.id === selectedOptionLabelLang.id"
            v-model="optionLabels[selectedOptionLabelLang.id]"
            class="mt-4"
            placeholder="Label"
            @input="setLabel"
          />
        </div>
      </keep-alive>
    </div>
    <div class="w-25 d-flex align-items-end">
      <el-color-picker
        v-if="activeValueType === 'color'"
        v-model="color"
        :predefine="predefineColors"
        class="mb-1"
        color-format="hex"
      />
      <div v-else-if="activeValueType === 'image'">
        <div class="mb-1 d-flex gap-1">
          <div>
            <el-button
              :disabled="activeValueType !== 'image'"
              :icon="Picture"
              circle
              plain
              type="primary"
              @click="$refs.imageInput.click()"
            />
            <input
              ref="imageInput"
              accept=".png, .jpg, .jpeg"
              hidden
              name="avatar"
              type="file"
              @change="onFileSelected($event)"
            />
          </div>
          <div>
            <img
              v-if="url"
              :src="url"
              class="rounded-circle"
              height="37"
              style="object-fit: contain"
              width="37"
              @click="imageViewerModalHandler(url)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="reqDone === 'failed'"
    v-text="
      `we're too sorry, there's something went wrong, please try again later!`
    "
    class="p-2 text-danger"
  />
  <!-- Action -->
  <div class="d-flex align-items-center gap-2 flex-wrap my-4">
    <!-- Add validation to it -->
    <div>
      <button
        :disabled="!addNewOptionValidation"
        class="btn btn-success btn-sm"
        type="button"
        @click="addOption(optionValue), clearInputs()"
      >
        <div v-if="reqLoading">
          <span
            class="spinner-border spinner-border-sm align-middle ms-2"
          ></span>
          Loading...
        </div>
        <span v-else>
          <i class="bi bi-plus" style="font-size: large"></i> Add new option
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Api from "@/utils/ApiHelper";

import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";
import InputField from "@/components/Reusable/InputField.vue";
import { ref } from "@vue/reactivity";
import { computed, watchEffect } from "@vue/runtime-core";
import { Picture } from "@element-plus/icons-vue";
import { useStore } from "vuex";

const props = defineProps({
  activeValueType: {
    type: String,
    default: "label",
  },
  setSelectedOptionLabelLang: {
    type: Function,
    default: (): void => {},
  },
  langs: {
    type: null,
  },
  selectedOptionLabelLang: {
    type: Object,
    default: {},
  },
  addOption: {
    type: Function,
    default: (): void => {},
  },
  imageViewerModalHandler: {
    type: Function,
    default: (): void => {},
  },
});
const store = useStore();
const optionValue = ref({}); // the data binder for options input fields
const optionLabels = ref({});
const color = ref("");
const predefineColors = ref([
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577",
]);

const setLabel = () => {
  const resources: any[] = [];
  Object.keys(optionLabels.value).forEach((el) => {
    props.langs?.forEach((lang) => {
      if (el === lang.id) {
        resources.push({
          languageId: el,
          label: optionLabels.value[el],
          description: "",
        });
      }
    });
  });
  if (resources.length === props.langs.length) {
    optionValue.value["resources"] = resources;
  }
};

const clearInputs = (): void => {
  optionValue.value = {};
  optionLabels.value = {};
  color.value = "";
  url.value = "";
};

const photo = ref();
const url = ref();
const reqDone = ref<any>(false);
const reqLoading = ref(false);

const onFileSelected = (event) => {
  reqDone.value = false;
  photo.value = event.target.files[0];
  url.value = URL.createObjectURL(photo.value);

  onUpload();
};

const onUpload = async () => {
  try {
    reqLoading.value = true;
    const fd = new FormData();
    fd.append("file", photo.value);

    const reqData = {
      method: "post",
      url: "/ManageCommands/upload-file",
      payload: fd,
    };

    const { data } = await Api(reqData);
    if (data?.succeeded) {
      reqDone.value = true;
      optionValue.value["type"] = url;
      optionValue.value["imageKey"] = data.data;
      console.log(optionValue.value, "options.value");
    } else reqDone.value = "failed";
  } catch (error) {
    console.error(error);
  } finally {
    reqLoading.value = false;
  }
};

const addNewOptionValidation = computed(() => {
  return (
    (Object.keys(optionLabels.value).length === 2 &&
      props.activeValueType === "label") ||
    (Object.keys(optionLabels.value).length === 2 && !!color.value) ||
    (Object.keys(optionLabels.value).length === 2 && reqDone.value === true)
  );
});
const log = () => {
  console.log(
    "%cLabels",
    "color: pink; font-size: 1rem; font-weight: bold",
    optionValue.value,
    optionLabels.value
  );
};
watchEffect(() => {
  if (!!color.value) {
    optionValue.value["colorHexa"] = color.value;
    optionValue.value["type"] = color.value;
  }
});
</script>
