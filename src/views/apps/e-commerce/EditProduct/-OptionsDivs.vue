<template>
  <!-- Action -->
  <div class="d-flex align-items-center gap-2 flex-wrap my-4">
    <!-- Add validation to it -->
    <div>
      <MazBtn
        class="px-5"
        color="transparent"
        size="xs"
        rounded
        :loading="false"
        @click="addOptionDialogToggle"
      >
        <div class="d-flex justify-content-center align-items-center gap-2">
          <MazIcon name="plus-sm" size="1.5rem" class="mt-1" />
          Add new option
        </div>
      </MazBtn>
    </div>
    <Modal
      v-model:modal-value="addOptionDialog"
      :close="addOptionDialogToggle"
      box-width-class="dialog-width"
    >
      <AddVariationOption
        class="p-3"
        title="Add Variation"
        :close="addOptionDialogToggle"
        resources-title="Name of new option"
        prices-title="Add an extra price"
        :type="activeValueType"
        :valid="false"
        :value-types="activeValueType"
        @variation-option-data="updateOption"
      />
    </Modal>
  </div>
</template>

<script lang="ts" setup>
// import Api from "@/utils/ApiHelper";

import AddVariationOption from "./-AddVariationOption.vue";
import Modal from "@/components/Reusable/Modal.vue";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

import MazBtn from "maz-ui/components/MazBtn";
import MazIcon from "maz-ui/components/MazIcon";
import { ref } from "@vue/reactivity";

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

const addNewOptionValid = computed(() => {
  return true;
});
const addOptionDialog = ref(false);
const addOptionDialogToggle = () => {
  addOptionDialog.value = !addOptionDialog.value;
};
const updateOption = (optionData) => {
  console.log({ optionData });
};
const log = (...logs) => {
  console.log(
    "%cLabels",
    "color: pink; font-size: 1rem; font-weight: bold",
    ...logs
  );
};
</script>
