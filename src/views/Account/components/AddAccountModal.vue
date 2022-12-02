<template>
  <Form
    ref="accountForm"
    :validation-schema="schema"
    class="form fv-plugins-bootstrap5 fv-plugins-framework p-5"
    @submit="submit"
  >
    <div class="row">
      <!--begin:: name-->
      <div class="col-12 my-3">
        <label class="required fs-5 fw-bold mb-2">{{ $t("name") }}</label>
        <Field name="accountName" type="text" v-model="form.name" v-slot="{ field, meta }">
          <input
            :placeholder="$t('name')"
            v-model="form.name"
            v-bind="field"
            class="form-control form-control-solid form-control-lg"
            type="text"
          />
        </Field>
        <ErrorMessage class="text-danger" name="accountName"></ErrorMessage>
      </div>
      <!--end::Input-->
      <div class="col-12 mt-4" >
        <label class="required fs-5 fw-bold mb-2 d-inline">{{
          $t("description")
        }}</label>
        <Field name="description" type="text" v-model="form.description" v-slot="{ field, meta }">
          <QuillTextEditor
          v-model:content ="form.description"
          v-bind="field"
          contentType="html"
          :class="{
            'is-valid': meta.valid,
            'is-invalid': meta.validated && !meta.valid,
          }"
          @input="setVal($event)"
          />
        </Field>
        <ErrorMessage class="text-danger" name="description"></ErrorMessage>
      </div>
      <!--start::account types -->
      <div class="col-12 my-3">
        <label class="required fs-5 fw-bold mb-2 d-inline">{{
          $t("accountType")
        }}</label>
     
        <Field name="accountTypeId" type="text"  v-model="accountTypeId">

          <el-select
            class="w-100 form-control-solid border-0"
            v-model="accountTypeId"
            :placeholder="$t('enterKeyword')"
          >
        
            <el-option
              v-for="item in accountTypes"
              :key="item.id"
              :label="item.value"
              :value="parseInt(item.id)"
              :class="{ 'd-none': item.id == 1 }"
            >
            </el-option>
          </el-select>
        </Field>
        <ErrorMessage class="text-danger" name="accountTypeId"></ErrorMessage>
      </div>
      <!--end::account types -->

      <!--start::account subtypes -->
      <div
          class="col-12 my-3"
          v-if="accountTypeId != '3'"
        >
          <label
            class="required fs-5 fw-bold mb-2 d-inline"
            >{{ $t("accountSubType") }}</label
          >
          <Field
            name="accountSubTypeId"
            type="text"
            v-model="form.accountSubTypeId"
          >
            <el-select
              class="w-100 form-control-solid border-0"
              v-model="form.accountSubTypeId"
              :placeholder="$t('enterKeyword')"
            >
              <el-option
                v-for="item in accountSubTypesId"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </Field>
          <ErrorMessage
            class="text-danger"
            name="accountSubTypeId"
          ></ErrorMessage>
      </div>
      <!--end::account subtypes -->
      <!--start::walletId -->
      <div v-if="accountTypeId == '2'" class="col-12 my-3">
        <label class="required fs-5 fw-bold mb-2">{{ $t("walletId") }}</label>
        <Field name="walletId" type="text" v-model="form.walletId" v-slot="{ field, meta }">
          <input
            :placeholder="$t('walletId')"
            v-model="form.walletId"
            v-bind="field"
            class="form-control form-control-solid form-control-lg"
            type="number"
            :class="{
              'is-valid': meta.valid,
              'is-invalid': meta.validated && !meta.valid,
            }"
          />
        </Field>
        <ErrorMessage class="text-danger" name="walletId"></ErrorMessage>
      </div>
      <!--end::walletId -->

      <!--start::bankIBANNumber -->
      <div v-if="accountTypeId == '4'" class="col-12 my-3">
        <label class="required fs-5 fw-bold mb-2">{{ $t("bankIBANNumber") }}</label>
        <Field name="bankIBANNumber" type="text" v-model="form.bankIBANNumber" v-slot="{ field, meta }">
          <input
            :placeholder="$t('bankIBANNumber')"
            v-bind="field"
            class="form-control form-control-solid form-control-lg"
            type="number"
            :class="{
              'is-valid': meta.valid,
              'is-invalid': meta.validated && !meta.valid,
            }"
          />
        </Field>
        <ErrorMessage class="text-danger" name="bankIBANNumber"></ErrorMessage>
      </div>
      <!--end::bankIBANNumber -->

      <!--begin::bankCard-->
      <div v-if="accountTypeId == '3'" class="bank-card">
        <div class="row">
          <!--start::bankCardNmunber -->

          <div class="d-flex flex-column mb-7 fv-row">
            <!--begin::Label-->
            <label
              class="required fs-6 fw-bold form-label mb-2"
              >{{ $t("bankCardNumber") }}</label
            >
            <!--end::Label-->

            <!--begin::Input wrapper-->
            <div class="position-relative">
              <!--begin::Input-->
              <Field
                  @input="formatCardNumber($event.target.value)"
                  class="form-control"
                  :placeholder="$t('name')"
                  name="bankCardNumber"
                  v-model="form.bankCardNumber"
                  />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="bankCardNumber" />
                </div>
              </div>
              <!--end::Input-->

              <!--begin::Card logos-->
              <div
                class="position-absolute translate-middle-y top-50 end-0 me-5"
              >
                <img
                  v-if="visaCard"
                  src="/media/svg/card-logos/visa.svg"
                  alt=""
                  class="h-25px"
                />
                <img
                  v-if="masterCard"
                  src="/media/svg/card-logos/mastercard.svg"
                  alt=""
                  class="h-25px"
                />
                <img
                  v-if="americanExpressCard"
                  src="/media/svg/card-logos/american-express.svg"
                  alt=""
                  class="h-30px"
                />
              </div>
              <!--end::Card logos-->
            </div>
            <!--end::Input wrapper-->
          </div>
          <!--end::bankCardNumber -->
        </div>
        <div class="row">
          <!--start::bankCardUserNumber -->
          <div class="col-6 my-3">
            <label class="required fs-5 fw-bold mb-2">{{
              $t("bankCardUserName")
            }}</label>
            <Field
              name="bankCardUserName"
              type="text"
              v-model="form.bankCardUserName"
              v-slot="{ field, meta }"
            >
              <input
                v-bind="field"
                class="form-control form-control-solid form-control-lg"
                type="text"
                :placeholder="$t('bankCardUserName')"
                :class="{
                  'is-valid': meta.valid,
                  'is-invalid':
                    meta.validated && !meta.valid,
                }"
              />
            </Field>
            <ErrorMessage
              class="text-danger"
              name="bankCardUserName"
            ></ErrorMessage>
          </div>
          <!--end::bankCardUserName -->

          <!--start::bankCardSecurityNumber -->
          <div class="col-6 my-3">
            <label class="required fs-5 fw-bold mb-2">{{
              $t("bankCardSecurityNumber")
            }}</label>
            <Field
              name="bankCardSecurityNumber"
              type="text"
              v-model="form.bankCardSecurityNumber"
              v-slot="{ field, meta }"
            >
              <input
                v-bind="field"
                :placeholder="$t('bankCardSecurityNumber')"
                class="form-control form-control-solid form-control-lg"
                type="number"
                :class="{
                  'is-valid': meta.valid,
                  'is-invalid':
                    meta.validated && !meta.valid,
                }"
              />
            </Field>
            <ErrorMessage
              class="text-danger"
              name="bankCardSecurityNumber"
            ></ErrorMessage>
          </div>
          <!--end::bankCardSecurityNumber -->
        </div>
        <div class="row">
          <!--begin::bankCardExpiryMonth-->
          <div class="col-6 my-3">
            <label class="required fs-5 fw-bold mb-2">{{
              $t("bankCardExpiryMonth")
            }}</label>
            <Field
              name="bankCardExpiryMonth"
              type="date"
              v-slot="{ field, meta }"
            >
              <div class="flex-grow-1">
                <ElDatePicker
                  v-model="form.bankCardExpiryMonth"
                  v-bind="field"
                  type="month"
                  :placeholder="$t('bankCardExpiryMonth')"
                  class="w-100"
                  format="MM"
                  value-format="MM"
                  :class="{
                    'is-valid': meta.valid,
                    'is-invalid':
                      meta.validated && !meta.valid,
                  }"
                ></ElDatePicker>
              </div>
            </Field>
            <ErrorMessage
              class="text-danger"
              name="bankCardExpiryMonth"
            ></ErrorMessage>
          </div>
          <!--end::bankCardExpiryMonth -->

          <!--begin::bankCardExpiryYear-->
          <div class="col-6 my-3">
            <label class="required fs-5 fw-bold mb-2">{{
              $t("bankCardExpiryYear")
            }}</label>
            <Field
              name="bankCardExpiryYear"
              type="date"
              v-slot="{ field, meta }"
            >
              <div class="flex-grow-1">
                <ElDatePicker
                  v-model="form.bankCardExpiryYear"
                  v-bind="field"
                  type="year"
                  :placeholder="$t('bankCardExpiryYear')"
                  class="w-100"
                  format="YYYY"
                  value-format="YYYY"
                  :class="{
                    'is-valid': meta.valid,
                    'is-invalid':
                      meta.validated && !meta.valid,
                  }"
                ></ElDatePicker>
              </div>
            </Field>
            <ErrorMessage
              class="text-danger"
              name="bankCardExpiryYear"
            ></ErrorMessage>
          </div>
          <!--end::bankCardExpiryYear -->
        </div>
      </div>

    </div>

    <!--begin::add-->
    <div class="row my-5">
      <div class="col">
        <div class="d-flex justify-content-end w-100">
          <button class="btn btn-primary">
            <span v-if="!isLoading">
              {{ $t("addAccount") }}
              <span class="fas fa-plus"></span>
            </span>
            <span v-if="isLoading" class="indicator-progress d-block">
              {{ $t("wait") }}...
              <span class="spinner-border spinner-border-sm align-middle ms-2" />
            </span>
          </button>
        </div>
      </div>
    </div>

  </Form>
</template>

<script setup lang="ts">
import { Actions } from "@/store/enums/StoreEnums";
import QuillTextEditor from "@/components/Reusable/QuillTextEditor.vue";
import { reactive, ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { Form, Field, ErrorMessage  } from "vee-validate";
import * as yup from "yup";
import i18n from "@/core/plugins/i18n";

const store = useStore();
const accountForm = ref(null);
// INITIALIZE
const emit = defineEmits(["account-added"]);

let accountTypeId = ref("")
const visaCard = ref(false);
const masterCard = ref(false);
const americanExpressCard = ref(false);

const accountAttrs = {
  accountSubTypeId: "",
  name:'',
  description:'',
  walletId: "",
  bankIBANNumber: "",
  bankCardUserName: "",
  bankCardNumber: "",
  bankCardSecurityNumber: "",
  bankCardExpiryMonth: '',
  bankCardExpiryYear: '',
};
const isLoading = ref(false);

let form = reactive(accountAttrs);
function setVal(e) {
  form.description = e.target.innerHTML;
}


watch(form, (newForm) => {
      
      let visaCardregex = new RegExp("4[0-9 ]{15}(?:[0-9]{3})?$");
      let masterCardregex = new RegExp(
        "^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9 ]{15}$"
      );
      let americanExpressCardregex = new RegExp("3[47][0-9 ]{16}$");
      visaCard.value = visaCardregex.test(form.bankCardNumber);
      masterCard.value = masterCardregex.test(form.bankCardNumber);
      americanExpressCard.value = americanExpressCardregex.test(
        form.bankCardNumber
      );
      console.log(" masterCard.value", masterCard.value)
      console.log("  visaCard.value ",  visaCard.value )
      console.log("    americanExpressCard.value",    americanExpressCard.value)
      if (visaCard.value) {
        form.accountSubTypeId = "3";
      } else if (masterCard.value) {
        form.accountSubTypeId = "4";
      } else if (americanExpressCard.value) {
        form.accountSubTypeId = "5";
      }
    });
function submit() {
  accountForm?.value?.validate().then(({ valid }) => {
    if (valid) {
      onSubmit();
    }
  });
}
function onSubmit() {
  Object.keys(form).forEach(key => {
    if (form[key] === '') {
      delete form[key];
    }
  });
  isLoading.value = true;
  store.dispatch(Actions.ADD_ACCOUNT, {
    ...form,
    })
    .then(() => {
      isLoading.value = false;
      emit("account-added");
      resetForm();
    });
}
function resetForm() {
  form.name = "";
  form.description = "";
  form.accountSubTypeId = "";
  form.walletId = "";
  form.bankIBANNumber = "";
  form.bankCardUserName = "";
  form.bankCardNumber = "";
  form.bankCardSecurityNumber = "";
  form.bankCardExpiryMonth = '';
  form.bankCardExpiryYear = '';
  accountForm.value?.resetForm();
  accountTypeId.value = "";
  console.log("reset");
}




//Getters

const accountTypes = computed(() => store.getters.getAccountTypes);
const accountSubTypesId = computed(() => store.getters.getAccountSubTypes)

const schema = yup.object({
  accountName: yup.string().required(i18n.global.t("fieldRequired")),
  description: yup.string().required(i18n.global.t("fieldRequired")),
  accountTypeId: yup.string().required(i18n.global.t("fieldRequired")),
  //accountSubTypeId:yup.string().required(i18n.global.t("fieldRequired")),
  accountSubTypeId: yup.string().when("accountTypeId", (accountTypeId) => {
    if (accountTypeId !== "3") {
      return yup.string().required(i18n.global.t("fieldRequired"));
    } else {
      return yup.string();
    }
  }),
 
  walletId: yup.string().when("accountTypeId", (accountTypeId) => {
        
          if (accountTypeId === "2") {
            return yup.string().required(i18n.global.t("fieldRequired"));
          } else {
            return yup.string();
          }
        }),
  bankIBANNumber: yup.string().when("accountTypeId", (accountTypeId) => {
        
        if (accountTypeId === "4") {
          return yup.string().required(i18n.global.t("fieldRequired"));
        } else {
          return yup.string();
        }
      }),
  bankCardUserName:  yup.string().when("accountTypeId", (accountTypeId) => {
        
        if (accountTypeId === "3") {
          return yup.string().required(i18n.global.t("fieldRequired"));
        } else {
          return yup.string();
        }
      }),
  bankCardNumber: yup.string().when("accountTypeId", (accountTypeId) => {
        
        if (accountTypeId === "3") {
          return yup.string().min(13, i18n.global.t("cardNumNotValid")).max(19, i18n.global.t("cardNumNotValid")).required(i18n.global.t("fieldRequired"));
        } else {
          return yup.string();
        }
      }),
  bankCardSecurityNumber: yup.string().when("accountTypeId", (accountTypeId) => {
        
        if (accountTypeId === "3") {
          return yup.string().min(3, i18n.global.t("cardSecurtyNumNotValid")).max(3, i18n.global.t("cardSecurtyNumNotValid")).required(i18n.global.t("fieldRequired"));
        } else {
          return yup.string();
        }
      }),
  bankCardExpiryMonth:yup.string().when("accountTypeId", (accountTypeId) => {
        
        if (accountTypeId === "3") {
          return yup.date().required(i18n.global.t("fieldRequired"));
        } else {
          return yup.date();
        }
      }),
  bankCardExpiryYear:yup.string().when("accountTypeId", (accountTypeId) => {
        
        if (accountTypeId === "3") {
          return yup.date().required(i18n.global.t("fieldRequired"));
        } else {
          return yup.date();
        }
      }),
  
});
// watch on accountTypeId to get accountSubTypes
watch(accountTypeId, (nv, old)=> {
  accountSubtypes(nv)
})

// get account subtypes
const accountSubtypes = (id) => {
 store.dispatch(Actions.GET_ACCOUNT_SUBTYPES, {
    accountTypeId: id
    });
    form.accountSubTypeId = "";
};

// set mask of credit card number
const  formatCardNumber=(target)=>{
  console.log(target)
  form.bankCardNumber=target.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
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


