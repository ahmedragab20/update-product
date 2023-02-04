<template>
  <div>
    <div class="d-flex flex-column gap-7 gap-xl-10">
      <!-- Product Modifiers -->
      <ProductModifiers
        :modifiers="allModifiers"
        :product="props.product"
        :product-modifiers="productModifiers"
      />
      <!-- Shipping data -->
      <ShippingData :product="product" />
      <div
        class="card card-flush"
        :class="{
          'gradient-border':
            updateProductState.changedSections.includes('appearance-data'),
        }"
      >
        <div class="card-header">
          <div class="card-title">Appearance Data</div>
        </div>
        <div class="card-body">
          <div>
            <label class="form-label">Product Labels</label>
            <div>
              <Dropdown
                :items="productLabels"
                :multiSelect="true"
                :outter-ids="selectedProductLabelIds"
                bodyClasses="w-100 text-truncate text-capitalize"
                headClasses="fw-bold p-3 rounded-3 shadow-sm text-capitalize btn-lg mb-3"
                max-height="200px"
                @selectedItem="dropdownSelectedProductLabels"
              >
                <template #headerContent="{ item }">
                  <span
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span class="w-100 text-truncate">
                      select Product Labels
                    </span>
                    <strong>
                      <i
                        :class="item.isOpened ? 'bi-arrow-up' : 'bi-arrow-down'"
                      ></i>
                    </strong>
                  </span>
                </template>
                <template #bodyContent="{ item }">
                  <div
                    :style="[
                      selectedProductLabelIds.includes(item.id)
                        ? 'background-color: #1bc5bd; color: #fff;'
                        : '',
                    ]"
                    class="px-sm-5 py-sm-3 px-3 py-1 w-100 d-flex justify-content-between align-items-center"
                  >
                    <span>
                      {{ item.name }}
                    </span>
                    <i
                      v-if="selectedProductLabelIds.includes(item.id)"
                      class="bi bi-check text-white"
                      style="font-size: large"
                    ></i>
                  </div>
                </template>
              </Dropdown>
              <!-- Tags -->
              <div class="d-flex gap-3 flex-wrap my-4">
                <span
                  v-for="(item, $index) in selectedProductLabelItems"
                  :key="$index"
                  class="badge badge-secondary"
                >
                  {{ item.name }}
                </span>
              </div>
            </div>
          </div>
          <div>
            <label class="form-label">Product Tags</label>
            <div>
              <Dropdown
                :items="productTags"
                :multiSelect="true"
                :outter-ids="selectedProductTagIds"
                bodyClasses="w-100 text-truncate text-capitalize"
                headClasses="fw-bold p-3 rounded-3 shadow-sm text-capitalize btn-lg mb-3"
                max-height="200px"
                @selectedItem="dropdownSelectedProductTags"
              >
                <template #headerContent="{ item }">
                  <span
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span class="w-100 text-truncate">
                      Select Product Tags
                    </span>
                    <strong>
                      <i
                        :class="item.isOpened ? 'bi-arrow-up' : 'bi-arrow-down'"
                      ></i>
                    </strong>
                  </span>
                </template>
                <template #bodyContent="{ item }">
                  <div
                    :style="[
                      selectedProductTagIds.includes(item.id)
                        ? 'background-color: #1bc5bd; color: #fff;'
                        : '',
                    ]"
                    class="px-sm-5 py-sm-3 px-3 py-1 w-100 d-flex justify-content-between align-items-center"
                  >
                    <span>
                      {{ item.name }}
                    </span>
                    <i
                      v-if="selectedProductTagIds.includes(item.id)"
                      class="bi bi-check text-white"
                      style="font-size: large"
                    ></i>
                  </div>
                </template>
              </Dropdown>
              <!-- Tags -->
              <div
                v-if="
                  selectedProductTagItems && selectedProductTagItems.length > 0
                "
                class="d-flex gap-3 flex-wrap my-4"
              >
                <span
                  v-for="(item, $index) in selectedProductTagItems"
                  :key="$index"
                  class="badge badge-secondary"
                >
                  {{ item.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body pt-0">
          <div
            v-if="appearanceErrorMsg"
            class="card-body text-danger px-0 d-flex align-items-center gap-2"
          >
            <i class="bi bi-cone text-danger"></i>
            {{ appearanceErrorMsg }}
          </div>
          <SaveChangeBtn
            :btnSubmit="saveAppearanceDataChanges"
            :elChanged="appearanceDataChanged"
            :elLoading="appearanceDataLoading"
            :btn-reverse-submit="reverseAppearanceData"
          />
        </div>
      </div>
      <div class="card card-flush">
        <div class="card-header">
          <div class="card-title">Selling data</div>
        </div>
        <!-- up selling -->
        <div class="card-body">
          <h4>Up selling Data</h4>
          <!-- add new product -->
          <div>
            <div class="d-flex justify-content-end">
              <a
                class="btn btn-light-primary btn-sm"
                data-bs-target="#add-up-selling-modal"
                data-bs-toggle="modal"
                href="#"
                >+ Add new one</a
              >
            </div>
          </div>
          <!-- up selling data modal -->
          <BootstrapModal
            :btnSubmit="saveUpSellingChanges"
            :is-disabled="upSellingProductsValues.length === 0"
            :is-loading="upSellingLoading"
            btnText="Save Changes"
            headline="Add New Product To The Up Selling"
            target="add-up-selling-modal"
          >
            <template #content>
              <div style="min-height: 90px">
                <UpSelling
                  :items="upSellingProducts"
                  @values="selectedUpSellingValues"
                />
                <section class="mt-3">
                  <div
                    v-if="upSellingDoneMessage && !upSellingErrorMessage"
                    class="text-success"
                  >
                    {{ upSellingDoneMessage }}
                  </div>
                  <div
                    v-else-if="upSellingErrorMessage"
                    class="text-danger text-truncate"
                  >
                    {{ upSellingErrorMessage }}
                  </div>
                </section>
              </div>
            </template>
          </BootstrapModal>
          <!-- data table for up selling -->
          <div class="overflow-auto">
            <table
              v-if="upSellingProducts.length > 0"
              class="table gs-3 gy-3 gx-5"
            >
              <thead>
                <tr
                  class="fw-bold fs-5 text-gray-800 border-bottom border-gray-200 text-capitalize"
                >
                  <th class="text-truncate">Product name</th>
                  <th class="text-truncate">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in upSellingProducts" :key="index">
                  <td>
                    <div class="d-flex gap-2">
                      <div
                        class="rounded-circle overflow-hidden d-flex justify-content-center align-items-center"
                        style="width: 25px; height: 25px"
                      >
                        <img
                          :src="item.thumbnail"
                          style="width: 100%; height: 100%; object-fit: cover"
                        />
                      </div>
                      <p
                        class="text-truncate my-auto"
                        style="max-width: 220px"
                        v-text="item.name"
                      />
                    </div>
                  </td>
                  <td>
                    <div>
                      <button
                        @click="removeUpSellingProductDialog(item.id)"
                        class="btn btn-text-danger btn-sm"
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-else>
              <p class="text-center">No Products</p>
            </div>
          </div>
        </div>
        <!-- cross selling -->
        <div class="card-body">
          <h4>Cross selling Data</h4>
          <!-- add new product -->
          <div>
            <div class="d-flex justify-content-end">
              <a
                class="btn btn-light-primary btn-sm"
                data-bs-target="#add-cross-selling-modal"
                data-bs-toggle="modal"
                href="#"
                >+ Add new one</a
              >
            </div>
          </div>
          <!-- up selling data modal -->
          <BootstrapModal
            :btnSubmit="saveCrossSellingChanges"
            :isLoading="crossSellingLoading"
            btnText="Save Changes"
            headline="Add New Product To The Cross Selling"
            target="add-cross-selling-modal"
          >
            <template #content>
              <div style="min-height: 90px">
                <UpSelling
                  :items="crossSellingProducts"
                  @values="selectedCrossSellingValues"
                />
                <section class="mt-3">
                  <div
                    v-if="crossSellingDoneMessage && !crossSellingErrorMessage"
                    class="text-success"
                  >
                    {{ crossSellingDoneMessage }}
                  </div>
                  <div
                    v-else-if="crossSellingErrorMessage"
                    class="text-danger text-truncate"
                  >
                    {{ crossSellingErrorMessage }}
                  </div>
                </section>
              </div>
            </template>
          </BootstrapModal>
          <!-- data table for cross selling -->
          <div class="overflow-auto">
            <table
              v-if="crossSellingProducts.length > 0"
              class="table gs-3 gy-3 gx-5"
            >
              <thead>
                <tr
                  class="fw-bold fs-5 text-gray-800 border-bottom border-gray-200 text-capitalize"
                >
                  <th class="text-truncate">Product name</th>
                  <th class="text-truncate">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in crossSellingProducts" :key="index">
                  <td>
                    <div class="d-flex gap-2">
                      <div
                        class="rounded-circle overflow-hidden d-flex justify-content-center align-items-center"
                        style="width: 25px; height: 25px"
                      >
                        <img
                          :src="item.thumbnail"
                          style="width: 100%; height: 100%; object-fit: cover"
                        />
                      </div>
                      <p
                        class="text-truncate my-auto"
                        style="max-width: 220px"
                        v-text="item.name"
                      />
                    </div>
                  </td>
                  <td>
                    <div>
                      <button
                        class="btn btn-text-danger btn-sm"
                        @click="removeCrossSellingProductDialog(item.id)"
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-else>
              <p class="text-center">No Products</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Points system -->
      <div
        class="card card-flush"
        :class="{
          'gradient-border':
            updateProductState.changedSections.includes('points-system'),
        }"
      >
        <div class="card-header">
          <div class="card-title">Points System</div>
        </div>
        <div class="card-body">
          <div class="form-check form-check-custom form-check-solid mb-4">
            <input
              id="followTheStore"
              v-model="pointsSystem.customSettings"
              checked
              class="form-check-input"
              name="pointsSystem"
              type="radio"
              value="0"
              @input="pointsSystemChanged = true"
            />
            <label class="form-check-label" for="followTheStore"
              >Follow the store</label
            >
          </div>
          <div class="form-check form-check-custom form-check-solid mb-3">
            <input
              id="customSettings"
              v-model="pointsSystem.customSettings"
              class="form-check-input"
              name="pointsSystem"
              type="radio"
              value="1"
              @input="pointsSystemChanged = true"
            />
            <label class="form-check-label" for="customSettings"
              >Custom settings</label
            >
          </div>
          <div v-if="pointsSystem.customSettings === '1'" class="my-3">
            <label class="form-label">Points Number</label>
            <input
              v-model.number="pointsSystem.term"
              class="form-control"
              placeholder="enter the number of points"
              type="text"
              @input="pointsSystemChanged = true"
            />
          </div>
          <div class="my-3">
            <small
              v-if="pointSystemErrorMessage"
              class="fw-bold badge badge-light-danger"
            >
              🥲 {{ pointSystemErrorMessage }}
            </small>
          </div>
          <div class="card-body py-0 px-0">
            <SaveChangeBtn
              :btnReverseSubmit="reversePointsSystem"
              :btnSubmit="savePointsSystem"
              :elChanged="pointsSystemChanged"
              :elLoading="pointsSystemLoading"
            />
          </div>
        </div>
      </div>
      <!-- meta tags -->
      <div
        class="card card-flush"
        :class="{
          'gradient-border':
            updateProductState.changedSections.includes('meta-options'),
        }"
      >
        <div class="card-header">
          <div class="card-title">Meta Options</div>
        </div>
        <div class="card-body">
          <form @submit.prevent>
            <label class="form-label">Meta Title</label>
            <input
              v-model="productMetaTags.title"
              class="form-control"
              placeholder="Type A Meta Title"
              type="text"
              @input="metaOptionsChanged = true"
            />
            <small class="text-muted fw-bold ps-1">
              Set a meta tag title. Recommended to be simple and precise
              keywords.
            </small>
          </form>
          <div class="editor my-3">
            <label class="my-4 form-label">Meta Tag Description</label>
            <Editor>
              <template #upper></template>
              <template #fields>
                <keep-alive>
                  <div>
                    <QuillEditor
                      v-model:content="productMetaTags['description']"
                      :toolbar="editorOptions.toolbar"
                      contentType="html"
                      quill-discription
                      @input="metaOptionsChanged = true"
                    />
                  </div>
                </keep-alive>
              </template>
            </Editor>
            <small class="text-muted fw-bold ps-1">
              Set a meta tag description to the product for increased SEO
              ranking.
            </small>
          </div>
          <form class="my-4" @submit.prevent="metaPushTagHandler(tag)">
            <label class="mb-3 form-label">Meta Tag Keywords</label>
            <input
              v-model="tag"
              class="form-control mb-4"
              placeholder="type a tag"
              type="text"
              @keyup.enter.prevent="metaPushTagHandler(tag)"
            />
            <div
              v-if="metaTags && metaTags.length > 0"
              class="d-flex flex-wrap gap-5"
            >
              <span
                v-for="(tag, $index) in metaTags"
                :key="$index"
                class="badge badge-light position-relative d-flex gap-3"
              >
                {{ tag }}
                <span title="remove tag" @click="metaRemoveTagHandler(tag)">
                  <i class="bi-x" style="font-size: large; cursor: pointer"></i>
                </span>
              </span>
            </div>
            <div v-else>
              <span class="p-1 h6 text-muted fw-bold small">
                No Meta Tags. add one?!
              </span>
            </div>
          </form>
        </div>
        <div class="card-body">
          <SaveChangeBtn
            :btnReverseSubmit="reverseMetaChanges"
            :btnSubmit="saveMetaChanges"
            :elChanged="metaOptionsChanged"
            :elLoading="metaTagsLoading"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, ref } from "vue";
import Api from "@/utils/ApiHelper";
import BootstrapModal from "@/components/Reusable/BootstrapModal.vue";
import Dropdown from "@/components/Reusable/Dropdown.vue";
import { QuillEditor } from "@vueup/vue-quill";
import Editor from "@/components/Reusable/Editor.vue";
import SaveChangeBtn from "./-SaveChangeBtn.vue";
import ProductModifiers from "./-ProductModifiers.vue";
import ShippingData from "./-ShippingData.vue";
import UpSelling from "./-UpSelling.vue";

import { computed, watch, watchEffect } from "@vue/runtime-core";
import { swalAlert } from "@/utils/helpers";
import { useStore } from "vuex";
import { Product } from "@/types";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  currentTab: Number,
});

const store = useStore();

const updateProductState = computed(() => store.state.UpdateProduct);
const updateChangedSections = ({ sectionId, remove }) => {
  store.commit("ADD_CHANGED_SECTIONS", {
    sectionId,
    remove,
  });
};

const initializeComponentsData = ({ name, content }) => {
  store.commit("INITIALIZE_DATA", {
    name,
    content,
  });
};

/* APPEARANCE DATA LOGIC BLOCK */
const appearanceDataLoading = ref<boolean>(false);
const appearanceDataChanged = ref<string | boolean>(false);
/* Product Labels */
//* <MultiSelect "dropdown"> local store
const productLabels = ref();
const selectedProductLabelIds = ref<any[]>([]); //-> the selected items' IDs
const selectedProductLabelItems = ref(); //-> the final result of the selected items (what you gonna use in the template)

const findSelectedProductLabels = (ids: Array<any> = []) => {
  selectedProductLabelItems.value = productLabels.value?.filter((item) =>
    ids?.includes(item.id)
  );
};
// where you receive the data from the dropdown component
const dropdownSelectedProductLabels = (
  selectedItemsCallback: any,
  isGlobal?: boolean
) => {
  if (!isGlobal) {
    appearanceDataChanged.value = true;
  }
  selectedProductLabelIds.value = selectedItemsCallback;
  findSelectedProductLabels(selectedItemsCallback);
};

/* Product Tags */
//* <MultiSelect "dropdown"> local store
const productTags = ref<any[]>([]);
const selectedProductTagIds = ref<any[]>([]); //-> the selected items' IDs
const selectedProductTagItems = ref<any[]>([]); //-> the final result of the selected items (what you gonna use in the template)

const findSelectedProductTags = (ids: Array<any> = []) => {
  selectedProductTagItems.value = productTags.value.filter((item) =>
    ids.includes(item.id)
  );
};
// where you receive the data from the dropdown component
const dropdownSelectedProductTags = (
  selectedItemsCallback: any,
  isGlobal?: boolean
) => {
  if (!isGlobal) {
    appearanceDataChanged.value = true;
  }
  selectedProductTagIds.value = selectedItemsCallback;
  // debugger
  findSelectedProductTags(selectedItemsCallback);
};

// Save Appearance data changes
const appearanceErrorMsg = ref("");
const saveAppearanceDataChanges = async () => {
  try {
    appearanceDataLoading.value = true;
    const labels = selectedProductLabelItems.value.map((el): [string] => el.id);
    const tags = selectedProductTagItems.value.map((el): [string] => el.id);

    const payload = {
      id: props.product.id,
      productAppearanceData: {
        labels,
        tags,
      },
    };

    const reqData = {
      method: "post",
      url: "/ProductCommands/update-product-appearance",
      payload,
    };
    const { data }: any = await Api(reqData);

    if (data?.succeeded) {
      appearanceDataChanged.value = "done";
      appearanceErrorMsg.value = "";

      initializeComponentsData({
        name: "appearanceData",
        content: {
          tagProducts: payload.productAppearanceData.tags.toString(),
          labelProducts: payload.productAppearanceData.labels.toString(),
        },
      });
    } else {
      appearanceErrorMsg.value = data?.message;
    }
  } catch (error) {
    console.error(error);
  } finally {
    appearanceDataLoading.value = false;
  }
};

const reverseAppearanceData = () => {
  const source = updateProductState.value.appearanceData;

  dropdownSelectedProductTags(source.tagProducts?.split(","), true);
  dropdownSelectedProductLabels(source.labelProducts?.split(","), true);
  appearanceDataChanged.value = false;
  appearanceErrorMsg.value = "";
};

/* UPSELLING AND CROSS-SELLING LOGIC BLOCK */
// upselling
const upSellingProductsValues = ref<any[]>([]);
const upSellingProducts = ref<any[]>([]);
const upSellingLoading = ref(false);
const upSellingErrorMessage = ref("");
const upSellingDoneMessage = ref("");

const selectedUpSellingValues = (values: any): void => {
  upSellingProductsValues.value = values;
};
const saveUpSellingChanges = async () => {
  try {
    upSellingLoading.value = true;
    upSellingProducts.value = [
      ...upSellingProductsValues.value,
      ...props.product.upsellProducts,
    ];
    const newUpSelling = upSellingProductsValues.value?.map(
      (el): [string] => el.id
    );
    const currentUpSelling = props.product.upsellProducts?.map(
      (el): [string] => el.id
    );
    const upSellingProductsPayload = [...newUpSelling, ...currentUpSelling];

    const payload = {
      id: props.product.id,
      upSellingProducts: upSellingProductsPayload,
    };
    const reqData = {
      method: "post",
      url: "/ProductCommands/add-upselling-products",
      payload,
    };

    const { data }: any = await Api(reqData);
    if (!data.succeeded) {
      upSellingProducts.value = [
        ...upSellingProductsValues.value,
        props.product.upsellProducts,
      ];
      upSellingErrorMessage.value = data.message;
    } else
      upSellingDoneMessage.value = `Great, we're done. You can close the modal now!`;
  } catch (error) {
    console.error(error);
  } finally {
    upSellingLoading.value = false;
  }
};

const removeUpSellingProduct = async (payload: any): Promise<any> => {
  try {
    const reqData = {
      method: "post",
      url: "/ProductCommands/remove-upselling-products",
      payload,
    };

    const { data }: any = await Api(reqData);
    if (data.succeeded) {
      upSellingProducts.value = upSellingProducts.value.filter(
        (i) => !payload?.upSellingProducts.includes(i.id)
      );
      upSellingProductsValues.value = upSellingProductsValues.value.filter(
        (i) => !payload?.upSellingProducts.includes(i.id)
      );
    }
  } catch (error) {
    console.error(error);
  }
};

const removeUpSellingProductDialog = (id: never) => {
  const payload = {
    id: props.product.id,
    upSellingProducts: [],
  };

  payload.upSellingProducts.push(id);

  swalAlert({
    title: "We're Done!",
    text: "The Data has been saved!",
    handler: removeUpSellingProduct,
    payload: payload,
  });
};

// crossSelling
const crossSellingProductsValues = ref<any[]>([]);
const crossSellingProducts = ref<any[]>([]);
const crossSellingLoading = ref(false);
const crossSellingErrorMessage = ref("");
const crossSellingDoneMessage = ref("");

const selectedCrossSellingValues = (values: any): void => {
  crossSellingProductsValues.value = values;
};
const saveCrossSellingChanges = async () => {
  try {
    crossSellingLoading.value = true;
    crossSellingProducts.value = [
      ...crossSellingProductsValues.value,
      ...crossSellingProducts.value,
    ];
    const newCrossSelling = crossSellingProductsValues.value?.map(
      (el): [string] => el.id
    );
    const currentCrossSelling = props.product.crosssellProducts?.map(
      (el): [string] => el.id
    );
    const crossSellingProductsPayload = [
      ...newCrossSelling,
      ...currentCrossSelling,
    ];

    const payload = {
      id: props.product.id,
      crossSellProducts: crossSellingProductsPayload,
    };
    const reqData = {
      method: "post",
      url: "/ProductCommands/Add-crossselling-products",
      payload,
    };

    const { data }: any = await Api(reqData);
    if (!data.succeeded) {
      crossSellingProducts.value = [
        ...crossSellingProductsValues.value,
        props.product.crosssellProducts,
      ];
      crossSellingErrorMessage.value = data.message;
    } else
      crossSellingDoneMessage.value = `Great, we're done. You can close the modal now!`;
  } catch (error) {
    console.error(error);
  } finally {
    crossSellingLoading.value = false;
  }
};

const removeCrossSellingProduct = async (payload: any): Promise<any> => {
  try {
    const reqData = {
      method: "post",
      url: "/ProductCommands/remove-crossselling-products",
      payload,
    };

    const { data }: any = await Api(reqData);
    if (data.succeeded) {
      crossSellingProducts.value = crossSellingProducts.value.filter(
        (i) => !payload?.crossSellProducts.includes(i.id)
      );
      crossSellingProductsValues.value =
        crossSellingProductsValues.value.filter(
          (i) => !payload?.crossSellProducts.includes(i.id)
        );
    }
  } catch (error) {
    console.error(error);
  }
};

const removeCrossSellingProductDialog = (id: never) => {
  const payload = {
    id: props.product.id,
    crossSellProducts: [],
  };

  payload.crossSellProducts.push(id);

  swalAlert({
    title: "We're Done!",
    text: "The Data has been saved!",
    handler: removeCrossSellingProduct,
    payload: payload,
  });
};
/* END UP SELLING AND CROSS SELLING LOGIC BLOCK */

/* Points System logic */
const pointsSystem = ref({
  customSettings: "0",
  term: null,
});

const pointsSystemChanged = ref<boolean | string>(false);
const pointsSystemLoading = ref<boolean>(false);
const pointSystemErrorMessage = ref<string>("");
// save points system change
const savePointsSystem = async () => {
  try {
    pointsSystemLoading.value = true;
    const payload = {
      id: props.product.id,
      pointsSystemClassId:
        pointsSystem.value.customSettings === "1" ? "2" : "1",
      pointsSystemValue:
        pointsSystem.value.customSettings === "1" ? pointsSystem.value.term : 0,
    };

    const reqData = {
      method: "post",
      url: "/ProductCommands/update-product-points-system",
      payload,
    };

    const { data }: any = await Api(reqData);

    if (data?.succeeded) {
      pointsSystemChanged.value = "done";
      pointSystemErrorMessage.value = "";

      initializeComponentsData({
        name: "pointsSystem",
        content: {
          pointsClassId: payload.pointsSystemClassId,
          pointsClassValue: payload.pointsSystemValue,
        },
      });
    } else {
      pointSystemErrorMessage.value = data.message;
    }
  } catch (error) {
    console.error(error);
  } finally {
    pointsSystemLoading.value = false;
  }
};
const reversePointsSystem = async () => {
  const source = updateProductState.value.pointsSystem;
  pointsSystemChanged.value = false;
  pointSystemErrorMessage.value = "";

  initPointSystem(source);
};

const initPointSystem = (source: any) => {
  if (source.pointsClassId === "2") {
    pointsSystem.value.customSettings = "1";
  } else {
    pointsSystem.value.customSettings = "0";
  }
  pointsSystem.value.term = source.pointsClassValue;
  initializeComponentsData({
    name: "pointsSystem",
    content: {
      pointsClassId: source.pointsClassId,
      pointsClassValue: source.pointsClassValue,
    },
  });
};

/* End Points System logic */

/* ADD META TAG LOGIC BLOCK */
const metaOptionsChanged = ref<any>(false);
const metaTagsLoading = ref<any>(false);
const metaTagsMsg = ref<string>("");

// Editor Logic
const productMetaTags = ref<any>({
  title: null,
  description: null,
  keywords: "",
});
const editorOptions = ref({
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
  ],
});

// meta add tag logic
const tag = ref<any>("");
const metaTags = ref<any[]>([]);

const metaPushTagHandler = (text: string) => {
  if (text && metaTags.value && !metaTags.value.includes(text)) {
    metaTags.value.push(text);
    metaOptionsChanged.value = true;
  }
  tag.value = "";
};
const metaRemoveTagHandler = (text: string) => {
  metaTags.value = metaTags.value.filter((item) => item !== text);
  metaOptionsChanged.value = true;
};

const saveMetaChanges = async () => {
  try {
    metaTagsLoading.value = true;

    const payload = {
      id: props.product?.id,
      metaData: {
        title: productMetaTags.value?.title,
        description: productMetaTags.value?.description,
        keywords: metaTags.value?.toString(),
      },
    };

    const reqData = {
      method: "post",
      url: "/ProductCommands/update-product-metadata",
      payload,
    };

    const { data }: any = await Api(reqData);
    if (data.succeeded) {
      metaOptionsChanged.value = "done";
      metaTagsMsg.value = "";

      initializeComponentsData({
        name: "metaOptions",
        content: {
          description: payload.metaData.description,
          title: payload.metaData.title,
          keywords: payload.metaData.keywords,
        },
      });
    } else metaTagsMsg.value = data.message;
  } catch (error) {
    console.error(error);
  } finally {
    metaTagsLoading.value = false;
  }
};

const reverseMetaChanges = () => {
  const source = updateProductState.value.metaOptions;

  initMetaOptions(source);

  metaOptionsChanged.value = false;
  metaTagsMsg.value = "";
};

const initMetaOptions = (source) => {
  productMetaTags.value.description = source.description || `<p><br /></p>`;
  productMetaTags.value.title = source.title;

  if (![null, undefined, ""].includes(source.keywords)) {
    productMetaTags.value.keywords = source.keywords?.split(",");
    metaTags.value = source.keywords?.split(",") || [];
  } else {
    metaTags.value = [];
  }

  initializeComponentsData({
    name: "metaOptions",
    content: {
      description: source.description,
      title: source.title,
      keywords: source.keywords,
    },
  });
};

/* Fetch data */
const fetchProductLabels = async () => {
  try {
    const reqData = {
      method: "get",
      url: "/ProductLabelQueries/get-labels",
    };
    const { data }: any = await Api(reqData);
    if (data?.succeeded) {
      productLabels.value = data.data;
    } else console.error(data.message);
  } catch (error) {
    console.error(error);
  }
};
const fetchProductTags = async () => {
  try {
    const reqData = {
      method: "get",
      url: "/ProductTagQueries/get-tags",
    };
    const { data }: any = await Api(reqData);
    if (data?.succeeded) {
      productTags.value = data.data;
    } else console.error(data.message);
  } catch (error) {
    console.error(error);
  }
};

const allModifiers = ref<any>([]);

const fetchAllModifiers = async () => {
  try {
    const reqData = {
      method: "get",
      url: "/ProductModifierQueries/get-modifiers",
    };
    const { data }: any = await Api(reqData);
    if (data?.succeeded) {
      allModifiers.value = data.data;
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error(error);
  }
};

const productModifiers = ref<any[]>([]);

const fetchProductModifiers = async () => {
  try {
    const reqData = {
      method: "get",
      url: "/ProductQueries/get-product-modifiers",
      payload: {
        id: props.product.id,
      },
    };
    const { data }: any = await Api(reqData);
    if (data?.succeeded) {
      productModifiers.value = data.data;
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error(error);
  }
};

const initData = (source) => {
  // up&cross selling products
  upSellingProducts.value = source?.upsellProducts;
  crossSellingProducts.value = source?.crosssellProducts;
  // meta data (options)
  if (source.productMetaData) {
    initMetaOptions(source.productMetaData);
  }
  initPointSystem(source);
};
onBeforeMount(async () => {
  await fetchProductLabels();
  await fetchProductTags();
  await fetchAllModifiers();
  await fetchProductModifiers();
});
onMounted(() => {
  if (props.product) {
    initData(props.product);
    initializeComponentsData({
      name: "appearanceData",
      content: {
        tagProducts: props.product.tagProducts?.toString(),
        labelProducts: props.product.labelProducts?.toString(),
      },
    });
  }
});
watch(
  () => props.product,
  (newValue) => {
    if (newValue) {
      initData(newValue);
      initializeComponentsData({
        name: "appearanceData",
        content: {
          tagProducts: newValue.tagProducts?.toString(),
          labelProducts: newValue.labelProducts?.toString(),
        },
      });
    }
  }
);
watch(
  () => productTags.value,
  (newValue) => {
    if (newValue) {
      dropdownSelectedProductTags(props.product.tagProducts, true);
    }
  }
);
watch(
  () => productLabels.value,
  (newValue) => {
    // product labels
    if (newValue) {
      dropdownSelectedProductLabels(props.product.labelProducts, true);
    }
  }
);
watch(
  () => appearanceDataChanged.value,
  (newV, oldValue) => {
    if ((newV && !oldValue) || (newV && oldValue === "done")) {
      updateChangedSections({
        sectionId: "appearance-data",
        remove: false,
      });
    } else {
      updateChangedSections({
        sectionId: "appearance-data",
        remove: true,
      });
    }
  }
);
watch(
  () => pointsSystemChanged.value,
  (newV, oldValue) => {
    if ((newV && !oldValue) || (newV && oldValue === "done")) {
      updateChangedSections({
        sectionId: "points-system",
        remove: false,
      });
    } else {
      updateChangedSections({
        sectionId: "points-system",
        remove: true,
      });
    }
  }
);
watch(
  () => metaOptionsChanged.value,
  (newV, oldValue) => {
    if ((newV && !oldValue) || (newV && oldValue === "done")) {
      updateChangedSections({
        sectionId: "meta-options",
        remove: false,
      });
    } else {
      updateChangedSections({
        sectionId: "meta-options",
        remove: true,
      });
    }
  }
);
</script>
<style scoped>
td > div {
  height: 40px;
  display: flex;
  align-items: center;
}
</style>
