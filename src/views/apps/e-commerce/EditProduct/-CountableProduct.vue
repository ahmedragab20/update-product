<template>
  <div class="card card-flush pt-4">
    <div class="card-header py-0 border-0">
      <div class="card-title">
        <h2>Countable Product</h2>
      </div>
    </div>
    <div class="card-body">
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
                v-if="selectedDeliveryWaysIds && selectedDeliveryWaysIds.length"
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
      <!-- Add Details -->
      <div class="d-flex justify-content-end w-100">
        <button
          type="button"
          class="btn btn-light-primary btn-sm"
          @click="openAddDetailsModal"
        >
          + Add details
        </button>
      </div>
      <!-- Table -->
      <table
        v-if="detailsTable && detailsTable.length > 0"
        class="table table-row-dashed table-row-gray-300 gy-5"
      >
        <thead>
          <tr class="fw-bolder fs-5 text-gray-800">
            <th class="w-75">Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(text, index) in detailsTable" :key="index">
            <td>
              <div v-html="text.details" />
            </td>
            <td>
              <div class="d-flex align-items-center gap-2">
                <button
                  type="button"
                  class="btn bg-light-info text-info btn-sm rounded-3 bi bi-pen"
                  @click="updateClickedIndex(index), setEditModalData(text)"
                />
                <button
                  type="button"
                  class="btn bg-light-danger btn-sm rounded-3 text-danger bi bi-trash3"
                  @click="updateClickedIndex(index), toggleConfirmationDialog()"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="fw-boldest text-muted text-center my-5 h3">
        No Details 🤕
      </div>
      <div
        v-if="!!updateCountableProductErrorMsg"
        class="text-danger"
        v-text="`${updateCountableProductErrorMsg} 🥲`"
      />
      <SaveChangeBtn
        :btnSubmit="updateCountableProduct"
        :elChanged="showSaveChanges"
        :elLoading="savingData"
        :no-cancel="true"
      />

      <!-- Add details modal -->
      <el-dialog v-model="detailsModal" title="Details">
        <template #default>
          <div>
            <Editor>
              <template #upper></template>
              <template #fields>
                <keep-alive>
                  <div>
                    <QuillEditor
                      v-model:content="details"
                      :toolbar="editorOptions.toolbar"
                      contentType="html"
                      placeholder="Type your details"
                      quill-discription
                    />
                  </div>
                </keep-alive>
              </template>
            </Editor>
            <p v-if="!!errorMsg" class="text-danger" v-text="errorMsg" />
          </div>
        </template>
        <template #footer>
          <button
            @click="commitDetails"
            class="btn btn-text-primary me-1 bg-light-primary"
          >
            done
          </button>
        </template>
      </el-dialog>
      <!-- confirmation dialog -->
      <el-dialog v-model="confirmationDialog" title="">
        <template #default>
          <div
            class="d-flex justify-content-center align-items-center flex-column gap-3"
          >
            <div class="text-danger h2">You will Remove these Data</div>
            <small class="text-muted fw-bold">
              this can't be reverted anymore
            </small>
          </div>
        </template>
        <template #footer>
          <button
            @click="toggleConfirmationDialog"
            class="btn btn-text-dark me-1"
            type="button"
          >
            No, Cancel
          </button>
          <button
            @click="deleteRowData"
            class="btn btn-text-danger me-1 bg-light-danger"
            type="button"
          >
            yes, delete
          </button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import Dropdown from "@/components/Reusable/Dropdown.vue";
import Editor from "@/components/Reusable/Editor.vue";
import SaveChangeBtn from "./-SaveChangeBtn.vue";

import { QuillEditor } from "@vueup/vue-quill";
import { ref } from "@vue/reactivity";
import { computed, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
import { onMounted, unref } from "vue";
import Api from "@/utils/ApiHelper";

const props = defineProps(["product"]);

const store = useStore();
const showSaveChanges = ref(false);
const savingData = ref<boolean | string>(false);
const detailsModal = ref(false);
const deliveryWays = computed(
  () => store.state.LookupQueries.digitalDeliveryWays
);
const selectedDeliveryWaysIds = ref<any[]>([]); //-> the selected items' IDs
const selectedDeliveryWays = ref<any[]>([]); //-> the final result of the selected items (what you're going to use in the template)
const clickedRowIndex = ref<any>(null);
const findSelectedDeliveryWays = (ids: Array<any> = []) => {
  selectedDeliveryWays.value = deliveryWays.value?.filter((item) =>
    ids?.includes(item.id)
  );
};
// where you receive the data from the dropdown component
const selectDeliveryWay = (selectedItemsCallback: any, isGlobal?: boolean) => {
  if (!isGlobal) {
    showSaveChanges.value = true;
  }
  selectedDeliveryWaysIds.value = selectedItemsCallback;
  findSelectedDeliveryWays(selectedItemsCallback);
};

const detailsTable = ref<any[]>([]);
const detailsTableBackup = ref<any[]>([]);
const details = ref("");
const editorOptions = ref({
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ],
});
const errorMsg = ref("");

const commitDetails = () => {
  const editor: HTMLElement = document.querySelector(".el-overlay .ql-editor")!;

  const index = unref(clickedRowIndex);
  if (!!details.value && !!editor.textContent) {
    if (!index && index !== 0) {
      detailsTable.value.push({
        id: null,
        details: details.value,
      });
    } else {
      editDetails(index);
    }

    errorMsg.value = "";
    editor.textContent = "";
    details.value = "";
    detailsModal.value = false;
  } else {
    errorMsg.value = `you can't add an empty message🙃`;
  }

  showSaveChanges.value = true;
};
const updateClickedIndex = (index: any) => {
  clickedRowIndex.value = index;
};
const openAddDetailsModal = () => {
  detailsModal.value = true;

  const editor: HTMLElement = document.querySelector(".el-overlay .ql-editor")!;
  details.value = "";
  if (!!editor) editor.innerHTML = "<p><br /></p>";
};
const setEditModalData = (text: { id: any; details: string }) => {
  detailsModal.value = true;
  details.value = text.details;

  const editor: HTMLElement = document.querySelector(".el-overlay .ql-editor")!;
  if (!!editor) editor.innerHTML = text.details;
};
const editDetails = (index: number) => {
  const target: { id: any; details: string } = detailsTable.value.find(
    (item, i, arr) => i === index
  );

  target.details = details.value;

  showSaveChanges.value = true;
};

const confirmationDialog = ref(false);
const toggleConfirmationDialog = () => {
  confirmationDialog.value = !confirmationDialog.value;
};
const deleteRowData = () => {
  detailsTableBackup.value = JSON.parse(JSON.stringify(detailsTable.value));

  const index = unref(clickedRowIndex);

  detailsTable.value = detailsTable.value.filter((item, i, arr) => i !== index);

  showSaveChanges.value = true;

  toggleConfirmationDialog();
};
const updateCountableProductErrorMsg = ref("");
const updateCountableProduct = async () => {
  try {
    savingData.value = true;
    const payload = {
      id: props.product?.id,
      countableDigitalProducts: [...detailsTable.value],
      digitalProductDeliveryWays: [...selectedDeliveryWaysIds.value],
    };
    const reqData = {
      method: "post",
      url: "/ProductCommands/update-product-countable-digital-products",
      payload,
    };
    const { data }: any = await Api(reqData);
    if (data.succeeded) {
      detailsTableBackup.value = detailsTable.value;
      savingData.value = "done";
      updateCountableProductErrorMsg.value = "";
      showSaveChanges.value = false;
    } else {
      updateCountableProductErrorMsg.value = data.message;
      savingData.value = false;
      detailsTable.value = detailsTableBackup.value;
    }
  } catch (err) {
    savingData.value = false;
    console.error(err);
  } finally {
    savingData.value = false;
  }
};

watch(detailsModal, (newV, oldV) => {
  if (!newV) {
    updateClickedIndex(null);
  }
});
watch(confirmationDialog, (newV, oldV) => {
  if (!newV) {
    updateClickedIndex(null);
  }
});

watch(detailsTable, (newValue) => {
  if (detailsTableBackup.value?.length === 0) {
    detailsTableBackup.value = newValue;
  }
});

const resetData = () => {
  if (props.product) {
    selectDeliveryWay(props.product.digitalProductDeliveryWays, true);
    detailsTable.value = props.product.countableDigitalProducts;
    detailsTableBackup.value = props.product.countableDigitalProducts;
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
