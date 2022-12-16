<template>
  <div class="form-box position-relative mb-5 bg-white px-2">
    <el-tooltip
      v-if="selectedOption && selectedOption.id"
      class="box-item"
      effect="light"
      :content="
        collapsedOptions
          ? 'Collapse options section 🥶'
          : 'Expand options section 😃'
      "
      placement="top"
    >
      <div
        class="position-absolute start-50 w-30px h-30px rounded-circle bg-light shadow d-flex justify-content-center align-items-center"
        style="bottom: -15px; cursor: pointer"
        @click="collapsedOptionsToggle"
      >
        <i class="bi bi-chevron-bar-expand"></i>
      </div>
    </el-tooltip>
    <div class="d-flex mb-5 px-1 justify-content-between">
      <div v-if="isLabelValid">
        <el-tooltip
          class="box-item"
          effect="light"
          content="Is Required 🤔"
          placement="top-end"
        >
          <div
            class="form-check form-switch form-check-custom form-check-solid h-20px w-30px"
          >
            <input
              id="isInputRequired"
              class="form-check-input h-20px w-30px"
              v-model="isControlRequired"
              type="checkbox"
              :checked="isControlRequired"
            />
          </div>
        </el-tooltip>
        <div
          v-if="activeForms && activeForms.length > 1"
          class="d-flex flex-column my-3"
        >
          <div>
            <button
              @click="conditionsModalToggle"
              type="button"
              class="btn btn-outline btn-outline-dashed btn-outline-success btn-active-light-success btn-sm d-flex align-items-center gap-1"
            >
              <i class="bi bi-bar-chart-steps text-success"></i>
              Visibility conditions
            </button>
          </div>
          <small class="fw-bold text-muted">
            When will you're going to make this visible 🤔
          </small>
        </div>
        <section v-if="conditionsModal">
          <el-dialog
            v-model="conditionsModal"
            title="Visibility conditions"
            top="3vh"
            width="95%"
          >
            <template #default>
              <order-form-conditions
                :displayConditions="displayConditions"
                :visibilityControls="visibilityControls"
                :displayConditionsData="displayConditionsData"
                :formTypes="props.options"
                :item="getActiveOrderForm"
                @display-conditions-data="setDisplayConditionsData"
                @displayConditionOperationId="setDisplayConditionOperationId"
              />
            </template>
            <template #footer>
              <div class="dialog-footer d-flex gap-3">
                <button
                  @click="conditionsModalToggle"
                  type="button"
                  class="btn btn-light d-flex gap-2 align-items-center"
                >
                  <i class="bi bi-save"></i>
                  I'm done. close
                </button>
              </div>
            </template>
          </el-dialog>
        </section>
      </div>

      <div class="ms-auto">
        <button
          class="btn btn-light-danger btn-sm rounded-3 d-flex justify-content-center align-items-center justify-content-center bi-trash gap-2"
          type="button"
          @click="confirmationDialog"
        >
          Remove
        </button>
      </div>
    </div>
    <header>
      <tabs-duplicator
        :items="languages"
        active-tab-design="btn btn-bg-light btn-color-info rounded-3"
        tab-btn-classes="text-nowrap"
        @selectedItem="setSelectedFormLabelLanguage"
        class="mb-3"
      >
        <template #label="{ item }">
          <span>
            {{ item.label }}
          </span>
        </template>
      </tabs-duplicator>
      <div class="row align-items-center">
        <div class="col-md-7 col-12 my-1">
          <div class="position-relative w-100">
            <input-field
              v-model="formData.resources[selectedFormLabelLanguageIndex].name"
              placeholder="Type Label"
              @input="editLabel"
            />

            <span
              v-if="editingLabel && getActiveOrderForm"
              class="position-absolute end-0 top-0 h-100 p-1"
            >
              <span
                class="w-100 h-100 px-3 d-flex justify-content-center align-items-center bg-white"
              >
                <i
                  v-if="editingLabel === 'done'"
                  class="bi bi-check-circle text-primary"
                  style="font-size: 1.1rem"
                ></i>
                <span
                  v-else-if="editingLabel === true"
                  class="spinner-border spinner-border-sm align-middle text-success"
                ></span>
              </span>
            </span>
            <span
              v-else-if="
                !formData.resources[
                  selectedFormLabelLanguageIndex
                ].name.trim() && getActiveOrderForm
              "
              class="position-absolute end-0 top-0 h-100 p-1"
            >
              <span
                class="w-100 h-100 px-3 d-flex justify-content-center align-items-center bg-white"
              >
                <i
                  class="bi bi-x-circle text-danger"
                  style="font-size: 1.1rem"
                ></i>
              </span>
            </span>
          </div>
        </div>
        <div v-if="options && options.length > 0" class="col-md-5 col-12 my-1">
          <Dropdown
            :disabled="!isLabelValid"
            :items="options"
            id-key="id"
            bodyClasses="w-100 text-truncate text-capitalize"
            headClasses="fw-bold p-3 rounded-3 text-capitalize btn-lg border"
            disabled-classes="bg-light shadow-sm"
            max-height="160px"
            @selectedItem="dropdownSelectedItem"
          >
            <template #headerContent="{ item }">
              <span class="d-flex justify-content-between align-items-center">
                <div
                  v-if="selectedOption"
                  class="d-flex gap-2 text-truncate"
                  style="width: 95%"
                >
                  <span v-html="item.selectedItem.icon || ''" />
                  <div class="text-truncate" style="width: 85%">
                    {{ selectedOption.label }}
                  </div>
                </div>
                <div v-else>Select option</div>
                <strong>
                  <i
                    :class="item.isOpened ? 'bi-arrow-up' : 'bi-arrow-down'"
                  ></i>
                </strong>
              </span>
            </template>
            <template #bodyContent="{ item }">
              <div
                :class="{
                  'bg-light-primary':
                    item && selectedOption && item.id === selectedOption.id,
                }"
                class="px-sm-5 py-sm-3 px-3 py-1 d-flex gap-2 align-center"
              >
                <span v-html="item.icon || ''" /> {{ item.label }}
              </div>
            </template>
          </Dropdown>
        </div>
      </div>
    </header>
    <section
      v-if="selectedOption && selectedOption.id"
      :style="`height: ${collapsedOptions ? 'auto' : '0px'}; overflow: hidden`"
    >
      <!-- Place holder -->
      <div class="col-12">
        <div class="form-control my-3">
          <label :for="`placeHolder-${id}`" class="form-label">
            Place holder
          </label>
          <input
            v-model="placeHolder"
            :id="`placeHolder-${id}`"
            type="text"
            class="form-control form-control-solid"
            placeholder="type a place holder for the text..."
            @input="formDataHandler('edit')"
          />
        </div>
      </div>
      <div v-if="selectedOption && selectedOption.multiple" class="my-3">
        <p class="form-label">Control options:</p>
      </div>
      <!-- Languages duplicator -->
      <tabs-duplicator
        v-if="
          collapsedOptions &&
          selectedOption &&
          selectedOption.multiple &&
          languages &&
          languages.length > 0 &&
          activeOptions &&
          activeOptions.length > 0 &&
          !['date', 'time', 'number', 'file', 'datetime-local'].includes(
            selectedOption.inputType
          )
        "
        :items="languages"
        active-tab-design="btn btn-bg-light btn-color-info rounded-3"
        tab-btn-classes="text-nowrap"
        @selectedItem="setSelectedOptionsLanguage"
        class="px-3"
      >
        <template #label="{ item }">
          <span>
            {{ item.label }}
          </span>
        </template>
      </tabs-duplicator>
      <!-- Options -->
      <div
        v-if="
          selectedOption &&
          selectedOption.multiple &&
          activeOptions &&
          activeOptions.length > 0
        "
        class="px-2 py-1"
      >
        <div
          v-for="(option, $index) in activeOptions"
          :key="option.connectionId"
          class="row align-items-center my-3"
          @click="clickedOptionHandler(option)"
        >
          <div
            v-if="selectedOption.inputType !== 'file'"
            class="col-12 col-md-7 d-flex gap-2 align-items-center position-relative"
          >
            <div v-if="!selectedOption.multiple" class="w-100">
              <div
                v-if="!['textarea', 'file'].includes(selectedOption.inputType)"
                class="icon-wrapper"
                v-html="selectedOption ? selectedOption.icon : defaultIcon"
              />
              <div class="w-100 position-relative">
                <div v-if="selectedOption.inputType !== 'file'" class="w-100">
                  <input-field
                    v-if="
                      !['textarea', 'file'].includes(selectedOption.inputType)
                    "
                    v-model="
                      activeOptions[$index].resources[
                        selectedOptionLanguageIndex
                      ].name
                    "
                    :input-type="selectedOption.inputType"
                    textIndent="30"
                    @input="editOption(option)"
                  ></input-field>
                  <textarea
                    v-else-if="selectedOption.inputType === 'textarea'"
                    v-model="
                      activeOptions[$index].resources[
                        selectedOptionLanguageIndex
                      ].name
                    "
                    :input-type="selectedOption.inputType"
                    class="w-100 form-control"
                    rows="3"
                    textIndent="30"
                    @input="editOption(option)"
                  ></textarea>
                  <span
                    v-if="
                      activeOptions[$index].resources[
                        selectedOptionLanguageIndex
                      ].name &&
                      activeOptions[$index].resources[
                        selectedOptionLanguageIndex
                      ].name.trim() !== '' &&
                      editingOption &&
                      optionUnderEditing &&
                      optionUnderEditing.connectionId === option.connectionId
                    "
                    class="position-absolute end-0 top-0 h-100 p-1"
                  >
                    <span
                      class="w-100 h-100 px-3 d-flex justify-content-center align-items-center bg-white"
                    >
                      <i
                        v-if="editingOption === 'done'"
                        class="bi bi-check-circle text-primary"
                        style="font-size: 1.1rem"
                      ></i>
                      <span
                        v-else-if="editingOption === true"
                        class="spinner-border spinner-border-sm align-middle text-success"
                      ></span>
                    </span>
                  </span>
                  <span
                    v-else-if="
                      activeOptions[$index].resources[
                        selectedOptionLanguageIndex
                      ].name &&
                      activeOptions[$index].resources[
                        selectedOptionLanguageIndex
                      ].name.trim() === '' &&
                      optionUnderEditing &&
                      optionUnderEditing.connectionId === option.connectionId
                    "
                    class="position-absolute end-0 top-0 h-100 p-1"
                  >
                    <span
                      class="w-100 h-100 px-3 d-flex justify-content-center align-items-center bg-white"
                    >
                      <i
                        class="bi bi-x-circle text-danger"
                        style="font-size: 1.1rem"
                      ></i>
                    </span>
                  </span>
                </div>
                <!-- image -->
                <div v-else>
                  <!--
                  <div>
                    <div
                      class="d-flex align-items-center gap-5 border border-primary border-dashed rounded bg-light-primary h-80px w-100 px-5 cursor-pointer"
                      @click="$refs.fileUpload[$index].click()"
                    >
                      <div class="w-40px">
                        <el-icon
                          v-if="
                            !url &&
                            !getItemImage(
                              activeOptions[$index].resources[
                                selectedOptionLanguageIndex
                              ].name
                            ) &&
                            !getItemImage(
                              activeOptions[$index].resources[
                                selectedOptionLanguageIndex
                              ].name
                            ).includes(
                              'https://mfproductimages.s3.amazonaws.com/'
                            )
                          "
                          class="d-flex align-items-center"
                        >
                          <i
                            class="bi-file-earmark-arrow-up text-primary"
                            style="font-size: 3rem"
                          ></i>
                        </el-icon>
                        <img
                          v-else
                          :src="
                            getItemImage(
                              activeOptions[$index].resources[
                                selectedOptionLanguageIndex
                              ].name
                            )
                          "
                          class="w-100 img-fluid rounded-3 shadow-lg"
                        />
                      </div>
                      <div class="text-start d-flex ps-3">
                        <strong
                          v-if="
                            !uploadMediaDone &&
                            !uploadMediaLoading &&
                            !url &&
                            !getItemImage(
                              activeOptions[$index].resources[
                                selectedOptionLanguageIndex
                              ].name
                            ) &&
                            !getItemImage(
                              activeOptions[$index].resources[
                                selectedOptionLanguageIndex
                              ].name
                            ).includes(
                              'https://mfproductimages.s3.amazonaws.com/'
                            )
                          "
                        >
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
                        <strong
                          v-else-if="
                            uploadMediaDone ||
                            getItemImage(
                              activeOptions[$index].resources[
                                selectedOptionLanguageIndex
                              ].name
                            ) !== ''
                          "
                        >
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
                  -->
                </div>
              </div>
            </div>
            <div v-else class="w-100">
              <div
                class="icon-wrapper"
                v-html="selectedOption ? selectedOption.icon : defaultIcon"
              />
              <div class="w-100 position-relative">
                <input-field
                  v-model="
                    activeOptions[$index].resources[selectedOptionLanguageIndex]
                      .name
                  "
                  :input-type="selectedOption.inputType"
                  textIndent="30"
                  @input="editOption(option)"
                ></input-field>
                <span
                  v-if="
                    activeOptions[$index].resources[selectedOptionLanguageIndex]
                      .name &&
                    activeOptions[$index].resources[
                      selectedOptionLanguageIndex
                    ].name.trim() !== '' &&
                    editingOption &&
                    optionUnderEditing &&
                    optionUnderEditing.connectionId === option.connectionId
                  "
                  class="position-absolute end-0 top-0 h-100 p-1"
                >
                  <span
                    class="w-100 h-100 px-3 d-flex justify-content-center align-items-center bg-white"
                  >
                    <i
                      v-if="editingOption === 'done'"
                      class="bi bi-check-circle text-primary"
                      style="font-size: 1.1rem"
                    ></i>
                    <span
                      v-else-if="editingOption === true"
                      class="spinner-border spinner-border-sm align-middle text-success"
                    ></span>
                  </span>
                </span>
                <span
                  v-else-if="
                    (activeOptions[$index].resources[
                      selectedOptionLanguageIndex
                    ].name &&
                      activeOptions[$index].resources[
                        selectedOptionLanguageIndex
                      ].name.trim() === '' &&
                      optionUnderEditing &&
                      optionUnderEditing.connectionId ===
                        option.connectionId) ||
                    (!optionUnderEditing &&
                      activeOptions[$index].resources[
                        selectedOptionLanguageIndex
                      ].name &&
                      activeOptions[$index].resources[
                        selectedOptionLanguageIndex
                      ].name.trim() === '')
                  "
                  class="position-absolute end-0 top-0 h-100 p-1"
                >
                  <span
                    class="w-100 h-100 px-3 d-flex justify-content-center align-items-center bg-white"
                  >
                    <i
                      class="bi bi-x-circle text-danger"
                      style="font-size: 1.1rem"
                    ></i>
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div
            v-if="activeOptions[$index].resources[selectedOptionLanguageIndex]"
            class="col-12 col-md-5 my-3 my-lg-0"
          >
            <div
              v-if="
                selectedOption &&
                selectedOption.multiple &&
                activeOptions.length >= 1
              "
            >
              <div class="d-flex gap-1 justify-content-between flex-wrap">
                <div>
                  <button
                    class="btn btn-light-danger btn-sm rounded-pill bi-trash d-flex gap-2 align-items-center text-uppercase"
                    type="button"
                    @click="removeOption(option)"
                  >
                    remove
                  </button>
                </div>
                <div>
                  <button
                    :disabled="
                      !activeOptions[$index].resources[
                        selectedOptionLanguageIndex
                      ].name
                    "
                    class="btn btn-sm btn-light-success rounded-pill bi-cash d-flex gap-2 align-items-center text-uppercase"
                    type="button"
                    @click="pricesModal = true"
                  >
                    Pricing
                  </button>
                </div>
                <div class="d-flex gap-1 align-items-center">
                  <el-tooltip
                    class="box-item"
                    effect="light"
                    content="Set as default 😺"
                    placement="top-end"
                  >
                    <div
                      class="form-check form-switch form-check-custom form-check-solid"
                    >
                      <input
                        :id="`option-name-${id}`"
                        class="form-check-input h-20px w-30px"
                        v-model="activeOptions[$index].isDefault"
                        type="checkbox"
                        :name="`option-name-${id}`"
                        :checked="activeOptions[$index].isDefault"
                        @input="
                          formDataHandler('edit'), checkInputHandler(option)
                        "
                      />
                    </div>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>
          <!-- Code
          <div class="col-12">
            <div class="form-control my-3">
              <label :for="`controlCode-${id}`" class="form-label">Code</label>
              <input
                v-model="activeOptions[$index].code"
                :id="`controlCode-${option.connectionId}`"
                type="text"
                class="form-control form-control-solid"
                placeholder="Xx-0-Xx"
              />
            </div>
          </div>
          -->
          <div
            v-if="
              selectedOption &&
              selectedOption.multiple &&
              $index + 1 === activeOptions.length &&
              activeOptions[$index].resources[selectedOptionLanguageIndex]
            "
            class="mt-3"
          >
            <button
              type="button"
              class="btn btn-light-primary btn-sm text-uppercase rounded-3 d-flex align-items-center gap-1"
              :disabled="!isOptionsValid"
              @click="formDataHandler('add'), clickedOptionHandler({})"
            >
              <i class="bi bi-plus-square-dotted"></i>
              add new option
            </button>
          </div>
        </div>
        <el-dialog
          v-model="pricesModal"
          title="Add Price"
          top="3vh"
          :width="dialogWidth"
        >
          <template #default>
            <div v-if="currencies && !!clickedOption">
              <tabs-duplicator
                :items="currencies"
                tab-btn-classes="text-nowrap"
                @selectedItem="setSelectedCurrency"
              >
                <template #label="{ item }">
                  <span>
                    {{ item.label }}
                  </span>
                </template>
              </tabs-duplicator>
              <div
                v-if="
                  activeOptions[clickedOptionIndex] &&
                  activeOptions[clickedOptionIndex].prices[
                    selectedCurrencyIndex
                  ]
                "
              >
                <input-field
                  v-model.number="
                    activeOptions[clickedOptionIndex].prices[
                      selectedCurrencyIndex
                    ].price
                  "
                  class="my-3"
                  input-type="number"
                ></input-field>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="dialog-footer d-flex gap-3">
              <button
                @click="pricesModal = false"
                type="button"
                class="btn btn-light d-flex gap-2 align-items-center"
              >
                <i class="bi bi-save"></i>
                Save and close
              </button>
            </div>
          </template>
        </el-dialog>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import Api from "@/utils/ApiHelper";

import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";
import InputField from "@/components/Reusable/InputField.vue";
import Dropdown from "@/components/Reusable/Dropdown.vue";
import OrderFormConditions from "./-OrderFormConditions.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { uuid } from "vue-uuid";
import { ref } from "@vue/reactivity";
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { screenDimensions } from "@/utils/helpers";
import { onUpdated, watchEffect } from "@vue/runtime-core";
import { isDate } from "lodash";

type option = {
  connectionId: string;
  resources: any;
  isDefault: boolean;
};

const props = defineProps({
  options: Array,
  activeForms: Array,
  displayConditions: Array,
  item: Object,
  id: String,
  dragging: Boolean,
  isControlOptionsCollapsed: Boolean,
  removeForm: {
    type: Function,
    required: true,
  },
});
const store = useStore();

const emit = defineEmits([
  "formData",
  "isFormValid",
  "setControlsExpandedOptions",
]);
const screenWidth = computed(() => screenDimensions().availWidth);
const dialogWidth = computed(() => {
  if (screenWidth.value > 1025) {
    return "40%";
  } else if (screenWidth.value < 1025 && screenWidth.value > 769) {
    return "50%";
  } else if (screenWidth.value < 769 && screenWidth.value >= 550) {
    return "75%";
  } else {
    return "95%";
  }
});

const collapsedOptions = ref(false);

const collapsedOptionsToggle = () => {
  collapsedOptions.value = !collapsedOptions.value;

  emit("setControlsExpandedOptions", {
    controlId: props.id,
    state: collapsedOptions.value,
  });
};

const isControlRequired = ref(false);
watch(isControlRequired, (newVal, oldVal) => {
  formDataHandler("edit");
});
const controlCode = ref("");

const placeHolder = ref("");
const clickedOption = ref();
const clickedOptionIndex = ref();
const conditionsModal = ref(false);
const conditionsModalToggle = () => {
  conditionsModal.value = !conditionsModal.value;
};
const clickedOptionHandler = (option) => {
  clickedOption.value = option;
  clickedOptionIndex.value = activeOptions.value.indexOf(option);
};
const visibilityControls = computed(() => {
  const notIncludedInVisibility = ["Input Text", "Uploader", "Text Area"];
  const inputsIds = props.options
    ?.filter((i: any) => !notIncludedInVisibility.includes(i.label))
    .map((el: any) => el.id);

  return props.activeForms?.filter((form: any, i: number, array: any[]) => {
    return inputsIds?.includes(form.controlId);
  });
});
/* Currencies */
const currencies = computed(() => {
  const allCurrencies = store.state.LookupQueries.currencies?.data;
  const marketCurrencies = store.state.MarketModule.market?.currencies;

  return allCurrencies?.filter((currency) =>
    marketCurrencies?.find(
      (marketCurrencyId) => marketCurrencyId === currency.id
    )
  );
});
const pricesModal = ref(false);
const selectedCurrency = ref<any>();
const setSelectedCurrency = (currency) => {
  selectedCurrency.value = currency;
};
const selectedCurrencyIndex = computed(() => {
  if (
    currencies.value &&
    currencies.value.length > 0 &&
    selectedCurrency.value
  ) {
    return currencies.value.indexOf(selectedCurrency.value);
  }
});

const manipulateOptionPrices = () => {
  const localCurrencies: any[] = [];
  currencies.value?.forEach((currency) => {
    localCurrencies.push({
      currencyId: currency.id,
      price: 0,
    });
  });

  return localCurrencies;
};

const languages = computed(() => {
  const marketLanguages = store.state.MarketModule.market?.languages;
  const LookupQueriesLanguages = store.state.LookupQueries.languages;
  if (LookupQueriesLanguages && marketLanguages) {
    const data = LookupQueriesLanguages?.data?.filter((lang) =>
      marketLanguages.includes(lang.id)
    );

    return data;
  }
});

const defaultIcon = ref(
  '<i style="font-size: 1.5rem" class="bi bi-caret-right-fill text-black-50"></i>'
);

const selectedFormLabelLanguage = ref();
const selectedFormLabelLanguageIndex = ref(0);
const setSelectedFormLabelLanguage = (lang: any) => {
  selectedFormLabelLanguageIndex.value = languages.value?.indexOf(lang);
  selectedFormLabelLanguage.value = lang;
};

const manipulateFormLabel = () => {
  const resources: any[] = [];

  languages.value?.forEach((el) => {
    resources.push({
      languageId: el.id,
      name: "",
      description: "",
    });
  });

  return resources;
};
const selectedOptionsLanguage = ref();
const selectedOptionLanguageIndex = ref(0);
const setSelectedOptionsLanguage = (lang: any) => {
  selectedOptionLanguageIndex.value = languages.value?.indexOf(lang);
  selectedOptionsLanguage.value = lang;
};

const selectedOption = ref<any>();
const selectedOptionChanged = ref<boolean>(false);

const displayConditionsData = ref<any[]>([]);
const setDisplayConditionsData = (data: any[]) => {
  displayConditionsData.value = data;
  formDataHandler("edit");
};
const displayConditionOperationId = ref<string>("");
const setDisplayConditionOperationId = (id: string) => {
  displayConditionOperationId.value = id;
  formDataHandler("edit");
};

const formData = ref<any>({
  order: null,
  resources: manipulateFormLabel(),
  controlId: selectedOption.value?.id || null,
  options: [],
  displayConditions: displayConditionsData.value,
  isRequired: isControlRequired.value,
  placeHolder: placeHolder.value,
  displayConditionOperationId: displayConditionOperationId.value,
  defaultValue: "",
});

const activeOptions = ref<any>([]);
const id = ref(props.id);

const manipulateOptionResources = () => {
  if (
    languages.value &&
    languages.value.length > 0 &&
    selectedOption.value?.id
  ) {
    let resources: any[] = [];

    const singleResourcesIds = ["date", "time", "number", "datetime-local"];
    const noResourcesIds = ["file"];

    if (
      !singleResourcesIds.includes(selectedOption.value.inputType) &&
      !noResourcesIds.includes(selectedOption.value.inputType)
    ) {
      languages.value.forEach((lang: any) => {
        resources.push({
          languageId: lang.id,
          name: "",
        });
      });

      return resources;
    } else if (singleResourcesIds.includes(selectedOption.value.inputType)) {
      resources.push({
        languageId: languages.value[0].id,
        name: "",
      });
      return resources;
    } else {
      return [];
    }
  }
};

const editingOption = ref<boolean | string>(false);
const editingLabel = ref<boolean | string>(false);
const optionUnderEditing = ref<any>();

const getActiveOrderForm = computed((): any => {
  const form = props.activeForms?.find((form: any) => form.connectionId === id.value);

  if(form) {
    return form
  } else {
    return {
      connectionId: id.value,
      ...formData.value
    }
  }
});
const getSelectedOptionById = computed((): any => {
  if (props.options && getActiveOrderForm.value) {
    const item = props.options.find(
      (i: any) => i.id === getActiveOrderForm.value?.controlId
    );
    return item;
  }
});

const dropdownSelectedItem = (item: any) => {
  selectedOption.value = item;

  const isMultiple = item?.multiple;
  formData.value.controlId = item.id;

  const wontContainOptions = ["file"];

  if (
    isMultiple &&
    activeOptions.value &&
    activeOptions.value.length === 0 &&
    !wontContainOptions.includes(item.inputType)
  ) {
    activeOptions.value.push({
      connectionId: uuid.v4(),
      prices: manipulateOptionPrices(),
      resources: manipulateOptionResources(),
      isDefault: !isMultiple,
      code: "",
    });
  }
};

const formDataHandler = (type: string) => {
  const isMultiple = selectedOption.value?.multiple;
  if (type === "add") {
    activeOptions.value.push({
      connectionId: uuid.v4(),
      prices: manipulateOptionPrices(),
      resources: manipulateOptionResources(),
      isDefault: !isMultiple,
      code: "",
    });
  }

  if (!firstLoading.value) {
    emit("formData", {
      connectionId: id.value,
      resources: formData.value?.resources,
      controlId: selectedOption.value?.id ? selectedOption.value.id : null,
      order: null,
      options: selectedOption.value.multiple ? activeOptions.value : null,
      displayConditions: displayConditionsData.value,
      isRequired: isControlRequired.value,
      placeHolder: placeHolder.value,
      displayConditionOperationId: displayConditionOperationId.value,
      defaultValue: "",
    });
  }
};

const editOption = (option: option) => {
  const item = activeOptions.value.find(
    (item) => item.connectionId === option.connectionId
  );
  if (item) {
    optionUnderEditing.value = item;
    editingOption.value = true;
    item.resources = option.resources;
    if (item.resources[selectedOptionLanguageIndex.value].name.trim() !== "") {
      formDataHandler("edit");
      setTimeout(() => {
        editingOption.value = "done";
      }, 1000);
      setTimeout(() => {
        editingOption.value = false;
      }, 2000);
    } else editingOption.value = "error";
  } else console.log("Item not found");
};

const editLabel = () => {
  if (
    (formData.value &&
      formData.value.resources[selectedFormLabelLanguageIndex.value].name &&
      formData.value.controlId &&
      selectedOption.value.multiple &&
      activeOptions.value.length > 0) ||
    (formData.value &&
      formData.value.resources[selectedFormLabelLanguageIndex.value].name &&
      formData.value.controlId &&
      !selectedOption.value.multiple)
  ) {
    editingLabel.value = true;
    formDataHandler("edit");
    setTimeout(() => {
      editingLabel.value = "done";
    }, 1000);
    setTimeout(() => {
      editingLabel.value = false;
    }, 2000);
  }
};

const removeOption = (option: any) => {
  const target = activeOptions.value?.find(
    (item) => item.connectionId === option.connectionId
  );
  const isLastItem = activeOptions.value.length === 1;

  const directDeletion = () => {
    activeOptions.value = activeOptions.value?.filter(
      (i) => i.connectionId !== target.connectionId
    );

    formDataHandler("edit");
  };

  if (isLastItem) {
    confirmationDialog(true);
  } else {
    directDeletion();
  }
};
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-danger",
    cancelButton: "btn btn-text-success",
  },
  buttonsStyling: false,
});
const confirmationDialog = (isLastOption = false) => {
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "This transaction will remove this entire order!",
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
        props.removeForm(id.value);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          "Cancelled",
          "Your order still alive :)",
          "error"
        );
      }
    });
};

const checkInputHandler = (option) => {
  if (selectedOption.value.isDefaultInputType === "radio") {
    const target = activeOptions.value.find(
      (i) => i.connectionId === option.connectionId
    );

    activeOptions.value.forEach((el) => {
      if (el.connectionId !== target.connectionId) {
        el.isDefault = false;
        return false;
      }
    });
  }
};

/* Upload Image */
const photo = ref();
const url = ref();
const uploadMediaDone = ref<any>(false);
const uploadMediaLoading = ref<any>(false);

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

    const { data }: any = await Api(reqData);
    if (data?.succeeded) {
      uploadMediaDone.value = true;
      uploadMedia(data.data);
    } else uploadMediaDone.value = "failed";
  } catch (error) {
    console.error(error);
  } finally {
    uploadMediaLoading.value = false;
  }
};
const cancel = () => {
  url.value = null;
};
const uploadMedia = (key: any) => {
  activeOptions.value.length = 0;

  activeOptions.value.push({
    id: uuid.v4(),
    resources: [
      {
        id: uuid.v4(),
        name: key,
      },
    ],
    code: "",
    isDefault: false,
  });

  formDataHandler("edit");
};
const getItemImage = (key) => {
  if (!!url.value) {
    return url.value;
  } else if (
    selectedOption.value.inputType === "file" &&
    key?.includes("farahway-13/")
  ) {
    return `https://mfproductimages.s3.amazonaws.com/${key}`;
  } else return "";
};

/* Validate Form */
const isLabelValid = computed(() => {
  const resources = formData.value.resources;

  return !resources.find((i) => !i.name);
});
const isOptionsValid = computed(() => {
  let undefinedResources: boolean = false;
  let undefinedPrices: boolean = false;

  activeOptions.value?.forEach((option) => {
    undefinedResources = !option.resources?.find((i) => !i.name);
    undefinedPrices = !option.prices?.find((i) => !i.price);
  });

  return true;
});

const isWholeFormValid = computed(
  () => isLabelValid.value && isOptionsValid.value
);

const resetActiveOptions = () => {
  activeOptions.value = [
    {
      connectionId: uuid.v4(),
      prices: manipulateOptionPrices(),
      resources: manipulateOptionResources(),
      isDefault: true,
      code: "",
    },
  ];
};

watch(selectedOption, (newValue, oldValue) => {
  if (newValue && oldValue) {
    selectedOptionChanged.value = true;
    if (
      (!newValue.multiple && oldValue.multiple) ||
      (newValue.multiple && !oldValue.multiple)
    ) {
      resetActiveOptions();
    } else if (
      (newValue.isDefaultInputType === "radio" &&
        oldValue.isDefaultInputType === "checkbox") ||
      (newValue.isDefaultInputType === "checkbox" &&
        oldValue.isDefaultInputType === "radio")
    ) {
      activeOptions.value.forEach((el) => {
        el.isDefault = false;
      });
    } else if (
      ["Text Area", "Numeric Input", "Input Text", "Uploader"].includes(
        newValue.label
      )
    ) {
      resetActiveOptions();
    }
  }
  formDataHandler("edit");
});
watch(activeOptions, (newValue, oldValue) => {
  if (!selectedOption.value?.multiple) {
    newValue?.forEach((el) => {
      el.isDefault = true;
    });
  } else {
    newValue?.forEach((el) => {
      el.isDefault = false;
    });
  }
});
watch(
  () => languages.value,
  (newValue) => {
    setSelectedOptionsLanguage(newValue[0]);
    manipulateFormLabel();
    manipulateOptionResources();
  }
);
watch(
  () => currencies.value,
  (newValue) => {
    setSelectedCurrency(newValue[0]);
    manipulateOptionPrices();
  }
);

const firstLoading = ref(false);

const resetData = () => {
  try {
    firstLoading.value = true;
    if (getActiveOrderForm.value) {
      getActiveOrderForm.value?.options?.forEach((option, index, array) => {
        activeOptions.value[index] = option;
      });
      selectedOption.value = getSelectedOptionById.value;
      formData.value = getActiveOrderForm.value;
      placeHolder.value = getActiveOrderForm.value?.placeHolder;
      isControlRequired.value = getActiveOrderForm.value?.isRequired;
      setDisplayConditionOperationId(
        getActiveOrderForm.value?.displayConditionOperationId
      );
      setDisplayConditionsData(getActiveOrderForm.value?.displayConditions);
    }
  } catch (error) {
    console.error(error);
  } finally {
    firstLoading.value = false;
  }
};

onMounted(() => {
  if (currencies.value && currencies.value.length > 0) {
    setSelectedCurrency(currencies.value[0]);
    manipulateOptionPrices();
  }
  if (languages.value && languages.value.length > 0) {
    setSelectedOptionsLanguage(languages.value[0]);
    manipulateFormLabel();
    manipulateOptionResources();
  }
  if (getActiveOrderForm.value && !selectedOptionChanged.value) {
    resetData();
  }
  selectedOptionChanged.value = false;
});
watch(
  () => selectedOption.value,
  (newV, oldV) => {
    resetData();
  }
);

watchEffect(() => {
  if (props.isControlOptionsCollapsed) {
    collapsedOptions.value = props.isControlOptionsCollapsed;
  }
});
onUpdated(() => {
  emit("isFormValid", isWholeFormValid.value);
});
</script>

<style lang="scss" scoped>
.icon-wrapper {
  position: absolute;
  left: 10px;
  top: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

  i {
    font-size: 1.5rem;
  }
}

.form-box {
  border-radius: 10px;
  padding: 10px 5px;
  border: 5px solid rgba(238, 238, 238, 0.29);

  &::before {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    height: 50px;
    width: 100px;
    background: url("@/assets/border.jpg") center no-repeat;
    background-size: cover;
    border-radius: 0 0 200px 0;
    filter: blur(20px);
    z-index: 0;
  }
}
</style>
