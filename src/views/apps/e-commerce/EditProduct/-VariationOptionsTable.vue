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
        <tr v-for="option in options" :key="option.connectionId">
          <td
            class="text-truncate position-relative"
            style="min-width: 100px; max-width: 140px"
          >
            <div
              class="d-flex align-items-center justify-content-start"
              v-text="getResource(option.resources)"
            />
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
                </div>
                <div
                  v-else
                  class="d-flex justify-content-between align-items-center gap-2 w-100"
                >
                  <div>
                    <img
                      :src="optionImage(option)"
                      class="rounded-circle"
                      height="30"
                      width="30"
                      style="object-fit: cover"
                      @click="imageViewerModalHandler(optionImage(option))"
                    />
                  </div>
                </div>
              </div>
              <div v-else>---</div>
            </div>
          </td>
          <td>
            <div class="w-100 d-flex justify-content-end">
              <button
                class="btn btn-text-danger btn-sm text-nowrap"
                type="button"
                @click="askToRemoveOption(option.connectionId)"
              >
                <i class="bi bi-trash text-danger"></i>
              </button>
              <button
                @click="setEditTargetedOption(option)"
                class="btn btn-sm"
                type="button"
              >
                <i class="bi bi-pencil-square text-info"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit Option Dialog -->
    <Modal
      v-model:modal-value="editOptionDialog"
      :close="editOptionDialogToggle"
      box-width-class="dialog-width"
    >
      <div v-if="!!clickedItem" class="p-3">
        <EditVariationOption
          title="Edit Variation"
          :close="editOptionDialogToggle"
          resources-title="Name of new option"
          prices-title="Add an extra price"
          :item="clickedItem"
          type="edit"
          @variation-option-data="updateOption"
        />
      </div>
    </Modal>
    <MazDialogPromise
      :data="{
        title: 'Delete option',
        message: 'Are you sure to delete this user ?',
      }"
      identifier="one"
    />
    <MazDialogPromise identifier="two">
      <template #title> Really delete this user ?</template>
      <template #default>
        Are you really really sure to delete this user ?
      </template>
    </MazDialogPromise>

    <MazDialog v-model="removeOptionConfirmDialog">
      <template #title> User deleted</template>
      <template #default> User is deleted !</template>
    </MazDialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { onMounted } from "@vue/runtime-core";
import { useToast } from "maz-ui";
import MazDialogPromise, {
  useMazDialogPromise,
} from "maz-ui/components/MazDialogPromise";

import Modal from "@/components/Reusable/Modal.vue";
import MazDialog from "maz-ui/components/MazDialog";

import EditVariationOption from "./-EditVariationOption.vue";
import { useStore } from "vuex";
import { getResource } from "@/utils/helpers";

const store = useStore();
const { showDialogAndWaitChoice } = useMazDialogPromise();
const { toast } = useToast();

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
  imageViewerModalHandler: {
    type: Function,
    required: true,
  },
  languages: {
    type: Array,
    required: true,
  },
});

const placeholderImage = ref(
  "https://cdn.dribbble.com/userupload/2917223/file/original-1586ed4f9ec248ef534919ac89c28976.png?compress=1&resize=752x"
);

const optionImage = (option) => {
  console.log(option);
  const baseURL = "https://mfproductimages.s3.amazonaws.com/";
  return option?.image && option?.image.includes("http")
    ? option.image
    : `${baseURL}${option.image}` || placeholderImage;
};

const newOptionData = ref();

const removeOptionConfirmDialog = ref(false);
const askToRemoveOption = async (id) => {
  await showDialogAndWaitChoice("one");
  await showDialogAndWaitChoice("two");

  props.removeOption(id);
};

const clickedItem = ref<any>();

const setEditTargetedOption = (option: any) => {
  clickedItem.value = option;
  editOptionDialogToggle();
};
const editOptionDialog = ref(false);

const editOptionDialogToggle = () => {
  editOptionDialog.value = !editOptionDialog.value;
};
watch(editOptionDialog, (newV) => {
  if (!newV) {
    // reset the clicked item
    clickedItem.value = {};
  }
});

const updateOption = async (optionData) => {
  try {
    const item = props.options.find(
      (item) => item.connectionId === optionData.connectionId
    );
    item["resources"] = optionData["resources"] || [];
    item["image"] = optionData["image"] || "";
    item["colorHexa"] = optionData["colorHexa"] || "";
    placeholderImage.value = optionData["imgURL"];
    await toast.success("Done, press save changes to submit this change", {
      position: "bottom",
      timeout: 5000,
    });
  } catch (error) {
    await toast.error("Something went wrong! please try again later", {
      position: "bottom",
      timeout: 5000,
    });

    console.error(error);
  }

  editOptionDialogToggle();
};

onMounted(() => {
  newOptionData.value = props.options;
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
