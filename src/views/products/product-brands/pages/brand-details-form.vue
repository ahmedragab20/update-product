<template>
  <div>
    <div class="product-label d-flex flex-column flex-column-fluid">
      <!--begin::Container-->
      <div class="container-xxl" id="kt_content_container">
        <Form
          :validation-schema="schema"
          ref="brandForm"
          class="form d-flex flex-column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework"
        >
          <!--begin::Aside column-->
          <div class="row">
            <div class="col col-lg-4">
              <div class="card card-flush py-4 mb-4">
                <div class="card-header">
                  <div class="card-title">
                    <h2>{{ $t("logo") }}</h2>
                  </div>
                </div>

                <div class="card-body text-center pt-0">
                  <div
                    class="image-input image-input-empty image-input-outline image-input-placeholder mb-3"
                    data-kt-image-input="true"
                  >
                    <div
                      class="d-flex justify-content-center align-items-center image-input-wrapper w-150px h-150px"
                    >
                      <!-- {{ brandsDto.thumbnail }} -->
                      <img
                        height="100"
                        width="100"
                        :src="brandsDto.thumbnailPath"
                        style="object-fit: contain"
                      />
                    </div>

                    <label
                      class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                      data-kt-image-input-action="change"
                      data-bs-toggle="tooltip"
                      data-kt-initialized="1"
                    >
                      <i class="bi bi-pencil-fill fs-7"></i>

                      <input
                        @change="changeImage"
                        type="file"
                        name="avatar"
                        accept=".png, .jpg, .jpeg"
                      />
                      <input type="hidden" name="avatar_remove" />
                    </label>

                    <span
                      class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                      data-kt-image-input-action="cancel"
                      data-bs-toggle="tooltip"
                      data-kt-initialized="1"
                    >
                      <i class="bi bi-x fs-2"></i>
                    </span>

                    <span
                      class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                      data-kt-image-input-action="remove"
                      data-bs-toggle="tooltip"
                      data-kt-initialized="1"
                    >
                      <i class="bi bi-x fs-2"></i>
                    </span>
                  </div>

                  <div class="text-muted fs-7">
                    Only *.png, *.jpg and *.jpeg image files are accepted
                  </div>
                  <!--end::Description-->
                </div>
                <!--end::Card body-->
              </div>

              <!--begin::Status-->

              <div class="card card-flush py-4 mb-4">
                <div class="card-header">
                  <div class="card-title">
                    <h2>{{ $t("labelProperties") }}</h2>
                  </div>
                </div>
                <div class="card-body">
                  <div class="col-12 my-3 position-relative">
                    <label class="required fs-5 fw-bold mb-2">{{ $t("slug") }}</label>
                    <div class="position-relative w-auto h-auto">
                      <Field
                        name="slug"
                        type="text"
                        class="position-relative"
                        v-slot="{ field, meta }"
                        v-model="brandsDto.slug"
                      >
                        <input
                          v-bind="field"
                          class="form-control form-control-solid form-control-lg"
                          :class="{
                            'is-valid': meta.valid && !isLoading,
                            'is-invalid': meta.validated && !meta.valid && !isLoading,
                          }"
                        />
                        <span
                          v-if="isLoading"
                          class="indicator-progress d-block"
                          style="position: absolute; right: 15px; bottom: 15px"
                        >
                          <span
                            class="spinner-border spinner-border-sm align-middle ms-2"
                          />
                        </span>
                      </Field>
                    </div>
                    <ErrorMessage class="text-danger" name="slug"></ErrorMessage>
                  </div>
                  <!--begin::code-->
                  <div class="col-12 my-3">
                    <label class="required fs-5 fw-bold mb-2">{{ $t("code") }}</label>
                    <div class="position-relative w-auto h-auto">
                      <Field
                        name="code"
                        type="text"
                        v-slot="{ field, meta }"
                        v-model="brandsDto.code"
                      >
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
                        <span
                          class="spinner-border spinner-border-sm align-middle ms-2"
                        />
                      </span>
                    </div>

                    <ErrorMessage class="text-danger" name="code"></ErrorMessage>
                  </div>
                  <!--end::code -->
                  <!--begin::order-->
                  <div class="col-12 my-3">
                    <label class="required fs-5 fw-bold mb-2">{{ $t("order") }}</label>
                    <Field
                      name="order"
                      type="text"
                      v-slot="{ field, meta }"
                      v-model="brandsDto.order"
                    >
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
                    <ErrorMessage class="text-danger" name="order"></ErrorMessage>
                  </div>
                  <!--end::order -->
                </div>
              </div>

              <div class="card card-flush py-4">
                <div class="card-header">
                  <div class="card-title">
                    <h2>{{ $t("publishOptions") }}</h2>
                  </div>
                </div>
                <div class="card-body pt-0">
                  <div class="d-flex align-items-center my-3">
                    <input
                      class="form-check-input widget-9-check"
                      id="is-publish-on-shoplink"
                      type="checkbox"
                      v-model="brandsDto.isPublishedOnShopLink"
                    />
                    <label for="is-publish-on-shoplink" class="mx-2">{{
                      $t("isPublishedOnShopLink")
                    }}</label>
                  </div>
                  <div class="d-flex align-items-center">
                    <input
                      id="is-publish-on-jetorder"
                      class="form-check-input"
                      type="checkbox"
                      v-model="brandsDto.isPublishedOnJetOrderApp"
                    />
                    <label for="is-publish-on-jetorder" class="mx-2">{{
                      $t("isPublishedOnJetOrderApp")
                    }}</label>
                  </div>
                </div>
              </div>
            </div>
            <!--end::Aside column-->
            <!--begin::Main column-->

            <div class="col col-lg-8">
              <div class="card card-flush py-4 mb-4">
                <div class="card-header">
                  <div class="card-title">
                    <h2>{{ $t("resources") }}</h2>
                  </div>
                </div>
                <div class="card-body pt-0">
                  <!--begin::Input group-->
                  
                  <div class="col-12 my-3" v-if="brandsDto.resources.length">
                    <tabs-duplicator
                      :items="brandsDto.resources"
                      @selectedItem="setSelectedItem"
                    >
                 
                      <template #label="{ item }">
                        {{ getLangLabel(item.languageId).label }}
                      </template>
                    </tabs-duplicator>
                    <div class="fields">
                      <div class="inputs_fields my-3">
                        <div v-for="(item, i) in brandsDto.resources" :key="i">
                          <div
                            class="row"
                            v-show="item.languageId == selectedItem.languageId"
                          >
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
                              <ErrorMessage
                                :name="`resources[${i}].name`"
                                class="text-danger"
                              >
                                <span class="text-danger">
                                  {{ $t("resourcesValidation") }}
                                </span>
                              </ErrorMessage>
                            </div>
                            <div class="col-12 mt-4">
                              <label class="required fs-5 fw-bold mb-2 d-inline">{{
                                $t("description")
                              }}</label>
                              <QuillTextEditor
                              
                                v-if="item.languageId == selectedItem.languageId"
                                v-model:content="item.description"
                                
                                @editorContext="setDescription($event, i)"
                                contentType="html"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card card-flush py-4 mb-4">
                <!--begin::Card header-->
                <div class="card-header">
                  <!--begin::Card title-->
                  <div class="card-title">
                    <h2>{{ $t("shops") }}</h2>
                  </div>
                  <!--end::Card title-->
                </div>

                <div class="card-body pt-0">
                  <!--begin::Connected Products-->
                  <!-- {{ connectedProducts }} -->
                  <div class="col-12 my-3">
                    <label class="required fs-5 fw-bold mb-2 d-inline"
                      >{{ $t("connectedShops") }}
                    </label>
                    <div class="d-flex">
                      <Field name="connectedShops" type="text" v-slot="{ field, value }">
                        <!-- :remote-method="getProducts" -->
                        <el-select
                          class="w-100 form-control-solid border-0"
                          v-model="brandsDto.connectedShops"
                          multiple
                          filterable
                          remote
                          reserve-keyword
                          :placeholder="$t('enterKeyword')"
                        >
                          <el-option
                            v-for="item in marketShops"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                          />
                        </el-select>
                      </Field>
                    </div>

                    <ErrorMessage
                      class="text-danger"
                      name="connectedShops"
                    ></ErrorMessage>
                  </div>
                  <!--end::Connected Products-->
                </div>
              </div>

              <div class="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
                <div class="card card-flush py-4 mb-4">
                  <div class="card-header d-flex align-items-center">
                    <div class="card-title">
                      <h2>{{ $t("products") }}</h2>
                    </div>
                    <el-select
                      @change="setItemsPerPage"
                      v-model="pagination.pageSize"
                      style="width: 100px"
                      placeholder="Number Of Item"
                      class="border-1 mx-4"
                    >
                      <el-option :value="5">5</el-option>
                      <el-option :value="10">10</el-option>
                      <el-option :value="25">25</el-option>
                      <el-option :value="50">50</el-option>
                      <el-option :value="100">100</el-option>
                    </el-select>
                  </div>
                  <div class="card-body pt-0">
                    <label class="required fs-5 fw-bold mb-5 d-inline"
                      >{{ $t("addProduct") }}
                    </label>
                    <div class="d-flex pb-5 mb-4">
                      <Field
                        name="connectedProduct"
                        type="text"
                        v-slot="{ field, value }"
                      >
                        <!-- :remote-method="getProducts" -->
                        {{ connectedValue.value }}
                        <el-select
                          class="w-100 form-control-solid border-0"
                          v-model="connectedValue"
                          multiple
                          :loading="isLoading"
                          filterable
                          remote
                          reserve-keyword
                          :placeholder="$t('enterKeyword')"
                          value-key="id"
                          :remote-method="getSelectConnectedProducts"
                        >
                          <el-option
                            v-for="item in connectedProductsList"
                            :key="item.id"
                            class="overflow-visible py-3 d-flex align-items-center"
                            :label="item.name"
                            style="height: 60px"
                            :value="item"
                            :disabled="connectedProducts.some((p) => p.id == item.id)"
                          >
                            <img
                              :src="item.thumbnail"
                              style="object-fit: cover; height: 35px; width: 35px"
                              class="rounded"
                              alt=""
                            />
                            <span class="mx-2">{{ item.name }}</span>
                          </el-option>
                        </el-select>
                      </Field>
                      <!-- <ErrorMessage
                      class="text-danger"
                      name="connectedProduct"
                    ></ErrorMessage> -->
                      <button
                        @click="addProduct()"
                        :class="`btn mx-3   d-flex align-items-center ${
                          !!connectedValue.length ? 'btn-primary' : 'btn-light-primary'
                        }`"
                        style="max-height: 45px"
                        :disabled="!connectedValue.length"
                        type="button"
                      >
                        <span v-if="isLoading" class="indicator-progress d-block">
                          <span
                            class="spinner-border spinner-border-sm align-middle ms-2"
                          />
                        </span>
                        <span v-if="!isLoading" class="indicator-label"
                          >{{ $t("save") }}
                        </span>
                      </button>
                    </div>

                    <label class="required fs-5 fw-bold mb-2 d-inline"
                      >{{ $t("connectedProducts") }}
                    </label>
                    <el-table
                      :data="connectedProductsResult"
                      class="tag-products w-100 pt-4"
                    >
                      >
                      <el-table-column width="70" :label="$t('thumbnail')">
                        <template #default="scope">
                          <div class="d-flex align-items-center">
                            <img
                              :src="scope.row.thumbnail"
                              style="object-fit: cover; height: 35px; width: 35px"
                              class="rounded"
                              alt=""
                            />
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('name')">
                        <template #default="scope">
                          {{ scope.row.name }}
                        </template>
                        <template #header>
                          <input
                            type="text"
                            :placeholder="$t('name')"
                            v-model="keyword"
                            class="form-control w-100 form-control-solid form-control-lg"
                          />
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('actions')" align="right" width="70">
                        <template #default="scope">
                          <a
                            @click="removeProduct(scope.row.id)"
                            class="btn btn-icon btn-danger-light btn-active-color-danger btn-sm"
                          >
                            <span class="svg-icon svg-icon-1">
                              <inline-svg src="/media/icons/duotune/general/gen027.svg" />
                            </span>
                          </a>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>

                  <div
                    class="card-footer d-flex w-100 justify-content-center align-items-center"
                  >
                    <el-pagination
                      v-model:current-page="pagination.pageNumber"
                      :page-size="pagination.pageSize"
                      layout="prev, pager, next"
                      :total="connectedProducts.length"
                      :hide-on-single-page="true"
                      background
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-end mt-2">
                <!--begin::Button-->
                <a
                  @click="$router.push('/products/brands')"
                  id="kt_ecommerce_add_product_cancel"
                  class="btn btn-light me-5"
                  >{{ $t("cancel") }}</a
                >
                <!--end::Button-->
                <!--begin::Button-->
                <button class="btn btn-primary" type="button" @click="submitAction">
                  <span v-if="isLoading" class="indicator-progress d-block">
                    {{ $t("wait") }}...
                    <span class="spinner-border spinner-border-sm align-middle ms-2" />
                  </span>
                  <span v-if="!isLoading" class="indicator-label">{{ $t("save") }}</span>
                </button>
                <!--end::Button-->
              </div>
              <!-- {{ tag }} -->
              <!-- {{ connectedProducts }} -->
            </div>
            <!--end::main column-->
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from "vuex";
import { ref, defineProps, computed, onMounted, watch } from "vue";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Form, Field, ErrorMessage } from "vee-validate";
import { string } from "yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import { BrandResources } from "@/types";
import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";

import QuillTextEditor from "@/components/Reusable/QuillTextEditor.vue";
import api from "@/utils/ApiHelper";
import i18n from "@/core/plugins/i18n";
const thumbnail = ref("/media/svg/files/blank-image.svg");
const brandForm = ref(null);
const store = useStore();
let props = defineProps({
  id: string,
});
let brandsDto = ref({
  id: "",
  code: "",
  resources: [] as BrandResources[],
  thumbnail: "",
  order: 0,
  thumbnailPath:'',
  slug: "",
  numberOfConnectedShops: 0,
  numberOfConnectedProducts: 0,
  isPublishedOnJetOrderApp: true,
  isPublishedOnShopLink: true,
  connectedShops: [],
});
const pagination = computed(() => store.state.ProductBrands.pagination);
const connectedValue = ref([]);
const isLoading = ref(false);
const langs = computed(() => {
  return store.getters.getSupportedLanguages;
  // [
  //   {
  //     id: "1",
  //     label: "العربية",
  //     code: "ar-JO",
  //     icon: "https://cdn-icons-png.flaticon.com/64/197/197595.png",
  //     direction: null,
  //   },
  //   {
  //     id: "2",
  //     label: "English",
  //     code: "en-US",
  //     icon: "https://cdn-icons-png.flaticon.com/64/197/197595.png",
  //     direction: null,
  //   },
  // ];
});
const selectedItem = ref();

const setSelectedItem = (payload: any) => {
  selectedItem.value = brandsDto.value.resources.find(
    (el) => el.languageId == payload.languageId
  );
  // selectedItem.value = payload;
};
const keyword = ref("");
const imageUrl = ref("/media/svg/files/blank-image.svg");
const schema = yup.object({
  order: yup.number().required(i18n.global.t("fieldRequired")),
  code: yup
    .string()
    .min(4, i18n.global.t("codeNotValid"))
    .test("isValidSlug", i18n.global.t("codeNotValid"), validateCode)
    .required(i18n.global.t("fieldRequired")),
  slug: yup
    .string()
    .min(4, i18n.global.t("slugNotValid"))
    .test("isValidSlug", i18n.global.t("slugNotValid"), validateSlug)
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

const marketShops = computed(() => store.getters.getMarketData.shops);
const connectedProducts = computed(() => store.state.ProductBrands.connectedProducts);
const connectedProductsResult = computed(() =>
  connectedProducts.value
    .slice(
      (pagination.value.pageNumber - 1) * pagination.value.pageSize,
      pagination.value.pageSize * pagination.value.pageNumber
    )
    .filter(
      (p) =>
        p.name.toLowerCase().indexOf(keyword.value.toLocaleLowerCase()) != -1 ||
        !keyword.value
    )
);
const connectedProductsList = computed(
  () => store.state.ProductBrands.searchConnectedProducts
);

const image = (path) => {
  return `https://mfproductimages.s3.amazonaws.com/` + path;
};
function changeImage(event) {
  const file = event.target.files[0];
  const fd = new FormData();
  fd.append("file", file);
  api({ url: Actions.UPLOAD_FILE, method: "post", payload: fd });
  store.dispatch(Actions.UPLOAD_FILE, fd).then((res) => {
    console.log("brandsDto",res[1])
    brandsDto.value.thumbnail = res[1]?.data.data;
    brandsDto.value.thumbnailPath = image(res[1]?.data.data);
    
  });
}
function getProductBrand(id) {
  store.dispatch(Actions.GET_PRODUCT_BRAND, { id }).then((data) => {
    brandsDto.value = data;
    brandsDto.value.connectedShops=data?.shops
    setSelectedItem(brandsDto.value.resources[0]);
    if (data.thumbnail) {
      thumbnail.value = data.thumbnailPath;
    }
  });
}
function setDescription(e, i) {
  brandsDto.value.resources[i].description = e;
}
function getLangLabel(id) {
  return langs.value.find((l) => l.id == id);
}
function getConnectedProducts() {
  store.dispatch(Actions.GET_DETAIL_PRODUCT_BRAND, {
    id: props.id,
  });
  // console.log(id);
}
function getSelectConnectedProducts(query) {
  isLoading.value = true;
  store
    .dispatch(Actions.SEARCH_PRODUCTS, { query: query })
    .then(() => {
      isLoading.value = false;
    })
    .catch(() => {
      isLoading.value = false;
    });
}
function addProduct() {
  isLoading.value = true;
  store
    .dispatch(Actions.ADD_DETAIL_PRODUCT_BRANDS, {
      id: props.id,
      connectedProducts: connectedValue.value,
    })
    .then((res) => {
      isLoading.value = false;
      connectedValue.value = [];
    });
  // console.log(id);
}
function removeProduct(id) {
  store.dispatch(Actions.DELETE_DETAIL_PRODUCT_BRANDS, {
    id: props.id,
    connectedProducts: [id],
  });
}
function updateBrand() {
  isLoading.value = true;
  store
    .dispatch(Actions.EDIT_PRODUCT_BRAND, {
      ...brandsDto.value,
    })
    .then((data) => {
      isLoading.value = false;
      if (data.statusCode == 200) {
        Swal.fire({
          text: i18n.global.t("brandUpdateSucess"),
          icon: "success",
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary",
          },
        });
      }
    });
}
function validateSlug(e) {
  return new Promise<boolean>((resolve, reject) => {
    if (e.length >= 4) {
      isLoading.value = true;
      api({
        url: "ProductBrandCommands/is-valid-slug",
        method: "post",
        payload: { slug: e, id: props.id },
      }).then((res) => {
        isLoading.value = false;
        resolve(res?.data.data as boolean);
      });
    } else reject(false);
  });
}
function validateCode(e) {
  return new Promise<boolean>((resolve, reject) => {
    if (e.length >= 4) {
      isLoading.value = true;
      api({
        url: "ProductBrandCommands/is-valid-code",
        method: "post",
        payload: { code: e, id: props.id },
      }).then((res) => {
        isLoading.value = false;
        resolve(res?.data.data as boolean);
      });
    } else reject(false);
  });
}
function submitAction() {
  brandForm.value.validate().then(({ valid }) => {
    if (valid) {
      updateBrand();
    }
  });
}
const setItemsPerPage = (e) => {
  store.commit(Mutations.UPDATE_PAGINATION, {
    ...pagination.value,
    pageSize: e,
  });
  getConnectedProducts();
};
function initResources() {
  if (langs && langs.value)
    langs.value.forEach((element) => {
      brandsDto.value.resources.push({
        languageId: element.id,
        name: "",
        description: "",
      });
    });
}

getConnectedProducts();
getProductBrand(props.id);

onMounted(async () => {
  setCurrentPageBreadcrumbs(i18n.global.t("details"), [i18n.global.t("brands")]);
});

watch(langs, (newVal) => {
  if (newVal && newVal.length) {
    console.log(newVal);

    initResources();
    selectedItem.value = newVal[0];
  }
});
// editor();
</script>

<style lang="scss">
@import "@/assets/sass/components/variables.custom";

.el-input {
  border-radius: 0.625rem;
}

.el-input__inner {
  border-radius: 0.625rem;
  background-color: #f5f8fa;
  height: 45px;
  border: none;
}

.el-tag {
  background-color: $primary !important;
  color: #fff;

  svg {
    color: #fff;
  }
}
</style>
