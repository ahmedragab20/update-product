<template>
  <Form
    ref="brandForm"
    :validation-schema="schema"
    class="form fv-plugins-bootstrap5 fv-plugins-framework p-5"
    @submit="onSubmit"
  >
    <div class="row">
      <!--begin:: Resources-->
      <div class="col-12 my-3">
        <tabs-duplicator :items="langs" @selectedItem="setSelectedItem">
          <template #label="{ item }">
            {{ item.label }}
          </template>
        </tabs-duplicator>

        <div class="fields">
          <div class="inputs_fields my-3">
            <div v-for="(item, i) in form.resources" :key="i">
              <div class="row" v-show="item.languageId === selectedItem.id">
                <div class="col-12">
                  <label class="required fs-5 fw-bold mb-2 d-inline">{{
                    $t("name")
                  }}</label>
                  <Field
                    v-model="item.name"
                    :value="item.name"
                    :name="`resources[${i}].name`"
                    type="text"
                    v-slot="{ field, meta }"
                    :label="`Brand Name`"
                  >
                    <input
                      v-bind="field"
                      type="text"
                      class="form-control form-control-solid form-control-lg"
                      :class="{
                        'is-valid': meta.valid,
                        'is-invalid': meta.validated && !meta.valid,
                      }"
                    />
                  </Field>
                  <ErrorMessage :name="`resources[${i}].name`" class="text-danger">
                    <span class="text-danger">
                      {{ $t("resourcesValidation") }}
                    </span>
                  </ErrorMessage>
                </div>
                <div class="col-12 mt-4" v-if="item.languageId === selectedItem.id">
                  <label class="required fs-5 fw-bold mb-2 d-inline">{{
                    $t("description")
                  }}</label>
                  <QuillTextEditor
                    @input="setVal($event, i)"
                    v-model:content="item.description"
                    contentType="html"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end::Input-->

      <!--start::connected stores -->
      <div class="col-12 my-3">
        <label class="required fs-5 fw-bold mb-2 d-inline">{{
          $t("connectedShops")
        }}</label>
        <Field name="connectedShops" type="text" v-slot="{ field, value }">
          <el-select
            v-bind="field"
            :mode-value="value"
            class="w-100 form-control-solid border-0"
            v-model="form.connectedShops"
            multiple
            :placeholder="$t('enterKeyword')"
          >
            <el-option
              v-for="item in marketShops"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </Field>
        <ErrorMessage class="text-danger" name="connectedShops"></ErrorMessage>
      </div>
      <!--end::connected stores -->

      <!--start::Brand Order -->
      <div class="col-12 my-3">
        <label class="required fs-5 fw-bold mb-2">{{ $t("order") }}</label>
        <Field name="order" type="text" v-model="form.order" v-slot="{ field, meta }">
          <input
            v-bind="field"
            class="form-control form-control-solid form-control-lg"
            type="number"
            :class="{
              'is-valid': meta.valid,
              'is-invalid': meta.validated && !meta.valid,
            }"
          />
        </Field>
        <ErrorMessage class="text-danger" name="order"></ErrorMessage>
      </div>
      <!--end::Brand Order -->

      <!--begin::code-->
      <div class="col-6 my-3">
        <label class="required fs-5 fw-bold mb-2">{{ $t("code") }}</label>
        <div class="position-relative w-auto h-auto">
          <Field name="code" type="text" v-slot="{ field, meta }" v-model="form.code">
            <input
              v-bind="field"
              class="form-control form-control-solid form-control-lg"
              :class="
                          !codeLoading
                            ? {
                                'is-valid': meta.valid,
                                'is-invalid': meta.validated && !meta.valid,
                              }
                            : {}
                        "
               @blur="validateCode($event)"
            />
          </Field>

          <span
            v-if="codeLoading"
            class="indicator-progress d-block"
            style="position: absolute; right: 15px; bottom: 15px"
          >
            <span class="spinner-border spinner-border-sm align-middle ms-2" />
          </span>
        </div>
        <span v-if="!isValidCode" class="text-danger">
          {{ $t("codeNotValidReq") }}
        </span>
        <ErrorMessage class="text-danger" name="code"></ErrorMessage>
      </div>
      <!--end::code -->

      <!--begin::slug-->
      <div class="col-6 my-3">
        <label class="required fs-5 fw-bold mb-2"> Slug</label>
        <div class="position-relative w-auto h-auto">
          <Field
            name="slug"
            type="text"
            class="position-relative"
            v-slot="{ field, meta }"
            v-model="form.slug"
          >
            <input
              v-bind="field"
              class="form-control form-control-solid form-control-lg"
              :class="
                          !slugLodaing
                            ? {
                                'is-valid': meta.valid,
                                'is-invalid': meta.validated && !meta.valid,
                              }
                            : {}
                        "
               @blur="validateSlug($event)"
            />
            <span
              v-if="slugLodaing"
              class="indicator-progress d-block"
              style="position: absolute; right: 15px; bottom: 15px"
            >
              <span class="spinner-border spinner-border-sm align-middle ms-2" />
            </span>
          </Field>
        </div>
        <span v-if="!isValidSlug" class="text-danger">
                      {{ $t("slugNotValidReq") }}
                    </span>
        <ErrorMessage class="text-danger" name="slug"></ErrorMessage>
      </div>
      <!--end::slug -->
    </div>

    <div class="row my-5">
      <div class="col-6">
        <!--begin::Image input-->
        <label class="required fs-5 fw-bold mb-2 d-block">{{ $t("logo") }}</label>

        <div
          class="image-input image-input-outline"
          data-kt-image-input="true"
          :style="`background-image: url(/media/avatars/blank.png)`"
        >
          <!--begin::Preview existing avatar-->
          <div class="image-input-wrapper w-125px h-125px position-relative">
            <img :src="imageUrl" style="object-fit: cover" class="w-100 h-100" alt="" />
            <label
              class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
              for="upload-brand"
              style="position: absolute; right: -10px; top: 0"
              data-bs-toggle=" tooltip"
              title="Change avatar"
            >
              <i class="bi bi-pencil-fill fs-7"></i>
            </label>
            <!--end::Label-->

            <!--begin::Remove-->
            <span
              style="position: absolute; right: 0; bottom: 0"
              class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
              data-kt-image-input-action="remove"
              data-bs-toggle="tooltip"
              title="Remove avatar"
            >
              <i class="bi bi-x fs-2"></i>
            </span>
          </div>
          <!--end::Preview existing avatar-->

          <input
            type="file"
            hidden
            id="upload-brand"
            @change="handleSubmit"
            name="avatar"
            accept=".png, .jpg, .jpeg"
          />
          <!--end::Remove-->
          <!--end::Image input-->

          <!--begin::Hint-->
          <div class="form-text">Allowed file types: png, jpg, jpeg.</div>
          <!--end::Hint-->
        </div>

        <!--end::Col-->
        <!--end::Image input-->
      </div>

      <div class="col-6">
        <div class="d-flex flex-column justify-content-around w-100 h-100">
          <div class="d-flex align-items-center mt-4">
            <input
              v-model="form.isPublishedOnShopLink"
              class="form-check-input widget-9-check"
              id="is-publish-on-shoplink"
              type="checkbox"
            />
            <label for="is-publish-on-shoplink" class="mx-2">{{
              $t("isPublishedOnShopLink")
            }}</label>
          </div>
          <div class="d-flex align-items-center">
            <input
              v-model="form.isPublishedOnJetOrderApp"
              id="is-publish-on-jetorder"
              class="form-check-input widget-9-check"
              type="checkbox"
            />
            <label for="is-publish-on-jetorder" class="mx-2">{{
              $t("isPublishedOnJetOrderApp")
            }}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="row my-5">
      <div class="col">
        <div class="d-flex justify-content-end w-100">
          <button class="btn btn-primary" :disabled="isLoading" @click="validate">
            <span v-if="isLoading" class="indicator-progress d-block">
              {{ $t("wait") }}...
              <span class="spinner-border spinner-border-sm align-middle ms-2" />
            </span>
            <span v-else>
              {{ $t("add") }}
              <span class="fas fa-plus"></span>
            </span>
          </button>
        </div>
      </div>
    </div>
  </Form>
</template>

<script setup lang="ts">
import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";
import { Actions } from "@/store/enums/StoreEnums";
import QuillTextEditor from "@/components/Reusable/QuillTextEditor.vue";
import { BrandResources } from "@/types";
import { reactive, ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import Swal from "sweetalert2";
import i18n from "@/core/plugins/i18n";
import api from "@/utils/ApiHelper";
const store = useStore();
const brandForm = ref(null);
// INITIALIZE
const emit = defineEmits(["brand-added"]);
const langs = computed(() => {
  return store.getters.getSupportedLanguages;
});
const selectedItem = ref({
  id: "",
  label: "",
});
const productBrandAttrs = {
  resources: [] as BrandResources[],
  code: "",
  slug: "",
  thumbnail: "",
  connectedShops: [],
  order: 1,
  isPublishedOnJetOrderApp: true,
  isPublishedOnShopLink: true,
};
const imageUrl = ref("/media/svg/files/blank-image.svg");
const isLoading = ref(false);
const codeLoading = ref(false);
const slugLodaing = ref(false);
const isValidCode = ref(true);
const isValidSlug= ref(true);
let form = reactive(productBrandAttrs);

const setSelectedItem = (payload: any) => {
  selectedItem.value = payload;
};

const image = (path) => {
  return `https://mfproductimages.s3.amazonaws.com/` + path;
};
function setVal(e, i) {
  form.resources[i].description = e.target.innerHTML;
}
function resetForm() {
  form.resources = [] as BrandResources[];
  form.connectedShops = [];
  form.code = "";
  form.slug = "";
  form.thumbnail = "";
  form.order = 1;
  form.isPublishedOnJetOrderApp = true;
  form.isPublishedOnShopLink = true;
  imageUrl.value = "/media/svg/files/blank-image.svg";
  initResources();
  brandForm.value?.resetForm();
}
function validate() {
  brandForm.value.valid().then(({ valid }) => {
    if (valid) {
      onSubmit();
    }
  });
}
function onSubmit() {
  if (isValidSlug.value && isValidCode.value) {
  isLoading.value = true;
  store
    .dispatch(Actions.ADD_PRODUCT_BRANDS, {
      ...form,
      resources: form.resources,
      thumbnail: form.thumbnail,
      isPublishedOnJetOrderApp: form.isPublishedOnJetOrderApp,
      isPublishedOnShopLink: form.isPublishedOnShopLink,
    })
    .then((data) => {
      if (data.statusCode == 200) {
        isLoading.value = false;
        Swal.fire({
          text: `Product Tag Added Successfully ! `,
          icon: "success",
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary",
          },
        })
          .then(() => {
            emit("brand-added");
            resetForm();
          })
          .catch((er) => {
            isLoading.value = false;
          });
      }
    });
}
}
function initResources() {
  if (langs && langs.value)
    langs.value.forEach((element) => {
      form.resources.push({
        languageId: element.id,
        name: "",
        description: "",
      });
    });
}
function validateSlug(e) {
  return new Promise<boolean>((resolve, reject) => {
    if (e.target.value.length >= 4) {
      slugLodaing.value = true;
      api({
        url: "ProductBrandCommands/is-valid-slug",
        method: "post",
        payload: { slug: e.target.value  },
      })
        .then((res) => {
          slugLodaing.value = false;
          resolve(res?.data.data as boolean);
          isValidSlug.value = res?.data.data
        })
        .catch((er) => (slugLodaing.value = false));
    } 
  });
}
function validateCode(e) {
  console.log("codeLoading")
  return new Promise<boolean>((resolve, reject) => {
    if (e.target.value.length >= 4) {
      codeLoading.value = true;
      api({
        url: "ProductBrandCommands/is-valid-code",
        method: "post",
        payload: { code: e.target.value  },
      })
        .then((res) => {
          codeLoading.value = false;
          resolve(res?.data.data as boolean);
          isValidCode.value = res?.data.data;
        })
        .catch((er) => (codeLoading.value = false));
    } 
  });
}
//Getters

const marketShops = computed(() => store.getters.getMarketData.shops);

const handleSubmit = (e) => {
  isLoading.value = true;
  const file = e.target.files[0];

  const fd = new FormData();
  fd.append("file", file);
  api({ url: Actions.UPLOAD_FILE, method: "post", payload: fd }).then((res): any => {
    imageUrl.value = image(res?.data.data);
    form.thumbnail = res?.data.data;
    isLoading.value = false;
  });
};

const schema = yup.object({
  order: yup.number().required(i18n.global.t("fieldRequired")),
  code: yup
    .string()
    .min(4, i18n.global.t("codeNotValid"))
  
    .required(i18n.global.t("fieldRequired")),
  slug: yup
    .string()
    .min(4, i18n.global.t("slugNotValid"))
 
    .required(i18n.global.t("fieldRequired")),
  connectedShops: yup.array().of(yup.string()),
  resources: yup.array().of(
    yup.object().shape({
      name: yup.string().required(i18n.global.t("fieldRequired")),
      languageId: yup.string(),
      description: yup.string(),
    })
  ),
});
onMounted(() => {
  if (langs.value && langs.value.length) {
    initResources();
    selectedItem.value = langs.value[0];
  }
});
watch(langs, (newVal) => {
  if (newVal && newVal.length) {
    initResources();
    selectedItem.value = newVal[0];
  }
});
</script>

<style>
.el-input {
  border-radius: 0.625rem;
}

.el-input__inner {
  border-radius: 0.625rem;
  background-color: #f5f8fa;
  height: 45px;
  border: none;
}
</style>
