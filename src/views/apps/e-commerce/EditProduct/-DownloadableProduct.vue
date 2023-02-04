<template>
  <div class="card card-flush pt-4">
    <div class="card-header py-0 border-0">
      <div class="card-title">
        <h2>Downloadable Product</h2>
      </div>
    </div>
    <div class="card-body pt-2">
      <div>
        <Dropdown
          :items="deliveryWays"
          :multiSelect="true"
          :outter-ids="selectedDeliveryWaysIds"
          bodyClasses="w-100 text-truncate text-capitalize"
          headClasses="fw-bold p-3 rounded-3 shadow-sm text-capitalize btn-lg mb-3"
          max-height="200px"
          @selectedItem="selectDeliveryWay"
        >
          <template #headerContent="{ item }">
            <span class="d-flex justify-content-between align-items-center">
              <span class="w-100 text-truncate">
                select your methods
                <small
                  class="text-muted"
                  v-if="
                    selectedDeliveryWaysIds && selectedDeliveryWaysIds.length
                  "
                >
                  ({{ selectedDeliveryWaysIds.length }})
                </small>
              </span>
              <strong>
                <i :class="item.isOpened ? 'bi-arrow-up' : 'bi-arrow-down'"></i>
              </strong>
            </span>
          </template>
          <template #bodyContent="{ item }">
            <div
              :style="[
                selectedDeliveryWaysIds.includes(item.id)
                  ? 'background-color: #1bc5bd; color: #fff;'
                  : '',
              ]"
              class="px-sm-5 py-sm-3 px-3 py-1 w-100 d-flex gap-2 align-items-center"
            >
              <div v-text="item.value" />
              <i
                v-if="selectedDeliveryWaysIds.includes(item.id)"
                class="bi bi-check text-white ms-auto"
                style="font-size: large"
              ></i>
            </div>
          </template>
        </Dropdown>
        <!-- Tags -->
        <div class="d-flex gap-3 flex-wrap my-4">
          <div
            v-for="(item, $index) in selectedDeliveryWays"
            :key="$index"
            class="badge badge-light-primary w-100 text-wrap align-items-start flex-column text-start"
          >
            <p v-text="item.value" class="mb-1 h5 text-primary" />
            <small v-text="item.description" />
          </div>
        </div>
      </div>
      <div style="height: 3px" class="bg-light rounded-pill my-7"></div>
      <div class="mb-3 d-flex gap-2 align-items-center">
        <span class="badge badge-light">
          {{
            files && files.length > 0
              ? `${files.length === 1 ? "one file" : `${files.length} Files`}`
              : "No files added yet. try to add one!"
          }}
        </span>
        <button
          v-if="hasDataChanges"
          @click="submitData(true)"
          type="button"
          class="btn bg-light-primary text-primary btn-hover-rise btn-sm rounded-pill"
        >
          Save Changes
        </button>
      </div>
      <div
        v-if="files"
        class="d-flex flex-wrap gap-5 py-3"
        :class="{ 'overflow-hidden h-150px': !seeAllFiles }"
      >
        <div
          @click="toggleAddNewFileDialog"
          class="file d-flex align-items-center flex-column p-3 bg-hover-light-success rounded-3"
        >
          <div class="image">
            <inline-svg src="/media/svg/files/upload.svg" />
          </div>
          <div class="text-success text-center">
            <p
              class="w-100px text-truncate fw-bold text-center py-1 my-0"
              title="File Name very very very long"
            >
              Add New One.
            </p>
            <small class="fw-bold"> click to add new file </small>
          </div>
        </div>
        <div
          v-for="(file, index) in files"
          :key="index"
          @click="toggleFileDetailsDialog(), setClickedFile(file)"
          class="file d-flex align-items-center flex-column p-3 bg-hover-light rounded-3"
        >
          <div class="image">
            <inline-svg src="/media/svg/files/file.svg" />
          </div>
          <div>
            <p
              class="w-100px text-truncate fw-bold py-1 my-0 text-center"
              title="File Name very very very long"
              v-text="file.resources[0].title"
            />
            <div class="d-flex flex-column text-center">
              <small class="fw-bold" v-text="file.fileType" />

              <small v-text="niceBytes(file.fileSize)" />
            </div>
          </div>
        </div>
      </div>
      <div class="my-3">
        <button
          v-if="files && files.length > 2"
          @click="seeAllFiles = !seeAllFiles"
          type="button"
          class="btn btn-text-success bg-light-success text-capitalize d-flex justify-content-center align-items-center gap-3 border-dashed border shadow-xs col-12 col-sm-4 mx-auto"
          :class="seeAllFiles ? 'bi-arrow-up-circle' : 'bi-arrow-down-circle'"
          v-text="seeAllFiles ? 'see less' : 'see all'"
        />
      </div>
      <!-- Add file -->
      <el-dialog v-model="addNewFileDialog" title="Add new file">
        <template #default>
          <section>
            <div class="mb-4">
              <tabs-duplicator
                :items="languages"
                active-tab-design="btn btn-bg-light btn-color-info rounded-3"
                tab-btn-classes="text-nowrap"
                @selectedItem="setSelectedLanguage"
                class="mb-3"
              >
                <template #label="{ item }">
                  <span>
                    {{ item.label }}
                  </span>
                </template>
              </tabs-duplicator>
              <section>
                <label for="fileResources" class="form-label">File Name</label>
                <input
                  v-if="selectedLanguage"
                  type="text"
                  class="form-control form-control-solid"
                  placeholder="File name"
                  id="fileResources"
                  v-model="resources[selectedLanguage.id]"
                />
              </section>
              <section class="my-4">
                <label for="fileDescriptionEditor" class="form-label">
                  File Description
                </label>
                <template
                  v-for="(languageEditor, $index) in languages"
                  :key="languageEditor.id"
                >
                  <keep-alive>
                    <div v-if="languageEditor.id === selectedLanguage.id">
                      <QuillEditor
                        v-model:content="fileDescription[selectedLanguage.id]"
                        :toolbar="editorOptions.toolbar"
                        contentType="html"
                        placeholder="File Description"
                        quill-discription
                        id="fileDescriptionEditor"
                      />
                    </div>
                  </keep-alive>
                </template>
              </section>
            </div>
            <div>
              <p class="form-label">Select a location for your file</p>
              <Dropdown
                @selectedItem="setSelectedFileLocation"
                :items="fileLocations"
                class="w-100"
                headClasses="fw-bold py-3 px-5 rounded-3 text-capitalize shadow-sm"
                bodyClasses=""
              >
                <template #headerContent="{ item }">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span
                      v-if="selectedFileLocation"
                      v-text="selectedFileLocation.value"
                    />
                    <span v-else v-text="'Select file Location'" />
                    <i class="bi bi-arrow-down"></i>
                  </div>
                </template>
                <template #bodyContent="{ item }">
                  <div
                    class="px-sm-5 py-sm-3 px-3 py-1 w-100 text-truncate text-capitalize"
                    :class="{
                      'bg-primary text-white':
                        item &&
                        selectedFileLocation &&
                        item.id === selectedFileLocation.id,
                    }"
                  >
                    {{ item.value }}
                  </div>
                </template>
              </Dropdown>
            </div>
            <div v-if="selectedFileLocation" class="mt-4">
              <section v-if="selectedFileLocation.code === 'ExternalHosting'">
                <label for="fileExternalLink" class="form-label my-3"
                  >Link URL</label
                >
                <input
                  type="text"
                  v-model="fileExternalLink"
                  id="fileExternalLink"
                  class="form-control form-control-solid"
                />
              </section>
              <section v-else>
                <div>
                  <input
                    @change="onUpload($event)"
                    type="file"
                    class="form-control"
                    style="max-width: 280px"
                    :disabled="uploading"
                  />
                </div>
              </section>
            </div>
            <!-- Errors -->
            <small
              v-if="!!fileErrorMessage"
              class="fw-bold text-danger"
              v-text="fileErrorMessage"
            />
            <small
              v-if="!!requestErrorMsg"
              class="fw-bold text-danger"
              v-text="requestErrorMsg"
            />
            <!-- end::Errors -->
            <div class="mt-7">
              <button
                type="button"
                @click="submitData(false)"
                class="btn btn-bg-light btn-hover-rise btn-icon-gray-900 btn-text-gray-900 me-2 mb-2"
                :disabled="!addFileFormValid || submittingData"
              >
                <span>push data</span>
                <span class="svg-icon svg-icon-1">
                  <inline-svg src="/media/icons/duotune/arrows/arr001.svg" />
                </span>
              </button>
            </div>
          </section>
        </template>
      </el-dialog>
      <!-- edit file -->
      <el-dialog
        v-model="fileDetailsDialog"
        :width="screenDimensions().availWidth > 480 ? '480px' : '95%'"
        title="Edit File Details"
      >
        <template #default>
          <section class="mx-auto" style="max-width: 480px">
            <div>
              <inline-svg src="/media/svg/files/file.svg" />
            </div>
            <!-- Content -->
            <div v-if="!!clickedFile" class="mt-4">
              <section
                v-if="clickedFile.resources && clickedFile.resources.length > 0"
              >
                <input
                  class="fw-bold form-control"
                  v-model="clickedFile.resources[0].title"
                  @input="hasDataChanges = true"
                />
                <div class="mt-3">
                  <QuillEditor
                    v-model:content="clickedFile.resources[0].description"
                    :toolbar="editorOptions.toolbar"
                    contentType="html"
                    placeholder="File Description"
                    quill-discription
                    @input="hasDataChanges = true"
                  />
                </div>
              </section>
              <div class="my-3">
                <p v-if="clickedFile && clickedFile.fileType">
                  <i class="bi bi-dot"></i>
                  <span> {{ clickedFile.fileType }} </span>
                </p>
                <p v-if="clickedFile && clickedFile.fileLastModifiedDate">
                  <i class="bi bi-dot"></i>
                  <span>
                    last modified date was
                    <strong>{{ clickedFile.fileLastModifiedDate }}</strong>
                  </span>
                </p>
              </div>
              <div v-if="hasDataChanges">
                <small class="fw-bold">
                  <strong class="text-info" style="font-size: 1rem">
                    Hey you!👋🏻
                  </strong>
                  <br />
                  <span>
                    don't forget! To Apply the changes, click save changes🤠
                  </span>
                </small>
              </div>
              <small
                v-if="!!requestErrorMsg"
                v-text="`${requestErrorMsg} 😓`"
                class="d-block my-3 fw-bold text-danger"
              />

              <div class="mt-5 row gap-2">
                <button
                  @click="downloadFile(clickedFile.fileKey)"
                  type="button"
                  class="btn bg-light-success btn-icon-success btn-text-success btn-hover-scale col-12"
                >
                  <span v-if="clickedFile.fileLoacation === '1'">
                    <span v-if="clickedFile.fileSize">
                      {{ niceBytes(clickedFile.fileSize) }}
                      <i class="bi bi-dot" style="font-size: 1rem"></i>
                    </span>
                    Download
                  </span>
                  <span v-else>
                    <i class="bi bi-share" style="font-size: 1rem"></i>
                    Visit
                  </span>
                </button>
                <button
                  @click="toggleConfirmationDialog"
                  type="button"
                  class="btn bg-light-danger text-danger btn-hover-scale col-12"
                  :disabled="submittingData"
                >
                  <i class="bi bi-trash3 text-danger"></i>
                  Remove
                </button>
                <button
                  v-if="hasDataChanges"
                  @click="submitData(true)"
                  type="button"
                  class="btn bg-light-primary text-primary btn-hover-scale col-12"
                  :disabled="submittingData"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </section>
        </template>
      </el-dialog>
      <!-- confirmation dialog -->
      <el-dialog v-model="confirmationDialog" title="" width="320px">
        <template #default>
          <div
            class="d-flex justify-content-center align-items-center flex-column gap-3"
          >
            <div class="text-danger h2">You will Remove these Data</div>
            <small class="text-muted fw-bold">
              this can't be reverted anymore
            </small>
            <div v-if="!!requestErrorMsg" class="mt-4">
              <small
                class="fw-bold bg-light-danger text-danger p-1 rounded-3"
                v-text="`${requestErrorMsg} 🤕`"
              />
            </div>
          </div>
        </template>
        <template #footer>
          <section v-if="!submittingData">
            <button
              @click="toggleConfirmationDialog"
              class="btn btn-text-dark me-1"
              type="button"
            >
              No, Cancel
            </button>
            <button
              @click="removeFile(clickedFile.id)"
              class="btn btn-text-danger me-1 bg-light-danger"
              type="button"
            >
              yes, delete
            </button>
          </section>
          <section
            v-else
            class="d-flex justify-content-center align-items-center"
          >
            <p class="user-select-none">
              deleting...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </p>
          </section>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import Dropdown from "@/components/Reusable/Dropdown.vue";
import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";

import Api from "@/utils/ApiHelper";
import { niceBytes, dateFormat, screenDimensions } from "@/utils/helpers";

import { computed, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
import { ref } from "@vue/reactivity";
import { onMounted } from "vue";
import { uuid } from "vue-uuid";
import { QuillEditor } from "@vueup/vue-quill";

const props = defineProps({
  product: {
    type: Object,
    default: {},
    required: true,
  },
});

const store = useStore();

const deliveryWays = computed(
  () => store.state.LookupQueries.digitalDeliveryWays
);
const selectedDeliveryWaysIds = ref<any[]>([]); //-> the selected items' IDs
const selectedDeliveryWays = ref<any[]>([]); //-> the final result of the selected items (what you're going to use in the template)
const findSelectedDiscountShops = (ids: Array<string | number> = []) => {
  selectedDeliveryWays.value = deliveryWays.value?.filter((item) =>
    ids?.includes(item.id)
  );
};
// where you receive the data from the dropdown component
const selectDeliveryWay = (selectedItemsCallback: any, isGlobal?: boolean) => {
  if (!isGlobal) {
    hasDataChanges.value = true;
  }
  selectedDeliveryWaysIds.value = selectedItemsCallback;
  findSelectedDiscountShops(selectedItemsCallback);
};

const files = ref<any[]>([]);
const filesBackup = ref<any[]>([]);

const seeAllFiles = ref();
const confirmationDialog = ref(false);
const toggleConfirmationDialog = () => {
  confirmationDialog.value = !confirmationDialog.value;
  requestErrorMsg.value = "";
};

const addNewFileDialog = ref(false);

const toggleAddNewFileDialog = () => {
  addNewFileDialog.value = !addNewFileDialog.value;
  requestErrorMsg.value = "";
};

const languages = computed(() => store.state.LookupQueries.languages?.data);
const selectedLanguage = ref();
const setSelectedLanguage = (lang: any) => {
  selectedLanguage.value = lang;
};
const hasDataChanges = ref(false);
const resources = ref({});
const fileDescription = ref({});
const editorOptions = ref({
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote"],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
  ],
});
const fileLocations = computed(
  () => store.state.LookupQueries.digitalProductFileLocation
);
const selectedFileLocation = ref();
const setSelectedFileLocation = (payload) => {
  selectedFileLocation.value = payload;
};
const baseImageURL = ref("https://mfproductimages.s3.amazonaws.com/");
const fileExternalLink = ref("");
const file = ref();
const fileType = ref();
const fileSize = ref();
const fileLastModifiedDate = ref();
const fileKey = ref();
const uploading = ref(false);
const fileErrorMessage = ref("");
const onUpload = async (event) => {
  try {
    uploading.value = true;
    file.value = event.target.files[0];
    fileType.value = event.target.files[0]?.type;
    fileSize.value = event.target.files[0]?.size;
    fileLastModifiedDate.value = dateFormat(
      event.target.files[0]?.lastModifiedDate
    );

    const fd = new FormData();
    fd.append("file", file.value);

    const reqData = {
      method: "post",
      url: "/ManageCommands/upload-file",
      payload: fd,
    };

    const { data }: any = await Api(reqData);
    if (data?.succeeded) {
      fileKey.value = data.data;
      fileErrorMessage.value = "";
    } else {
      fileErrorMessage.value = data.message;
    }
  } catch (error) {
    console.error(error);
  } finally {
    uploading.value = false;
  }
};
const clickedFile = ref<object>();
const setClickedFile = (file: object) => {
  clickedFile.value = file;
};
const fileDetailsDialog = ref(false);
const toggleFileDetailsDialog = () => {
  fileDetailsDialog.value = !fileDetailsDialog.value;
  requestErrorMsg.value = "";
};

watch(fileDetailsDialog, (newValue) => {
  if (!newValue) {
    setClickedFile({});
  }
});

const removeFile = (id) => {
  try {
    filesBackup.value = JSON.parse(JSON.stringify(files.value));
    files.value = files.value.filter((i: any) => i.id !== id);
    submitData(true, true);
  } catch (error) {
    console.error(error);
  }
};

const requestErrorMsg = ref("");
const submittingData = ref<boolean>(false);
const addFileFormValid = computed(() => {
  let resourcesValid = false;
  languages.value?.forEach((lang: any, index: number, array: any[]) => {
    resourcesValid =
      array.length === Object.keys(resources.value).length &&
      !!resources.value[lang.id];
  });

  let descriptionValid = false;
  languages.value?.forEach((lang: any, index: number, array: any[]) => {
    descriptionValid =
      array.length === Object.keys(fileDescription.value).length &&
      !!fileDescription.value[lang.id];
  });

  const fileValid = !!fileKey.value || !!fileExternalLink.value;

  return resourcesValid && descriptionValid && fileValid;
});
const submitData = async (isEdit: boolean = false, isDelete?: boolean) => {
  try {
    submittingData.value = true;

    let resourcesFinal: any[] = [];
    let fileData;
    let payload: any = {
      downloadableDigitalProducts: [],
      digitalProductDeliveryWays: selectedDeliveryWaysIds.value,
    };

    if (!isEdit) {
      fileData = {
        id: uuid.v4(),
        fileKey: fileKey.value,
        fileLocationURL: fileExternalLink.value,
        resources: resourcesFinal,
        fileSize: fileSize.value,
        fileType: fileType.value,
      };

      Object.keys(resources.value).forEach((key: string) => {
        resourcesFinal.push({
          languageId: key,
          title: resources.value[key],
          description: fileDescription.value[key],
        });
      });

      payload.downloadableDigitalProducts = [...files.value, fileData];

      files.value.push(fileData);
    } else {
      payload.downloadableDigitalProducts = files.value;
    }

    payload["id"] = props.product?.id;

    const reqData = {
      url: "/ProductCommands/update-product-downloadable-digital-products",
      method: "post",
      payload,
    };

    const { data }: any = await Api(reqData);
    if (data.succeeded) {
      filesBackup.value = files.value;
      hasDataChanges.value = false;
      confirmationDialog.value = false;
      requestErrorMsg.value = "";
      if (isDelete) fileDetailsDialog.value = false;
      if (!isEdit) {
        const editor: HTMLElement = document.querySelector(
          ".el-overlay .ql-editor"
        )!;
        if (!!editor) editor.innerHTML = "<p><br /></p>";
        fileDetailsDialog.value = false;
        addNewFileDialog.value = false;
        setSelectedFileLocation(null);
        resources.value = {};
        fileDescription.value = {};
        fileKey.value = "";
        fileExternalLink.value = "";
        fileSize.value = "";
        fileType.value = "";
      }
    } else {
      requestErrorMsg.value = data.message;
      files.value = filesBackup.value;
    }
  } catch (error) {
    console.error(error);
    requestErrorMsg.value = "something went wrong!";
    files.value = filesBackup.value;
  } finally {
    submittingData.value = false;
  }
};

const downloadFile = (url) => {
  const a = document.createElement("a");
  a.href = url;
  a.download = url.split("/").pop();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

watch(languages, (newValue) => {
  if (newValue) {
    if (newValue && newValue.length > 0) {
      setSelectedLanguage(newValue[0]);
      newValue.forEach((lang: any) => {
        fileDescription.value[lang.id] = "";
      });
    }
  }
});
watch(files, (newValue) => {
  if (filesBackup.value?.length === 0) {
    filesBackup.value = newValue;
  }
});

const resetData = () => {
  if (props.product) {
    selectDeliveryWay(props.product.digitalProductDeliveryWays, true);
    files.value = props.product.downloadableDigitalProducts;
    filesBackup.value = props.product.downloadableDigitalProducts;

    if (languages.value && languages.value.length > 0) {
      setSelectedLanguage(languages.value[0]);
      languages.value.forEach((lang: any) => {
        fileDescription.value[lang.id] = "";
      });
    }
  }
};

onMounted(() => {
  resetData();
});
watch(
  () => props.product,
  (newVal) => {
    resetData();
  }
);
</script>
<style scoped>
.editable-input {
  all: unset;
}
</style>
