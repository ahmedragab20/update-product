<template>
  <div>
    <Multiselect v-model="countryCode" v-bind="select" :options="countries">
      <template #singlelabel="{ value }">
        <div class="multiselect-single-label">
          <div class="country-flag">
            <img :src="value.icon" :alt="value.name" width="20" height="15" />
          </div>
          <span class="calling-code flex-fixed">+{{ value?.code }}</span>
        </div>
      </template>

      <template #option="{ option }">
        <div class="flag-container">
          <img :src="option.icon" :alt="option.name" width="20" height="15" />
        </div>
        <span class="calling-code flex-fixed">+{{ option.code }}</span>
        <div class="dots-text">
          {{ option.name }}
        </div>
      </template>
    </Multiselect>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import Multiselect from "@vueform/multiselect";
import type { Country } from "@/types";
import Api from "@/utils/ApiHelper";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "country-selector",
  components: {
    Multiselect,
  },
  setup(props, { emit }) {
    const select = ref({
      value: null,
      searchable: true,
      label: "name",
      valueProp: "id",
      canClear: false,
      classes: {
        container:
          "multiselect-lg form-control form-control-lg form-control-solid",
        dropdown: "multiselect-dropdown multiselect-dropdown-lg",
        search: "multiselect-search form-control form-control-solid",
      },
    });
    const countryId = ref();
    const countries = ref<Country[] | null>(null);

    onMounted(async () => {
      const payload = {
        method: "get",
        url: Actions.COUNTRIES,
      };

      Api(payload).then((res) => {
        countries.value = res?.data.data;
      });
    });

    const countryCode = computed({
      get() {
        return countryId.value;
      },
      set(id: any) {
        countryId.value = id;
        emit("update:modelValue", id);
        emit("input", id);
      },
    });

    const getCountryCode = computed(() => {
      return countries.value?.filter((el) => +el.id === +countryCode.value);
    });

    watch(getCountryCode, (newVal, oldVal: any): void => {
      emit("selectedCountry", newVal[0]);
    });

    return {
      select,
      countryId,
      countryCode,
      countries,
      Multiselect,
      getCountryCode,
    };
  },
});
</script>

<style lang="scss">
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
