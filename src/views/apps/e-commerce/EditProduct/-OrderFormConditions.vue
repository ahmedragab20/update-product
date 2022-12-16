<template>
  <!-- DD stands for DropDown -->
  <div class="container">
    <Dropdown
      v-if="conditionsOperationsDD"
      style="max-width: 265px"
      class="mb-5"
      :items="conditionsOperationsDD"
      bodyClasses="w-100 text-truncate text-capitalize"
      headClasses="fw-bold p-3 rounded-3 text-capitalize btn-lg border"
      disabled-classes="bg-light shadow-sm"
      max-height="160px"
      @selected-item="setSelectedConditionsOperation"
    >
      <template #headerContent="{ selectedItem, isOpened }">
        <div class="d-flex justify-content-between gap-1 align-items-center">
          <div
            v-if="conditionsOperation && conditionsOperation.id"
            style="width: 160px"
            class="text-truncate"
          >
            <span v-text="conditionsOperation.value" class="w-100" />
          </div>
          <div v-else v-text="`Select Operator`" style="width: 160px" />
          <i :class="isOpened ? 'bi-arrow-up' : 'bi-arrow-down'" />
        </div>
      </template>
      <template #bodyContent="{ item }">
        <div
          :class="{
            'bg-light-primary':
              item && conditionsOperation && item.id === conditionsOperation.id,
          }"
          class="px-sm-5 py-sm-3 px-3 py-1 d-flex gap-2 align-center text-truncate"
          v-text="item.value"
        />
      </template>
    </Dropdown>
    <div class="table-responsive overflow-auto">
      <table
        class="table table-hover table-rounded table-striped border gy-7 gs-7"
        style="min-width: 360px"
      >
        <thead>
          <tr class="fw-bold fs-5 text-gray-800 border-bottom border-gray-200">
            <th>Order label</th>
            <th>Operation</th>
            <th>Order option</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(condition, $index) in conditions"
            :key="$index"
            @click="setClickedConditionIndex($index)"
          >
            <td>
              <div
                v-if="
                  getConditionData(condition) &&
                  getConditionData(condition).control &&
                  getConditionData(condition).control.resources.length > 0
                "
                v-text="getConditionData(condition).control.resources[0].name"
              />
            </td>
            <td>
              <div
                v-if="
                  getConditionData(condition) &&
                  getConditionData(condition).operation &&
                  getConditionData(condition).operation.value
                "
                v-text="getConditionData(condition).operation.value"
              />
            </td>
            <td>
              <div
                v-if="
                  getConditionData(condition).control &&
                  getConditionData(condition).option &&
                  isControlMulti(getConditionData(condition).control) &&
                  getSelectedOptionById(
                    getConditionData(condition).control.controlId
                  ).isDefaultInputType === 'radio'
                "
                v-text="getConditionData(condition).option.resources[0].name"
              />
              <div
                v-else-if="
                  getConditionData(condition).control &&
                  isControlMulti(getConditionData(condition).control) &&
                  getSelectedOptionById(
                    getConditionData(condition).control.controlId
                  ).isDefaultInputType === 'checkbox'
                "
                class="d-flex gap-2"
              >
                <div v-for="(option, i) in getConditionData(condition).option">
                  <span
                    v-if="
                      option && option.resources && option.resources.length > 0
                    "
                    class="badge badge-dark badge-lg"
                    v-text="option.resources[0].name"
                  />
                </div>
              </div>
              <div v-else v-text="getConditionData(condition).option" />
            </td>
            <td>
              <button
                @click="deleteConditionDialogToggle"
                class="btn btn-text-danger d-flex align-items-center"
              >
                <i class="bi bi-trash3 text-danger"></i> Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="row justify-content-center">
      <!-- Let's use tables here instead. -->
      <div class="col-sm-4 col-lg-3 col-12">
        <Dropdown
          id-key="connectionId"
          class="mt-2"
          :items="controlConditions"
          bodyClasses="w-100 text-truncate text-capitalize"
          headClasses="fw-bold p-3 rounded-3 text-capitalize btn-lg border"
          disabled-classes="bg-light shadow-sm"
          max-height="160px"
          @selected-item="setFirstDDValue"
        >
          <template #headerContent="{ selectedItem, isOpened }">
            <div
              class="d-flex justify-content-between gap-1 align-items-center"
            >
              <div
                v-if="
                  firstDDValue &&
                  firstDDValue.resources &&
                  firstDDValue.resources.length > 0
                "
                style="width: 160px"
                class="text-truncate"
              >
                <span v-text="firstDDValue.resources[0].name" class="w-100" />
              </div>
              <div v-else v-text="`Select Control`" style="width: 160px" />
              <i :class="isOpened ? 'bi-arrow-up' : 'bi-arrow-down'" />
            </div>
          </template>
          <template #bodyContent="{ item }">
            <div
              :class="{
                'bg-light-primary':
                  item &&
                  firstDDValue &&
                  item.connectionId === firstDDValue.connectionId,
              }"
              class="px-sm-5 py-sm-3 px-3 py-1 d-flex gap-2 align-center text-truncate"
              v-text="item.resources[0].name"
            />
          </template>
        </Dropdown>
      </div>
      <div
        v-if="operations && operations.length > 0 && firstDDValue.connectionId"
        class="col-sm-4 col-lg-3 col-12"
      >
        <Dropdown
          class="mt-2"
          :items="operations"
          bodyClasses="text-truncate text-capitalize"
          headClasses="fw-bold p-3 rounded-3 text-capitalize btn-lg border"
          disabled-classes="bg-light shadow-sm"
          max-height="160px"
          @selected-item="setSelectedOperation"
        >
          <template #headerContent="{ selectedItem, isOpened }">
            <div
              class="d-flex justify-content-between gap-1 align-items-center"
            >
              <div
                v-if="selectedOperation && selectedOperation.value"
                class="text-truncate"
              >
                <span v-text="selectedOperation.value" class="w-100" />
              </div>
              <div v-else class="text-truncate">
                <span v-text="`Select operation`" class="w-100" />
              </div>
              <i :class="isOpened ? 'bi-arrow-up' : 'bi-arrow-down'" />
            </div>
          </template>
          <template #bodyContent="{ item }">
            <div
              :class="{
                'bg-light-primary':
                  item && selectedOperation && item.id === selectedOperation.id,
              }"
              class="px-sm-5 py-sm-3 px-3 py-1 d-flex gap-2 align-center text-truncate"
              v-text="item.value"
            />
          </template>
        </Dropdown>
      </div>
      <div
        v-if="
          !!selectedOperation &&
          selectedOperation.id &&
          isControlMulti(firstDDValue)
        "
        class="col-sm-4 col-lg-3 col-12"
      >
        <Dropdown
          v-if="
            getSelectedOptionById(firstDDValue.controlId) &&
            getSelectedOptionById(firstDDValue.controlId).isDefaultInputType ===
              'radio'
          "
          class="mt-2"
          :items="options"
          id-key="connectionId"
          bodyClasses="text-truncate text-capitalize"
          headClasses="fw-bold p-3 rounded-3 text-capitalize btn-lg border"
          disabled-classes="bg-light shadow-sm"
          max-height="160px"
          @selected-item="setSelectedOption"
        >
          <template #headerContent="{ selectedItem, isOpened }">
            <div
              class="d-flex justify-content-between gap-1 align-items-center"
            >
              <div
                v-if="
                  selectedOption &&
                  selectedOption.resources &&
                  selectedOption.resources.length > 0
                "
                class="text-truncate"
              >
                <span v-text="selectedOption.resources[0].name" class="w-100" />
              </div>
              <div v-else class="text-truncate">
                <span v-text="`Select Option`" class="w-100" />
              </div>
              <i :class="isOpened ? 'bi-arrow-up' : 'bi-arrow-down'" />
            </div>
          </template>
          <template #bodyContent="{ item }">
            <div
              :class="{
                'bg-light-primary':
                  item &&
                  selectedOption &&
                  item.connectionId === selectedOption.connectionId,
              }"
              class="px-sm-5 py-sm-3 px-3 py-1 d-flex gap-2 align-center text-truncate"
              v-text="item.resources[0].name"
            />
          </template>
        </Dropdown>
        <div v-else>
          <Dropdown
            id-key="connectionId"
            class="mt-2"
            :items="options"
            :multi-select="true"
            :outter-ids="selectedOptionsIds"
            bodyClasses="text-truncate text-capitalize"
            headClasses="fw-bold p-3 rounded-3 text-capitalize btn-lg border"
            disabled-classes="bg-light shadow-sm"
            max-height="160px"
            @selected-item="setSelectedMultiOptions"
          >
            <template #headerContent="{ selectedItem, isOpened }">
              <div
                class="d-flex justify-content-between gap-1 align-items-center"
              >
                <div class="text-truncate">
                  <span v-text="`Select Options`" />
                  <small
                    v-if="
                      selectedMultiOptions && selectedMultiOptions.length > 0
                    "
                    v-text="` (${selectedMultiOptions.length})`"
                  />
                </div>
                <i :class="isOpened ? 'bi-arrow-up' : 'bi-arrow-down'" />
              </div>
            </template>
            <template #bodyContent="{ item }">
              <div
                :style="[
                  selectedOptionsIds &&
                  selectedOptionsIds.includes(item.connectionId)
                    ? 'background-color: #1bc5bd; color: #fff;'
                    : '',
                ]"
                class="px-sm-5 py-sm-3 px-3 py-1 d-flex gap-2 align-center text-truncate"
                v-text="item.resources[0].name"
              />
            </template>
          </Dropdown>
          <!-- Tags -->
          <div
            v-if="selectedMultiOptions && selectedMultiOptions.length > 0"
            class="d-flex gap-3 flex-wrap mt-1"
          >
            <div
              v-for="(item, $index) in selectedMultiOptions"
              :key="$index"
              class="badge badge-secondary"
            >
              <span>{{ item.resources[0].name }}</span>
            </div>
          </div>

          <small v-else class="fw-bold text-muted px-2">
            you can select more than one option here!😊
          </small>
        </div>
      </div>
      <div
        v-else-if="
          selectedOperation &&
          selectedOperation.id &&
          firstDDValue &&
          firstDDValue.controlId &&
          !isControlMulti(firstDDValue) &&
          getSelectedOptionById(firstDDValue.controlId)
        "
        class="col-sm-4 col-lg-3 col-12 d-flex align-items-center py-2"
      >
        <div class="form-group">
          <input
            :type="getSelectedOptionById(firstDDValue.controlId).inputType"
            class="form-control"
            placeholder="type value...."
            v-model="scalarValue"
          />
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-10">
      <button
        type="button"
        class="btn btn-outline btn-outline-dashed btn-outline-success btn-active-light-success btn-lg d-flex align-items-center gap-1"
        :disabled="!dbsRValid"
        @click="addNewCondition('add')"
      >
        <i
          class="bi bi-plus-square-dotted text-success"
          style="font-size: 1.5rem"
        />
        Add new condition
      </button>
    </div>

    <!-- Delete condition confirmation dialog -->
    <confirmation-dialog v-model="deleteModalConfirmationDialog">
      <template #content>
        <div
          class="d-flex justify-content-center align-items-center flex-column gap-3"
        >
          <div style="width: 230px">
            <img
              src="@/assets/deactivate-discount.jpg"
              alt=""
              width="50"
              class="w-100"
              style="object-fit: contain"
            />
          </div>
          <div>
            <p>You'll remove this condition</p>
          </div>
        </div>
      </template>
      <template #dialogFooter>
        <div class="p-1 d-flex justify-content-center align-items-center gap-2">
          <el-button
            @click="deleteConditionDialogToggle"
            type="text"
            color="secondary"
            class="w-100"
          >
            No, cancel!
          </el-button>
          <el-button
            class="w-100 shadow"
            type="danger"
            @click="deleteCondition"
          >
            Yes, Delete
          </el-button>
        </div>
      </template>
    </confirmation-dialog>
  </div>
</template>

<script setup lang="ts">
import Dropdown from "@/components/Reusable/Dropdown.vue";
import { ref } from "@vue/reactivity";
import { computed, watch, watchEffect } from "@vue/runtime-core";
import { useStore } from "vuex";
import ConfirmationDialog from "@/components/Reusable/ConfirmationDialog.vue";
import { onMounted } from "vue";

const props = defineProps({
  displayConditions: Array,
  displayConditionsData: Array,
  visibilityControls: {
    type: Array,
    required: true,
  },
  formTypes: Array,
  item: Object,
});
const emit = defineEmits([
  "display-conditions-data",
  "displayConditionOperationId",
]);

const store = useStore();

const emitConditions = () => {
  emit("display-conditions-data", conditions.value);
};

const conditionsOperationsDD = computed(
  () => store.state.LookupQueries.formulaConditionTypes
);

const conditionsOperation = ref();

const setSelectedConditionsOperation = (operation) => {
  conditionsOperation.value = operation;
  emit("displayConditionOperationId", operation.id);
};

const controlConditions = computed(() => {
  const controls: any[] = props.visibilityControls;
  const selectedConditionsIdsMap = conditions.value.map(
    (i) => i.basedOnControlId
  );
  const selectedConditionsIds = [
    ...selectedConditionsIdsMap,
    props.item?.connectionId,
  ];
  const unselectedControls = controls?.filter((control: any) => {
    return !selectedConditionsIds.includes(control.connectionId);
  });
  return unselectedControls;
});

const conditions = ref<any[]>([]);
const scalarValue = ref<any>();
const addNewCondition = (type: string = "add") => {
  if (type === "add") {
    let value;
    const isSingleSelect =
      isControlMulti(firstDDValue.value) &&
      getSelectedOptionById(firstDDValue.value?.controlId)
        ?.isDefaultInputType === "radio";
    const isMultiSelect =
      isControlMulti(firstDDValue.value) &&
      getSelectedOptionById(firstDDValue.value?.controlId)
        ?.isDefaultInputType === "checkbox";

    if (isSingleSelect) {
      value = selectedOption.value?.connectionId;
    } else if (isMultiSelect) {
      value = selectedOptionsIds.value.toString();
    } else {
      value = scalarValue.value;
    }

    conditions.value.push({
      basedOnControlId: firstDDValue.value.connectionId,
      value,
      operationTypeId: selectedOperation.value.id,
    });
  } else {
    props.item?.displayConditions?.forEach((condition) => {
      conditions.value.push(condition);
    });
  }

  setFirstDDValue({});
  setSelectedOperation({});
  setSelectedOption({});
  setSelectedMultiOptions([], true);

  // send the data to the parent
  emitConditions();
};

const clickedConditionIndex = ref();
const setClickedConditionIndex = ($index: number) => {
  clickedConditionIndex.value = $index;
};

const getConditionData = (condition) => {
  const allOperations = store.state.LookupQueries.operations;

  const control: any = props.displayConditions?.find(
    (i: any) => i.connectionId === condition.basedOnControlId
  );
  const operation = allOperations?.find(
    (i: any) => i.id === condition.operationTypeId
  );
  let option;

  const isOptionSingleSelect =
    isControlMulti(control) &&
    getSelectedOptionById(control?.controlId)?.isDefaultInputType ===
      "radio";
  const isOptionMultiSelect =
    isControlMulti(control) &&
    getSelectedOptionById(control?.controlId)?.isDefaultInputType ===
      "checkbox";
  if (isOptionMultiSelect) {
    const optionsIds: any[] = condition.value?.split(",");
    option = control?.options?.filter((option) =>
      optionsIds.includes(option.connectionId)
    );
  } else if (isOptionSingleSelect) {
    option = control?.options.find((i) => i.connectionId === condition.value);
  } else {
    option = condition.value;
  }
  return { control, operation, option };
};

const firstDDValue = ref();
const setFirstDDValue = (value: any) => {
  firstDDValue.value = value;
  addOptions(value);
};

const isControlMulti = (control) => {
  const controlOptionTypeId = control?.controlId;
  const formType: any = props.formTypes?.find(
    (form: any) => form.id === controlOptionTypeId
  );

  return formType?.multiple;
};

const operations = computed(() => {
  const allOperations = store.state.LookupQueries.operations;
  if (firstDDValue.value) {
    const formType: any = props.formTypes?.find(
      (i: any) => i.id === firstDDValue.value.controlId
    );

    const scalarType = !formType?.multiple;
    const notFileOrText = !["Input Text", "Uploader", "Text Area"].includes(
      formType?.label
    );
    /*
     * number | date | time -> 5 operations
     * isMultiple -> in operator
     * isIndividual -> equal operator
     * */

    const equalOperation = allOperations?.filter(
      (i: any) => i.code === "EqualTo"
    );
    const multiValueCodes = [
      "EqualTo",
      "GreaterThan",
      "GreaterThanOrEqualTo",
      "LessThan",
      "LessThanOrEqualTo",
    ];
    const numberDateTimeOperations = allOperations?.filter((i: any) =>
      multiValueCodes.includes(i.code)
    );

    return scalarType && notFileOrText
      ? numberDateTimeOperations
      : equalOperation;
  }
});
const selectedOperation = ref();
const setSelectedOperation = (operation) => {
  selectedOperation.value = operation;
};

const options = ref<any[]>([]);
const selectedOption = ref();
const addOptions = (value) => {
  if (!!value) {
    options.value = value.options;
  }
};
const setSelectedOption = (option) => {
  selectedOption.value = option;
};

//* <MultiSelect "dropdown"> local store
const selectedOptionsIds = ref<any[]>([]); //-> the selected items' IDs
const selectedMultiOptions = ref(); //-> the final result of the selected items (what you're going to use in the template)

const findSelectedMultiOptions = (ids: Array<any> = []) => {
  selectedMultiOptions.value = options.value?.filter((item) =>
    ids.includes(item.connectionId)
  );
};
// where you receive the data from the dropdown component
const setSelectedMultiOptions = (
  selectedItemsCallback: any,
  isGlobal?: boolean
) => {
  if (!isGlobal) {
    // is Global functions run here
  }
  selectedOptionsIds.value = selectedItemsCallback;
  findSelectedMultiOptions(selectedItemsCallback);
};

const getSelectedOptionById = (id: string): any => {
  const control = props.formTypes?.find((i: any) => i.id === id);
  return control;
};

const dbsRValid = computed(() => {
  const selectedOrderAndOperation =
    firstDDValue.value?.connectionId && selectedOperation.value?.id;

  return (
    (selectedOrderAndOperation && scalarValue.value) ||
    (selectedOrderAndOperation && selectedMultiOptions.value?.length > 0) ||
    (selectedOrderAndOperation &&
      selectedOption.value &&
      selectedOption.value?.connectionId)
  );
});
const deleteModalConfirmationDialog = ref(false);
const deleteConditionDialogToggle = () => {
  deleteModalConfirmationDialog.value = !deleteModalConfirmationDialog.value;
};
const deleteCondition = () => {
  conditions.value = conditions.value.filter(
    (control: any, index, array) =>
      control.basedOnControlId !==
      array[clickedConditionIndex.value].basedOnControlId
  );

  emitConditions();
  deleteConditionDialogToggle();
};

onMounted(() => {
  if (props.item) {
    // addNewCondition("reset");
    if (
      conditionsOperationsDD.value &&
      conditionsOperationsDD.value.length > 0
    ) {
      const operation = conditionsOperationsDD.value.find(
        (i) => i.id === props.item?.displayConditionOperationId
      );
      if (operation) {
        setSelectedConditionsOperation(operation);
      }
    }

    addNewCondition("reset");
  }
});
</script>