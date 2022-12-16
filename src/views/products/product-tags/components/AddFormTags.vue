<template>
  <div class="form-tags-modal">
    <div
      class="modal fade"
      id="modalForm"
      ref="tagModal"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content rounded">
          <div class="modal-header p-6 border justify-content-between">
            <h2 class="modal-title px-10 border-">{{ $t("addTag") }}</h2>
            <div
              class="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
            >
              <span class="svg-icon svg-icon-1">
                <!-- src="/media/icons/duotune/general/gen024.svg" -->
                <inline-svg src="/media/icons/duotune/arrows/arr061.svg" />
              </span>
            </div>
          </div>
          <!--begin::Modal body-->
          <div class="modal-body px-5 px-lg-15 pt-2 pb-5">
            <!-- <h2>is valid slug {{ isValidSlug }}</h2>
            <h2>is code valid {{ isValidCode }}</h2> -->
            <div class="inputs_fields my-2">
              <Form
                :validation-schema="schema"
                class="form fv-plugins-bootstrap5 fv-plugins-framework p-5"
                @submit="onSubmit"
                ref="tagForm"
                v-slot="value"
              >
                <!-- <template :slot-scope="value">{{ value }}</template> -->
                <div class="row">
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
                          <div v-for="(item, i) in tagsDto.resources" :key="i">
                            <div v-show="item.languageId == selectedItem.id">
                              <label
                                class="required fs-5 fw-bold mb-2 d-inline"
                                >{{ $t("name") }}</label
                              >
                              <Field
                                v-model="tagsDto.resources[i].name"
                                :name="`resources[${i}].name`"
                                type="text"
                                v-slot="{ field, meta }"
                                :label="`Product Tag Name`"
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
                                :name="`resources[${i}].name`"
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
                  <!--end::language-->

                  <!--begin::connected stores -->

                  <div class="col-12 my-3">
                    <label class="required fs-5 fw-bold mb-2 d-inline">{{
                      $t("connectedShops")
                    }}</label>
                    <Field
                      name="connectedShops"
                      type="text"
                      v-slot="{ field, value }"
                    >
                      <el-select
                        v-bind="field"
                        :mode-value="value"
                        class="w-100 form-control-solid border-0"
                        v-model="tagsDto.connectedShops"
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
                    </Field>
                    <ErrorMessage
                      class="text-danger"
                      name="connectedShops"
                    ></ErrorMessage>
                  </div>
                  <!--end::connected stores-->

                  <!--begin::Input Code-->
                  <div class="col-12 my-3 position-relative">
                    <label class="required fs-5 fw-bold mb-2">{{
                      $t("code")
                    }}</label>
                    <Field name="code" type="text" v-slot="{ field, meta }">
                      <input
                        v-bind="field"
                        class="form-control form-control-solid form-control-lg"
                        :class="
                          !loadCode
                            ? {
                                'is-valid': meta.valid,
                                'is-invalid': meta.validated && !meta.valid,
                              }
                            : {}
                        "
                        @blur="validateCode($event)"
                      />

                      <div
                        v-if="loadCode"
                        class="spinner-border spinner-border-sm align-middle ms-2"
                      ></div>
                    </Field>
                    <span v-if="!isValidCode" class="text-danger">
                      {{ $t("codeNotValidReq") }}
                    </span>
                    <ErrorMessage
                      class="text-danger"
                      name="code"
                    ></ErrorMessage>
                  </div>
                  <!--end::Input Code-->

                  <!--begin::Input Slug-->
                  <div class="col-12 my-3 position-relative">
                    <label class="required fs-5 fw-bold mb-2"> Slug</label>
                    <Field name="slug" type="text" v-slot="{ field, meta }">
                      <input
                        v-bind="field"
                        class="form-control form-control-solid form-control-lg"
                        :class="
                          !loadSlug
                            ? {
                                'is-valid': meta.valid,
                                'is-invalid': meta.validated && !meta.valid,
                              }
                            : {}
                        "
                        @blur="validateSlug($event)"
                      />

                      <div
                        v-if="loadSlug"
                        class="spinner-border spinner-border-sm align-middle ms-2"
                      ></div>
                    </Field>
                    <span v-if="!isValidSlug" class="text-danger">
                      {{ $t("slugNotValidReq") }}
                    </span>
                    <ErrorMessage
                      class="text-danger"
                      name="slug"
                    ></ErrorMessage>
                  </div>
                  <!--end::Input Slug-->
                  <div class="col-12 my-3">
                    <label class="required fs-5 fw-bold mb-2">{{
                      $t("order")
                    }}</label>
                    <Field name="order" type="text" v-slot="{ field, meta }">
                      <input
                        v-bind="field"
                        class="form-control form-control-solid form-control-lg"
                        type="number"
                        min="1"
                        :class="{
                          'is-valid': meta.valid,
                          'is-invalid': meta.validated && !meta.valid,
                        }"
                      />
                    </Field>
                    <ErrorMessage
                      class="text-danger"
                      name="order"
                    ></ErrorMessage>
                  </div>
                  <div class="col-12 my-3">
                    <div class="d-flex align-items-center">
                      <input
                        class="form-check-input widget-9-check"
                        id="is-publish-on-shoplink"
                        type="checkbox"
                      />
                      <label for="is-publish-on-shoplink" class="mx-2">{{
                        $t("isPublishedOnShopLink")
                      }}</label>
                    </div>
                  </div>
                  <div class="col-12 my-3">
                    <div class="d-flex align-items-center">
                      <input
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
                <div class="d-flex justify-content-end">
                  <button
                    :disabled="!value.meta.valid"
                    class="btn mt-5 btn-lg btn-primary"
                  >
                    <span v-if="!isLoading">
                      {{ $t("add") }} <span class="fas fa-plus"></span>
                    </span>
                    <span v-if="isLoading" class="indicator-progress d-block">
                      {{ $t("wait") }}
                      <span
                        class="spinner-border spinner-border-sm align-middle ms-2"
                      />
                    </span>
                  </button>
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

    label.form-check {
      span {
        font-size: 14px !important;
      }
    }
  }
}
</style>

<script lang="ts" setup>
import { ref, computed, reactive, defineEmits, watch, onMounted } from "vue";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import * as yup from "yup";
import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";
import { Language } from "@/types";
import { Form, Field, ErrorMessage } from "vee-validate";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2";
import i18n from "@/core/plugins/i18n";
import api from "@/utils/ApiHelper";
const store = useStore();
const langs = computed(() => {
  return store.getters.getSupportedLanguages;
});
const tagModal = ref(null);
const tagForm = ref(null);
let tagsDto = reactive({
  resources: [],
  code: "",
  slug: "",
  order: 0,
  connectedShops: [],
  isPublishedOnJetOrderApp: true,
  isPublishedOnShopLink: true,
});
const emit = defineEmits(["add-tags"]);
const marketShops = computed(() => store.getters.getMarketData.shops);
const isLoading = ref(false);
const loadSlug = ref(false);
const loadCode = ref(false);
const isValidCode = ref(true)
const isValidSlug = ref(true)
const isDisabled = ref(false);
//Create form validation object
const schema = yup.object({
  code: yup
    .string()
    .min(4)
    //.test("isValidSlug", i18n.global.t("codeValidation"), validateCode)
    .required(i18n.global.t("codeIsRequire")),
  order: yup.number().required(i18n.global.t("orderIsRequire")),
  slug: yup
    .string()
    .min(4)
    //.test("isValidSlug", i18n.global.t("slugValidation"), validateSlug)
    .required(i18n.global.t("slugIsRequire")),
  connectedShops: yup
    .array()
    .of(yup.string())
    .required(i18n.global.t("shopsIsRequire")),
  resources: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
      languageId: yup.string(),
    })
  ),
});
// const langs = computed(() => {
//   return [
//     {
//       id: "1",
//       label: "العربية",
//       code: "ar-JO",
//       icon: "https://cdn-icons-png.flaticon.com/64/197/197595.png",
//       dir: "ltr",
//     },
//     {
//       dir: "rtl",
//       id: "2",
//       label: "English",
//       code: "en-US",
//       icon: "https://cdn-icons-png.flaticon.com/64/197/197595.png",
//     },
//   ];
// });
const selectedItem = ref();
const setSelectedItem = (payload: any) => {
  selectedItem.value = payload;
};

function initResources() {
  langs.value.forEach((element) => {
    tagsDto.resources.push({
      languageId: element.id,
      name: "",
    });
  });
}

function resources() {
  langs.value.forEach((element) => {
    tagsDto.resources.push({
      languageId: element.id,
      name: "",
    });
  });
}
onMounted(() => {
  if (langs.value && langs.value.length) {
    resources();
    selectedItem.value = langs.value[0];
  }
});
watch(langs, (val) => {
  if (val && val.length) {
    resources();
    selectedItem.value = val[0];
  }
});

// if (langs.value.length && langs.value[0]) {
//   selectedItem.value = langs.value[0];
// }

const languages = computed(() => {
  return store.state.LookupQueries.languages.data;
});

function resetForm() {
  tagsDto.resources = [];
  tagsDto.connectedShops = [];
  tagsDto.code = "";
  tagsDto.slug = "";
  tagsDto.order = 1;
  tagsDto.isPublishedOnJetOrderApp = true;
  tagsDto.isPublishedOnShopLink = true;
  initResources();
  tagForm.value?.resetForm();
}

function onSubmit(e) {
  if (isValidSlug.value && isValidCode.value) {
    isLoading.value = true;
    store
      .dispatch(Actions.ADD_PRODUCT_TAGS, {
        ...e,
        resources: tagsDto.resources,
        isPublishedOnJetOrderApp: tagsDto.isPublishedOnJetOrderApp,
        isPublishedOnShopLink: tagsDto.isPublishedOnShopLink,
      })
      .then((data) => {
      if (data.statusCode == 200) {
        isLoading.value = false;
        Swal.fire({
          text: i18n.global.t("productTagAdded"),
          icon: "success",
          confirmButtonText: i18n.global.t("ok"),
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary",
          },
        }).then(() => {
          hideModal(tagModal.value);
          resetForm();
          emit("add-tags");
        });
      } else {
        isLoading.value = false;
        Swal.fire({
          text: data.message,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Try again!",
          customClass: {
            confirmButton: "btn fw-bold btn-light-danger",
          },
        });
      }
    })
  }
  
}
function validateSlug(e) {
  return new Promise<boolean>((resolve, reject) => {
    if (e.target.value.length >= 4) {
      loadSlug.value = true;
      api({
        url: "ProductTagCommands/is-valid-slug",
        method: "post",
        payload: { slug: e.target.value },
      }).then((res) => {
        resolve(res?.data.data as boolean);
        loadSlug.value = false;
        isValidSlug.value = res?.data.data
      });
    } else reject(false);
  });
}

function validateCode(e) {
  return new Promise<boolean>((resolve, reject) => {
    if (e.target.value.length >= 4) {
      loadCode.value = true;
      api({
        url: "ProductTagCommands/is-valid-code",
        method: "post",
        payload: { code: e.target.value },
      }).then((res) => {
        resolve(res?.data.data as boolean);
        loadCode.value = false;
        isValidCode.value = res?.data.data
      });
    } else reject(false);
  });
}
</script>

<style lang="scss">
.form-tags-modal {
  .el-input {
    border-radius: 0.625rem;
  }

  .el-input__inner {
    border-radius: 0.625rem;
    background-color: #f5f8fa;
    height: 45px;
    border: none;
  }
  .spinner-border {
    position: absolute;
    right: 30px;
    top: 45px;
  }
}
</style>
