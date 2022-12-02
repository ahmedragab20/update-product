<template>
  <Form
    ref="labelForm"
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
          <div>
            <div class="inputs_fields my-3">
              <div v-for="(item, i) in form.resources" :key="i">
                <div v-show="item.languageId == selectedItem.id">
                  <label class="required fs-5 fw-bold mb-2 d-inline">{{
                    $t("name")
                  }}</label>
                  <Field
                    v-model="form.resources[i].name"
                    :name="`resources[${i}].name`"
                    type="text"
                    v-slot="{ field, meta }"
                    :label="`Product Label Name`"
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
                  <ErrorMessage :name="`resources[${i}].name`" class="text-danger">
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

      <!--start::connected stores -->
      <div class="col-12 my-3">
        <label class="required fs-5 fw-bold mb-2 d-inline">
          {{ $t("connectedShops") }}</label
        >
        <Field name="connectedShops" type="text" v-slot="{ field, value }">
          <el-select
            v-bind="field"
            :mode-value="value"
            class="w-100 form-control-solid border-0"
            v-model="form.connectedShops"
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
        <ErrorMessage class="text-danger" name="connectedShops"></ErrorMessage>
      </div>
      <!--end::connected stores -->

      <!--start::label Icons -->
      <div class="col-12 my-3">
        <label class="required fs-5 fw-bold mb-2 d-inline"> {{ $t("icon") }} </label>
        <Field name="icon" type="text" v-slot="{ field, value }">
          <el-select
            :model-value="value"
            v-bind="field"
            class="w-100 form-control-solid border-0"
            v-model="form.icon"
          >
            <el-option
              v-for="item in icons"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
              <div class="d-flex w-100 justify-content-between align-items-center">
                <span>{{ item.name }}</span> <i :class="item.code"></i>
              </div>
            </el-option>
          </el-select>
        </Field>
        <ErrorMessage class="text-danger" name="icon"></ErrorMessage>
      </div>
      <!--end::label Icons -->

      <!--begin::code-->
      <div class="col-6 my-3">
        <label class="required fs-5 fw-bold mb-2">{{ $t("code") }}</label>
        <div class="position-relative w-auto h-auto">
          <Field name="code" type="text" v-slot="{ field, meta }" v-model="form.code">
            <input
              v-bind="field"
              class="form-control form-control-solid form-control-lg"
              :class="{
                'is-valid': meta.valid && !isLoading,
                'is-invalid': meta.validated && !meta.valid && !isLoading,
              }"
            />
          </Field>

          <span
            v-if="isLoading"
            class="indicator-progress d-block"
            style="position: absolute; right: 15px; bottom: 15px"
          >
            <span class="spinner-border spinner-border-sm align-middle ms-2" />
          </span>
        </div>

        <ErrorMessage class="text-danger" name="code"></ErrorMessage>
      </div>
      <!--end::code -->

      <!--begin::order-->
      <div class="col-6 my-3">
        <label class="required fs-5 fw-bold mb-2">{{ $t("order") }}</label>
        <Field v-model="form.order" name="order" type="text" v-slot="{ field, meta }">
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
      <!--end::order -->

      <!--begin::text-color-->
      <div class="col-6 my-3">
        <label class="required fs-5 fw-bold"> {{ $t("textColor") }} </label>
        <div
          class="form-control form-control-solid form-control-lg d-flex align-items-center justify-content-between"
        >
          <Field
            v-model="form.textColor"
            name="textColor"
            value="#000000"
            type="color"
            v-slot="{ value, field }"
          >
            <input type="color" class="border-0 rounded w-25" v-bind="field" />
            <input
              type="text"
              class="border-0 rounded"
              style="width: 75px"
              v-bind="field"
            />
          </Field>
        </div>
        <ErrorMessage class="text-danger" name="textColor"></ErrorMessage>
      </div>
      <!--end::text-color-->
      <!--begin::background-color-->
      <div class="col-6 my-3">
        <label class="required fs-5 fw-bold"> {{ $t("backgroundColor") }} </label>
        <div
          class="form-control form-control-solid form-control-lg d-flex align-items-center justify-content-between"
        >
          <Field
            v-model="form.backgroundColor"
            name="backgroundColor"
            value="#ffffff"
            type="color"
            v-slot="{ value, field }"
          >
            <input type="color" class="border-0 rounded w-25" v-bind="field" />
            <input
              type="text"
              class="border-0 rounded"
              style="width: 75px"
              v-bind="field"
            />
          </Field>
        </div>
        <ErrorMessage class="text-danger" name="backgroundColor"></ErrorMessage>
      </div>
      <!--end::background-color-->
      <div class="col-12 my-3">
        <div class="d-flex">
          <div class="d-flex align-items-center">
            <input
              v-model="form.isPublishedOnJetOrderApp"
              id="is-publish-on-jetorder"
              class="form-check-input widget-9-check"
              type="checkbox"
            />
            <label for="is-publish-on-jetorder" class="mx-2">
              {{ $t("isPublishedOnJetOrderApp") }}
            </label>
          </div>
          <div class="d-flex align-items-center mx-4">
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
        </div>
      </div>
    </div>
    <div class="row my-5">
      <div class="col">
        <div class="d-flex justify-content-end w-100">
          <button class="btn btn-primary" @click="submit">
            <span v-if="!isLoading">
              {{ $t("add") }} <span class="fas fa-plus"></span>
            </span>
            <span v-if="isLoading" class="indicator-progress d-block">
              {{ $t("wait") }}
              <span class="spinner-border spinner-border-sm align-middle ms-2" />
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
import { reactive, ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import i18n from "@/core/plugins/i18n";
import api from "@/utils/ApiHelper";

const labelForm = ref(null);
const store = useStore();

// INITIALIZE
const langs = computed(() => {
  return store.getters.getSupportedLanguages;
});
const selectedItem = ref();
const emit = defineEmits(["label-added"]);

const productLabelAttrs = {
  resources: [],
  code: "",
  icon: "",
  connectedShops: [],
  textColor: "#2b2b2b",
  backgroundColor: "#ffffff",
  isPublishedOnShopLink: true,
  isPublishedOnJetOrderApp: true,
  order: 1,
};

const isLoading = ref(false);

const form = reactive(productLabelAttrs);

function initResources() {
  langs.value.forEach((element) => {
    form.resources.push({
      languageId: element.id,
      name: "",
      description: "",
    });
  });
}

const setSelectedItem = (payload: any) => {
  selectedItem.value = payload;
};
function submit() {
  labelForm?.value?.validate().then(({ valid }) => {
    if (valid) {
      onSubmit();
    }
  });
}

function onSubmit(e) {
  isLoading.value = true;
  store
    .dispatch(Actions.ADD_PRODUCT_LABEL, {
      ...form,
      resources: form.resources,
      isPublishedOnJetOrderApp: form.isPublishedOnJetOrderApp,
      isPublishedOnShopLink: form.isPublishedOnShopLink,
    })
    .then(() => {
      isLoading.value = false;
      emit("label-added");
      resetForm();
    });
}
function validateCode(e) {
  return new Promise<boolean>((resolve, reject) => {
    if (e.length >= 4) {
      isLoading.value = true;
      api({
        url: "ProductLabelCommands/is-valid-code",
        method: "post",
        payload: { code: e },
      }).then((res) => {
        isLoading.value = false;
        resolve(res?.data.data as boolean);
      });
    } else reject(false);
  });
}
function resetForm() {
  form.resources = [];

  form.connectedShops = [];
  form.code = "";
  form.icon = "";
  form.order = 1;
  form.isPublishedOnJetOrderApp = true;
  form.isPublishedOnShopLink = true;
  initResources();
  labelForm.value?.resetForm();
}
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

//Getters
const marketShops = computed(() => store.getters.getMarketData.shops);
const icons = computed(() => store.getters.getIcons);

const schema = yup.object({
  code: yup
    .string()
    .min(4, i18n.global.t("codeNotValid"))
    .test("isValidSlug", i18n.global.t("codeNotValid"), validateCode)
    .required(i18n.global.t("fieldRequired")),
  order: yup.number().required(i18n.global.t("fieldRequired")),
  textColor: yup
    .string()
    .matches("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$", i18n.global.t("invalidHex"))
    .required(i18n.global.t("fieldRequired")),
  backgroundColor: yup
    .string()
    .matches("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$", i18n.global.t("invalidHex"))
    .required(i18n.global.t("fieldRequired")),
  icon: yup.string().required(i18n.global.t("fieldRequired")),
  connectedShops: yup.array().of(yup.string()),
  resources: yup.array().of(
    yup.object().shape({
      name: yup.string().required(i18n.global.t("fieldRequired")),
      languageId: yup.string(),
    })
  ),
});
// initResources();
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
