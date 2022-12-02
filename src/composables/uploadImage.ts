import { ref } from "@vue/reactivity";
import Api from "@/utils/ApiHelper";

export default (isDirectUpload?: boolean) => {
  const photo = ref<File | any>();
  const url = ref();
  const uploadMediaDone = ref<any>(false);
  const uploadMediaLoading = ref<any>(false);
  let key = ref<string>("");

  const onFileSelected = async (event) => {
    uploadMediaDone.value = false;
    console.log("%coploading image", "color: blue; font-weight: bold;", event);
    photo.value = event.target.files[0];
    console.log("%cPhoto", "color: #ff0000; font-weight: bold;", photo.value);
    if (photo.value) url.value = URL.createObjectURL(photo.value);
    console.log("%cURL", "color: orange; font-weight: bold;", url.value);

    if (isDirectUpload) {
      await onUpload();
    }

    return url.value;
  };

  const onUpload = async () => {
    try {
      uploadMediaLoading.value = true;
      const fd = new FormData();
      fd.append("file", photo.value);

      const reqData = {
        method: "post",
        url: "/ManageCommands/upload-file",
        payload: fd,
      };

      const response = await Api(reqData);
      if (response?.data?.succeeded) {
        console.log(
          "%cUploaded",
          "color: #58D68D; font-weight: bold; font-size: 1.2rem",
          response?.data
        );
        uploadMediaDone.value = true;
        key.value = response?.data.data;
      } else uploadMediaDone.value = "failed";
    } catch (error) {
      console.error(error);
    } finally {
      uploadMediaLoading.value = false;
    }
  };

  const cancel = () => {
    url.value = null;
  };

  const data = {
    photo: photo.value,
    url: url.value,
    uploadMediaDone: uploadMediaDone.value,
    uploadMediaLoading: uploadMediaLoading.value,
    key: key.value,
    onFileSelected,
    onUpload,
    cancel,
  };

  console.log({ data });

  return {
    photo: photo.value,
    url: url.value,
    uploadMediaDone: uploadMediaDone.value,
    uploadMediaLoading: uploadMediaLoading.value,
    key: key.value,
    onFileSelected,
    onUpload,
    cancel,
  };
};
