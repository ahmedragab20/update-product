<template>
  <Form
    ref="cartOfferForm"
    :validation-schema="schema"
    class="form fv-plugins-bootstrap5 fv-plugins-framework p-5"
    @submit="onSubmit"
  >
    <div class="row">
      <!--begin:: Resources-->

      <!--begin:: Resources-->
      <div class="col-12 my-3">
        <tabs-duplicator :items="langs" @selectedItem="setSelectedItem">
          <template #label="{ item }">
            {{ item.label }}
          </template>
        </tabs-duplicator>

        <div class="fields">
          <div class="inputs_fields my-3">
            <div v-for="(item, i) in OfferForm.resources" :key="i">
              <div class="row" v-show="item.languageId === selectedItem.id">
                <div class="col-12">
                  <label class="required fs-5 fw-bold mb-2 d-inline">{{
                    $t("emailHeader")
                  }}</label>
                  <Field
                    v-model="item.emailHeader"
                    :value="item.emailHeader"
                    :name="`resources[${i}].emailHeader`"
                    type="text"
                    v-slot="{ field, meta }"
                    :label="`emailHeader`"
                  >
                    <input
                      :disabled="isDetails"
                      v-bind="field"
                      type="text"
                      class="form-control form-control-solid form-control-lg"
                      :class="{
                        'is-valid': meta.valid,
                        'is-invalid': meta.validated && !meta.valid,
                      }"
                    />
                  </Field>
                  <ErrorMessage :name="`resources[${i}].emailHeader`" class="text-danger">
                  </ErrorMessage>
                </div>
                <div class="col-12 mt-4">
                  <label class="required fs-5 fw-bold mb-2 d-block">{{
                    $t("body")
                  }}</label>
                  <Field
                    v-model="item.body"
                    :name="`resources[${i}].body`"
                    type="text"
                    v-slot="{ field, meta }"
                    :label="`body`"
                  >
                    <textarea
                      :disabled="isDetails"
                      class="form-control form-control-solid form-control-lg"
                      v-bind="field"
                    ></textarea>
                  </Field>
                  <ErrorMessage :name="`resources[${i}].body`" class="text-danger">
                  </ErrorMessage>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end::resources-->

      <!--begin:: prices-->
      <div class="col-12 my-3">
        <tabs-duplicator :items="currencies" @selectedItem="setSelectedCurrency">
          <template #label="{ item }">
            {{ item.label }}
          </template>
        </tabs-duplicator>
        <div class="fields">
          <div class="inputs_fields my-3">
            <div v-for="(item, i) in OfferForm.prices" :key="i">
              <div class="row" v-show="item.currencyId == selectedCrrency.id">
                <div class="col-12 my-2">
                  <label class="required fs-5 fw-bold mb-2 d-inline">{{
                    $t("discount")
                  }}</label>
                  <Field
                    v-model="OfferForm.prices[i].discount"
                    :name="`prices[${i}].discount`"
                    type="text"
                    v-slot="{ field, meta }"
                    :label="`discount`"
                  >
                    <input
                      :disabled="isDetails"
                      v-bind="field"
                      type="number"
                      class="form-control form-control-solid form-control-lg"
                      :class="{
                        'is-valid': meta.valid,
                        'is-invalid': meta.validated && !meta.valid,
                      }"
                    />
                  </Field>
                  <ErrorMessage :name="`prices[${i}].discount`" class="text-danger">
                  </ErrorMessage>
                </div>

                <div class="col-12 my-2">
                  <label class="required fs-5 fw-bold mb-2 d-inline">{{
                    $t("cartTotal")
                  }}</label>
                  <Field
                    v-model="OfferForm.prices[i].cartTotal"
                    :name="`prices[${i}].cartTotal`"
                    type="text"
                    v-slot="{ field, meta }"
                    :label="`cartTotal`"
                  >
                    <input
                      :disabled="isDetails"
                      v-bind="field"
                      type="number"
                      class="form-control form-control-solid form-control-lg"
                      :class="{
                        'is-valid': meta.valid,
                        'is-invalid': meta.validated && !meta.valid,
                      }"
                    />
                  </Field>
                  <ErrorMessage :name="`prices[${i}].cartTotal`" class="text-danger">
                  </ErrorMessage>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end::prices-->

      <!-- deliveryDiscountPercetnage -->
      <div class="col-5 my-4">
        <label class="required fs-5 fw-bold mb-2 d-inline">{{
          $t("deliveryDiscountPercetnage")
        }}</label>
        <Field
          v-model="OfferForm.deliveryDiscountPercetnage"
          :name="`deliveryDiscountPercetnage`"
          type="text"
          v-slot="{ field, meta }"
          :label="`deliveryDiscountPercetnage`"
        >
          <input
            :disabled="isDetails"
            v-bind="field"
            type="text"
            class="form-control form-control-solid form-control-lg"
            :class="{
              'is-valid': meta.valid,
              'is-invalid': meta.validated && !meta.valid,
            }"
          />
        </Field>
        <ErrorMessage :name="`deliveryDiscountPercetnage`" class="text-danger">
        </ErrorMessage>
      </div>

      <!-- deliveryDiscountPercetnage end -->

      <!--begin::Checkboxes-->
      <div class="col-7 mt-5">
        <div class="row h-100">
          <!--begin::Checkbox-->
          <div class="col-6">
            <label class="form-check form-check-custom form-check-solid me-10">
              <input
                :disabled="isDetails"
                class="form-check-input h-20px w-20px"
                type="checkbox"
                v-model="OfferForm.sendSMS"
              />
              <span class="form-check-label fw-bold"> {{ $t("sendSMS") }} </span>
            </label>
          </div>

          <!--end::Checkbox-->
          <!--begin::Checkbox-->
          <div class="col-6">
            <label class="form-check form-check-custom form-check-solid me-10">
              <input
                :disabled="isDetails"
                class="form-check-input h-20px w-20px"
                type="checkbox"
                v-model="OfferForm.sendEmail"
              />

              <span class="form-check-label fw-bold"> {{ $t("sendEmail") }} </span>
            </label>
          </div>

          <!--end::Checkbox-->
          <!--begin::Checkbox-->
          <div class="col-6">
            <label class="form-check form-check-custom form-check-solid me-10">
              <input
                :disabled="isDetails"
                class="form-check-input h-20px w-20px"
                type="checkbox"
                v-model="OfferForm.deliveryDiscount"
              />
              <span class="form-check-label fw-bold"> {{ $t("deliveryDiscount") }} </span>
            </label>
          </div>

          <!--end::Checkbox-->
          <!--begin::Checkbox-->
          <div class="col-6">
            <label class="form-check form-check-custom form-check-solid me-10">
              <input
                :disabled="isDetails"
                class="form-check-input h-20px w-20px"
                type="checkbox"
                v-model="OfferForm.cartSubTotalDiscount"
              />

              <span class="form-check-label fw-bold">
                {{ $t("cartSubTotalDiscount") }}
              </span>
            </label>
          </div>

          <!--end::Checkbox-->
        </div>
      </div>

      <!--end::Checkboxes-->

      <!-- carts -->
      <div class="col-12 my-4">
        <label class="required fw-bold mb-2 d-inline">{{ $t("carts") }}</label>
        <Field :name="`carts`" type="text" v-slot="{ field, meta }" :label="`carts`">
          <el-select
            :disabled="isDetails"
            v-bind="field"
            multiple
            v-model="OfferForm.carts"
            type="text"
            class="form-control-solid w-100"
            :class="{
              'is-valid': meta.valid,
              'is-invalid': meta.validated && !meta.valid,
            }"
          >
            <el-option
              v-for="item in carts"
              :value="item.id"
              :label="item.clientFirstName + ' ' + item.clientLastName"
            >
            </el-option>
          </el-select>
        </Field>
        <ErrorMessage :name="`carts`" class="text-danger">
          <span class="text-danger">
            {{ $t("resourcesValidation") }}
          </span>
        </ErrorMessage>
      </div>
      <!-- carts end -->

      <div class="col-12 my-4">
        <label class="required fw-bold mb-2 d-inline">{{ $t("shops") }}</label>
        <Field :name="`shopIds`" type="text" v-slot="{ field, meta }" :label="`shopIds`">
          <el-select
            :disabled="isDetails"
            v-bind="field"
            multiple
            v-model="OfferForm.shopIds"
            type="text"
            class="form-control-solid w-100"
            :class="{
              'is-valid': meta.valid,
              'is-invalid': meta.validated && !meta.valid,
            }"
          >
            <el-option v-for="item in market.shops" :value="item.id" :label="item.name">
            </el-option>
          </el-select>
        </Field>
        <ErrorMessage :name="`shopIds`" class="text-danger">
          <span class="text-danger">
            {{ $t("resourcesValidation") }}
          </span>
        </ErrorMessage>
      </div>

      <!-- expirationIn -->
      <div class="col-6 my-4">
        <label class="required fs-5 fw-bold d-inline">{{ $t("expirationIn") }}</label>
        <Field
          :name="`expirationIn`"
          type="text"
          v-slot="{ field, meta }"
          :label="`expirationIn`"
        >
          <el-input-number
            :disabled="isDetails"
            v-model="OfferForm.expirationIn"
            v-bind="field"
            placeholder="Select a date"
            name="expirationIn"
            class="w-100"
          />
        </Field>
        <ErrorMessage :name="`expirationIn`" class="text-danger"></ErrorMessage>
      </div>
      <!-- expirationIn end -->

      <!-- expirationInUnit -->
      <div class="col-6 my-4">
        <label class="required fs-5 fw-bold d-block">{{ $t("unit") }}</label>
        <Field
          :name="`expirationInUnit`"
          type="text"
          v-slot="{ field, meta }"
          :label="`expirationInUnit`"
        >
          <el-select
            :disabled="isDetails"
            v-model="OfferForm.expirationInUnit"
            v-bind="field"
            type="text"
            class="form-control-solid w-100"
            :class="{
              'is-valid': meta.valid,
              'is-invalid': meta.validated && !meta.valid,
            }"
          >
            <el-option v-for="item in timeUnits" :value="item.id" :label="item.name">
            </el-option>
          </el-select>
        </Field>
        <ErrorMessage name="expirationInUnit" class="text-danger"> </ErrorMessage>
      </div>
      <!-- expirationInUnit end -->

      <!-- leftDuration -->
      <div class="col-6 my-4">
        <label class="required fs-5 fw-bold d-inline">{{ $t("leftDuration") }}</label>
        <Field
          :name="`leftDuration`"
          type="text"
          v-slot="{ field, meta }"
          :label="`leftDuration`"
        >
          <el-input-number
            :disabled="isDetails"
            v-model="OfferForm.leftDuration"
            v-bind="field"
            type="text"
            placeholder="Select a date"
            class="form-control-solid w-100"
          />
        </Field>
        <ErrorMessage name="leftDuration" class="text-danger"> </ErrorMessage>
      </div>
      <!-- leftDuration end -->

      <!-- leftDurationUnit -->
      <div class="col-6 my-4">
        <label class="required fs-5 fw-bold d-block">{{ $t("unit") }}</label>
        <Field
          :name="`leftDurationUnit`"
          type="text"
          v-slot="{ field, meta }"
          :label="`leftDurationUnit`"
        >
          <el-select
            :disabled="isDetails"
            v-model="OfferForm.leftDurationUnit"
            v-bind="field"
            type="text"
            class="form-control-solid w-100"
            :class="{
              'is-valid': meta.valid,
              'is-invalid': meta.validated && !meta.valid,
            }"
          >
            <el-option v-for="item in timeUnits" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </Field>
        <ErrorMessage :name="`leftDurationUnit`" class="text-danger"> </ErrorMessage>
      </div>
      <!-- leftDurationUnit end -->

      <!-- FOOTER -->

      <div class="col-12">
        <div class="row my-5">
          <div class="col">
            <div class="d-flex justify-content-end w-100">
              <button type="button" class="btn btn-primary" @click="validate">
                <span v-if="!isLoading">
                  {{ $t("add") }} <span class="fas fa-plus"></span>
                </span>
                <span v-if="isLoading" class="indicator-progress d-block">
                  {{ $t("wait") }}
                  <span class="spinner-border spinner-border-sm align-middle ms-2" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Form>
</template>

<script setup lang="ts">
import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";
import { Actions } from "@/store/enums/StoreEnums";
import { reactive, ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import i18n from "@/core/plugins/i18n";
import { AbandonedCart, Market } from "@/types";
import { AbandonedCartOffer } from "@/api/data/AbandonedCart";
import Swal from "sweetalert2";
const cartOfferForm = ref(null);

const { dispatch, getters, state } = useStore();

// INITIALIZE
const langs = computed(() => getters.getSupportedLanguages);
const market = computed(() => getters.getMarketData as Market);
const timeUnits = computed(() =>
  getters.getTimeUnits.filter((t) => t.id <= 7 && t.id >= 5)
);
const currencies = computed(() => getters.getSupportedCurrencies);
const isDetails = computed(() => !!OfferForm.value.id);
const carts = computed(() => state.AbandonedCarts.abandonedCarts as Array<AbandonedCart>);
const selectedItem = ref();
const selectedCrrency = ref();
const emit = defineEmits(["label-added"]);

const isLoading = ref(false);
const OfferForm = computed((): AbandonedCartOffer => state.AbandonedCarts.offerDto);

function initResources() {
  if (OfferForm.value.resources.length === 0)
    langs.value.forEach((element) => {
      OfferForm.value.resources.push({
        languageId: element.id,
        emailHeader: "",
        body: "",
      });
    });
}

function initPrices() {
  if (OfferForm.value.prices.length === 0)
    currencies.value.forEach((cur) => {
      OfferForm.value.prices.push({
        currencyId: cur.id,
        cartTotal: 0,
        discount: 0,
      });
    });
}
const setSelectedItem = (payload: any) => {
  selectedItem.value = payload;
};
const setSelectedCurrency = (payload: any) => {
  selectedCrrency.value = payload;
};

function validate() {
  cartOfferForm.value?.validate().then(({ valid }) => {
    if (valid) {
      onSubmit();
    }
  });
}

function onSubmit() {
  isLoading.value = true;
  dispatch(Actions.CREATE_ABANDONED_CART, {
    ...OfferForm.value,
  }).then(() => {
    isLoading.value = false;
    Swal.fire({
      title: i18n.global.t("addSuccess"),
      text: i18n.global.t("offerAddSuccess"),
      icon: "success",
    });
    emit("label-added");
    // resetForm();
  });
}

const schema = yup.object({
  resources: yup.array().of(
    yup.object().shape({
      emailHeader: yup
        .string()
        .email(i18n.global.t("emailNotValid"))
        .required(i18n.global.t("fieldRequired")),
      body: yup.string().required(i18n.global.t("fieldRequired")),
    })
  ),
  prices: yup.array().of(
    yup.object().shape({
      discount: yup.number().required(i18n.global.t("fieldRequired")),
      cartTotal: yup.number().required(i18n.global.t("fieldRequired")),
    })
  ),
  deliveryDiscountPercetnage: yup
    .number()
    .max(100)
    .required(i18n.global.t("fieldRequired")),
  carts: yup.array().of(yup.string().required(i18n.global.t("fieldRequired"))),
  expirationInUnit: yup.string().required(i18n.global.t("fieldRequired")),
  leftDurationUnit: yup.string().required(i18n.global.t("fieldRequired")),
  expirationIn: yup.number().required(i18n.global.t("fieldRequired")),
  leftDuration: yup.number().required(i18n.global.t("fieldRequired")),
  // shopIds: yup.array().of(yup.string())
});
onMounted(() => {
  if (langs.value && langs.value.length && currencies.value && currencies.value.length) {
    selectedItem.value = langs.value[0];
    selectedCrrency.value = langs.value[0];
    initResources();
    initPrices();
  }
});
watch(langs, (newVal) => {
  if (newVal && newVal.length) {
    initResources();
    selectedItem.value = langs.value[0];
  }
});
watch(currencies, (newVal) => {
  if (newVal && newVal.length) {
    initPrices();
    selectedCrrency.value = currencies.value[0];
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
