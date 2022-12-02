<template>
  <!--begin::Authentication - Multi-steps-->
  <div
    class="d-flex flex-column flex-lg-row flex-column-fluid stepper stepper-pills stepper-column"
    ref="wizardRef"
    id="kt_create_account_stepper"
  >
    <!--begin::Aside-->
    <div
      class="d-flex flex-column flex-lg-row-auto w-xl-500px bg-lighten shadow-sm"
    >
      <!--begin::Wrapper-->
      <div
        class="d-flex flex-column position-xl-fixed top-0 bottom-0 w-xl-500px scroll-y"
      >
        <!--begin::Header-->
        <div
          class="d-flex flex-row-fluid flex-column flex-center p-10 pt-lg-20"
        >
          <!--begin::Logo-->
          <router-link to="/dashboard" class="mb-10 mb-lg-20">
            <img alt="Logo" src="/media/logos/logo-1.svg" class="h-40px" />
          </router-link>
          <!--end::Logo-->

          <!--begin::Nav-->
          <div class="stepper-nav">
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
                <h3 class="stepper-title">{{ $t("websiteSettings") }}</h3>

                <div class="stepper-desc fw-bold">
                  {{ $t("setupSettings") }}
                </div>
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
              <!--end::Icon-->

              <!--begin::Label-->
              <div class="stepper-label">
                <h3 class="stepper-title">{{ $t("marketSettings") }}</h3>
                <div class="stepper-desc fw-bold">
                  {{ $t("marketSetup") }}
                </div>
              </div>
              <!--end::Label-->
            </div>
            <!--end::Step 2-->

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
                <h3 class="stepper-title">{{ $t("langAndCurr") }}</h3>
                <div class="stepper-desc fw-bold">
                  {{ $t("langAndCurrSettings") }}
                </div>
              </div>
              <!--end::Label-->
            </div>
            <!--end::Step 3-->

            <!--begin::Step 4-->
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
                <h3 class="stepper-title">{{ $t("marketIdentity") }}</h3>
                <div class="stepper-desc fw-bold">
                  {{ $t("marketIdentitySettings") }}
                </div>
              </div>
              <!--end::Label-->
            </div>
            <!--end::Step 4-->

            <!--begin::Step 5-->
            <div class="stepper-item" data-kt-stepper-element="nav">
              <!--begin::Line-->
              <div class="stepper-line w-40px"></div>
              <!--end::Line-->

              <!--begin::Icon-->
              <div class="stepper-icon w-40px h-40px">
                <i class="stepper-check fas fa-check"></i>
                <span class="stepper-number">5</span>
              </div>
              <!--end::Icon-->

              <!--begin::Label-->
              <div class="stepper-label">
                <h3 class="stepper-title">{{ $t("catAndTags") }}</h3>
                <div class="stepper-desc fw-bold">
                  {{ $t("catAndTagsSettings") }}
                </div>
              </div>
              <!--end::Label-->
            </div>
            <!--end::Step 5-->

            <!--begin::Step 6-->
            <div class="stepper-item" data-kt-stepper-element="nav">
              <!--begin::Line-->
              <div class="stepper-line w-40px"></div>
              <!--end::Line-->

              <!--begin::Icon-->
              <div class="stepper-icon w-40px h-40px">
                <i class="stepper-check fas fa-check"></i>
                <span class="stepper-number">6</span>
              </div>
              <!--end::Icon-->

              <!--begin::Label-->
              <div class="stepper-label">
                <h3 class="stepper-title">{{ $t("completed") }}</h3>
                <div class="stepper-desc fw-bold">{{ $t("woah") }}</div>
              </div>
              <!--end::Label-->
            </div>
            <!--end::Step 6-->
          </div>
          <!--end::Nav-->
        </div>
        <!--end::Header-->

        <!--begin::Illustration-->
        <div
          class="d-flex flex-row-auto bgi-no-repeat bgi-position-x-center bgi-size-contain bgi-position-y-bottom min-h-150px min-h-lg-300px"
          :style="{
            backgroundImage: `url(
            ${getIllustrationsPath('16.png')}
            )`,
          }"
        ></div>
        <!--end::Illustration-->
      </div>
      <!--end::Wrapper-->
    </div>
    <!--begin::Aside-->

    <!--begin::Body-->
    <div class="d-flex flex-row-fluid flex-center bg-white rounded">
      <!--begin::Form-->
      <form
        class="py-20 w-100 w-xl-700px px-9"
        novalidate="novalidate"
        id="kt_create_account_form"
        @submit="handleStep"
      >
        <!--begin::Step 1-->
        <div class="current" data-kt-stepper-element="content">
          <Step1></Step1>
        </div>
        <!--end::Step 1-->

        <!--begin::Step 2-->
        <div data-kt-stepper-element="content">
          <Step2></Step2>
        </div>
        <!--end::Step 2-->

        <!--begin::Step 3-->
        <div data-kt-stepper-element="content">
          <Step3></Step3>
        </div>
        <!--end::Step 3-->

        <!--begin::Step 4-->
        <div data-kt-stepper-element="content">
          <Step4></Step4>
        </div>
        <!--end::Step 4-->

        <!--begin::Step 5-->
        <div data-kt-stepper-element="content">
          <Step5></Step5>
        </div>
        <!--end::Step 5-->

        <!--begin::Step 5-->
        <div data-kt-stepper-element="content">
          <Step6></Step6>
        </div>
        <!--end::Step 5-->

        <!--begin::Actions-->
        <div class="d-flex flex-stack pt-10">
          <!--begin::Wrapper-->
          <div class="mr-2">
            <button
              type="button"
              class="btn btn-lg btn-light-primary me-3"
              data-kt-stepper-action="previous"
              @click="previousStep"
            >
              <span class="svg-icon svg-icon-4 me-1">
                <inline-svg src="media/icons/duotune/arrows/arr063.svg" />
              </span>
              {{ $t("back") }}
            </button>
          </div>
          <!--end::Wrapper-->

          <!--begin::Wrapper-->
          <div>
            <button
              type="button"
              class="btn btn-lg btn-primary me-3"
              data-kt-stepper-action="submit"
              ref="setupSubmit"
              v-if="currentStepIndex === totalSteps - 1"
              @click="formSubmit()"
            >
              <span class="indicator-label">
                {{ $t("submit") }}
                <span class="svg-icon svg-icon-3 ms-2 me-0">
                  <inline-svg src="media/icons/duotune/arrows/arr064.svg" />
                </span>
              </span>
              <span class="indicator-progress">
                {{ $t("pleaseWait") }}...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>

            <button v-else type="submit" class="btn btn-lg btn-primary">
              {{ $t("continue") }}
              <span class="svg-icon svg-icon-4 ms-1 me-0">
                <inline-svg src="media/icons/duotune/arrows/arr064.svg" />
              </span>
            </button>
          </div>
          <!--end::Wrapper-->
        </div>
        <!--end::Actions-->
      </form>
      <!--end::Form-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Authentication - Multi-steps-->
</template>

<script lang="ts">
import { getIllustrationsPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useCookies } from "@vueuse/integrations/useCookies";
import Step1 from "@/components/setup/steps/Step1.vue";
import Step2 from "@/components/setup/steps/Step2.vue";
import Step3 from "@/components/setup/steps/Step3.vue";
import Step4 from "@/components/setup/steps/Step4.vue";
import Step5 from "@/components/setup/steps/Step5.vue";
import Step6 from "@/components/setup/steps/Step6.vue";
import { StepperComponent } from "@/assets/ts/components";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import * as Yup from "yup";
import { useForm } from "vee-validate";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { Coordinates } from "@/types";
import Api from "@/utils/ApiHelper";
import store from "@/store";
import { Actions, Mutations } from "@/store/enums/StoreEnums";

const cookies = useCookies();
interface IStep1 {
  subDomain: string;
}

interface IStep2 {
  countryId: string;
  cityId: string;
  areaId: string;
  location: Coordinates;
}

interface IStep3 {
  languageIds: Array<string>;
  currencyIds: Array<string>;
}

interface IStep4 {
  logoKey: string;
}
interface IStep5 {
  categoryId: string;
  categoryTags: Array<string>;
}

interface SetupAccount extends IStep1, IStep2, IStep3, IStep4, IStep5 {}

export default defineComponent({
  components: {
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Step6,
  },
  setup() {
    const _stepperObj = ref<StepperComponent | null>(null);
    const wizardRef = ref<HTMLElement | null>(null);
    const currentStepIndex = ref(0);

    const formData = ref<SetupAccount>({
      subDomain: "",
      countryId: "",
      cityId: "",
      areaId: "",
      location: {
        lat: 0,
        lng: 0,
      },
      languageIds: [],
      currencyIds: [],
      logoKey: "",
      categoryId: "",
      categoryTags: [],
    });

    onMounted(() => {
      _stepperObj.value = StepperComponent.createInsance(
        wizardRef.value as HTMLElement
      );
      setCurrentPageBreadcrumbs("Vertical", ["Pages", "Wizards"]);
    });

    const setupAccountSchema = [
      Yup.object({
        subDomain: Yup.string().required().label("subDomain"),
      }),
      Yup.object({
        countryId: Yup.string().required().label("Country"),
        cityId: Yup.string().required().label("City"),
        areaId: Yup.string().required().label("Area"),
        location: Yup.object().required(),
      }),
      Yup.object({
        languageIds: Yup.array()
          .of(Yup.string())
          .min(1)
          .required()
          .label("Languages"),
        currencyIds: Yup.array()
          .of(Yup.string())
          .min(1)
          .required()
          .label("Currencies"),
      }),
      Yup.object({
        logoKey: Yup.mixed()
          .required("You need to provide a file")
          .test("fileSize", "The file is too large", (value) => {
            return !!value;
          })
          .test(
            "type",
            "Only the following formats are accepted: .png, .jpeg, .jpg",
            (value) => {
              return (
                value &&
                (value[0].type === "image/jpeg" ||
                  value[0].type === "image/bmp" ||
                  value[0].type === "image/png")
              );
            }
          ),
      }),
      Yup.object({
        categoryId: Yup.string().required().label("Categories"),
        categoryTags: Yup.array()
          .of(Yup.string())
          .min(1)
          .required()
          .label("Tags"),
      }),
    ];

    const currentSchema = computed(() => {
      return setupAccountSchema[currentStepIndex.value];
    });

    const { resetForm, handleSubmit } = useForm<
      IStep1 | IStep2 | IStep3 | IStep4 | IStep5
    >({
      validationSchema: currentSchema,
    });

    const totalSteps = computed(() => {
      if (!_stepperObj.value) return;

      return _stepperObj.value.totatStepsNumber;
    });

    resetForm({
      values: {
        ...formData.value,
      },
    });

    const handleStep = handleSubmit(
      async (values: any, { setErrors }: { setErrors: Function }) => {
        // validate according to the current step
        if (currentStepIndex.value === 0) {
          try {
            const payload = {
              method: "post",
              url:
                "/MarketCommands/check-subdomain?subdomain=" + values.subDomain,
            };
            const check = await Api(payload);
            if (!check?.data.succeeded) {
              setErrors({
                subdomain: check?.data.message,
              });
              return;
            }
          } catch (error) {
            setErrors({
              subdomain: error,
            });
          }
        }

        if (currentStepIndex.value === 2) {
          let choosenLangs = values.languageIds.map((langId) => {
            return store.getters.getLanguages.data.find((l) => l.id === langId);
          });
          store.dispatch(
            Actions.SET_CURRENT_LANGS,
            JSON.parse(JSON.stringify(choosenLangs))
          );
        }
        if (currentStepIndex.value === 3) {
          if (Object.keys(store.state.SetupModule.initResources).length === 0)
            return false;

          if (
            store.state.SetupModule.initResources.length !==
            store.state.SetupModule.currentSetupLangs.length
          )
            return false;
        }
        formData.value = {
          ...formData.value,
          ...values,
        };

        store.dispatch(Actions.SET_SETUP_DATA, values);
        currentStepIndex.value++;

        if (!_stepperObj.value) return;

        _stepperObj.value.goNext();
      }
    );

    const previousStep = () => {
      if (!_stepperObj.value) return;

      currentStepIndex.value--;

      _stepperObj.value.goPrev();
    };

    const formSubmit = async () => {
      try {
        await store.dispatch(Actions.SEND_SETUP_DATA);
        Swal.fire({
          text: "All is cool! Now you submit this form",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary",
          },
        }).then(() => {
          cookies.set("isMarketActive", true);
          window.location.href = "/";
        });
      } catch (error: any) {
        Swal.fire({
          text: error?.message,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Try again!",
          customClass: {
            confirmButton: "btn fw-bold btn-light-danger",
          },
        });
      }
      // Swal.fire({
      //   text: "All is cool! Now you submit this form",
      //   icon: "success",
      //   buttonsStyling: false,
      //   confirmButtonText: "Ok, got it!",
      //   customClass: {
      //     confirmButton: "btn fw-bold btn-light-primary",
      //   },
      // }).then(() => {
      //    window.location.reload();
      // });
    };

    return {
      wizardRef,
      previousStep,
      handleStep,
      formSubmit,
      totalSteps,
      currentStepIndex,
      getIllustrationsPath,
    };
  },
});
</script>
