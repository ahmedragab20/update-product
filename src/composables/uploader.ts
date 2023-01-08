import { ref } from "@vue/reactivity";
import Api from "@/utils/ApiHelper";

const file = ref();
const response = ref();
export const upload = async (event: any) => {
  try {
    file.value = await event.target.files[0];

    const fd = new FormData();
    fd.append("file", file.value);

    const reqData = {
      method: "post",
      url: "/ManageCommands/upload-file",
      payload: fd
    };

    response.value = await Api(reqData);
  } catch (error) {
    console.error(error);
  }

  return response.value;
};