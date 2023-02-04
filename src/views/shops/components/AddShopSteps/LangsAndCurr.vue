<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-12">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">{{ $t("langAndCurr") }}</h2>
      <!--end::Title-->
    </div>
    <!--end::Heading-->
    

    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <!--begin::Label-->
      <label class="form-label required">{{ $t("languages") }}</label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        v-slot="{ field }"
        name="languageIds"
        class="form-control form-control-lg form-control-solid"
      >
        <Multiselect
          v-bind="field"
          label="label"
          value-prop="id"
          :classes="{
            container:
              'multiselect-tags-lg form-control form-control-lg form-control-solid',
            search: 'multiselect-search form-control form-control-solid',
            clear: 'multiselect-lg-clear',
            tagsSearch:
              'multiselect-tags-search form-control form-control-solid',
          }"
          :options="languages"
          mode="tags"
        />
      </Field>
      <label class="col-form-label text-gray-400 fw-normal d-block pt-0">
        {{ $t("pleaseEnterLang") }}
      </label>
      <ErrorMessage
        name="languageIds"
        class="fv-plugins-message-container invalid-feedback"
      />
      <!--end::Input-->
    </div>
    {{ lookupQueries.languages.data }}
    <!--end::Input group-->

    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <!--begin::Label-->
      <label class="form-label required">{{ $t("currencies") }}</label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        v-slot="{ field ,meta}"
        name="currencyIds"
        class="form-control form-control-lg form-control-solid"
      >
        <Multiselect
          v-bind="field"
          label="label"
          value-prop="id"
          :class="{
            'is-valid': meta.valid,
            'is-invalid': meta.validated && !meta.valid,
          }"
          :classes="{
            container:
              'multiselect-tags-lg form-control form-control-lg form-control-solid',
            search: 'multiselect-search form-control form-control-solid',
            clear: 'multiselect-lg-clear',
            tagsSearch:
              'multiselect-tags-search form-control form-control-solid',
          }"
          :options="currencies"
          mode="tags"
        />
      </Field>
      <label class="col-form-label text-gray-400 fw-normal d-block pt-0">
        {{ $t("pleaseEnterCurr") }}
      </label>
      <ErrorMessage
        name="currencyIds"
        class="text-danger d-block"
      />
      <!--end::Input-->
    </div>
    <!--end::Input group-->
       <!--begin::Input group-->
       <div class="fv-row mb-10">
      <!--begin::Label-->
      <label class="form-label required">{{ $t("orderActionTemplateId") }}</label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        v-slot="{ field}"
        name="orderActionTemplateId"
        class="form-control form-control-lg form-control-solid"
      >
        <Multiselect
          v-bind="field"
          
          label="name"
          value-prop="id"
          :classes="{
            container:
              'multiselect-tags-lg form-control form-control-lg form-control-solid',
            search: 'multiselect-search form-control form-control-solid',
            clear: 'multiselect-lg-clear',
            tagsSearch:
              'multiselect-tags-search form-control form-control-solid',
          }"
          :options="orderActionTemplate"
        
        />
      </Field>
      <label class="col-form-label text-gray-400 fw-normal d-block pt-0">
        {{ $t("pleaseEnterOrder") }}
      </label>
      <ErrorMessage
        name="orderActionTemplateId"
        class="fv-plugins-message-container invalid-feedback"
      />
      <!--end::Input-->
    </div>
    <!--end::Input group-->
  </div>
  <!--end::Wrapper-->
</template>

<script setup lang="ts">
import Multiselect from "@vueform/multiselect";
import { ErrorMessage, Field } from "vee-validate";
import type { Currency, Language } from "@/types";
import store from "@/store";
import { onMounted, ref,computed } from "vue";

const lookupQueries = store.state.LookupQueries;

// const languages = ref<Language[] | null>();
// const currencies = ref<Currency[] | null>();
const orderActionTemplate = computed(() => {
  return store.state.Order.OrderAction;
});
const languages = computed(() => {
  return store.state.LookupQueries.languages.data;
});
const currencies = computed(() => {
  return store.state.LookupQueries.currencies.data;
});
onMounted(() => {
  // languages.value = lookupQueries.languages.data;
  // currencies.value = lookupQueries.currencies.data;


});
</script>

<style lang="scss">
.multiselect-tags-lg {
  position: relative;
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  padding: 0 10px 0 10px !important;
}
.multiselect-dropdown-lg {
  width: 200px;
}
.multiselect-lg-clear {
  position: absolute;
  z-index: 10;
  opacity: 1;
  transition: 0.3s;
  right: 0;
  width: 25px;
  top: 55%;
  transform: translateY(-50%);
}
.multiselect-tags-search {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  padding: 0;
  font-size: inherit;
  font-family: inherit;
  box-sizing: border-box;
  width: 100%;
  appearance: none;
  background-color: transparent !important;
}
</style>
