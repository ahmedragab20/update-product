<template>
  <div class="form-tags-modal">
    <div
      id="kt_modal_update_categories"
      ref="ModalUpdateCategories"
      class="modal fade"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered mw-800px">
        <div class="modal-content rounded">
          <div class="modal-header p-6 border justify-content-between">
            <h2 class="modal-title px-10 border-">
              {{ $t("updateProductCategory") }}
            </h2>

            <div
              class="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
            >
              <span class="svg-icon svg-icon-1">
                <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
              </span>
            </div>
          </div>
          <!--begin::Modal body-->

          <div class="modal-body scroll-y px-10 px-lg-15 pt-10 pb-10">
            <div class="inputs_fields my-3">
              <Form class="form w-100" @submit="submit" v-if="form">
                <!--begin:: Resources-->
                <div class="col-12 my-3">
                  <tabs-duplicator
                    :items="langs"
                    @selectedItem="setSelectedItem"
                  >
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
                              v-model="form.resources[i].name"
                              :label="`form.resources[${i}].name`"
                              :name="`form.resources[${i}].name`"
                              type="text"
                              v-slot="{ field, meta }"
                            >
                              <input
                                v-bind="field"
                                :dir="selectedItem.dir"
                                type="text"
                                class="form-control form-control-solid form-control-lg"
                                :class="{
                                  'is-valid': meta.valid,
                                  'is-invalid': meta.validated && !meta.valid,
                                }"
                              />
                            </Field>
                            <ErrorMessage
                              :name="`form.resources[${i}].name`"
                              class="text-danger"
                            >
                              <span class="text-danger">
                                {{ $t("resourcesValidation") }}
                              </span>
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

                    <el-select
                      v-model="form.connectedShops"
                      class="w-100 form-control-solid border-0 p-2"
                      name="connectshops"
                      multiple
                    >
                      <el-option
                        v-for="item in marketShops"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="connectshops" />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 fv-row">
                    <div class="d-flex flex-stack mb-2">
                      <!--begin::Label-->
                      <label class="required fs-5 fw-bold mb-2 d-inline">{{
                        $t("categoryParent")
                      }}</label>
                    </div>
                    <!-- {{ marketShops }} -->

                    <el-select
                      v-model="form.parentId"
                      class="w-100 form-control-solid border-0 p-2"
                      name="Gategoriesparent"
                      clearable
                    >
                      <el-option
                        v-for="item in GategoriesList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                        {{ item.id }}
                        {{ item.name }}
                      </el-option>
                    </el-select>
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="Gategoriesparent" />
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
                      v-model="form.code"
                      v-slot="{ field, meta }"
                    >
                      <div class="inputcontainer">
                        <input
                          v-bind="field"
                          class="form-control form-control-solid form-control-lg"
                          :class="{
                            'is-invalid': meta.validated && !meta.valid,
                          }"
                          @blur="checkValueCode($event)"
                        />
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
                      name="code"
                    ></ErrorMessage>
                  </div>
                  <!--end::Input Code-->

                  <!--begin::Input Order-->
                  <div class="col-md-6 fv-row">
                    <div class="d-flex flex-stack mb-2">
                      <label class="required fs-5 fw-bold mb-2 d-inline">{{
                        $t("order")
                      }}</label>
                    </div>
                    <Field
                      class="form-control form-control-lg form-control-solid"
                      type="number"
                      name="order"
                      autocomplete="off"
                      v-model="form.order"
                      min="0"
                    />
                    <!--end::Input-->
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="order" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mb-10">
                  <div class="col-md-6 fv-row">
                    <div class="d-flex flex-stack mb-2">
                      <label class="required fs-5 fw-bold mb-2 d-inline">{{
                        $t("slug")
                      }}</label>
                    </div>
                    <Field
                      v-model="form.slug"
                      name="slug"
                      type="text"
                      v-slot="{ field, meta }"
                    >
                      <div class="inputcontainer">
                        <input
                          v-bind="field"
                          class="form-control form-control-solid form-control-lg"
                          :class="{
                            'is-invalid': meta.validated && !meta.valid,
                          }"
                          @blur="checkValueSlug($event)"
                        />
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
                      name="slug"
                    ></ErrorMessage>
                  </div>

                  <!--end::Input Code-->

                  <!--begin::Input Order-->
                  <div class="col-6">
                    <!--begin::Image input-->
                    <label class="required fs-5 fw-bold mb-2 d-block">
                      {{ $t("categoryLogo") }}</label
                    >
                    <!--begin::Image input-->
                    <Field
                      type="file"
                      v-slot="{ field }"
                      class="form-control form-control-lg form-control-solid"
                      name="logoKey"
                      placeholder=""
                      value=""
                    >
                      <div
                        v-bind="field"
                        class="image-input image-input-outline"
                        data-kt-image-input="true"
                        :style="`background-image: url(/media/avatars/blank.png)`"
                      >
                        <!--begin::Preview existing logo-->
                        <img
                          class="image-input-wrapper w-125px h-125px"
                          :src="form.thumbnailPath"
                        />
                        <!--end::Preview existing logo-->

                        <!--begin::Label-->
                        <label
                          class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                          data-kt-image-input-action="change"
                          data-bs-toggle="tooltip"
                          title="Change avatar"
                        >
                          <i class="bi bi-pencil-fill fs-7" />

                          <!--begin::Inputs-->
                          <input
                            type="file"
                            name="logo"
                            accept=".png, .jpg, .jpeg"
                            @change="handleSubmit"
                          />
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
                          @click="removeImage()"
                        >
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
                      class="fv-plugins-message-container invalid-feedback"
                    />

                    <!--end::Col-->
                    <!--end::Image input-->
                  </div>
                </div>

                <div class="fv-row mb-10">
                  <div class="d-flex justify-content-start align-items-center">
                    <!--begin::Input isPublished On JetOrder-->
                    <div class="form-check form-check-solid">
                      <input
                        class="form-check-input"
                        v-model="form.isPublishedOnJetOrder"
                        type="checkbox"
                        checked=""
                        data-kt-check="false"
                      /><label class="form-check-label ps-2">
                        {{ $t("isPublishedOnJetOrderApp") }}
                      </label>
                    </div>
                    <!--end::Input  isPublished On JetOrder-->

                    <!--begin::Input isPublished On ShopLink-->
                    <div class="form-check form-check-solid mx-5">
                      <input
                        class="form-check-input"
                        v-model="form.isPublishedOnShopLink"
                        type="checkbox"
                        checked=""
                        data-kt-check="false"
                      /><label class="form-check-label ps-2">
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
                    class="w-100 d-flex justify-content-between align-items-center"
                  >
                    <!--begin::group button-->
                    <button
                      type="button"
                      class="btn btn-lg btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      {{ $t("close") }}
                    </button>
                    <button
                      type="submit"
                      ref="submitButton"
                      class="btn btn-lg btn-primary addproduct"
                    >
                      {{ $t("updateCategory") }}
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

<script lang="ts">
import { useStore } from "vuex";
import { ref, defineComponent, computed, reactive, defineExpose } from "vue";
import { Actions } from "@/store/enums/StoreEnums";
import { string } from "yup";
import { productCategories } from "@/types";
import { Form, Field, ErrorMessage } from "vee-validate";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";
import Datatable from "@/components/kt-datatable/KTDatatable.vue";
import { hideModal } from "@/core/helpers/dom";
import i18n from "@/core/plugins/i18n";

import * as yup from "yup";
import Swal from "sweetalert2";

export default defineComponent({
  name: "update-categoriesForm",
  components: {
    Field,
    TabsDuplicator,
    ErrorMessage,

    Form,
  },
  props: {
    id: {
      type: String,
    },
  },
  //                                             Variables and Getters Init

  setup(props) {
    const store = useStore();
    const slugLoading = ref<boolean>(false);
    const codeLoading = ref<boolean>(false);
    const marketShops = computed(() => store.getters.getMarketData.shops);
    const Currency = computed(() => store.getters.getSupportedCurrencies);
    const langs = computed(() => store.getters.getSupportedLanguages);

    const GategoriesList = computed(
      () => store.state.ProductCategories.parentList
    );

    const ProductCategorie = computed(
      () => store.state.ProductCategories.ProductCategorie
    );

    const validMessageSlug = computed(() => {
      return store.state.ProductCategories.messageIsValidSlug;
    });
    console.log("validMessageSlug", validMessageSlug);
    const validMessageCode = computed(() => {
      return store.state.ProductCategories.messageIsValidCode;
    });
    const isValidSlug = computed(() => {
      return store.state.ProductCategories.isValidSlug;
    });
    const isValidCode = computed(() => {
      return store.state.ProductCategories.isValidCode;
    });

    const ModalUpdateCategories = ref<null | HTMLElement>(null);

    function checkValueCode(e) {
      codeLoading.value = true;
      if (e.target.value.length > 3) {
        store
          .dispatch(Actions.IS_VALID_CODE_PRODUCT_CATEGORY, {
            id: 0,
            code: e.target.value,
          })
          .then(() => {
            codeLoading.value = false;
          });
      }
    }
    let form = reactive(ProductCategorie);
    const getData = (id) => {
      console.log("imh");

      store.dispatch(Actions.GET_PRODUCT_Categorie_BY_ID, id);
    };

    const removeImage = () => {
      form.value.thumbnailPath = "media/avatars/blank.png";
    };
    const handleSubmit = async (event: Event) => {
      console.log("handle submit");

      const target = event.target as HTMLInputElement;
      const files = target?.files;

      if (files && files?.length > 0) {
        const file: File = files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
          const target: any = e.target;
          const data = target.result;
          form.value.thumbnailPath = data;
        };
        reader.readAsDataURL(file);
        let formData = new FormData();
        formData.append("file", file);

        store.dispatch(Actions.UPLOAD_FILE, formData).then((res) => {
          console.log("iama", res);
          const url = res[1].data.data;
          form.value.thumbnail = url;
          // form.value.thumbnailPath = image(url);
        });
      }
    };
    function checkValueSlug(e) {
      if (e.target.value.length > 3) {
        store.dispatch(Actions.IS_VALID_SLUG_PRODUCT_CATEGORIES, {
          id: 0,
          slug: e.target.value,
        });
      }
    }


    const submitButton = ref<HTMLButtonElement | null>(null);

    const selectedItem = ref(langs.value[0]);

    const schema = yup.object({
      code: yup
        .string()
        .min(4, i18n.global.t("codeNotValid"))

        .required(i18n.global.t("fieldRequired")),
      slug: yup
        .string()

        .required(i18n.global.t("fieldRequired")),
      // connectedShops: yup.array().of(yup.string().required("required")).required("required"),
      resources: yup.array().of(
        yup.object().shape({
          name: yup.string().required(i18n.global.t("fieldRequired")),
          languageId: yup.string(),
        })
      ),
    });

    const setSelectedItem = (payload: any) => {
      selectedItem.value = payload;
    };
    function submit(values, { resetForm }) {
      store.dispatch(Actions.UPDATE_CATEGORIS, form.value).then(() => {
        resetForm();
        hideModal(ModalUpdateCategories.value);
        form.value.connectedShops = [];
      });
    }

    return {
      marketShops,
      langs,
      ProductCategorie,
      form,
      getData,

      slugLoading,
      codeLoading,
      handleSubmit,
      setSelectedItem,
      selectedItem,
      checkValueSlug,
      checkValueCode,
      submitButton,
      ModalUpdateCategories,
      submit,
      isValidSlug,
      validMessageSlug,
      GategoriesList,
    };
  },
});
</script>
<style scoped>
input.form-check-input {
  margin-top: 12px;
}
.row.col-md-12 {
  margin-left: -60%;
}
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
