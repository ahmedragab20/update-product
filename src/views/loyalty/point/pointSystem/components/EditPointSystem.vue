<template>
  <div
    class="modal fade"
    ref="updatePointSystemRef"
    id="edit-point-system-modal"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered mw-800px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_create_api_key_header">
          <h2>{{ $t("editPointSystem") }}</h2>

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
              <Multiselect
                mode="tags"
                v-model="connectedShopIds"
                v-bind="field"
                :searchable="true"
                :disabled="true"
                label="name"
                value-prop="id"
                :classes="{
                  container:
                    'multiselect-lg form-control form-control-lg form-control-solid',
                  search: 'multiselect-search form-control form-control-solid',
                  clear: 'multiselect-lg-clear',
                }"
                :options="marketShops"
              />
              <div class="fs-5 fw-bold mt-3 text-muted">
                <div>
                  <small>
                    {{ $t("pointSystemNote") }}
                  </small>
                </div>
                <div>
                  <small>
                    {{ $t("noteForUpdatePointSystem") }}
                  </small>
                </div>
              </div>
            </div>
            <!-- End Market Connected Shops  -->

            <!-- Start From Money To Points Values  -->
            <div class="col-12 my-3 mt-5">
              <h5 class="mb-3">{{ $t("From Money To Points Values") }}</h5>
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
              <!-- <div>{{ form.fromPointsToMoneyValues }}</div> -->
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
                        v-show="item.currencyId == selectedPointItem.id"
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
                        v-show="item.currencyId == selectedPointItem.id"
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

          <div class="row my-5">
            <div class="col">
              <div class="d-flex justify-content-end w-100">
                <button class="btn btn-primary">
                  <span v-if="!isLoading"> {{ $t("editPointSystem") }}</span>
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
        </Form>
      </div>
    </div>
  </div>
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
const props = defineProps({
  something: String,
  id: Number,
});

// Start Emit Events
const emit = defineEmits(["update-point-system"]);
// Start All Constant
const store = useStore();
const selectedItem = ref({
  id: "",
  label: "",
});
const updatePointSystemRef = ref<null | HTMLElement>(null);
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
// End Promo Text
const connectedShopIds = ref([]);
const PointSystemData = {
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

// Schema Validation
const schema = yup.object({
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
    selectedItem.value = langs.value[0];
    selectedMoneyItem.value = Currency.value[0];
    selectedPointItem.value = Currency.value[0];
    selectedItemPromoText.value = Currency.value[0];
  }
  if (langs.value && langs.value.length > 0) {
    selectedLanguagePromoText.value = langs.value[0];
  }
});

watch(Currency, (newVal) => {
  if (newVal && newVal.length) {
    selectedItem.value = newVal[0];
    selectedMoneyItem.value = newVal[0];
    selectedPointItem.value = newVal[0];
    selectedItemPromoText.value = newVal[0];
  }
});

watch(langs, (newVal) => {
  if (newVal && newVal.length) {
    selectedLanguagePromoText.value = newVal[0];
  }
});

const everyPointId = ref();
const setPointSystemData = (id) => {
  store.dispatch(Actions.GET_POINT_SYSTEM, id).then((data) => {
    resetForm();
    connectedShopIds.value = data.shopIds;
    data.pointsRuleValues.forEach((element) => {
      form.fromMoneyToPointsValues.push({
        currencyId: element.currencyId,
        money: element.fromAmount,
        points: element.toPoints,
      });
      form.fromPointsToMoneyValues.push({
        currencyId: element.currencyId,
        points: element.fromPoints,
        money: element.toAmount,
      });
      element.promoTexts.forEach((ele) => {
        form.promoTexts.push({
          languageId: ele.languageId,
          currencyId: element.currencyId,
          value: ele.value,
        });
      });
    });
    form.calculateChanges = data.calculateChanges;
    form.enabledOnJetorder = data.enabledOnJetorder;
    form.enabled = data.enabled;
  });
};

watch(props, (newVal) => {
  if (newVal) {
    everyPointId.value = newVal.id;
    setPointSystemData(newVal.id);
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
  isLoading.value = true;
  store
    .dispatch(Actions.UPDATE_POINT_SYSTEMS, {
      id: everyPointId.value,
      ...form,
    })
    .then((res) => {
      hideModal(updatePointSystemRef.value);
      if (res?.data.statusCode == 200 && res.status == 200) {
        emit("update-point-system");
        Swal.fire({
          text: i18n.global.t("confirmUpdatedPointSystem"),
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
          }
        });
      }
    })
    .finally(() => {
      isLoading.value = false;
    });
}
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
