<template>
  <div>
    <!-- if we got a payload -->
    <div
      v-if="elChanged && !elLoading && elChanged !== 'done' && payload"
      :class="{ 'w-100 px-0': fullWidth }"
      class="card-body py-0 pb-5 d-flex gap-2"
    >
      <button
        :class="{ 'w-100': fullWidth }"
        class="btn btn-bg-light btn-icon-info btn-text-info text-capitalize"
        type="button"
        @click="btnSubmit(payload)"
      >
        <span> save the change </span>
      </button>
      <button
        v-if="false"
        :class="{ 'w-100': fullWidth }"
        class="btn btn-bg-light btn-icon-danger btn-text-danger text-capitalize"
        type="button"
        @click="btnReverseSubmit"
      >
        <span> cancel </span>
      </button>
    </div>
    <!-- if you didn't get a payload -->
    <div
      v-else-if="elChanged && !elLoading && elChanged !== 'done' && !payload"
      :class="{ 'w-100 px-0': fullWidth }"
      class="card-body py-0 pb-5 d-flex gap-2 flex-wrap"
    >
      <button
        :class="{ 'w-100': fullWidth }"
        class="btn btn-bg-light btn-icon-info btn-text-info text-capitalize"
        type="button"
        @click="btnSubmit"
      >
        <span> save the change </span>
      </button>
      <button
        v-if="false"
        :class="{ 'w-100': fullWidth }"
        class="btn btn-bg-light btn-icon-danger btn-text-danger text-capitalize"
        type="button"
        @click="btnReverseSubmit"
      >
        <span> cancel </span>
      </button>
    </div>
    <!-- when we're waiting for the response -->
    <div
      v-else-if="elLoading && elChanged !== 'done'"
      :class="{ 'w-100 px-0': fullWidth }"
      class="card-body py-0 pb-5"
    >
      <button
        :class="{ 'w-100': fullWidth }"
        class="btn btn-text-info"
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
    <!-- when the request gets done -->
    <div
      v-else-if="elChanged === 'done'"
      :class="{ 'w-100 px-0': fullWidth }"
      class="card-body py-0 pb-5"
    >
      <span
        :class="{ 'w-100': fullWidth }"
        class="btn btn-bg-light btn-icon-success btn-text-success text-capitalize"
        style="cursor: default"
      >
        <i class="bi bi-check-circle" style="font-size: large"></i>
        done
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  let props = defineProps([
    "elChanged",
    "elLoading",
    "btnSubmit",
    "btnReverseSubmit",
    "payload",
    "fullWidth",
    "noCancel",
  ]);
</script>

<style scoped></style>
