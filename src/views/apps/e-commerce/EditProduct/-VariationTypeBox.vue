<template>
  <div class="card-body py-0">
    <div
      v-if="
        !langsMounting &&
        selectedLang &&
        selectedOptionLabelLang &&
        selectionTypes
      "
    >
      <div class="mt-5">
        <div
          class="d-flex justify-content-between align-items-center gap-2 flex-wrap mt-2"
        >
          <h4 class="mt-5">
            {{ index + 1 }}
            <span class="bullet"></span>
          </h4>

          <div class="d-flex gap-2">
            <button
              class="btn btn-sm btn-light-danger rounded-3 text-uppercase"
              type="button"
              @click="removeTypeConfirmationHandler(index)"
            >
              <i class="bi bi-trash" />
              remove type
            </button>
            <div
              v-if="typeLabel && recentOptions.length > 0 && componentUpdated"
              class="d-flex gap-1"
            >
              <button
                :disabled="
                  saveChangesClicked ||
                  saveChangesClicked === 'done' ||
                  saveChangesClicked === 'loading'
                "
                class="btn btn-sm btn-light-success text-uppercase rounded-3"
                @click="editData('edit'), saveChangesBtn()"
                type="button"
              >
                <div v-if="!saveChangesClicked">
                  <i class="bi bi-pen" style="font-size: 1rem" /> save changes
                </div>
                <div v-else>
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
                  Editing...
                </div>
              </button>
            </div>
          </div>
        </div>
        <tabs-duplicator :items="langs.data" @selectedItem="setSelectedLang">
          <template #label="{ item }">
            <span>
              {{ item.label }}
            </span>
          </template>
        </tabs-duplicator>
        <keep-alive>
          <div v-for="(lang, $index) in langs.data" :key="$index">
            <input-field
              v-if="lang.id === selectedLang.id"
              v-model="typeLabel[selectedLang.id]"
              class="my-4"
              placeholder="Name"
              @input="setTypeLabels"
            />
          </div>
        </keep-alive>
        <div class="my-4">
          <div>
            <div
              class="d-flex align-items-center gap-5 border border-primary border-dashed rounded bg-light-primary h-80px w-100 px-5 cursor-pointer"
              @click="$refs.fileUpload.click()"
            >
              <div class="w-40px">
                <el-icon v-if="!url" class="d-flex align-items-center">
                  <i
                    class="bi-file-earmark-arrow-up text-primary"
                    style="font-size: 3rem"
                  ></i>
                </el-icon>
                <img
                  v-else
                  :src="url"
                  class="w-100 img-fluid rounded shadow-lg"
                />
              </div>
              <div class="text-start d-flex ps-3">
                <strong v-if="!uploadMediaDone && !uploadMediaLoading">
                  Show me your skills in picking images up!
                  <span style="font-size: 1.2rem">😉</span>
                </strong>
                <strong v-else-if="uploadMediaLoading">
                  <span
                    class="spinner-border spinner-border-sm align-middle text-success"
                  ></span>
                  <span class="ms-1">
                    Please wait while we upload your image... 😁
                  </span>
                </strong>
                <strong v-else-if="uploadMediaDone">
                  <h2>We're Done😍</h2>
                  <small class="text-muted">
                    Click to change the image if you want to!
                  </small>
                </strong>
              </div>
            </div>
          </div>
          <input
            ref="fileUpload"
            accept=".png, .jpg, .jpeg"
            hidden
            type="file"
            @change="onFileSelected($event)"
          />
        </div>
        <div class="row">
          <div class="col-sm-6 col-12">
            <Dropdown
              :items="selectionTypes"
              bodyClasses="w-100 text-truncate text-capitalize"
              headClasses="fw-bold p-3 rounded-3 shadow-sm text-capitalize btn-lg mb-8"
              maxHeight="200px"
              @selectedItem="setSelectionType"
            >
              <template #headerContent="{ item }">
                <span class="d-flex justify-content-between align-items-center">
                  <span v-if="selectedSelectionType">
                    {{ selectedSelectionType.value }}
                  </span>
                  <span v-else> Select Selection Type </span>
                  <strong>
                    <i
                      :class="item.isOpened ? 'bi-arrow-up' : 'bi-arrow-down'"
                    ></i>
                  </strong>
                </span>
              </template>
              <template #bodyContent="{ item }">
                <span
                  v-if="!selectedSelectionType"
                  class="px-sm-5 py-sm-3 px-3 py-1 d-flex justify-content-between align-center"
                >
                  {{ item.value }}
                </span>
                <span
                  v-else
                  :class="{
                    'bg-primary text-white':
                      item.id === selectedSelectionType.id,
                  }"
                  class="px-sm-5 py-sm-3 px-3 py-1 d-flex justify-content-between align-center"
                >
                  {{ item.value }}
                </span>
              </template>
            </Dropdown>
          </div>
          <div class="col-sm-6 col-12">
            <Dropdown
              :disabled="recentOptions.length > 0"
              :items="valueTypes"
              bodyClasses="w-100 text-truncate text-capitalize"
              headClasses="fw-bold p-3 rounded-3 shadow-sm text-capitalize btn-lg mb-8"
              maxHeight="200px"
              @selectedItem="setValueType"
            >
              <template #headerContent="{ item }">
                <span class="d-flex justify-content-between align-items-center">
                  <span v-if="selectedValueType">
                    {{ selectedValueType.value }}
                  </span>
                  <span v-else> Select Value Type </span>
                  <strong>
                    <i
                      :class="item.isOpened ? 'bi-arrow-up' : 'bi-arrow-down'"
                    ></i>
                  </strong>
                </span>
              </template>
              <template #bodyContent="{ item }">
                <span
                  v-if="!selectedValueType"
                  class="px-sm-5 py-sm-3 px-3 py-1 d-flex justify-content-between align-center"
                >
                  {{ item.value }}
                </span>
                <span
                  v-else
                  :class="{
                    'bg-primary text-white': item.id === selectedValueType.id,
                  }"
                  class="px-sm-5 py-sm-3 px-3 py-1 d-flex justify-content-between align-center"
                >
                  {{ item.value }}
                </span>
              </template>
            </Dropdown>
          </div>
          <div class="col-sm-6 col-12">
            <input-field
              v-model.number="orderOption"
              inputType="number"
              placeholder="Order options"
            />
          </div>
          <div class="col-sm-6 col-12">
            <input-field v-model="code" placeholder="Code" />
          </div>
        </div>
        <!--? Options Block -->
        <div class="">
          <label class="form-label">Options</label>
          <div v-if="recentOptions && recentOptions.length > 0">
            <VariationOptionsTable
              :editOption="editOption"
              :isReadonly="isReadonly"
              :mutateIsReadonly="mutateIsReadonly"
              :options="recentOptions"
              :removeOption="removeOption"
              :typeId="id"
              :imageViewerModalHandler="imageViewerModalHandler"
            />
          </div>
          <div v-else>
            <div class="text-center">
              <span class="text-muted">No options added yet</span>
            </div>
          </div>

          <label class="form-label">Add Options:</label>
          <!-- option divs -->
          <div>
            <OptionsDivs
              :activeValueType="activeValueType"
              :addOption="addOption"
              :langs="langs.data"
              :selectedOptionLabelLang="selectedOptionLabelLang"
              :setSelectedOptionLabelLang="setSelectedOptionLabelLang"
              :imageViewerModalHandler="imageViewerModalHandler"
            />
          </div>
        </div>
      </div>
      <div
        class="rounded-pill mt-10"
        style="background-color: lavender; padding: 2px 0"
      ></div>
    </div>
    <div v-else class="p-5 d-flex justify-content-center align-items-center">
      <img src="@/assets/content-loading.gif" width="300" />
    </div>

    <!-- Image Viewer -->
    <ImageViewer
      v-model:value="imageViewerModal"
      :handler="imageViewerModalHandler"
    >
      <img :src="clickedImage" class="image-viewer" />
    </ImageViewer>
  </div>
</template>
<script lang="ts" setup>
import { uuid } from "vue-uuid";
import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";
import InputField from "@/components/Reusable/InputField.vue";
import Dropdown from "@/components/Reusable/Dropdown.vue";
import ImageViewer from "@/components/Reusable/ImageViewer.vue";
import OptionsDivs from "./-OptionsDivs.vue";
import VariationOptionsTable from "./-VariationOptionsTable.vue";
import { useStore } from "vuex";
import {
  computed,
  nextTick,
  onMounted,
  onUpdated,
  ref,
  watchEffect,
} from "vue";
import Api from "@/utils/ApiHelper";

const store = useStore();

const emit = defineEmits(["options", "addNewVariation", "dataValidate"]);
const props = defineProps([
  "id",
  "index",
  "removeTypeConfirmationHandler",
  "editData",
]);

const variationsDataTypes = computed(
  () => store.state.UpdateProduct.variationData["productVariationTypes"]
);

// Name
const componentUpdated = ref(false);
const langsMounting = ref(false);
const marketLanguages = computed(
  () => store.state.MarketModule.market?.languages
);
const langs = computed(() => {
  if (store.state.LookupQueries.languages && marketLanguages.value) {
    const data = store.state.LookupQueries.languages.data?.filter((lang) =>
      marketLanguages.value.includes(lang.id)
    );

    return { data };
  }
});
const typeLabel = ref({});
const selectedLang = ref(null);

const setSelectedLang = (payload: any): void => {
  selectedLang.value = payload;
};
const resources = ref<any[]>([]);

const setTypeLabels = () => {
  const localResources: any[] = [];
  Object.keys(typeLabel.value).forEach((labelId) => {
    localResources.push({
      languageId: labelId,
      label: typeLabel.value[labelId],
      description: "",
    });
  });

  resources.value = localResources;
  emit("addNewVariation", {
    id: variationsDataTypes.value[props.index]?.id || null,
    recentOptions: recentOptions.value,
    resources: resources.value,
  });
};

// Selection Type
const selectionTypes = computed(
  () => store.state.LookupQueries.productVariationsSelectionControlTypes
);
const selectedSelectionType = ref();

const setSelectionType = (payload: any): void => {
  selectedSelectionType.value = payload;
};

// Value Types
const valueTypes = computed(
  () => store.state.LookupQueries.variationValueTypes
);
const selectedValueType = ref();
const activeValueType = ref();

const setValueType = (payload: any): void => {
  selectedValueType.value = payload;
  if (+payload.id === 2) {
    activeValueType.value = "color";
  } else if (+payload.id === 3) {
    activeValueType.value = "image";
  } else {
    activeValueType.value = "label";
  }
};

// type image
const photo = ref();
const url = ref();
const uploadMediaDone = ref<any>(false);
const uploadMediaLoading = ref<any>(false);
const typeImageKey = ref();

const onFileSelected = (event) => {
  uploadMediaDone.value = false;
  photo.value = event.target.files[0];
  url.value = URL.createObjectURL(photo.value);

  onUpload();
};

const onUpload = async () => {
  try {
    uploadMediaLoading.value = true;
    const fd = new FormData();
    fd.append("file", photo.value);

    const reqData = {
      method: "post",
      url: "/ManageCommands/upload-file",
      payload: fd,
    };

    const { data } = await Api(reqData);
    if (data?.succeeded) {
      uploadMediaDone.value = true;
      onUploadMediaDone(data.data);
    } else uploadMediaDone.value = "failed";
  } catch (error) {
    console.error(error);
  } finally {
    uploadMediaLoading.value = false;
  }
};

const onUploadMediaDone = (key: string) => {
  typeImageKey.value = key;
  if (typeImageKey.value) {
    emit("addNewVariation", {
      id: variationsDataTypes.value[props.index]?.id || null,
      resources: resources.value,
      typeImageKey: typeImageKey.value,
      order: orderOption.value,
      code: code.value,
      selectionControlTypeId: selectedSelectionType.value?.id || null,
      valueTypeId: selectedValueType.value?.id || null,
      options: recentOptions.value,
    });
  }
};

// Order
const orderOption = ref("");

// code
const code = ref("");

// Options
const recentOptions = ref<any>([]); // the current options

const selectedOptionLabelLang = ref(null);

const setSelectedOptionLabelLang = (payload: any): void => {
  selectedOptionLabelLang.value = payload;
};
const addOption = (optionData: object): void => {
  const payload = {
    connectionId: uuid.v4(),
    ...optionData,
  };
  recentOptions.value.push(payload);

  emit("addNewVariation", {
    id: variationsDataTypes.value[props.index]?.id || null,
    resources: resources.value,
    order: orderOption.value,
    code: code.value,
    selectionControlTypeId: selectedSelectionType.value?.id || null,
    valueTypeId: selectedValueType.value?.id || null,
    options: recentOptions.value,
  });
};
const removeOption = (optionId: string): void => {
  const index = recentOptions.value.findIndex(
    (option) => option.connectionId === optionId
  );
  if (index > -1) {
    if (recentOptions.value.length > 1) {
      recentOptions.value.splice(index, 1);
      emit("addNewVariation", {
        id: variationsDataTypes.value[props.index]?.id || null,
        resources: resources.value,
        order: orderOption.value,
        code: code.value,
        selectionControlTypeId: selectedSelectionType.value?.id || null,
        valueTypeId: selectedValueType.value?.id || null,
        options: recentOptions.value,
      });
    } else {
      props.removeTypeConfirmationHandler(props.index, true);
    }
  }
};

const saveChangesClicked = ref<any>(false);

const saveChangesBtn = () => {
  saveChangesClicked.value = true;
  setTimeout(() => {
    saveChangesClicked.value = "loading";
  }, 500);
  setTimeout(() => {
    saveChangesClicked.value = "done";
  }, 1000);
  setTimeout(() => {
    saveChangesClicked.value = false;
  }, 1200);
};

const isReadonly = computed(() => store.state.UpdateProduct.isReadonly);
const mutateIsReadonly = (payload: boolean) =>
  store.commit("SET_IS_READONLY", payload);

const editOption = (optionData: any): void => {
  const index = recentOptions.value.findIndex(
    (option) => option.connectionId === optionData.connectionId
  );
  if (index > -1) {
    recentOptions.value[index] = optionData;
    emit("addNewVariation", {
      id: variationsDataTypes.value[props.index]?.id || null,
      resources: resources.value,
      order: orderOption.value,
      code: code.value,
      selectionControlTypeId: selectedSelectionType.value?.id || null,
      valueTypeId: selectedValueType.value?.id || null,
      options: recentOptions.value,
    });
  }
  props.editData("edit");
};

const imageViewerModal = ref(false);
const clickedImage = ref<string>("");
const imageViewerModalHandler = (imagePath?: string): void => {
  if (!!imagePath) {
    clickedImage.value = imagePath;
  } else {
    clickedImage.value = "";
  }
  imageViewerModal.value = !imageViewerModal.value;
};

const dataValidate = () => {
  if (code.value && selectedValueType.value && orderOption.value) {
    emit("dataValidate", true);
  } else {
    emit("dataValidate", false);
  }
};
const emitForm = () => {
  // connect it with the store
  const payload = {
    id: variationsDataTypes.value[props.index]?.id || null,
    resources: resources.value,
    order: orderOption.value,
    code: code.value,
    selectionControlTypeId: selectedSelectionType.value?.id || null,
    valueTypeId: selectedValueType.value?.id || null,
    options: recentOptions.value,
  };
  emit("addNewVariation", payload);
  store.commit("SET_VARIATION_FROM_DATA", payload);
};

onMounted(() => {
  if (langs.value && Object.keys(langs.value).length > 0) {
    langsMounting.value = false;
    selectedLang.value = langs.value.data[0];
    selectedOptionLabelLang.value = langs.value.data[0];
  }
  if (variationsDataTypes.value) {
    const type = variationsDataTypes.value[props.index];
    if (type) {
      if (
        Object.keys(typeLabel.value).length === 0 &&
        resources.value.length === 0
      ) {
        resources.value = type.resources;
        resources.value?.forEach((el) => {
          typeLabel.value[el.languageId] = el.label;
        });
      }

      // selection control types
      const selectionControlType = selectionTypes.value?.find(
        (item) => item.id === type["selectionControlTypeId"]
      );
      setSelectionType(selectionControlType);

      // value Type
      const valueType = valueTypes.value?.find(
        (item) => item.id === type["valueTypeId"]
      );
      setValueType(valueType);
      orderOption.value = type["order"];
      code.value = type["code"];

      recentOptions.value = type["options"];
    }
  }
});
watchEffect(() => {
  dataValidate();
  emitForm();

  if (
    langs.value &&
    Object.keys(langs.value).length > 0 &&
    !selectedLang.value &&
    !selectedOptionLabelLang.value
  ) {
    langsMounting.value = false;
    selectedLang.value = langs.value?.data[0];
    selectedOptionLabelLang.value = langs.value?.data[0];
  }
});

nextTick(() => {
  dataValidate();
  emitForm();
  componentUpdated.value = true;
});

onUpdated(() => {
  dataValidate();
  emitForm();
});
</script>