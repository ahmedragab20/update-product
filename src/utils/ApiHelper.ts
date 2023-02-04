import store from "@/store";
import axios from "axios";
interface ParamsT {
  method: string;
  url: string;
  payload?: any;
  customsHeaders?: object;
}

export default async <T extends ParamsT>({
  method,
  url,
  payload,
  customsHeaders,
}: T) => {
  try {
    // get method function block
    if (method === "get" && !payload) {
      const data = await axios.get(url, {
        headers: customsHeaders || undefined,
      });
      if (data.data.succeeded) {
        await store.dispatch("setResponseHandler", data.headers);
        store.commit("ERRORS", null, { root: true });
        return data;
      } else {
        store.commit("ERRORS", data, { root: true });
        return data;
      }
    } else if (method === "get" && payload) {
      const data = await axios.get(url, {
        headers: customsHeaders || undefined,
        params: payload,
      });
      if (data.data.succeeded) {
        await store.dispatch("setResponseHandler", data.headers);
        store.commit("ERRORS", null, { root: true });
        return data;
      } else {
        store.commit("ERRORS", data, { root: true });
        return data;
      }

      //* post method function block
    } else if (method === "post") {
      const data = await axios.post(url, payload || undefined, {
        headers: customsHeaders || undefined,
      });
      console.log(data);

      if (data.data.succeeded) {
        await store.dispatch("setResponseHandler", data.headers);
        store.commit("ERRORS", null, { root: true });

        return data;
      } else {
        store.commit("ERRORS", data, { root: true });
        return data;
      }

      //? put method function block
    } else if (method === "put") {
      const data = await axios.put(url, payload || undefined, {
        headers: customsHeaders || undefined,
      });
      if (data.data.succeeded) {
        await store.dispatch("setResponseHandler", data.headers);
        store.commit("ERRORS", null, { root: true });
        return data;
      } else {
        store.commit("ERRORS", data, { root: true });
        return data;
      }
    }
  } catch (error) {
    const payload = {
      error: error,
      message: "something went wrong with your request",
    };

    store.commit("ERRORS", payload, { root: true });
  }
};
