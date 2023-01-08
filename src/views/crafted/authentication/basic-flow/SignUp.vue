<template>
  <!--begin::Wrapper-->
  <div class="bg-white rounded shadow-sm p-10 p-lg-15 mx-auto">
    <!--begin::Form-->
    <Form
      class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      novalidate="novalidate"
      @submit="onSubmitRegister"
      id="kt_login_signup_form"
      :validation-schema="registration"
    >
      <!--begin::Heading-->
      <div class="mb-10 text-center">
        <!--begin::Title-->
        <h1 class="text-dark mb-3">{{ $t("createAnAccount") }}</h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-400 fw-bold fs-4">
          {{ $t("alreadyHaveAnAccount") }}

          <router-link to="/sign-in" class="link-primary fw-bolder">
            {{ $t("signInHere") }}
          </router-link>
        </div>
        <!--end::Link-->
      </div>
      <!--end::Heading-->

      <!--begin::Action--
      <button type="button" class="btn btn-light-primary fw-bolder w-100 mb-10">
        <img
          alt="Logo"
          src="media/svg/brand-logos/google-icon.svg"
          class="h-20px me-3"
        />
        Sign in with Google
      </button>
      end::Action-->

      <!--begin::Input group-->
      <div class="row fv-row mb-7">
        <!--begin::Col-->
        <div class="col-xl-6">
          <label class="form-label fw-bolder text-dark fs-6">{{
              $t("firstName")
            }}</label>
          <Field
            class="form-control form-control-lg form-control-solid"
            type="text"
            placeholder=""
            name="first_name"
            autocomplete="off"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="first_name" />
            </div>
          </div>
        </div>
        <!--end::Col-->

        <!--begin::Col-->
        <div class="col-xl-6">
          <label class="form-label fw-bolder text-dark fs-6">{{
              $t("lastName")
            }}</label>
          <Field
            class="form-control form-control-lg form-control-solid"
            type="text"
            placeholder=""
            name="last_name"
            autocomplete="off"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="last_name" />
            </div>
          </div>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-7">
        <label class="form-label fw-bolder text-dark fs-6">{{
            $t("email")
          }}</label>
        <Field
          class="form-control form-control-lg form-control-solid"
          type="email"
          placeholder=""
          name="email"
          autocomplete="off"
          @blur="checkEmail"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <span v-if="emailError">
              {{ emailError }}
            </span>
            <ErrorMessage v-else name="email" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-7">
        <label class="form-label fw-bolder text-dark fs-6">{{
            $t("phone")
          }}</label>
        <div class="phone-number-input gap-3 d-flex">
          <div class="select-country-container">
            <Field v-slot="{ field }" name="countryId">
              <CountrySelector
                v-bind="field"
                @selectedCountry="setSelectedCountry"
              />
            </Field>
          </div>
          <div class="flex-1 fv-row mb-7">
            <Field
              class="form-control form-control-lg form-control-solid"
              type="phone"
              placeholder=""
              name="phone"
              autocomplete="off"
              @blur="checkPhone"
            />
          </div>
        </div>
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="country_code" />
          </div>
        </div>
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <span v-if="phoneError">
              {{ phoneError }}
            </span>
            <ErrorMessage v-else name="phone" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="mb-10 fv-row" data-kt-password-meter="true">
        <!--begin::Wrapper-->
        <div class="mb-1">
          <!--begin::Label-->
          <label class="form-label fw-bolder text-dark fs-6">
            {{ $t("password") }}
          </label>
          <!--end::Label-->

          <!--begin::Input wrapper-->
          <div class="position-relative mb-3">
            <Field
              class="form-control form-control-lg form-control-solid"
              type="password"
              placeholder=""
              name="password"
              autocomplete="off"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="password" />
              </div>
            </div>
          </div>
          <!--end::Input wrapper-->
          <!--begin::Meter-->
          <div
            class="d-flex align-items-center mb-3"
            data-kt-password-meter-control="highlight"
          >
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
            ></div>
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
            ></div>
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
            ></div>
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px"
            ></div>
          </div>
          <!--end::Meter-->
        </div>
        <!--end::Wrapper-->
        <!--begin::Hint-->
        <div class="text-muted">
          {{ $t("useSymbols") }}
        </div>
        <!--end::Hint-->
      </div>
      <!--end::Input group--->

      <!--begin::Input group-->
      <div class="fv-row mb-5">
        <label class="form-label fw-bolder text-dark fs-6">{{
            $t("passwordConfirmation")
          }}</label>
        <Field
          class="form-control form-control-lg form-control-solid"
          type="password"
          placeholder=""
          name="password_confirmation"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password_confirmation" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="text-center">
        <button
          id="kt_sign_up_submit"
          ref="submitButton"
          type="submit"
          class="btn btn-lg btn-primary"
        >
          <span class="indicator-label"> Submit </span>
          <span class="indicator-progress">
            {{ $t("pleaseWait") }}...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
      </div>
      <!--end::Actions-->
    </Form>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick, reactive } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as Yup from "yup";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Actions } from "@/store/enums/StoreEnums";
import { uuid } from "vue-uuid";
import { PasswordMeterComponent } from "@/assets/ts/components";
import { useField } from "vee-validate";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import CountrySelector from "@/components/forms/inputs/CountrySelector.vue";
import Api from "@/utils/ApiHelper";
import { Country } from "@/types";
import { useCookies } from "@vueuse/integrations/useCookies";

export default defineComponent({
  name: "sign-up",
  components: {
    Field,
    Form,
    ErrorMessage,
    CountrySelector
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const cookies = useCookies();

    let emailError = ref("");
    let phoneError = ref("");
    let countryCode = ref("");

    const submitButton = ref<HTMLButtonElement | null>(null);

    const registration = Yup.object().shape({
      first_name: Yup.string().required().label("Name"),
      last_name: Yup.string().required().label("Surname"),
      countryId: Yup.string().required().label("Country"),
      phone: Yup.string().required().label("Phone"),
      email: Yup.string().min(4).required().email().label("Email"),
      password: Yup.string().min(8).required().label("Password"),
      password_confirmation: Yup.string()
        .required()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .label("Password Confirmation")
    });

    onMounted(() => {
      nextTick(() => {
        PasswordMeterComponent.bootstrap();
      });
    });

    const setSelectedCountry = (country: Country): void => {
      countryCode.value = country?.code;
    };

    const checkEmail = async (e) => {
      emailError.value = "";
      const email = e.target.value;
      const payload = {
        method: "post",
        url: "/Autentication/is-valid-email",
        payload: { email }
      };

      const check = await Api(payload);
      if (!check?.data.succeeded) {
        emailError.value = check?.data.message;
        return;
      }
    };

    const checkPhone = async (e) => {
      phoneError.value = "";
      const phone = e.target.value;
      const payload = {
        method: "post",
        url: "/Autentication/is-valid-phone",
        payload: {
          phoneNumber: phone,
          phoneCountryCode: countryCode.value
        }
      };

      const check = await Api(payload);
      if (!check?.data.succeeded) {
        phoneError.value = check?.data.message;
        return;
      }
    };

    const onSubmitRegister = async (values) => {
      // Clear existing errors
      if (!!phoneError.value || !!emailError.value) {
        return false;
      }
      const deviceId = localStorage.getItem("deviceId") ?? uuid.v4();

      const payload = {
        ...values,
        phoneCountryCode: countryCode.value,
        otp: "0000",
        deviceId
      };

      await store.dispatch(Actions.LOGOUT);

      // eslint-disable-next-line
      submitButton.value!.disabled = true;

      // Activate indicator
      submitButton.value?.setAttribute("data-kt-indicator", "on");

      // Send login request
      await store.dispatch(Actions.REGISTER, payload);

      try {
        await store.dispatch(Actions.REGISTER, payload);
        Swal.fire({
          text: "You have successfully logged in!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary"
          }
        }).then(function() {
          if (store.getters.isUserAuthenticated) {
            store.dispatch(Actions.SETTINGS);
            store.dispatch(Actions.USER);
            store.dispatch(Actions.MARKET);
          }

          if (store.state.ResponseHeaders["x-is-market-active"] === "False") {
            cookies.set("isMarketActive", false);
            router.push({ name: "setup" });
            return;
          }
          cookies.set("isMarketActive", true);
          router.push({ name: "Dashboard" });
        });
      } catch (error: any) {
        Swal.fire({
          text: error[0],
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Try again!",
          customClass: {
            confirmButton: "btn fw-bold btn-light-danger"
          }
        });
      }

      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    };

    return {
      registration,
      onSubmitRegister,
      submitButton,
      checkEmail,
      checkPhone,
      emailError,
      phoneError,
      setSelectedCountry,
      countryCode
    };
  }
});
</script>
