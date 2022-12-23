<template>
    <!--begin::Basic info-->
    <div class="card mb-5 mb-xl-10">
      <!--begin::Card header-->
      <div
        class="card-header border-0 cursor-pointer"
        role="button"
        data-bs-toggle="collapse"
        data-bs-target="#kt_account_profile_details"
        aria-expanded="true"
        aria-controls="kt_account_profile_details"
      >
        <!--begin::Card title-->
        <div class="card-title m-0">
          <h3 class="fw-bolder m-0">{{ $t("marketDetails")}}</h3>
        </div>
        <!--end::Card title-->
      </div>
      <!--begin::Card header-->
  
      <!--begin::Content-->
      <div id="kt_account_profile_details" class="collapse show">
        <!--begin::Form-->
        <Form
          id="kt_account_profile_details_form"
          class="form"
          novalidate="novalidate"
          @submit="saveChanges"
          :validation-schema="marketDetailsValidator"
        >
          <!--begin::Card body-->
          <div class="card-body border-top p-9">
            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label required fw-bold fs-6"
                >{{$t("logo")}}</label
              >
              <!--end::Label-->
  
              <!--begin::Col-->
              <div class="col-lg-8">
                <!--begin::Row-->
                <div class="row">
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
                      style="background-image: url(media/avatars/blank.png)"
                    >
                      <!--begin::Preview existing logo-->
                      <img
                        class="image-input-wrapper w-125px h-125px"
                        :src="logo"
                      />
                      <!--end::Preview existing logo-->
  
                      <!--begin::Label-->
                      <label
                        class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                        data-kt-image-input-action="change"
                        data-bs-toggle="tooltip"
                        title="Change logo"
                      >
                        <i class="bi bi-pencil-fill fs-7" />
  
                        <!--begin::Inputs-->
                        <input
                          type="file"
                          name="logo"
                          accept=".png, .jpg, .jpeg"
                          @change="handleFileUpload"
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
                </div>
                <!--end::Row-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label required fw-bold fs-6"
                >{{ $t("subDomain")  }}</label
              >
              <!--end::Label-->
  
              <!--begin::Col-->
              <div class="col-lg-8">
                <!--begin::Row-->
                <div class="row">
                  <!--begin::Col-->
                  <Field
                    type="text"
                    name="subDomain"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="Sub Domain"
                    v-model="marketDetails.subDomain"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="subDomain" />
                    </div>
                  </div>
  
                  <!--end::Col-->
                </div>
                <!--end::Row-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label required fw-bold fs-6"
                >{{ $t("countries") }}</label
              >
              <!--end::Label-->
  
              <!--begin::Col-->
              <div class="col-lg-8">
                <!--begin::Row-->
                <div class="row">
                  <!--begin::Col-->
                  <!--begin::Input-->
                  <Field
                    v-slot="{ field }"
                    type="text"
                    class="form-control form-control-lg form-control-solid"
                    name="countryId"
                  >
                    <Multiselect
                      v-bind="field"
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
                      @input="onCountryChange"
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
                  <ErrorMessage
                    name="countryId"
                    class="fv-plugins-message-container invalid-feedback"
                  />
                  <!--end::Input-->
                </div>
                <!--end::Row-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label required fw-bold fs-6"
                >{{ $t("city") }}</label
              >
              <!--end::Label-->
  
              <!--begin::Col-->
              <div class="col-lg-8">
                <!--begin::Row-->
                <div class="row">
                  <!--begin::Input-->
                  <Field
                    v-slot="{ field }"
                    type="text"
                    class="form-control form-control-lg form-control-solid"
                    name="cityId"
                  >
                    <Multiselect
                      v-model="city"
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
                      :options="cities"
                      @input="onCityChange"
                    />
                  </Field>
                  <ErrorMessage
                    name="cityId"
                    class="fv-plugins-message-container invalid-feedback"
                  />
                  <!--end::Input-->
                </div>
                <!--end::Row-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label required fw-bold fs-6"
                >{{ $t("currencies") }}</label
              >
              <!--end::Label-->
  
              <!--begin::Col-->
              <div class="col-lg-8">
                <!--begin::Row-->
                <div class="row">
                  <!--begin::Input-->
                  <Field
                    v-slot="{ field }"
                    name="currencyIds"
                    class="form-control form-control-lg form-control-solid"
                  >
                    <Multiselect
                      v-bind="field"
                      label="label"
                      value-prop="id"
                      :classes="{
                        container:
                          'multiselect-tags-lg form-control form-control-lg form-control-solid',
                        search:
                          'multiselect-search form-control form-control-solid',
                        clear: 'multiselect-lg-clear',
                        tagsSearch:
                          'multiselect-tags-search form-control form-control-solid',
                      }"
                      :options="currencies"
                      mode="tags"
                    />
                  </Field>
                  <ErrorMessage
                    name="currencyIds"
                    class="fv-plugins-message-container invalid-feedback"
                  />
                  <!--end::Input-->
                </div>
                <!--end::Row-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label required fw-bold fs-6"
                >{{ $t("languages") }}</label
              >
              <!--end::Label-->
  
              <!--begin::Col-->
              <div class="col-lg-8">
                <!--begin::Row-->
                <div class="row">
                  <!--begin::Input-->
                  <Field
                    v-slot="{ field }"
                    name="languageIds"
                    class="form-control form-control-lg form-control-solid"
                  >
                    <Multiselect
                      v-bind="field"
                      label="label"
                      value-prop="id"
                      :classes="{
                        container:
                          'multiselect-tags-lg form-control form-control-lg form-control-solid',
                        search:
                          'multiselect-search form-control form-control-solid',
                        clear: 'multiselect-lg-clear',
                        tagsSearch:
                          'multiselect-tags-search form-control form-control-solid',
                      }"
                      :options="languages"
                      mode="tags"
                      @input="onChooseLangs"
                    />
                  </Field>
                  <ErrorMessage
                    name="languageIds"
                    class="fv-plugins-message-container invalid-feedback"
                  />
                  <!--end::Input-->
                </div>
                <!--end::Row-->
              </div>
  
              <!--end::Col-->
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label required fw-bold fs-6"
                >{{ $t("resources") }}</label
              >
              <!--end::Label-->
  
              <!--begin::Col-->
              <div class="col-lg-8">
                <editor>
                  <template #upper>
                    <tabs-duplicator
                      :items="currentLangs"
                      @selectedItem="setSelectedItem"
                    >
                      <template #label="{ item }">
                        {{ item.label }}
                      </template>
                    </tabs-duplicator>
                  </template>
                  <template #fields>
                    <div
                      dir="auto"
                      v-for="(field, $index) in currentLangs"
                      :key="$index"
                    >
                      <keep-alive>
                        <div
                          class="my-10"
                          v-if="selectedItem && field.id === selectedItem.id"
                        >
                          <label class="form-label required mb-3">{{ $t("name") }}</label>
                          <input
                            class="form-control form-control-lg form-control-solid mb-3"
                            @blur="addResource"
                            v-model="product[`name-${selectedItem.id}`]"
                          />
                          <div
                            class="mb-2 fv-plugins-message-container invalid-feedback"
                            v-if="!product[`name-${selectedItem.id}`]"
                          >
                            {{ $t("fieldRequired") }}
                          </div>
  
                          <label class="form-label required mb-3"
                            >{{ $t("description") }}</label
                          >
                          <textarea
                            class="form-control form-control-lg form-control-solid"
                            @blur="addResource"
                            v-model="product[`description-${selectedItem.id}`]"
                          />
                        </div>
                      </keep-alive>
                      <!--  -->
                    </div>
                  </template>
                </editor>
              </div>
  
              <!--end::Col-->
            </div>
            <!--end::Input group-->
          </div>
          <!--end::Card body-->
  
          <!--begin::Actions-->
          <div class="card-footer d-flex justify-content-end py-6 px-9">
            <button
              type="submit"
              id="kt_account_profile_details_submit"
              ref="submitButton"
              class="btn btn-primary"
            >
              <span class="indicator-label">  {{ $t("saveChanges") }}</span>
              <span class="indicator-progress">
                {{ $t("pleaseWait") }}...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
          </div>
          <!--end::Actions-->
        </Form>
        <!--end::Form-->
      </div>
      <!--end::Content-->
    </div>
    <!--end::Basic info-->
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref, watchEffect, toRaw, computed } from "vue";
  import { ErrorMessage, Field, Form } from "vee-validate";
  import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
  import Multiselect from "@vueform/multiselect";
  import Swal from "sweetalert2/dist/sweetalert2.min.js";
  import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";
  import Editor from "@/components/Reusable/Editor.vue";
  
  import * as Yup from "yup";
  import { City, Country, Currency, Language, Market } from "@/types";
  import store from "@/store";
  import { Actions } from "@/store/enums/StoreEnums";
  import MarketResourceData from "@/api/data/MarketResourceData";
  
  // define interfaces
  interface MarketDetails {
    subDomain: string;
    countryId: string;
    cityId: string;
    languageIds: [];
    currencyIds: [];
    logoKey: string;
  }
  
  interface ChoosenLangs {
    id: string;
    label: string;
    code: string;
    icon: string;
  }
  // define refs
  const submitButton = ref<HTMLElement | null>(null);
  const countries = ref<Country[] | null>();
  const cities = ref<City[] | null>();
  const city = ref<City | null>();
  const marketData = ref<Market>(store.getters.getMarketData);
  const lookupQueries = store.state.LookupQueries;
  const languages = ref<Language[] | null>();
  const currencies = ref<Currency[] | null>();
  const logo = ref<string>("");
  const choosenLangs = ref<ChoosenLangs[]>();
  let selectedItem = ref({});
  const product = ref([]);
  const logoKey = ref<string>("");
  let resources = ref<any>([]);
  // marketDetailsValidator schema
  const marketDetailsValidator = Yup.object().shape({
    subDomain: Yup.string().required().label("Sub Domain"),
    countryId: Yup.string().required().label("Country"),
    cityId: Yup.string().required().label("City"),
    languageIds: Yup.array()
      .of(Yup.string())
      .min(1)
      .required()
      .label("Languages"),
    currencyIds: Yup.array()
      .of(Yup.string())
      .min(1)
      .required()
      .label("Currencies"),
    // logoKey: Yup.string().required().label("logo")
  });
  
  const marketDetails = ref<MarketDetails>({
    subDomain: "",
    countryId: "",
    cityId: "",
    languageIds: [],
    currencyIds: [],
    logoKey: "",
  });
  // set current Langs
  const currentLangs = computed(() => {
    let langs = choosenLangs.value;
    if (langs) {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      selectedItem.value = langs[0];
    }
  
    return langs;
  });
  // on Country Change function
  const onCountryChange = async (countryId: string) => {
    const country = countries.value?.find((x) => x.id === countryId);
    if (country) {
      console.log({ country });
  
      city.value = null;
      await store.dispatch(Actions.GET_CITY_BY_COUNTRYID, countryId);
      watchEffect(() => (cities.value = store.getters.getCities));
    }
  };
  // on City Change function
  const onCityChange = async (cityId: string) => {
    const city = cities.value?.find((x) => x.id === cityId);
  
    if (city) {
      await store.dispatch(Actions.GET_AREA_BY_CITYID, cityId);
    }
  };
  // onChooseLangs 
  const onChooseLangs = async (langIds: []) => {
    choosenLangs.value = langIds.map((langId) => {
      return store.getters.getLanguages.data.find((l) => l.id === langId);
    });
  };
  // handleFileUpload image logo
  const handleFileUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const files = target?.files;
    if (files && files?.length > 0) {
      const subdomain = marketData.value.subDomain;
      const file: File = files[0];
      const reader = new FileReader();
  
      reader.onload = function (e) {
        const target: any = e.target;
        const data = target.result;
        logo.value = data;
      };
  
      reader.readAsDataURL(file);
      let formData = new FormData();
      formData.append("file", file);
      formData.append("subdomain", subdomain);
      store.dispatch(Actions.ADD_SETUP_LOGO, formData);
    }
  };
  // save changes 
  const saveChanges = async (values: any) => {
    if (Object.keys(resources.value).length === 0) return false;
    if (resources.value.length !== choosenLangs.value?.length) return false;
    if (store.state.SetupModule.logoKey) {
      logoKey.value = store.state.SetupModule.logoKey;
    }
    values = {
      ...values,
      resources: toRaw(resources.value),
      logoKey: logoKey.value,
      socialMedia: [],
    };
  
    if (submitButton.value) {
      try {
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");
        await store.dispatch(Actions.UPDATE_MARKET, values);
        Swal.fire({
          text: "You have successfully Updated Market Details",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary",
          },
        }).then(function () {
          submitButton.value?.removeAttribute("data-kt-indicator");
          window.location.href = "/";
        });
      } catch (error) {
        Swal.fire({
          text: error,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Try again!",
          customClass: {
            confirmButton: "btn fw-bold btn-light-danger",
          },
        });
      }
    }
  };
  // set selected items
  const setSelectedItem = (payload: any) => {
    selectedItem.value = payload;
  };
  
  // add resources
  const addResource = (): void => {
    const mySet1 = new Set();
    Object.keys(product.value).forEach((e) => {
      const id = e.split("-")[1];
      mySet1.add(id);
    });
    const arr = [{}];
    mySet1.forEach((s) => {
      const obj = {};
      Object.keys(product.value).forEach((n) => {
        if (n.split("-")[1] === s) {
          obj["languageId"] = s;
          obj[n.split("-")[0]] = product.value[n];
        }
      });
      arr.push(obj);
    });
    resources.value = arr.filter((value) => Object.keys(value).length !== 0);
  };
  onMounted(() => {
    marketDetails.value.subDomain = marketData.value.subDomain;
    countries.value = lookupQueries.countries?.data;
    languages.value = store.state.LookupQueries.languages.data;
    currencies.value = store.state.LookupQueries.currencies.data;
    logo.value = marketData.value.logo;
    logoKey.value = marketData.value.logo;
    // setCurrentPageBreadcrumbs
    setCurrentPageBreadcrumbs("Settings", ["Account"]);
  });
  </script>
  
  <style lang="scss" scoped>
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
  .country-flag {
    margin-right: 10px;
    top: 21px;
    left: 11px;
  }
  .flag-container {
    margin-right: 10px;
  }
  .calling-code {
    width: 45px;
    color: #747474;
  }
  .flex-fixed {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
  }
  .dots-text {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .image-input {
    width: 140px;
  }
  </style>
  