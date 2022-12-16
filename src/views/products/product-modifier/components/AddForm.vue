<template>
  <div class="form-modifiers-modal">
    <div
      class="modal fade"
      id="modalForm"
      ref="newProductModifierModalRef"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered mw-800px">
        <div class="modal-content rounded">
          <div class="modal-header p-6 border justify-content-between">
            <h2 class="modal-title px-10 border-">
              {{ $t("addProductModifiers") }}
            </h2>
            <div
              class="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
            >
              <span class="svg-icon svg-icon-1">
                <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
              </span>
            </div>
          </div>
          <!--begin::Modal body-->
          <div class="modal-body scroll-y px-10 px-lg-15 pt-10 pb-10">
            <div class="inputs_fields my-3">
              <Form class="form w-100" ref="ModifierForm" @submit="onSubmit">
                <div class="row">
                  <!--begin:: Resources-->

                  <div class="col-6 my-3">
                    <tabs-duplicator
                      :items="langs"
                      @selectedItem="setSelectedItem"
                    >
                      <template #label="{ item }">
                        {{ item.label }}
                      </template>
                    </tabs-duplicator>
                    <div class="fields">
                      <div>
                        <div class="inputs_fields my-3">
                          <div v-for="(item, i) in form.resources" :key="i">
                            <div v-show="item.languageId == selectedItem.id">
                              <label
                                class="required fs-5 fw-bold mb-2 d-inline"
                              >
                                {{ $t("productModifierName") }}</label
                              >

                              <Field
                                class="form-control form-control-lg form-control-solid"
                                v-model="form.resources[i].name"
                                :name="`resources[${i}].name`"
                                type="text"
                                v-slot="{ field, meta }"
                              >
                                <input
                                  v-bind="field"
                                  type="text"
                                  class="form-control form-control-solid form-control-lg"
                                  :class="{
                                    'is-valid': meta.valid,
                                    'is-invalid': meta.validated && !meta.valid,
                                  }"
                                />
                              </Field>
                            </div>
                            <div class="fv-plugins-message-container">
                              <div class="fv-help-block">
                                <ErrorMessage
                                  :name="`resources[${i}].name`"
                                  class="text-danger"
                                >
                                  <span class="text-danger">
                                    {{ $t("resourcesValidation") }}
                                  </span>
                                </ErrorMessage>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--end::Input-->

                  <!--begin::connected stores -->
                  <div class="col-6" style="margin-top: 68px">
                    <!--begin::Label-->
                    <label class="required fs-5 fw-bold mb-2 d-inline">{{
                      $t("connectedShops")
                    }}</label>

                    <!-- {{ connected shops }} -->

                    <!--begin::Input-->
                    <Field
                      v-slot="{ field }"
                      type="text"
                      class="form-control form-control-lg form-control-solid"
                      name="connectedShops"
                    >
                      <Multiselect
                        mode="tags"
                        v-model="ProductModifiers.connectedShops"
                        v-bind="field"
                        :searchable="true"
                        label="name"
                        value-prop="id"
                        :classes="{
                          container:
                            'multiselect-lg form-control form-control-lg form-control-solid',
                          search:
                            'multiselect-search form-control form-control-solid',
                          clear: 'multiselect-lg-clear',
                        }"
                        :options="marketShops"
                      />
                    </Field>
                    <ErrorMessage
                      name="connectedShops"
                      class="fv-plugins-message-container invalid-feedback"
                    />
                  </div>
                  <!--end::connected shop-->
                </div>
                <!--begin::Input Code-->
                <div class="row">
                  <div class="col-6 my-3">
                    <label class="required fs-5 fw-bold mb-2">{{
                      $t("code")
                    }}</label>
                    <div class="position-relative w-auto h-auto">
                      <Field
                        class="form-control form-control-lg form-control-solid"
                        type="text"
                        name="code"
                        autocomplete="off"
                        v-model="ProductModifiers.code"
                        v-slot="{ field, meta }"
                      >
                        <div class="inputcontainer">
                          <input
                            v-bind="field"
                            class="form-control form-control-solid form-control-lg"
                            :class="{
                              'is-invalid': meta.validated && !meta.valid,
                            }"
                            @blur="checkValueCode($event)"
                          />
                          <div class="icon-container" v-if="codeLoading">
                            <i class="loader"></i>
                          </div>
                        </div>
                      </Field>

                      <span v-if="!isValidCode" class="text-danger">{{
                        validMessageCode
                      }}</span>
                      <ErrorMessage
                        class="text-danger"
                        name="code"
                      ></ErrorMessage>
                    </div>
                  </div>

                  <!--end::Input Code-->

                  <!--begin::Input Order-->
                  <div class="col-md-6 fv-row">
                    <div class="d-flex flex-stack mb-2">
                      <label class="required fs-5 fw-bold mb-2 d-inline">{{
                        $t("order")
                      }}</label>
                    </div>
                    <Field
                      class="form-control form-control-lg form-control-solid"
                      type="number"
                      name="order"
                      autocomplete="off"
                      v-model="ProductModifiers.order"
                      min="0"
                    />
                    <!--end::Input-->
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="order" />
                      </div>
                    </div>
                  </div>
                </div>
                <!--end::Input Order-->

                <!--begin::Input maximumSelectionValue-->
                <div class="row mb-10">
                  <div class="col-md-6 fv-row">
                    <div class="d-flex flex-stack mb-2">
                      <label class="required fs-5 fw-bold mb-2 d-inline">{{
                        $t("maximumSelectionValue")
                      }}</label>
                    </div>

                    <Field
                      class="form-control form-control-lg form-control-solid"
                      type="number"
                      name="maximumSelectionValue"
                      autocomplete="off"
                      v-model.number="ProductModifiers.maximumSelectionValue"
                      min="0"
                    />
                    <!--end::Input-->
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="maximumSelectionValue" />
                      </div>
                    </div>
                  </div>
                  <!--end::Input maximumSelectionValue-->

                  <!--begin::Input minimumSelectionValue-->
                  <div class="col-md-6 fv-row">
                    <div class="d-flex flex-stack mb-2">
                      <label class="required fs-5 fw-bold mb-2 d-inline">{{
                        $t("minimumSelectionValue")
                      }}</label>
                    </div>
                    <Field
                      class="form-control form-control-lg form-control-solid"
                      type="number"
                      name="minimumSelectionValue"
                      autocomplete="off"
                      v-model.number="ProductModifiers.minimumSelectionValue"
                      min="0"
                    />
                    <!--end::Input-->
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="minimumSelectionValue" />
                      </div>
                    </div>
                  </div>
                </div>
                <!--begin::Input minimumSelectionValue-->

                <div class="fv-row mb-10">
                  <div class="d-flex justify-content-start align-items-center">
                    <!--begin::Input isPublished On JetOrder-->
                    <div class="form-check form-check-solid">
                      <input
                        class="form-check-input"
                        v-model="ProductModifiers.isPublishedOnJetOrder"
                        type="checkbox"
                        checked=""
                        data-kt-check="false"
                      /><label class="form-check-label ps-2">
                        {{ $t("isPublishedOnJetOrder") }}
                      </label>
                    </div>
                    <!--end::Input  isPublished On JetOrder-->

                    <!--begin::Input isPublished On ShopLink-->
                    <div class="form-check form-check-solid mx-5">
                      <input
                        class="form-check-input"
                        v-model="ProductModifiers.isPublishedOnShopLink"
                        type="checkbox"
                        checked=""
                        data-kt-check="false"
                      /><label class="form-check-label ps-2">
                        {{ $t("isPublishedOnShopLink") }}
                      </label>
                    </div>
                    <!--end::Input  isPublished On ShopLink-->
                  </div>
                </div>

                <!--begin::Array Modifier Group Items-->
                <div
                  v-if="modifierGroupItems && modifierGroupItems.length > 0"
                  class="mt-5"
                >
                  <section>
                    <div
                      class="d-flex justify-content-between gap-1 align-items-center flex-wrap"
                    >
                      <label class="form-label">Modifiers Group items</label>
                      <div>
                        <button
                          @click="toggleAddGroupItemDialog"
                          type="button"
                          class="btn btn-sm bg-light-primary text-primary btn-hover-rise rounded-pill"
                        >
                          + Add new modifier group item
                        </button>
                      </div>
                    </div>
             
                    <table class="table gs-3 gy-3 gx-5">
                      <thead>
                        <tr
                          class="fw-bold fs-5 text-gray-800 border-bottom border-gray-200 text-capitalize"
                        >
                          <th class="text-truncate">#</th>
                          <th class="text-truncate">name</th>
                          <th class="text-truncate">price</th>
                          <th class="text-truncate">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item, index) in modifierGroupItems"
                          :key="item.id"
                        >
                          <td class="text-truncate">
                            <div class="td-holder" v-text="index + 1" />
                          </td>
                          <td class="text-truncate">
                            <div
                              class="td-holder"
                              v-text="item.resources[0].name"
                              :title="item.resources[0].name"
                            />
                          </td>
                          <td class="text-truncate">
                            <div
                              class="td-holder"
                              v-text="item.prices[0].price"
                            />
                          </td>
                          <td>
                            <div class="td-holder gap-2">
                              <button
                                type="button"
                                class="btn btn-sm btn-bg-light rounded-pill btn-text-info me-2"
                                title="edit"
                                @click="
                                  setClickedModifier(item),
                                    toggleAddGroupItemDialog()
                                "
                              >
                                <i
                                  class="bi bi-pencil-square text-info"
                                  style="font-size: 1rem"
                                ></i>
                              </button>
                              <button
                                type="button"
                                class="btn btn-sm btn-bg-light rounded-pill btn-text-danger"
                                title="remove"
                                @click="removeModifier(item.id)"
                              >
                                <i
                                  class="bi bi-trash3 text-danger"
                                  style="font-size: 1rem"
                                ></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </section>
                </div>
                <div v-else class="mt-5">
                  <button
                    @click="toggleAddGroupItemDialog"
                    type="button"
                    class="btn bg-light-success text-primary btn-hover-rise btn-sm mb-5"
                  >
                    + Add modifier group item
                  </button>
                  <span class="text-danger row">
                    {{ $t("modifires must have one option at least") }}
                  </span>
                </div>
                <el-dialog
                  class="modal fade"
                  v-model="groupItemDialog"
                  :title="
                    !clickedModifier
                      ? 'Add Group Item Modifier'
                      : clickedModifier.resources[0].name
                  "
                  :width="screenDimensions().availWidth > 480 ? '480px' : '95%'"
                  top="5vh"
                >
                  <template #default>
                    <section
                      style="
                        max-height: 70vh;
                        overflow: auto;
                        overflow-x: hidden;
                      "
                    >
                      <div>
                        <div>
                          <div>
                            <label
                              for="modifierItem1Name"
                              class="form-label mb-0 mt-3"
                            >
                              Name
                            </label>
                            <tabs-duplicator
                              v-if="langs && langs.length > 0"
                              :items="langs"
                              @selectedItem="setselectedItemgroup"
                            >
                              <template #label="{ item }">
                                {{ item.label }}
                              </template>
                            </tabs-duplicator>
                            <input
                              type="text"
                              id="modifierItem1Name"
                              class="form-control mt-2"
                              placeholder="Modifier Name"
                              v-model="
                                itemInstance.resources[selectedItemgroup.id]
                              "
                            />
                          </div>

                          <div>
                            <label
                              for="modifierItem1Price"
                              class="form-label mb-0 mt-3"
                            >
                              Price
                            </label>
                            <tabs-duplicator
                              v-if="Currency && Currency.length > 0"
                              :items="Currency"
                              @selectedItem="setselectedItemgroupCurrency"
                              class="mb-3"
                            >
                              <template #label="{ item }">
                                <span>
                                  {{ item.label }}
                                </span>
                              </template>
                            </tabs-duplicator>
                            <input
                              type="number"
                              id="modifierItem1Price"
                              class="form-control"
                              placeholder="Modifier Price"
                              v-model="
                                itemInstance.prices[
                                  selectedItemgroupCurrency.id
                                ]
                              "
                            />
                          </div>

                          <div>
                            <label
                              for="modifierItem1Order"
                              class="form-label mb-0 mt-3"
                            >
                              Order
                            </label>
                            <input
                              type="number"
                              id="modifierItem1Order"
                              class="form-control"
                              placeholder="Modifier Order"
                              v-model="itemInstance.order"
                            />
                          </div>

                          <div class="separator my-5 border-3 rounded-pill" />

                          <div>
                            <div class="form-check form-check-solid">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                @change="check($event, itemInstance)"
                                value=""
                                id="isSelectedModifier"
                                v-model="itemInstance.selected"
                              />
                              <label class="form-check-label ps-2">
                                Selected
                              </label>
                            </div>
                          </div>
                        </div>
                        <div class="mt-7">
                          <button
                            v-if="!clickedModifier"
                            type="button"
                            class="btn btn-primary btn-text-white btn-hover-rise shadow-sm"
                            :disabled="!isAddModifierGroupFormValid"
                            @click="pushNewModifierGroupItems"
                          >
                            Submit Data
                          </button>
                          <button
                            v-else
                            type="button"
                            class="btn btn-primary btn-text-white btn-hover-rise shadow-sm"
                            :disabled="!isAddModifierGroupFormValid"
                            @click="editModifierGroupItem"
                          >
                            Edit Data
                          </button>
                        </div>
                      </div>
                    </section>
                  </template>
                </el-dialog>

                <!--end::Array Modifier Group Items-->
                <div class="modal-footer">
                  <div
                    class="w-100 d-flex justify-content-between align-items-center"
                  >
                    <!--begin::group button-->
                    <button
                      type="button"
                      class="btn btn-lg btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      {{ $t("close") }}
                    </button>
                    <button
                      :disabled="!isSubmitAllValid"
                      type="submit"
                      ref="submitButton"
                      class="btn btn-lg btn-primary addproduct"
                    >
                      <span v-if="!isLoading">
                        {{ $t("addProductModifiers") }}
                        <span class="fas fa-plus"></span>
                      </span>
                      <span v-if="isLoading" class="indicator-progress d-block">
                        {{ $t("wait") }}
                        <span
                          class="spinner-border spinner-border-sm align-middle ms-2"
                        />
                      </span>
                    </button>
                    <!--end::group button-->
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.col-md-6.fv-row.order {
  margin-top: 30px;
}
.multiselect-tag {
  background: #04c8c8;
}
.add-another-item {
  margin-bottom: 13px;
}
.form-tags-modal {
  .modal.fade {
    select.form-select {
      outline: none;
    }
    label.form-check {
      span {
        font-size: 14px !important;
      }
    }
  }
}
</style>

<script lang="ts" setup>

import { uuid } from "vue-uuid";
import { ref, computed, reactive, watch, onMounted, unref } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import Swal from "sweetalert2";
import { hideModal } from "@/core/helpers/dom";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import Multiselect from "@vueform/multiselect";
import i18n from "@/core/plugins/i18n";
import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";

//
interface screenDimensionsObject {
  availHeight: number;
  availWidth: number;
}
const screenDimensions = (): screenDimensionsObject => {
  const availWidth = window.innerWidth;
  const availHeight = window.innerHeight;

  return { availWidth, availHeight };
};

const store = useStore();
const marketShops = computed(() => store.getters.getMarketData.shops);
const Currency = computed(() => store.getters.getSupportedCurrencies);
const langs = computed(() => store.getters.getSupportedLanguages);
const ModifierForm = ref(null);
const codeLoading = ref<boolean>(false);
const isLoading = ref(false);

const selectedItem = ref();
const selectedItemgroup = ref("");
const selectedItemgroupCurrency = ref("");

const emit = defineEmits(["modifier-added"]);
const ProductModifiers = reactive({
  resources: [] as any,
  code: "",

  order: 0,
  connectedShops: [],
  minimumSelectionValue: 0,
  maximumSelectionValue: 0,
  isPublishedOnJetOrder: true,
  isPublishedOnShopLink: true,
});
const form = reactive(ProductModifiers);

const resetData = () => {
  if (langs.value && langs.value.length > 0) {
    setSelectedItem(langs.value[0]);
    setselectedItemgroup(langs.value[0]);
  }
  if (Currency.value && Currency.value.length > 0) {
    setselectedItemgroupCurrency(Currency.value[0]);
  }
};

onMounted(async () => {
  resetData();
  if (langs.value && langs.value.length) {
    initResources();
  }
});
const itemInstance = ref({
  resources: {},
  prices: {},
  order: null,
  selected: false,
  image: "",
  timeStamp: 0,
});

const newProductModifierModalRef = ref<null | HTMLElement>(null);
// initial languages and price
const clickedModifier = ref();
const setClickedModifier = (item) => {
  clickedModifier.value = item;

  itemInstance.value.timeStamp = item.timeStamp;
  itemInstance.value.order = item.order;
  itemInstance.value.selected = item.selected;

  item.resources?.forEach((el) => {
    itemInstance.value.resources[el.languageId] = el.name;
  });
  item.prices?.forEach((el) => {
    itemInstance.value.prices[el.currencyId] = el.price;
  });
};

function initResources() {
  langs.value.forEach((element) => {
    form.resources.push({
      languageId: element.id,
      name: "",
    });
  });
}

// check time selected item in modifierGroup
const check = (e, item) => {
  item.timeStamp = e.timeStamp;
};

const isAddModifierGroupFormValid = computed(() => {
  const item = unref(itemInstance.value);
  const langValid = Object.keys(item.resources).length === langs.value?.length;
  const priceValid = Object.keys(item.prices).length === Currency.value?.length;
  const isOrderValid = !!item.order && typeof +item.order === "number";

  return langValid && priceValid && isOrderValid;
});

const pushNewModifierGroupItems = () => {
  const item = unref(itemInstance.value);
  let resources: any[] = [];
  let prices: any[] = [];

  Object.keys(item.resources).forEach((langId: any) => {
    resources.push({
      languageId: langId,
      name: item.resources[langId],
    });
  });
  Object.keys(item.prices).forEach((currencyId: any) => {
    prices.push({
      currencyId: currencyId,
      price: item.prices[currencyId],
    });
  });

  modifierGroupItems.value.push({
    id: uuid.v4(),
    selected: item.selected,
    order: item.order,
    prices,
    resources,
    timeStamp: item.timeStamp,
  });

  toggleAddGroupItemDialog();
  itemInstance.value = {
    resources: {},
    prices: {},
    order: null,
    timeStamp: 0,
    selected: false,
    image: "",
  };
};
const editModifierGroupItem = () => {
  if (clickedModifier.value) {
    const item = unref(itemInstance);
    let resources: any[] = [];
    let prices: any[] = [];

    let targeted = modifierGroupItems.value.find(
      (el: any) => el.id === clickedModifier.value.id
    );

    Object.keys(item.resources).forEach((langId: any) => {
      resources.push({
        languageId: langId,
        name: item.resources[langId],
      });
    });
    Object.keys(item.prices).forEach((currencyId: any) => {
      prices.push({
        currencyId: currencyId,
        price: item.prices[currencyId],
      });
    });

    targeted.order = item.order;
    targeted.selected = item.selected;
    targeted.resources = resources;
    targeted.prices = prices;

    toggleAddGroupItemDialog();
  }
};
// get selectedItem for tabsDuplicator

const setSelectedItem = (payload: any) => {
  selectedItem.value = payload;
};
const setselectedItemgroup = (payload: any) => {
  selectedItemgroup.value = payload;
};
const setselectedItemgroupCurrency = (payload: any) => {
  selectedItemgroupCurrency.value = payload;
};

const submitButton = ref<HTMLButtonElement | null>(null);

//Validation Unique Code
const isValidCode = computed(() => {
  return store.state.ProductModifiers.isValidCode;
});
const validMessageCode = computed(() => {
  return store.state.ProductModifiers.messageIsValidCode;
});
function checkValueCode(e) {
  codeLoading.value = true;
  if (e.target.value.length > 3) {
    store
      .dispatch(Actions.IS_VALID_CODE_PRODUCT_MODIFIER, {
        id: 0,
        code: e.target.value,
      })
      .then(() => {
        codeLoading.value = false;
      });
  }
}
const modifierGroupItems = ref<any[]>([]);

const groupItemDialog = ref(false);
const confirmationDialog = ref(false);

const targetRemovedDetails = ref({
  id: null,
  array: "",
});
const isSubmitAllValid = computed(() => {
  const langValid =
    Object.keys(ProductModifiers.resources).length === langs.value?.length;
  const selectedShops = ProductModifiers.connectedShops.length > 0;
  const code = ProductModifiers.code;
  const order = ProductModifiers.order;

  const groupItems = modifierGroupItems.value.length > 0;

  return langValid && selectedShops && code && order && groupItems;
});
const toggleConfirmationDialog = (info) => {

  targetRemovedDetails.value = info;

  confirmationDialog.value = !confirmationDialog.value;
};
const toggleAddGroupItemDialog = () => {
  groupItemDialog.value = !groupItemDialog.value;
};
const reqLoading = ref<boolean>(false);
const reqErrorMsg = ref("");
const modifiersTable = ref<any[]>([]);
const removeModifier = async (id) => {
  try {
    Swal.fire({
      title: i18n.global.t("alertText"),
      text: i18n.global.t("deleteModifierAlertText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: i18n.global.t("cancel"),
      confirmButtonText: i18n.global.t("yesSure"),
    }).then((status) => {
      if (status.isConfirmed) {
        
        modifierGroupItems.value = modifierGroupItems.value.filter(
          (i) => i.id !== id
        );
        console.log("ee", modifierGroupItems.value);
        toggleConfirmationDialog({ id: null, array: "" });
      }
    });
  } catch (error) {
    reqErrorMsg.value = "something went wrong, please try again later!";
    console.error(error);
  } finally {
    reqLoading.value = false;
  }
};
// Verify that the value specified in ProductModifiers.maximumSelectionValue has not been exceeded
const getSelectionNumber = () => {
  let countSelection = 0;
  modifierGroupItems.value.forEach((el) => {
    if (el.selected) {
      countSelection++;
    }
  });
  if (countSelection > ProductModifiers.maximumSelectionValue) {
    let selectedItemArray = [] as any;
    modifierGroupItems.value.forEach((el) => {
      if (el.selected) {
        selectedItemArray.push(el);
      }
    });
    // get First item selected
    let min = selectedItemArray.reduce((prev, curr) =>
      prev.timeStamp < curr.timeStamp ? prev : curr
    );
  
    modifierGroupItems.value.forEach((el) => {
      if (el.timeStamp == min.timeStamp) {
        el.selected = false;
      }
    });
    getSelectionNumber();
  } else {
    return true;
  }
};
watch(groupItemDialog, (newV) => {
  if (!newV) {
    clickedModifier.value = undefined;
    itemInstance.value = {
      resources: {},
      prices: {},
      order: null,
      selected: false,
      image: "",
      timeStamp: 0,
    };
  }
});

//Form submit function

function onSubmit() {
  isLoading.value = true;
  if (isValidCode.value) {
    if (getSelectionNumber()) {
      console.log(modifierGroupItems.value);
      store
        .dispatch(Actions.ADD_MODIFIERS, {
          ...ProductModifiers,
          modifierGroupItems: [...modifierGroupItems.value],
        })
        .then(() => {
          isLoading.value = false;
          emit("modifier-added");

          hideModal(newProductModifierModalRef.value);
          ProductModifiers.connectedShops = [];
        });
    } else {
      let name = [] as any;
      modifierGroupItems.value.forEach((el) => {
        if (el.selected) {
          name.push(el.resources[0].name);
        }
      });
     
      Swal.fire({
        icon: "success",
        html: `You Have Selecetd  <span style='color:#04c8c8'> ${name}</span> .`,
        buttonsStyling: false,
        confirmButtonText: i18n.global.t("ok"),
        cancelButtonText: i18n.global.t("cancel"),
        customClass: {
          confirmButton: "btn fw-bold btn-light-primary",
        },
      }).then((status) => {
        if (status.isConfirmed) {
          isLoading.value = true;
          store
            .dispatch(Actions.ADD_MODIFIERS, {
              ...ProductModifiers,
              modifierGroupItems: [...modifierGroupItems.value],
            })
            .then(() => {
              isLoading.value = false;
              emit("modifier-added");

              hideModal(newProductModifierModalRef.value);
              ProductModifiers.connectedShops = [];
            });
        }
      });
    }
  }
}
</script>
<style scoped>

.fv-row.mb-10 {
  margin-top: 35px;
}
</style>
