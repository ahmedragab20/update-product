<template>
  <!--begin::Stepper-->
  <div
    class="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid"
    id="kt_create_account_stepper"
    ref="verticalWizardRef"
  >
    <!--begin::Aside-->
    <div
      class="d-flex justify-content-center bg-white rounded justify-content-xl-start flex-row-auto w-100 w-xl-300px w-xxl-400px me-9"
    >
      <!--begin::Wrapper-->
      <div class="px-6 px-lg-10 px-xxl-15 py-20">
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
              <h3 class="stepper-title">Website Settings</h3>

              <div class="stepper-desc fw-bold">
                Setup Your Website Settings
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
              <h3 class="stepper-title">Market Settings</h3>
              <div class="stepper-desc fw-bold">Setup Your Market Settings</div>
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
              <h3 class="stepper-title">Languages and currencies</h3>
              <div class="stepper-desc fw-bold">
                Market languages and currencies settings
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
              <h3 class="stepper-title">Market Identity</h3>
              <div class="stepper-desc fw-bold">Set Your Market Identity</div>
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
              <h3 class="stepper-title">Categories & Tags</h3>
              <div class="stepper-desc fw-bold">
                Set Your Categories and Tags
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
              <h3 class="stepper-title">Completed</h3>
              <div class="stepper-desc fw-bold">Woah, we are here</div>
            </div>
            <!--end::Label-->
          </div>
          <!--end::Step 6-->
        </div>
        <!--end::Nav-->
      </div>
      <!--end::Wrapper-->
    </div>
    <!--begin::Aside-->

    <!--begin::Content-->
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
              Back
            </button>
          </div>
          <!--end::Wrapper-->

          <!--begin::Wrapper-->
          <div>
            <button
              type="button"
              class="btn btn-lg btn-primary me-3"
              data-kt-stepper-action="submit"
              v-if="currentStepIndex === totalSteps - 1"
              @click="formSubmit()"
            >
              <span class="indicator-label">
                Submit
                <span class="svg-icon svg-icon-3 ms-2 me-0">
                  <inline-svg src="media/icons/duotune/arrows/arr064.svg" />
                </span>
              </span>
              <span class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>

            <button v-else type="submit" class="btn btn-lg btn-primary">
              Continue
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
    <!--end::Content-->
  </div>
  <!--end::Stepper-->
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
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
  name: "set-up",
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
    const verticalWizardRef = ref<HTMLElement | null>(null);
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
        verticalWizardRef.value as HTMLElement
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
            "Only the following formats are accepted: .jpeg, .jpg",
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
      async (
        values: any,
        {
          setErrors,
          setFieldValue,
        }: { setErrors: Function; setFieldValue: Function }
      ) => {
        // validate according to the current step

        if (currentStepIndex.value === 0) {
          try {
            const payload = {
              method: "post",
              url:
                "/MarketCommands/check-subdomain?subdomain=" + values.subdomain,
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
          const data = { ...values };
          const logoKey = data.logoKey;
          console.log(logoKey.length);

          if (logoKey.length === 0) {
            setErrors({
              logoKey: "please upload logo",
            });
          }

          // for (const [key, value] of Object.entries(data)) {
          //   if (!(key.includes("name-") || key.includes("description-"))) {
          //     delete data[key];
          //   }
          // }
          // const mySet1 = new Set();
          // Object.keys(data).forEach((e) => {
          //   const id = e.split("-")[1];
          //   mySet1.add(id);
          // });
          // const arr = [{}];
          // mySet1.forEach((s) => {
          //   const obj = {};
          //   Object.keys(data).forEach((n) => {
          //     delete values[n];
          //     if (n.split("-")[1] === s) {
          //       obj["languageId"] = s;
          //       obj[n.split("-")[0]] = data[n];
          //     }
          //   });
          //   arr.push(obj);
          // });
          // var newArray = arr.filter((value) => Object.keys(value).length !== 0);
          // const finalData = { ...values, resources: newArray };
          // values = finalData;
        }

        formData.value = {
          ...formData.value,
          ...values,
        };

        store.dispatch(Actions.SET_SETUP_DATA, values);
        currentStepIndex.value++;

        if (!_stepperObj.value) return;

        _stepperObj.value.goNext();
        console.log({ values });
      }
    );

    const previousStep = () => {
      if (!_stepperObj.value) return;

      currentStepIndex.value--;

      _stepperObj.value.goPrev();
    };

    const formSubmit = () => {
      Swal.fire({
        text: "All is cool! Now you submit this form",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        customClass: {
          confirmButton: "btn fw-bold btn-light-primary",
        },
      }).then(() => {
        // window.location.reload();
      });
    };

    return {
      verticalWizardRef,
      previousStep,
      handleStep,
      formSubmit,
      totalSteps,
      currentStepIndex,
    };
  },
});
</script>
