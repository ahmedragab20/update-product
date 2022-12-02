<template>
  <!--begin::Modal - Create App-->
  <div
    class="modal fade"
    id="kt_modal_withdraw"
    ref="createAppModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-900px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header">
          <!--begin::Modal title-->
          <h2>{{ $t("Withdraw") }}</h2>

          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="/media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body py-lg-10 px-lg-10">
          <!--begin::Stepper-->
          <div
            class="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid"
            id="kt_modal_create_app_stepper"
            ref="createAppRef"
          >
            <!--begin::Aside-->
            <div
              class="d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px"
            >
              <!--begin::Nav-->
              <div class="stepper-nav ps-lg-10">
                <!--begin::Step 1-->
                <div class="stepper-item current" data-kt-stepper-element="nav">
                  <!--begin::Line-->
                  <div class="stepper-line w-40px"></div>
                  <!--end::Line-->

                  <!--begin::Icon-->
                  <div class="stepper-icon w-40px h-40px">
                    <i class="stepper-check fas fa-check"></i>
                    <span class="stepper-number">1</span>
                  </div>
                  <!--end::Icon-->

                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">{{ $t("depositAmount") }}</h3>

                    <!-- <div class="stepper-desc">Name your App</div> -->
                  </div>
                  <!--end::Label-->
                </div>
                <!--end::Step 1-->

                <!--begin::Step 2-->

                <div class="stepper-item" data-kt-stepper-element="nav">
                  <!--begin::Line-->
                  <div class="stepper-line w-40px"></div>
                  <!--end::Line-->

                  <!--begin::Icon-->
                  <div class="stepper-icon w-40px h-40px">
                    <i class="stepper-check fas fa-check"></i>
                    <span class="stepper-number">2</span>
                  </div>
                  <!--begin::Icon-->

                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">{{ $t("accounts") }}</h3>

                    <!-- <div class="stepper-desc">Define your app accountId</div> -->
                  </div>
                  <!--begin::Label-->

                  <!--end::Step 2-->
                </div>
                <!--begin::Step 3-->
                <div class="stepper-item" data-kt-stepper-element="nav">
                  <!--begin::Line-->
                  <div class="stepper-line w-40px"></div>
                  <!--end::Line-->

                  <!--begin::Icon-->
                  <div class="stepper-icon w-40px h-40px">
                    <i class="stepper-check fas fa-check"></i>
                    <span class="stepper-number">3</span>
                  </div>
                  <!--end::Icon-->

                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">{{ $t("notes") }}</h3>

                    <!-- <div class="stepper-desc">Select the app database type</div> -->
                  </div>
                  <!--end::Label-->
                </div>
                <!--end::Step 3-->

                <!--begin::Step 5-->
                <div class="stepper-item" data-kt-stepper-element="nav">
                  <!--begin::Line-->
                  <div class="stepper-line w-40px"></div>
                  <!--end::Line-->

                  <!--begin::Icon-->
                  <div class="stepper-icon w-40px h-40px">
                    <i class="stepper-check fas fa-check"></i>
                    <span class="stepper-number">4</span>
                  </div>
                  <!--end::Icon-->

                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">{{ $t("release") }}</h3>

                    <div class="stepper-desc">{{ $t("reviewAndSubmit") }}</div>
                  </div>
                  <!--end::Label-->
                </div>
                <!--end::Step 5-->
              </div>
              <!--end::Nav-->
            </div>
            <!--begin::Aside-->

            <!--begin::Content-->
            <div class="flex-row-fluid py-lg-5 px-lg-15">
              <!--begin::Form-->
              <form
                class="form"
                novalidate="novalidate"
                id="kt_modal_create_app_form"
                @submit="handleStep"
              >
                <!--begin::Step 1-->
                <div class="current" data-kt-stepper-element="content">
                  <div class="w-100">
                    <div class="fv-row">
                      <!--begin::Label-->
                      <label
                        class="d-flex align-items-center fs-5 fw-bold mb-4"
                      >
                        <span class="required">{{ $t("currentBalance") }}</span>
                      </label>
                      <!--end::Label-->

                      <!--begin:Options-->
                      <div class="fv-row">
                        <!--begin:Option-->
                        <label class="d-flex flex-stack mb-5 cursor-pointer">
                          <!--begin:Label-->
                          <span class="d-flex align-items-center me-2">
                            <!--begin:Icon-->
                            <span class="symbol symbol-50px me-6">
                              <span class="symbol-label bg-light-primary">
                                <span
                                  class="svg-icon svg-icon-1 svg-icon-primary"
                                >
                                  <inline-svg
                                    src="/media/icons/duotune/maps/map004.svg"
                                  />
                                </span>
                              </span>
                            </span>
                            <!--end:Icon-->

                            <!--begin:Info-->
                            <span class="d-flex flex-column">
                              <span class="fw-bolder fs-6">
                                {{ WalletDetails.availableBalance }}</span
                              >
                            </span>
                            <!--end:Info-->
                          </span>
                          <!--end:Label-->
                        </label>
                        <!--end::Option-->

                        <!--end::Option-->
                      </div>
                      <!--end:Options-->
                    </div>
                    <!--begin::Input group-->
                    <div class="fv-row mb-10">
                      <!--begin::Label-->
                      <label
                        class="d-flex align-items-center fs-5 fw-bold mb-2"
                      >
                        <span class="required">{{ $t("amount") }} </span>
                        <i
                          class="fas fa-exclamation-circle ms-2 fs-7"
                          data-bs-toggle="tooltip"
                          title="Specify your unique app name"
                        ></i>
                      </label>
                      <!--end::Label-->

                      <!--begin::Input-->
                      <Field
                        type="number"
                        class="form-control form-control-lg form-control-solid"
                        name="amount"
                        v-model="form.amount"
                        placeholder=""
                      />
                      <ErrorMessage
                        class="fv-plugins-message-container invalid-feedback"
                        name="amount"
                      />
                      <!--end::Input-->
                    </div>
                    <!--end::Input group-->

                    <!--begin::Input group-->

                    <!--end::Input group-->
                  </div>
                </div>
                <!--end::Step 1-->

                <!--begin::Step 2-->

                <div data-kt-stepper-element="content">
                  <div class="w-100">
                    <!--begin::Input group-->
                    <div class="fv-row">
                      <!--begin::Label-->

                      <!--begin:Option-->

                      <!--begin::Heading-->
                      <label
                        class="d-flex flex-stack cursor-pointer mb-5"
                        v-for="account in AccountsInWithdrawFromWallet"
                      >
                        <!--begin:Label-->
                        <span class="d-flex align-items-center me-2">
                          <!--begin:Icon-->
                          <span class="symbol symbol-50px me-6">
                            <span class="symbol-label bg-light-warning">
                              <i class="fab fa-html5 text-warning fs-2x"></i>
                            </span>
                          </span>
                          <!--end:Icon-->

                          <!--begin:Info-->
                          <span class="d-flex flex-column">
                            <span class="fw-bolder fs-6">
                              {{ account.name }}</span
                            >

                            <span class="fs-7 text-muted">{{
                              account.accountSubType
                            }}</span>
                          </span>
                          <!--end:Info-->
                        </span>
                        <!--end:Label-->

                        <!--begin:Input-->
                        <span
                          class="form-check form-check-custom form-check-solid"
                        >
                          <Field
                            class="form-check-input"
                            type="radio"
                            checked
                            name="accountId"
                            :value="account.accountId"
                            v-model="form.accountId"
                          />
                        </span>
                        <!--end:Input-->
                      </label>
                      <!--end::Description-->

                      <!--end::Option-->

                      <ErrorMessage
                        class="fv-plugins-message-container invalid-feedback"
                        name="accountId"
                      />
                    </div>
                    <!--end::Input group-->
                  </div>
                </div>
                <!--end::Step 2-->

                <!--begin::Step 3-->
                <div data-kt-stepper-element="content">
                  <div class="w-100">
                    <!--begin::Input group-->
                    <div class="fv-row mb-10">
                      <!--begin::Label-->
                      <label class="required fs-5 fw-bold mb-2">
                        {{ $t("yourPassword") }}
                      </label>
                      <!--end::Label-->

                      <!--begin::Input-->
                      <Field
                        type="text"
                        class="form-control form-control-lg form-control-solid"
                        name="password"
                        placeholder=""
                        v-model="form.password"
                      />
                      <ErrorMessage
                        class="fv-plugins-message-container invalid-feedback"
                        name="password"
                      />
                      <!--end::Input-->
                    </div>
                    <!--end::Input group-->

                    <!--begin::Input group-->
                    <div class="fv-row mb-10">
                      <!--begin::Label-->
                      <label class="required fs-5 fw-bold mb-2">
                        {{ $t("notes") }}
                      </label>
                      <!--end::Label-->

                      <!--begin::Input-->
                      <Field
                        type="text"
                        class="form-control form-control-lg form-control-solid"
                        name="notes"
                        placeholder=""
                        v-model="form.notes"
                      />
                      <ErrorMessage
                        class="fv-plugins-message-container invalid-feedback"
                        name="notes"
                      />
                      <!--end::Input-->
                    </div>
                    <!--end::Input group-->
                  </div>
                </div>
                <!--end::Step 3-->

                <!--begin::Step 4-->

                <!--end::Step 4-->

                <!--begin::Step 5-->
                <div data-kt-stepper-element="content">
                  <div class="w-100 text-center">
                    <!--begin::Heading-->
                    <h1 class="fw-bolder text-dark mb-3">{{ $t("done") }}</h1>
                    <!--end::Heading-->

                    <!--begin::Description-->
                    <div class="text-muted fw-bold fs-3">
                      {{ $t("submitYourInfoToWithdraw") }}
                    </div>
                    <!--end::Description-->

                    <!--begin::Illustration-->
                    <div class="text-center px-4 py-15">
                      <img
                        :src="getIllustrationsPath('9.png')"
                        alt=""
                        class="mw-100 mh-300px"
                      />
                    </div>
                    <!--end::Illustration-->
                  </div>
                </div>
                <!--end::Step 5-->

                <!--begin::Actions-->
                <div class="d-flex flex-stack pt-10">
                  <!--begin::Wrapper-->
                  <div class="me-2">
                    <button
                      type="button"
                      class="btn btn-lg btn-light-primary me-3"
                      data-kt-stepper-action="previous"
                      @click="previousStep()"
                    >
                      <span class="svg-icon svg-icon-3 me-1">
                        <inline-svg
                          src="/media/icons/duotune/arrows/arr063.svg"
                        />
                      </span>
                      {{ $t("back") }}
                    </button>
                  </div>
                  <!--end::Wrapper-->

                  <!--begin::Wrapper-->
                  <div>
                    <button
                      type="submit"
                      class="btn btn-lg btn-primary"
                      v-if="currentStepIndex === totalSteps - 1"
                      @click="formSubmit()"
                    >
                      <span class="indicator-label" v-if="!isLoading">
                        {{ $t("submit") }}
                        <span class="svg-icon svg-icon-3 ms-2 me-0">
                          <inline-svg
                            src="/media/icons/duotune/arrows/arr064.svg"
                          />
                        </span>
                      </span>
                      <span v-if="isLoading" class="indicator-progress d-block">
                        {{ $t("wait") }}
                        <span
                          class="spinner-border spinner-border-sm align-middle ms-2"
                        />
                      </span>
                    </button>

                    <button type="submit" class="btn btn-lg btn-primary" v-else>
                      {{ $t("continue") }}
                      <span class="svg-icon svg-icon-3 ms-1 me-0">
                        <inline-svg
                          src="/media/icons/duotune/arrows/arr064.svg"
                        />
                      </span>
                    </button>
                  </div>
                  <!--end::Wrapper-->
                </div>
                <!--end::Actions-->
              </form>
              <!--end::Form-->
            </div>
            <!--end::Content-->
          </div>
          <!--end::Stepper-->
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--end::Modal - Create App-->
</template>

<style lang="scss" scoped>
.el-input--suffix .el-input__inner {
  background-color: #f5f8fa;
}

.el-input__inner {
  background-color: #f5f8fa;
}
</style>

<script lang="ts">
import i18n from "@/core/plugins/i18n";
import {
  defineComponent,
  onMounted,
  ref,
  computed,
  reactive,
  watch,
} from "vue";
import { StepperComponent } from "@/assets/ts/components/_StepperComponent";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { useForm } from "vee-validate";
import { Field, ErrorMessage } from "vee-validate";
import { Actions } from "@/store/enums/StoreEnums";
import * as Yup from "yup";
import { hideModal } from "@/core/helpers/dom";
import { getIllustrationsPath } from "@/core/helpers/assets";
import { useStore } from "vuex";

interface Step1 {
  amount: number;
  shopId: string;
}

interface Step2 {
  accountId: string;
}

interface Step3 {
  notes: string;
  password: string;
}

interface KTCreateApp extends Step1, Step2, Step3 {}

export default defineComponent({
  name: "withdraw-modal",
  components: {
    Field,

    ErrorMessage,
  },
  setup() {
    const WalletDetails = computed(
      () => store.state.WalletModule.WalletDetails
    );
    const store = useStore();

    const AccountsInWithdrawFromWallet = computed(
      () => store.state.AllAccounts.InWithdrawFromWallet
    );
    const _stepperObj = ref<StepperComponent | null>(null);
    const createAppRef = ref<HTMLElement | null>(null);
    const createAppModalRef = ref<HTMLElement | null>(null);
    const currentStepIndex = ref(0);

    let accountType = ref("");
    const withdrawForm = {
      shopId: "",

      password: "",

      accountId: "",
      amount: 1,
      notes: "",
    };
    const isLoading = ref(false);

    let form = reactive(withdrawForm);

    onMounted(() => {
      _stepperObj.value = StepperComponent.createInsance(
        createAppRef.value as HTMLElement
      );
    });

    const createAppSchema = [
      Yup.object({
        amount: Yup.number()
          .lessThan(
            WalletDetails.value.availableBalance,
            "Amount should be less than Current Balanc"
          )
          .required()
          .label("Amount"),
      }),
      Yup.object({
        accountId: Yup.string().required().label("accountTypeMthod"),
        // accountId: Yup.string().required().label("accountId"),
      }),

      Yup.object({
        notes: Yup.string().required().label("notes"),
        password: Yup.string().required().label("password"),
      }),
    ];

    // extracts the individual step schema
    const currentSchema = computed(() => {
      return createAppSchema[currentStepIndex.value];
    });

    const totalSteps = computed(() => {
      if (!_stepperObj.value) {
        return;
      }

      return _stepperObj.value.totatStepsNumber;
    });

    const { resetForm, handleSubmit } = useForm<Step1 | Step2 | Step3>({
      validationSchema: currentSchema,
    });
    const goto = () => {
      if (!_stepperObj.value) {
        return;
      }

      _stepperObj.value.goto(1);
    };
    const previousStep = () => {
      if (!_stepperObj.value) {
        return;
      }

      currentStepIndex.value--;

      _stepperObj.value.goPrev();
    };

    const handleStep = handleSubmit((values) => {
      if (currentStepIndex.value < 3) {
        currentStepIndex.value++;
      }

      if (!_stepperObj.value) {
        return;
      }

      _stepperObj.value.goNext();
    });
    function removeForm() {
      currentStepIndex.value = 0;

      form.shopId = "";
      form.accountId = "";

      form.password = "";

      form.amount = 0;
      form.notes = "";
    }
    const formSubmit = () => {
      isLoading.value = true;
      form.shopId = WalletDetails.value.shopId;
      Object.keys(form).forEach((key) => {
        if (form[key] === "") {
          delete form[key];
        }
      });

      store.dispatch(Actions.WITHDRAW_TO_WALLET, form).then(() => {
        goto();
        resetForm({
          values: {
            ...form,
          },
        });
        isLoading.value = false;
        hideModal(createAppModalRef.value);
        removeForm();
      });
    };

    resetForm({
      values: {
        ...form,
      },
    });

    return {
      goto,

      accountType,
      isLoading,
      withdrawForm,
      form,

      handleStep,
      WalletDetails,
      formSubmit,

      previousStep,
      createAppRef,
      currentStepIndex,
      totalSteps,
      createAppModalRef,
      getIllustrationsPath,
      AccountsInWithdrawFromWallet,
    };
  },
});
</script>
<style>
.h-25px {
  height: 27px !important;
  margin-bottom: 10px;
}
</style>
