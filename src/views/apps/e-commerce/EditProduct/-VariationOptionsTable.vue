<template>
  <div class="table-responsive">
    <table class="table table-striped gy-7 gs-7">
      <thead>
        <tr class="fw-bold fs-5 text-gray-800 border-bottom-2 border-gray-200">
          <th style="min-width: 70px; max-width: 140px">Name</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(option, $index) in optionsCopy"
          :key="option.connectionId"
          @click="rowClickedHandler(option)"
        >
          <td
            class="text-truncate position-relative"
            style="min-width: 100px; max-width: 140px"
          >
            <div class="d-flex align-items-center justify-content-start">
              <input
                :disabled="reqLoading"
                :readonly="isReadonly"
                :value="newOptionData['label'] || option.resources['0'].label"
                class="border-0 bg-transparent"
                type="text"
                @click="mutateIsReadonly(false)"
                @input="
                  editTableData({
                    key: 'Label',
                    value: $event.target.value,
                  })
                "
              />
            </div>
          </td>
          <td>
            <div class="d-flex gap-2 w-100">
              <div
                v-if="option.colorHexa || option.imageKey"
                class="d-flex gap-2 align-items-center w-100"
              >
                <div
                  v-if="!!option.colorHexa"
                  class="d-flex justify-content-between align-items-center gap-2 w-100"
                >
                  <div
                    :style="`background: ${option.colorHexa}`"
                    class="rounded-circle"
                    style="width: 20px; height: 20px"
                  />
                  <el-color-picker
                    v-if="
                      clickedItem &&
                      clickedItem.connectionId === option.connectionId
                    "
                    v-model="color"
                    :predefine="predefineColors"
                    class="mb-1"
                    color-format="hex"
                    size="small"
                    @change="editTableData({ key: 'type', value: option })"
                  />
                </div>
                <div
                  v-else
                  class="d-flex justify-content-between align-items-center gap-2 w-100"
                >
                  <div>
                    <img
                      :src="option.type || option.image || placeholderImage"
                      class="rounded-circle"
                      height="30"
                      width="30"
                      style="object-fit: cover"
                      @click="
                        imageViewerModalHandler(
                          option.type || option.image || placeholderImage
                        )
                      "
                    />
                  </div>
                  <div
                    v-if="
                      clickedItem &&
                      clickedItem.connectionId === option.connectionId
                    "
                  >
                    <input
                      :ref="`editImage-${option.connectionId}`"
                      accept=".png, .jpg, .jpeg"
                      hidden
                      name="avatar"
                      type="file"
                      @change="onFileSelected($event)"
                    />
                    <el-button
                      v-if="!reqLoading"
                      :icon="Edit"
                      circle
                      plain
                      size="small"
                      type="primary"
                      @click="
                        $refs[`editImage-${option.connectionId}`][0].click()
                      "
                    />
                    <el-button
                      v-else
                      circle
                      loading
                      plain
                      size="small"
                      type="primary"
                    ></el-button>
                  </div>
                </div>
              </div>
              <div v-else>---</div>
            </div>
          </td>
          <td>
            <div class="w-100 d-flex justify-content-end">
              <button
                :disabled="reqLoading"
                class="btn btn-text-danger btn-sm text-nowrap"
                type="button"
                @click="removeOption(option.connectionId)"
              >
                <i class="bi bi-trash text-danger"></i>
                Remove Option
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import Api from "@/utils/ApiHelper";
import { ref } from "vue";
import { computed, onMounted, watchEffect } from "@vue/runtime-core";
import { Edit } from "@element-plus/icons-vue";

const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
  removeOption: {
    type: Function,
    required: true,
  },
  editOption: {
    type: Function,
    required: true,
  },
  typeId: {
    type: null,
    required: true,
  },
  isReadonly: {
    type: Boolean,
    default: false,
    required: true,
  },
  mutateIsReadonly: {
    type: Function,
    required: true,
  },
  imageViewerModalHandler: {
    type: Function,
    required: true,
  },
});

const color = ref("#" + Math.random().toString(16).slice(2, 8).toUpperCase());
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
const placeholderImage = ref(
  "https://cdn.dribbble.com/userupload/2917223/file/original-1586ed4f9ec248ef534919ac89c28976.png?compress=1&resize=752x"
);
const newOptionData = ref({});
const clickedItem = ref<any>();

const optionsCopy = computed(() => {
  return props.options;
});

const rowClickedHandler = (option: any) => {
  clickedItem.value = option;
};

const setNewOptionDataLabel = (newVal) => {
  const item = optionsCopy.value.find(
    (item) => item.connectionId === clickedItem.value.connectionId
  );
  const newOptionItem = newOptionData.value?.find(
    (item) => item.connectionId === clickedItem.value.connectionId
  );

  item.resources[0].label = newVal;
  newOptionItem.resources[0].label = newVal;
};

const setNewOptionDataColor = (option) => {
  const item = optionsCopy.value.find(
    (item) => item.connectionId === option.connectionId
  );

  item.type = color.value;
  item.colorHexa = color.value;
};

const editTableData = ({ key, value }) => {
  if (key.toLocaleLowerCase() === "label") {
    setNewOptionDataLabel(value);
  } else if (key.toLocaleLowerCase() === "type") {
    setNewOptionDataColor(value);
  }
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

    const item = optionsCopy.value.find(
      (item) => item.connectionId === clickedItem.value.connectionId
    );

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
      item["type"] = url.value;
      item["imageKey"] = data.data;
    } else reqDone.value = "failed";
  } catch (error) {
    console.error(error);
  } finally {
    reqLoading.value = false;
  }
};
const cancel = () => {
  url.value = null;
};

const log = (item): void => {};

onMounted(() => {
  newOptionData.value = optionsCopy.value;
});
watchEffect(() => {
  props.options?.resources;
});
</script>
<style lang="scss" scoped>
input[type="text"] {
  border: none;
  background: transparent;

  &:focus {
    outline: none;
  }
}
</style>
