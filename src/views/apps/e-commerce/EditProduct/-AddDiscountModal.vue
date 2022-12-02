<template>
  <div class="modal modal-fullscreen fade" tabindex="-1" id="kt_modal_2">
    <div class="modal-dialog">
      <div class="modal-content shadow-lg rounded-3">
        <div class="modal-header">
          <h5 class="modal-title">Add New Discount</h5>

          <!--begin::Close-->
          <div
            class="btn btn-icon btn-sm btn-active-light-primary ms-2"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <span class="svg-icon svg-icon-2x"></span>
          </div>
          <!--end::Close-->
        </div>

        <div class="modal-body">
          <div class="container-fluid">
            <div class="mb-10">
              <label for="exampleFormControlInput1" class="required form-label">
                Price ($)
              </label>
              <input
                type="number"
                id="exampleFormControlInput1"
                class="form-control form-control-solid"
                placeholder="Example input"
              />
            </div>
            <div class="mb-10">
              <label for="exampleFormControlInput1" class="required form-label">
                Price ($)
              </label>
              <input
                type="number"
                id="exampleFormControlInput1"
                class="form-control form-control-solid"
                placeholder="Example input"
              />
            </div>
            <div class="mb-10">
              <div class="demo-date-picker">
                <div class="block">
                  <el-date-picker
                    v-model="dateRange"
                    range-separator="To"
                    start-placeholder="Start date"
                    end-placeholder="End date"
                  />
                </div>
              </div>
              <div
                v-for="(date, $index) in dateRange"
                :key="$index"
                class="d-flex justify-content-center align-content-center gap-5"
              >
                <span v-if="$index === 0">from: {{ dateFormat(date) }}</span>
                <span v-if="$index === 1">to: {{ dateFormat(date) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watchEffect } from "vue";
  import { dateFormat } from "@/utils/helpers.ts";

  const dateRange = ref([]);
</script>
<style scoped>
  .demo-date-picker {
    display: flex;
    width: 100%;
    padding: 0;
    flex-wrap: wrap;
  }
  .demo-date-picker .block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    flex: 1;
  }
  .demo-date-picker .block:last-child {
    border-right: none;
  }
  .demo-date-picker .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
  }
</style>
