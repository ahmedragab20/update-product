<template>
  <div class="form-tags-modal">
    <div
      class="modal fade"
      id="kt_modal_add_categories"
      ref="addSubCategoriesModalRef"
      tabindex="-1"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered mw-800px">
        <div class="modal-content rounded">
          <div class="modal-header p-6 border justify-content-between">
            <h2 class="modal-title px-10 border-">
              {{ $t("addProductCategory") }}
            </h2>

            <div
              class="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal">
              <span class="svg-icon svg-icon-1">
                <inline-svg src="/media/icons/duotune/arrows/arr061.svg" />
              </span>
            </div>
          </div>
          <!--begin::Modal body-->

          <div class="modal-body scroll-y px-10 px-lg-15 pt-10 pb-10">
            <div class="inputs_fields my-3">
              <Form
                class="form w-100"
                @submit="submit"
                :validation-schema="GategoriesForm">
                <!--begin:: Resources-->
                <div class="col-12 my-3">
                  <tabs-duplicator
                    :items="langs"
                    @selectedItem="setSelectedItem">
                    <template #label="{ item }">
                      {{ item.label }}
                    </template>
                  </tabs-duplicator>
                  <div class="fields">
                    <div>
                      <div class="inputs_fields my-3">
                        <div v-for="(item, i) in form.resources" :key="i">
                          <div v-show="item.languageId == selectedItem.id">
                            <label
                              class="required fs-5 fw-bold mb-2 d-inline"
                              >{{ $t("productCategorName") }}</label
                            >
                            <Field
                              v-model="item.name"
                              :value="item.name"
                              :name="`resources[${i}].name`"
                              type="text"
                              v-slot="{ field, meta }">
                              <input
                                v-bind="field"
                                type="text"
                                class="form-control form-control-solid form-control-lg"
                                :class="{
                                  'is-valid': meta.valid,
                                  'is-invalid': meta.validated && !meta.valid,
                                }" />
                            </Field>
                            <ErrorMessage
                              :name="`resources[${i}].name`"
                              class="text-danger">
                              <span class="text-danger">
                                {{ $t("resourcesValidation") }}</span
                              >
                            </ErrorMessage>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!--end::Input-->

                <!--begin::connected stores -->
                <div class="row mb-10">
                  <div class="col-md-6 fv-row">
                    <div class="d-flex flex-stack mb-2">
                      <!--begin::Label-->
                      <label class="required fs-5 fw-bold mb-2 d-inline">
                        {{ $t("connectedShops") }}</label
                      >
                    </div>
                    <!-- {{ marketShops }} -->

                    <Field
                      v-slot="{ field }"
                      type="text"
                      class="form-control form-control-lg form-control-solid"
                      name="connectedShops">
                      <Multiselect
                        mode="tags"
                        v-model="ProductCategories.connectedShops"
                        v-bind="field"
                        :searchable="true"
                        label="name"
                        value-prop="id"
                        :classes="{
                          container:
                            'multiselect-lg form-control form-control-lg form-control-solid',
                          search:
                            'multiselect-search form-control form-control-solid',
                          clear: 'multiselect-lg-clear',
                        }"
                        :options="marketShops" />
                    </Field>
                    <ErrorMessage
                      name="connectedShops"
                      class="fv-plugins-message-container invalid-feedback" />
                  </div>
                  <div class="col-md-6 fv-row">
                    <div class="d-flex flex-stack mb-2">
                      <!--begin::Label-->
                      <label class="required fs-5 fw-bold mb-2 d-inline">
                        {{ $t("categoryParent") }}</label
                      >
                    </div>
                    <!-- {{ marketShops }} -->
                    <el-select
                      v-model="ProductCategories.parentId"
                      class="w-100 form-control-solid border-0 p-2"
                      name="GategoriesList"
                      style="margin-top: -8px"
                      clearable>
                      <el-option
                        v-for="item in GategoriesList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="GategoriesList" />
                      </div>
                    </div>
                  </div>
                </div>
                <!--end::connected stores-->

                <!--end::Input Order-->
                <div class="row mb-10">
                  <div class="col-md-6 fv-row">
                    <div class="d-flex flex-stack mb-2">
                      <label class="required fs-5 fw-bold mb-2 d-inline">{{
                        $t("code")
                      }}</label>
                    </div>
                    <Field
                      class="form-control form-control-lg form-control-solid"
                      type="text"
                      name="code"
                      autocomplete="off"
                      v-model="ProductCategories.code"
                      v-slot="{ field, meta }">
                      <div class="inputcontainer">
                        <input
                          v-bind="field"
                          class="form-control form-control-solid form-control-lg"
                          :class="{
                            'is-invalid': meta.validated && !meta.valid,
                          }"
                          @blur="checkValueCode($event)" />
                        <div class="icon-container" v-if="codeLoading">
                          <i class="loader"></i>
                        </div>
                      </div>
                    </Field>

                    <span v-if="!isValidCode" class="text-danger">{{
                      validMessageCode
                    }}</span>
                    <ErrorMessage
                      class="text-danger"
                      name="code"></ErrorMessage>
                  </div>
                  <!--end::Input Code-->

                  <!--begin::Input slug-->
                  <div class="col-md-6 fv-row">
                    <div class="d-flex flex-stack mb-2">
                      <label class="required fs-5 fw-bold mb-2 d-inline">{{
                        $t("slug")
                      }}</label>
                    </div>

                    <Field
                      v-model="ProductCategories.slug"
                      name="slug"
                      type="text"
                      v-slot="{ field, meta }">
                      <div class="inputcontainer">
                        <input
                          v-bind="field"
                          class="form-control form-control-solid form-control-lg"
                          :class="{
                            'is-invalid': meta.validated && !meta.valid,
                          }"
                          @blur="checkValueSlug($event)" />
                        <div class="icon-container" v-if="slugLoading">
                          <i class="loader"></i>
                        </div>
                      </div>
                    </Field>

                    <span v-if="!isValidSlug" class="text-danger">{{
                      validMessageSlug
                    }}</span>

                    <ErrorMessage
                      class="text-danger"
                      name="slug"></ErrorMessage>
                  </div>
                </div>
                <div class="row mb-10">
                  <!--end::Input Code-->

                  <!--begin::Input Order-->
                  <div class="col-6">
                    <!--begin::Image input-->
                    <label class="required fs-5 fw-bold mb-2 d-block">
                      {{ $t("categoryLogo") }}
                    </label>
                    <!--begin::Image input-->
                   
                    <Field
                      type="file"
                      v-slot="{ field }"
                      class="form-control form-control-lg form-control-solid"
                      name="logoKey"
                      placeholder=""
                      value="">
                      <div
                        v-bind="field"
                        class="image-input image-input-outline"
                        data-kt-image-input="true"
                        :style="`background-image: url(/media/avatars/blank.png)`">
                        <!--begin::Preview existing logo-->
                        <img
                          class="image-input-wrapper w-125px h-125px"
                          :src="imageUrl" />
                        <!--end::Preview existing logo-->

                        <!--begin::Label-->
                        <label
                          class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                          data-kt-image-input-action="change"
                          data-bs-toggle="tooltip"
                          title="Change avatar">
                          <i class="bi bi-pencil-fill fs-7" />

                          <!--begin::Inputs-->
                          <input
                            type="file"
                            name="logo"
                            accept=".png, .jpg, .jpeg"
                            @change="handleSubmit" />
                          <input type="hidden" name="logo_remove" />
                          <!--end::Inputs-->
                        </label>
                        <!--end::Label-->

                        <!--begin::Remove-->
                        <span
                          class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                          data-kt-image-input-action="remove"
                          data-bs-toggle="tooltip"
                          title="Remove logo"
                          @click="removeImage()">
                          <i class="bi bi-x fs-2" />
                        </span>
                        <!--end::Remove-->
                      </div>
                      <!--end::Image input-->

                      <!--begin::Hint-->

                      <!--end::Hint-->
                    </Field>
                    <ErrorMessage
                      name="logoKey"
                      class="fv-plugins-message-container invalid-feedback" />

                    <!--end::Col-->
                    <!--end::Image input-->
                  </div>
                </div>

                <div class="row mb-10">
                  <div class="d-flex justify-content-start align-items-center">
                    <!--begin::Input isPublished On JetOrder-->
                    <div class="form-check form-check-solid">
                      <input
                        id="isPublished"
                        class="form-check-input"
                        v-model="ProductCategories.isPublishedOnJetOrder"
                        type="checkbox"
                        checked=""
                        data-kt-check="false" /><label
                        class="form-check-label ps-2" for="isPublished">
                        {{ $t("isPublishedOnJetOrderApp") }}
                      </label>
                    </div>
                    <!--end::Input  isPublished On JetOrder-->

                    <!--begin::Input isPublished On ShopLink-->
                    <div class="form-check form-check-solid mx-5">
                      <input
                        class="form-check-input"
                        id="isPublishedOnShopLink"
                        v-model="ProductCategories.isPublishedOnShopLink"
                        type="checkbox"
                        checked=""
                        data-kt-check="false" /><label
                        class="form-check-label ps-2"
                        for="isPublishedOnShopLink">
                        {{ $t("isPublishedOnShopLink") }}
                      </label>
                    </div>
                    <!--end::Input  isPublished On ShopLink-->
                  </div>
                </div>

                <!--begin::Array Categorie Group Items-->

                <!--end::Array Categorie Group Items-->
                <div class="modal-footer">
                  <div
                    class="w-100 d-flex justify-content-between align-items-center">
                    <!--begin::group button-->
                    <button
                      type="button"
                      class="btn btn-lg btn-secondary"
                      data-bs-dismiss="modal">
                      {{ $t("close") }}
                    </button>
                    <button
                      type="submit"
                      ref="submitButton"
                      class="btn btn-lg btn-primary addproduct">
                      <span v-if="!isLoading">
                        {{ $t("addCategory") }} <span class="fas fa-plus"></span>
                      </span>
                      <span v-if="isLoading" class="indicator-progress d-block">
                        {{ $t("wait") }}
                        <span class="spinner-border spinner-border-sm align-middle ms-2" />
                      </span>
                      
                    </button>
                    <!--end::group button-->
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.form-tags-modal {
  .modal.fade {
    select.form-select {
      outline: none;
    }
  }
}
</style>

<script lang="ts" setup>
import { defineProps, computed, reactive, ref, onMounted } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { ErrorMessage, Field, Form } from "vee-validate";
import Multiselect from "@vueform/multiselect";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { upload } from "@/composables/uploader";

import * as yup from "yup";
import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";

import i18n from "@/core/plugins/i18n";

const store = useStore();

const slugLoading = ref<boolean>(false);
const codeLoading = ref<boolean>(false);

const marketShops = computed(() => store.getters.getMarketData.shops);
const GategoriesList = computed(
  () => store.state.ProductCategories.GategoriesList
);
// Validation Code and Slug
const validMessageSlug = computed(() => {
  return store.state.ProductCategories.messageIsValidSlug;
});
const validMessageCode = computed(() => {
  return store.state.ProductCategories.messageIsValidCode;
});
// const isValidSlug = computed(() => {
//   return store.state.ProductCategories.isValidSlug;
// });
// const isValidCode = computed(() => {
//   return store.state.ProductCategories.isValidCode;
// });
const isValidCode = ref(true);
const isValidSlug = ref(true);
const isLoading = ref(false);
function checkValueCode(e) {
  if (e.target.value.length > 3) {
    codeLoading.value = true;
    store
      .dispatch(Actions.IS_VALID_CODE_PRODUCT_CATEGORY, {
        id: 0,
        code: e.target.value,
      })
      .then((res) => {
        codeLoading.value = false;
        isValidCode.value = res;
      });
  }
}
const checkValueSlug = (e) => {
  if (e.target.value.length > 3) {
    slugLoading.value = true;
    store
      .dispatch(Actions.IS_VALID_SLUG_PRODUCT_CATEGORIES, {
        id: 0,
        slug: e.target.value,
      })
      .then((res) => {
        slugLoading.value = false;
        isValidSlug.value = res;
      });
  }
};

const imageUrl = ref("/media/svg/files/blank-image.svg");

// Handle Image
const removeImage = () => {
  imageUrl.value = "/media/avatars/blank.png";
};

const handleSubmit = async (event: any) => {
  
  imageUrl.value = URL.createObjectURL(event.target.files[0]);
  upload(event).then(res => {
    form.thumbnail = res.data.data
    
  })
};

// initial Langs

const langs = computed(() => store.getters.getSupportedLanguages);
const getlang = () => {
  let resource: { name: string; languageId: string }[] = [];
  langs.value.forEach((el: { id: any }) => {
    resource.push({ languageId: el.id, name: "" });
  });
  return resource;
};

const props = defineProps({
  id: Number,
});
// init form

const ProductCategories = reactive({
  resources: [],
  code: "",
  slug: "",
  parentId: null,
  thumbnail: "",
  order: 0,
  connectedShops: [],

  isPublishedOnJetOrder: true,
  isPublishedOnShopLink: true,
});

const selectedItem = ref("");
function initResources() {
  langs.value.forEach((element) => {
    form.resources.push({
      languageId: element.id,
      name: "",
    });
  });
}
onMounted(async () => {
  if (langs.value && langs.value.length > 0) {
    initResources();
    selectedItem.value = langs.value[0];
  }
});

const addSubCategoriesModalRef = ref<null | HTMLElement>(null);

const form = reactive(ProductCategories);

const setSelectedItem = (payload: any) => {
  selectedItem.value = payload;
};

const submitButton = ref<HTMLButtonElement | null>(null);

//Create form validation object
const GategoriesForm = yup.object({
  code: yup
    .string()
    .min(4, i18n.global.t("codeNotValid")),
    //.required(i18n.global.t("fieldRequired")),
  slug: yup
    .string()
    .min(4, i18n.global.t("slugNotValid")),
    //.required(i18n.global.t("fieldRequired")),
  connectedShops: yup
    .array()
    .of(yup.number())
    .required(i18n.global.t("fieldRequired")),
  resources: yup.array().of(
    yup.object().shape({
      name: yup.string().required(i18n.global.t("fieldRequired")),
      languageId: yup.string(),
    })
  ),
});

//Form submit function
function submit(values, { resetForm }) {
  if (isValidSlug.value && isValidCode.value) {
    console.log("ProductCategories", ProductCategories);
    isLoading.value = true;
    store.dispatch(Actions.ADD_CATEGORIES, ProductCategories).then(() => {
      resetForm();
      isLoading.value = false;
      hideModal(addSubCategoriesModalRef.value);
      ProductCategories.connectedShops = [];
    });
  }
}
</script>
<style scoped>
.row.col-md-12 {
  margin-left: -60%;
}
.menu-item.px-3 {
  margin-bottom: 12px;
}
.loader {
  position: relative;
  height: 30px;
  width: 30px;
  display: inline-block;
  animation: around 5.4s infinite;
}

@keyframes around {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loader::after,
.loader::before {
  content: "";

  position: absolute;
  display: inline-block;
  width: 100%;
  height: 100%;
  border-width: 2px;
  border-color: #04c8c8 #04c8c8 transparent transparent;
  border-style: solid;
  border-radius: 20px;
  box-sizing: border-box;
  top: 0;
  left: 0;
  animation: around 0.7s ease-in-out infinite;
}

.inputcontainer {
  position: relative;
}

.icon-container {
  position: absolute;
  right: 10px;
  top: calc(50% - 10px);
}
.loader::after {
  animation: around 0.7s ease-in-out 0.1s infinite;
  background: transparent;
}
</style>
