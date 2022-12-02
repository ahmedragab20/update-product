<script setup lang="ts">
  import * as Yup from "yup";
  import { ErrorMessage, Field, Form } from "vee-validate";
  import Swal from "sweetalert2";
  import { useSMSStore } from "~/stores/SMS";
  import { showModal } from "~/core/helpers/dom";
  import { useAuthenticationStore } from "~/stores/authentication";

  const SMS = useSMSStore();
  const auth = useAuthenticationStore();

  const { push } = useRouter();
  const confirmOTPModal = ref<null | HTMLElement>(null);
  const submitMobileButtonRef = ref<null | HTMLButtonElement>(null);

  const schema1 = Yup.object().shape({
    otp: Yup.string().required().label("OTP"),
  });

  const submit = async (values: any) => {
    if (!submitMobileButtonRef.value) return;

    // Disable button
    submitMobileButtonRef.value.disabled = true;
    // Activate indicator
    submitMobileButtonRef.value.setAttribute("data-kt-indicator", "on");

    await auth
      .register(values.otp)
      .then(() => {
        push("/");
      })
      .catch((error) => {
        Swal.fire({
          text: error.message,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Try again!",
          customClass: {
            confirmButton: "btn fw-bold btn-light-danger",
          },
        });
      });

    if (submitMobileButtonRef.value) {
      submitMobileButtonRef.value.disabled = false;

      submitMobileButtonRef.value?.removeAttribute("data-kt-indicator");
    }
  };

  SMS.$onAction(({ name, store, args, after }) => {
    after((result) => {
      if (name === "sendOTP" && result === true)
        showModal(confirmOTPModal.value as HTMLElement);
    });
  });
</script>

<template>
  <!--begin::Modal - Confirm OTP-->
  <div
    id="kt_modal_confirm_otp"
    ref="confirmOTPModal"
    class="modal fade"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal header-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header flex-stack">
          <!--begin::Title-->
          <h2>Confirm OTP</h2>
          <!--end::Title-->

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
        <!--begin::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body scroll-y pt-10 pb-15 px-lg-17">
          <!--begin::SMS-->
          <!--begin::Heading-->
          <h3 class="text-dark fw-bolder fs-3 mb-5">
            SMS: Verify Your Mobile Number
          </h3>
          <!--end::Heading-->

          <!--begin::Notice-->
          <div class="text-gray-400 fw-bold mb-10">
            Enter the 5 digits OTP you recieved on your mobile phone.
          </div>
          <!--end::Notice-->

          <!--begin::Form-->
          <Form class="form" :validation-schema="schema1" @submit="submit">
            <!--begin::Input group-->
            <div class="mb-10 fv-row">
              <Field
                type="text"
                class="form-control form-control-lg form-control-solid"
                placeholder="OTP"
                name="otp"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="otp" />
                </div>
              </div>
            </div>
            <!--end::Input group-->

            <!--begin::Actions-->
            <div class="d-flex flex-center">
              <button
                id="kt_modal_confirm_otp_cancel"
                class="btn btn-white me-3"
                type="reset"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>

              <button
                ref="submitMobileButtonRef"
                type="submit"
                data-kt-element="sms-submit"
                class="btn btn-primary"
              >
                <span class="indicator-label"> Submit </span>
                <span class="indicator-progress">
                  Please wait...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  />
                </span>
              </button>
            </div>
            <!--end::Actions-->
          </Form>
          <!--end::Form-->
          <!--end::SMS-->
        </div>
        <!--begin::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal header-->
  </div>
  <!--end::Modal - Confirm OTP-->
</template>
