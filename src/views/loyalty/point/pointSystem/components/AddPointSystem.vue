<template>
  <!-- Start Form-Modal Add Point System -->
  <div
    class="modal fade"
    ref="addPointSystemRef"
    id="product-brand-modal"
    tabindex="-1"
    aria-hidden="true"
  >
    <!-- Start Modal dialog -->
    <div class="modal-dialog modal-dialog-centered mw-800px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_create_api_key_header">
          <h2>
            {{ $t("addPointSystem") }}
          </h2>
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="/media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
        </div>
        <Form
          ref="pointSystemForm"
          :validation-schema="schema"
          class="form fv-plugins-bootstrap5 fv-plugins-framework p-5"
          @submit="submit"
        >
          <div class="row">
            <!-- Start Resources  -->
            <div class="col-12 my-3">
              <tabs-duplicator :items="langs" @selectedItem="setSelectedItem">
                <template #label="{ item }">
                  {{ item.label }}
                </template>
              </tabs-duplicator>
            </div>
            <!-- End Resources  -->

            <!-- Start Market Connected Shops  -->
            <div class="col-12 my-3">
              <label class="required fs-5 fw-bold mb-2 d-inline">{{
                $t("connectedShops")
              }}</label>

              <Field
                v-slot="{ field, meta }"
                type="text"
                class="form-control form-control-lg form-control-solid"
                name="shopIds"
              >
                <Multiselect
                  mode="tags"
                  v-model="form.shopIds"
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
                  :class="{
                    'is-valid': meta.valid,
                    'is-invalid': meta.validated && !meta.valid,
                  }"
                />
              </Field>

              <ErrorMessage :name="`shopIds`" class="text-danger">
                <span class="text-danger"> {{ $t("requiredShopName") }} </span>
              </ErrorMessage>
              <div class="fs-5 fw-bold mt-3 text-muted">
                <small>
                  {{ $t("pointSystemNote") }}
                </small>
              </div>
            </div>
            <!-- End Market Connected Shops  -->

            <!-- Start From Money To Points Values  -->
            <div class="col-12 my-3 mt-5">
              <h5 class="mb-3">{{ $t("fromMoneyToPointsValues") }}</h5>
              <tabs-duplicator
                :items="Currency"
                @selectedItem="setSelectedFromMoney"
              >
                <template #label="{ item }">
                  {{ item.label }}
                </template>
              </tabs-duplicator>
              <div class="fields">
                <div class="inputs_fields my-3">
                  <div
                    v-for="(item, i) in form.fromMoneyToPointsValues"
                    :key="i"
                  >
                    <div class="row">
                      <div
                        class="col-6"
                        v-show="item.currencyId == selectedMoneyItem.id"
                      >
                        <label class="required fs-5 fw-bold mb-2 d-inline">
                          {{ $t("Money") }}
                        </label>
                        <Field
                          v-model="form.fromMoneyToPointsValues[i].money"
                          :name="`fromMoneyToPointsValues[${i}].money`"
                          type="number"
                          v-slot="{ field, meta }"
                        >
                          <input
                            v-bind="field"
                            :dir="selectedItem.dir"
                            type="number"
                            class="form-control form-control-solid form-control-lg"
                            :class="{
                              'is-valid': meta.valid,
                              'is-invalid': meta.validated && !meta.valid,
                            }"
                          />
                        </Field>
                        <ErrorMessage
                          :name="`fromMoneyToPointsValues[${i}].money`"
                          class="text-danger"
                        >
                          <span class="text-danger">
                            {{ $t("requiredMoneyValue") }}
                          </span>
                        </ErrorMessage>
                      </div>
                      <div
                        class="col-6"
                        v-show="item.currencyId == selectedMoneyItem.id"
                      >
                        <label class="required fs-5 fw-bold mb-2 d-inline">
                          {{ $t("Points") }}
                        </label>
                        <Field
                          v-model="form.fromMoneyToPointsValues[i].points"
                          :name="`fromMoneyToPointsValues[${i}].points`"
                          type="number"
                          v-slot="{ field, meta }"
                        >
                          <input
                            v-bind="field"
                            :dir="selectedItem.dir"
                            type="number"
                            class="form-control form-control-solid form-control-lg"
                            :class="{
                              'is-valid': meta.valid,
                              'is-invalid': meta.validated && !meta.valid,
                            }"
                          />
                        </Field>
                        <ErrorMessage
                          :name="`fromMoneyToPointsValues[${i}].points`"
                          class="text-danger"
                        >
                          <span class="text-danger">
                            {{ $t("pointsValueIsRequired") }}
                          </span>
                        </ErrorMessage>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- End From Money To Points Values  -->

            <!-- //// Start From Points To Money Values  -->
            <div class="col-12 my-3 mt-5">
              <h5 class="mb-3">{{ $t("fromPointsToMoneyValues") }}</h5>
              <tabs-duplicator
                :items="Currency"
                @selectedItem="setSelectedFromPoint"
              >
                <template #label="{ item }">
                  {{ item.label }}
                </template>
              </tabs-duplicator>

              <div class="fields">
                <div class="inputs_fields my-3">
                  <div
                    v-for="(item, i) in form.fromPointsToMoneyValues"
                    :key="i"
                  >
                    <div class="row">
                      <div
                        class="col-6"
                        v-if="item.currencyId == selectedPointItem.id"
                      >
                        <label class="required fs-5 fw-bold mb-2 d-inline">
                          {{ $t("Points") }}
                        </label>
                        <Field
                          v-model="form.fromPointsToMoneyValues[i].points"
                          :name="`fromPointsToMoneyValues[${i}].points`"
                          type="number"
                          v-slot="{ field, meta }"
                        >
                          <input
                            v-bind="field"
                            :dir="selectedItem.dir"
                            type="number"
                            class="form-control form-control-solid form-control-lg"
                            :class="{
                              'is-valid': meta.valid,
                              'is-invalid': meta.validated && !meta.valid,
                            }"
                          />
                        </Field>
                        <ErrorMessage
                          :name="`fromPointsToMoneyValues[${i}].points`"
                          class="text-danger"
                        >
                          <span class="text-danger">
                            {{ $t("pointsValueIsRequired") }}
                          </span>
                        </ErrorMessage>
                      </div>
                      <div
                        class="col-6"
                        v-if="item.currencyId == selectedPointItem.id"
                      >
                        <label class="required fs-5 fw-bold mb-2 d-inline">
                          {{ $t("Money") }}
                        </label>
                        <Field
                          v-model="form.fromPointsToMoneyValues[i].money"
                          :name="`fromPointsToMoneyValues[${i}].money`"
                          type="number"
                          v-slot="{ field, meta }"
                        >
                          <input
                            v-bind="field"
                            :dir="selectedItem.dir"
                            type="number"
                            class="form-control form-control-solid form-control-lg"
                            :class="{
                              'is-valid': meta.valid,
                              'is-invalid': meta.validated && !meta.valid,
                            }"
                          />
                        </Field>
                        <ErrorMessage
                          :name="`fromPointsToMoneyValues[${i}].money`"
                          class="text-danger"
                        >
                          <span class="text-danger">
                            {{ $t("requiredMoneyValue") }}
                          </span>
                        </ErrorMessage>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- //// End From Points To Money Values  -->

            <!-- Start Promo Texts -->
            <div class="col-12 my-3 mt-5">
              <h5 class="mb-3">{{ $t("PromoTexts") }}</h5>
              <tabs-duplicator
                :items="langs"
                @selectedItem="setSelectedLanguagePromoText"
              >
                <template #label="{ item }">
                  {{ item.label }}
                </template>
              </tabs-duplicator>
              <tabs-duplicator
                :items="Currency"
                @selectedItem="setSelectedItemPromoText"
              >
                <template #label="{ item }">
                  {{ item.label }}
                </template>
              </tabs-duplicator>
              <div class="fields">
                <div class="inputs_fields my-3">
                  <div v-for="(item, i) in form.promoTexts" :key="i">
                    <div
                      class="mt-3"
                      v-show="
                        item.currencyId + item.languageId ==
                        selectedItemPromoText.id + selectedLanguagePromoText.id
                      "
                    >
                      <label class="required fs-5 fw-bold mb-2 d-inline">
                        {{ $t("Value") }}
                      </label>
                      <Field
                        v-model="form.promoTexts[i].value"
                        :name="`promoTexts[${i}].value`"
                        type="text"
                        v-slot="{ field, meta }"
                      >
                        <input
                          v-bind="field"
                          :dir="selectedItem.dir"
                          type="text"
                          class="form-control form-control-solid form-control-lg"
                          :class="{
                            'is-valid': meta.valid,
                            'is-invalid': meta.validated && !meta.valid,
                          }"
                        />
                      </Field>
                      <ErrorMessage
                        :name="`promoTexts[${i}].value`"
                        class="text-danger"
                      >
                        <span class="text-danger">
                          {{ $t("requiredPromoTextsValue") }}
                        </span>
                      </ErrorMessage>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- End Promo Texts  -->

            <!-- Start Checked Box Values  -->
            <div class="col-12 my-3 mt-5">
              <div class="">
                <!--Start calculate Changes -->
                <div class="form-check form-check-solid">
                  <input
                    class="form-check-input"
                    v-model="PointSystemData.calculateChanges"
                    type="checkbox"
                    checked=""
                    data-kt-check="false"
                  /><label class="form-check-label ps-2">
                    {{ $t("calculateChanges") }}
                  </label>
                </div>
                <!-- End calculate Changes -->

                <!-- Start enabled On JetOrder-->
                <div class="form-check form-check-solid mt-4">
                  <input
                    class="form-check-input"
                    v-model="PointSystemData.enabledOnJetorder"
                    type="checkbox"
                    checked=""
                    data-kt-check="false"
                  /><label class="form-check-label ps-2">
                    {{ $t("enabledOnJetorder") }}
                  </label>
                </div>
                <!-- End enabled On JetOrder -->

                <!-- Start enabled -->
                <div class="form-check form-check-solid mt-4">
                  <input
                    class="form-check-input"
                    v-model="PointSystemData.enabled"
                    type="checkbox"
                    checked=""
                    data-kt-check="false"
                  /><label class="form-check-label ps-2">{{
                    $t("Enabled")
                  }}</label>
                </div>
                <!-- End enabled  -->
              </div>
            </div>
            <!-- End Checked Box Values  -->
          </div>
          <!-- Start Actions  -->
          <div class="row my-5">
            <div class="col">
              <div class="d-flex justify-content-end w-100">
                <button class="btn btn-primary">
                  <span v-if="!isLoading"> {{ $t("addPointSystem") }}</span>
                  <span v-if="isLoading" class="indicator-progress d-block">
                    {{ $t("wait") }}...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    />
                  </span>
                </button>
              </div>
            </div>
                
          </div>
          <!-- End Actions  -->
        </Form>
      </div>
    </div>
    <!-- End Modal dialog -->
  </div>
  <!-- End Form-Modal Add Point System -->
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch, defineEmits, onMounted } from "vue";
import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import Multiselect from "@vueform/multiselect";
import Swal from "sweetalert2";
import i18n from "@/core/plugins/i18n";
import { hideModal } from "@/core/helpers/dom";
// Start Emit Events
const emit = defineEmits(["add-point-system"]);
// Start All Constant
const store = useStore();
const selectedItem = ref({
  id: "",
  label: "",
});
const addPointSystemRef = ref<null | HTMLElement>(null);
const selectedMoneyItem = ref("");
const selectedPointItem = ref("");
const selectedLanguagePromoText = ref("");
const selectedItemPromoText = ref("");
const pointSystemForm = ref("");
const isLoading = ref(false);
// For Selected Language at the top of modal
const setSelectedItem = (payload: any) => {
  selectedItem.value = payload;
};
// For Money To  Points
const setSelectedFromMoney = (payload: any) => {
  selectedMoneyItem.value = payload;
};
// For Points To Money
const setSelectedFromPoint = (payload: any) => {
  selectedPointItem.value = payload;
};
// Start Promo Texts
const setSelectedLanguagePromoText = (payload: any) => {
  selectedLanguagePromoText.value = payload;
};
const setSelectedItemPromoText = (payload: any) => {
  selectedItemPromoText.value = payload;
};
// End Promo Texts

const PointSystemData = {
  shopIds: [],
  fromMoneyToPointsValues: [],
  fromPointsToMoneyValues: [],
  promoTexts: [],
  calculateChanges: true,
  enabledOnJetorder: true,
  enabled: true,
};

const form = reactive(PointSystemData);
// End All Constant

// Reset Form
function resetForm() {
  (form.shopIds = []),
    (form.fromMoneyToPointsValues = []),
    (form.fromPointsToMoneyValues = []),
    (form.promoTexts = []),
    (form.calculateChanges = true),
    (form.enabledOnJetorder = true),
    (form.enabled = true),
    pointSystemForm.value?.resetForm();
}

// Start Computed Values -- Getters Data
const Currency = computed(() => store.getters.getSupportedCurrencies);
const marketShops = computed(() => store.getters.getMarketData.shops);
const langs = computed(() => store.getters.getSupportedLanguages);
// End Computed Values -- Getters Data

function initResources() {
  Currency.value.forEach((element) => {
    form.fromMoneyToPointsValues.push({
      currencyId: element.id,
      money: "",
      points: "",
    });
    form.fromPointsToMoneyValues.push({
      currencyId: element.id,
      money: "",
      points: "",
    });
  });
}

// Handler Function For Promo text
function handlerPromoText() {
  langs.value.forEach((element) => {
    Currency.value.forEach((ele) => {
      form.promoTexts.push({
        languageId: element.id,
        currencyId: ele.id,
        value: "",
      });
    });
  });
}

const schema = yup.object({
  shopIds: yup
    .array()
    .of(yup.string())
    .required(i18n.global.t("fieldRequired")),
  fromMoneyToPointsValues: yup.array().of(
    yup.object().shape({
      currencyId: yup.string(),
      money: yup.number(),
      points: yup.number(),
    })
  ),
  fromPointsToMoneyValues: yup.array().of(
    yup.object().shape({
      currencyId: yup.string(),
      money: yup.number(),
      points: yup.number(),
    })
  ),
  promoTexts: yup.array().of(
    yup.object().shape({
      languageId: yup.string(),
      currencyId: yup.string(),
      value: yup.string().required(i18n.global.t("fieldRequired")),
    })
  ),
});

onMounted(() => {
  if (Currency.value && Currency.value.length > 0) {
    initResources();
    selectedItem.value = langs.value[0];
    selectedMoneyItem.value = Currency.value[0];
    selectedPointItem.value = Currency.value[0];
    selectedItemPromoText.value = Currency.value[0];
  }
  if (langs.value && langs.value.length > 0) {
    handlerPromoText();
    selectedLanguagePromoText.value = langs.value[0];
  }
});

function submit() {
  pointSystemForm?.value?.validate().then(({ valid }) => {
    if (valid) {
      onSubmit();
    }
  });
}

function onSubmit() {
  // Filters For Remove Any Empty Objects While Send Data - If These initialized Before
  let fromMoneyToPointsValues = form.fromMoneyToPointsValues.filter(
    (el) => el.money != "" && el.points != ""
  );
  form.fromMoneyToPointsValues = fromMoneyToPointsValues;
  let fromPointsToMoneyValues = form.fromPointsToMoneyValues.filter(
    (el) => el.money != "" && el.points != ""
  );
  form.fromPointsToMoneyValues = fromPointsToMoneyValues;
  let finalPromoTexts = form.promoTexts.filter((el) => el.value != "");
  form.promoTexts = finalPromoTexts;
  isLoading.value = true;
  // Call Store Action
  store
    .dispatch(Actions.ADD_POINT_SYSTEMS, {
      ...form,
    })
    .then((res) => {
      if (res?.data.statusCode == 200 && res.status == 200) {
        hideModal(addPointSystemRef.value);
        emit("add-point-system");
        Swal.fire({
          text: i18n.global.t("confirmAddedPointSystem"),
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: i18n.global.t("ok"),
          cancelButtonText: i18n.global.t("cancel"),
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary",
          },
        }).then((data) => {
          if (data.isConfirmed) {
            isLoading.value = false;
            resetForm();
            initResources();
            handlerPromoText();
          }
        });
      } else {
        Swal.fire({
          title: "Errors",
          text: res?.data.message,
          icon: "error",
        });
        isLoading.value = false;
      }
    })
    .finally(() => {
      isLoading.value = false;
    });
}

watch(Currency, (newVal) => {
  if (newVal && newVal.length) {
    initResources();
    selectedItem.value = newVal[0];
    selectedMoneyItem.value = newVal[0];
    selectedPointItem.value = newVal[0];
    selectedItemPromoText.value = newVal[0];
  }
});
watch(langs, (newVal) => {
  if (newVal && newVal.length) {
    handlerPromoText();
    selectedLanguagePromoText.value = newVal[0];
  }
});
</script>

<style>
.el-input {
  border-radius: 0.625rem;
}

.el-input__inner {
  border-radius: 0.625rem;
  background-color: #f5f8fa;
  height: 45px;
  border: none;
}
</style>
