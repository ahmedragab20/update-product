<template>
  <!--begin::Authentication - Multi-steps-->
  <div
    class="d-flex flex-column flex-lg-row flex-column-fluid stepper stepper-pills stepper-column"
    ref="shopsRef"
    id="kt_create_shop_stepper"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Aside-->
    <div
      class="d-flex flex-column flex-lg-row-auto zzbg-lighten shadow-sm"
    >
      <!--begin::Wrapper-->
      <div
        class="d-flex flex-column w-xl-400px"
      >
        <!--begin::Header-->
        <div
          class="d-flex flex-row-fluid flex-column flex-center p-10 pt-lg-20"
        >

          <!--begin::Nav-->
          <div class="stepper-nav">
            <!--begin::Step 1-->
            <div class="stepper-item" data-kt-stepper-element="nav">
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
                <h3 class="stepper-title">{{ $t("shopSettings") }}</h3>
                <div class="stepper-desc fw-bold">
                  {{ $t("shopSetup") }}
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
                <h3 class="stepper-title">{{ $t("langAndCurr") }}</h3>
                <div class="stepper-desc fw-bold">
                  {{ $t("shopLangAndCurrSettings") }}
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
                <h3 class="stepper-title">{{ $t("shopIdentity") }}</h3>
                <div class="stepper-desc fw-bold">
                  {{ $t("shopIdentitySettings") }}
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
                <h3 class="stepper-title">{{ $t("catAndTags") }}</h3>
                <div class="stepper-desc fw-bold">
                  {{ $t("catAndTagsSettings") }}
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
                <h3 class="stepper-title">{{ $t("completed") }}</h3>
                <div class="stepper-desc fw-bold">{{ $t("woah") }}</div>
              </div>
              <!--end::Label-->
            </div>
            <!--end::Step 5-->
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
        :validation-schema="shopsSchema"
        id="kt_create_account_form"
        @submit="handleStep"
      >
        

        <!--begin::Step 1-->
        <div  class="current" data-kt-stepper-element="content">
          <ShopSettings></ShopSettings>
        </div>
        <!--end::Step 1-->

        <!--begin::Step 2-->
        <div data-kt-stepper-element="content">
          <LangsAndCurr></LangsAndCurr>
        </div>
        <!--end::Step 2-->

        <!--begin::Step 3-->
        <div data-kt-stepper-element="content">
          
          <ShopIdentity></ShopIdentity>
        </div>
        <!--end::Step 3-->

        <!--begin::Step 4-->
        <div data-kt-stepper-element="content">
          <CategoriesAndTags></CategoriesAndTags>
        </div>
        <!--end::Step 4-->

        <!--begin::Step 5-->
        <div data-kt-stepper-element="content">
          <Completed></Completed>
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
              <span class="indicator-label" v-if="!isLoading">
                {{ $t("submit") }}
                <span class="svg-icon svg-icon-3 ms-2 me-0">
                  <inline-svg src="media/icons/duotune/arrows/arr064.svg" />
                </span>
              </span>
              <span  v-if="isLoading">
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
import { computed, defineComponent, defineEmits , onMounted, reactive, ref } from "vue";
import { useCookies } from "@vueuse/integrations/useCookies";
import ShopIdentity from "./AddShopSteps/ShopIdentity.vue";
import LangsAndCurr from "./AddShopSteps/LangsAndCurr.vue";
import ShopSettings from "./AddShopSteps/ShopSettings.vue";
import CategoriesAndTags from "./AddShopSteps/CategoriesAndTags.vue";
import Completed from "./AddShopSteps/Completed.vue";
import { StepperComponent } from "@/assets/ts/components/_StepperComponent";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { Coordinates } from "@/types";
import Api from "@/utils/ApiHelper";
import { hideModal } from "@/core/helpers/dom";
import store from "@/store";
import { Actions, Mutations } from "@/store/enums/StoreEnums";

const cookies = useCookies();

// define interfaces
interface ShopIdentity {
  countryId: string;
  cityId: string;
  areaId: string;
  location: Coordinates;
}

interface LangsAndCurr {
  languageIds: Array<string>;
  currencyIds: Array<string>;
  orderActionTemplateId:string;
}

interface ShopSettings {
  logoKey: String,
  resourses?: Array<{
    languageId: string,
    name: string,
    description: string,
    address: string
  }>
}
interface CategoriesAndTags {
  categoryId: string;
  categoryTags: Array<string>;
}

interface SetupAccount extends  ShopIdentity, LangsAndCurr, ShopSettings, CategoriesAndTags {}

// define Components
export default defineComponent({
  components: {
    ShopIdentity,
    LangsAndCurr,
    ShopSettings,
    CategoriesAndTags,
    Completed,
  },

  setup(props, {emit}) {
    // define refs
    const _stepperObj = ref<StepperComponent | null>(null);
    const shopsRef = ref<HTMLElement | null>(null);
    const currentStepIndex = ref(0);
    const isLoading = ref(false);
    const formData = ref<SetupAccount>({
      logoKey: "",
      orderActionTemplateId:'',
      countryId:'',
      cityId: "",
      areaId: "",
      location: {
        lat: 0,
        lng: 0,
      },
  
      languageIds: [],
      currencyIds: [],
    
      categoryId: "",
      categoryTags: [],
      
    });
    const initObj ={
      logoKey: "",
      orderActionTemplateId:'',
      countryId:'',
      cityId: "",
      areaId: "",
      location: {
        lat: 0,
        lng: 0,
      },
      languageIds: [],
      currencyIds: [],
      categoryId: "",
      categoryTags: [], 
    };
    
    onMounted(() => {
      _stepperObj.value = StepperComponent.createInsance(
        shopsRef.value as HTMLElement
      );

    });
    // shops schema
    const shopsSchema = [
      yup.object({
        logoKey: yup.mixed()
          .required("You need to provide a file")
          .test("fileSize", "The file is too large", (value) => {
            return !!value;
          })
          .test(
            "type",
            "Only the following formats are accepted: .png, .jpeg, .jpg",
            (value) => {
              console.log(value)
              return (
                value &&
                (value.type === "image/jpeg" ||
                  value.type === "image/bmp" ||
                  value.type === "image/png")
              );
            }
          ),
        
        resources: yup.array().of(
          yup.object().shape({
            name: yup.string().required("fieldRequired"),
            description: yup.string().required("fieldRequired"),
            address: yup.string().required("fieldRequired"),
            
          })
        ),
        
        
      }),
      yup.object({
        languageIds: yup.array()
          .of(yup.string())
          .required()
          .label("Languages")
          .min(1),
        currencyIds: yup.array()
          .of(yup.string())
          .required()
          .label("Currencies")
          .min(1),
        orderActionTemplateId: yup.string()
          .required()
          .label("orderActionTemplateId"),
      }),
      yup.object({
        countryId: yup.string().required().label("Country"),
        cityId: yup.string().required().label("City"),
        areaId: yup.string().required().label("Area"),
        location: yup.object().required(),
      }),
      yup.object({
        categoryId: yup.string().required().label("Categories"),
        categoryTags: yup.array()
          .of(yup.string())
          .min(1)
          .required()
          .label("Tags"),
      }),
      // yup.object({
      //   countryId: yup
      //     .array()
      //     .of(yup.string())
      //     .required("fieldRequired"),
      //   cityId: yup
      //     .array()
      //     .of(yup.string())
      //     .required("fieldRequired"),
      //   areaId: yup
      //     .array()
      //     .of(yup.string())
      //     .required("fieldRequired"),
      // }),
      
      // yup.object({
      //   categoryId: yup
      //     .array()
      //     .of(yup.string())
      //     .required("fieldRequired"),
      //   categoryTags: yup.array()
      //     .of(yup.string())
      //     .required("fieldRequired"),
      // })
      // Yup.object({
      //   countryId: Yup.string().required().label("Country"),
      //   cityId: Yup.string().required().label("City"),
      //   areaId: Yup.string().required().label("Area"),
      //   location: Yup.object().required(),
      //   name: Yup.object().required(),
      // }),
      // Yup.object({
      //   categoryId: Yup.string().required().label("Categories"),
      //   categoryTags: Yup.array()
      //     .of(Yup.string())
      //     .min(1)
      //     .required()
      //     .label("Tags"),
      // }),
    ];
        // set current schema
    const currentSchema = computed(() => {
      return shopsSchema[currentStepIndex.value];
    });

    const { resetForm, handleSubmit } = useForm<
      ShopSettings  | ShopIdentity  | LangsAndCurr  |  CategoriesAndTags
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
    /// start handle submit function
    const handleStep = handleSubmit(
      async (values: any, { setErrors }: { setErrors: Function }) => {
        // validate according to the current step
        console.log(' formData.value befaure', formData.value )
        console.log('   ...values,befaure',   ...values,)
        formData.value = {
          ...formData.value,
          ...values,
        };
    
        console.log(' formData.value ', formData.value )
        currentStepIndex.value++;

        if (!_stepperObj.value) return;

        _stepperObj.value.goNext();
      }
    );
    // get order action template from api
    store.dispatch(Actions.GET_ORDER_ACTION_TEMPLATE, {
      query: '',
      pageSize: 1000,
      pageNumber: 1,
    });
  
    // go to function
    const goto = () => {
      if (!_stepperObj.value) {
        return;
      }
      _stepperObj.value.goFirst();
      _stepperObj.value.destroy();
    };
    // previousStep function
    const previousStep = () => {
      if (!_stepperObj.value) return;

      currentStepIndex.value--;

      _stepperObj.value.goPrev();
    };
    // submit form and add new shop
    const formSubmit = async () => {
      try {
        isLoading.value = true;
        console.log(' formData.value ', formData.value )
        await store.dispatch(Actions.CREATE_SHOP,formData.value);
        Swal.fire({
          text: "you have successfuly added new shop",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary",
          },
        }).then(() => {
          isLoading.value = false;
          goto();
          currentStepIndex.value = 0;
          emit("shop-added");
          formData.value = initObj;
          //Object.assign(formData, initObj)
          console.log("reset form", formData.value)
          
         
          
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
    };

    return {
      isLoading,
      shopsRef,
      previousStep,
      handleStep,
      formSubmit,
      totalSteps,
      currentStepIndex,
      getIllustrationsPath,
   
      shopsSchema
    };
  },
});
</script>
