<template>
  <!--begin::Wrapper-->
  <div class="w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto">
    <!--begin::Form-->
    <Form
      class="form w-100"
      id="kt_login_signin_form"
      @submit="onSubmitLogin"
      :validation-schema="login"
    >
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Title-->
        <h1 class="text-dark mb-3">{{ $t("signIn") }}</h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-400 fw-bold fs-4">
          {{ $t("newHere") }}

          <router-link to="/sign-up" class="link-primary fw-bolder">
            {{ $t("createAnAccount") }}
          </router-link>
        </div>
        <!--end::Link-->
      </div>
      <!--begin::Heading-->

      <!-- <div class="mb-10 bg-light-info p-8 rounded">
        <div class="text-info">
          Use account <strong>admin@demo.com</strong> and password
          <strong>demo</strong> to continue.
        </div>
      </div> -->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="form-label fs-6 fw-bolder text-dark">{{
          $t("email")
        }}</label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          class="form-control form-control-lg form-control-solid"
          type="text"
          name="email"
          autocomplete="off"
          value="mutasem@mail.com"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Wrapper-->
        <div class="d-flex flex-stack mb-2">
          <!--begin::Label-->
          <label class="form-label fw-bolder text-dark fs-6 mb-0">{{
            $t("password")
          }}</label>
          <!--end::Label-->

          <!--begin::Link-->
          <!-- <router-link to="/password-reset" class="link-primary fs-6 fw-bolder">
            Forgot Password ?
          </router-link> -->
          <!--end::Link-->
        </div>
        <!--end::Wrapper-->

        <!--begin::Input-->
        <Field
          class="form-control form-control-lg form-control-solid"
          type="password"
          name="password"
          autocomplete="off"
          value="1234"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="text-center">
        <div class="mb-3">
          <span
            class="badge badge-lg badge-light-danger"
            v-if="!!errorMessage"
            v-text="errorMessage"
          />
        </div>
        <!--begin::Submit button-->
        <button
          type="submit"
          ref="submitButton"
          id="kt_sign_in_submit"
          class="btn btn-lg btn-primary w-100 mb-5"
        >
          <span class="indicator-label"> {{ $t("continue") }} </span>

          <span class="indicator-progress">
            {{ $t("pleaseWait") }}...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
        <!--end::Submit button-->
      </div>
      <!--end::Actions-->
    </Form>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { uuid } from "vue-uuid";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import * as Yup from "yup";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "sign-in",
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const errorMessage = ref<string>("");

    const submitButton = ref<HTMLButtonElement | null>(null);
    //Create form validation object
    const login = Yup.object().shape({
      email: Yup.string().email().required().label("Email"),
      password: Yup.string().min(4).required().label("Password"),
    });

    //Form submit function
    const onSubmitLogin = async (values: any) => {
      if (submitButton.value) {
        submitButton.value!.disabled = true;
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");
      }

      const deviceId = localStorage.getItem("deviceId") ?? uuid.v4();
      const payload = {
        ...values,
        deviceId,
      };

      try {
        await store
          .dispatch(Actions.LOGIN, payload)
          .then((res) => {
            if (res) {
              errorMessage.value = "";
              store.dispatch(Actions.SETTINGS);
              store.dispatch(Actions.USER);
              store.dispatch(Actions.MARKET);
              router.push("/dashboard");
            } else {
              errorMessage.value = `Your email or password isn't correct! 🤷🏻‍♂️`;
            }
          })
          .catch((e) => {
            errorMessage.value = `Your email or password isn't correct! 🤷🏻‍♂️`;
          });
      } catch (error) {
        console.log(error);
      } finally {
        //Deactivate indicator
        submitButton.value?.removeAttribute("data-kt-indicator");
        // eslint-disable-next-line
        submitButton.value!.disabled = false;
      }
    };

    return {
      onSubmitLogin,
      login,
      submitButton,
      errorMessage,
    };
  },
});
</script>
