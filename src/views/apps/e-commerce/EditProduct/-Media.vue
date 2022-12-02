<template>
  <div class="card-header pt-0">
    <div class="card-title d-flex">
      <h2>Media</h2>
      <i
        v-if="reqDone"
        class="bi bi-check text-success"
        style="font-size: 1.8rem"
      ></i>
      <span
        v-else-if="reqLoading"
        class="spinner-border spinner-border-sm align-middle ms-2 text-success"
        style="font-size: large"
      ></span>
    </div>
  </div>
  <!--end::Card header-->
  <!--begin:: Upload Images-->
  <div class="card-header">
    <div
      class="d-flex align-items-center gap-5 border border-primary border-dashed rounded bg-light-primary h-80px w-100 px-5 cursor-pointer"
      @click="!reqLoading ? $refs.fileUpload.click() : ''"
      :style="`cursor: ${reqLoading ? 'wait' : 'pointer'}`"
    >
      <div class="w-40px">
        <el-icon class="d-flex align-items-center">
          <i
            class="bi-file-earmark-arrow-up text-primary"
            style="font-size: 3rem"
          ></i>
        </el-icon>
      </div>
      <div class="text-start">
        <h4>click to add one more.</h4>
        <strong class="text-muted">Upload any image you want😊</strong>
      </div>
    </div>
  </div>
  <input
    ref="fileUpload"
    accept=".png, .jpg, .jpeg"
    hidden
    type="file"
    @change="onUpload($event)"
  />
  <div v-if="media" class="container p-5">
    <div class="d-flex gap-2 flex-wrap px-5">
      <div
        v-for="(img, $index) in instantMedia"
        :key="$index"
        class="position-relative my-5 border rounded-3 shadow"
        style="max-height: 65px; max-width: 120px"
      >
        <img
          :src="img.path"
          alt="image"
          class="w-100 h-100 rounded-top"
          style="object-fit: cover"
          @click="imageViewerModalHandler(img.path)"
        />
        <div
          v-if="!reqLoading"
          class="position-absolute end-0 bg-white rounded-bottom px-3 w-100 bg-light d-flex justify-content-center align-items-center gap-3 py-1 shadow"
          style="bottom: -25px; cursor: pointer"
          @click="removeMediaConfirmation(img.id)"
        >
          <strong class="text-danger">
           <i class="bi bi-trash3 text-danger"></i> Remove
          </strong>
        </div>
      </div>
      <!-- Image Viewer -->
      <ImageViewer
        v-model:value="imageViewerModal"
        :handler="imageViewerModalHandler"
      >
        <img :src="clickedImage" class="image-viewer" />
      </ImageViewer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ImageViewer from "@/components/Reusable/ImageViewer.vue";

import { ref } from "@vue/reactivity";
import Api from "@/utils/ApiHelper";
import { uuid } from "vue-uuid";
import { onMounted } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";

const props = defineProps(["media", "productId"]);

const imageViewerModal = ref(false);
const clickedImage = ref<string>("");
const imageViewerModalHandler = (imagePath?: string): void => {
  if (!!imagePath) {
    clickedImage.value = imagePath;
  } else {
    clickedImage.value = "";
  }
  imageViewerModal.value = !imageViewerModal.value;
};

const photo = ref();
const reqDone = ref(false);
const reqLoading = ref(false);
("https://cdn.dribbble.com/users/110792/screenshots/17024372/placeholder-listings.png?compress=1&resize=400x300&vertical=top");
const mediaReqPayload = ref<any[]>([]);
const instantMedia = ref<any[]>([]);
const onUpload = async (event) => {
  try {
    // on select file
    reqDone.value = false;
    photo.value = event.target.files[0];

    // on submit the file
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
      const id = uuid.v4();
      reqDone.value = true;

      mediaReqPayload.value.push({
        id,
        path: data.data,
        mediaType: "image",
      });
      instantMedia.value.push({
        id,
        path: URL.createObjectURL(photo.value),
        mediaType: "image",
      });

      multiUpload(mediaReqPayload.value);
    } else reqDone.value = "failed";
  } catch (error) {
    console.error(error);
  } finally {
    reqLoading.value = false;
  }
};
const multiUpload = async (media) => {
  try {
    const payload = {
      id: props.productId,
      media,
    };
    const reqData = {
      method: "post",
      url: "/ProductCommands/update-product-media",
      payload,
    };

    const { data } = await Api(reqData);
  } catch (error) {
    console.error(error);
  }
};
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-danger",
    cancelButton: "btn btn-text-success",
  },
  buttonsStyling: false,
});
const removeMediaConfirmation = async (id) => {
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          "Deleted!",
          "Your media has deleted.",
          "success"
        );
        removeMedia(id);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          "Cancelled",
          "Your media still alive :)",
          "error"
        );
      }
    });
};
const removeMedia = async (mediaId) => {
  reqLoading.value = true;
  const newMedia = mediaReqPayload.value.filter(
    (media) => media.id !== mediaId
  );
  instantMedia.value = instantMedia.value.filter(
    (media) => media.id !== mediaId
  );

  mediaReqPayload.value = newMedia;

  multiUpload(newMedia);

  setTimeout(() => {
    reqLoading.value = false;
  }, 1000);
};

onMounted(() => {
  mediaReqPayload.value.push(...props.media);
  instantMedia.value.push(...props.media);
});
</script>
