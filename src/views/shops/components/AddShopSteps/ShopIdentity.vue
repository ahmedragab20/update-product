<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-15">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">{{ $t("shopLocation") }}</h2>
      <!--end::Title-->
      
    </div>
    <!--end::Heading-->

    <!--begin::Input group-->
    <div class="mb-10 fv-row">
      <!--begin::Label-->
      <label class="form-label required mb-3">{{ $t("country") }}</label>
      <!--end::Label-->

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
            search: 'multiselect-search form-control form-control-solid',
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
      <label class="col-form-label text-gray-400 fw-normal d-block pt-0">
          {{ $t("pleaseEnterCountry") }}
      </label>
      <ErrorMessage
        name="countryId"
        class="fv-plugins-message-container invalid-feedback"
      />
      <!--end::Input-->
    </div>
    <!--end::Input group-->
    <!--begin::Input group-->
    <div class="mb-10 fv-row">
      <!--begin::Label-->
      <label class="form-label required mb-3">{{ $t("city") }}</label>
      <!--end::Label-->

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
            search: 'multiselect-search form-control form-control-solid',
            clear: 'multiselect-lg-clear',
          }"
          :options="cities"
          @input="onCityChange"
        />
      </Field>
      <label class="col-form-label text-gray-400 fw-normal d-block pt-0">
          {{ $t("pleaseEnterCity") }}
      </label>
      <ErrorMessage
        name="cityId"
        class="fv-plugins-message-container invalid-feedback"
      />
      <!--end::Input-->
    </div>
    <!--end::Input group-->

    <!--begin::Input group-->
    <div class="mb-10 fv-row">
      <!--begin::Label-->
      <label class="form-label required mb-3">{{ $t("area") }}</label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        v-slot="{ field }"
        type="text"
        class="form-control form-control-lg form-control-solid"
        name="areaId"
      >
        <Multiselect
          v-model="area"
          v-bind="field"
          :searchable="true"
          label="name"
          value-prop="id"
          :classes="{
            container:
              'multiselect-lg form-control form-control-lg form-control-solid',
            search: 'multiselect-search form-control form-control-solid',
            clear: 'multiselect-lg-clear',
          }"
          :options="areas"
          @input="onAreaChange"
        />
      </Field>
      <label class="col-form-label text-gray-400 fw-normal d-block pt-0">
          {{ $t("pleaseEnterArea") }}
      </label>
      <ErrorMessage
        name="areaId"
        class="fv-plugins-message-container invalid-feedback"
      />
      <!--end::Input-->
    </div>
    <!--end::Input group-->

    <!--begin::Input group-->
    <div class="mb-10 fv-row">
      <!--begin::Label-->
      <label class="form-label required mb-3">{{ $t("location") }} </label>
      <!--end::Label-->
  {{center}}
      <Field
        v-slot="{ field }"
        type="text"
        class="form-control form-control-lg form-control-solid"
        name="location"
      >
        <!-- <GoogleMaps @currentLocation="currentLocationF" /> -->
        <LocationSelector v-bind="field" :center="center" />
      </Field>
      <ErrorMessage
        name="location"
        class="fv-plugins-message-container invalid-feedback"
      />
      <!--end::Input-->
    </div>
    <!--end::Input group-->
  </div>
  <!--end::Wrapper-->
</template>

<script setup lang="ts">
import store from "@/store";
import { ErrorMessage, Field } from "vee-validate";
import { Country, City, Area, Coordinates } from "@/types";
import { useGeolocation } from "@vueuse/core";
import { onMounted, ref, watchEffect } from "vue";
import LocationSelector from "@/components/Reusable/LocationSelector.vue";
import Multiselect from "@vueform/multiselect";
import { Actions } from "@/store/enums/StoreEnums";
const { coords, locatedAt, error } = useGeolocation();

const countries = ref<Country[] | null>();
const cities = ref<City[] | null>();
const city = ref<City | null>();
const areas = ref<Area[] | null>();
const area = ref<Area | null>();

const center = ref<Coordinates>({ lat: 0, lng: 0 });

const lookupQueries = store.state.LookupQueries;

onMounted(() => {
  countries.value = lookupQueries.countries?.data;
});

const onCountryChange = async (countryId: string) => {
  const country = countries.value?.find((x) => x.id === countryId);
  if (country) {
    center.value = {
      lat: country?.latitude,
      lng: country?.longitude,
    };
    city.value = null;
    area.value = null;
    await store.dispatch(Actions.GET_CITY_BY_COUNTRYID, countryId);
    watchEffect(() => (cities.value = store.getters.getCities));
  }
};

const onCityChange = async (cityId: string) => {
  const city = cities.value?.find((x) => x.id === cityId);

  if (city) {
    center.value = {
      lat: city?.latitude,
      lng: city?.longitude,
    };

    area.value = null;
    await store.dispatch(Actions.GET_AREA_BY_CITYID, cityId);
    watchEffect(() => (areas.value = store.getters.getAreas));
  }
};

const onAreaChange = (areaId: string) => {
  const area = areas.value?.find((x) => x.id === areaId);

  if (area) {
    center.value = {
      lat: area?.latitude,
      lng: area?.longitude,
    };
  }
};
</script>

<style lang="scss">
.vue-map {
  height: 250px;
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
</style>
