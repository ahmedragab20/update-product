<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-15">
      <!--begin::Title-->
      <h2 class="fw-bolder d-flex align-items-center text-dark">
        {{ $t("setupSettings") }}
        <i
          class="fas fa-exclamation-circle ms-2 fs-7"
          data-bs-toggle="tooltip"
          title="Billing is issued based on your selected account type"
        ></i>
      </h2>
      <!--end::Title-->

      <!--begin::Notice-->
      <div class="text-gray-400 fw-bold fs-6">
        If you need more info, please check out
        <a href="#" class="link-primary fw-bolder">Help Page</a>.
      </div>
      <!--end::Notice-->
    </div>
    <!--end::Heading-->

    <!--begin::Input group-->
    <div class="mb-10 fv-row">
      <!--begin::Label-->

      <label class="form-label required mb-3">{{ $t("subdomain") }}</label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        type="text"
        class="form-control form-control-lg form-control-solid"
        name="subDomain"
        placeholder=""
        value=""
      />
      <ErrorMessage
        name="subDomain"
        class="fv-plugins-message-container invalid-feedback"
      />
      <!--end::Input-->
    </div>
    <!--end::Input group-->

    <!--begin::Input group-->
    <div class="mb-10 fv-row">
      <!--begin::Label-->
      <label class="form-label mb-3">{{ $t("domain") }}</label>
      <!--end::Label-->

      <!--begin::Input-->
      <input
        type="text"
        class="form-control form-control-lg form-control-solid"
        placeholder=""
        value="example.com"
        :disabled="true"
      />
      <!--end::Input-->
    </div>
    <!--end::Input group-->
  </div>
  <!--end::Wrapper-->
</template>

<script setup lang="ts">
import { Field, ErrorMessage } from "vee-validate";
</script>
