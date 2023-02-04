<template>
  <div>
    <div class="content d-flex flex-column flex-column-fluid">
        <!--begin::Form-->
        <Form id="kt_account_profile_details_form"
          class="form" 
          @submit="saveChanges"
          :validation-schema="shopOrderValidator">
          <!--begin::Card body-->
          <div class="row">
            <!-- start col-lg-4 -->
            <div class="col col-lg-4">
              <!-- card currencies -->
              <div class="card card-flush py-4 mb-4">
                <div class="card-header">
                  <div class="card-title required">
                    {{ $t("currencies")}}
                  </div>
                </div>
                <div class="card-body pt-0">
                  <!--begin::Input-->
                  <Field v-slot="{ field, meta }" name="currencyIds" v-model="orderSetting.currencies"
                    class="form-control form-control-lg form-control-solid">
                    <Multiselect 
                      v-model="orderSetting.currencies"
                      v-bind="field" label="label" value-prop="id"
                      name="currencyIds" :class="{
                      'is-valid': meta.valid,
                      'is-invalid': meta.validated && !meta.valid,}" 
                      :classes="{
                        container:
                          'multiselect-tags-lg form-control form-control-lg form-control-solid',
                        search: 'multiselect-search form-control form-control-solid',
                        clear: 'multiselect-lg-clear',
                        tagsSearch:
                          'multiselect-tags-search form-control form-control-solid',
                      }" :options="currencies" mode="tags" />
                  </Field>
                  <label class="col-form-label text-gray-400 fw-normal d-block pt-0">
                    {{ $t("pleaseEnterCurr") }}
                  </label>
                  <ErrorMessage name="currencyIds" class="text-danger d-block"></ErrorMessage>
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
                  <!-- enableAutoOrderAccept -->
                  <div class="form-check form-check-solid mb-6">
                    <input id="enableAutoOrderAccept" class="form-check-input"
                      v-model="orderSetting.enableAutoOrderAccept" type="checkbox"
                      data-kt-check="false" /><label for="enableAutoOrderAccept" class="form-check-label ps-2">
                      {{ $t("enableAutoOrderAccept") }}
                    </label>
                    <label class="col-form-label text-gray-400 fw-normal d-block pt-0">
                      {{ $t("enableAutoOrderAcceptDesc") }}
                    </label>
                  </div>
                  <!-- enableAutoOrderPrepare -->
                  <div class="form-check form-check-solid mb-6">
                    <input id="enableAutoOrderPrepare" class="form-check-input"
                      v-model="orderSetting.enableAutoOrderPrepare" type="checkbox"
                      data-kt-check="false" /><label for="enableAutoOrderPrepare" class="form-check-label ps-2">
                      {{ $t("enableAutoOrderPrepare") }}
                    </label>
                    <label class="col-form-label text-gray-400 fw-normal d-block pt-0">
                      {{ $t("enableAutoOrderPrepareDesc") }}
                    </label>
                  </div>
                  <!-- isBusyOnShopLink -->
                  <div class="form-check form-check-solid mb-6">
                    <input id="isBusyOnShopLink" class="form-check-input" v-model="orderSetting.isBusyOnShopLink"
                      type="checkbox" data-kt-check="false" /><label for="isBusyOnShopLink"
                      class="form-check-label ps-2">
                      {{ $t("isBusyOnShopLink") }}
                    </label>
                    <label class="col-form-label text-gray-400 fw-normal d-block pt-0">
                      {{ $t("isBusyOnShopLinkDesc") }}
                    </label>
                  </div>
                  <!-- isVisibleOnShopLink -->
                  <div class="form-check form-check-solid mb-6">
                    <input id="isVisibleOnShopLink" class="form-check-input" v-model="orderSetting.isVisibleOnShopLink"
                      type="checkbox" data-kt-check="false" /><label for="isVisibleOnShopLink"
                      class="form-check-label ps-2">
                      {{ $t("isVisibleOnShopLink") }}
                    </label>
                    <label class="col-form-label text-gray-400 fw-normal d-block pt-0">
                      {{ $t("isVisibleOnShopLinkDesc") }}
                    </label>
                  </div>
                  <!-- isClosedOnShopLink -->
                  <div class="form-check form-check-solid mb-6">
                    <input id="isClosedOnShopLink" class="form-check-input" v-model="orderSetting.isClosedOnShopLink"
                      type="checkbox" data-kt-check="false" /><label for="isClosedOnShopLink"
                      class="form-check-label ps-2">
                      {{ $t("isClosedOnShopLink") }}
                    </label>
                    <label class="col-form-label text-gray-400 fw-normal d-block pt-0">
                      {{ $t("isClosedOnShopLinkDesc") }}
                    </label>
                  </div>
                  <!-- addNewOrderAsFinancicalTransactionIncome -->
                  <div class="form-check form-check-solid mb-6">
                    <input id="addNewOrderAsFinancicalTransactionIncome" class="form-check-input"
                      v-model="orderSetting.addNewOrderAsFinancicalTransactionIncome" type="checkbox"
                      data-kt-check="false" /><label for="addNewOrderAsFinancicalTransactionIncome"
                      class="form-check-label ps-2">
                      {{ $t("addNewOrderAsFinancicalTransactionIncome") }}
                    </label>
                    <label class="col-form-label text-gray-400 fw-normal d-block pt-0">
                      {{ $t("addNewOrderAsFinancicalTransactionIncomeDesc") }}
                    </label>
                  </div>
                  <!-- allowUsingCouponWithPointsShopLink -->
                  <div class="form-check form-check-solid mb-6">
                    <input id="allowUsingCouponWithPointsShopLink" class="form-check-input"
                      v-model="orderSetting.allowUsingCouponWithPointsShopLink" type="checkbox"
                      data-kt-check="false" /><label for="allowUsingCouponWithPointsShopLink"
                      class="form-check-label ps-2">
                      {{ $t("allowUsingCouponWithPointsShopLink") }}
                    </label>
                    <label class="col-form-label text-gray-400 fw-normal d-block pt-0">
                      {{ $t("allowUsingCouponWithPointsShopLinkDesc") }}
                    </label>
                  </div>
                  <!-- allowTakeAwayServiceShopLink -->
                  <div class="form-check form-check-solid mb-6">
                    <input id="allowTakeAwayServiceShopLink" class="form-check-input"
                      v-model="orderSetting.allowTakeAwayServiceShopLink" type="checkbox"
                      data-kt-check="false" /><label for="allowTakeAwayServiceShopLink" class="form-check-label ps-2">
                      {{ $t("allowTakeAwayServiceShopLink") }}
                    </label>
                    <label class="col-form-label text-gray-400 fw-normal d-block pt-0">
                      {{ $t("allowTakeAwayServiceShopLinkDesc") }}
                    </label>
                  </div>
                  <!-- allowDeliveryServiceShopLink -->
                  <div class="form-check form-check-solid mb-6">
                    <input id="allowDeliveryServiceShopLink" class="form-check-input"
                      v-model="orderSetting.allowDeliveryServiceShopLink" type="checkbox"
                      data-kt-check="false" /><label for="allowDeliveryServiceShopLink" class="form-check-label ps-2">
                      {{ $t("allowDeliveryServiceShopLink") }}
                    </label>
                    <label class="col-form-label text-gray-400 fw-normal d-block pt-0">
                      {{ $t("allowDeliveryServiceShopLinkDesc") }}
                    </label>
                  </div>
                  <!-- allowDriveThruServiceShopLink -->
                  <div class="form-check form-check-solid mb-6">
                    <input id="allowDriveThruServiceShopLink" class="form-check-input"
                      v-model="orderSetting.allowDriveThruServiceShopLink" type="checkbox"
                      data-kt-check="false" /><label for="allowDriveThruServiceShopLink" class="form-check-label ps-2">
                      {{ $t("allowDriveThruServiceShopLink") }}
                    </label>
                    <label class="col-form-label text-gray-400 fw-normal d-block pt-0">
                      {{ $t("allowDriveThruServiceShopLinkDesc") }}
                    </label>
                  </div>
                  <!-- enableAbandonedCarts -->
                  <div class="form-check form-check-solid mb-6">
                    <input id="enableAbandonedCarts" class="form-check-input" v-model="orderSetting.enableAbandonedCarts"
                      type="checkbox" data-kt-check="false" /><label for="enableAbandonedCarts"
                      class="form-check-label ps-2">
                      {{ $t("enableAbandonedCarts") }}
                    </label>
                    <label class="col-form-label text-gray-400 fw-normal d-block pt-0">
                      {{ $t("enableAbandonedCartsDesc") }}
                    </label>
                  </div>

                </div>
              </div>
              <!-- end col-lg-4 -->
            </div>

            <!-- start col-lg-8 -->
            <div class="col col-lg-8">
              <!-- taxFeesShopLink -->
              <div class="card card-flush py-4 mb-4">
                <div class="card-header">
                  <div class="card-title">
                    {{ $t("taxFeesShopLink") }}
                  </div>
                </div>
                <div class="card-body pt-0">
                  <tabs-duplicator :items="supportCurrencies" @selectedItem="setSelectedItem">
                    <template #label="{ item }">
                      {{ item.label }}
                    </template>
                  </tabs-duplicator>
                  <div class="fields">
                    <div>
                      <div class="inputs_fields my-3">
                        <div v-for="(item, i) in orderSetting.taxFeesShopLink" :key="i">
                          <div v-if="item.currencyId == selectedItem.id">
                            <label class="required fs-5 fw-bold mb-2 d-inline">{{
                                $t("taxFeesShopLink")
                            }}</label>
                            <Field v-model="orderSetting.taxFeesShopLink[i].price" :name="`taxFeesShopLink[${i}].price`"
                              type="number" v-slot="{ field, meta }" :label="`taxFeesShopLink`">
                              <input v-bind="field" type="number"
                                class="form-control form-control-solid form-control-lg" :class="{
                                  'is-valid': meta.valid,
                                  'is-invalid': meta.validated && !meta.valid,
                                }" />
                            </Field>
                            <ErrorMessage :name="`taxFeesShopLink[${i}].price`" class="text-danger">
                              <span class="text-danger">
                                {{ $t("taxFeesShopLinkValidation") }}
                              </span>
                            </ErrorMessage>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- serviceFeesShopLink -->
              <div class="card card-flush py-4 mb-4">
                <div class="card-header">
                  <div class="card-title">
                    {{ $t("serviceFeesShopLink") }}
                  </div>
                </div>
                <div class="card-body pt-0">
                  <tabs-duplicator :items="supportCurrencies" @selectedItem="setSelectedItem">
                    <template #label="{ item }">
                      {{ item.label }}
                    </template>
                  </tabs-duplicator>
                  <div class="fields">
                    <div>
                      <div class="inputs_fields my-3">
                        <div v-for="(item, i) in orderSetting.serviceFeesShopLink" :key="i">
                          <div v-if="item.currencyId == selectedItem.id">
                            <label class="required fs-5 fw-bold mb-2 d-inline">{{
                                $t("serviceFeesShopLink")
                            }}</label>
                            <Field v-model="orderSetting.serviceFeesShopLink[i].price" :name="`serviceFeesShopLink[${i}].price`"
                              type="number" v-slot="{ field, meta }" :label="`serviceFeesShopLink`">
                              <input v-bind="field" type="number"
                                class="form-control form-control-solid form-control-lg" :class="{
                                  'is-valid': meta.valid,
                                  'is-invalid': meta.validated && !meta.valid,
                                }" />
                            </Field>
                            <ErrorMessage :name="`serviceFeesShopLink[${i}].price`" class="text-danger">
                              <span class="text-danger">
                                {{ $t("serviceFeesShopLinkValidation") }}
                              </span>
                            </ErrorMessage>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- minimumOrderValuesShopLink -->
              <div class="card card-flush py-4 mb-4">
                <div class="card-header">
                  <div class="card-title">
                    {{ $t("minimumOrderValuesShopLink") }}
                  </div>
                </div>
                <div class="card-body pt-0">
                  <tabs-duplicator :items="supportCurrencies" @selectedItem="setSelectedItem">
                    <template #label="{ item }">
                      {{ item.label }}
                    </template>
                  </tabs-duplicator>
                  <div class="fields">
                    <div>
                      <div class="inputs_fields my-3">
                        <div v-for="(item, i) in orderSetting.minimumOrderValuesShopLink" :key="i">
                          <div v-show ="item.currencyId == selectedItem.id">
                            <label class="required fs-5 fw-bold mb-2 d-inline">{{
                                $t("minimumOrderValuesShopLink")
                            }}</label>
                            <Field v-model="orderSetting.minimumOrderValuesShopLink[i].value" :name="`minimumOrderValuesShopLink[${i}].value`"
                              type="number" v-slot="{ field, meta }" :label="`minimumOrderValuesShopLink`">
                              <input v-bind="field" type="number"
                                class="form-control form-control-solid form-control-lg" :class="{
                                  'is-valid': meta.valid,
                                  'is-invalid': meta.validated && !meta.valid,
                                }" />
                            </Field>
                            <ErrorMessage :name="`minimumOrderValuesShopLink[${i}].value`" class="text-danger">
                              <span class="text-danger">
                                {{ $t("minimumOrderValuesShopLinkValidation") }}
                              </span>
                            </ErrorMessage>
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
                    {{ $t("inputs") }}
                  </div>
                </div>
                <div class="card-body pt-0">
                  <!-- taxFeesTypeShopLink -->
                  <div class="mb-4">
                    <label class="required fs-5 fw-bold mb-2">{{ $t("taxFeesTypeShopLink") }}</label>
                    <Field name="taxFeesTypeShopLink" type="number" v-model="orderSetting.taxFeesTypeShopLink"
                      v-slot="{ field, meta }">
                      <input :placeholder="$t('taxFeesTypeShopLink')" v-model="orderSetting.taxFeesTypeShopLink" v-bind="field"
                        class="form-control form-control-solid form-control-lg" type="number" :class="{
                          'is-valid': meta.valid,
                          'is-invalid': meta.validated && !meta.valid,
                        }" />
                    </Field>
                    <ErrorMessage class="text-danger" name="taxFeesTypeShopLink"></ErrorMessage>
                  </div>
                  <!-- serviceFeesTypeShopLink -->
                  <div class="mb-4">
                    <label class="required fs-5 fw-bold mb-2">{{ $t("serviceFeesTypeShopLink") }}</label>
                    <Field name="serviceFeesTypeShopLink" type="number" v-model="orderSetting.serviceFeesTypeShopLink"
                      v-slot="{ field, meta }">
                      <input :placeholder="$t('serviceFeesTypeShopLink')" v-model="orderSetting.serviceFeesTypeShopLink"
                        v-bind="field" class="form-control form-control-solid form-control-lg" type="number" :class="{
                          'is-valid': meta.valid,
                          'is-invalid': meta.validated && !meta.valid,
                        }" />
                    </Field>
                    <ErrorMessage class="text-danger" name="serviceFeesTypeShopLink"></ErrorMessage>
                  </div>
                  <!-- maximumNumberOfAllowedCouponsToUsePerOrderShopLink -->
                  <div class="mb-4">
                    <label class="required fs-5 fw-bold mb-2">
                    {{ $t("maximumNumberOfAllowedCouponsToUsePerOrderShopLink")}}
                    </label>
                    <Field name="maximumNumberOfAllowedCouponsToUsePerOrderShopLink" type="number"
                      v-model="orderSetting.maximumNumberOfAllowedCouponsToUsePerOrderShopLink"
                      v-slot="{ field, meta }">
                      <input :placeholder="$t('maximumNumberOfAllowedCouponsToUsePerOrderShopLink')"
                        v-model="orderSetting.maximumNumberOfAllowedCouponsToUsePerOrderShopLink" 
                        v-bind="field"
                        class="form-control form-control-solid form-control-lg"
                        type="number" :class="{
                          'is-valid': meta.valid,
                          'is-invalid': meta.validated && !meta.valid,
                        }" />
                    </Field>
                    <ErrorMessage class="text-danger" 
                    name="maximumNumberOfAllowedCouponsToUsePerOrderShopLink"></ErrorMessage>
                  </div>
                  <!-- orderCancelationTypeShopLink -->
                  <div class="mb-4">
                    <label class="required fs-5 fw-bold mb-2">{{ $t("orderCancelationTypeShopLink") }}</label>
                    <Field name="orderCancelationTypeShopLink" type="number" v-model="orderSetting.orderCancelationTypeShopLink"
                      v-slot="{ field, meta }">
                      <input :placeholder="$t('orderCancelationTypeShopLink')"
                        v-model="orderSetting.orderCancelationTypeShopLink" v-bind="field"
                        class="form-control form-control-solid form-control-lg" type="number" :class="{
                          'is-valid': meta.valid,
                          'is-invalid': meta.validated && !meta.valid,
                        }" />
                    </Field>
                    <ErrorMessage class="text-danger" name="orderCancelationTypeShopLink"></ErrorMessage>
                  </div>
                  
                </div>
              </div>  

            </div>

            
            
            <!--end::Card row -->
          </div>
          <!--begin::Actions-->
          <div class="d-flex justify-content-center">
            <div class="card col-12 justify-content-center align-items-center floating  py-6 px-9">
              <div class="card-title text-gray-400 fw-normal d-block pt-0">
                {{ $t("pleaseDontForgetToSaveOrderChanges") }}
              </div>
              <div class="crad-body">
                <button type="submit" id="kt_account_profile_details_submit" ref="submitButton" class="btn btn-primary">
                  <span class="indicator-label"> {{ $t("saveOrderSetting")}}</span>
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

// define refs
const currencies = ref<Currency[] | null>();
let selectedItem = ref();
//let taxFeesShopLink = ref<any>([]);
const submitButton = ref<HTMLElement | null>(null);
// define interfaces
interface TaxFeesShopLink {
  currencyId: string,
  price: number
}
interface OrderSetting {
  id: string,
  enableAutoOrderAccept: boolean,
  enableAutoOrderPrepare: boolean,
  isBusyOnShopLink: boolean,
  isVisibleOnShopLink: boolean,
  isClosedOnShopLink: boolean,
  addNewOrderAsFinancicalTransactionIncome: boolean,
  maximumNumberOfAllowedCouponsToUsePerOrderShopLink: number,
  allowUsingCouponWithPointsShopLink: boolean,
  allowTakeAwayServiceShopLink: boolean,
  allowDeliveryServiceShopLink: boolean,
  allowDriveThruServiceShopLink: boolean,
  enableAbandonedCarts: boolean,
  orderCancelationTypeShopLink: number,
  taxFeesTypeShopLink: number,
  serviceFeesTypeShopLink: number,
  currencies: Array<string>,
  taxFeesShopLink?: Array<TaxFeesShopLink>,
  serviceFeesShopLink?: Array<
    {
      currencyId: string,
      price: number
    }>,
  minimumOrderValuesShopLink?: Array<{
    currencyId: string,
    value: number
  }>
}
// get id as a prop
let props = defineProps({
  id: String,
 
});

let orderSetting = reactive<OrderSetting>({
  id: "",
  enableAutoOrderAccept: true,
  enableAutoOrderPrepare: true,
  isBusyOnShopLink: true,
  isVisibleOnShopLink: true,
  isClosedOnShopLink: true,
  addNewOrderAsFinancicalTransactionIncome: true,
  maximumNumberOfAllowedCouponsToUsePerOrderShopLink: 0,
  allowUsingCouponWithPointsShopLink: true,
  allowTakeAwayServiceShopLink: true,
  allowDeliveryServiceShopLink: true,
  allowDriveThruServiceShopLink: true,
  enableAbandonedCarts: true,
  orderCancelationTypeShopLink: 0,
  taxFeesTypeShopLink: 0,
  serviceFeesTypeShopLink: 0,
  currencies: [],
  taxFeesShopLink: [],
  serviceFeesShopLink: [],
  minimumOrderValuesShopLink: []
});
// set selected item
const setSelectedItem = (payload: any) => {
  selectedItem.value = payload;
};
// shopOrderValidator schema
const shopOrderValidator = yup.object().shape({
  currencyIds: yup.array()
    .of(yup.string())
    .required('required')
    .min(1),

  minimumOrderValuesShopLink: yup.array().of(
    yup.object().shape({
      value: yup.string().required('required'),
    })
  ),
  taxFeesShopLink: yup.array().of(
    yup.object().shape({
      price: yup.string().required('required'),
    })
  ),
  serviceFeesShopLink: yup.array().of(
    yup.object().shape({
      price: yup.string().required('required'),
    })
  ),

  taxFeesTypeShopLink: yup.number().required('required').label("taxFeesTypeShopLink"),
  serviceFeesTypeShopLink: yup.number().required('required').label("serviceFeesTypeShopLink"),
  maximumNumberOfAllowedCouponsToUsePerOrderShopLink: yup.number()
  .required('required').label("maximumNumberOfAllowedCouponsToUsePerOrderShopLink"),
  orderCancelationTypeShopLink: yup.number().required('required').label("taxFeesTypeShopLink"),
  
});
// get supported Currencies
const supportCurrencies = computed(() => store.getters.getSupportedCurrencies);
// save changes and update shop orderSetting
const saveChanges = async (values: any) => {


  values = {
    ...values,
  };

  if (submitButton.value) {
    try {
      orderSetting.id = props.id;
      // Activate indicator
      submitButton.value.setAttribute("data-kt-indicator", "on");
      await store.dispatch(Actions.UPDATE_SHOP_ORDER_SETTINGS, orderSetting);
      Swal.fire({
        text: i18n.global.t("shopOrderUpdated"),
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
      submitButton.value?.removeAttribute("data-kt-indicator");
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
    orderSetting.taxFeesShopLink.push({
      currencyId: element.id,
      price: 0,
    });
    orderSetting.serviceFeesShopLink.push({
      currencyId: element.id,
      price: 0,
    });
    orderSetting.minimumOrderValuesShopLink.push({
      currencyId: element.id,
      value: 0,
    });

  });
 
}


onMounted(() => {
  //initResources();
  currencies.value = store.state.LookupQueries.currencies.data;
  if (supportCurrencies.value && supportCurrencies.value.length) {
    selectedItem.value = supportCurrencies.value[0];
    initResources();
  }
  // get shops order settings from api
  store.dispatch(Actions.GET_SHOPS_ORDER_SETTINGS, props.id).then((data) => {
    Object.assign(orderSetting, data)
    orderSetting.currencies = [];
 
    
    data.currencies.forEach(element => {
      orderSetting.currencies.push(element.currencyId)
    });

    
    if(orderSetting.minimumOrderValuesShopLink.length==0 || orderSetting.taxFeesShopLink.length==0 || orderSetting.serviceFeesShopLink.length==0){
        initResources();
    }
    //selectedItem.value = orderSetting.currencies[0];

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