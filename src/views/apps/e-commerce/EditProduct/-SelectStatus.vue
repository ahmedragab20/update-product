<template>
  <!--begin::Menu-->
  <div class="card card-flush py-4" data-select2-id="select2-data-132-t92u">
    <!--begin::Card header-->
    <div class="card-header">
      <!--begin::Card title-->
      <div class="card-title">
        <h2>Status</h2>
      </div>
      <!--end::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!-- Published Draft Scheduled Inactive -->
        <div
          class="rounded-circle w-15px h-15px"
          v-if="selectedOption"
          :class="[
            { 'bg-success': selectedOption.label === 'published' },
            { 'bg-primary': selectedOption.label === 'draft' },
            { 'bg-warning': selectedOption.label === 'scheduled' },
            { 'bg-danger': selectedOption.label === 'inactive' },
          ]"
          id="kt_ecommerce_add_product_status"
        ></div>
      </div>
      <!--begin::Card toolbar-->
    </div>
    <!--end::Card header-->
    <!--begin::Card body-->
    <div class="card-body pt-0" data-select2-id="select2-data-131-ydem">
      <!--begin::Select2-->
      <Dropdown
        @selectedItem="dropdownSelectedItem"
        :items="statusOptions"
        headClasses="fw-bold p-3 rounded-3 shadow-sm text-capitalize btn-lg mb-8"
        bodyClasses="px-sm-5 py-sm-3 px-3 py-1 w-100 text-truncate text-capitalize"
      >
        <template #headerContent="{ item }">
          <div>
            <span
              v-if="!!item && item.label"
              class="d-flex justify-content-between align-items-center"
            >
              {{ selectedOption.label }}
              <strong>
                <i :class="item.isOpened ? 'bi-arrow-up' : 'bi-arrow-down'"></i>
              </strong>
            </span>
            <span v-else> Select item </span>
          </div>
        </template>
        <template #bodyContent="{ item }">
          <span v-if="!!item">
            {{ item.label }}
          </span>
        </template>
      </Dropdown>
      <!--end::Select2-->
      <!--begin::Description-->
      <div class="text-muted fs-7">Set the product status.</div>
      <!--end::Description-->
    </div>
    <!--end::Card body-->
    <!-- begin:: Date Picker -->
    <div
      v-if="selectedOption && selectedOption.label === 'scheduled'"
      class="px-sm-10 px-5 mb-7"
    >
      <div>
        <label for="statusDate" class="fw-bold mb-2">
          Select publishing date and time
        </label>
      </div>
      <el-date-picker
        v-model="dateRange"
        type="date"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
      />
    </div>
    <!-- end:: Date Picker -->
  </div>
  <!--end::Menu-->
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import Dropdown from "@/components/Reusable/Dropdown.vue";

const dateRange = ref([]);
const statusOptions = reactive([]);

const selectedOption = ref();

const dropdownSelectedItem = (selectedItem: any) => {
  // selectedOption.value = selectedItem;
};
</script>
