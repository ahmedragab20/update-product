<template>
  <tabs class="mb-5" v-model="selectedTab">
    <tab
      v-for="(tab, i) in tabs"
      :key="`t${i}`"
      :val="tab"
      :label="`${tab.label}`"
      :indicator="true"
    />
  </tabs>
  <tab-panels v-model="selectedTab" :animate="true" :swipeable="false">
    <tab-panel v-for="(tab, i) in tabs" :key="`tp${i}`" :val="tab">
      <!--begin::Input group-->
      <div class="mb-10 fv-row">
        <!--begin::Label-->
        <label class="form-label required mb-3">Name</label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          type="text"
          class="form-control form-control-lg form-control-solid"
          :name="`name-${tab.id}`"
          placeholder=""
          value=""
        />
        <ErrorMessage
          :name="`name-${tab.id}`"
          class="fv-plugins-message-container invalid-feedback"
        />
        <!--end::Input-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="mb-10 fv-row">
        <!--begin::Label-->
        <label class="form-label required mb-3">Description</label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          type="text"
          class="form-control form-control-lg form-control-solid"
          :name="`description-${tab.id}`"
          placeholder=""
          value=""
        />
        <ErrorMessage
          :name="`description-${tab.id}`"
          class="fv-plugins-message-container invalid-feedback"
        />
        <!--end::Input-->
      </div>
      <!--end::Input group-->
    </tab-panel>
  </tab-panels>
</template>

<script lang="ts">
import { Field, ErrorMessage } from "vee-validate";
import { Tabs, Tab, TabPanels, TabPanel } from "vue3-tabs";
import { computed, defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "Multi-language",
  components: {
    Tabs,
    Tab,
    TabPanels,
    TabPanel,
    Field,
    ErrorMessage,
  },
  props: {
    currentLangs: Array,
  },
  setup(props) {
    const tabs = computed(() => props.currentLangs);
    const state = reactive({
      selectedTab: tabs.value?.[0],
    });
    return {
      tabs,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss">
.tabs .active {
  border-width: 0;
  border-bottom-width: 3px;
  border-style: solid;
  border-color: #83e1e1;
  background-color: #dcf7f7;
}
</style>
