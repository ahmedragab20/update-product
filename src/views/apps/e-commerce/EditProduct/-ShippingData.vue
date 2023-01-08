<template>
  <div
    class="card card-flush"
    :class="{'gradient-border' : updateProductState.changedSections.includes('shipping-data')}"
  >
    <div class="card-header">
      <div class="card-title">Shipping Data</div>
    </div>
    <div class="card-body">
      <div class="fv-row">
        <!--begin::Input-->
        <div class="form-check form-check-custom form-check-solid mb-2">
          <input
            class="form-check-input"
            type="checkbox"
            id="kt_ecommerce_add_product_shipping_checkbox"
            value="1"
            v-model.number="isPhysicalProduct"
          />
          <label
            class="form-check-label"
            for="kt_ecommerce_add_product_shipping_checkbox"
          >This is a physical product</label
          >
        </div>
        <!--end::Input-->
        <!--begin::Description-->
        <div class="text-muted fs-7">
          Set if the product is a physical or digital item. Physical products
          may require shipping.
        </div>
        <!--end::Description-->
      </div>
      <div v-if="isPhysicalProduct" class="mt-4">
        <form @submit.prevent>
          <div class="mb-10 fv-row">
            <!--begin::Label-->
            <label class="form-label">Weight</label>
            <!--end::Label-->
            <!--begin::Editor-->
            <input
              type="number"
              name="weight"
              class="form-control mb-2"
              placeholder="Product weight"
              v-model="inputs.weightInKG"
              @input="shippingDataChanged = true"
            />
            <!--end::Editor-->
            <!--begin::Description-->
            <div class="text-muted fs-7">
              Set a product weight in kilograms (kg).
            </div>
            <!--end::Description-->
          </div>
          <div class="mb-10 fv-row">
            <!--begin::Label-->
            <label class="form-label">Dimension</label>
            <!--end::Label-->
            <!--begin::Input-->
            <div class="d-flex flex-wrap flex-sm-nowrap gap-3">
              <input
                type="number"
                name="width"
                class="form-control mb-2"
                placeholder="Width (w)"
                v-model.number="inputs.widthInCM"
                @input="shippingDataChanged = true"
              />
              <input
                type="number"
                name="height"
                class="form-control mb-2"
                placeholder="Height (h)"
                v-model.number="inputs.heightInCM"
                @input="shippingDataChanged = true"
              />
              <input
                type="number"
                name="length"
                class="form-control mb-2"
                placeholder="Length (l)"
                v-model.number="inputs.lengthInCM"
                @input="shippingDataChanged = true"
              />
            </div>
            <!--end::Input-->
            <!--begin::Description-->
            <div class="text-muted fs-7">
              Enter the product dimensions in centimeters (cm).
            </div>
            <!--end::Description-->
          </div>
          <div>
            <label class="form-label">Vehicle Types</label>
            <div>
              <Dropdown
                @selectedItem="vehicleTypesItems"
                @input="shippingDataChanged = true"
                :items="vehicleTypes"
                :outter-ids="selectedVehicleTypesIds"
                :multiSelect="true"
                headClasses="fw-bold p-3 rounded-3 shadow-sm text-capitalize btn-lg mb-3"
                bodyClasses="w-100 text-truncate text-capitalize"
                max-height="200px"
              >
                <template #headerContent="{ item }">
                  <span
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span class="w-100 text-truncate"> select Types </span>
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
                      selectedVehicleTypesIds.includes(item.id)
                        ? 'background-color: #1bc5bd; color: #fff;'
                        : '',
                    ]"
                    class="px-sm-5 py-sm-3 px-3 py-1 w-100 d-flex justify-content-between align-items-center"
                  >
                    <span>
                      {{ item.value }}
                    </span>
                    <i
                      v-if="selectedVehicleTypesIds.includes(item.id)"
                      class="bi bi-check text-white"
                      style="font-size: large"
                    ></i>
                  </div>
                </template>
              </Dropdown>
              <!-- Tags -->
              <div class="d-flex gap-3 flex-wrap my-4">
                <span
                  v-for="(item, $index) in selectedItems"
                  :key="$index"
                  class="badge badge-secondary"
                >
                  {{ item.value }}
                </span>
              </div>
            </div>
          </div>
          <div>
            <label class="form-label">Vehicle Special Requirements</label>
            <div>
              <Dropdown
                @selectedItem="vehicleSpecialRequirementsItems"
                @input="shippingDataChanged = true"
                :items="vehicleSpecialRequirements"
                :outter-ids="VehicleSpecialRequirementsIds"
                :multiSelect="true"
                headClasses="fw-bold p-3 rounded-3 shadow-sm text-capitalize btn-lg mb-3"
                bodyClasses="w-100 text-truncate text-capitalize"
              >
                <template #headerContent="{ item }">
                  <span
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span class="w-100 text-truncate">
                      Select Requirements
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
                      VehicleSpecialRequirementsIds.includes(item.id)
                        ? 'background-color: #1bc5bd; color: #fff;'
                        : '',
                    ]"
                    class="px-sm-5 py-sm-3 px-3 py-1 w-100 d-flex justify-content-between align-items-center"
                  >
                    <span>
                      {{ item.value }}
                    </span>
                    <i
                      v-if="VehicleSpecialRequirementsIds.includes(item.id)"
                      class="bi bi-check text-white"
                      style="font-size: large"
                    ></i>
                  </div>
                </template>
              </Dropdown>
              <!-- Tags -->
              <div class="d-flex gap-3 flex-wrap my-4">
                <span
                  v-for="(
                    item, $index
                  ) in selectedVehicleSpecialRequirementsItems"
                  :key="$index"
                  class="badge badge-secondary"
                >
                  {{ item.value }}
                </span>
              </div>
            </div>
          </div>
          <div>
            <label class="form-label"> Delivery Time Category Id </label>
            <div>
              <Dropdown
                @selectedItem="dropdownSelectedDeliveryTimeCategory"
                @input="shippingDataChanged = true"
                :items="deliveryTypeCategories"
                headClasses="fw-bold p-3 rounded-3 shadow-sm text-capitalize btn-lg mb-8"
                bodyClasses=""
                maxHeight="120px"
              >
                <template #headerContent="{ item }">
                  <span
                    class="d-flex justify-content-between align-items-center"
                  >
                    {{
                      selectedDeliveryTimeCategory
                        ? selectedDeliveryTimeCategory.value
                        : "Select Delivery Time Category"
                    }}
                    <strong>
                      <i
                        :class="item.isOpened ? 'bi-arrow-up' : 'bi-arrow-down'"
                      ></i>
                    </strong>
                  </span>
                </template>
                <template #bodyContent="{ item }">
                  <div
                    class="px-sm-5 py-sm-3 px-3 py-1 w-100 text-truncate text-capitalize"
                    :style="
                      selectedDeliveryTimeCategory &&
                      selectedDeliveryTimeCategory.id === item.id
                        ? 'background-color: #1bc5bd; color: #fff'
                        : ''
                    "
                    v-text="item.value"
                  />
                </template>
              </Dropdown>
            </div>
          </div>
        </form>
        <div
          v-if="errorMessage"
          class="card-body text-danger px-0 d-flex align-items-center gap-2"
        >
          <i class="bi bi-cone text-danger"></i>
          {{ errorMessage }}
        </div>
        <SaveChangeBtn
          :elChanged="shippingDataChanged"
          :elLoading="isShippingDataLoading"
          :btnSubmit="saveShippingData"
          :btn-reverse-submit="reverseShippingData"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import Api from "@/utils/ApiHelper";
import Dropdown from "@/components/Reusable/Dropdown.vue";
import SaveChangeBtn from "./-SaveChangeBtn.vue";
import { Product } from "@/types";

const store = useStore();
const props = defineProps(["product"]);
const updateProductState = computed(() => store.state.UpdateProduct);
const updateChangedSections = ({ sectionId, remove }) => {
  store.commit("ADD_CHANGED_SECTIONS", {
    sectionId,
    remove
  });
};

const initializeComponentsData = ({ name, content }) => {
  store.commit("INITIALIZE_DATA", {
    name,
    content
  });
};

const inputs = ref({
  weightInKG: null,
  widthInCM: null,
  heightInCM: null,
  lengthInCM: null
});
let shippingDataChanged = ref<boolean | string>(false);
let isShippingDataLoading = ref(false);
let errorMessage = ref("");
const shippingReqData = ref({
  id: props.product.id,
  productShippingData: {
    weightInKG: "",
    widthInCM: "",
    heightInCM: "",
    lengthInCM: "",
    vehicleTypes: [],
    vehicleSpecialRequirments: [],
    deliveryTimeCategoryId: 0
  }
});

//* <MultiSelect "dropdown"> *//
const vehicleTypes = computed(() => store.state.LookupQueries?.vehicleTypes);
const selectedVehicleTypesIds = ref<any[]>([]); //-> the selected items' IDs
const selectedItems = ref(); //-> the final result of the selected items (what you gonna use in the template)

const findSelectedVehicleTypesItems = (ids: Array<any> = []) => {
  selectedItems.value = vehicleTypes.value?.filter((vehicle) =>
    ids.includes(vehicle.id)
  );
};
// where you receive the data from the dropdown component
const vehicleTypesItems = (selectedItemsCallback: any, isGlobal?: boolean) => {
  if (!isGlobal) {
    shippingDataChanged.value = true;
  }
  selectedVehicleTypesIds.value = selectedItemsCallback;
  findSelectedVehicleTypesItems(selectedItemsCallback);
};

//* <MultiSelect "dropdown"> VehicleSpecialRequirements local store
const vehicleSpecialRequirements = computed(
  () => store.state.LookupQueries?.vehicleSpecialRequirements
);
const VehicleSpecialRequirementsIds = ref<any[]>([]); //-> the selected items' IDs
const selectedVehicleSpecialRequirementsItems = ref(); //-> the final result of the selected items (what you gonna use in the template)

const findSelectedVehicleSpecialRequirements = (ids: Array<any> = []) => {
  selectedVehicleSpecialRequirementsItems.value =
    vehicleSpecialRequirements.value?.filter((requirement) =>
      ids.includes(requirement.id)
    );
};

// where you receive the data from the dropdown component
const vehicleSpecialRequirementsItems = (
  selectedItemsCallback: any,
  isGlobal?: boolean
) => {
  if (!isGlobal) {
    shippingDataChanged.value = true;
  }

  VehicleSpecialRequirementsIds.value = [...selectedItemsCallback];

  findSelectedVehicleSpecialRequirements(selectedItemsCallback);
};
/* SHIPPING DATA LOGIC BLOCK */
const isPhysicalProduct = ref(true);

const deliveryTypeCategories = computed(() => {
  return store.state.LookupQueries?.deliveryTypeCategories;
});

const selectedDeliveryTimeCategory = ref();

const dropdownSelectedDeliveryTimeCategory = (selectedItem: any, isGlobal) => {
  selectedDeliveryTimeCategory.value = selectedItem;
  shippingReqData.value.productShippingData.deliveryTimeCategoryId =
    selectedDeliveryTimeCategory.value.id;
  if (!isGlobal) {
    shippingDataChanged.value = true;
  }
};

const saveShippingData = async () => {
  try {
    isShippingDataLoading.value = true;

    // Payload Data
    shippingReqData.value.productShippingData.heightInCM =
      inputs.value.heightInCM;
    shippingReqData.value.productShippingData.lengthInCM =
      inputs.value.lengthInCM;
    shippingReqData.value.productShippingData.weightInKG =
      inputs.value.weightInKG;
    shippingReqData.value.productShippingData.widthInCM =
      inputs.value.widthInCM;

    selectedItems.value?.forEach((el) =>
      shippingReqData.value.productShippingData.vehicleTypes.push(el.id)
    );

    selectedVehicleSpecialRequirementsItems.value?.forEach((el) =>
      shippingReqData.value.productShippingData.vehicleSpecialRequirments.push(
        el.id
      )
    );

    const payload = shippingReqData.value;

    const reqData = {
      method: "post",
      url: "/ProductCommands/update-product-shipping-data",
      payload
    };
    const { data } = await Api(reqData);

    if (data?.succeeded) {
      shippingDataChanged.value = "done";
      const content = {
        ...inputs.value,
        vehicleTypes: payload.productShippingData.vehicleTypes.toString(),
        vehicleSpecialRequirments: payload.productShippingData.vehicleSpecialRequirments.toString(),
        deliveryTimeCategoryId: payload.productShippingData.deliveryTimeCategoryId
      };

      initializeComponentsData({
        name: "shippingData",
        content
      });

      errorMessage.value = "";
    } else errorMessage.value = data.message;
  } catch (error) {
    console.error(error);
  } finally {
    isShippingDataLoading.value = false;
  }
};

const reverseShippingData = () => {
  const source = updateProductState.value.shippingData;
  shippingDataChanged.value = false;
  initData(source);
  errorMessage.value = "";
};

const initData = (source: any) => {
  inputs.value = {
    weightInKG: source.weightInKG,
    widthInCM: source.widthInCM,
    heightInCM: source.heightInCM,
    lengthInCM: source.lengthInCM
  };

  const vehicleTypesSourceType: string = typeof source.vehicleTypes;
  const requirementsSourceType: string = typeof source.vehicleSpecialRequirments;

  let vehicleTypes: any[] = vehicleTypesSourceType === "string" ? source.vehicleTypes?.split(",") : source.vehicleTypes;
  let vehicleSpecialRequirments: any[] = requirementsSourceType === "string" ? source.vehicleSpecialRequirments?.split(",") : source.vehicleSpecialRequirments;


  vehicleTypesItems(vehicleTypes, true);
  vehicleSpecialRequirementsItems(vehicleSpecialRequirments, true);
  
  const deliveryTimeCategory = deliveryTypeCategories.value?.find(
    (el) => el.id === source.deliveryTimeCategoryId
  );
  if (deliveryTimeCategory) {
    dropdownSelectedDeliveryTimeCategory(deliveryTimeCategory, true);
  }

  const content = {
    ...inputs.value,
    vehicleTypes: source.vehicleTypes.toString(),
    vehicleSpecialRequirments: source.vehicleSpecialRequirments.toString(),
    deliveryTimeCategoryId: source.deliveryTimeCategoryId
  };

  initializeComponentsData({
    name: "shippingData",
    content
  });
};

onMounted(() => {
  if (props.product) {
    initData(props.product);
  }
});
watch(() => props.product, newV => {
  initData(newV);
});
watch(() => shippingDataChanged.value, (newV, oldValue) => {
  if (newV && !oldValue || newV && oldValue === "done") {
    updateChangedSections({
      sectionId: "shipping-data",
      remove: false
    });
  } else {
    updateChangedSections({
      sectionId: "shipping-data",
      remove: true
    });
  }
});
</script>
