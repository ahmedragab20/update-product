<template>
  <div class="card-header py-0 border-0">
    <div class="card-title">
      <h2>Variation Types</h2>
    </div>
  </div>
  <div v-if="activeVariationTypes.length === 0">
    <img
      src="@/assets/nothing.gif"
      style="pointer-events: none; user-select: none"
      width="150"
    />
  </div>
  <div v-for="(id, $index) in activeVariationTypes" :key="id">
    <VariationTypeBox
      :id="id"
      :activeVariationTypes="activeVariationTypes"
      :editData="addVariationType"
      :index="$index"
      :removeTypeConfirmationHandler="removeTypeConfirmationHandler"
      :saveBtnLoading="saveBtnLoading"
      @addNewVariation="newTypePayloadReciever"
      @dataValidate="dataValidate"
    />
  </div>
  <!-- Add new variation type -->
  <div class="card-body py-0">
    <!-- hint -->
    <small v-if="activeVariationTypes.length > 0" class="fw-bold text-muted">
      <span class="text-danger">*</span>
      <span>
        If you edited the type data after saving it, please use the button above
        to save the changes and to be able to add new one if you needed to,
        thanks!😊
      </span>
    </small>
    <button
      v-if="
        (clickedOnSave && saveBtnLoading !== 'done') ||
        !newOrSaveVariationTypeValidate
      "
      :class="
        saveBtnLoading === 'done' && addVariationActionType !== 'edit'
          ? 'btn-text-primary'
          : 'btn-primary'
      "
      :disabled="addVariationTypeValidation"
      class="btn mt-4 mb-2 w-100"
      type="button"
      @click="addVariationType('add')"
    >
      <div v-if="!saveBtnLoading || addVariationActionType === 'edit'">
        <i class="bi bi-check" style="font-size: x-large"></i>
        SAVE THE VARIATION TYPE
      </div>
      <div
        v-else-if="
          saveBtnLoading &&
          saveBtnLoading !== 'done' &&
          addVariationActionType !== 'edit'
        "
      >
        <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
        SAVING...
      </div>
      <div
        v-else-if="
          saveBtnLoading === 'done' && addVariationActionType !== 'edit'
        "
      >
        <i class="bi bi-check-circle-fill text-primary"></i>
        SAVED
      </div>
    </button>
    <button
      v-if="!pushedNewForm || newOrSaveVariationTypeValidate"
      class="btn btn-success mt-4 mb-2 w-100"
      type="button"
      @click="pushNewTypeForm('new')"
    >
      <i class="bi bi-plus-circle" style="font-size: x-large"></i>
      ADD NEW VARIATION TYPE
    </button>
  </div>
</template>
<script lang="ts" setup>
import Swal from "sweetalert2/dist/sweetalert2.js";
import VariationTypeBox from "./-VariationTypeBox.vue";
// Add new Variation type

import { ref } from "@vue/reactivity";
import { computed, watchEffect } from "@vue/runtime-core";
import { uuid } from "vue-uuid";
import { useStore } from "vuex";
import { onMounted, watch } from "vue";

const store = useStore();
const emit = defineEmits(["addNewVariationType"]);

const variationsData = computed(
  () => store.state.UpdateProduct.variationData["productVariationTypes"]
);
const marketLanguages = computed(
  () => store.state.MarketModule.market?.languages
);
const pushedNewForm = ref(false);
const activeVariationTypes = ref<any[]>([]);
const variationTypes = ref<any>([]);
const newTypePayload = ref();
const clickedOnSave = ref(false);
const saveBtnLoading = ref<boolean | string>(false);
const defaultValuesMode = computed(
  () =>
    variationTypes.value &&
    variationsData.value &&
    variationTypes.value.length === variationsData.value.length
);
const typeFormData = computed(
  () => store.state.UpdateProduct.VariationFromData
);

const newTypePayloadReciever = (payload?: object) => {
  clickedOnSave.value = true;
  saveBtnLoading.value = false;
  newTypePayload.value = payload;
};

const addVariationActionType = ref("");

const addVariationType = (type = "add"): void => {
  addVariationActionType.value = type;
  saveBtnLoading.value = true;
  clickedOnSave.value = true;
  pushedNewForm.value = false;
  if (type === "add") {
    variationTypes.value?.push({
      ...newTypePayload.value,
    });

    emit("addNewVariationType", ["add", variationTypes.value]);
  } else if (type === "edit" || type === "edit-option") {
    const item = variationTypes.value.find(
      (i) => i.id === newTypePayload.value.id
    );
    if (item) {
      const foundIndex = variationTypes.value.findIndex((x) => x.id == item.id);
      variationTypes.value[foundIndex] = newTypePayload.value;
    }
    emit("addNewVariationType", ["edit", variationTypes.value]);
  } else if (type === "defaults") {
    emit("addNewVariationType", ["defaults", variationTypes.value]);
  }

  setTimeout(() => {
    saveBtnLoading.value = "done";
    newTypePayload.value = null;
  }, 1000);
};

const pushNewTypeForm = (type: string): void => {
  pushedNewForm.value = true;
  clickedOnSave.value = false;
  saveBtnLoading.value = false;
  if (type === "defaults") {
    variationTypes.value.forEach((el: any, i: number, array: any[]) => {
      if (array.length > activeVariationTypes.value.length) {
        activeVariationTypes.value.push(uuid.v4());
      }
    });
  } else {
    activeVariationTypes.value.push(uuid.v4());
  }
};

const removeTypeHandler = (indexNumber: number): void => {
  activeVariationTypes.value = activeVariationTypes.value.filter(
    (_, index) => index !== indexNumber
  );
  variationTypes.value = variationTypes.value.filter(
    (_, index) => index !== indexNumber
  );
  addVariationType("edit");
};

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-danger",
    cancelButton: "btn btn-text-success",
  },
  buttonsStyling: false,
});

const removeTypeConfirmationHandler = (item: any, isLastOption?: boolean) => {
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: isLastOption
        ? "Removing the last option means Removing the ENTIRE TYPE"
        : "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          "Deleted!",
          "Your Type has deleted.",
          "success"
        );
        removeTypeHandler(item);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          "Cancelled",
          "Your type still alive :)",
          "error"
        );
      }
    });
};

const newOrSaveVariationTypeValidate = computed((): boolean => {
  return (
    (activeVariationTypes.value.length > 0 &&
      newTypePayload.value &&
      !clickedOnSave.value &&
      !pushedNewForm.value) ||
    activeVariationTypes.value.length === 0 ||
    !!defaultValuesMode.value
  );
});
const addVariationTypeValidation = computed(() => {
  return (
    !typeFormData.value.code ||
    !typeFormData.value.selectionControlTypeId ||
    !typeFormData.value.valueTypeId ||
    !typeFormData.value.order ||
    !newTypePayload.value ||
    (saveBtnLoading &&
      marketLanguages &&
      newTypePayload.value &&
      !newTypePayload.value.resources &&
      !newTypePayload.value.resources.length ===
        marketLanguages.value.length) ||
    (newTypePayload.value &&
      newTypePayload.value.options &&
      newTypePayload.value.options.length === 0) ||
    (variationTypes.value.length > 0 &&
      variationTypes.value.length === activeVariationTypes.value.length)
  );
});

const isDataValid = ref<boolean>(false);
const dataValidate = (validate) => {
  isDataValid.value = validate;
};

const log = () => {
  console.log(newTypePayload.value.recentOptions);
};

onMounted(() => {
  if (variationsData.value) {
    variationTypes.value = variationsData.value;
    activeVariationTypes.value = variationTypes.value?.map((el) => el.id);
    addVariationType("defaults");
    pushNewTypeForm("defaults");
  }
});
watch(variationsData, (newValue) => {
  if (newValue) {
    variationTypes.value = variationsData.value;
    activeVariationTypes.value = variationTypes.value?.map((el) => el.id);
    addVariationType("defaults");
    pushNewTypeForm("defaults");
  }
});
</script>
