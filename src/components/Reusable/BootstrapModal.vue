<template>
  <div class="modal modal-fullscreen fade" tabindex="-1" :id="target">
    <div class="modal-dialog" :class="[size || '']">
      <div class="modal-content shadow-lg rounded-3 overflow-scroll" :style="`max-height: ${maxHeight}`">
        <div v-if="hasHeader" class="modal-header">
          <h5 class="modal-title">{{ headline }}</h5>

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
          <slot name="content" />
        </div>

        <div v-if="hasActions" class="modal-footer">
          <button @click="closeHandler || ''" type="button" class="btn btn-light" data-bs-dismiss="modal">
            Close
          </button>
          <button
            v-if="btnSubmit && !isLoading"
            type="button"
            :class="btnStyle || 'btn btn-primary'"
            @click="btnSubmit"
            :disabled="btnDisabled"
          >
            {{ btnText }}
          </button>
          <button
            v-else-if="isLoading"
            class="btn btn-primary"
            data-kt-indicator="on"
            type="button"
          >
            <span class="indicator-label"> Submit </span>
            <span class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  headline: String,
  target: String,
  btnText: String,
  btnStyle: String,
  btnSubmit: Function,
  closeHandler: Function,
  size: String,
  isLoading: Boolean,
  btnDisabled: Boolean,
  hasActions: {
    type: Boolean,
    default: true,
  },
  hasHeader: {
    type: Boolean,
    default: true,
  },
  maxHeight: {
    type: String,
    default: "100%",
  },
});
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
