<template>
  <div class="card card-flush py-4">
    <div class="card-header">
      <!--begin::Card title-->
      <div class="card-title">
        <h2>Thumbnail</h2>
      </div>
      <!--end::Card title-->
    </div>
    <div class="card-body text-center pt-0">
      <!--begin::Image input-->
      <div
        class="image-input image-input-empty image-input-outline mb-3"
        data-kt-image-input="true"
      >
        <!--begin::Preview existing avatar-->
        <div
          :style="`
            background: url(${url || props.thumbnail}) center;
            background-size: cover
          `"
          class="image-input-wrapper w-150px h-150px"
        ></div>
        <!--end::Preview existing avatar-->
        <!--begin::Label-->
        <label
          class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
          data-bs-original-title="Change avatar"
          data-bs-toggle="tooltip"
          data-kt-image-input-action="change"
          title=""
        >
          <i class="bi bi-pencil-fill fs-7"></i>
          <!--begin::Inputs-->
          <input
            accept=".png, .jpg, .jpeg"
            name="avatar"
            type="file"
            @input="onFileSelected($event)"
          />
          <input name="avatar_remove" type="hidden" />
          <!--end::Inputs-->
        </label>
        <div v-if="url && !reqDone" class="d-flex align-items-center">
          <div
            v-if="!reqLoading"
            class="d-flex justify-content-center align-items-center w-100 mt-3"
          >
            <button class="btn btn-success btn-sm" @click="onUpload">
              <i class="bi bi-check" style="font-size: large"></i> Submit
            </button>
            <button class="btn-close btn" @click="cancel"></button>
          </div>
          <div
            v-else
            class="mt-3 w-100 d-flex justify-content-center align-items-center"
          >
            <button
              class="btn btn-text-success btn-sm"
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
        <div v-else-if="reqDone">
          <div
            class="d-flex justify-content-center align-items-center gap-2 mt-3 text-success"
          >
            <i class="bi bi-check-circle text-success"></i>
            <span>Great, We're Done!</span>
          </div>
        </div>
        <!--end::Label-->
        <!--begin::Cancel-->
        <span
          class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
          data-bs-original-title="Cancel avatar"
          data-bs-toggle="tooltip"
          data-kt-image-input-action="cancel"
          title=""
        >
          <i class="bi bi-x fs-2"></i>
        </span>
        <!--end::Cancel-->
        <!--begin::Remove-->
        <span
          class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
          data-bs-original-title="Remove avatar"
          data-bs-toggle="tooltip"
          data-kt-image-input-action="remove"
          title=""
        >
          <i class="bi bi-x fs-2"></i>
        </span>
        <!--end::Remove-->
      </div>
      <!--end::Image input-->
      <!--begin::Description-->
      <div class="text-muted fs-7">
        Set the product thumbnail image. Only *.png, *.jpg and *.jpeg image
        files are accepted
      </div>
      <!--end::Description-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import Api from "@/utils/ApiHelper";

const props = defineProps({
  thumbnail: {
    type: String,
    default: "",
    required: true,
  },
  productId: {
    type: String || Number,
    default: "",
    required: true,
  },
});
const photo = ref();
const url = ref();
const reqDone = ref(false);
const reqLoading = ref(false);

const onFileSelected = (event) => {
  reqDone.value = false;
  photo.value = event.target.files[0];
  url.value = URL.createObjectURL(photo.value);
};

const onUpload = async () => {
  try {
    reqLoading.value = true;
    const fd = new FormData();
    fd.append("file", photo.value);

    const reqData = {
      method: "post",
      url: "/ManageCommands/upload-file",
      payload: fd,
    };

    const { data } = await Api(reqData);
    if (data?.succeeded) {
      reqDone.value = true;
      updateThumbnail(data.data);
    } else reqDone.value = "failed";
  } catch (error) {
    console.error(error);
  } finally {
    reqLoading.value = false;
  }
};
const cancel = () => {
  url.value = null;
};

const updateThumbnail = async (key: string) => {
  try {
    const payload = {
      id: props.productId,
      thumbnail: key,
    };
    const reqData = {
      method: "post",
      url: "/ProductCommands/update-product-thumbnail",
      payload,
    };
    await Api(reqData);
  } catch (error) {
    console.error(error);
  }
};
</script>
