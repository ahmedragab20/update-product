<template>
  <div>
    <div class="product-label d-flex flex-column flex-column-fluid">
      <!--begin::Container-->
     
        <!--begin::Form-->
        <Form id="kt_account_profile_details_form"
          class="form" 
          @submit="saveChanges"
        >
          <!--begin::Card body-->
          <div class="row">
            <!-- start col-lg-4 -->
            <div class="col col-lg-4">
              <!-- card shopCategory -->
              <div class="card card-flush py-4 mb-4">
                <div class="card-header">
                  <div class="card-title required">
                    {{ $t("shopCategory")}}
                  </div>
                </div>
                <div class="card-body pt-0">
                  <!--begin::Input-->
                  <Field v-slot="{ field }" name="shopCategory" v-model="shopJetOrder.shopCategory"
                    class="form-control form-control-lg form-control-solid">
                    <input v-bind="field" disabled
                     type="text"  name="shopCategory"
                     v-model="shopJetOrder.shopCategory"
                      class="form-control form-control-solid form-control-lg" />
                  </Field>
                  <!-- <label class="col-form-label text-gray-400 fw-normal d-block pt-0">
                    {{ $t("pleaseEnterCat") }}
                  </label> -->
                  <ErrorMessage name="shopCategory" class="text-danger d-block"></ErrorMessage>
                </div>
              </div>
              <!-- lastSettlmentDate -->
              <div class="card card-flush py-4 mb-4">
                <div class="card-header">
                  <div class="card-title required">
                    {{ $t("lastSettlmentDate")}}
                  </div>
                </div>
                <div class="card-body pt-0">
                  <!--begin::Input-->
                  <Field v-slot="{ field }" name="lastSettlmentDate" v-model="shopJetOrder.lastSettlmentDate">
                    <input v-bind="field" disabled
                     type="text"  name="lastSettlmentDate"
                     v-model="shopJetOrder.lastSettlmentDate"
                      class="form-control form-control-solid form-control-lg" />
                  </Field>
                  <ErrorMessage name="lastSettlmentDate" class="text-danger d-block"></ErrorMessage>
                </div>
              </div>

              
              <!-- Checks -->
              <div class="card card-flush py-4 mb-4">
                <div class="card-header">
                  <div class="card-title">
                    {{ $t("checks") }}
                  </div>
                </div>
                <div class="card-body pt-0">
                  <!-- allowTakeAwayServiceJetOrder -->
                  <div class="form-check form-check-solid mb-6">
                    <input disabled id="allowTakeAwayServiceJetOrder" class="form-check-input"
                      v-model="shopJetOrder.allowTakeAwayServiceJetOrder" type="checkbox"
                      data-kt-check="false" /><label for="allowTakeAwayServiceJetOrder" class="form-check-label ps-2">
                      {{ $t("allowTakeAwayServiceJetOrder") }}
                    </label>
                  </div>
                  <!-- allowDeliveryServiceJetOrder -->
                  <div class="form-check form-check-solid mb-6">
                    <input disabled id="allowDeliveryServiceJetOrder" class="form-check-input"
                      v-model="shopJetOrder.allowDeliveryServiceJetOrder" type="checkbox"
                      data-kt-check="false" /><label for="allowDeliveryServiceJetOrder" class="form-check-label ps-2">
                      {{ $t("allowDeliveryServiceJetOrder") }}
                    </label>
                  </div>
                  <!-- allowDriveThruServiceJetOrder -->
                  <div class="form-check form-check-solid mb-6">
                    <input disabled id="allowDriveThruServiceJetOrder" class="form-check-input" 
                      v-model="shopJetOrder.allowDriveThruServiceJetOrder"
                      type="checkbox" data-kt-check="false" /><label for="allowDriveThruServiceJetOrder"
                      class="form-check-label ps-2">
                      {{ $t("allowDriveThruServiceJetOrder") }}
                    </label>
                  </div>
                  <!-- addNewOrderAsFinancicalTransactionIncome -->
                  <div class="form-check form-check-solid mb-6">
                    <input id="addNewOrderAsFinancicalTransactionIncome" class="form-check-input" 
                      v-model="shopJetOrder.addNewOrderAsFinancicalTransactionIncome"
                      type="checkbox" data-kt-check="false" /><label for="addNewOrderAsFinancicalTransactionIncome"
                      class="form-check-label ps-2">
                      {{ $t("addNewOrderAsFinancicalTransactionIncome") }}
                    </label>
                  </div>
                  <!-- isBusyOnJetOrder -->
                  <div class="form-check form-check-solid mb-6">
                    <input id="isBusyOnJetOrder" class="form-check-input"
                      v-model="shopJetOrder.isBusyOnJetOrder"
                      type="checkbox" data-kt-check="false" /><label for="isBusyOnJetOrder"
                      class="form-check-label ps-2">
                      {{ $t("isBusyOnJetOrder") }}
                    </label>
                  </div>
                  <!-- isVisibleOnJetOrder -->
                  <div class="form-check form-check-solid mb-6">
                    <input id="isVisibleOnJetOrder" class="form-check-input"
                      v-model="shopJetOrder.isVisibleOnJetOrder" type="checkbox"
                      data-kt-check="false" /><label for="isVisibleOnJetOrder"
                      class="form-check-label ps-2">
                      {{ $t("isVisibleOnJetOrder") }}
                    </label>
                  </div>
                  <!-- isClosedOnJetOrder -->
                  <div class="form-check form-check-solid mb-6">
                    <input id="isClosedOnJetOrder" class="form-check-input"
                      v-model="shopJetOrder.isClosedOnJetOrder" type="checkbox"
                      data-kt-check="false" /><label for="isClosedOnJetOrder"
                      class="form-check-label ps-2">
                      {{ $t("isClosedOnJetOrder") }}
                    </label>
                  </div>
                  <!-- allowUsingCouponWithPointsJetOrder -->
                  <div class="form-check form-check-solid mb-6">
                    <input disabled id="allowUsingCouponWithPointsJetOrder" class="form-check-input"
                      v-model="shopJetOrder.allowUsingCouponWithPointsJetOrder" type="checkbox"
                      data-kt-check="false" /><label for="allowUsingCouponWithPointsJetOrder" class="form-check-label ps-2">
                      {{ $t("allowUsingCouponWithPointsJetOrder") }}
                    </label>
                  </div>

                </div>
              </div>
              <!-- end col-lg-4 -->
            </div>

            <!-- start col-lg-8 -->
            <div class="col col-lg-8">
              <!-- taxFeesJetOrder -->
              <div class="card card-flush py-4 mb-4">
                <div class="card-header">
                  <div class="card-title">
                    {{ $t("taxFeesJetOrder") }}
                  </div>
                </div>
                <div class="card-body pt-0">
                  <tabs-duplicator disabled :items="supportCurrencies" @selectedItem="setSelectedItem">
                    <template #label="{ item }">
                      {{ item.label }}
                    </template>
                  </tabs-duplicator>
                  <div class="fields">
                    <div>
                      <div class="inputs_fields my-3">
                        <div v-for="(item, i) in shopJetOrder.taxFeesJetOrder" :key="i">
                          <div v-if="item.currencyId == selectedItem.id">
                            <label class="required fs-5 fw-bold mb-2 d-inline">{{
                                $t("taxFeesJetOrder")
                            }}</label>
                            <Field v-model="shopJetOrder.taxFeesJetOrder[i].price" :name="`taxFeesJetOrder[${i}].price`"
                              type="number" v-slot="{ field, meta }" :label="`taxFeesJetOrder`">
                              <input disabled v-bind="field" type="number"
                                class="form-control form-control-solid form-control-lg" :class="{
                                  'is-valid': meta.valid,
                                  'is-invalid': meta.validated && !meta.valid,
                                }" />
                            </Field>
                            <ErrorMessage :name="`taxFeesJetOrder[${i}].price`" class="text-danger">
                              <span class="text-danger">
                                {{ $t("taxFeesJetOrderValidation") }}
                              </span>
                            </ErrorMessage>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- serviceFeesJetOrder -->
              <div class="card card-flush py-4 mb-4">
                <div class="card-header">
                  <div class="card-title">
                    {{ $t("serviceFeesJetOrder") }}
                  </div>
                </div>
                <div class="card-body pt-0">
                  <tabs-duplicator disabled :items="supportCurrencies" @selectedItem="setSelectedItem">
                    <template #label="{ item }">
                      {{ item.label }}
                    </template>
                  </tabs-duplicator>
                  <div class="fields">
                    <div>
                      <div class="inputs_fields my-3">
                        <div v-for="(item, i) in shopJetOrder.serviceFeesJetOrder" :key="i">
                          <div v-if="item.currencyId == selectedItem.id">
                            <label class="required fs-5 fw-bold mb-2 d-inline">{{
                                $t("serviceFeesJetOrder")
                            }}</label>
                            <Field v-model="shopJetOrder.serviceFeesJetOrder[i].price" :name="`serviceFeesJetOrder[${i}].price`"
                              type="number" v-slot="{ field, meta }" :label="`serviceFeesJetOrder`">
                              <input disabled v-bind="field" type="number"
                                class="form-control form-control-solid form-control-lg" :class="{
                                  'is-valid': meta.valid,
                                  'is-invalid': meta.validated && !meta.valid,
                                }" />
                            </Field>
                            <ErrorMessage :name="`serviceFeesJetOrder[${i}].price`" class="text-danger">
                              <span class="text-danger">
                                {{ $t("serviceFeesJetOrder") }}
                              </span>
                            </ErrorMessage>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- minimumOrderValuesJetOrder -->
              <div class="card card-flush py-4 mb-4">
                <div class="card-header">
                  <div class="card-title">
                    {{ $t("minimumOrderValuesJetOrder") }}
                  </div>
                </div>
                <div class="card-body pt-0">
                  <tabs-duplicator disabled :items="supportCurrencies" @selectedItem="setSelectedItem">
                    <template #label="{ item }">
                      {{ item.label }}
                    </template>
                  </tabs-duplicator>
                  <div class="fields">
                    <div>
                      <div class="inputs_fields my-3">
                        <div v-for="(item, i) in shopJetOrder.minimumOrderValuesJetOrder" :key="i">
                          <div v-show ="item.currencyId == selectedItem.id">
                            <label class="required fs-5 fw-bold mb-2 d-inline">{{
                                $t("minimumOrderValuesJetOrder")
                            }}</label>
                            <Field v-model="shopJetOrder.minimumOrderValuesJetOrder[i].value" :name="`minimumOrderValuesJetOrder[${i}].value`"
                              type="number" v-slot="{ field, meta }" :label="`minimumOrderValuesJetOrder`">
                              <input disabled v-bind="field" type="number"
                                class="form-control form-control-solid form-control-lg" :class="{
                                  'is-valid': meta.valid,
                                  'is-invalid': meta.validated && !meta.valid,
                                }" />
                            </Field>
                            <ErrorMessage :name="`minimumOrderValuesJetOrder[${i}].value`" class="text-danger">
                              <span class="text-danger">
                                {{ $t("minimumOrderValuesJetOrder") }}
                              </span>
                            </ErrorMessage>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>  
            </div>

            <!-- card inputs -->
            <div class="card card-flush py-4 mb-4">
                <div class="card-header">
                  <div class="card-title">
                    {{ $t("Inputs") }}
                  </div>
                </div>
                <div class="card-body pt-0">
                  <div class="row">
                    <!-- taxFeesTypeJetOrder -->
                    <div class="mb-4 col-6">
                      <label class="required fs-5 fw-bold mb-2">{{ $t("taxFeesTypeJetOrder") }}</label>
                      <Field name="taxFeesTypeJetOrder" type="number" v-model="shopJetOrder.taxFeesTypeJetOrder"
                        v-slot="{ field, meta }">
                        <input readonly :placeholder="$t('taxFeesTypeJetOrder')" v-model="shopJetOrder.taxFeesTypeJetOrder" v-bind="field"
                          class="form-control form-control-solid form-control-lg" type="number" :class="{
                            'is-valid': meta.valid,
                            'is-invalid': meta.validated && !meta.valid,
                          }" />
                      </Field>
                      <ErrorMessage class="text-danger" name="taxFeesTypeJetOrder"></ErrorMessage>
                    </div>
                    <!-- serviceFeesTypeJetOrder -->
                    <div class="mb-4 col-6">
                      <label class="required fs-5 fw-bold mb-2">{{ $t("serviceFeesTypeJetOrder") }}</label>
                      <Field name="serviceFeesTypeJetOrder" type="number" v-model="shopJetOrder.serviceFeesTypeJetOrder"
                        v-slot="{ field, meta }">
                        <input readonly :placeholder="$t('serviceFeesTypeJetOrder')" v-model="shopJetOrder.serviceFeesTypeJetOrder"
                          v-bind="field" class="form-control form-control-solid form-control-lg" type="number" :class="{
                            'is-valid': meta.valid,
                            'is-invalid': meta.validated && !meta.valid,
                          }" />
                      </Field>
                      <ErrorMessage class="text-danger" name="serviceFeesTypeJetOrder"></ErrorMessage>
                    </div>
                    <!-- deliveryRadiusInKiloMeter -->
                    <div class="mb-4 col-6">
                      <label class="required fs-5 fw-bold mb-2">
                      {{ $t("deliveryRadiusInKiloMeter")}}
                      </label>
                      <Field name="deliveryRadiusInKiloMeter" type="number"
                        v-model="shopJetOrder.deliveryRadiusInKiloMeter"
                        v-slot="{ field, meta }">
                        <input readonly :placeholder="$t('deliveryRadiusInKiloMeter')"
                          v-model="shopJetOrder.deliveryRadiusInKiloMeter" 
                          v-bind="field"
                          class="form-control form-control-solid form-control-lg"
                          type="number" :class="{
                            'is-valid': meta.valid,
                            'is-invalid': meta.validated && !meta.valid,
                          }" />
                      </Field>
                      <ErrorMessage class="text-danger" 
                      name="deliveryRadiusInKiloMeter"></ErrorMessage>
                    </div>
                    <!-- deliveryBaseAmount -->
                    <div class="mb-4 col-6">
                      <label class="required fs-5 fw-bold mb-2">{{ $t("deliveryBaseAmount") }}</label>
                      <Field name="deliveryBaseAmount" type="number" v-model="shopJetOrder.deliveryBaseAmount"
                        v-slot="{ field, meta }">
                        <input readonly :placeholder="$t('deliveryBaseAmount')"
                          v-model="shopJetOrder.deliveryBaseAmount" v-bind="field"
                          class="form-control form-control-solid form-control-lg" type="number" :class="{
                            'is-valid': meta.valid,
                            'is-invalid': meta.validated && !meta.valid,
                          }" />
                      </Field>
                      <ErrorMessage class="text-danger" name="deliveryBaseAmount"></ErrorMessage>
                    </div>
                    <!-- deliveryExtraHalfKiloAmuont -->
                    <div class="mb-4 col-6">
                      <label class="required fs-5 fw-bold mb-2">{{ $t("deliveryExtraHalfKiloAmuont") }}</label>
                      <Field name="deliveryExtraHalfKiloAmuont" type="number" v-model="shopJetOrder.deliveryExtraHalfKiloAmuont"
                        v-slot="{ field, meta }">
                        <input readonly :placeholder="$t('deliveryExtraHalfKiloAmuont')"
                          v-model="shopJetOrder.deliveryExtraHalfKiloAmuont" v-bind="field"
                          class="form-control form-control-solid form-control-lg" type="number" :class="{
                            'is-valid': meta.valid,
                            'is-invalid': meta.validated && !meta.valid,
                          }" />
                      </Field>
                      <ErrorMessage class="text-danger" name="deliveryExtraHalfKiloAmuont"></ErrorMessage>
                    </div>
                    <!-- jetOrderServiceFeesFromClient -->
                    <div class="mb-4 col-6">
                      <label class="required fs-5 fw-bold mb-2">{{ $t("jetOrderServiceFeesFromClient") }}</label>
                      <Field name="jetOrderServiceFeesFromClient" type="number" v-model="shopJetOrder.jetOrderServiceFeesFromClient"
                        v-slot="{ field, meta }">
                        <input readonly :placeholder="$t('jetOrderServiceFeesFromClient')"
                          v-model="shopJetOrder.jetOrderServiceFeesFromClient" v-bind="field"
                          class="form-control form-control-solid form-control-lg" type="number" :class="{
                            'is-valid': meta.valid,
                            'is-invalid': meta.validated && !meta.valid,
                          }" />
                      </Field>
                      <ErrorMessage class="text-danger" name="jetOrderServiceFeesFromClient"></ErrorMessage>
                    </div>
                    <!-- jetOrderServiceFeesFromClientType -->
                    <div class="mb-4 col-6">
                      <label class="required fs-5 fw-bold mb-2">{{ $t("jetOrderServiceFeesFromClientType") }}</label>
                      <Field name="jetOrderServiceFeesFromClientType" type="number" v-model="shopJetOrder.jetOrderServiceFeesFromClientType"
                        v-slot="{ field, meta }">
                        <input readonly :placeholder="$t('jetOrderServiceFeesFromClientType')"
                          v-model="shopJetOrder.jetOrderServiceFeesFromClientType" v-bind="field"
                          class="form-control form-control-solid form-control-lg" type="number" :class="{
                            'is-valid': meta.valid,
                            'is-invalid': meta.validated && !meta.valid,
                          }" />
                      </Field>
                      <ErrorMessage class="text-danger" name="jetOrderServiceFeesFromClientType"></ErrorMessage>
                    </div>
                    <!-- jetOrderSettlmentPeriodInDays -->
                    <div class="mb-4 col-6">
                      <label class="required fs-5 fw-bold mb-2">{{ $t("jetOrderSettlmentPeriodInDays") }}</label>
                      <Field name="jetOrderSettlmentPeriodInDays" type="number" v-model="shopJetOrder.jetOrderSettlmentPeriodInDays"
                        v-slot="{ field, meta }">
                        <input readonly :placeholder="$t('jetOrderSettlmentPeriodInDays')"
                          v-model="shopJetOrder.jetOrderSettlmentPeriodInDays" v-bind="field"
                          class="form-control form-control-solid form-control-lg" type="number" :class="{
                            'is-valid': meta.valid,
                            'is-invalid': meta.validated && !meta.valid,
                          }" />
                      </Field>
                      <ErrorMessage class="text-danger" name="jetOrderSettlmentPeriodInDays"></ErrorMessage>
                    </div>
                    <!-- settlmentFeesResponsibility -->
                    <div class="mb-4 col-6">
                      <label class="required fs-5 fw-bold mb-2">{{ $t("settlmentFeesResponsibility") }}</label>
                      <Field name="settlmentFeesResponsibility" type="number" v-model="shopJetOrder.settlmentFeesResponsibility"
                        v-slot="{ field, meta }">
                        <input readonly :placeholder="$t('settlmentFeesResponsibility')"
                          v-model="shopJetOrder.settlmentFeesResponsibility" v-bind="field"
                          class="form-control form-control-solid form-control-lg" type="number" :class="{
                            'is-valid': meta.valid,
                            'is-invalid': meta.validated && !meta.valid,
                          }" />
                      </Field>
                      <ErrorMessage class="text-danger" name="settlmentFeesResponsibility"></ErrorMessage>
                    </div>
                    <!-- minumumSettlmentAmount -->
                    <div class="mb-4 col-6">
                      <label class="required fs-5 fw-bold mb-2">{{ $t("minumumSettlmentAmount") }}</label>
                      <Field name="minumumSettlmentAmount" type="number" v-model="shopJetOrder.minumumSettlmentAmount"
                        v-slot="{ field, meta }">
                        <input readonly :placeholder="$t('minumumSettlmentAmount')"
                          v-model="shopJetOrder.minumumSettlmentAmount" v-bind="field"
                          class="form-control form-control-solid form-control-lg" type="number" :class="{
                            'is-valid': meta.valid,
                            'is-invalid': meta.validated && !meta.valid,
                          }" />
                      </Field>
                      <ErrorMessage class="text-danger" name="minumumSettlmentAmount"></ErrorMessage>
                    </div>
                  </div>
                </div>
            </div>
            
            <!--end::Card row -->
          </div>
          <!--begin::Actions-->
          <div class="d-flex justify-content-center">
            <div class="card col-12 align-items-center justify-content-center floating  py-6 px-9">
              <div class="card-title text-gray-400 fw-normal d-block pt-0">
                {{ $t("pleaseDontForgetToSaveJetOrderChanges") }}
              </div>
              <div class="crad-body">
                <button type="submit" id="kt_account_profile_details_submit" ref="submitButton" class="btn btn-primary">
                  <span class="indicator-label"> {{ $t("saveJetOrderSetting")}}</span>
                  <span class="indicator-progress">
                    {{ $t("pleaseWait")}} ...
                    <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                </button>
              </div>
            </div>
          </div>
          <!--end::Actions-->
          
        </Form>
        <!--end::Form -->
 
    <!--end::Content-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch , watchEffect, toRaw, computed, reactive } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Multiselect from "@vueform/multiselect";
import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";
import * as yup from "yup";
import { number } from "yup/lib/locale";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import store from "@/store";
import { Actions } from "@/store/enums/StoreEnums";
import { Currency } from "@/types";
import i18n from '@/core/plugins/i18n'
// define interfaces
interface Categories {
  id: string;
  name: string;
  tags: Array<Tags>;
}
interface Tags {
  id: string;
  name: string;
}

  
interface taxFeesJetOrder {
  currencyId: string,
  price: number
}
interface shopJetOrder {
  id: string;
  allowTakeAwayServiceJetOrder: boolean;
  allowDeliveryServiceJetOrder: boolean;
  allowDriveThruServiceJetOrder: boolean;
  taxFeesTypeJetOrder: number;
  serviceFeesTypeJetOrder: number;
  deliveryRadiusInKiloMeter: number;
  deliveryBaseAmount: number;
  deliveryExtraHalfKiloAmuont: number;
  jetOrderServiceFeesFromClient: number;
  jetOrderServiceFeesFromClientType: number;
  jetOrderSettlmentPeriodInDays: number;
  settlmentFeesResponsibility: number;
  minumumSettlmentAmount: number;
  lastSettlmentDate: string;
  shopCategory: string;
  addNewOrderAsFinancicalTransactionIncome: boolean;
  isBusyOnJetOrder: boolean;
  isVisibleOnJetOrder: boolean;
  isClosedOnJetOrder: boolean;
  maximumNumberOfAllowedCouponsToUsePerOrderJetOrder: number;
  allowUsingCouponWithPointsJetOrder: boolean;
  taxFeesJetOrder?: Array<taxFeesJetOrder>,
  serviceFeesJetOrder?: Array<
    {
      currencyId: string,
      price: number
    }>,
  minimumOrderValuesJetOrder?: Array<{
    currencyId: string,
    value: number
  }>
}
// define refs
let selectedItem = ref();
const submitButton = ref<HTMLElement | null>(null);
const categories = ref<Categories[] | null>();
const lookupQueries = store.state.LookupQueries;
const shopJetOrder = ref<shopJetOrder>({
  id: "",
  allowTakeAwayServiceJetOrder: true,
  allowDeliveryServiceJetOrder: true,
  allowDriveThruServiceJetOrder: true,
  taxFeesTypeJetOrder: 0,
  serviceFeesTypeJetOrder: 0,
  deliveryRadiusInKiloMeter: 0,
  deliveryBaseAmount: 0,
  deliveryExtraHalfKiloAmuont: 0,
  jetOrderServiceFeesFromClient: 0,
  jetOrderServiceFeesFromClientType: 0,
  jetOrderSettlmentPeriodInDays: 0,
  settlmentFeesResponsibility: 0,
  minumumSettlmentAmount: 0,
  lastSettlmentDate: "",
  shopCategory: "",
  addNewOrderAsFinancicalTransactionIncome: true,
  isBusyOnJetOrder: true,
  isVisibleOnJetOrder: true,
  isClosedOnJetOrder: true,
  maximumNumberOfAllowedCouponsToUsePerOrderJetOrder: 0,
  allowUsingCouponWithPointsJetOrder: true,
  taxFeesJetOrder: [],
  serviceFeesJetOrder: [],
  minimumOrderValuesJetOrder: []
});
const form = reactive(shopJetOrder);

// set selected item in tap dublicator
const setSelectedItem = (payload: any) => {
  selectedItem.value = payload;
};
// get id as a prop
let props = defineProps({
  id: String,
 
});
// get supported Currencies
const supportCurrencies = computed(() => store.getters.getSupportedCurrencies);
// save changes and update shop JetOrder
const saveChanges = async (values: any) => {
  console.log('shopJetOrder', shopJetOrder.value)
  shopJetOrder.value.id = props.id;
  values = {
    ...values,
  };
  console.log('    ...values,', ...values)
  if (submitButton.value) {
    try {
      // Activate indicator
      submitButton.value.setAttribute("data-kt-indicator", "on");
      await store.dispatch(Actions.UPDATE_SHOPS_JETORDER_SETTINGS, shopJetOrder.value);
      Swal.fire({
        text: i18n.global.t("shopJetOrderUpdated"),
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        customClass: {
          confirmButton: "btn fw-bold btn-light-primary",
        },
      }).then(function () {
        submitButton.value?.removeAttribute("data-kt-indicator");
        //window.location.href = "/";
      });
    } catch (error) {
      Swal.fire({
        text: error.message,
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "Try again!",
        customClass: {
          confirmButton: "btn fw-bold btn-light-danger",
        },
      });
    }
  }
};

// init resources
function initResources() {
  supportCurrencies.value.forEach((element) => {
    shopJetOrder.value.taxFeesJetOrder.push({
      currencyId: element.id,
      price: 0,
    });
    shopJetOrder.value.serviceFeesJetOrder.push({
      currencyId: element.id,
      price: 0,
    });
    shopJetOrder.value.minimumOrderValuesJetOrder.push({
      currencyId: element.id,
      value: 0,
    });

  });
  console.log("log order taxFeesJetOrder", shopJetOrder.value.taxFeesJetOrder);
}


onMounted(() => {
  categories.value = lookupQueries?.shopCategories?.data;
  if (supportCurrencies.value && supportCurrencies.value.length) {
    selectedItem.value = supportCurrencies.value[0];
    initResources();
  }
  // get shops order settings from api
  store.dispatch(Actions.GET_SHOPS_JETORDER_SETTINGS, props.id).then((data) => {
    Object.assign(shopJetOrder.value, data)
    if(shopJetOrder.value.minimumOrderValuesJetOrder.length==0 ||
     shopJetOrder.value.taxFeesJetOrder.length==0 || shopJetOrder.value.serviceFeesJetOrder.length==0){
        initResources();
    }
    console.log("orderSetting.value2", selectedItem.value);
    console.log("shopJetOrder.value", shopJetOrder.value);
    
  });
  
})
//watch on supported currencies
watch(supportCurrencies, (newVal) => {
  if (newVal && newVal.length) {
    initResources();
    selectedItem.value = supportCurrencies.value[0];
  }
});

</script>

<style>
.multiselect-lg {
  position: relative;
  margin: 0 auto;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
}

.multiselect-dropdown-lg {
  width: 200px;
}
.floating{
  position: fixed;
  bottom: 0px;
}
</style>