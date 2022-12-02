<template>
  <div class="form-modifiers-modal">
    <div
      class="modal fade"
      id="modalForm"
      ref="newProductModifierModalRef"
      tabindex="-1"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered mw-800px">
        <div class="modal-content rounded">
          <div class="modal-header p-6 border justify-content-between">
            <h2 class="modal-title px-10 border-">
              {{ $t("addProductModifiers") }}
            </h2>
            <div
              class="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal">
              <span class="svg-icon svg-icon-1">
                <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
              </span>
            </div>
          </div>
          <!--begin::Modal body-->
          <div class="modal-body scroll-y px-10 px-lg-15 pt-10 pb-10">
            <div class="inputs_fields my-3">
              <Form
                class="form w-100"
                ref="ModifierForm"
                @submit="validate"
                :validation-schema="schema">
                <div class="row">
                  <!--begin:: Resources-->
                  
                  <div class="col-6 my-3">
                    <tabs-duplicator
                      :items="langs"
                      @selectedItem="setSelectedItem">
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
                                class="required fs-5 fw-bold mb-2 d-inline">
                                {{ $t("productModifierName") }}</label
                              >

                              <Field
                                class="form-control form-control-lg form-control-solid"
                                v-model="form.resources[i].name"
                                :name="`resources[${i}].name`"
                                type="text"
                                v-slot="{ field, meta }">
                                <input
                                  v-bind="field"
                                  :dir="selectedItem.dir"
                                  type="text"
                                  class="form-control form-control-solid form-control-lg"
                                  :class="{
                                    'is-valid': meta.valid,
                                    'is-invalid': meta.validated && !meta.valid,
                                  }" />
                              </Field>

                            
                            </div>
                            <div class="fv-plugins-message-container">
                              <div class="fv-help-block">
                                <ErrorMessage
                                  :name="`resources[${i}].name`"
                                  class="text-danger">
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
                      name="connectedShops">
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
                        :options="marketShops" />
                    </Field>
                    <ErrorMessage
                      name="connectedShops"
                      class="fv-plugins-message-container invalid-feedback" />
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
                        v-slot="{ field, meta }">
                        <div class="inputcontainer">
                          <input
                            v-bind="field"
                            class="form-control form-control-solid form-control-lg"
                            :class="{
                              'is-invalid': meta.validated && !meta.valid,
                            }"
                            @blur="checkValueCode($event)" />
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
                        name="code"></ErrorMessage>
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
                      min="0" />
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
                      v-model="ProductModifiers.maximumSelectionValue"
                      min="0" />
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
                      v-model="ProductModifiers.minimumSelectionValue"
                      min="0" />
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
                        data-kt-check="false" /><label
                        class="form-check-label ps-2">
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
                        data-kt-check="false" /><label
                        class="form-check-label ps-2">
                        {{ $t("isPublishedOnShopLink") }}
                      </label>
                    </div>
                    <!--end::Input  isPublished On ShopLink-->
                  </div>
                </div>

                <!--begin::Array Modifier Group Items-->
                <div class="fw-bolder fs-3 rotate collapsible mb-7">
                  {{ $t("modifierGroupItem") }}
                </div>
                <!--begin::loop in  Modifier Group Items-->
                <div class="col-12 mt-5">
                  <div v-for="(groupItem, index) in formgroup" :key="index">
                    <!--begin:: Resources-->
                    <div class="card modifier-card">
                      <label class="required fs-5 fw-bold mb-2 d-inline"
                        >{{ $t("modifierItem") }} {{ index + 1 }}</label
                      >
                      <div class="col-12 my-3">
                        <tabs-duplicator
                          :items="langs"
                          @selectedItem="setselectedItemgroup">
                          <template #label="{ item }">
                            {{ item.label }}
                          </template>
                        </tabs-duplicator>
                        <div class="fields">
                          <div>
                            <div class="inputs_fields my-3">
                              <div
                                v-for="(item, i) in groupItem.resources"
                                :key="i">
                                <div
                                  v-show="
                                    item.languageId == selectedItemgroup.id
                                  ">
                                  <label
                                    class="required fs-5 fw-bold mb-2 d-inline"
                                    >{{ $t("productModifierName") }}
                                  </label>
                                  <Field
                                    v-model="groupItem.resources[i].name"
                                    :name="`formgroup[${index}].resources[${i}].name`"
                                    type="text"
                                    v-slot="{ field, meta }"
                                    :label="`Product Modifier Name$`">
                                    <input
                                      v-bind="field"
                                      :dir="selectedItemgroup.dir"
                                      type="text"
                                      class="form-control form-control-solid form-control-lg"
                                      :class="{
                                        'is-valid': meta.valid,
                                        'is-invalid':
                                          meta.validated && !meta.valid,
                                      }" />
                                  </Field>
                                  <ErrorMessage
                                    :name="`formgroup[${index}].resources[${i}].name`"
                                    class="text-danger">
                                    <span class="text-danger">
                                      {{ $t("msgLang") }}
                                    </span>
                                  </ErrorMessage>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!--end::Input-->
                      <div class="fv-row mb-10">
                        <div class="form-check form-check-solid mx-5">
                          <input
                            :key="index"
                            class="form-check-input"
                            v-model="groupItem.Selected"
                            type="checkbox"
                            checked=""
                            @change="check($event, groupItem)"
                            data-kt-check="false" /><label
                            class="form-check-label ps-2">
                            {{ $t("Selected") }}
                          </label>
                        </div>
                      </div>
                      <!--start::Price-->
                      <div class="row mb-10">
                        <div class="col-md-6 fv-row">
                          <tabs-duplicator
                            :items="Currency"
                            @selectedItem="setselectedItemgroupCurrency">
                            <template #label="{ item }">
                              {{ item.label }}
                            </template>
                          </tabs-duplicator>
                          <div class="fields">
                            <div>
                              <div class="inputs_fields my-3">
                                <div
                                  v-for="(item, i) in groupItem.prices"
                                  :key="i">
                                  <div
                                    v-show="
                                      item.currencyId ==
                                      selectedItemgroupCurrency.id
                                    ">
                                    <!-- <label class="required fs-5 fw-bold mb-2 d-inline"
                                    >{{ $t("price") }} </label
                                  > -->
                                    <Field
                                      v-model="groupItem.prices[i].price"
                                      :name="`formgroup[${index}].prices[i].price`"
                                      type="text"
                                      v-slot="{ field, meta }"
                                      :label="`Product Modifier Name$`">
                                      <input
                                        v-bind="field"
                                        :dir="selectedItemgroupCurrency.dir"
                                        type="number"
                                        min="0"
                                        class="form-control form-control-solid form-control-lg"
                                        :class="{
                                          'is-valid': meta.valid,
                                          'is-invalid':
                                            meta.validated && !meta.valid,
                                        }" />
                                    </Field>
                                    <ErrorMessage
                                      :name="`formgroup[${index}].prices[i].price`"
                                      class="text-danger">
                                      <!-- <span class="text-danger">
                                        Please enter the Price in all Currency
                                      </span> -->
                                    </ErrorMessage>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6 fv-row order">
                          <label class="required fs-5 fw-bold mb-2 d-inline"
                            >{{ $t("order") }}
                          </label>

                          <Field
                            class="form-control form-control-lg form-control-solid"
                            type="number"
                            :name="`formgroup[${index}].order`"
                            autocomplete="off"
                            v-model="groupItem.order"
                            min="0" />
                          <!--end::Input-->
                          <div class="fv-plugins-message-container">
                            <div class="fv-help-block">
                              <ErrorMessage
                                :name="`formgroup[${index}].order`" />
                            </div>
                          </div>
                        </div>

                        <!--end::Input-->
                      </div>
                      <div class="fv-row mb-10" v-if="index != 0">
                        <button
                          type="button"
                          class="btn btn-lg btn-secondary"
                          @click="removeItem(index)">
                          {{ $t("remove") }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <!--end::loop in  Modifier Group Items-->
                <button
                  type="button"
                  class="btn btn-lg btn-primary add-another-item"
                  @click="addnewItem()">
                  {{ $t("addAnotherItem") }}
                </button>
                <!--end::Array Modifier Group Items-->
                <div class="modal-footer">
                  <div
                    class="w-100 d-flex justify-content-between align-items-center">
                    <!--begin::group button-->
                    <button
                      type="button"
                      class="btn btn-lg btn-secondary"
                      data-bs-dismiss="modal">
                      {{ $t("close") }}
                    </button>
                    <button
                      type="submit"
                      ref="submitButton"
                      class="btn btn-lg btn-primary addproduct">
                      <span v-if="!isLoading">
                        {{ $t("addProductModifiers") }}
                        <span class="fas fa-plus"></span>
                      </span>
                      <span v-if="isLoading" class="indicator-progress d-block">
                        {{ $t("wait") }}
                        <span
                          class="spinner-border spinner-border-sm align-middle ms-2" />
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
import { ref, computed, reactive, watch, onMounted } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import Swal from "sweetalert2";
import { hideModal } from "@/core/helpers/dom";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import Multiselect from "@vueform/multiselect";
import * as yup from "yup";
import i18n from "@/core/plugins/i18n";
import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";

//
interface Price {
  currencyId: string;
  price: string;
}
interface Resources {
  languageId: string;
  name: string;
}
const store = useStore();
const marketShops = computed(() => store.getters.getMarketData.shops);
const Currency = computed(() => store.getters.getSupportedCurrencies);
console.log(store.getters);
const langs = computed(() => store.getters.getSupportedLanguages);
const ModifierForm = ref(null);
const codeLoading = ref<boolean>(false);
const isLoading = ref(false);

const selectedItem = ref();
const selectedItemgroup = ref("");
const selectedItemgroupCurrency = ref("");
const getlang = () => {
  let resource = ref<Resources[]>([]);
  
  langs.value.forEach((el) => {
    resource.value.push({ languageId: el.id, name: "" });
  });
  return resource.value;
};

const getPrice = () => {
  let ArrayPrices = ref<Price[]>([]);
  Currency.value.forEach((el) => {
    ArrayPrices.value.push({
      currencyId: el.id,
      price: "",
    });
  });
  return ArrayPrices.value;
};
const emit = defineEmits(["modifier-added"]);
// initial modifierGroup ProductModifier
const modifierGroupItems = reactive([
  {
    order: 0,
    Selected: false,
    timeStamp: 0,

    resources: [],
    prices: [],
  },
]);
const ProductModifiers = reactive({
  resources: [],
  code: "",

  order: 0,
  connectedShops: [],
  minimumSelectionValue: 0,
  maximumSelectionValue: 0,
  isPublishedOnJetOrder: true,
  isPublishedOnShopLink: true,
  modifierGroupItems,
});
const form = reactive(ProductModifiers);
const formgroup = reactive(modifierGroupItems);

onMounted(async () => {
  if (langs.value && langs.value.length) {
    initResources();
    selectedItem.value = langs.value[0];
    selectedItemgroup.value = langs.value[0];
    selectedItemgroupCurrency.value = Currency.value[0];
  }
  watch(langs, (newVal) => {
    if (newVal && newVal.length) {
      initResources();
      selectedItem.value = newVal[0];
      selectedItemgroup.value = newVal[0];
    }
  });
});
const newProductModifierModalRef = ref<null | HTMLElement>(null);
// initial languages and price

function initResources() {
  langs.value.forEach((element) => {
    form.resources.push({
      languageId: element.id,
      name: "",
     
    });

    formgroup[0].resources.push({
      languageId: element.id,
      name: "",
      
    });
  });
  Currency.value.forEach((el) => {
    formgroup[0].prices.push({
      currencyId: el.id,
      price: "",
    });
  });
}
// check time selected item in modifierGroup
const check = (e, item) => {
  item.timeStamp = e.timeStamp;
};

// reset form after add
function resetForm() {
  ProductModifiers.resources = [];
  ProductModifiers.connectedShops = [];
  ProductModifiers.code = "";
  ProductModifiers.order = 1;
  ProductModifiers.isPublishedOnJetOrder = true;
  ProductModifiers.isPublishedOnShopLink = true;
  initResources()
  ModifierForm.value?.resetForm();
}
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

// Remove and Add new Item to ModifierGroup
const removeItem = (index) => {
  modifierGroupItems.splice(index, 1);
};
const addnewItem = (i) => {
  formgroup.push({
    order: 0,
    Selected: false,
    timeStamp: 0,

    resources: getlang(),
    prices: getPrice(),
  });
};
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

// Verify that the value specified in ProductModifiers.maximumSelectionValue has not been exceeded
const getSelectionNumber = () => {
  let countSelection = 0;
  ProductModifiers.modifierGroupItems.forEach((el) => {
    if (el.Selected) {
      countSelection++;
    }
  });

  if (countSelection > ProductModifiers.maximumSelectionValue) {
    let selectedItemArray = [];
    ProductModifiers.modifierGroupItems.forEach((el) => {
      if (el.Selected) {
        selectedItemArray.push(el);
      }
    });
    // get First item selected

    let min = selectedItemArray.reduce((prev, curr) =>
      prev.timeStamp < curr.timeStamp ? prev : curr
    );
    ProductModifiers.modifierGroupItems.forEach((el) => {
      if (el.timeStamp == min.timeStamp) {
        el.Selected = false;
      }
    });
    getSelectionNumber();
  } else {
    return true;
  }
};

//Create form validation object
const schema = yup.object({
  code: yup
    .string()
    .min(4, i18n.global.t("codeNotValid"))
    .required(i18n.global.t("fieldRequired")),
  order: yup.number().required(i18n.global.t("fieldRequired")),
  connectedShops: yup
    .array()
    .of(yup.number())
    .required(i18n.global.t("fieldRequired")),
  resources: yup.array().of(
    yup.object().shape({
      name: yup.string().required(i18n.global.t("fieldRequired")),
      languageId: yup.string(),
    })
  ),

});
function validate() {
  ModifierForm?.value?.validate().then(({ valid }) => {
    if (valid) {
      onSubmit();
    }
  });
}
//Form submit function

function onSubmit() {
  if (isValidCode.value) {
    if (getSelectionNumber()) {
      store.dispatch(Actions.ADD_MODIFIERS, ProductModifiers).then(() => {
        isLoading.value = false;
        emit("modifier-added");
        resetForm();
        hideModal(newProductModifierModalRef.value);
        ProductModifiers.connectedShops = [];
      });
    } else {
      let name = [];
      ProductModifiers.modifierGroupItems.forEach((el) => {
        if (el.Selected) {
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
          store.dispatch(Actions.ADD_MODIFIERS, ProductModifiers).then(() => {
            isLoading.value = false;
            emit("modifier-added");
            resetForm();
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
.card.modifier-card {
  padding: 28px;
  border: 1px solid #04c8c8;
  margin-bottom: 20px;
}
.fv-row.mb-10 {
  margin-top: 35px;
}
</style>
