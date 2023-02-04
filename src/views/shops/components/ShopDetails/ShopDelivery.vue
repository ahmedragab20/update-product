<template>
  <!--begin::Basic info-->
  <div>
  <div
    v-if="form?.isDeliveredByJetOrder"
      
    >
    <div class="text-center">
        <img
        src="/media/svg/illustrations/easy/6.svg"
          class="rounded-circle my-3 user-select-none"
          style="
            width: 210px;
            height: 210px;
            object-fit: cover;
            pointer-events: none;
          "
        />
        <h5 class="text-muted">
          <i class="fa fa-info-circle"></i>
          Your orders are delivered by JetOrder. If you would like to make any changes on the delivery fees, please contact support.
        </h5>
       
      </div>
    </div>
  <div class="product-label d-flex flex-column flex-column-fluid" v-else>
    <!--begin::Container-->

    <!--begin::Form-->
    <Form
      id="kt_account_profile_details_form"
      class="form"
      @submit="saveChanges"
    >
      <div class="row">
      
        <div class="col-12">
         
          <div class="card card-flush py-4 mb-4">
    
            <div class="card-header">
              <div class="card-title">
                {{ $t("deliveryPolicyValues") }}
              </div>
            </div>

            <div class="card-body pt-0">
              <tabs-duplicator :items="langs" @selectedItem="setSelectedItem">
                <template #label="{ item }">
                  {{ item.name }}
               
                </template>
              </tabs-duplicator>
              <div class="fields">
                <div>
                  <div class="inputs_fields my-3">
                    <div
                      v-for="(item, i) in form.deliveryPolicyValues"
                      :key="i"
                    >
                      <div  v-if="item.languageId == selectedItem.language">
                        <Field
                          class="form-control form-control-lg form-control-solid"
                          v-model="form.deliveryPolicyValues[i].value"
                          :name="`form.deliveryPolicyValues[${i}].value`"
                          type="text"
                          v-slot="{ field, meta }"
                        >
                       
                          <textarea
                          
                            class="form-control form-control-lg form-control-solid"
                            v-bind="field"
                            v-model="form.deliveryPolicyValues[i].value"
                            :class="{
                              'is-valid': meta.valid,
                              'is-invalid': meta.validated && !meta.valid,
                            }"
                          ></textarea>
                        </Field>
                      </div>
                      <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                          <ErrorMessage
                            :name="`form.deliveryPolicyValues[${i}].value`"
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
            </div>
          </div>
          </div>
        <!-- start col-lg-4 -->
        <div class="col-4">
          <div class="card card-flush py-4 mb-4">
            <div class="card-header">
              <div class="card-title required">
                {{ $t("country") }}
              </div>
            </div>
            <div class="card-body pt-0">
              <Field
                    v-slot="{ field }"
                    type="text"
                    class="form-control form-control-lg form-control-solid"
                    name="countryId"
                     v-model="country"
                  >
                    <Multiselect
                    
                      v-bind="field"
                       v-model="country"
                      :searchable="true"
                      label="name"
                      value-prop="id"
                      :can-clear="false"
                      :classes="{
                        container:
                          'multiselect-lg form-control form-control-lg form-control-solid',
                        search:
                          'multiselect-search form-control form-control-solid',
                      }"
                      :options="countries"
                     
                  @change="getCities(country)"
                    >
                      <template #singlelabel="{ value }">
                        <div class="multiselect-single-label">
                          <div class="flag-container">
                            <img
                              :src="value.icon"
                              :alt="value.name"
                              width="20"
                              height="15"
                            />
                          </div>
                          <div class="dots-text">
                            {{ value.name }}
                          </div>
                        </div>
                      </template>

                        <template #option="{ option }">
                          <div class="flag-container">
                            <img
                              :src="option.icon"
                              :alt="option.name"
                              width="20"
                              height="15"
                            />
                          </div>
                          <div class="dots-text">
                            {{ option.name }}
                          </div>
                        </template>
                      </Multiselect>
                    </Field>
                   
             
              <label
                class="col-form-label text-gray-400 fw-normal d-block pt-0"
              >
                {{ $t("pleaseEnterCountry") }}
              </label>
              <ErrorMessage class="text-danger" name="country"></ErrorMessage>
            </div>
          </div>
          </div>
          <div class="col-4">
          <div class="card card-flush py-4 mb-4">
            <div class="card-header">
              <div class="card-title required">
                {{ $t("city") }}
              </div>
            </div>
            <div class="card-body pt-0">
              <Field name="city" type="text" v-slot="{ field, value }">
                <el-select
                  v-bind="field"
                  :mode-value="value"
                  class="w-100 form-control-solid border-0"
                  v-model="city"
                  @change="getArea(city)"
                >
                  <el-option
                    v-for="item in cities"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </Field>
              <label
                class="col-form-label text-gray-400 fw-normal d-block pt-0"
              >
                {{ $t("pleaseEnterCity") }}
              </label>
              <ErrorMessage class="text-danger" name="city"></ErrorMessage>
            </div>
          </div>
          </div>
          <div class="col-4">
          <div class="card card-flush py-4 mb-4 area-card">
            <div class="card-header">
              <div class="card-title">
                {{ $t("area") }}
              </div>
            </div>
       
            <div class="card-body pt-0">
              <div class="row" v-for="item in areas">
                <div
                  class="card card-dashed h-xl-100 flex-row flex-stack flex-wrap p-6 mb-2"
                >
                  <!--begin::Info-->
                  <div class="d-flex py-2">
                    <span
                      class="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1"
                    >
                      <input
                        class="form-check-input"
                        :name="`${item.areaId}`"
                        v-model="item.areaCost"
                        @change="checkArea($event, item.areaId)"
                        type="checkbox"
                      />
                    </span>

                    <span class="ms-5">
                      <span class="fs-4 fw-bolder text-gray-800 d-block">
                        {{ item.name }}</span
                      >
                    </span>
                  </div>
                  <!--end::Info-->
                  <!--begin::Actions-->

                  <a
                  
                  data-bs-toggle="modal"
                      data-bs-target="#kt_modal_new_shop"
                    v-if="item.areaCost"
                    role="button"
                    @click="getTab(item.areaId)"
                    class="btn btn-sm btn-light btn-active-light-primary"
                  >
                  {{ $t("editPrice") }}
                  </a>

                  <!--end::Actions-->
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- {{form.deliveryPolicyValues}}form.value.deliveryPolicyValues -->

        <div class="col-12">
         
          <div
class="modal fade"
id="kt_modal_new_shop"
tabindex="-1"
aria-hidden="true"
ref="addContactModalRef"
>
<!--begin::Modal dialog-->
<div class="modal-dialog modal-dialog-centered mw-650px">
  <!--begin::Modal content-->
  <div class="modal-content">
    <!--begin::Modal header-->
    <div class="modal-header">
    
      <!--begin::Modal title-->
      <h2>{{ $t("price") }}</h2>
      <!--end::Modal title-->
      <!--begin::Close-->
      <div
        class="btn btn-sm btn-icon btn-active-color-primary"
        data-bs-dismiss="modal"
      >
        <!--begin::Svg Icon | path: icons/duotune/arrows/arr061.svg-->
        <span class="svg-icon svg-icon-1">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.5"
              x="6"
              y="17.3137"
              width="16"
              height="2"
              rx="1"
              transform="rotate(-45 6 17.3137)"
              fill="currentColor"
            />
            <rect
              x="7.41422"
              y="6"
              width="16"
              height="2"
              rx="1"
              transform="rotate(45 7.41422 6)"
              fill="currentColor"
            />
          </svg>
        </span>
        <!--end::Svg Icon-->
      </div>
      <!--end::Close-->
    </div>
    <!--end::Modal header-->
    <!--begin::Modal body-->
    <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
      <!--begin::Form-->

              <div class="row" v-for="(item, i) in form.deliveryCosts" :key="i">
                <label
                  class="required fs-5 fw-bold mb-2 d-inline"
                  v-if="
                    areas?.length > 0 &&
                    areaTest[areaTest.length - 1] == item.areaId
                  "
                >
                  {{ $t("priceIn") }}

                  {{
                    `${
                      areas?.find(
                        (x) => parseInt(x.areaId) == parseInt(item.areaId)
                      )?.name
                    }`
                  }}
                  is {{ form.deliveryCosts[i].price }}
                </label>

                <div class="col-12" v-if="item.areaId == areaTab">
                  <tabs-duplicator
                    :items="Currency"
                    @selectedItem="setSelectedGroupItemCurrency"
                  >
                    <template #label="{ item }">
                      {{ item?.label }}
                    </template>
                  </tabs-duplicator>

                  <div class="fields">
                    <div>
                      <div class="inputs_fields my-3">
                        <div>
                          <div
                            v-if="item.currencyId == selectedItemCurrency.id"
                          >
                            <label class="required fs-5 fw-bold mb-2 d-inline"
                              >{{ $t("price") }}
                              {{
                                `${
                                  areas?.find(
                                    (x) =>
                                      parseInt(x.areaId) ==
                                      parseInt(item.areaId)
                                  )?.name
                                }`
                              }}
                              is {{ form.deliveryCosts[i].price }}
                            </label>
                            <Field
                              :name="`te`"
                              type="number"
                              v-model.number="form.deliveryCosts[i].price"
                              v-slot="{ field, meta }"
                            >
                              <input
                            
                                v-bind="field"
                                v-model.number="form.deliveryCosts[i].price"
                                :dir="selectedItemCurrency.dir"
                                type="number"
                                class="form-control w-100 form-control-solid form-control-lg"
                                :class="{
                                  'is-valid': meta.valid,
                                  'is-invalid': meta.validated && !meta.valid,
                                }"
                              />
                            </Field>
                            <ErrorMessage :name="``" class="text-danger">
                              <span class="text-danger">
                                {{ $t("PleaseEnterThePriceInAllCurrency") }}
                              </span>
                            </ErrorMessage>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
           
      <!--end::Form-->
    </div>
    <!--end::Modal body-->
  </div>
  <!--end::Modal content-->
</div>
<!--end::Modal dialog-->
</div>
          
        </div>
        <!--begin::Actions-->
        <div class="d-flex justify-content-center">
          <div class="card col-12 justify-content-center align-items-center floating py-6 px-9">
            <div class="card-title text-gray-400 fw-normal d-block pt-0">
              {{ $t("pleaseDontForgetToSaveDeliveryChanges") }}
            </div>
            <div class="crad-body">
              <button type="submit" class="btn btn-primary">
                <span v-if="!isLoading">
                  {{ $t("saveDeliveryChanges") }}
                </span>
                <span v-if="isLoading" class="indicator-progress d-block">
                  {{ $t("pleaseWait") }}
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </Form>
  </div>
</div>
  <!--end::Basic info-->
</template>

<script lang="ts" setup>
import { ref, computed, reactive, watch, onMounted, watchEffect } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import Multiselect from "@vueform/multiselect";
import { Country, City, Coordinates } from "@/types";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import i18n from "@/core/plugins/i18n";
import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";

// define interfaces
interface deliveryPolicyValues {
  languageId: string;
  value: string;
}
interface Area {
  name: string;
  areaId: string;
  areaCost: boolean;
}
interface deliveryCosts {
  currencyId: string;

  areaId: string;
  price: number;
}
interface shopDelivery {
  isDeliveredByJetOrder: boolean;
  id: string;

  deliveryPolicyValues: Array<deliveryPolicyValues>;

  deliveryCosts: Array<deliveryCosts>;
}
interface languagesType {
  language: string;

  name: string;
}
interface props {
  id: string;


}
// get id as a prop
const props = defineProps<props>();
const addContactModalRef = ref(null);
const store = useStore();
const Currency = computed(() => store.getters.getSupportedCurrencies);

// define refs
const langs =ref<languagesType[] | null>();
const countries = computed(() => store.getters.getCountries);
const cities = ref<City[] | null>();
const city = ref<City | null>();
const areas = ref<Area[] | null>([]);
const country = ref("");
const areaTab = ref("");
const areaTest = ref([]);

// get area tap
const getTab = (id:string) => {
  areaTab.value = id;

  // set area id and currencyId
  if (shopDelivery.value.deliveryCosts.length == 0) {
    Currency.value.forEach((element) => {
      shopDelivery.value.deliveryCosts.push({
        currencyId: element.id,
        price: 0,
        areaId: id,
      });
    });
  } else {
    if (!shopDelivery.value.deliveryCosts.some((el) => el.areaId == id)) {
      Currency.value.forEach((element) => {
        shopDelivery.value.deliveryCosts.push({
          currencyId: element.id,
          price: 0,
          areaId: id,
        });
      });
    }
  }
};

// get cities from api
const getCities = async (countryId: any) => {
  await store.dispatch(Actions.GET_CITY_BY_COUNTRYID, countryId);
  watchEffect(() => (cities.value = store.getters.getCities));
};
// get area from api
const getArea = async (cityId: any) => {
  areas.value=[]
  await store.dispatch(Actions.GET_AREA_BY_CITYID, cityId).then((res) => {
    res.forEach((ele) => {

      if (shopDelivery.value.deliveryCosts.some((el) => el.areaId == ele.id)) {
        areas.value?.push({
          name: ele.name,
          areaId: ele.id,
          areaCost: true,
        });
      } else {
        areas.value?.push({
          name: ele.name,
          areaId: ele.id,
          areaCost: false,
        });
      }
    });
  });


};

const checkArea = (e, id) => {
  console.log(e);
  if (e.target.checked) {
    !areaTest.value.includes(id) ? areaTest.value.push(id) : "";
  } else {
    form.value.deliveryCosts = form.value.deliveryCosts.filter((el) => {
      return el.areaId !== id;
    });

  }

};
// define shop delivery
const shopDelivery = ref<shopDelivery>({
  isDeliveredByJetOrder: false,
  id: "",
  deliveryPolicyValues: [],
  deliveryCosts: [],
});
const form = reactive(shopDelivery);
const selectedItem = ref();
const selectedItemCurrency = ref();
const setSelectedGroupItemCurrency = (currency: object) => {
  selectedItemCurrency.value = currency;
  console.log("form.  selectedItemCurrency.value",  selectedItemCurrency.value)
};

function initResources() {
  console.log("lang",langs)
  console.log(" shopDelivery.value.deliveryPolicyValues", shopDelivery.value.deliveryPolicyValues)
  if (  langs.value.length >0) {
  langs.value.forEach((element) => {
    console.log("ele")
    shopDelivery.value.deliveryPolicyValues.push({
      languageId: element.language,
      value: "",
    });
  });
  console.log(" shopDelivery.value.deliveryPolicyValues", shopDelivery.value.deliveryPolicyValues)
}

}
// watch on langs when langs change resources will init

watch(langs.value , (newVal) => {
  if (newVal && newVal.length >0) {
    initResources();
    selectedItem.value = newVal[0];
  }
});

const isLoading = ref(false);

const saveChanges = async (values: any) => {
  isLoading.value = true;
 await store.dispatch(
    Actions.UPDATE_SHOPS_DELIVERY_SETTINGS,
    shopDelivery.value
  );
  isLoading.value = false;
};
const setSelectedItem = (payload: any) => {
  selectedItem.value = payload;
};
const resetData = () => {
  if (langs.value && langs.value.length) {
    setSelectedItem(langs.value[0])
   
  }
  if (Currency.value && Currency.value.length > 0) {
      setSelectedGroupItemCurrency(Currency.value[0]);
    }
};

watchEffect(() => {
  resetData();
});
const getShopDelivery=()=>{
  store.dispatch(Actions.GET_SHOPS_DELIVERY_SETTINGS, props.id).then((data) => {
    console.log(data);
    shopDelivery.value = data;
    shopDelivery.value.id = props.id;
    if (shopDelivery.value.deliveryPolicyValues.length == 0) {
      initResources();
    }
  });
}
// get shops delivery settings from api
onMounted(() => {
  resetData();
  

  store.dispatch(Actions.GET_SHOPS_BASE_SETTINGS, props.id).then((data) => {
    console.log(data);
    langs.value = data.languages;
    getShopDelivery()
  });

});
</script>
<style>
.card.card-flush.py-4.mb-4.area-card {
  height: 50vh;
  overflow-y: scroll;
}
.floating {
  position: fixed;
  bottom: 0px;
}
.multiselect-lg {
  position: relative;
  margin: 0 auto;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
}
.multiselect-dropdown-lg {
  width: 200px;
}
</style>
