<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-12">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">
        {{ $t("catAndTags") }}
      </h2>
   

    </div>
    <!--end::Heading-->

    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <!--begin::Label-->
      <label class="form-label required"> {{ $t("categories") }}</label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        v-slot="{ field }"
        name="categoryId"
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
          :options="categories"
          @input="onCategoryChange"
        />
      </Field>
      <label class="col-form-label text-gray-400 fw-normal d-block pt-0">
        {{ $t("pleaseEnterCat") }}
      </label>
      <ErrorMessage
        name="categoryId"
        class="fv-plugins-message-container invalid-feedback"
      />
      <!--end::Input-->
    </div>
    <!--end::Input group-->
    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <!--begin::Label-->
      <label class="form-label required">{{ $t("tags") }}</label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        v-slot="{ field }"
        name="categoryTags"
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
          :options="tags"
          mode="tags"
        />
      </Field>
      <label class="col-form-label text-gray-400 fw-normal d-block pt-0">
        {{ $t("pleaseEnterTag") }}
      </label>
      <ErrorMessage
        name="categoryTags"
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

import store from "@/store";
import { computed, ref } from "vue";

interface Categories {
  id: string;
  name: string;
  tags: Array<Tags>;
}
interface Tags {
  id: string;
  name: string;
}

const lookupQueries = store.state.LookupQueries;
const categories = computed(() => {
  return store.getters.getShopCategories.data 
});

const tags = ref<Tags[] | null>();

const onCategoryChange = (catId: string) => {
  console.log(categories)
  let tag = categories?.value?.find((x) => x.id === catId);
  tags.value = tag?.tags;
};

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
