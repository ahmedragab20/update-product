<template>
  <div>
    <div
      v-if="
        activeFormDivs &&
        activeFormDivs.length > 0 &&
        activeForms &&
        activeForms.length > 0
      "
      class="hint mb-5"
    >
      <div class="image shadow-sm">
        <img src="@/assets/controls-hint.webp" alt="" />
      </div>
      <div class="context d-flex flex-column">
        <h3>Hey, you!</h3>
        <small class="fw-bold text-muted">
          Don't forget that you can sort your controls by dragging and dropping
          them up and down.
        </small>
      </div>
    </div>
    <draggable
      :list="activeFormDivs"
      :disabled="false"
      :move="checkMove"
      :animation="200"
      ghost-class="replaced-card-style"
      itemKey="element"
      @start="dragging = true"
      @end="dragging = false"
    >
      <template #item="{ element, index }">
        <div>
          <OrderingForm
            class="mb-3 pb-3"
            :class="{
              'moving-card-style': dragging && index === draggingElIndex,
            }"
            :key="element"
            :activeForms="activeForms"
            :options="orderingOptions"
            :removeForm="removeForm"
            :item="returnActiveForm(element)"
            :id="element"
            :dragging="dragging"
            :displayConditions="setDisplayConditions(element)"
            :isControlOptionsCollapsed="isControlOptionsCollapsed(element)"
            @formData="setFormData"
            @isFormValid="isFormValidF"
            @setControlsExpandedOptions="setControlsExpandedOptions"
          />
        </div>
      </template>
    </draggable>
    <div
      v-if="
        activeFormDivs &&
        activeFormDivs.length > 0 &&
        activeForms &&
        activeForms.length > 0
      "
      class="d-flex mt-10 flex-wrap"
    >
      <div class="pe-1 w-100">
        <button
          class="btn btn-text-primary border border-primary w-100"
          type="button"
          :disabled="!isFormValid"
          @click="addNewFormDiv"
        >
          <i
            class="bi bi-plus-circle text-primary"
            style="font-size: 1.1rem"
          ></i>
          Add New control
        </button>
      </div>
    </div>
    <div
      v-if="activeForms.length >= 1"
      class="mt-5 d-flex w-100 justify-content-end"
    >
      <button
        class="btn btn-primary"
        :disabled="!isFormValid || submitting"
        @click="submitAllForms"
        type="button"
      >
        <i class="bi bi-check-circle" style="font-size: 1.1rem"></i>
        Save changes
      </button>
    </div>
    <div v-if="activeFormDivs.length === 0">
      <div class="text-center">
        <img
          src="@/assets/no-orders.webp"
          class="rounded-circle my-3 user-select-none"
          style="
            width: 210px;
            height: 210px;
            object-fit: cover;
            pointer-events: none;
          "
        />
        <h5 class="text-muted">
          <i class="fa fa-info-circle"></i>
          No control added yet.
        </h5>
        <button
          class="btn btn-light-primary shadow-sm rounded-pill"
          @click="addNewFormDiv"
          type="button"
        >
          <i class="bi bi-plus-circle" style="font-size: 1.1rem"></i>
          Add Your First control
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Api from "@/utils/ApiHelper";

import { uuid } from "vue-uuid";
import { ref } from "@vue/reactivity";
import OrderingForm from "./-OrderingForm.vue";
import draggable from "vuedraggable";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import { onMounted } from "vue";

const store = useStore();

const product = computed(() => store.state.UpdateProduct.product);

const orderingOptions = computed(() => store.state.LookupQueries.controlTypes);
const activeForms = ref<any[]>([]);
const activeFormDivs = ref<any[]>([]);
const dragging = ref(false);
const draggingElIndex = ref();
const submitting = ref<any>(false);
const formData = ref();
const controlsCollapsedOptions = ref<string[]>([]);

const setControlsExpandedOptions = (payload: {
  controlId: string;
  state: boolean;
}) => {
  if (payload.state) {
    controlsCollapsedOptions.value.push(payload.controlId);
  } else {
    const controlExisted = controlsCollapsedOptions.value.includes(
      payload.controlId
    );

    if (controlExisted) {
      controlsCollapsedOptions.value = controlsCollapsedOptions.value.filter(
        (id) => id !== payload.controlId
      );
    }
  }
};

const isControlOptionsCollapsed = (id: string) => {
  return controlsCollapsedOptions.value.includes(id);
};

const checkMove = (e) => {
  draggingElIndex.value = e.draggedContext.futureIndex;
};

const setFormData = (fd) => {
  formData.value = fd;
  submitForm();
};

const sortForms = () => {
  activeFormDivs.value.forEach((el: any, index: number): void => {
    let currentForm = activeForms.value.find(
      (form) => form.connectionId === el
    );
    if (currentForm) {
      currentForm["order"] = index + 1;
    }
  });
};

const returnActiveForm = (id: any) => {
  return activeForms.value.find((i) => i.connectionId === id);
};
const submitForm = () => {
  if (formData.value) {
    if (activeForms.value.length > 0) {
      // find the current item
      const form = activeForms.value.find(
        (form: any) => form.connectionId === formData.value.connectionId
      );
      if (form) {
        // don't push anything
        form.resources = formData.value.resources;
        form.controlId = formData.value.controlId;
        form.options = formData.value.options;
        form.displayConditions = formData.value.displayConditions;
        form.isRequired = formData.value.isRequired;
        form.placeHolder = formData.value.placeHolder;
        form.displayConditionOperationId =
          formData.value.displayConditionOperationId;
      } else {
        activeForms.value.push(formData.value);
      }
    } else {
      activeForms.value.push(formData.value);
    }

    sortForms();
  }
};
const addNewFormDiv = () => {
  activeFormDivs.value.push(uuid.v4());
};
const removeForm = (id: string) => {
  activeFormDivs.value = activeFormDivs.value.filter((i) => i !== id);
  activeForms.value = activeForms.value.filter(
    (i: any) => i.connectionId !== id
  );
  submitAllForms();
};
const setDisplayConditions = (id: string) => {
  const activeFormsClone = JSON.parse(JSON.stringify(activeForms.value));
  return activeFormsClone?.filter((i) => i.connectionId !== id);
};
const submitAllForms = async () => {
  try {
    submitting.value = true;

    activeForms.value.forEach((form) => {
      const uniques = ["options", "displayConditions", "resources"];
      if (form.options === null) form.options = [];
      if (form.displayConditions === null) form.displayConditions = [];

      Object.keys(form).forEach((key) => {
        if (!uniques.includes(key) && form[key] === null) form[key] = "";
      });
    });

    const reqData = {
      method: "post",
      url: "/ProductCommands/update-product-ordering-form",
      payload: {
        id: product.value.id,
        formControls: activeForms.value
      }
    };

    const { data }: any = await Api(reqData);

  } catch (error) {
    console.error(error);
  } finally {
    submitting.value = false;
  }
};
const isFormValid = ref(false);
const isFormValidF = (val) => {
  isFormValid.value = val;
};
const getOrderingForms = async () => {
  try {
    const reqData = {
      method: "get",
      url: "/ProductQueries/get-product-ordering-form",
      payload: {
        id: product.value.id
      }
    };

    const { data }: any = await Api(reqData);
    if (data.succeeded) {
      const formControls: any[] = data.data.formControls;
      activeFormDivs.value = formControls.map((i) => i.connectionId);
      activeForms.value = formControls;
    }
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  getOrderingForms();
});
</script>
<style lang="scss" scoped>
.hint {
  display: flex;
  //align-items: center;
  gap: 10px;

  .image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .context {
    max-width: 70%;

    small {
      margin-top: -7px;
    }
  }
}

.replaced-card-style {
  transform: scale(0.95);
  transition: all 0.2s ease-in-out;
}

.moving-card-style {
  transform: scale(1.05);
  transition: all 0.2s ease-in-out;
}
</style>
