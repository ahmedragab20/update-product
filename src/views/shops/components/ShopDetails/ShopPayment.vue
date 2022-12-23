<template>
  <!--begin::Basic info-->
  <div>
    <div class="product-label d-flex flex-column flex-column-fluid">
      <div class="row">
        <div class="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
            <div class="card card-flush py-4 mb-4">
              <div class="card-header d-flex align-items-center">
                <div class="card-title">
                  <h2>{{ $t("paymentMethod") }}</h2>
                </div>
                <el-select
                  v-model="localPagination.pageSize"
                  style="width: 100px"
                  placeholder="Number Of Item"
                  class="border-1 mx-4"
                >
                  <el-option :value="5">5</el-option>
                  <el-option :value="10">10</el-option>
                  <el-option :value="25">25</el-option>
                  <el-option :value="50">50</el-option>
                  <el-option :value="100">100</el-option>
                </el-select>
              </div>
              <div class="card-body pt-0">
                <label class="required fs-5 fw-bold mb-5 d-inline">
                  {{ $t("paymentMethod") }}
                </label>
                <div class="row justify-content-between pb-5 mb-4">
                  <div class="fv-row col-8 mb-10">
                    <!--begin::Input-->
                    <Field
                      v-slot="{ field }"
                      name="paymentMethod"
                      class="form-control form-control-lg form-control-solid"
                    >
                    
                      <el-select
                        class="w-100 form-control-solid border-0"
                        v-bind="field"
                        v-model="paymetMethodId"
                        
                      >
                      <el-option
                        v-for="item in paymentMethod"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        :disabled="
                          paymentMethodsResult.includes(parseInt(item.id))
                        "
                      >
                        <span class="mx-2">{{ item.name }}</span>
                        <span
                          class="mx-2 text-danger"
                          v-if="
                            paymentMethodsResult.includes(parseInt(item.id))
                          "
                          >{{ $t("alreadySelected") }}</span
                        >
                      </el-option>
                      </el-select>
                    </Field>
                    <label
                      class="col-form-label text-gray-400 fw-normal d-block pt-0"
                    >
                      {{ $t("pleaseEnterPayment") }}
                    </label>
                    <ErrorMessage
                      name="paymentMethod"
                      class="fv-plugins-message-container invalid-feedback"
                    />
                    <!--end::Input-->
                  </div>
                  <div class="col-4">
                    <button
                      @click="addPayment(paymetMethodId)"
                      :class="`btn mx-3  d-flex align-items-center ${
                        !!paymetMethodId
                          ? 'btn-primary'
                          : 'btn-light-primary'
                      }`"
                      :disabled="!paymetMethodId"
                      type="button"
                    >
                  
                      <span  class="indicator-label"
                        >{{ $t("addPaymentMethod") }}
                      </span>
                    </button>
                  </div>
                </div>
                
                <label class="required fs-5 fw-bold mb-5 d-inline">{{ $t("shopPaymentMethods") }}</label>
                <el-table :data="paymentMethodsResult" class="tag-products w-100 pt-4">
                  
                  <el-table-column width="70" :label="$t('image')">
                    <template #default="scope">
                      <div class="d-flex align-items-center">
                        <img
                          :src="`${
                                paymentMethod?.find((x) => x.id == scope.row)?.logo
                              }`"
                          style="object-fit: cover; height: 35px; width: 35px"
                          class="rounded"
                          alt=""
                        />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('name')">
                    <template #default="scope">
                      {{ paymentMethod?.find((x) => x.id == scope.row)?.name }}
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('actions')" align="right" width="70">
                    <template #default="scope">
                      <a
                        @click="deletePayment(scope.row)"
                        class="btn btn-icon btn-danger-light btn-active-color-danger btn-sm"
                      >
                        <span class="svg-icon svg-icon-danger">
                          <inline-svg src="/media/icons/duotune/general/gen027.svg" />
                        </span>
                      </a>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div :class="['card-footer', 'd-flex' ,form.shopPaymentOptions.length > 3 ?  'justify-content-between': 'justify-content-end',]">
                <el-pagination
                  v-model:current-page="localPagination.pageNumber"
                  :page-size="localPagination.pageSize"
                  layout="prev, pager, next"
                  :total="form.shopPaymentOptions.length"
                  :hide-on-single-page="true"
                  background
                >
                </el-pagination>
              </div>
            </div>
          </div>
        
      </div>
      <!--begin::Actions-->
      <div class="row">
        <div class="card w-50 card-flush justify-content-center align-items-center floating  py-6 px-9">
          <div class="card-title text-gray-400 fw-normal d-block pt-0">
            {{ $t("pleaseDontForgetToSavePaymentChanges") }}
          </div>
          <div class="crad-body">
            <button type="submit"  @click="saveChanges" id="kt_account_profile_details_submit" ref="submitButton" class="btn btn-primary">
              <span class="indicator-label"  v-if="!isLoading"> {{ $t("savePaymentSetting")}}</span>
              <span class="indicator-progress d-block" v-if="isLoading">
                {{ $t("pleaseWait")}} ...
                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            </button>
          </div>
        </div>
      </div> 
      <!--end::Actions-->
    </div>
  </div>
  <!--end::Basic info-->
</template>

<script lang="ts" setup>
import { ref, computed, reactive, watch, onMounted, watchEffect } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import Swal from "sweetalert2";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import Multiselect from "@vueform/multiselect";
import * as yup from "yup";
import { object, string } from "yup/lib/locale";

// define interfaces

interface shopPayment {
  id: string;
  shopPaymentOptions: [];
}
interface paymentMethodInterface {
  name: string;
  id: string;
  logo: string;
}
// deifne local pagination
const localPagination = reactive({ pageNumber: 1, pageSize: 5 });
// deifne refs
const isLoading = ref(false);
const store = useStore();
const paymentMethod = ref<paymentMethodInterface[]>();
let paymetMethodId = ref();
const shopPayment = ref<shopPayment>({
  shopPaymentOptions: [],
  id: "",
});
// get id as a prop
let props = defineProps({
  id: String,
  countryId: String,
});
const form = reactive(shopPayment);
// delete Payment
function deletePayment(id) {
  let filteredMethod = shopPayment.value.shopPaymentOptions.filter(el => {
    return el !== id
  })
  shopPayment.value.shopPaymentOptions = filteredMethod;
  console.log("form.value.shopPaymentOptions",shopPayment.value.shopPaymentOptions);
}
// add payment
function addPayment(id){
  let findDuplicate = shopPayment.value.shopPaymentOptions.find(element => element == id)
  if(findDuplicate){
    Swal.fire({
        text: "This payment method is added before",
        icon: "warning",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        customClass: {
          confirmButton: "btn fw-bold btn-light-warning",
        }
      })
  }else{
    shopPayment.value.shopPaymentOptions.push(parseInt(id));
    paymetMethodId.value = "";
  }
}
// saveChanges and update  shops payment
const saveChanges = async (values: any) => {
  isLoading.value = true;
  let data = {
    id: shopPayment.value.id,
    shopPaymentOptions: form.value.shopPaymentOptions.map((el)=>{return el.toString()}),
  };

  await store.dispatch(Actions.UPDATE_SHOPS_PAYEMENT, data);
  isLoading.value = false;
};
// get payment method
const getpaymentMethod = () => {
  store.dispatch(Actions.GET_PAYMENT_METHODS, props.countryId).then((data) => {
    paymentMethod.value = data.data;
  });
};
// set pagination in table
const paymentMethodsResult = computed(() =>
  form.value.shopPaymentOptions
    .slice(
      (localPagination.pageNumber - 1) * localPagination.pageSize,
      localPagination.pageSize * localPagination.pageNumber
    )
);

onMounted(() => {
  getpaymentMethod();
  // get shops payment settings from api
  store.dispatch(Actions.GET_SHOPS_PAYEMENT, props.id).then((data) => {
    console.log("data",data);
    shopPayment.value = data;
    shopPayment.value.shopPaymentOptions = data.shopPaymentOptions;
    console.log("data.shopPaymentOptions",data.shopPaymentOptions);
    
  });
});
</script>
<style lang="scss">
@import "@/assets/sass/components/variables.custom";

.product-label {
  &-icon {
    font-size: 56px;
  }
}

.el-table tr {
  cursor: pointe !important;
}

.el-input {
  border-radius: 0.625rem;
}

.el-input__inner {
  border-radius: 0.625rem;
  background-color: #f5f8fa;
  height: 45px;
  border: none;
}

.el-tag {
  background-color: $primary !important;
  color: #fff;

  svg {
    color: #fff;
  }
}
.floating{
  position: fixed;
  bottom: 0px;

}
</style>
